<template>
  <div>{{ movie.imdbID }}</div>

</template>

<script>
export default {
  name: "MovieItem",
  props: {
    movie: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style scoped>

</style>