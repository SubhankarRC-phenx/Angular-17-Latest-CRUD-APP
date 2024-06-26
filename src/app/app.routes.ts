import { Routes } from '@angular/router';
import { IndexComponent } from './post/index/index.component';
import { CreateComponent } from './post/create/create.component';
import { EditComponent } from './post/edit/edit.component';
import { ViewComponent } from './post/view/view.component';
import { DialogComponent } from './post/dialog/dialog.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'post/index',
    pathMatch: 'full',
  },
  { path: 'post/index', component: IndexComponent },
  { path: 'post/create', component: CreateComponent },
  { path: 'post/:postId/edit', component: EditComponent },
  { path: 'post/:postId/view', component: ViewComponent },
  { path: 'view', component: ViewComponent },
  { path: 'dialog', component: DialogComponent },
];
