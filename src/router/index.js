import Vue from 'vue'
import Router from 'vue-router'
import Home from './routes/Home.vue'
import Plan from './routes/Plan.vue'


Vue.use(Router)

///////////////////////////////////


var array = [];
// [
//     {
//       path: '/',
//       name: 'home',
//       component: Home
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (about.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//     }
//   ]

///////////////////////////////////

array.push({
  name:'home',
  path:'/',
  title:'Home',
  component:Home,
})

array.push({
  name: 'plan',
  path: '/plan/:id',
  title: 'Service Plan',
  component: Plan,
})


///////////////////////////////////

export default new Router({
	 mode: 'history',
  routes: array,
})

///////////////////////////////////

