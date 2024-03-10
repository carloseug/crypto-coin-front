import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CoinComponent } from './coin/coin/coin.component';
import { GroupComponent } from './group/group/group.component';

const routes: Routes = [
  { path: '', component: AppComponent  },
  { path: 'coins', component: CoinComponent  },
  { path: 'groups', component: GroupComponent  },
  { path: 'groups/create', component: GroupComponent  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
