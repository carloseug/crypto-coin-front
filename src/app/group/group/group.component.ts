import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { GroupService } from '../../api/group.service';
import { Group } from '../../models/group.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit, AfterViewInit {
  groups: Group[] = [];
  displayedColumns: string[] = ['actions', 'name', 'description'];
  dataSource = new MatTableDataSource<Group>(this.groups);
  createCard: boolean = false;
  bindGroup?: Group;
  showGroupDetail: boolean = false;
  groupDetail!: Group;
  
  sortBy = 'name';
  sortOrder = 'asc';

  constructor(
    private groupService: GroupService,
    private dialog: MatDialog
  ) {}

  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
    }
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Group>(this.groups);
    this.loadGroups();
  }

  loadGroups(): void {
    this.groupService.getGroups()
      .subscribe(groups => {
        this.groups = groups;
        this.dataSource.data = this.groups; 
        this.dataSource.sort = this.sort; 
      });
  }

  handleCloseCreate(): void {
    this.createCard = !this.createCard;
    this.loadGroups();
  }

  createGroup(){
    this.createCard = !this.createCard;
  }

  editGroup(group: Group){
    this.bindGroup = group;
    this.createGroup();
  }

  deleteGroup(group: Group): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '250px',
      data: { message: 'Tem certeza de que deseja excluir este grupo?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.groupService.deleteGroup(group.id).subscribe(
          () => {
            console.log('Grupo excluído com sucesso.');
            this.loadGroups();
          },
          error => {
            console.error('Erro ao excluir grupo:', error);
            // Lide com o erro aqui, se necessário
          }
        );
      }
    });
    
  }

  handleRowClick(group: Group) {
    this.groupDetail = group;
    this.showGroupDetail = true;
  }
}
