import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-textbox',
  standalone: true,
  imports: [FormsModule],
  template: `Filter: <input type="text" [(ngModel)]="filter" (ngModelChange)="changed.emit(filter)" />`,
  styles: []
})
export class FilterTextboxComponent {
  filter = '';
  @Output() changed = new EventEmitter<string>();
}
