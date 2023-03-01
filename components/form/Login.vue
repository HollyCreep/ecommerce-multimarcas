<script setup lang="ts">
import { object, string } from 'yup'
import { useForm } from 'vee-validate'
import TextInput from './inputs/TextInput.vue'

interface ILoginForm {
  senha: string
  login: string
}

const emit = defineEmits<{ (e: 'valid', value: boolean): boolean }>()

const { handleSubmit, meta } = useForm<ILoginForm>({
  validationSchema: object({
    login: string().required(),
    senha: string().required().min(8),
  }),
})

watchEffect(async () => {
  emit('valid', meta.value.valid)
})

const onSubmit = handleSubmit(async (values) => {
  const { login } = useAuthStore()
  await login(values)
  navigateTo('/carrinho/titular')
})
</script>

<template>
  <v-form @submit.prevent="onSubmit">
    <div class="">
      <h3 class="font-weight-bold text-primary mb-6">
        Tem uma conta ?
      </h3>
      <v-row>
        <v-col cols="12">
          <TextInput
            name="login"
            variant="underlined"
            label="Login"
            hide-details
            density="compact"
          />
        </v-col>
        <v-col cols="12">
          <TextInput
            name="senha"
            variant="underlined"
            label="Senha"
            type="password"
            hide-details
            density="compact"
          />
        </v-col>
      </v-row>
    </div>

    <v-btn density="compact" color="primary" variant="text" class="text-caption mt-2 mb-4 px-0">
      Esqueci minha senha
    </v-btn>

    <div class="d-flex">
      <v-btn color="primary" rounded="md" min-width="180" type="submit" variant="outlined" class="mr-4 font-weight-regular" to="carrinho/titular">
        NÃO TENHO CONTA
      </v-btn>
      <v-btn color="primary" rounded="md" min-width="180" type="submit" variant="flat" lass="font-weight-regular">
        CONTINUAR
      </v-btn>
    </div>
  </v-form>
</template>
