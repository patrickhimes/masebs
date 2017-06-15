// Keep the Input import for now, you'll remove it later:
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { MasebsService } from '../../services/masebs.service';
import { Server } from '../../model/server';

@Component({
  selector: 'server-detail',
  templateUrl: './server-detail.component.html',
  styleUrls: [ './server-detail.component.css' ]
})

export class ServerDetailComponent implements OnInit {
    server: Server;
    
    constructor(
      private masebsService: MasebsService,
      private route: ActivatedRoute,
      private location: Location
    ) {}
    
    save(): void {
      this.masebsService.update(this.server)
        .then(() => this.goBack());
    }

    goBack(): void {
      this.location.back();
    }

    ngOnInit(): void {
      this.route.params
        .switchMap((params: Params) => this.masebsService.getServer(params['id']))
        .subscribe(server => this.server = server);
    }

}