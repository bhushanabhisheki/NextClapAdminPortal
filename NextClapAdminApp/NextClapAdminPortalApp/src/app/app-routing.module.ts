import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  { path: 'auth', canActivate: [AuthGuard], component: AuthComponent },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'faq',
    canActivate: [AuthGuard],
    loadChildren: () => import('./faq/faq.module').then((m) => m.FaqModule),
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'events',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./events/events.module').then((m) => m.EventsModule),
  },
  {
    path: 'communities',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./communities/communities.module').then(
        (m) => m.CommunitiesModule
      ),
  },
  {
    path: 'service-spots',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./service-spots/service-spots.module').then(
        (m) => m.ServiceSpotsModule
      ),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
