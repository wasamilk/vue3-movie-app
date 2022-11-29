<template>
  <Headline />
  <Search />
  <MovieList />
  <Footer />
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
    MovieList,
    Footer
  }
}
</script>

<style scoped>

</style>