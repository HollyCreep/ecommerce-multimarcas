<script setup lang="ts">
import type { IComputedCartPLan } from '~~/types/cart'

const props = defineProps<{
  plan: IComputedCartPLan
  dark?: boolean
}>()

const carencia = computed(() => props.plan.especialidades.reduce((acc, val) => {
  acc.push(`${val.diasCarencia} dias para ${val.nome}`)
  return acc
}, [] as string[]).join(' e '))
</script>

<template>
  <v-card class="pa-4 rounded-lg" :color="dark ? 'primary' : '#F6F6F6'" :dark="dark" max-width="460">
    <div class="title d-flex align-center " :class="{ 'text-primary': !dark }">
      <Icon :key="+dark" :name="plan.logo" :color="dark ? 'white' : 'primary'" secondary-color="primary-lighten-1" class="text-h2 mr-3" />
      <div>
        <p class="text-subtitle-1 font-soleto">
          Plano
        </p>
        <h4 class="font-weight-bold">
          {{ plan.nomeFantasia }}
        </h4>
      </div>
    </div>
    <v-divider class="border-opacity-100 border-t-md border-primary my-2" />

    <v-row justify="space-between" align="center">
      <v-col cols="5">
        <p class="mb-2">
          Contrato: <span class="text-capitalize font-weight-bold">{{ plan.tipoNegociacao.toLowerCase() }}</span>
        </p>
        <p style="font-size: 10px; line-height: 12px" :class="{ 'text-main': !dark }">
          Carência: {{ carencia }}
        </p>
      </v-col>
      <v-col cols="auto">
        <PriceTag :value="plan.valor" size="small" :dark="dark" />
      </v-col>
    </v-row>
  </v-card>
</template>

<style lang="scss" scoped>
.summary-card {

}
</style>
