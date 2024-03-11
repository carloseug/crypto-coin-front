import { Component, OnInit } from '@angular/core';
import { CoinService } from '../../api/coin.service';
import { Coin } from '../../models/coin.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-coin',
  templateUrl: './show-coin.component.html',
  styleUrls: ['./show-coin.component.scss']
})

export class ShowCoinComponent implements OnInit {
  dataSource: Coin[] = [];
  displayedColumns: string[] = ['name', 'market_cap', 'price_usd', 'volume_24h', 'change_24h']; 
  coinId!: number;

  constructor(
    private coinService: CoinService,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.coinId = params['id'];
    });
  
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
