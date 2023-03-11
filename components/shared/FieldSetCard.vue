<script setup lang="ts">
export interface IFieldSetCard {
  title: string
  items: string[]
  color?: string
  icon?: string
  columns?: number
}
const props = withDefaults(defineProps<IFieldSetCard>(), {
  color: 'primary',
  icon: 'mdi-check-bold',
  columns: 1,
})

const { getColor } = useThemeController()
const borderColor = getColor(props.color)
</script>

<template>
  <fieldset>
    <legend v-text="title" />
    <div class="list">
      <v-list-item v-for="(item, n) in items" :key="n" :title="item" class="item">
        <template #prepend>
          <v-icon :icon="icon" :color="color" size="2rem" />
        </template>
      </v-list-item>
    </div>
  </fieldset>
</template>

<style lang="scss" scoped>
$gap: 4px;

 fieldset {
    border: 3px solid v-bind(borderColor);
    border-radius: 8px;
    min-height: 100px;
    padding: 1rem 2rem 2rem;

    legend {
      font-size: 18px;
      font-weight: bold;
      padding: 0 8px;
    }

    .list {
      display: flex;
      flex-wrap: wrap;
      padding-left: 8px;
      column-gap: $gap;
    }

    .item {
      flex: 1;
      flex-basis: calc((100% - #{$gap}) / v-bind('columns'));
      padding: 0px;

      :deep(.v-list-item__prepend > .v-icon) {
        opacity: unset;
      }
    }
 }
</style>
