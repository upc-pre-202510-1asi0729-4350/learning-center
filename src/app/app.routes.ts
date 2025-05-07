import { Routes } from '@angular/router';
import {HomeComponent} from './public/pages/home/home.component';

const AboutComponent =
  () => import('./public/pages/about/about.component')
    .then(m => m.AboutComponent);

const PageNotFoundComponent =
  () => import('./public/pages/page-not-found/page-not-found.component')
    .then(m => m.PageNotFoundComponent);

const CourseManagementComponent =
  () => import('./learning/pages/course-management/course-management.component')
    .then(m => m.CourseManagementComponent);

export const routes: Routes = [
  { path: 'home',             component:      HomeComponent },
  { path: 'about',            loadComponent:  AboutComponent },
  { path: 'learning/courses', loadComponent:  CourseManagementComponent},
  { path: '',                 redirectTo:     'home', pathMatch: 'full' },
  { path: '**',               loadComponent:  PageNotFoundComponent }
];
