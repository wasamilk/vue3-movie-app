<template>
  <div class="container">
    <input type="text" class="form-control" v-model="title" @keyup.enter="apply"
           placeholder="Search for Movies, Series & more"/>
    <div class="selects">
      <!-- js 동적 바인딩 : $data.type -> $data[filter.name] -> $data["type"] -> data.type -->
      <!-- v-model? 입력값 양방향 바인딩 -->
      <select v-for="filter in filters" :key="filter" class="form-select" v-model="$data[filter.name]">
        <option value="" v-if="filter.name === 'year'">All Years</option>
        <option v-for="item in filter.items" :key="item">{{ item }}</option> <!-- :value="item" -->
      </select>
    </div>
    <button class="btn btn-primary" @click="apply">Apply</button>

  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      title: '',
      type: 'movie',
      number: 10,
      year: '',
      filters: [
        {
          name: 'type',
          items: ['movie', 'series', 'episode']
        },
        {
          name: 'number',
          items: [10, 20, 30]
        },
        {
          name: 'year',
          items: (() => {
            const firstYear = 1985;
            const thisYear = new Date().getFullYear();
            const years = [];

            for (let i = thisYear; i >= firstYear; i--) {
              years.push(i)
            }

            return years;
          })()  // IIFE
        }
      ]
    }
  },
  // apikey=f50c0fc6
  methods: {
    async apply() {
      // mutations 실행 - .commit()
      // actions 실행 - .dispatch()
      this.$store.dispatch('movie/searchMovies', {  //movie는 vuex모듈 이름
        title: this.title,
        type: this.type,
        number: this.number,
        year: this.year
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  > * {
    margin-right: 10px;
    font-size: 15px;
    &:last-child {
      margin-right: 0;
    }
  }
  .selects {
    display: flex;
    select {
      width: 120px;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .btn {
    width: 120px;
    height: 50px;
    font-weight: 700;
    flex-shrink:  0;
  }
}
</style>