<script  lang="ts" setup>
type Size = 'small' | 'medium' | 'large'

const props = withDefaults(defineProps<{
  value: number
  tooltip?: string
  caption?: string
  size?: Size
  textColor?: string
}>(), {
  caption: 'cartão de crédito / débito em conta',
  size: 'large',
  textColor: 'text-primary',
})

const { value, tooltip, caption } = props
const [integer, fraction] = (`${value}`).split('.')

const fonts: Record<Size, string> = {
  small: '10px',
  medium: '14px',
  large: '16px',
}
const fontSize = computed(() => fonts[props.size])
</script>

<template>
  <div class="price-tag d-flex flex-column" :class="[size, !!$attrs.dark ? 'text-white' : textColor]">
    <slot name="tooltip">
      <div v-if="tooltip" class="tooltip font-blinkers" v-text="tooltip" />
    </slot>
    <div class="d-flex font-weight-bold">
      <div class="sign font-blinker">
        R$
      </div>
      <div class="integer font-blinker mr-1" v-text="integer || 0" />
      <div class="d-flex flex-column justify-center align-baseline">
        <span class="fraction font-blinker mb-1">,{{ fraction || '00' }}</span>

        <span class="period font-noto-sans">
          Mensal
        </span>
      </div>
    </div>
    <div class="caption font-noto-sans font-weight-bold text-right" :class="{ 'text-white': !!$attrs.dark }">
      <slot name="append">
        {{ caption }}
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.price-tag {
  width: fit-content;
  font-size: v-bind(fontSize);

  .tooltip {
    font-size: 1.125em;
    letter-spacing: 0;
  }

  .sign {
    font-size: 1.5em;
    letter-spacing: 0;
  }

  .integer {
    font-size: 6em;
    line-height: 1.1;
    letter-spacing: 0;
  }

  .fraction {
    font-size: 2em;
    letter-spacing: 0;
  }

  .period {
    font-size: .875em;
    letter-spacing: 0;
  }

  .caption {
    font-size: .75em;
    letter-spacing: 0;
    color: #707070;
  }
}

.plan-card:has(.price-tag) {
  .sign {
    font-size: 18px;
    line-height: 24rpx;
  }

  .integer {
    font-size: 60px;
  }

  .fraction {
    font-size: 20px;
    line-height: 20rpx;
  }

  .period {
    font-size: 12px;
    line-height: 14rpx;
    letter-spacing: 0;
  }

  .caption {
    font-size: 10px;
    line-height: 12rpx;
  }
}
</style>
