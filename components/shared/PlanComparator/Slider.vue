<script setup lang="ts">
import { useDisplay } from 'vuetify/lib/framework.mjs'
import type { IProduct } from '~~/types/product'

const props = defineProps<{ produtos: IProduct[]; value?: number }>()

const emit = defineEmits<{ (e: 'update:selectedProduct', value: IProduct): void }>()

const { mdAndUp } = useDisplay()
const direction = computed(() => mdAndUp.value ? 'vertical' : 'horizontal')

const product = inject<IProduct>('product')
const computedItems = computed<IProduct[]>(() => props.produtos.flatMap(p => p.sku === product.sku ? [] : p))

const selected = ref(0)
const maxHeight = ref(null)

const { getColor } = useThemeController()
const primaryColor = getColor('primary')
const secondaryColor = getColor('primary-lighten-1')
const arrowColor = computed(() => {
  const activeProduct = computedItems.value[selected.value]
  return (activeProduct && activeProduct.faxaEtaria) ? secondaryColor : primaryColor
})

onMounted(() => {
  try {
    const targetCard = document.querySelector('#card-target')
    const { height } = targetCard.getBoundingClientRect()
    maxHeight.value = `${height}px`
  }
  catch (error) {
    maxHeight.value = null
  }
})

watchEffect(() => {
  emit('update:selectedProduct', computedItems.value[selected.value])
})
</script>

<template>
  <div
    class="slider-container"
    :class="direction"
  >
    <h3 class="font-weight-bold mb-4 mb-md-10">
      COMPARE OS PRODUTOS
    </h3>
    <v-slide-group
      v-model="selected"
      :direction="direction"
      prev-icon="mdi-chevron-up"
      next-icon="mdi-chevron-down"
      selected-class="active-card"
      mandatory
      center-active
      :style="maxHeight ? { 'max-height': maxHeight } : null"
    >
      <v-slide-group-item
        v-for="(produto) in computedItems"
        :key="produto.sku"
        v-slot="{ toggle, selectedClass, isSelected }"
      >
        <v-card width="185" rounded="lg" height="150" :class="selectedClass" class="pa-4 d-flex flex-column align-center justify-center" :color="produto.faxaEtaria ? 'primary-lighten-1' : 'primary'" @click="toggle">
          <v-slide-x-reverse-transition>
            <span v-if="isSelected" v-ripple class="arrow" />
          </v-slide-x-reverse-transition>
          <Icon
            :name="produto.logo"
            :color="produto.faxaEtaria ? 'primary' : 'white'"
            :secondary-color="produto.faxaEtaria ? 'white' : 'primary-lighten-1'"
            class="text-h2 mb-2"
          />
          <EnchantedText class="font-weight-bold font-blinker text-subtitle-1" :class="produto.faxaEtaria ? 'text-primary' : 'text-primary-lighten-1'">
            {{ produto.nome }}
          </EnchantedText>
          <p v-if="produto.faxaEtaria" class="text-white">
            {{ produto.faxaEtaria }}
          </p>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </div>
</template>

<style lang="scss" scoped>
  .slider-container {
    position: relative;
    text-align: center;
    padding: 1rem 0;
    height: 100%;

    .active-card {
      position: relative;
      overflow: visible;

      .arrow {
        position: absolute;
        height: 0px;
        width: 0px;
        top: 45px;
        left: -59px;
        border-width: 30px;
        border-color: transparent v-bind(arrowColor) transparent transparent;
        border-style: solid;
      }
    }

    &.vertical {
      width: min-content;

      h3 {
        max-width: 200px;
        margin: 0 auto;
      }

      :deep(.v-slide-group__content) {
        gap: 1rem;
        padding: 0 30px;
      }

      &::before {
        content: '';
        width: calc(100% - 30px);
        height: 100%;
        border: 3px solid v-bind(secondaryColor);
        border-radius: 1rem;
        top: 0;
        left: 15px;
        position: absolute;
      }
    }

    &.horizontal {
      :deep(.v-slide-group__content) {
        gap: 1rem;
        padding: 2rem;
      }
      .active-card .arrow {
        top: 100%;
        left:50%;
        transform: translateX(-50%);
        border-width: 15px;
        border-color: v-bind(arrowColor) transparent transparent transparent;
      }
    }
  }
</style>
