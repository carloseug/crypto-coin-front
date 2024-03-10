import { Component, Input, OnInit } from '@angular/core';
import { GroupService } from '../../api/group.service';
import { Group } from '../../models/group.model';
import { Coin } from '../../models/coin.model';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-show-group',
  templateUrl: './show-group.component.html',
  styleUrl: './show-group.component.scss'
})

export class ShowGroupComponent implements OnInit {
  @Input() group!: Group; 

  dataSource: any[] = [];
  displayedColumns: string[] = ['actions', 'name', 'price_usd']; 

  constructor(
    private groupService: GroupService,
    private dialog: MatDialog ,
    ) {}

  ngOnInit(): void {
    this.getCoinData(); 
  }
  
  getCoinData(): void {
    const groupId = this.group.id;
    this.groupService.getCoinsByGroupId(groupId)
      .subscribe((data) => {
        this.dataSource = data;

      }, (error) => {
        console.error(error);
      });
  }
  
  deleteCoin(coin: Coin){
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '250px',
      data: { message: 'Tem certeza de que deseja excluir este grupo?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.groupService.deleteCoinGroup(this.group.id, coin.id)
        .subscribe(() => {
          console.log('Moeda excluída do grupo com sucesso.');
          this.getCoinData();
          
        }, (error) => {
          console.error('Erro ao excluir moeda do grupo:', error);
        });
      }
    });
  }
}