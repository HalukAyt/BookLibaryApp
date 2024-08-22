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
exports.BookService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var BookService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var BookService = _classThis = /** @class */ (function () {
        function BookService_1(http) {
            this.http = http;
            this.apiUrl = 'https://booklibaryapi.azurewebsites.net/api/Book';
            this.bookGetUrl = 'https://booklibaryapi.azurewebsites.net/api/Book/Name/';
            this.googleBooksApiUrl = 'https://www.googleapis.com/books/v1/volumes?q=';
            this.apiKey = 'AIzaSyB1K-WdA9Cef3YOEUmhOnKHbPCostd09Og';
        }
        BookService_1.prototype.addBook = function (book) {
            var token = localStorage.getItem('AuthToken');
            if (!token) {
                return (0, rxjs_1.throwError)('User is not authenticated');
            }
            var headers = new http_1.HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': "Bearer ".concat(token)
            });
            return this.http.post(this.apiUrl, book, { headers: headers })
                .pipe((0, operators_1.catchError)(this.handleError));
        };
        BookService_1.prototype.getBooks = function () {
            return this.http.get(this.apiUrl).pipe((0, operators_1.map)(function (response) { return response.result; }), (0, operators_1.catchError)(this.handleError));
        };
        BookService_1.prototype.getBookByName = function (name) {
            var url = "".concat(this.bookGetUrl, "/").concat(name);
            return this.http.get(url).pipe((0, operators_1.catchError)(this.handleError));
        };
        BookService_1.prototype.deleteByName = function (bookName) {
            var url = "".concat(this.apiUrl, "/").concat(bookName);
            return this.http.delete(url)
                .pipe((0, operators_1.catchError)(this.handleError));
        };
        BookService_1.prototype.handleError = function (error) {
            var errorMessage = 'Unknown error occurred!';
            if (error.error instanceof ErrorEvent) {
                errorMessage = "Error: ".concat(error.error.message);
            }
            else {
                errorMessage = "Error Code: ".concat(error.status, "\nMessage: ").concat(error.message);
            }
            return (0, rxjs_1.throwError)(errorMessage);
        };
        return BookService_1;
    }());
    __setFunctionName(_classThis, "BookService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BookService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BookService = _classThis;
}();
exports.BookService = BookService;
