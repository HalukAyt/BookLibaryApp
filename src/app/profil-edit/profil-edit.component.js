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
exports.ProfilEditComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var profile_edit_model_1 = require("./profile-edit.model");
var ProfilEditComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-profil-edit',
            templateUrl: './profil-edit.component.html',
            styleUrl: './profil-edit.component.scss'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ProfilEditComponent = _classThis = /** @class */ (function () {
        function ProfilEditComponent_1(fb, profileEditService, snackBar, router, route, authService) {
            this.fb = fb;
            this.profileEditService = profileEditService;
            this.snackBar = snackBar;
            this.router = router;
            this.route = route;
            this.authService = authService;
            this.genderType = profile_edit_model_1.GenderType;
            this.userId = '';
        }
        ProfilEditComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            this.profileEditForm = this.fb.group({
                fullName: [""],
                email: ["", [forms_1.Validators.email]],
                Gender: ['other']
            });
            this.route.paramMap.subscribe(function (params) {
                _this.userId = params.get('id');
            });
            this.getUser();
        };
        ProfilEditComponent_1.prototype.getUser = function () {
            var _this = this;
            var _a, _b;
            var genderSelect = 0;
            if (((_a = this.profileEditForm.get("Gender")) === null || _a === void 0 ? void 0 : _a.value) == "male") {
                genderSelect = 1;
            }
            if (((_b = this.profileEditForm.get("Gender")) === null || _b === void 0 ? void 0 : _b.value) == "female") {
                genderSelect = 2;
            }
            this.authService.getById(this.userId).subscribe({
                next: function (response) {
                    var profileUpdateModel = {
                        email: response.email,
                        fullName: response.fullName,
                        Gender: genderSelect,
                    };
                    _this.profileEditForm.patchValue({
                        email: profileUpdateModel.email,
                        fullName: profileUpdateModel.fullName,
                        Gender: profileUpdateModel.Gender
                    });
                },
                error: function (error) {
                    console.log("Kullanici getirelemedi", error);
                }
            });
        };
        ProfilEditComponent_1.prototype.onUpdate = function () {
            var _this = this;
            if (this.profileEditForm.valid) {
                var _a = this.profileEditForm.value, fullName = _a.fullName, email = _a.email, Gender = _a.Gender;
                var profileeditmodel = { fullName: fullName, email: email, Gender: Gender };
                console.log(profileeditmodel);
                this.profileEditService.profileEdit(profileeditmodel, this.userId).subscribe({
                    next: function (response) {
                        _this.snackBar.open('Basariyla profil güncellendi', 'Close', { duration: 3000 });
                        _this.router.navigate([""]);
                    },
                    error: function (error) {
                        // Backend'den dönen hata mesajını yakalama
                        if (error.status === 400) { // Hata kodu backend'de 400 olarak tanımlanabilir
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
        };
        ProfilEditComponent_1.prototype.navigateToProfile = function () {
            if (this.userId) {
                this.router.navigate(["/profile", this.userId]);
            }
        };
        return ProfilEditComponent_1;
    }());
    __setFunctionName(_classThis, "ProfilEditComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProfilEditComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProfilEditComponent = _classThis;
}();
exports.ProfilEditComponent = ProfilEditComponent;
