<script setup lang="ts">
const props = withDefaults(defineProps<{
  request: (params?: any) => Promise<any>
  params?: any
  retry?: number
}>(), {
  params: {},
})

const { data, pending, error, refresh } = await props.request(props.params)

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
