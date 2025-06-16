import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../core/data.service';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { ICustomer } from '../shared/interfaces';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, CustomersListComponent],
  templateUrl: './customers.component.html',
  styles: []
})
export class CustomersComponent implements OnInit {
  title = 'Customers';
  people: ICustomer[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getCustomers().subscribe((customers: ICustomer[]) => (this.people = customers));
  }
}
