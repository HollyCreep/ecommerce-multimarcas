<script lang="ts">
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import OdontoPrev from '@/components/pages/home/odontoPrev/index.vue'
import OdontoSystem from '@/components/pages/home/odontoSystem/index.vue'

export default defineComponent({
  components: {
    OdontoPrev,
    OdontoSystem,
  },
  setup() {
    const store = useThemeStore()
    const { activeBrand } = storeToRefs(store)

    return { activeBrand }
  },
})
</script>

<template>
  <component :is="activeBrand.name" />
</template>
