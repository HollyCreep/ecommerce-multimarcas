<script setup lang="ts">
import FormBoleto from './FormBoleto.vue'
import FormCreditCard from './FormCreditCard.vue'
import FormDebit from './FormDebit.vue'
import type { IPaymentMethod } from '~~/types/payment'

const { getCompanyAvaiblePaymentMethods } = useCartPaymentApi()

const components = {
  1: FormCreditCard,
  2: FormDebit,
  3: FormBoleto,
}

const state = ref({
  items: [] as IPaymentMethod[],
})

const activeIndex = ref<keyof typeof components>(null)
const activeComponent = computed(() => components[activeIndex.value])
const currentPaymentMethod = computed(() => state.value.items.find(i => +i.id === activeIndex.value))

const { data, pending } = getCompanyAvaiblePaymentMethods({ lazy: true })
watch(data, (paymentMethods) => {
  state.value.items = paymentMethods
  activeIndex.value = +state.value.items[0].id as keyof typeof components
})

function handleFormSubmition() {
  console.warn('Deu tudo certo, xuxu blzzzzzz')
}
</script>

<template>
  <h2 class="text-primary font-weight-bold mb-8">
    <Icon name="user" color="primary" secondary-color="primary-lighten-1" class="mr-2" />
    Detalhes e pagamento
  </h2>
  <v-card class="px-6 py-8 mb-8" rounded="lg">
    <h4 class="text-primary font-weight-bold">
      Escolha a forma de pagamento
    </h4>
    <v-divider class="my-4" />
    <v-scroll-x-transition mode="out-in">
      <FunctionalsLinearLoader v-if="pending">
        Buscando formas de pagamento...
      </FunctionalsLinearLoader>
      <v-radio-group v-else-if="state.items.length" v-model="activeIndex" inline mandatory color="primary" hide-details>
        <v-radio v-for="item in data" :key="item.id" :label="item.name" :value="+item.id" :model-value="item.id" />
      </v-radio-group>
      <h5 v-else>
        Falha ao carregar métodos de paganto, tente novamente em breve.
      </h5>
    </v-scroll-x-transition>
  </v-card>

  <div class="px-6">
    <v-scroll-x-transition mode="out-in">
      <component :is="activeComponent" v-bind="currentPaymentMethod" @submited="handleFormSubmition" />
    </v-scroll-x-transition>
  </div>
</template>

<style scoped>

</style>
