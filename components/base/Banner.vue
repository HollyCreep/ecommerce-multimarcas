<script>
export default {
}
</script>

<template>
  <v-banner
    lines="one"
    icon="mdi-lock"
    color="deep-purple-accent-4"
    class="my-4"
  >
    <v-banner-text>
      Banner with one line of text.
    </v-banner-text>

    <template #actions>
      <v-btn>Action</v-btn>
    </template>
  </v-banner>
</template>

<style lang="scss" scoped>

</style>
