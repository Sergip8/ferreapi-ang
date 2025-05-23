import { Routes } from '@angular/router';
import { PublicComponent } from './public/public.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
       {
        path: '',
        component: PublicComponent,
        loadChildren: () => import('./public/public.module').then((m) => m.PublicModule)
      },
      {
        path: "admin",
        component: AdminComponent,
        loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
      },
];
