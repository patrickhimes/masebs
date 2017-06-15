import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MasebsService } from '../../services/masebs.service';
import { Server } from '../../model/server';


@Component({
  selector: 'servers',
  templateUrl: './servers.component.html',
  styleUrls: [ './servers.component.css']
})
export class ServersComponent implements OnInit{ 
    constructor ( 
        private router: Router,
        private masebsService: MasebsService) {}

    icecastServers: Server[];
    selectedServer: Server;

    getServers() : void {
        this.masebsService.getServers().then( servers => this.icecastServers = servers);
    }


    add(name: string, uri: string): void {
        //required fields
        name = name.trim();
        uri = uri.trim();
        if (!name) { return; }
        if (!uri) { return; }

        this.masebsService.create(name, uri)
            .then(server => {
                this.icecastServers.push(server);
                console.log(server);
                this.selectedServer = null;
            });
    }

    delete(server: Server): void {
        this.masebsService
            .delete(server._id)
            .then(() => {
                this.icecastServers = this.icecastServers.filter(h => h !== server);
                if (this.selectedServer === server) { this.selectedServer = null; }
            });
    }

    ngOnInit(): void {
        this.getServers();
    }

    onSelect(server: Server): void {
        this.selectedServer = server;
    }
    
    gotoDetail(): void {
        this.router.navigate(['/server-detail', this.selectedServer._id]);
    }
}
