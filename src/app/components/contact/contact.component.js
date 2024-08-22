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
exports.ContactComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ContactComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-contact',
            templateUrl: './contact.component.html',
            styleUrls: ['./contact.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ContactComponent = _classThis = /** @class */ (function () {
        function ContactComponent_1(fb, contactService, snackBar, spinner) {
            this.fb = fb;
            this.contactService = contactService;
            this.snackBar = snackBar;
            this.spinner = spinner;
        }
        ContactComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            this.spinner.show();
            setTimeout(function () {
                _this.spinner.hide();
            }, 500);
            this.contactForm = this.fb.group({
                Name: ['', forms_1.Validators.required],
                EmailAddress: ['', [forms_1.Validators.required, forms_1.Validators.email]],
                Phone: ['', forms_1.Validators.required],
                Message: ['', forms_1.Validators.required]
            });
        };
        ContactComponent_1.prototype.onSubmit = function () {
            var _this = this;
            if (this.contactForm.valid) {
                var formData = this.contactForm.value;
                this.contactService.sendContactForm(formData).subscribe({
                    next: function (response) {
                        console.log('Sunucu yanıtı:', response);
                        _this.snackBar.open('Mesaj başarıyla gönderildi', 'Kapat', { duration: 3000 });
                        _this.contactForm.reset();
                    },
                    error: function (error) {
                        console.error('HTTP Hatası:', error);
                        _this.snackBar.open('Mesaj gönderilemedi', 'Kapat', { duration: 3000 });
                    }
                });
            }
        };
        return ContactComponent_1;
    }());
    __setFunctionName(_classThis, "ContactComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ContactComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ContactComponent = _classThis;
}();
exports.ContactComponent = ContactComponent;
