<template>
  <div class="containter">
    <div class="inner">
      <MovieItem v-for="movie in movies" :key="movie.imdbID" :movie="movie"/>
    </div>
  </div>
</template>

<script>
import MovieItem from "./MovieItem";
export default {
  name: "MovieList",
  computed: {
    movies() {
      return this.$store.state.movie.movies
    }
  },
  components: {
    MovieItem
  }
}
</script>

<style scoped>

</style>