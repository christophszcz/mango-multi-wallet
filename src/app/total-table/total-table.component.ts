import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { Total } from '../interfaces/total';

const ELEMENT_DATA: Total[] = [
  {totalPurchasePrice: undefined, totalCurrentValue: undefined}
];

@Component({
  selector: 'app-total-table',
  templateUrl: './total-table.component.html',
  styleUrls: ['./total-table.component.scss'],
  standalone: true,
  imports: [MatTableModule]
})
export class TotalTableComponent {
  @Input() totalPurchasePrice: number;
  @Input() totalCurrentValue: number;

  displayedColumns: string[] = ['total', 'amount'];
  dataSource = ELEMENT_DATA;
}
