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
var masebs_service_1 = require("../../services/masebs.service");
var TaskComponent = (function () {
    function TaskComponent(masebsService) {
        this.masebsService = masebsService;
    }
    TaskComponent.prototype.getServers = function () {
        var _this = this;
        this.masebsService.getServers().then(function (json) {
            _this.icecastServers = json;
        });
    };
    TaskComponent.prototype.ngOnInit = function () {
        this.getServers();
    };
    return TaskComponent;
}());
TaskComponent = __decorate([
    core_1.Component({
        selector: 'tasks',
        templateUrl: './task.component.html',
        styleUrls: ['./task.component.css']
    }),
    __metadata("design:paramtypes", [masebs_service_1.MasebsService])
], TaskComponent);
exports.TaskComponent = TaskComponent;
//# sourceMappingURL=task.component.js.map