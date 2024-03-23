import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { CoinData } from '../interfaces/coin-data';
import { TotalTableComponent } from '../total-table/total-table.component';

const COINS: string[] = [
  'Bitcoin',
  'Ethereum',
  'Cardano'
];

@Component({
  selector: 'app-coin-table',
  templateUrl: './coin-table.component.html',
  styleUrls: ['./coin-table.component.scss'],
  standalone: true,
  imports: [
    TotalTableComponent, 
    MatFormFieldModule, 
    MatInputModule, 
    MatTableModule,
    MatSortModule,
    MatPaginatorModule]
})
export class CoinTableComponent implements AfterViewInit {
  static currentBTCPrice: number = 60000;
  static purchasePriceArray: number[] = [];
  static currentValuePriceArray: number[] = [];

  totalPurchasePrice: number = 0;
  totalCurrentValue: number = 0;

  displayedColumns: string[] = ['amount', 'name', 'unitPrice', 'purchasePrice','currentValue'];

  dataSource: MatTableDataSource<CoinData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    // Create 5 coins
    const coins = Array.from({length: 5}, (_, k) => CoinTableComponent.createNewCoin(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(coins);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.calculateTotalPurchaseAndCurrentPrice();
  }

  calculateTotalPurchaseAndCurrentPrice(): void {
    let totalPurchasePrice = 0;
    let totalCurrentValue = 0;
    
    for (var i = 0; i < CoinTableComponent.purchasePriceArray.length; i++) {
      totalPurchasePrice += CoinTableComponent.purchasePriceArray[i];
      totalCurrentValue += CoinTableComponent.currentValuePriceArray[i];
    }
    this.totalPurchasePrice = totalPurchasePrice;
    this.totalCurrentValue = totalCurrentValue;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Builds and returns a new coin */
  static createNewCoin(id: number): CoinData {
    const name = COINS[Math.round(Math.random() * (COINS.length - 1))];
    const amount = Math.round(Math.random() * 100);
    const unitPrice = Math.round(Math.random() * 10000) / 100;
  
    const currentValue = amount * this.currentBTCPrice;
    CoinTableComponent.currentValuePriceArray.push(currentValue);

    const purchasePriceRaw = amount * unitPrice;
    const purchasePrice = Math.round(purchasePriceRaw * 100) / 100;
    CoinTableComponent.purchasePriceArray.push(purchasePrice);

    return {
      name: name,
      amount: amount,
      unitPrice: unitPrice,
      purchasePrice: purchasePrice,
      currentValue: currentValue 
    };
  }
}
