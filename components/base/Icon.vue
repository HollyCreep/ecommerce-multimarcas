<script lang="ts" setup>
export interface IconProps {
  name: string
  color: string
  secondaryColor: string
  filled?: boolean
  width?: string | number
  height?: string | number
}

const props = withDefaults(defineProps<IconProps>(), {
  secondaryColor: 'primary',
  filled: false,
})

const { getColor } = useThemeController()
const { getValue } = useUtils()
const primaryColor = getColor(props.color)
const secondaryColor = getColor(props?.secondaryColor || props.color)

const width = getValue(props.width)
const height = getValue(props.height)
</script>

<template>
  <NuxtIcon v-bind="{ ...$attrs, ...props }" class="odp-custom-icon" :style="{ width, height }" :class="{ resisable: !!width || !!height }" />
</template>

<style lang="scss" scoped>
.odp-custom-icon {
  display: inline-flex;

  :deep(svg) {
    color: v-bind(primaryColor);
    height: auto;
    margin-bottom: 0;
    display: inline-block;
    .primary {
      fill: v-bind(primaryColor);
    }

    .secondary {
      fill: v-bind(secondaryColor) !important;
    }

    .stroke-primary {
      stroke: v-bind(primaryColor);
    }

    .stroke-secondary {
      stroke: v-bind(secondaryColor) !important;
    }
  }

  &.resisable {
    :deep(svg) {
      width: 100%;
    }
  }
}
</style>
