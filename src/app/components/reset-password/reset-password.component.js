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
exports.ResetPasswordComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ResetPasswordComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-reset-password',
            templateUrl: './reset-password.component.html',
            styleUrls: ['./reset-password.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ResetPasswordComponent = _classThis = /** @class */ (function () {
        function ResetPasswordComponent_1(fb, authService, snackBar, router, route, resetPasswordService) {
            this.fb = fb;
            this.authService = authService;
            this.snackBar = snackBar;
            this.router = router;
            this.route = route;
            this.resetPasswordService = resetPasswordService;
            this.userName = "";
            this.passwordUpdate = "";
        }
        ResetPasswordComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            this.route.paramMap.subscribe(function (params) {
                _this.userName = params.get('name');
            });
            this.resetPasswordForm = this.fb.group({
                password: ['', [forms_1.Validators.required, forms_1.Validators.minLength(8)]],
                confirmPassword: ['', [forms_1.Validators.required]]
            });
        };
        ResetPasswordComponent_1.prototype.onResetPassword = function () {
            var _this = this;
            if (this.resetPasswordForm.valid) {
                var _a = this.resetPasswordForm.value, password = _a.password, confirmPassword = _a.confirmPassword;
                if (password !== confirmPassword) {
                    this.snackBar.open('Şifreler eşleşmiyor.', 'Close', { duration: 3000 });
                    return;
                }
                var passwordRequestModel = { password: password };
                this.resetPasswordService.updatePassword(passwordRequestModel, this.userName).subscribe({
                    next: function (response) {
                        _this.snackBar.open("Basariyla sifre guncellendi", "Close", { duration: 3000 });
                        _this.router.navigate(["login"]);
                    },
                    error: function (error) {
                        _this.snackBar.open("Sifre güncellenemedi"),
                            _this.router.navigate(["reset-password", _this.userName]);
                        console.log(error);
                    }
                });
            }
        };
        return ResetPasswordComponent_1;
    }());
    __setFunctionName(_classThis, "ResetPasswordComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ResetPasswordComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ResetPasswordComponent = _classThis;
}();
exports.ResetPasswordComponent = ResetPasswordComponent;
