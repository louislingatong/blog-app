import {lazy} from 'react'

export default [
  {
    name: 'Login',
    path: '/login',
    exact: true,
    component: lazy(() => import('./pages/Login')),
  },
  {
    name: 'Register',
    path: '/register',
    exact: true,
    component: lazy(() => import('./pages/Register')),
  },
]