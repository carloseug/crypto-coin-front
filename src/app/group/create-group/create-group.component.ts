import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Group } from '../../models/group.model';
import { GroupService } from '../../api/group.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {
  isEditMode: boolean = false;
  tittle: string = 'Create group';
  group: Group = {
    name: '', description: '',
    id: 0
  };
  nameFormControl = new FormControl('', [Validators.required]);
  descFormControl = new FormControl('', [Validators.required]);

  @Output() closeClicked = new EventEmitter<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private groupService: GroupService
  ) {}

  @Input() bindGroup?: Group;

  ngOnInit(): void {
    if (this.bindGroup) {
      this.isEditMode = true;
      this.nameFormControl.setValue(this.bindGroup.name);
      this.descFormControl.setValue(this.bindGroup.description);
      this.group = this.bindGroup;
      this.tittle = 'Edit group'
    }
  }

  onSubmit(): void {
    if (this.nameFormControl.invalid || this.descFormControl.invalid) {
      return;
    }

    if (this.nameFormControl.value !== null && this.descFormControl.value !== null) {
      this.group.name = this.nameFormControl.value;
      this.group.description = this.descFormControl.value;
    }
    
    if (this.isEditMode) {
      this.groupService.updateGroup(this.group.id, this.group).subscribe(
        () => {
          this.close();
        },
        (error) => {
          console.error('Erro ao atualizar grupo:', error);
        }
      );
    } else {
      this.groupService.createGroup(this.group).subscribe(
        () => {
          this.close();
        },
        (error) => {
          console.error('Erro ao criar novo grupo:', error);
        }
      );
    }
  }

  close(): void {
    this.bindGroup = undefined;
    this.nameFormControl.setValue(null);
    this.descFormControl.setValue(null);
    this.closeClicked.emit();
  }
}
