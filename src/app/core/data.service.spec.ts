import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';
import { ICustomer, IOrder } from '../shared/interfaces';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch customers', () => {
    const mockCustomers: ICustomer[] = [{ id: 1, name: 'Ted James', city: 'Phoenix', orderTotal: 40.99 }];
    service.getCustomers().subscribe((customers) => {
      expect(customers).toEqual(mockCustomers);
    });
    const req = httpMock.expectOne('assets/customers.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockCustomers);
  });

  it('should fetch customer by id', () => {
    const mockCustomers: ICustomer[] = [{ id: 1, name: 'Ted James', city: 'Phoenix', orderTotal: 40.99 }];
    service.getCustomer(1).subscribe((customer) => {
      expect(customer).toEqual(mockCustomers[0]);
    });
    const req = httpMock.expectOne('assets/customers.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockCustomers);
  });

  it('should fetch orders by customer id', () => {
    const mockOrders: IOrder[] = [{ customerId: 1, orderItems: [{ id: 1, productName: 'Baseball', itemCost: 9.99 }] }];
    service.getOrders(1).subscribe((orders) => {
      expect(orders).toEqual(mockOrders);
    });
    const req = httpMock.expectOne('assets/orders.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockOrders);
  });
});
