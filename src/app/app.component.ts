import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmModalComponent } from './group/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'crypto-coin-front';

  showFiller: boolean = false;
  showCoinTable: boolean = true;

  constructor(
    public dialog: MatDialog,
    private router: Router
    ) {}

  @ViewChild('drawer') drawer!: MatDrawer;

  toggleDrawer(): void {
    this.drawer.toggle();
  }

  toggleFiller() {
    this.showFiller = !this.showFiller;
  }

  showDinamicTable(table: string){
    //table == 'coins' ? this.showCoinTable = true : this.showCoinTable = false;
    //this.drawer.toggle();
    this.navigateTo(table);
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
