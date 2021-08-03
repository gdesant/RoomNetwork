import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import UsersService from "../services/UsersService"
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";




const enum authType {PUBLIC, LOGIN, LOGOUT}

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {type: authType.PUBLIC},

    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {type: authType.LOGOUT},
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        meta: {type: authType.LOGOUT},

    },
    {
        path: "/dashboardComponents",
        name: "Dashboard",
        component: Dashboard,
        meta: {type: authType.LOGIN},
    },
    {
        path :"/:catchAll(.*)",
        redirect:'/',
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.type)) {
        if (to.meta.type === authType.LOGIN) {
            const tk = localStorage.getItem('token');
            console.log("LOGIN:" + tk)
            if (tk) {
                try {
                    const response = await UsersService.checkToken(tk)
                    console.log(response)
                    if (response === true) {
                        console.log("Token valid redirect to : " + to)
                        return next()
                    } else {
                        console.log("Token invalid : " + tk)
                        return next({path: "/login"})
                    }

                } catch (err) {
                    console.log('AuthError:', err)
                    return next({path: '/login'})
                }
            } else
                return next({path: '/login'})
        }
        else if (to.meta.type === authType.LOGOUT) {
            const tk = localStorage.getItem('token');
            console.log("LOGOUT: " + localStorage.getItem('token'))
            if (tk === undefined || tk === null)
                return next()
            if (tk) {
                try {
                    const response = await UsersService.checkToken(tk)
                    if (response === true) {
                        console.log('you are log')
                        return next("/dashboardComponents")
                    } else {
                        console.log("Token invalid :" + tk)
                        return next()
                    }

                } catch (err) {
                    console.log('AuthError:', err)
                    return next(from)
                }
            } else
                return next()
        }
        return next()
    }
    return next()
})
export default router;