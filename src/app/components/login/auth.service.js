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
exports.AuthService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var AuthService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AuthService = _classThis = /** @class */ (function () {
        function AuthService_1(http, cookieService) {
            this.http = http;
            this.cookieService = cookieService;
            this.loginUrl = 'https://booklibaryapi.azurewebsites.net/api/User/LoginUser';
            this.tokenUrl = 'https://booklibaryapi.azurewebsites.net/api/User/redis%20get';
            this.userUrl = 'https://booklibaryapi.azurewebsites.net/api/BorrowBook/user/';
        }
        AuthService_1.prototype.login = function (email, username, password) {
            var loginData = { email: email, username: username, password: password };
            return this.http.post(this.loginUrl, loginData, {
                withCredentials: true,
            });
        };
        AuthService_1.prototype.getTokenLocal = function () {
            var token = localStorage.getItem("AuthToken") || '';
            return (0, rxjs_1.of)(token);
        };
        AuthService_1.prototype.getToken = function () {
            return this.http.get(this.tokenUrl, {
                withCredentials: true,
                responseType: 'text'
            });
        };
        AuthService_1.prototype.extractUserIdFromToken = function (token) {
            var payload = token.split('.')[1];
            var decodedPayload = atob(payload);
            var parsedPayload = JSON.parse(decodedPayload);
            return parsedPayload.id;
        };
        AuthService_1.prototype.getById = function (userId) {
            return this.http.get("".concat(this.userUrl).concat(userId), {
                withCredentials: true,
            });
        };
        AuthService_1.prototype.getCurrentUser = function () {
            if (typeof window !== 'undefined' && window.localStorage) {
                var token = localStorage.getItem("AuthToken");
                if (token) {
                    var userId = this.extractUserIdFromToken(token);
                    return this.getById(userId);
                }
                else {
                    return (0, rxjs_1.of)(null);
                }
            }
            else {
                // window veya localStorage mevcut değilse null döndür
                return (0, rxjs_1.of)(null);
            }
        };
        return AuthService_1;
    }());
    __setFunctionName(_classThis, "AuthService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthService = _classThis;
}();
exports.AuthService = AuthService;
