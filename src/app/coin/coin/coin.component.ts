import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CoinService } from '../../api/coin.service';
import { Coin } from '../../models/coin.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.scss']
})
export class CoinComponent implements OnInit, AfterViewInit {
  coins: Coin[] = [];
  displayedColumns: string[] = ['name'];
  dataSource = new MatTableDataSource<Coin>(this.coins);
  coinId!: number;
  
  sortBy = 'price_usd';
  sortOrder = 'desc';
  showCoinDetail: boolean = false;

  constructor(
    private coinService: CoinService,
    private _liveAnnouncer: LiveAnnouncer
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

  handleRowClick(id: number) {
    this.coinId = id;
    this.showCoinDetail = true;
  }

  fetchCoins(){
    this.coinService.fetchCoins()
      .subscribe(coins => {
        this.loadCoins();
      });
  }
}
