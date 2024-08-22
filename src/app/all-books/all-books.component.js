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
exports.AllBooksComponent = void 0;
var core_1 = require("@angular/core");
var AllBooksComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-all-books',
            templateUrl: './all-books.component.html',
            styleUrls: ['./all-books.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AllBooksComponent = _classThis = /** @class */ (function () {
        function AllBooksComponent_1(bookService, router, spinner, borrowbookService, authService) {
            this.bookService = bookService;
            this.router = router;
            this.spinner = spinner;
            this.borrowbookService = borrowbookService;
            this.authService = authService;
            this.books = [];
            this.errorMessage = '';
            this.searchTerm = '';
            this.itemsPerPage = 15;
            this.currentPage = 1;
            this.paginatedBooks = [];
            this.borrowBooks = [];
            this.isAvailable = true;
        }
        AllBooksComponent_1.prototype.ngOnInit = function () {
            this.spinner.show();
            this.getToken();
            if (this.userId) {
                this.getUser();
                this.getAllBooks();
            }
        };
        AllBooksComponent_1.prototype.getAllBooks = function () {
            var _this = this;
            this.bookService.getBooks().subscribe(function (data) {
                _this.books = data;
                _this.filterAndPaginateBooks(); // Arama ve sayfalama işlemini birlikte yap
                console.log(data);
            }, function (error) {
                _this.errorMessage = error.message;
            }, function () {
                _this.spinner.hide(); // İşlem tamamlandığında spinner'ı gizle
            });
        };
        AllBooksComponent_1.prototype.viewBookDetails = function (name) {
            this.router.navigate(['/all-book-show', name]);
        };
        AllBooksComponent_1.prototype.filterAndPaginateBooks = function () {
            // Tüm kitapları filtrele
            var filtered = this.filteredBooks();
            // Filtrelenmiş kitapları sayfalara böl
            var startIndex = (this.currentPage - 1) * this.itemsPerPage;
            var endIndex = startIndex + this.itemsPerPage;
            this.paginatedBooks = filtered.slice(startIndex, endIndex);
        };
        AllBooksComponent_1.prototype.filteredBooks = function () {
            var _this = this;
            return this.books.filter(function (book) {
                return book.bookName.toLowerCase().includes(_this.searchTerm.toLowerCase());
            });
        };
        AllBooksComponent_1.prototype.goToNextPage = function () {
            var totalFilteredBooks = this.filteredBooks().length;
            if (this.currentPage * this.itemsPerPage < totalFilteredBooks) {
                this.currentPage++;
                this.filterAndPaginateBooks();
            }
        };
        AllBooksComponent_1.prototype.goToPreviousPage = function () {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.filterAndPaginateBooks();
            }
        };
        AllBooksComponent_1.prototype.fetchBorrowedBooks = function (userName) {
            var _this = this;
            this.borrowbookService.getBorrowedBooks(userName).subscribe(function (response) {
                _this.borrowBooks = response.borrowBooks;
                _this.updateBookAvailability();
            }, function (error) {
                console.error('Hata:', error);
            });
        };
        AllBooksComponent_1.prototype.updateBookAvailability = function () {
            var _this = this;
            this.books.forEach(function (book) { return book.isAvailable = true; });
            this.borrowBooks.forEach(function (borrowedBook) {
                var book = _this.books.find(function (b) { return b.bookName === borrowedBook.bookName; });
                if (book) {
                    book.isAvailable = false;
                }
            });
            this.filterAndPaginateBooks();
        };
        AllBooksComponent_1.prototype.getToken = function () {
            if (typeof window !== 'undefined') {
                var token = localStorage.getItem('AuthToken');
                if (token) {
                    this.userId = this.authService.extractUserIdFromToken(token);
                    console.log(this.userId);
                }
            }
        };
        AllBooksComponent_1.prototype.getUser = function () {
            var _this = this;
            if (this.userId) {
                this.authService.getById(this.userId).subscribe(function (response) {
                    _this.userName = response.userName;
                    console.log(_this.userName);
                    if (_this.userName) {
                        _this.fetchBorrowedBooks(_this.userName);
                    }
                }, function (error) {
                    console.log(error);
                });
            }
        };
        return AllBooksComponent_1;
    }());
    __setFunctionName(_classThis, "AllBooksComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AllBooksComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AllBooksComponent = _classThis;
}();
exports.AllBooksComponent = AllBooksComponent;
