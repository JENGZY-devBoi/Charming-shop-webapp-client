import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICustomer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  customer: any;

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy() {
    window.location.reload();
  }

  loadData() {
    this.customer = this.customerService.getCust();
  }

  onLogout() {
    this.customerService.removeCust();
    this.router.navigateByUrl('/home');
  }
}
