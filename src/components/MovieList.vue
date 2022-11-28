<template>
  <div class="containter">
    <div class="inner">
      <MovieItem v-for="movie in movies" :key="movie.imdbID"/>
    </div>
  </div>
</template>

<script>
import MovieItem from "./MovieItem";
export default {
  name: "MovieList",
  data() {
    return {
      movies: []
    }
  },
  components: {
    MovieItem
  }
}
</script>

<style scoped>

</style>