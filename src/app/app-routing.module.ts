import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoinComponent } from './coin/coin/coin.component';
import { GroupComponent } from './group/group/group.component';
import { ShowCoinComponent } from './coin/show-coin/show-coin.component';
import { CreateGroupComponent } from './group/create-group/create-group.component';
import { ShowGroupComponent } from './group/show-group/show-group.component';

const routes: Routes = [
  { path: '', redirectTo: 'coins', pathMatch: 'full' },
  { path: 'coins', component: CoinComponent },
  { path: 'coins/detail/:id', component: ShowCoinComponent },
  { path: 'groups', component: GroupComponent },
  { path: 'groups/create', component: CreateGroupComponent },
  { path: 'groups/edit/:id', component: CreateGroupComponent },
  { path: 'groups/detail/:id', component: ShowGroupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
