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
exports.MyBooksComponent = void 0;
var core_1 = require("@angular/core");
var MyBooksComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-my-books',
            templateUrl: './my-books.component.html',
            styleUrl: './my-books.component.scss'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var MyBooksComponent = _classThis = /** @class */ (function () {
        function MyBooksComponent_1(myBookService, route, spinner, bookService) {
            this.myBookService = myBookService;
            this.route = route;
            this.spinner = spinner;
            this.bookService = bookService;
            this.borrowedBooks = [];
            this.userName = '';
            this.borrowBookSuccess = false;
            this.bookName = "";
            this.borrowBookError = false;
            this.readOutBooks = [];
            this.message = "";
        }
        MyBooksComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            this.spinner.show();
            this.route.paramMap.subscribe(function (params) {
                _this.userName = params.get("name");
            });
            this.fetchBorrowedBooks(this.userName);
            this.fetchReadOutBooks(this.userName);
        };
        MyBooksComponent_1.prototype.fetchBorrowedBooks = function (userName) {
            var _this = this;
            this.myBookService.getBorrowedBooks(userName).subscribe(function (response) {
                _this.borrowedBooks = response.borrowBooks;
            }, function (error) {
                console.error('Hata:', error);
            }, function () {
                _this.spinner.hide(); // İşlem tamamlandığında spinner'ı gizle
            });
        };
        MyBooksComponent_1.prototype.fetchReadOutBooks = function (userName) {
            var _this = this;
            this.myBookService.getReadOutBooks(userName).subscribe(function (response) {
                _this.readOutBooks = response.readOutBooks; // Doğru alana atandığından emin olun
            }, function (error) {
                console.error('Hata:', error);
            }, function () {
                _this.spinner.hide(); // İşlem tamamlandığında spinner'ı gizle
            });
        };
        MyBooksComponent_1.prototype.removeBorrowedBook = function (book) {
            var _this = this;
            var bookDto = { bookName: book.bookName };
            this.myBookService.removeBorrowedBook(bookDto, this.userName).subscribe(function (response) {
                console.log("Silindi", response);
                _this.message = response.message || 'Kitap başarıyla İade Edildi';
                _this.fetchBorrowedBooks(_this.userName);
            }, function (error) {
                console.error('Hata', error);
            });
        };
        MyBooksComponent_1.prototype.updateBorrowedBook = function (book) {
            var _this = this;
            var bookDto = { bookName: book.bookName };
            this.myBookService.updateBorrowedBook(bookDto, this.userName).subscribe(function (response) {
                console.log('Güncellendi', response);
                _this.message = response.message || 'Kitap başarıyla geri verildi';
                _this.fetchBorrowedBooks(_this.userName);
                _this.fetchReadOutBooks(_this.userName);
            }, function (error) {
                console.error('Güncellenemedi', error);
            });
        };
        return MyBooksComponent_1;
    }());
    __setFunctionName(_classThis, "MyBooksComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MyBooksComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MyBooksComponent = _classThis;
}();
exports.MyBooksComponent = MyBooksComponent;
