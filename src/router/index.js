import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Welcome from "../views/Welcome";
import Users from "../views/user/Users";
import Roles from "../views/role/Roles";
import Records from "../views/record/Records";
import Player from "../views/player/Player";
import Rank from "../views/rank/Rank";
import recordsDetail from "../views/record/Detail";
import rankDetail from "../views/rank/Detail";
import Game from "../views/player/Game";
import Login from "../views/Login";
import Reward from "../views/reward/Index"
import RewardUse from "../views/reward/Use"

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        redirect: 'welcome',
        children: [
            {
                path: '/welcome',
                name: 'Welcome',
                component: Welcome,
            },
            {
                path: '/users',
                name: 'users',
                component: Users,
            },
            {
                path: '/roles',
                name: 'roles',
                component: Roles,
            },
            {
                path: '/records',
                name: 'records',
                component: Records,
            },
            {
                path: '/records/detail/:id',
                name: 'recordsDetail',
                component: recordsDetail,
            },
            {
                path: '/player',
                name: 'player',
                component: Player,
            },
            {
                path: '/rank',
                name: 'rank',
                component: Rank,
            },
            {
                path: '/rank/detail/:id',
                name: 'rankDetail',
                component: rankDetail,
            },
            {
                path: '/start/game',
                name: 'Game',
                component: Game,
            },
            {
                path: '/reward',
                name: 'Reward',
                component: Reward,
            },
            {
                path: '/reward/use',
                name: 'RewardUse',
                component: RewardUse,
            },
        ]
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {

    if (to.path === '/login') return next();

    const tokenStr = window.sessionStorage.getItem('token');

    if (!tokenStr) return next('/login');

    next();
})

export default router
