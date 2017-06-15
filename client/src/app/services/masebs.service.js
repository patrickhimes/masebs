"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var app_settings_1 = require("../app.settings");
require("rxjs/add/operator/toPromise");
//import { Masebs } from './icecast';
var MasebsService = (function () {
    function MasebsService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    MasebsService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    MasebsService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    MasebsService.prototype.getServers = function () {
        return this.http.get(app_settings_1.AppSettings.MASEBS_APIURL + "/servers")
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };
    MasebsService.prototype.getServer = function (id) {
        var url = app_settings_1.AppSettings.MASEBS_APIURL + "/servers/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    MasebsService.prototype.create = function (name, uri) {
        return this.http
            .post(app_settings_1.AppSettings.MASEBS_APIURL + "/servers", JSON.stringify({ name: name, uri: uri }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    MasebsService.prototype.update = function (server) {
        var url = app_settings_1.AppSettings.MASEBS_APIURL + "/servers/" + server._id;
        console.log('put: ', server);
        return this.http
            .put(url, JSON.stringify(server), { headers: this.headers })
            .toPromise()
            .then(function () { return server; })
            .catch(this.handleError);
    };
    MasebsService.prototype.delete = function (id) {
        var url = app_settings_1.AppSettings.MASEBS_APIURL + "/servers/" + id;
        console.log(url);
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    return MasebsService;
}());
MasebsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], MasebsService);
exports.MasebsService = MasebsService;
//# sourceMappingURL=masebs.service.js.map