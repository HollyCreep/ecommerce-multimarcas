<script setup lang="ts">
import type { IPlan, IProduct } from '~~/types/product'

export interface IPlanCard {
  product: IProduct
  color?: string
  active?: boolean
}

const props = withDefaults(defineProps<IPlanCard>(), {
  color: 'primary-lighten-1',
})

const emit = defineEmits<{ (e: 'selected', value: IProduct): void }>()

const { getColor } = useThemeController()
const secondaryColor = getColor(props.color)
const inconPrimaryColor = computed(() => props.active ? secondaryColor : 'primary')
const inconSecondaryColor = computed(() => props.active ? 'white' : secondaryColor)

const plan = props.product.planos.find(p => p.tipoNegociacao === 'MENSAL') as IPlan
</script>

<template>
  <v-hover>
    <template #default="{ isHovering }">
      <v-card
        v-bind="$attrs"
        height="150"
        width="130"
        rounded="lg"
        variant="outlined"
        :color="isHovering ? color : undefined"
        class="small-plan-card text-center border-border border-opacity-100 border"
        @click="emit('selected', product)"
      >
        <v-card-text :class="props.active ? 'text-white' : 'text-primary' ">
          <Icon
            :key="+active"
            :name="product.logo"
            :color="inconPrimaryColor"
            :secondary-color="inconSecondaryColor"
            class="mb-2"
            height="40"
          />
          <div>
            <EnchantedText class="font-weight-bold font-soleto text-subtitle-1">
              {{ plan?.nomeFantasia }}
            </EnchantedText>
            <p>{{ product.faxaEtaria }}</p>
          </div>
        </v-card-text>
      </v-card>
    </template>
  </v-hover>
</template>

<style lang="scss" scoped>
.small-plan-card {
    // box-sizing: content-box;
}
</style>
