import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiURL = 'http://localhost:8080/api/v1/customer/';

  constructor(private http: HttpClient) { }

  setCust(data: any) {
    localStorage.setItem('cust_id', data._id);
    localStorage.setItem('fname', data.firstname);
    localStorage.setItem('lname', data.lastname);
    localStorage.setItem('phone', data.phone);
  }

  getCust(){
    const data = {
      _id: localStorage.getItem('cust_id'),
      firstname: localStorage.getItem('fname'),
      lastname: localStorage.getItem('lname'),
      phone: localStorage.getItem('phone'),   
    }

    return data;
  }


  removeCust() {
    localStorage.clear();
  }

  signup(data: any): Observable<any> {
    return this.http.post<any>(
      this.apiURL + 'signup',
      data
    );
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(
      this.apiURL + 'login',
      data
    );
  }
}
