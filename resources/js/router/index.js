import { createRouter, createWebHistory } from 'vue-router'
import PublicLayout from '../layouts/PublicLayout.vue'
import AdminLayout from '../layouts/AdminLayout.vue'
import UserLayout from '../layouts/UserLayout.vue'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import AdminDashboard from '../views/admin/AdminDashboard.vue'
import Subjects from '../views/admin/Subjects.vue'
import Papers from '../views/admin/Papers.vue'
import Questions from '../views/admin/Questions.vue'
import Results from '../views/admin/Results.vue'
import UserDashboard from '../views/user/UserDashboard.vue'
import Attempt from '../views/user/Attempt.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    component: PublicLayout,
    children: [
      {
        path: '',
        name: 'HomeView',
        component: HomeView
      },
      {
        path: 'login',
        name: 'Login',
        component: Login
      }
    ]
  },
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: AdminDashboard
      },
      {
        path: '/subjects',
        name: 'Subjects',
        component: Subjects
      },
      {
        path: '/papers',
        name: 'Papers',
        component: Papers
      },
      {
        path: '/questions',
        name: 'Questions',
        component: Questions
      },
      {
        path: '/results',
        name: 'Results',
        component: Results
      },
    ],
    meta: { requiresAuth: true, role: 'admin' }
  },

  {
    path: '/user',
    component: UserLayout,
    children: [
      {
        path: '',
        name: 'UserDashboard',
        component: UserDashboard
      },
      {
        path: '/attempt/:id',
        name: 'Attempt',
        component: Attempt
      },
    ],
    meta: { requiresAuth: true, role: 'user' }
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

// Navigation Guard to check authentication and authorization
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;
  const userRole = localStorage.getItem('userRole');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next('/login');
    } else {
      const routeRole = to.meta.role;
      if (routeRole && routeRole !== userRole) {
        next('/');
      } else {
        next();
      }
    }
  } else {
    next();
  }
})

export default router
