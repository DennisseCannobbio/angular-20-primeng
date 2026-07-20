import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'sandbox',
    pathMatch: 'full',
  },
  {
    path: 'sandbox',
    loadComponent: () => import('./pages/sandbox/sandbox').then(m => m.Sandbox)
  },
  {
    path: 'showcase',
    children: [
      {
        path: 'input-text',
        loadComponent: () =>
          import('./pages/showcase/input-text/input-text-showcase').then(m => m.InputTextShowcase),
      },
      {
        path: 'select',
        loadComponent: () =>
          import('./pages/showcase/select/select-showcase').then(m => m.SelectShowcase),
      },
      {
        path: 'switch',
        loadComponent: () =>
          import('./pages/showcase/switch/switch-showcase').then(m => m.SwitchShowcase),
      },
      {
        path: 'file',
        loadComponent: () =>
          import('./pages/showcase/file/file-showcase').then(m => m.FileShowcase),
      },
      {
        path: 'message',
        loadComponent: () =>
          import('./pages/showcase/message/message-showcase').then(m => m.MessageShowcase),
      },
      {
        path: 'button',
        loadComponent: () =>
          import('./pages/showcase/button/button-showcase').then(m => m.ButtonShowcase),
      },
      {
        path: 'tag',
        loadComponent: () =>
          import('./pages/showcase/tag/tag-showcase').then(m => m.TagShowcase),
      },
      {
        path: 'theme',
        loadComponent: () =>
          import('./pages/showcase/theme/theme-showcase').then(m => m.ThemeShowcase),
      },
      {
        path: 'table',
        loadComponent: () =>
          import('./pages/showcase/table/table-showcase').then(m => m.TableShowcase),
      },
      {
        path: 'spinner',
        loadComponent: () =>
          import('./pages/showcase/spinner/spinner-showcase').then(m => m.SpinnerShowcase),
      },
      {
        path: 'date',
        loadComponent: () =>
          import('./pages/showcase/date/date-showcase').then(m => m.DateShowcase),
      },
    ],
  },
  {
    path: 'form-demo',
    loadComponent: () => import('./pages/form-demo/form-demo').then(m => m.FormDemo)
  }
];
