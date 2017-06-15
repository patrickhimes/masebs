import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './components/dashboard/dashboard.component';
import { MountsComponent }   from './components/radioplayer/mounts.component';
import { ServersComponent } from './components/servers/servers.component';
import { ServerDetailComponent } from './components/servers/server-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'radio',  component: MountsComponent },
  { path: 'server-detail/:id', component: ServerDetailComponent },
  { path: 'servers',     component: ServersComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
