import { Component, OnInit, OnDestroy } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/models/product';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-product-show',
  templateUrl: './product-show.component.html',
  styleUrls: ['./product-show.component.css']
})
export class ProductShowComponent implements OnInit {
  products: IProduct[] = [];

  cateSelected = 'ทั้งหมด';

  all: IProduct[] = [];
  skincare: IProduct[] = [];
  hair: IProduct[] = [];
  food: IProduct[] = [];
  cosmetics: IProduct[] = [];

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private productService: ProductService
  ) {

  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy() {
    window.location.reload();
  }

  loadData() {
    this.productService.getAll()
      .subscribe({
        next: ({ data }) => {
          this.all = data;
          this.skincare = this.all.filter(p => p.category === 'สกินแคร์');
          this.hair = this.all.filter(p => p.category === 'ผม');
          this.cosmetics = this.all.filter(p => p.category === 'เครื่องสำอาง');
          this.food = this.all.filter(p => p.category === 'อาหารเสริม');

          this.products = this.all;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  onClickCate(cate: string) {
    if (cate === 'ทั้งหมด') {
      this.products = this.all;
      this.cateSelected = cate;
    } else if (cate === 'สกินแคร์') {
      this.products = this.skincare;
      this.cateSelected = cate;
    } else if (cate === 'ผม') {
      this.products = this.hair;
      this.cateSelected = cate;
    } else if (cate === 'เครื่องสำอาง') {
      this.products = this.cosmetics;
      this.cateSelected = cate;
    } else if (cate === 'อาหารเสริม') {
      this.products = this.food;
      this.cateSelected = cate;
    } else {
      this.products = this.all;
      this.cateSelected = 'ทั้งหมด';
    }
  }

  onLogout() {
    this.customerService.removeCust();
    this.router.navigateByUrl('/home');
  }
}
