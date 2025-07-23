import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../services/user';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {
  constructor(private userService: UserService, private router: Router) {}

  searchUser(value: string) {
    const id = Number(value);
    if (!id) return;
    this.userService.getUser(id).subscribe(() => this.router.navigate(['/user', id]));
  }
}
