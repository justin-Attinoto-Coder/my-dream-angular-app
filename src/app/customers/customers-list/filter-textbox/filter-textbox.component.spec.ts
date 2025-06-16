import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FilterTextboxComponent } from './filter-textbox.component';

describe('FilterTextboxComponent', () => {
  let component: FilterTextboxComponent;
  let fixture: ComponentFixture<FilterTextboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, FilterTextboxComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterTextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filter changes', () => {
    spyOn(component.changed, 'emit');
    component.filter = 'test';
    fixture.detectChanges();
    expect(component.changed.emit).toHaveBeenCalledWith('test');
  });
});
