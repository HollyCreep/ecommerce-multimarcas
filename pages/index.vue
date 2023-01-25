<script lang="ts">
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import OdontoPrev from '@/components/pages/home/odontoPrev/index.vue'
import OdontoSystem from '@/components/pages/home/odontoSystem/index.vue'
import { Brands } from '@/types/enums'

export default defineComponent({
  components: {
    OdontoPrev,
    OdontoSystem,
  },
  setup() {
    const store = useThemeStore()
    const { activeBrand } = storeToRefs(store)
    const { changeTheme } = useThemeController()
    return { activeBrand, changeTheme, Brands }
  },
})
</script>

<template>
  <component :is="activeBrand.name" />
  <v-btn color="success" @click="changeTheme(Brands.ODONTO_PREV)" />
  <v-btn color="red" @click="changeTheme(Brands.ODONTO_SYSTEM)">
    text
  </v-btn>
</template>
