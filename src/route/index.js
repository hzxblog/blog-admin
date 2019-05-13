import Article from '../views/Article/Article';
import ArticleTags from '../views/Article/ArticleTags';
import ArticleEdit from '../views/Article/ArticleEdit';
import Picture from '../views/Picture';
import User from '../views/User/User';

export const basicRoutes = [
  {
    path: '/article',
    component: Article,
    requireAuth: true,
    exact: true
  },
  {
    path: '/article/edit/:id?',
    component: ArticleEdit,
    requireAuth: true,
    exact: false
  },
  {
    path: '/article/tags',
    component: ArticleTags,
    requireAuth: true,
    exact: false
  },
  {
    path: '/files/pictures',
    component: Picture,
    requireAuth: true,
    exact: false
  },
  {
    path: '/user',
    component: User,
    requireAuth: true,
    exact: false
  }
];
