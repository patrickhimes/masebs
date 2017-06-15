import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }   from '@angular/http';

import { AppRoutingModule }    from './app-routing.module';

import { AppComponent }  from './app.component';
import { MountsComponent } from './components/radioplayer/mounts.component';
import { RadioComponent } from './components/radioplayer/radio.component';
import { VisualizerComponent } from './components/radioplayer/visualizer.component';
import { IcecastService } from './services/icecast.service';
import { LastFMService } from './services/lastfm.service';

import { MasebsService } from './services/masebs.service';

// server management
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ServersComponent } from './components/servers/servers.component';
import { ServerDetailComponent } from './components/servers/server-detail.component';

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [ 
    AppComponent, 
    MountsComponent, 
    RadioComponent, 
    VisualizerComponent, 
    DashboardComponent,
    ServersComponent,
    ServerDetailComponent
  ],
  providers: [ IcecastService, LastFMService, MasebsService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
