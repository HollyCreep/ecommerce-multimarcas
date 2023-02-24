<script lang="ts" setup>
import VeeValidatePlugin from '@formvuelate/plugin-vee-validate'
import type { FormArraySchema, FormObjectSchema } from 'formvuelate'
import { SchemaFormFactory, useSchemaForm } from 'formvuelate'
import type { PropType } from 'vue'
import FormText from '@/components/form/inputs/TextInput.vue'

// const example_schema = ref([
//   [
//     {
//       component: 'string',
//       model: 'title',
//       name: 'title',
//       class: 'v-col-12',
//     },
//     {
//       component: 'FormText',
//       model: 'name',
//       name: 'name',
//       validations: string().required(),
//       class: 'v-col-12 v-col-md-6',
//     },
//     {
//       component: 'FormText',
//       model: 'lastName',
//       name: 'lastName',
//       validations: string().required(),
//       class: 'v-col-12 v-col-md-6',
//     },
//   ],
//   [
//     {
//       component: 'FormText',
//       model: 'name',
//       name: 'name',
//       validations: string().required(),
//       class: 'v-col-12 v-col-md-6',
//     },
//     {
//       component: 'FormText',
//       model: 'lastName',
//       name: 'lastName',
//       validations: string().required(),
//       class: 'v-col-12 v-col-md-6',
//     },
//     {
//       component: 'FormText',
//       model: 'email',
//       name: 'email',
//       validations: string().email().required(),
//       label: 'email',
//       class: 'v-col-12 v-col-md-6',
//     },
//   ],
// ])

const props = defineProps({
  schema: {
    type: [Object, Array] as PropType<FormObjectSchema | FormArraySchema>,
    required: true,
  },
  defaultValues: {
    type: Object,
    default: () => {},
  },
})

markRaw(FormText)

const SchemaFormWithPlugins = SchemaFormFactory([VeeValidatePlugin()], {
  FormText,
})
const formData = reactive({ ...props.defaultValues })
useSchemaForm(formData)
</script>

<template>
  <SchemaFormWithPlugins :schema="schema" v-bind="$attrs">
    <template #afterForm="{ validation }">
      <slot :validation="validation" />
    </template>
  </SchemaFormWithPlugins>
</template>
