import homeRoutes from '../modules/home/homeRoutes';
import authRoutes from '../modules/auth/authRoutes';
import articleRoutes from '../modules/article/articleRoutes';

export default [
  ...homeRoutes,
  ...authRoutes,
  ...articleRoutes,
  {
    path: '*',
    notFound: true,
  }
];