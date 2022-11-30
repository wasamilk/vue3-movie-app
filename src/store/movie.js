import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

export default {
  // module화
  namespaced: true,
  // data
  state:  () => ({
    movies: [],
    message: 'Search for the movie title!',
    loading: false,
    theMovie: {}
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
    async searchMovies({ state, commit }, payload) {
      if (state.loading) {
        return
      }
      commit('updateState', {
        message: '',
        loading: true
      })

      try {
        const res = await _fetchMovie({
          ...payload,
          page: 1
        })

        const { Search, totalResults } = res.data
        commit('updateState', {
          movies: _uniqBy(Search, 'imdbID')
        })

        const total = parseInt(totalResults, 10)
        const pageLength = Math.ceil(total / 10)

        if (pageLength > 1) {
          for (let page = 2; page <=pageLength; page++) {
            if (page > payload.number / 10) break
            const res = await _fetchMovie({
              ...payload,
              page //page: page
            })
            const { Search } = res.data
            commit('updateState', {
              movies: [...state.movies, ..._uniqBy(Search, 'imdbID')]
            })
          }
        }
      } catch (message) {
        commit('updateState', {
          movies: [],
          message: message
        })
      } finally {
        commit("updateState", {
          loading: false
        })
      }
    },
    async searchMovieWithId({state, commit}, payload) {
      if (state.loading) {
        return
      }
      commit('updateState', {
        theMovie: {},
        loading: true
      })

      try {
        const res = await _fetchMovie(payload)
        commit('updateState', {
          theMovie: res.data
        })
      } catch (error) {
        commit('updateState', {
          theMovie: {}
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    }
  }
}
// _? - 현재파일 내부에서만 사용된다는 의미로 붙임
function _fetchMovie(payload) {
  const { title, type, year, page, id } = payload
  const OMDB_API_KEY = 'f50c0fc6'
  const url = id
      ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
      : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

  return new Promise((resolve, reject) => {
    axios.get(url).then((res)=>{
      if(res.data.Error){
        reject(res.data.Error)
      }
      resolve(res)
    }).catch((err)=>{
      reject(err.message)
    })
  })
}