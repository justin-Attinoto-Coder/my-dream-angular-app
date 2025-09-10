import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router'; // <-- Add this import
import { DataService } from '../core/data.service';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { ICustomer } from '../shared/interfaces';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,           // <-- Add this
    RouterLinkActive,     // <-- Add this
    CustomersListComponent
  ],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'] // <-- This line is required!
})
export class CustomersComponent implements OnInit, OnDestroy {
  title = 'Customers';
  people: ICustomer[] = [];

  heroImages = [
    'assets/my-dream-app-1.jpg',
    'assets/my-dream-app-2.jpg',
    'assets/my-dream-app-3.jpg',
    'assets/my-dream-app-4.jpg',
    'assets/my-dream-app-title-2.jpg'
  ];
  currentHeroImage = this.heroImages[0];
  private heroInterval: any;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getCustomers().subscribe((customers: ICustomer[]) => (this.people = customers));
    this.startHeroSlideshow();
  }

  ngOnDestroy() {
    clearInterval(this.heroInterval);
  }

  startHeroSlideshow() {
    let idx = 0;
    this.heroInterval = setInterval(() => {
      idx = (idx + 1) % this.heroImages.length;
      this.currentHeroImage = this.heroImages[idx];
    }, 3000); // Change image every 3 seconds
  }
}
