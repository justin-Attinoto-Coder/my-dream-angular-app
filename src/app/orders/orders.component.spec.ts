import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { OrdersComponent } from './orders.component';
import { DataService } from '../core/data.service';
import { CapitalizePipe } from '../shared/capitalize.pipe';
import { CommonModule } from '@angular/common';

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;
  let mockDataService: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    mockDataService = jasmine.createSpyObj('DataService', ['getOrders', 'getCustomer']);
    mockDataService.getOrders.and.returnValue(of([]));
    mockDataService.getCustomer.and.returnValue(of(null));

    await TestBed.configureTestingModule({
      imports: [CommonModule, OrdersComponent, CapitalizePipe],
      providers: [
        { provide: DataService, useValue: mockDataService },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch orders and customer on init', () => {
    expect(mockDataService.getOrders).toHaveBeenCalledWith(1);
    expect(mockDataService.getCustomer).toHaveBeenCalledWith(1);
  });

  it('should render no customer message when customer is null', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('div')?.textContent).toContain('No customer found');
  });
});
