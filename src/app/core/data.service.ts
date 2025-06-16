import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ICustomer, IOrder } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'assets/';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>(this.baseUrl + 'customers.json').pipe(catchError(this.handleError));
  }

  getCustomer(id: number): Observable<ICustomer> {
    return this.http.get<ICustomer[]>(this.baseUrl + 'customers.json').pipe(
      map((customers) => {
        const customer = customers.find((cust: ICustomer) => cust.id === id);
        return customer || null;
      }),
      catchError(this.handleError)
    );
  }

  getOrders(id: number): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.baseUrl + 'orders.json').pipe(
      map((orders) => orders.filter((order: IOrder) => order.customerId === id)),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('server error:', error);
    return throwError(() => new Error(error.message || 'Server error'));
  }
}
