import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomersListComponent } from './customers-list.component';
import { FilterTextboxComponent } from './filter-textbox/filter-textbox.component';
import { SorterService } from '../../core/sorter.service';
import { CapitalizePipe } from '../../shared/capitalize.pipe';
import { ICustomer } from '../../shared/interfaces';
import { CommonModule } from '@angular/common';

describe('CustomersListComponent', () => {
  let component: CustomersListComponent;
  let fixture: ComponentFixture<CustomersListComponent>;
  let sorterService: SorterService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        RouterTestingModule,
        CustomersListComponent,
        FilterTextboxComponent,
        CapitalizePipe
      ],
      providers: [SorterService]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomersListComponent);
    component = fixture.componentInstance;
    sorterService = TestBed.inject(SorterService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter customers', () => {
    const customers: ICustomer[] = [
      { id: 1, name: 'Ted James', city: 'Phoenix', orderTotal: 40.99 },
      { id: 2, name: 'Michelle Thompson', city: 'Los Angeles', orderTotal: 89.99 }
    ];
    component.customers = customers;
    component.filter('Ted');
    expect(component.filteredCustomers.length).toBe(1);
    expect(component.filteredCustomers[0].name).toBe('Ted James');
  });

  it('should calculate order total', () => {
    const customers: ICustomer[] = [
      { id: 1, name: 'Ted James', city: 'Phoenix', orderTotal: 40.99 },
      { id: 2, name: 'Michelle Thompson', city: 'Los Angeles', orderTotal: 89.99 }
    ];
    component.customers = customers;
    expect(component.customersOrderTotal).toBe(130.98);
  });

  it('should call sort service', () => {
    spyOn(sorterService, 'sort');
    component.sort('name');
    expect(sorterService.sort).toHaveBeenCalledWith(component.filteredCustomers, 'name');
  });
});
