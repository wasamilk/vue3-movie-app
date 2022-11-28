<template>
  <RouterLink class="logo" to="/">
    <span>Movie</span>.COM
  </RouterLink>
</template>

<style lang="scss" scoped>
@import "~/scss/main.scss";
.logo {
  font-family: "Oswald", sans-serif;
  font-size: 20px;
  color: $black;
  text-decoration: none;
  &:hover{
    color: $black;
  }
  span {
    color: $primary;
  }
}
</style>