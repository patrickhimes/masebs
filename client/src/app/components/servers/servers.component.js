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
var router_1 = require("@angular/router");
var masebs_service_1 = require("../../services/masebs.service");
var ServersComponent = (function () {
    function ServersComponent(router, masebsService) {
        this.router = router;
        this.masebsService = masebsService;
    }
    ServersComponent.prototype.getServers = function () {
        var _this = this;
        this.masebsService.getServers().then(function (servers) { return _this.icecastServers = servers; });
    };
    ServersComponent.prototype.add = function (name, uri) {
        var _this = this;
        //required fields
        name = name.trim();
        uri = uri.trim();
        if (!name) {
            return;
        }
        if (!uri) {
            return;
        }
        this.masebsService.create(name, uri)
            .then(function (server) {
            _this.icecastServers.push(server);
            console.log(server);
            _this.selectedServer = null;
        });
    };
    ServersComponent.prototype.delete = function (server) {
        var _this = this;
        this.masebsService
            .delete(server._id)
            .then(function () {
            _this.icecastServers = _this.icecastServers.filter(function (h) { return h !== server; });
            if (_this.selectedServer === server) {
                _this.selectedServer = null;
            }
        });
    };
    ServersComponent.prototype.ngOnInit = function () {
        this.getServers();
    };
    ServersComponent.prototype.onSelect = function (server) {
        this.selectedServer = server;
    };
    ServersComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/server-detail', this.selectedServer._id]);
    };
    return ServersComponent;
}());
ServersComponent = __decorate([
    core_1.Component({
        selector: 'servers',
        templateUrl: './servers.component.html',
        styleUrls: ['./servers.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        masebs_service_1.MasebsService])
], ServersComponent);
exports.ServersComponent = ServersComponent;
//# sourceMappingURL=servers.component.js.map