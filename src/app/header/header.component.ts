import { Component, Output, EventEmitter } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  showFiller: boolean = false;
  showCoinTable: boolean = true;

  @Output() toggleDrawer = new EventEmitter<void>();

  onToggleDrawer() {
    this.toggleDrawer.emit();
  }
  
}
