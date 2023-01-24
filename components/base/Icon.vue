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
})

const { getColor } = useThemeController()
const primaryColor = getColor(props.color)
const secondaryColor = getColor(props?.secondaryColor || props.color)
</script>

<template>
  <NuxtIcon v-bind="{ ...$attrs, ...props }" class="odp-custom-icon" />
</template>

<style lang="scss" scoped>
.odp-custom-icon {
  :deep(svg) {
    color: v-bind(primaryColor);
    .primary {
      fill: v-bind(primaryColor);
    }

    .secondary {
      fill: v-bind(secondaryColor) !important;
    }

    .stroke-primary {
      stroke: var(--color);
    }

    .stroke-secondary {
      stroke: v-bind(secondaryColor) !important;
    }
  }
}
</style>
