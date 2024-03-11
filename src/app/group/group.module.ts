import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupComponent } from './group/group.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { CreateGroupComponent } from './create-group/create-group.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ShowGroupComponent } from './show-group/show-group.component';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { DialogModule } from '@angular/cdk/dialog';

@NgModule({
  declarations: [
    GroupComponent,
    CreateGroupComponent,
    ConfirmModalComponent,
    ShowGroupComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MatSortModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCardModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
  ],
  exports:[
    GroupComponent,
    CreateGroupComponent,
    ConfirmModalComponent,
    ShowGroupComponent
  ]
})
export class GroupModule { }
