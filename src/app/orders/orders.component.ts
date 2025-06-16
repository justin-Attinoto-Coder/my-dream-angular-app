import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../core/data.service';
import { CapitalizePipe } from '../shared/capitalize.pipe';
import { ICustomer, IOrder } from '../shared/interfaces';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, CapitalizePipe],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: IOrder[] = [];
  customer: ICustomer | null = null;

  constructor(private dataService: DataService, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.dataService.getOrders(id).subscribe((orders: IOrder[]) => {
      this.orders = orders;
    });
    this.dataService.getCustomer(id).subscribe((customer: ICustomer) => {
      this.customer = customer;
    });
  }
}
