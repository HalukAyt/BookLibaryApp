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
exports.BookComponent = void 0;
var core_1 = require("@angular/core");
var BookComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-book',
            templateUrl: './book.component.html',
            styleUrls: ['./book.component.scss'],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var BookComponent = _classThis = /** @class */ (function () {
        function BookComponent_1(bookService, authService, router) {
            this.bookService = bookService;
            this.authService = authService;
            this.router = router;
            this.newBook = {
                bookName: '',
                publisher: '',
                author: '',
                isAvailable: false,
                stock: '',
                coverImageUrl: "",
                category: "",
                description: "",
                averageRating: 0,
                ratingCount: 0,
                totalRating: 0
            };
            this.errorMessage = '';
            this.books = [];
            this.selectedBook = null;
            this.bookName = ''; // To hold the user-entered book ID
            this.currentPage = 1;
            this.itemsPerPage = 5;
            this.paginatedBooks = [];
            this.categories = ['Fiction', 'Non-fiction', 'Science Fiction', 'Biography', 'History', 'Fantasy', 'Mystery', 'Romance', 'Horror'];
        }
        BookComponent_1.prototype.ngOnInit = function () {
            this.getBooks();
        };
        BookComponent_1.prototype.onSubmit = function () {
            var _this = this;
            this.bookService.addBook(this.newBook).subscribe(function (response) {
                _this.books.push(response);
                _this.newBook = {
                    bookName: '',
                    publisher: '',
                    author: '',
                    isAvailable: false,
                    stock: '',
                    coverImageUrl: "",
                    category: "",
                    description: "",
                    averageRating: 0,
                    ratingCount: 0,
                    totalRating: 0
                };
                _this.getBooks();
            }, function (error) {
                _this.errorMessage = error.message;
            });
        };
        BookComponent_1.prototype.getBooks = function () {
            var _this = this;
            this.bookService.getBooks().subscribe(function (data) {
                _this.books = data;
                _this.setPaginated();
            }, function (error) {
                _this.errorMessage = error;
            });
        };
        BookComponent_1.prototype.getBookByName = function (name) {
            var _this = this;
            this.bookService.getBookByName(name).subscribe(function (book) {
                _this.selectedBook = book;
            }, function (error) {
                _this.errorMessage = error.message;
            });
        };
        BookComponent_1.prototype.deleteBook = function (bookName) {
            var _this = this;
            this.bookService.deleteByName(bookName).subscribe(function (response) {
                _this.books = _this.books.filter(function (book) { return book.bookName !== bookName; });
                _this.setPaginated();
            }, function (error) {
                _this.errorMessage = error.message;
            });
        };
        BookComponent_1.prototype.setPaginated = function () {
            var startIndex = (this.currentPage - 1) * this.itemsPerPage;
            var endIndex = startIndex + this.itemsPerPage;
            this.paginatedBooks = this.books.slice(startIndex, endIndex);
        };
        BookComponent_1.prototype.goToNextPage = function () {
            if (this.currentPage * this.itemsPerPage < this.books.length) {
                this.currentPage++;
                this.setPaginated();
            }
        };
        BookComponent_1.prototype.goToPreviousPage = function () {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.setPaginated();
            }
        };
        return BookComponent_1;
    }());
    __setFunctionName(_classThis, "BookComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BookComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BookComponent = _classThis;
}();
exports.BookComponent = BookComponent;
