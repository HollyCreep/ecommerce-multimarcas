<script setup lang="ts">
const emits = defineEmits<{ (e: 'valid', value: boolean): boolean }>()

const handleFormValidationChange = (val: boolean) => {
  emits('valid', val)
}
</script>

<template>
  <div>
    <h2 class="text-primary font-weight-bold mb-8">
      <Icon name="user" color="primary" secondary-color="primary-lighten-1" />
      Identifique o titular do novo plano
    </h2>
    <v-card>
      <FormCustomer @valid="handleFormValidationChange" />
    </v-card>
  </div>
</template>

<style scoped>

</style>
