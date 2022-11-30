import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import About from './About'
import Movie from './Movie'

export default createRouter({
    // 1.Hash mode , 2.History mode
    // mode 1  [ ex) https://google.com/#/search ]
    history:createWebHashHistory(),
    // pages
    routes: [
        {
            // 경로
            path:'/',
            component: Home
        },
        {
            path:'/movie/:id',
            component: Movie
        },
        {
            path:'/about',
            component: About
        }
    ]
})