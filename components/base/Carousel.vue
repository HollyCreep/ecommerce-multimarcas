<script lang="ts" setup>
import delimiter from '~~/components/functionals/Delimiter.vue'
const props = withDefaults(defineProps<{
  items: any[]
  color?: string
}>(), {
  color: 'primary',
})

const activeSlide = ref(0)
const { getColor } = useThemeController()
const color = getColor(props.color)

const size = computed(() => props.items.length)

function next() {
  activeSlide.value++
}

function previous() {
  const value = activeSlide.value - 1
  activeSlide.value = value < 0 ? size.value - 1 : value
}

function changeSlide(index: number) {
  activeSlide.value = index
}
</script>

<template>
  <v-carousel
    v-model="activeSlide"
    class="odp-hero-carousel"
    hide-delimiter-background
    :hide-delimiters="items.length < 2 "
    :delimiter-icon="delimiter"
    :show-arrows-on-hover="
      Object.prototype.hasOwnProperty.call($attrs, 'show-arrows')
        ? $attrs['show-arrows']
        : !!items.length && items.length > 1
    "
    :show-arrows="
      Object.prototype.hasOwnProperty.call($attrs, 'show-arrows')
        ? !!$attrs['show-arrows']
        : !!items.length && items.length > 1
    "
    v-bind="$attrs"
  >
    <template #prev="{ props: prevProps }">
      <v-btn
        variant="plain"
        color="red"
        @click="prevProps.onClick"
      >
        <v-icon icon="mdi-chevron-left" size="50px" color="primary" />
      </v-btn>
    </template>
    <template #next="{ props: nextProps }">
      <v-btn
        variant="plain"
        @click="nextProps.onClick"
      >
        <v-icon icon="mdi-chevron-right" size="50px" color="primary" />
      </v-btn>
    </template>
    <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src" cover>
      <slot
        :item="item"
        :index="i"
        :active-slide="activeSlide"
        :change-slide="changeSlide"
        :size="size"
      />
    </v-carousel-item>
  </v-carousel>
</template>

<style lang="scss" scoped>
.odp-hero-carousel {
  position: relative;

  ::v-deep(.v-carousel__controls .v-btn) {
      &.v-btn--active i .delimiter::after {
        content: '';
        position: absolute;
        background-color: v-bind(color);
        left: 2px;
        top: 2px;
        height: calc(100% - 4px);
        width: calc(100% - 4px);
        font-size: 12px;
        border-radius: 50%;
      }
  }
}
</style>
