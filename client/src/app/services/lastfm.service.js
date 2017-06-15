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
var LastFMService = (function () {
    function LastFMService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json',
            'Accept': 'q=0.8;application/json;q=0.9' });
        this.options = new http_1.RequestOptions({ headers: this.headers });
    }
    LastFMService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    LastFMService.prototype.extractData = function (res) {
        var body = res.json();
        console.log('Last.FM responce: ', body);
        return body || {};
    };
    LastFMService.prototype.getTackInfo = function (artist, track) {
        var params = new http_1.URLSearchParams();
        params.set('method', 'track.getinfo');
        params.set('api_key', app_settings_1.AppSettings.LASTFM_APIKEY.toString());
        params.set('artist', artist);
        params.set('track', track);
        // test with: artist=General+Mumble&track=Appleshake
        //params.set('artist', 'General+Mumble');
        //params.set('track', 'Appleshake');
        params.set('format', 'json');
        this.options = new http_1.RequestOptions({ headers: this.headers, search: params });
        return this.http.get(app_settings_1.AppSettings.LASTFM_APIURL, this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };
    return LastFMService;
}());
LastFMService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], LastFMService);
exports.LastFMService = LastFMService;
//# sourceMappingURL=lastfm.service.js.map