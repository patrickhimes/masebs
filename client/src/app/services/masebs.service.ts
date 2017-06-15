import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AppSettings } from '../app.settings';

import 'rxjs/add/operator/toPromise';
import { Server } from '../model/server';

//import { Masebs } from './icecast';

@Injectable()
export class MasebsService {
    constructor(private http: Http) {}

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }

    private extractData(res: any) : Server[] {
        let body = res.json();
        return body || { };
    }
    private headers = new Headers({'Content-Type': 'application/json'});

    getServers(): Promise<Server[]> {
        return this.http.get(`${AppSettings.MASEBS_APIURL}/servers`)
                .toPromise()
                .then(this.extractData)
                .catch(this.handleError);
    }

    getServer(id: string): Promise<Server> {
        const url = `${AppSettings.MASEBS_APIURL}/servers/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Server)
            .catch(this.handleError);
    }

    create(name: string, uri: string): Promise<Server> {
        return this.http
            .post(`${AppSettings.MASEBS_APIURL}/servers`, JSON.stringify({name: name, uri: uri}), {headers: this.headers})
            .toPromise()
            .then(res => res.json() as Server)
            .catch(this.handleError);
    }

    update(server: Server): Promise<Server> {
        const url = `${AppSettings.MASEBS_APIURL}/servers/${server._id}`;
        console.log('put: ', server);
        return this.http
            .put(url, JSON.stringify(server), {headers: this.headers})
            .toPromise()
            .then(() => server)
            .catch(this.handleError);
    }

    delete(id: string): Promise<void> {
        const url = `${AppSettings.MASEBS_APIURL}/servers/${id}`;
        console.log(url);
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }
}