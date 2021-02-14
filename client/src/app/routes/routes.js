export default [
  {
    name: 'Home',
    path: '/',
    exact: true,
    component: 'modules/home',
  },
  {
    name: 'Login',
    path: '/login',
    exact: true,
    component: 'modules/auth/login',
  },
  {
    name: 'Register',
    path: '/register',
    exact: true,
    component: 'modules/auth/register',
  },
  {
    name: 'Add New Article',
    path: '/add-article',
    exact: true,
    auth: true,
    component: 'modules/article/add',
  },
  {
    name: 'View Article Details',
    path: '/view-article/:id',
    exact: true,
    component: 'modules/article/view',
  },
  {
    name: 'Edit Article Details',
    path: '/edit-article/:id',
    exact: true,
    component: 'modules/article/edit',
  },
  {
    path: '*',
    notFound: true,
  }
];