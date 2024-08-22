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
exports.RegisterComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var registerModel_1 = require("./registerModel");
var verification_enter_component_1 = require("../../verification-enter/verification-enter.component");
var CryptoJS = require("crypto-js");
var RegisterComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.scss'],
            providers: [verification_enter_component_1.VerificationEnterComponent],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var RegisterComponent = _classThis = /** @class */ (function () {
        function RegisterComponent_1(fb, registerService, snackBar, router, http, sanitizer, emailservice, verificationCodeService, verificationCodeCompenent, toastr, translate, spinner) {
            this.fb = fb;
            this.registerService = registerService;
            this.snackBar = snackBar;
            this.router = router;
            this.http = http;
            this.sanitizer = sanitizer;
            this.emailservice = emailservice;
            this.verificationCodeService = verificationCodeService;
            this.verificationCodeCompenent = verificationCodeCompenent;
            this.toastr = toastr;
            this.translate = translate;
            this.spinner = spinner;
            this.genderType = registerModel_1.GenderType;
            this.verificationCode = '';
            this.verificationName = 'Alperen';
            this.emailSent = false;
        }
        RegisterComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            this.registerForm = this.fb.group({
                UserName: ['', [forms_1.Validators.required]],
                FullName: [''],
                Email: ['', [forms_1.Validators.email]],
                Password: ['', [forms_1.Validators.required, forms_1.Validators.minLength(8)]],
                PasswordRepeat: ['', [forms_1.Validators.required]],
                Gender: this.genderType.other,
            });
            this.spinner.show();
            setTimeout(function () {
                _this.spinner.hide();
            }, 500);
        };
        RegisterComponent_1.prototype.generateVerificationCode = function () {
            this.verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
            this.verificationCodeService.setVerificationCode(this.verificationCode); // Doğrulama kodunu servise kaydedin
        };
        RegisterComponent_1.prototype.loadHtmlContent = function () {
            var _this = this;
            var FullName = this.registerForm.value.FullName;
            this.verificationName = FullName;
            this.http.get('assets/email-verification.component.html', { responseType: 'text' })
                .subscribe(function (htmlContent) {
                var modifiedHtmlContent = htmlContent
                    .replace('{{verificationCode}}', _this.verificationCode)
                    .replace('{{verificationName}}', _this.verificationName);
                _this.sendEmailVerification(modifiedHtmlContent);
            });
        };
        RegisterComponent_1.prototype.sendEmailVerification = function (htmlContent) {
            var _this = this;
            var Email = this.registerForm.value.Email;
            var emailData = {
                EmailAddress: Email,
                HtmlContent: htmlContent
            };
            this.emailservice.sendVerificationCode(emailData)
                .subscribe({
                next: function (response) {
                    console.log('Verification email sent successfully', response);
                    _this.emailSent = true;
                },
                error: function (error) {
                    console.error('Error sending verification email', error);
                    _this.snackBar.open('E-posta doğrulama kodu gönderilemedi. Lütfen tekrar deneyin.', 'Close', { duration: 3000 });
                }
            });
        };
        RegisterComponent_1.prototype.onRegister = function () {
            if (this.registerForm.valid) {
                this.generateVerificationCode();
                this.loadHtmlContent();
                var _a = this.registerForm.value, UserName = _a.UserName, FullName = _a.FullName, Email = _a.Email, Password = _a.Password, PasswordRepeat = _a.PasswordRepeat, Gender = _a.Gender;
                if (Password !== PasswordRepeat) {
                    this.snackBar.open('Şifreler eşleşmiyor', 'Close', { duration: 3000 });
                    return;
                }
                var registerModel = { UserName: UserName, FullName: FullName, Email: Email, Password: Password, PasswordRepeat: PasswordRepeat, Gender: Gender };
                var key = 'YourSecretKeyForEncryption&Descryption';
                var encryptedData = CryptoJS.AES.encrypt(JSON.stringify(registerModel), key).toString();
                this.router.navigate(['/verification-enter', { data: encryptedData }]);
            }
        };
        return RegisterComponent_1;
    }());
    __setFunctionName(_classThis, "RegisterComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RegisterComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RegisterComponent = _classThis;
}();
exports.RegisterComponent = RegisterComponent;
