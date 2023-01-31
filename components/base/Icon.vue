<script lang="ts" setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  secondaryColor: {
    type: String,
    default: 'primary',
    required: false,
  },
  filled: {
    type: Boolean,
    default: false,
    required: false,
  },
  width: {
    type: [String, Number],
    default: null,
    required: false,
  },
  height: {
    type: [String, Number],
    default: null,
    required: false,
  },
})

const { getColor } = useThemeController()
const primaryColor = getColor(props.color)
const secondaryColor = getColor(props?.secondaryColor || props.color)

function isNumber(n: any) {
  return !isNaN(parseFloat(n)) && !isNaN(n - 0)
}

function getValue(prop: string | number) {
  if (!prop)
    return null

  return isNumber(prop) ? `${prop}px` : prop
}
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
