import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoinComponent } from './coin/coin/coin.component';
import { GroupComponent } from './group/group/group.component';
import { ShowCoinComponent } from './coin/show-coin/show-coin.component';
import { CreateGroupComponent } from './group/create-group/create-group.component';
import { ShowGroupComponent } from './group/show-group/show-group.component';
import { FilesS3Component } from './files-s3/files-s3/files-s3.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ProfileComponent } from './auth/profile/profile.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'coins', component: CoinComponent },
  { path: 'coins/detail/:id', component: ShowCoinComponent },
  { path: 'groups', component: GroupComponent },
  { path: 'groups/create', component: CreateGroupComponent },
  { path: 'groups/edit/:id', component: CreateGroupComponent },
  { path: 'groups/detail/:id', component: ShowGroupComponent },
  { path: 'files', component: FilesS3Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
