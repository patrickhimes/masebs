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
var VisualizerComponent = (function () {
    function VisualizerComponent() {
        this._viewInitialized = false;
    }
    VisualizerComponent.prototype.ngOnInit = function () {
        this.initAudioVisualizer();
    };
    VisualizerComponent.prototype.initAudioVisualizer = function () {
        this.context = new AudioContext(); // AudioContext object instance
        this.analyser = this.context.createAnalyser(); // AnalyserNode method
        this.canvas = this.canvasRef.nativeElement;
        this.ctx = this.canvas.getContext('2d');
        // Re-route audio playback into the processing graph of the AudioContext
        this.source = this.context.createMediaElementSource(this.audio);
        this.source.connect(this.analyser);
        this.analyser.connect(this.context.destination);
        this.fbc_array = new Uint8Array(this.analyser.frequencyBinCount);
        this.frameLooper();
    };
    // frameLooper() animates any style of graphics you wish to the audio frequency
    // Looping at the default frame rate that the browser provides(approx. 60 FPS)
    VisualizerComponent.prototype.frameLooper = function () {
        var _this = this;
        this.analyser.getByteFrequencyData(this.fbc_array);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas
        this.ctx.fillStyle = '#00CCFF'; // Color of the bars
        this.bars = 100;
        for (var i = 0; i < this.bars; i++) {
            this.bar_x = i * 3;
            this.bar_width = 2;
            this.bar_height = -(this.fbc_array[i] / 2);
            //  fillRect( x, y, width, height ) // Explanation of the parameters below
            this.ctx.fillRect(this.bar_x, this.canvas.height, this.bar_width, this.bar_height);
        }
        requestAnimationFrame(function () { return _this.frameLooper(); });
    };
    return VisualizerComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], VisualizerComponent.prototype, "audio", void 0);
__decorate([
    core_1.ViewChild('canvas'),
    __metadata("design:type", core_1.ElementRef)
], VisualizerComponent.prototype, "canvasRef", void 0);
VisualizerComponent = __decorate([
    core_1.Component({
        selector: 'visualizer',
        template: '<canvas #canvas id="visualizer_render"></canvas>',
        styleUrls: ['./radio.component.css']
    })
], VisualizerComponent);
exports.VisualizerComponent = VisualizerComponent;
//# sourceMappingURL=visualizer.component.js.map