<script setup lang="ts">
const store = useAppStore()
const showMessage = ref(false)

watch(() => store.buffer.message, () => {
  showMessage.value = false
  setTimeout(() => {
    showMessage.value = true
  }, 500)
})
</script>

<template>
  <v-overlay
    :model-value="store.loading"
    class="align-center justify-center"
    :persistent="!store.buffer.status || store.buffer.status === 'pending'"
    @update:model-value=" store.loading = $event"
  >
    <v-fade-transition mode="out-in">
      <v-card v-if="store.buffer.status" min-width="300" class="pa-1 text-center d-flex align-center justify-center flex-column" variant="text">
        <v-scale-transition mode="out-in">
          <v-progress-linear
            v-if="store.buffer.status === 'pending'"
            key="pending"
            :model-value="store.bufferPercentage"
            bg-opacity="0.4"
            bg-color="black"
            color="primary"
            class="mb-4"
            height="48"
            rounded
          >
            <h3 class="text-white font-weight-bold">
              {{ store.bufferPercentage }} %
            </h3>
          </v-progress-linear>
          <FunctionalsSuccessAnimation v-else-if="store.buffer.status === 'success'" key="success" />
          <FunctionalsErrorAnimation v-else-if="store.buffer.status === 'error'" key="error" />
        </v-scale-transition>
        <v-scale-transition hide-on-leave>
          <div v-if="store.buffer.message && showMessage" key="message" class="d-flex align-baseline mt-4">
            <h4 :key="store.buffer.status" :class="`text-${store.buffer.status === 'pending' ? 'primary' : store.buffer.status}`">
              {{ store.buffer.message }}
            </h4>
            <v-fade-transition leave-absolute>
              <FunctionalsDotFlashing v-if="store.buffer.status === 'pending'" />
            </v-fade-transition>
          </div>
        </v-scale-transition>
      </v-card>
      <v-progress-circular
        v-else
        color="primary"
        indeterminate
        size="64"
      />
    </v-fade-transition>
  </v-overlay>
</template>
