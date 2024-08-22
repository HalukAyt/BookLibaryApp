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
exports.NavbarComponent = void 0;
var core_1 = require("@angular/core");
var NavbarComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-navbar',
            templateUrl: './navbar.component.html',
            styleUrls: ['./navbar.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var NavbarComponent = _classThis = /** @class */ (function () {
        function NavbarComponent_1(translate, router, authGuard, authService) {
            this.translate = translate;
            this.router = router;
            this.authGuard = authGuard;
            this.authService = authService;
            this.translate.addLangs(['en', 'tr']);
            this.translate.setDefaultLang('en');
            var browserLang = this.translate.getBrowserLang();
            this.translate.use(browserLang && browserLang.match(/en|tr/) ? browserLang : 'en');
        }
        NavbarComponent_1.prototype.ngOnInit = function () {
            this.getToken();
            this.toggleLogin();
        };
        NavbarComponent_1.prototype.switchLanguage = function (lang) {
            this.translate.use(lang);
        };
        NavbarComponent_1.prototype.getToken = function () {
            if (typeof window !== 'undefined') {
                var token = localStorage.getItem("AuthToken");
                if (token) {
                    this.userId = this.authService.extractUserIdFromToken(token);
                }
            }
        };
        NavbarComponent_1.prototype.toggleLogin = function () {
            this.isLoggedIn = this.authGuard.canActivate();
        };
        NavbarComponent_1.prototype.navigateToProfile = function () {
            if (!this.isLoggedIn && this.userId) {
                this.router.navigate(["/profile", this.userId]);
            }
            else {
                this.router.navigate(["/login"]);
            }
        };
        return NavbarComponent_1;
    }());
    __setFunctionName(_classThis, "NavbarComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NavbarComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NavbarComponent = _classThis;
}();
exports.NavbarComponent = NavbarComponent;
