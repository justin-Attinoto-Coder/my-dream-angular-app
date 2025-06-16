import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SorterService } from '../../core/sorter.service';
import { FilterTextboxComponent } from './filter-textbox/filter-textbox.component';
import { CapitalizePipe } from '../../shared/capitalize.pipe';
import { ICustomer } from '../../shared/interfaces';

@Component({
  selector: 'app-customers-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FilterTextboxComponent, CapitalizePipe],
  templateUrl: './customers-list.component.html',
  styles: []
})
export class CustomersListComponent {
  private _customers: ICustomer[] = [];
  @Input() get customers(): ICustomer[] {
    return this._customers;
  }
  set customers(value: ICustomer[]) {
    if (value) {
      this.filteredCustomers = this._customers = value;
      this.calculateCustomersOrderTotal();
    }
  }

  filteredCustomers: ICustomer[] = [];
  customersOrderTotal = 0;
  currencyCode = 'USD';

  constructor(private sorterService: SorterService) {}

  calculateCustomersOrderTotal() {
    this.customersOrderTotal = this.filteredCustomers.reduce((sum, cust) => sum + (cust.orderTotal || 0), 0);
  }

  filter(data: string) {
    if (data) {
      this.filteredCustomers = this.customers.filter((cust: ICustomer) => {
        return (
          cust.name.toLowerCase().includes(data.toLowerCase()) ||
          cust.city.toLowerCase().includes(data.toLowerCase()) ||
          cust.orderTotal?.toString().includes(data)
        );
      });
    } else {
      this.filteredCustomers = this.customers;
    }
    this.calculateCustomersOrderTotal();
  }

  sort(prop: string) {
    this.sorterService.sort(this.filteredCustomers, prop);
  }
}
