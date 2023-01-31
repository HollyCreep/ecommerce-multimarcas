<script  lang="ts" setup>
const props = withDefaults(defineProps<{
  value: number
  tooltip?: string
  caption?: string
}>(), {
  caption: 'débito em conta / cartão',
})

const { value, tooltip, caption } = props
const [integer, fraction] = (`${value}`).split('.')
</script>

<template>
  <div class="price-tag d-flex flex-column text-primary ">
    <slot name="tooltip">
      <div v-if="tooltip" class="tooltip font-soletos" v-text="tooltip" />
    </slot>
    <div class="d-flex font-weight-bold">
      <div class="sign font-soleto">
        R$
      </div>
      <div class="integer font-soleto" v-text="integer || 0" />
      <div class="d-flex flex-column justify-space-evenly">
        <span class="fraction font-soleto">,{{ fraction || 0 }}</span>

        <span class="term font-noto-sans">
          Mensal
        </span>
      </div>
    </div>
    <div class="caption font-noto-sans font-weight-bold text-right">
      <slot name="append">
        {{ caption }}
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
    .price-tag {
        width: fit-content;
        .tooltip {
            font-size: 18px;
            line-height: 24px;
            letter-spacing: 0;
        }
        .sign {
            font-size: 26px;
            line-height: 34px;
            letter-spacing: 0;
        }
        .integer {
            font-size: 95px;
            line-height: 80px;
            letter-spacing: 0;
        }
        .fraction {
            font-size: 32px;
            line-height: 32px;
            letter-spacing: 0;
        }
        .term {
            font-size: 14px;
            line-height: 17px;
            letter-spacing: 0;
        }
        .caption {
            font-size: 12px;
            line-height: 14px;
            letter-spacing: 0;
            color: #707070;
        }
    }
</style>
