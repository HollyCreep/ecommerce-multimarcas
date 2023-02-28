<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { CART_ROUTES } from '~~/types/cart'

export interface ICartStepItem {
  text: string
  valid?: boolean
  required?: boolean
}

const rawColors = {
  primary: 'primary',
  text: 'main',
  valid: 'primary-lighten-1',
  muted: '#C2C2C2',
}

const { getColor } = useThemeController()
const textcolor = getColor(rawColors.text)
const primaryColor = getColor(rawColors.primary)
const mutedColor = getColor(rawColors.muted)
const validColor = getColor(rawColors.valid)

const store = useCartStore()
const { steps } = storeToRefs(store)
</script>

<template>
  <div class="steps">
    <ul class="invisible-overflow">
      <template v-for="(item, index) in steps" :key="index">
        <nuxt-link :to="CART_ROUTES[index]" class="step-item" exact-active-class="step-item-active" :class="{ 'step-item-valid': !!item.valid }">
          <v-avatar
            size="48"
            class="no-text-pointer"
          >
            <v-icon v-if="!!item.valid" icon="mdi-check-bold" color="white" />
            <h5 v-else class="text-white font-weight-bold">
              {{ +index + 1 }}
            </h5>
          </v-avatar>
          <span class="content text-body-1">{{ item.text }}</span>
        </nuxt-link>
      </template>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
$gap: 2rem;
$line-size: 4px;
$avatar-height: 48px;
$muted-color: v-bind(mutedColor);
$primary-color: v-bind(primaryColor);
$valid-color: v-bind(validColor);
$text-color: v-bind(textcolor);

.steps {
  ul {
    width: 100%;
    display: inline-flex;
    position: relative;
    gap: $gap;

    .step-item {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
      position: relative;
      width: 100%;
      text-align: center;
      flex: 1;
      text-decoration: inherit;
      color: $text-color;

      .v-avatar {
        background: $muted-color;
      }

      &:not(:last-of-type)::before {
        content: '';
        position: absolute;
        height: $line-size;
        top: calc(#{$avatar-height} / 2);
        background: $muted-color;
        width: calc(100% + #{$gap});
        left: 50%;

        background: linear-gradient(to left, #{$muted-color} 50%, #{$primary-color} 50%) right;
        background-size: 200%;
        transition: .5s ease-out;
      }

      &-active {
        .v-avatar {
          background: $primary-color;
        }
      }

      &-valid {
        &::before {
          background-position: left !important;
        }
        &:not(.step-item-active) .v-avatar {
          background: $valid-color;
          border: #{$line-size} solid #{$primary-color};
        }
      }
    }
  }
}
</style>
