import { Component, Input, OnInit } from '@angular/core';
import { CoinService } from '../../api/coin.service';
import { Coin } from '../../models/coin.model';

@Component({
  selector: 'app-show-coin',
  templateUrl: './show-coin.component.html',
  styleUrls: ['./show-coin.component.scss']
})

export class ShowCoinComponent implements OnInit {
  @Input() coinId!: number; 
  dataSource: Coin[] = [];
  displayedColumns: string[] = ['name', 'market_cap', 'price_usd', 'volume_24h', 'change_24h']; 

  constructor(
    private coinService: CoinService
    ) {}

  ngOnInit(): void {
    this.getCoinData(); 
  }
  
  getCoinData(): void {
    this.coinService.getCoinById(this.coinId)
      .subscribe(
        coin => {
          if (coin) {
            this.dataSource = [coin];
          } else {
            console.error('Coin data is null or undefined.');
          }
        },
        error => {
          console.error('Error getting coin data:', error);
        }
      );
  }
}
