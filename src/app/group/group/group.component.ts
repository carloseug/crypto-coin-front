import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { GroupService } from '../../api/group.service';
import { Group } from '../../models/group.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit, AfterViewInit {
  groups: Group[] = [];
  displayedColumns: string[] = ['name', 'description', 'actions'];
  dataSource = new MatTableDataSource<Group>(this.groups);
  
  sortBy = 'name';
  sortOrder = 'asc';

  constructor(
    private groupService: GroupService,
    private dialog: MatDialog,
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

  deleteGroup(group: Group): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '250px',
      data: { message: 'Please confirm that you want to remove this group' }
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
          }
        );
      }
    });
    
  }

  navigateToShowGroupDetail(group: Group){
    let id = group.id;
    let name = group.name;
    this.router.navigate(['/groups/detail', id], {state: {groupName: name}});
  }

  navigateToCreateGroup(){
    this.router.navigate(['/groups/create']);
  }

  editGroup(group: Group){
    let id = group.id;
    this.router.navigate(['/groups/edit', id], {state: {group: group}});
  }
}
