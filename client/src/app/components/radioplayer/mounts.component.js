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
var Rx_1 = require("rxjs/Rx");
var icecast_service_1 = require("../../services/icecast.service");
var MountsComponent = (function () {
    function MountsComponent(icecastService) {
        this.icecastService = icecastService;
    }
    MountsComponent.prototype.onSelect = function (source) {
        this.selectedSource = source;
    };
    MountsComponent.prototype.getIcecast = function () {
        var _this = this;
        this.icecastService.getIcecast().then(function (icecast) {
            _this.icecast = icecast;
            _this.sources = [].concat(_this.icecast.source);
            if (_this.selectedSource) {
                //update selected source data
                for (var _i = 0, _a = _this.sources; _i < _a.length; _i++) {
                    var sourceData = _a[_i];
                    if (sourceData.server_name == _this.selectedSource.server_name) {
                        _this.selectedSource = sourceData;
                    }
                }
            }
            else {
                // select first source
                _this.selectedSource = _this.sources[0];
            }
        });
    };
    MountsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getIcecast();
        Rx_1.Observable.interval(2000).subscribe(function (x) {
            _this.getIcecast();
        });
    };
    return MountsComponent;
}());
MountsComponent = __decorate([
    core_1.Component({
        selector: 'mounts',
        templateUrl: './mounts.component.html',
        styleUrls: ['./mounts.component.css']
    }),
    __metadata("design:paramtypes", [icecast_service_1.IcecastService])
], MountsComponent);
exports.MountsComponent = MountsComponent;
//# sourceMappingURL=mounts.component.js.map