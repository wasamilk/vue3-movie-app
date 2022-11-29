import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

export default {
  // module화
  namespaced: true,
  // data
  state:  () => ({
    movies: [],
    message: '',
    loading: false
  }),
  // computed
  // getters: {  },
  
  // methods
  // 변이 - state 변경은 여기서만 가능
  mutations: {
    updateState (state, payload) {
      // ['movies', 'message', 'loading']
      Object.keys(payload).forEach(key => {
        console.log('key: ' +  key)
        state[key] = payload[key]
        console.log(state.movies)
      })
    },
    resetMovies(state) {
      state.movies = []
    }
  },
  // state 직접 변경 허용 X, 비동기로 동작
  actions: {
    // searchMovies({state, commit}) {  // context.state // context.getters // context.commit }
    // context:state ,  payload:전달인자
    async searchMovies({ state, commit }, payload){
      const { title, type, number, year } = payload
      const OMDB_API_KEY = 'f50c0fc6'

      const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`)
      const { Search, totalResults } = res.data
      commit('updateState', {
        movies: _uniqBy(Search, 'imdbID')
      })

      const total = parseInt(totalResults, 10)
      const pageLength = Math.ceil(total / 10)

      if (pageLength > 1) {
        for (let page = 2; page <=pageLength; page++) {
          if (page > number / 10) break
          const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`)
          const { Search } = res.data
          commit('updateState', {
            movies: [...state.movies, ..._uniqBy(Search, 'imdbID')]
          })
        }
      }
    }
  }
}