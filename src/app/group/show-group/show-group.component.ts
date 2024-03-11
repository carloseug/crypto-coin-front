import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../api/group.service';
import { Coin } from '../../models/coin.model';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-group',
  templateUrl: './show-group.component.html',
  styleUrl: './show-group.component.scss'
})

export class ShowGroupComponent implements OnInit {
  groupId!: number; 
  name!: string;
  dataSource: any[] = [];
  displayedColumns: string[] = ['name', 'price_usd', 'actions']; 

  constructor(
    private groupService: GroupService,
    private dialog: MatDialog,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.groupId = params['id'];
    });
    this.name = history.state.groupName;
    this.getCoinData(); 
  }
  
  getCoinData(): void {
    const groupId = this.groupId;
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
      data: { message: 'Please confirm that you want to remove this coin from the group' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.groupService.deleteCoinGroup(this.groupId, coin.id)
        .subscribe(() => {
          console.log('Moeda excluída do grupo com sucesso.');
          this.getCoinData();
          
        }, (error) => {
          console.error('Erro ao excluir moeda do grupo:', error);
        });
      }
    });
  }

  addCoinToGroup(){
    
  }
}