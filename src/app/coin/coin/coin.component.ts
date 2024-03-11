import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CoinService } from '../../api/coin.service';
import { Coin } from '../../models/coin.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.scss']
})
export class CoinComponent implements OnInit, AfterViewInit {
  coins: Coin[] = [];
  displayedColumns: string[] = ['name'];
  dataSource = new MatTableDataSource<Coin>(this.coins);
  
  sortBy = 'price_usd';
  sortOrder = 'desc';

  constructor(
    private coinService: CoinService,
    private router: Router
  ) {}

  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
    }
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Coin>(this.coins);
    this.loadCoins();
  }

  loadCoins(): void {
    this.coinService.getCoins(this.sortBy, this.sortOrder)
      .subscribe(coins => {
        this.coins = coins;
        this.dataSource.data = this.coins; 
        this.dataSource.sort = this.sort; 
      });
  }

  navigateToShowCoinDetail(id: number){
    this.router.navigate(['/coins/detail', id]);
  }

  fetchCoins(){
    this.coinService.fetchCoins()
      .subscribe(coins => {
        this.loadCoins();
      });
  }
}
