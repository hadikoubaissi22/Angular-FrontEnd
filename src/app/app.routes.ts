import { Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list/user-list';
import { UserDetailsComponent } from './pages/user-details/user-details';

export const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'user/:id', component: UserDetailsComponent },
  { path: '**', redirectTo: '' }
];
