<script setup lang="ts">
defineProps<{ error: Object }>()
</script>

<template>
  <div class="text-error">
    {{ error }}
  </div>
</template>
