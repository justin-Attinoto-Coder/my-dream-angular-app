import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CustomersComponent } from './customers.component';
import { DataService } from '../core/data.service';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CommonModule } from '@angular/common';
import { FilterTextboxComponent } from './customers-list/filter-textbox/filter-textbox.component';
import { FormsModule } from '@angular/forms';
import { CapitalizePipe } from '../shared/capitalize.pipe';
import { RouterTestingModule } from '@angular/router/testing';

describe('CustomersComponent', () => {
  let component: CustomersComponent;
  let fixture: ComponentFixture<CustomersComponent>;
  let mockDataService: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    mockDataService = jasmine.createSpyObj('DataService', ['getCustomers']);
    mockDataService.getCustomers.and.returnValue(of([{ id: 1, name: 'Ted James', city: 'Phoenix', orderTotal: 40.99 }]));

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        RouterTestingModule,
        CustomersComponent,
        CustomersListComponent,
        FilterTextboxComponent,
        CapitalizePipe
      ],
      providers: [{ provide: DataService, useValue: mockDataService }]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch customers on init', () => {
    expect(mockDataService.getCustomers).toHaveBeenCalled();
    expect(component.people.length).toBe(1);
    expect(component.people[0].name).toBe('Ted James');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Customers');
  });
});
