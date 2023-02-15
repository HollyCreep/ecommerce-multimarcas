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
}>(), {
  color: 'primary',
  secondaryColor: 'secondary',
  gap: 12,
  size: 24,
})

const { getValue } = useUtils()
const computedGap = getValue(props.gap)
const computedSize = getValue(props.size)
</script>

<template>
  <div class="d-flex flex-column flex-md-row align-center">
    <EnchantedText class="mr-4">
      {{ `Encontre-nos\n nas Redes sociais:` }}
    </EnchantedText>
    <ul class="odp-social-media">
      <li v-for="(item, index) in items" :key="index">
        <v-btn
          v-bind="$attrs"
          :class="buttonClass"
          :href="item.href"
          :color="color"
          target="_blank"
          variant="flat"
          icon
        >
          <v-icon v-if="Object.prototype.hasOwnProperty.call(item, 'icon')" :size="computedSize" :color="secondaryColor">
            {{ (item as ISocialMediaIcon).icon }}
          </v-icon>
          <Icon
            v-else-if="Object.prototype.hasOwnProperty.call(item, 'svg')"
            :name="(item as ISocialMediaSVG).svg"
            :color="secondaryColor"
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
