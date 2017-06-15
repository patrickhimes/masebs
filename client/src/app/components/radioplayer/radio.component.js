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
var lastfm_service_1 = require("../../services/lastfm.service");
var source_1 = require("../../model/source");
var app_settings_1 = require("../../app.settings");
var RadioComponent = (function () {
    function RadioComponent(lastFMService) {
        this.lastFMService = lastFMService;
        this.isPlaying = false;
    }
    RadioComponent.prototype.togglePlayer = function () {
        if (!this.audioPlayer.paused) {
            this.audioPlayer.pause();
            this.isPlaying = false;
        }
        else {
            this.audioPlayer.play();
            this.isPlaying = true;
        }
    };
    RadioComponent.prototype.getAlbumArt = function (artist, track) {
        var _this = this;
        this.lastFMService.getTackInfo(artist, track).then(function (lastfm) {
            _this.lastFMresponce = lastfm;
            _this.album_art = app_settings_1.AppSettings.DEFAULT_ALBUM_ART;
            if (_this.lastFMresponce.error) {
                console.log('Error: ', _this.lastFMresponce.message);
            }
            else {
                console.log(_this.lastFMresponce.track["album"]);
                if (_this.lastFMresponce.track["album"]) {
                    if (_this.lastFMresponce.track["album"].image.length > 0) {
                        //get last (largest) image
                        var imgIndex = _this.lastFMresponce.track["album"].image.length - 1;
                        _this.album_art = _this.lastFMresponce.track.album.image[imgIndex]['#text'];
                    }
                }
            }
        });
    };
    RadioComponent.prototype.ngOnInit = function () {
        if (!this.audioPlayer) {
            this.audioPlayer = new Audio();
            this.audioPlayer.crossOrigin = "anonymous";
            this.audioPlayer.loop = false;
            this.audioPlayer.autoplay = true;
            this.isPlaying = true;
        }
    };
    RadioComponent.prototype.ngOnDestroy = function () {
        this.audioPlayer.pause();
    };
    RadioComponent.prototype.ngOnChanges = function () {
        if (this.source) {
            //make sure this.currentSource is defined
            if (!this.currentSource) {
                this.currentSource = this.source;
                //update album art
                this.getAlbumArt(this.source.artist, this.source.title);
            }
            if (this.currentMount != this.source.server_name) {
                //switching to new mount
                this.currentMount = this.source.server_name;
                //update audio player
                this.audioPlayer.src = this.source.listenurl;
                this.audioPlayer.pause();
                this.audioPlayer.load();
                if (this.isPlaying) {
                    this.audioPlayer.play();
                }
            }
            if (this.source.artist != this.currentSource.artist || this.source.title != this.currentSource.title) {
                //update album art
                this.getAlbumArt(this.source.artist, this.source.title);
                this.currentSource = this.source;
            }
        }
    };
    return RadioComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", source_1.Source)
], RadioComponent.prototype, "source", void 0);
RadioComponent = __decorate([
    core_1.Component({
        selector: 'radio',
        templateUrl: './radio.component.html',
        styleUrls: ['./radio.component.css']
    }),
    __metadata("design:paramtypes", [lastfm_service_1.LastFMService])
], RadioComponent);
exports.RadioComponent = RadioComponent;
//# sourceMappingURL=radio.component.js.map