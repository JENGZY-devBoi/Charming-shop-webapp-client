import { Component, OnDestroy } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      phone: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnDetroy() {
    window.location.reload();
  }
  

  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }

    const data = this.loginForm.value;

    this.customerService.login(data)
      .subscribe({
        next: ({ data }) => {
          this.customerService.setCust(data[0]);
          this.router.navigateByUrl('/profile');
        },
        error: (err) => {
          console.log(err);
        }
      });
  }
}
