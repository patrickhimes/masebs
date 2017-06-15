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
// Keep the Input import for now, you'll remove it later:
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
require("rxjs/add/operator/switchMap");
var masebs_service_1 = require("../../services/masebs.service");
var ServerDetailComponent = (function () {
    function ServerDetailComponent(masebsService, route, location) {
        this.masebsService = masebsService;
        this.route = route;
        this.location = location;
    }
    ServerDetailComponent.prototype.save = function () {
        var _this = this;
        this.masebsService.update(this.server)
            .then(function () { return _this.goBack(); });
    };
    ServerDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    ServerDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.masebsService.getServer(params['id']); })
            .subscribe(function (server) { return _this.server = server; });
    };
    return ServerDetailComponent;
}());
ServerDetailComponent = __decorate([
    core_1.Component({
        selector: 'server-detail',
        templateUrl: './server-detail.component.html',
        styleUrls: ['./server-detail.component.css']
    }),
    __metadata("design:paramtypes", [masebs_service_1.MasebsService,
        router_1.ActivatedRoute,
        common_1.Location])
], ServerDetailComponent);
exports.ServerDetailComponent = ServerDetailComponent;
//# sourceMappingURL=server-detail.component.js.map