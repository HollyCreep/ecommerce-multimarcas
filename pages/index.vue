<script lang="ts">
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import OdontoPrev from '@/components/pages/home/odontoPrev/index.vue'
import OdontoSystem from '@/components/pages/home/odontoSystem/index.vue'
import Icon from '@/components/base/Icon.vue'

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
  <Icon color="primary" name="dente-brilho" />
  <v-btn color="success">
    text
  </v-btn>
</template>
