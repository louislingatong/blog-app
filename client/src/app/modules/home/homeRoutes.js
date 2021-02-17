import {lazy} from 'react'

export default [
  {
    name: 'Home',
    path: '/',
    exact: true,
    component: lazy(() => import('./pages/Home')),
  },
]