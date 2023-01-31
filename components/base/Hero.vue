<script lang="ts" setup>
defineProps<{
  items: any[]
}>()
</script>

<template>
  <div class="hero">
    <Carousel
      v-slot="props"
      v-bind="{ ...{ height: 'auto' }, ...$attrs }"
      :items="items"
    >
      <v-container class="h-100">
        <Header />
        <div class="hero-content">
          <slot v-bind="props" />
        </div>
      </v-container>
    </Carousel>
  </div>
</template>

<style lang="scss" scoped>
.hero {
  .hero-content {
    height: 100%;
    width: calc(100% - 10vw);
    margin: 0 auto;
    display: flex;
    align-items: center;
  }
}
</style>
