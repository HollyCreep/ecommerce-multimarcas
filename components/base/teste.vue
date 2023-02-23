<script setup lang="ts">
defineProps<{ items: any[] }>()

const { getColor } = useThemeController()
const color = getColor('primary')
</script>

<template>
  <ul class="odp-steps">
    <li v-for="(item, i) in items" :key="i">
      <div class="odp-step-number">
        {{ i + 1 }}
      </div>
      <slot :item="item">
        <span>{{ item }}</span>
      </slot>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
  ul.odp-steps {
    width: 100%;
    display: flex;
    list-style: none;
    justify-content: space-around;

    li {
      text-align: center;
      position: relative;
      .odp-step-number {
        border-radius: 50%;
        width: 48px;
        height: 48px;
        background-color: v-bind(color);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        font-weight: bold;
        color: white;
        margin: 0 auto;
      }

      &:first-child {
        background-color: red;

        &::after {
          content: '';
          position: absolute;
          border-top: 1px solid grey;
          width: 100%;
          height: 1px;
          top: 50%;
          right: 0;
        }
      }
    }
  }
</style>
