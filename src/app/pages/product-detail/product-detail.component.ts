import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/models/product';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: IProduct[] = [];
  id: any;
  amount = 1;
  confirm = false;

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private productService: ProductService,
    private activeRoute: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    
    this.loadData();
  }

  ngOnDestroy() {
    window.location.reload();
  }

  loadData() {
    this.productService.getProductById(this.id)
      .subscribe({
        next: ({ data }) => {
          this.product.push(data);
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  onLogout() {
    this.customerService.removeCust();
    this.router.navigateByUrl('/home');
  }

  onAdd() {
    const curr = this.amount + 1;

    if (curr <= this.product[0].quantity) {
      this.amount += 1;
    }
  }

  onMinus() {
    const curr = this.amount - 1;

    if (curr > 0) {
      this.amount -= 1;
    }
  }

  onConfirm() {
    const cust_id = this.customerService.getCust()._id;

    const data = {
      customer_id: cust_id,
      product_id: this.product[0]._id,
      quantity: this.amount
    };

    this.orderService.create(data)
      .subscribe({
        next: () => {
          setInterval(() => {
            this.router.navigateByUrl('/product-show');
          }, 1500)
          this.confirm = true;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }
}
