<script setup lang="ts">
const props = defineProps<{
  request: () => Promise<any>
  retry?: number
}>()

const { data, pending, error, refresh } = await props.request()

let attempts = 0
if (!!error && props.retry && attempts < props.retry) {
  attempts++
  refresh()
}
</script>

<template>
  <div>
    <h1 v-if="pending">
      <v-progress-circular
        indeterminate
        color="primary"
        size="3rem"
      />
    </h1>
    <h1 v-else-if="error" class="text-error">
      Ops! Algo inesperado aconteceu ! {{ error }}
    </h1>
    <template v-else>
      <slot :data="data" />
    </template>
  </div>
</template>
