import {lazy} from 'react'

export default [
  {
    name: 'Add New Article',
    path: '/add-article',
    exact: true,
    auth: true,
    component: lazy(() => import('./pages/ArticleAdd')),
  },
  {
    name: 'View Article Details',
    path: '/view-article/:id',
    exact: true,
    component: lazy(() => import('./pages/ArticleView')),
  },
  {
    name: 'Edit Article Details',
    path: '/edit-article/:id',
    exact: true,
    component: lazy(() => import('./pages/ArticleEdit')),
  },
]