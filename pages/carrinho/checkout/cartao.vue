<script setup lang="ts">
import { CART_ROUTES } from '~~/types/cart'

definePageMeta({
  middleware() {
    const store = useCartStore()

    if (!store.allStepsValid)
      return CART_ROUTES.checkout

    if (!store.state.titular.customer || !store.state.titular.product)
      return CART_ROUTES.carrinho
  },
})

async function finalizar() {
  const { $reset } = useCartStore()
  $reset()
  await navigateTo('/')
}
</script>

<template>
  <div>
    <div class="d-flex align-center mb-8">
      <v-icon icon="mdi-check-circle" color="primary" size="48" />
      <h2 class="ml-4 text-primary font-weight-bold">
        Eba! Pagamento feito.
      </h2>
    </div>
    <v-card class="text-main pa-6">
      <h4 class="text-primary font-weight-bold">
        Seu pagamento foi processado com sucesso
      </h4>
      <v-divider class="mt-2 mb-8" />

      <p>Muito mais que um plano odontológico, somos uma plataforma de cuidado. Prezamos por uma experiência leve, descomplicara, intuitiva. Tudo isso para que nossos clientes incluam o atendimento odontológico na sua rotina de autocuidado, valorizado a prevenção.</p>

      <h6 class="font-weight-bold my-8">
        SOMOS EXPERTS EM ODONTOLOGIA!
      </h6>

      <p class="mb-8">
        Fique atento: nos próximos dias você receberá um email com mais informações sobre como aproveitar ao máxima o seu plano odontológico.
      </p>

      <v-btn color="secondary" width="180" variant="flat" size="large" @click="finalizar">
        Finalizar
      </v-btn>
    </v-card>
  </div>
</template>
