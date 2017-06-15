"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var mounts_component_1 = require("./components/radioplayer/mounts.component");
var radio_component_1 = require("./components/radioplayer/radio.component");
var visualizer_component_1 = require("./components/radioplayer/visualizer.component");
var icecast_service_1 = require("./services/icecast.service");
var lastfm_service_1 = require("./services/lastfm.service");
var masebs_service_1 = require("./services/masebs.service");
// server management
var dashboard_component_1 = require("./components/dashboard/dashboard.component");
var servers_component_1 = require("./components/servers/servers.component");
var server_detail_component_1 = require("./components/servers/server-detail.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            app_routing_module_1.AppRoutingModule
        ],
        declarations: [
            app_component_1.AppComponent,
            mounts_component_1.MountsComponent,
            radio_component_1.RadioComponent,
            visualizer_component_1.VisualizerComponent,
            dashboard_component_1.DashboardComponent,
            servers_component_1.ServersComponent,
            server_detail_component_1.ServerDetailComponent
        ],
        providers: [icecast_service_1.IcecastService, lastfm_service_1.LastFMService, masebs_service_1.MasebsService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map