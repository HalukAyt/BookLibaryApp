"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StarRatingComponent = void 0;
var core_1 = require("@angular/core");
var StarRatingComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-star-rating',
            templateUrl: './star-rating.component.html',
            styleUrls: ['./star-rating.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _bookName_decorators;
    var _bookName_initializers = [];
    var _bookName_extraInitializers = [];
    var _userName_decorators;
    var _userName_initializers = [];
    var _userName_extraInitializers = [];
    var StarRatingComponent = _classThis = /** @class */ (function () {
        function StarRatingComponent_1(starRatingService) {
            this.starRatingService = starRatingService;
            this.bookName = __runInitializers(this, _bookName_initializers, '');
            this.userName = (__runInitializers(this, _bookName_extraInitializers), __runInitializers(this, _userName_initializers, ''));
            this.currentRating = (__runInitializers(this, _userName_extraInitializers), 0);
            this.stars = [false, false, false, false, false];
            this.isRatingLocked = false;
        }
        StarRatingComponent_1.prototype.ngOnInit = function () {
        };
        StarRatingComponent_1.prototype.ngOnChanges = function (changes) {
            if (changes['bookName'] && changes['bookName'].currentValue) {
                console.log('ngOnChanges - bookName:', this.bookName);
            }
            if (changes['userName'] && changes['userName'].currentValue) {
                console.log('ngOnChanges - userName:', this.userName);
            }
        };
        StarRatingComponent_1.prototype.setRating = function (rating) {
            if (!this.isRatingLocked) {
                this.currentRating = rating;
                this.isRatingLocked = true;
                this.sendRatingToServer();
            }
        };
        StarRatingComponent_1.prototype.highlightStars = function (starIndex) {
            if (!this.isRatingLocked) {
                this.currentRating = starIndex;
            }
        };
        StarRatingComponent_1.prototype.clearHighlight = function () {
            if (!this.isRatingLocked) {
                this.currentRating = 0;
            }
        };
        StarRatingComponent_1.prototype.sendRatingToServer = function () {
            var _this = this;
            this.starRatingService.rateBook(this.bookName, this.currentRating, this.userName).subscribe({
                next: function (response) {
                    console.log(response);
                    _this.averageRating = response.AverageRating;
                    alert('Puan başarıyla eklendi.');
                },
                error: function (err) {
                    console.error('Puan gönderilirken hata:', err);
                    alert('Zaten Puan Verilmiş.');
                }
            });
        };
        return StarRatingComponent_1;
    }());
    __setFunctionName(_classThis, "StarRatingComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _bookName_decorators = [(0, core_1.Input)()];
        _userName_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _bookName_decorators, { kind: "field", name: "bookName", static: false, private: false, access: { has: function (obj) { return "bookName" in obj; }, get: function (obj) { return obj.bookName; }, set: function (obj, value) { obj.bookName = value; } }, metadata: _metadata }, _bookName_initializers, _bookName_extraInitializers);
        __esDecorate(null, null, _userName_decorators, { kind: "field", name: "userName", static: false, private: false, access: { has: function (obj) { return "userName" in obj; }, get: function (obj) { return obj.userName; }, set: function (obj, value) { obj.userName = value; } }, metadata: _metadata }, _userName_initializers, _userName_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StarRatingComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StarRatingComponent = _classThis;
}();
exports.StarRatingComponent = StarRatingComponent;
