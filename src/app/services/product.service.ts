import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiURL = 'http://localhost:8080/api/v1/product/';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(
      this.apiURL
    );
  }

  getProductById(id: string): Observable<any> {
    return this.http.get<any>(
      this.apiURL + id
    );
  }
}
