<script setup lang="ts">
import { CART_ROUTES } from '~~/types/cart'

definePageMeta({
  middleware: () => {
    const store = useCartStore()
    return store.state.titular.customer ? CART_ROUTES.checkout : CART_ROUTES.titular
  },
})
</script>
