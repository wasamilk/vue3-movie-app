<template>
  <Headline />
  <Search />
  <MovieList />
</template>

<script>
import Headline from '~/components/Headline'
import Search from '~/components/Search'
import MovieList from "../components/MovieList";
import Footer from "../components/Footer";

export default {
  name: "Home.vue",
  components :{
    Headline,
    Search,
    MovieList
  }
}
</script>

<style scoped>

</style>