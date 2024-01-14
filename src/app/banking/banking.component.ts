import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';


interface Transaction {
  date: string;
  description: string;
  amount: number;
  [key:string]:string | number;
}

@Component({
  selector: 'app-banking',
  templateUrl: './banking.component.html',
  styleUrls: ['./banking.component.css']
})
export class BankingComponent implements OnInit {
  displayedColumns: string[] = ['date', 'description', 'amount'];
  dataSource: MatTableDataSource<Transaction>;

  transactions: Transaction[] = [
    { date: '2023-12-01', description: 'OnlinePurchase', amount: 100 },
    { date: '2023-12-10', description: 'Deposit', amount: 900 },
    { date: '2023-12-15', description: 'Credit', amount: 500 },
    { date: '2023-12-20', description: 'Deposit', amount: 1000 },
    { date: '2023-12-25', description: 'Amazon', amount: 400 },
    { date: '2023-11-30', description: 'Flipkart', amount: 100 },
    { date: '2023-11-30', description: 'Deposit', amount: 200 },
  ];

  timePeriods = [15, 30, 60];
  selectedTimePeriod: number = this.timePeriods[0];

  constructor() {
    this.dataSource = new MatTableDataSource(this.transactions);
  }

  ngOnInit(): void {
    console.log('Component started');
    this.updateStatement();
  }
  ngOnChanges(): void {
    console.log('Input values changed');
  }
  ngAfterViewInit(): void {
    console.log('View Started');
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.updateStatement();
  }
  updateStatement(): void {
    this.dataSource.data = this.transactions
.filter(transaction => this.isWithinTimePeriod(transaction.date, this.selectedTimePeriod))
      .filter(transaction => this.matchesFilter(transaction));
  }
 
  isWithinTimePeriod(date: string, timePeriod: number): boolean {
    const currentDate = new Date();
    const startDate = new Date();
 
    if (timePeriod === 15) {
      startDate.setDate(currentDate.getDate() - 15);
    } else if (timePeriod === 30) {
      startDate.setDate(currentDate.getDate() - 30);
    } else {
      startDate.setMonth(currentDate.getMonth() - 60);
    }
 
    const transactionDate = new Date(date);
    return transactionDate >= startDate && transactionDate <= currentDate;
  }
 
  matchesFilter(transaction: Transaction): boolean {
    const filterValue = this.dataSource.filter.toLowerCase();
   
    return this.displayedColumns.some(column => {
      const columnValue = transaction[column]?.toString().toLowerCase();
      return columnValue && columnValue.includes(filterValue);
    });
  }
 
  getFilteredTransactions(timePeriod: number): Transaction[] {
    const currentDate = new Date();
    const startDate = new Date();

    if (timePeriod === 15) {
      startDate.setDate(currentDate.getDate() - 15);
    } else if (timePeriod === 30) {
      startDate.setDate(currentDate.getDate() - 30);
    } else {
      startDate.setMonth(currentDate.getMonth() - 1);
    }

    return this.transactions.filter(
      (transaction) => new Date(transaction.date) >= startDate && new Date(transaction.date) <= currentDate
    );
  }

  getTotalAmount(): number {
    return this.dataSource.filteredData.reduce((total, transaction) => total + transaction.amount, 0);
  }
}
