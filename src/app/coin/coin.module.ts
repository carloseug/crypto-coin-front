import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoinComponent } from './coin/coin.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { ShowCoinComponent } from './show-coin/show-coin.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    CoinComponent,
    ShowCoinComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatSortModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatIconModule
  ],
  exports:[
    CoinComponent
  ]
})
export class CoinModule { }
