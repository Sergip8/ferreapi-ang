import { RenderMode, ServerRoute } from '@angular/ssr';
import { PublicRoutes } from './public/public.routes';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },

    {
      path: PublicRoutes.Home,
    renderMode: RenderMode.Prerender
    },
    {
      path: PublicRoutes.Register,
     renderMode: RenderMode.Prerender
    },
    {
      path: PublicRoutes.Login,
      renderMode: RenderMode.Prerender
    },
  
    {
      path: PublicRoutes.Catalog,
   renderMode: RenderMode.Prerender
    },
     {
      path: PublicRoutes.Details,
     renderMode: RenderMode.Prerender
     
    },
    {
      path: PublicRoutes.Cart,  
      renderMode: RenderMode.Prerender
    },
    {
      path: PublicRoutes.Contact,
      renderMode: RenderMode.Prerender
    },
    {
      path: PublicRoutes.About,
      renderMode: RenderMode.Prerender
    },
    {
      path: PublicRoutes.Projects,
      renderMode: RenderMode.Prerender
    },
   {
    path: 'details/:id',
    renderMode: RenderMode.Server,
  },
];
