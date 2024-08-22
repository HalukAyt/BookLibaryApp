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
exports.VerificationEnterComponent = void 0;
var core_1 = require("@angular/core");
var CryptoJS = require("crypto-js");
var VerificationEnterComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-verification-enter',
            templateUrl: './verification-enter.component.html',
            styleUrls: ['./verification-enter.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var VerificationEnterComponent = _classThis = /** @class */ (function () {
        function VerificationEnterComponent_1(router, verificationCodeService, // Servisi inject edin
        registerService, snackBar, route) {
            this.router = router;
            this.verificationCodeService = verificationCodeService;
            this.registerService = registerService;
            this.snackBar = snackBar;
            this.route = route;
            this.verificationCode = ''; // Kullanıcının girdiği kod
            this.errorMessage = '';
        }
        VerificationEnterComponent_1.prototype.ngOnInit = function () {
            var key = 'YourSecretKeyForEncryption&Descryption';
            var encryptedData = this.route.snapshot.paramMap.get('data');
            if (encryptedData) {
                var bytes = CryptoJS.AES.decrypt(encryptedData, key);
                var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
                if (decryptedData) {
                    this.model = JSON.parse(decryptedData);
                }
                else {
                    console.error('Decryption failed, decrypted data is null or empty');
                }
            }
            else {
                console.error('No encrypted data found in route parameters');
            }
        };
        VerificationEnterComponent_1.prototype.onSubmit = function () {
            var _this = this;
            var correctCode = this.verificationCodeService.getVerificationCode(); // Doğru kodu servisten alın
            console.log(this.model);
            if (this.verificationCode === correctCode) {
                // Kod doğru ise
                console.log('Girdiğiniz kod doğru!');
                alert('Girdiğiniz kod doğru!');
                this.registerService.register(this.model).subscribe({
                    next: function (response) {
                        _this.router.navigate(["/"]);
                        _this.snackBar.open('Başarıyla kayıt olundu', 'Close');
                    },
                    error: function (error) {
                        if (error.status === 400) {
                            if (error.error === 'EMAIL_ALREADY_EXISTS') {
                                _this.snackBar.open('Bu e-posta adresi zaten kayıtlı', 'Close', { duration: 3000 });
                            }
                            else if (error.error === 'USERNAME_ALREADY_EXISTS') {
                                _this.snackBar.open('Bu kullanıcı adı zaten kayıtlı', 'Close', { duration: 3000 });
                            }
                            else {
                                _this.snackBar.open('Kayıt başarısız. Lütfen tekrar deneyin.', 'Close', { duration: 3000 });
                            }
                        }
                        else {
                            _this.snackBar.open('Kayıt başarısız', 'Close', { duration: 3000 });
                        }
                        console.error('Kayıt başarısız', error);
                    }
                });
            }
            else {
                // Kod yanlış ise
                this.errorMessage = 'Girdiğiniz kod yanlış, lütfen tekrar deneyin.';
            }
        };
        return VerificationEnterComponent_1;
    }());
    __setFunctionName(_classThis, "VerificationEnterComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        VerificationEnterComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return VerificationEnterComponent = _classThis;
}();
exports.VerificationEnterComponent = VerificationEnterComponent;
