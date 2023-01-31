<script lang="ts" setup>
import type { Link } from '~/types'

const props = withDefaults(defineProps<{
  items: Link[]
  dark?: boolean
  vertical?: boolean
  buttonClass?: string
}>(), {
  dense: false,
  vertical: false,
})
</script>

<template>
  <v-slide-group class="odp-link-group" :direction="vertical ? 'vertical' : 'horizontal'">
    <slot name="prepend" />
    <v-slide-group-item v-for="(item, index) in items" :key="`desktop-${index}`">
      <v-btn
        v-bind="{ ...$attrs, ...{ download: item.download } }"
        :href="item.href ?? undefined"
        :target="item.href ? '_blank' : ''"
        :to="item.to ?? undefined"
        :class="buttonClass"
        variant="text"
        exact
      >
        {{ item.text }}
      </v-btn>
    </v-slide-group-item>
    <slot name="append" />
  </v-slide-group>
</template>

<style lang="scss" scoped>
.odp-link-group {
  :deep(.v-slide-group__content) {
    align-items: center;
  }
}
</style>
