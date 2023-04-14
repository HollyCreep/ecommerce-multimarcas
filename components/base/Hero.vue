<script lang="ts" setup>
defineProps<{ items: any[] }>()
</script>

<template>
  <div class="hero">
    <Carousel
      v-slot="props"
      v-bind="{ ...{ height: 'auto' }, ...$attrs }"
      :items="items"
    >
      <div class="container h-100 pt-6 pb-16 pb-md-6 d-flex flex-column" style="gap: 2rem">
        <Header />
        <div class="hero-content">
          <slot v-bind="props" />
        </div>
      </div>
    </Carousel>
  </div>
</template>

<style lang="scss" scoped>
.hero {
  .hero-content {
    height: 100%;
    width: calc(100% - 5vw);
    margin: 0 auto;
    display: flex;
    align-items: center;

    @media screen and (max-width: 1264px) {
      width: calc(100% - 10vw);
    }
  }
}
</style>
