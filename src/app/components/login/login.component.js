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
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var LoginComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss'],
            providers: [common_1.DatePipe]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var LoginComponent = _classThis = /** @class */ (function () {
        function LoginComponent_1(fb, authService, snackBar, router, datePipe, toastr, translate, spinner) {
            this.fb = fb;
            this.authService = authService;
            this.snackBar = snackBar;
            this.router = router;
            this.datePipe = datePipe;
            this.toastr = toastr;
            this.translate = translate;
            this.spinner = spinner;
            this.passwordFieldType = 'password';
            this.isEmailFormVisible = true; // Başlangıçta e-posta formunu gösterir
            this.isUsernameFormVisible = false;
            this.setDateNowWithOffset(15);
        }
        LoginComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            this.spinner.show();
            setTimeout(function () {
                _this.spinner.hide();
            }, 500);
            this.loginForm = this.fb.group({
                email: [''],
                username: [''],
                password: ['', forms_1.Validators.required]
            });
        };
        LoginComponent_1.prototype.setDateNowWithOffset = function (minutes) {
            var now = new Date();
            now.setMinutes(now.getMinutes() + minutes);
            this.dateNow = this.datePipe.transform(now, 'yyyy-MM-dd HH:mm:ss');
        };
        LoginComponent_1.prototype.showEmailForm = function () {
            this.isEmailFormVisible = true;
            this.isUsernameFormVisible = false;
        };
        LoginComponent_1.prototype.showUsernameForm = function () {
            this.isEmailFormVisible = false;
            this.isUsernameFormVisible = true;
        };
        LoginComponent_1.prototype.onLogin = function () {
            var _this = this;
            if (this.loginForm.valid) {
                var _a = this.loginForm.value, email = _a.email, username = _a.username, password = _a.password;
                this.authService.login(email, username, password).subscribe({
                    next: function (response) {
                        if (response.authenticateResult) {
                            _this.translate.get('LOGIN_SUCCESS').subscribe(function (res) {
                                _this.toastr.success(res, 'Success');
                            });
                            _this.authService.getToken().subscribe({
                                next: function (token) {
                                    localStorage.setItem("AuthToken", token);
                                    localStorage.setItem('DateNow', _this.dateNow);
                                    _this.authService.getCurrentUser().subscribe(function (user) {
                                        if (user && user.isAdmin) {
                                            _this.router.navigate(['/admin']);
                                        }
                                        else if (user) {
                                            _this.router.navigate(['all-books']);
                                        }
                                    });
                                },
                                error: function (error) {
                                    console.log("Token alınamadı: ", error);
                                }
                            });
                        }
                        else {
                            _this.translate.get('LOGIN_FAIL').subscribe(function (res) {
                                _this.toastr.error(res, 'Error');
                            });
                        }
                    },
                    error: function (error) {
                        _this.translate.get('ERROR').subscribe(function (res1) {
                            _this.translate.get('ERROR_OCCURED').subscribe(function (res2) {
                                _this.toastr.error(res2, res1);
                            });
                        });
                        console.error('Login failed', error);
                    }
                });
            }
        };
        return LoginComponent_1;
    }());
    __setFunctionName(_classThis, "LoginComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LoginComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LoginComponent = _classThis;
}();
exports.LoginComponent = LoginComponent;
