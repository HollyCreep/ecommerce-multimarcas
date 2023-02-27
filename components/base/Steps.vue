<script lang="ts" setup>
export interface IStepItem {
  text: string
  value: number
  valid?: boolean
  required?: boolean
}

interface IProps {
  items: Array<IStepItem | string>
  step: number
  inset?: boolean
  color?: string
  borderStyle?: string
  borderColor?: string
  textcolor?: string
}

const props = withDefaults(defineProps<IProps>(), {
  color: 'primary',
  inset: true,
  borderStyle: 'solid',
  borderColor: '#C2C2C2',
  textcolor: 'text-primary',
})

defineEmits(['update:step'])

const { getColor } = useThemeController()
const borderColor = getColor(props.borderColor)
const textcolor = getColor(props.textcolor)
const borderStyle = props.borderStyle

const isActive = (item: IStepItem | string, index: number) => {
  if (Object.prototype.hasOwnProperty.call(item, 'value'))
    return props.step === (item as IStepItem).value

  return props.step === index
}
</script>

<template>
  <div class="steps" :class="{ inset }">
    <ul class="invisible-overflow">
      <template v-for="(item, index) in items" :key="index">
        <li class="step-item text-main">
          <slot name="item" v-bind="{ item, index }">
            <v-avatar
              size="48"
              :color="isActive(item, index) ? props.color : '#C2C2C2'"
              class="no-text-pointer"
              @click="$emit('update:step', (item as IStepItem)?.value || index)"
            >
              <v-icon v-if="!!(item as IStepItem)?.required && !!(item as IStepItem)?.valid" icon="mdi-check-bold" />
              <h5 v-else class="text-white">
                {{ index + 1 }}
              </h5>
            </v-avatar>
            <span class="text-body-1" :class="{ [textcolor]: isActive(item, index) }">{{ (item as IStepItem)?.text || item }}</span>
          </slot>
          <slot name="append" v-bind="{ item, index }" />
        </li>
      </template>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
$gap: 2rem;
$avatar-height: 48px;
$border-style: v-bind(borderStyle);
$border-color: v-bind(borderColor);

@mixin connection-border($inset: false) {
  content: '';
  position: absolute;
  height: 1px;
  top: calc(#{$avatar-height} / 2);
  border-top: 1px #{$border-style} #{$border-color};
  width: calc(100% - #{$gap} * 2);

  @if $inset {
    left: calc(50% + #{$gap} * 1.5);
  } @else {
    left: 0;
  }
}

.steps {
  &:not(.inset) .step-item::before {
    @include connection-border();
  }

  &.inset .step-item:not(:last-of-type)::before {
    @include connection-border(true);
  }

  ul {
    width: 100%;
    display: inline-flex;
    position: relative;
    gap: $gap;

    > li {
      flex: 1;
    }
  }
  .step-item {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    position: relative;
    width: 100%;
    text-align: center;
  }
}
</style>
