<script lang="ts" setup>
import { omit } from 'lodash'
import type { Link } from '~/types'

withDefaults(defineProps<{
  items: Link[]
  dark?: boolean
  vertical?: boolean
  buttonClass?: string
}>(), {
  vertical: false,
})
</script>

<template>
  <v-slide-group class="odp-link-group" :direction="vertical ? 'vertical' : 'horizontal'" show-arrows :class="vertical ? 'vertical' : 'horizontal'">
    <slot name="prepend" />
    <v-slide-group-item v-for="(item, index) in items" :key="`desktop-${index}`">
      <v-btn
        v-bind="{ ...omit($attrs, 'class'), ...{ download: item.download } }"
        :href="item.href ?? undefined"
        :target="item.href ? '_blank' : ''"
        :to="item.to ?? undefined"
        :class="buttonClass"
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

  &.horizontal {
    :deep(.v-slide-group__content) {
      align-items: center;
    }
  }
  &.vertical {
    :deep(.v-slide-group__content) {
      align-items: flex-start;
    }
  }
}
</style>
