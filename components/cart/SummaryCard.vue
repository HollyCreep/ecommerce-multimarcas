<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { CART_ROUTES } from '~~/types/cart'

const store = useCartStore()
const { resumo } = storeToRefs(store)
</script>

<template>
  <v-card class="py-8 px-6">
    <h2 class="text-primary font-weight-bold mb-8">
      <Icon name="cart-fill" color="primary" secondary-color="primary-lighten-1" />
      Resumo do pedido
    </h2>
    <CartPlanPeriodSwitcher class="mb-8" />
    <v-slide-x-transition
      class="resumo-plans-list mb-4"
      tag="ul"
      group
    >
      <li key="titular" class="mb-3">
        <p class="text-subtitle-2 font-noto-sans mb-1">
          Titular
        </p>
        <div class="d-flex justify-space-between text-main">
          <p class="font-weight-bold text-subtitle-1 font-noto-sans">
            {{ resumo.titular.customer.name }}
          </p>
          <div class="d-flex align-center">
            <p class=" text-subtitle-1 font-noto-sans mr-2">
              <span class="font-weight-bold">R$</span> {{ resumo.titular.plan.valor }}
            </p>
            <v-menu>
              <template #activator="{ props }">
                <v-btn icon="mdi-dots-vertical" v-bind="props" variant="text" density="compact" size="small" />
              </template>

              <v-list density="compact">
                <v-list-item :to="CART_ROUTES.titular">
                  <v-list-item-title><v-icon size="small" class="mr-2" icon="mdi-pencil" color="amber" /> Editar</v-list-item-title>
                </v-list-item>
                <v-list-item @click="resumo.titular.delete">
                  <v-list-item-title><v-icon size="small" color="error" class="mr-2" icon="mdi-delete" />Excluir</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </div>
      </li>
      <template v-if="resumo.dependentes && resumo.dependentes.length">
        <p class="text-subtitle-2 font-noto-sans mb-1">
          Dependentes: {{ resumo.qtdDependentes }}
        </p>
        <li v-for="(dep, i) in resumo.dependentes" :key="`dependente-${i}`">
          <div class="text-main d-flex justify-space-between align-center">
            <p class="d-inline-block font-weight-bold text-subtitle-1 font-noto-sans text-truncate">
              {{ dep.customer.nome }}
            </p>
            <div class="d-inline-flex align-center">
              <p class=" text-subtitle-1 font-noto-sans mr-2">
                <span class="font-weight-bold">R$</span> {{ dep.plan.valor }}
              </p>
              <v-menu>
                <template #activator="{ props }">
                  <v-btn icon="mdi-dots-vertical" v-bind="props" variant="text" density="compact" size="small" />
                </template>

                <v-list>
                  <v-list-item :to="`${CART_ROUTES.dependente}/${i}`">
                    <v-list-item-title><v-icon size="small" class="mr-2" icon="mdi-pencil" color="amber" /> Editar</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="dep.delete">
                    <v-list-item-title><v-icon size="small" color="error" class="mr-2" icon="mdi-delete" />Excluir</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </div>
          <p class="text-subtitle-2 font-noto-sans">
            {{ dep.plan.nomeFantasia }}
          </p>
        </li>
      </template>
    </v-slide-x-transition>

    <v-btn
      v-if="!store.isTitularMenorDeIdade || (store.isTitularMenorDeIdade && !store.state.responsavel)"
      color="secondary" variant="text" prepend-icon="mdi-plus" class="font-weight-bold text-subtitle-1 font-noto-sans px-0" density="comfortable"
      :to="store.isTitularMenorDeIdade ? CART_ROUTES.responsavel : CART_ROUTES.dependente"
    >
      Adicionar {{ store.isTitularMenorDeIdade ? 'responsável' : 'dependente' }}
    </v-btn>

    <v-divider class="my-2" />

    <div class="d-flex justify-space-between text-main mb-1">
      <p class="text-subtitle-2 font-noto-sans">
        Vidas
      </p>
      <p class=" text-subtitle-1 font-noto-sans">
        <span class="font-weight-bold">Total:</span> R${{ resumo.valorTotal }}
      </p>
    </div>
    <div class="d-flex justify-space-between text-main mb-1">
      <p class="f text-subtitle-1 font-noto-sans">
        <span class="font-weight-bold">Total:</span> {{ resumo.totalVidas }}
      </p>
      <p class=" text-subtitle-2 font-noto-sans font-weight-bold text-capitalize">
        {{ resumo.period.toLowerCase() }}
      </p>
    </div>
  </v-card>
</template>

<style scoped>
.resumo-plans-list{
  list-style: none;
}
</style>
