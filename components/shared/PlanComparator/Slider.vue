<script setup lang="ts">
import type { IProduct } from '~~/types/product'

defineProps<{ produtos: IProduct[] }>()
const maxHeight = ref(null)
const selected = ref(null)

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
</script>

<template>
  <div
    class="slider-container"
  >
    <h3 class="font-weight-bold mb-md-10">
      COMPARE OS PRODUTOS
    </h3>
    <v-slide-group
      v-model="selected"
      direction="vertical"
      prev-icon="mdi-chevron-up"
      next-icon="mdi-chevron-down"
      selected-class="active-card"
      mandatory
      :max="3"
      :style="maxHeight ? { 'max-height': maxHeight } : null"
    >
      <v-slide-group-item
        v-for="(produto) in produtos"
        :key="produto.sku"
        v-slot="{ toggle, selectedClass }"
      >
        <v-card width="185" rounded="lg" height="150" :class="selectedClass" class="pa-4 d-flex flex-column align-center justify-center" :color="produto.faxaEtaria ? 'primary-lighten-1' : 'primary'" @click="toggle">
          <Icon
            :name="produto.logo"
            :color="produto.faxaEtaria ? 'primary' : 'white'"
            :secondary-color="produto.faxaEtaria ? 'white' : 'primary-lighten-1'"
            class="text-h2"
          />
          <EnchantedText class="font-weight-bold font-soleto text-subtitle-1" :class="produto.faxaEtaria ? 'text-primary' : 'text-primary-lighten-1'">
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
    width: min-content;
    text-align: center;
    padding: 1rem 0;
    height: 100%;

    :deep(.v-slide-group__content) {
      gap: 1rem;
      padding: 0 30px;
    }

    :deep(.active-card) {
      position: relative;
      overflow: visible;

      &::after {
        content:"";
        position: absolute;
        height: 0px;
        width: 0px;
        top: 45px;
        left: -59px;
        border-width: 30px;
        border-color: transparent white transparent transparent;
        border-style: solid;
      }
    }

    &::before {
      content: '';
      width: calc(100% - 30px);
      height: 100%;
      border: 1px solid red;
      border-radius: 8px;
      top: 0;
      left: 15px;
      position: absolute;
    }
  }
</style>
