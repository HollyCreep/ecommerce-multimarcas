<script lang="ts" setup>
export interface ISocialMediaIcon {
  href: string
  icon: string
}

export interface ISocialMediaSVG {
  href: string
  svg: string
}

export type ISocialMedia = ISocialMediaIcon | ISocialMediaSVG

const props = withDefaults(defineProps<{
  items: Array<ISocialMedia>
  color?: string
  secondaryColor?: string
  gap?: string | number
  size?: string | number
  buttonClass?: string
  label?: string
}>(), {
  color: 'primary',
  secondaryColor: 'secondary',
  gap: 12,
  size: 24,
  label: 'Encontre-nos\n nas Redes sociais:',
})

const { getValue } = useUtils()
const computedGap = getValue(props.gap)
const computedSize = getValue(props.size)
</script>

<template>
  <div class="d-flex flex-column flex-md-row align-center">
    <slot name="label">
      <EnchantedText class="mr-4">
        {{ label }}
      </EnchantedText>
    </slot>
    <ul class="odp-social-media">
      <li v-for="(item, index) in items" :key="index">
        <v-btn
          :class="buttonClass"
          :href="item.href"
          :color="color"
          target="_blank"
          variant="flat"
          icon
          v-bind="$attrs"
        >
          <v-icon v-if="Object.prototype.hasOwnProperty.call(item, 'icon')" :size="computedSize" :color="secondaryColor">
            {{ (item as ISocialMediaIcon).icon }}
          </v-icon>
          <Icon
            v-else-if="Object.prototype.hasOwnProperty.call(item, 'svg')"
            :name="(item as ISocialMediaSVG).svg"
            :color="secondaryColor"
            :width="computedSize"
            :height="computedSize"
            class="text-h3"
          />
        </v-btn>
      </li>
    </ul>
  </div>
</template>

,
<style lang="scss" scoped>
.odp-social-media {
  display: inline-flex;
  list-style: none;
  gap: v-bind(computedGap);

  :deep(.v-btn.v-btn--icon) {
    border-radius: 25%;
  }
}
</style>
