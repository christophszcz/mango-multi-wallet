import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { TotalTableComponent } from './total-table.component';
import { Total } from '../interfaces/total';

describe('TotalTableComponent', () => {
  let component: TotalTableComponent;
  let fixture: ComponentFixture<TotalTableComponent>;

  const ELEMENT_DATA: Total[] = [
    {totalPurchasePrice: 10000, totalCurrentValue: 20000}
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TotalTableComponent],
      imports: [MatTableModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct displayed columns', () => {
    expect(component.displayedColumns).toEqual(['total', 'amount']);
  });

  it('should have correct data source', () => {
    expect(component.dataSource).toEqual(ELEMENT_DATA);
  });
});
