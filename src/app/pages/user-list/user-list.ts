import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserService } from '../../services/user';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.scss']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  page = 1;
  totalPages = 0;
  isLoading = false;
  error: string | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.error = null;
    
    this.userService.getUsers(this.page)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (data) => {
          if (data) {
            this.users = data.data || [];
            this.totalPages = data.total_pages || 0;
          } else {
            this.error = 'Failed to load users. Please try again.';
          }
        },
        error: (err) => {
          this.error = 'An error occurred while loading users.';
          console.error('Error loading users:', err);
        }
      });
  }

  changePage(delta: number) {
    const newPage = this.page + delta;
    if (newPage > 0 && newPage <= this.totalPages) {
      this.page = newPage;
      this.loadUsers();
    }
  }

  goToUser(id: number) {
    this.router.navigate(['/user', id]);
  }
}