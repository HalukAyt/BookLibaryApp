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
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var about_component_1 = require("./components/about/about.component");
var contact_component_1 = require("./components/contact/contact.component");
var home_component_1 = require("./components/home/home.component");
var login_component_1 = require("./components/login/login.component");
var register_component_1 = require("./components/register/register.component");
var auth_layout_component_1 = require("./layouts/auth-layout/auth-layout.component");
var main_layout_component_1 = require("./layouts/main-layout/main-layout.component");
var profile_component_1 = require("./profile/profile.component");
var my_books_component_1 = require("./my-books/my-books.component");
var auth_guard_1 = require("./components/login/auth.guard");
var book_component_1 = require("./components/book/book.component");
var profil_edit_component_1 = require("./profil-edit/profil-edit.component");
var reset_password_component_1 = require("./components/reset-password/reset-password.component");
var borrowbook_component_1 = require("./components/borrowbook/borrowbook.component");
var verification_enter_component_1 = require("./verification-enter/verification-enter.component");
var admin_component_1 = require("./admin/admin.component");
var admin_guard_1 = require("./admin.guard");
var not_authorized_component_1 = require("./not-authorized/not-authorized.component");
var forgot_password_component_1 = require("./components/forgot-password/forgot-password.component");
var verify_password_component_1 = require("./components/verify-password/verify-password.component");
var all_book_show_component_1 = require("./all-book-show/all-book-show.component");
var all_books_component_1 = require("./all-books/all-books.component");
var kvkk_component_1 = require("./kvkk/kvkk.component");
var privacy_policy_component_1 = require("./privacy-policy/privacy-policy.component");
var terms_of_service_component_1 = require("./terms-of-service/terms-of-service.component");
var star_rating_component_1 = require("./star-rating/star-rating.component");
var floating_button_component_1 = require("./floating-button/floating-button.component");
var routes = [
    {
        path: '',
        component: auth_layout_component_1.AuthLayoutComponent,
        children: [
            { path: '', component: home_component_1.HomeComponent },
            {
                path: 'register',
                component: register_component_1.RegisterComponent,
                canActivate: [auth_guard_1.AuthGuard],
            },
            { path: 'login', component: login_component_1.LoginComponent, canActivate: [auth_guard_1.AuthGuard] },
            { path: 'about', component: about_component_1.AboutComponent },
            { path: 'contact', component: contact_component_1.ContactComponent },
            { path: 'profile/:id', component: profile_component_1.ProfileComponent },
            { path: 'my-books/:name', component: my_books_component_1.MyBooksComponent },
            { path: 'book', component: book_component_1.BookComponent },
            { path: 'profil-edit/:id', component: profil_edit_component_1.ProfilEditComponent },
            { path: 'borrowbook', component: borrowbook_component_1.BorrowbookComponent },
            { path: 'verification-enter', component: verification_enter_component_1.VerificationEnterComponent },
            { path: 'reset-password/:name', component: reset_password_component_1.ResetPasswordComponent },
            { path: 'forgot-password', component: forgot_password_component_1.ForgotPasswordComponent },
            { path: 'verify-password/:name', component: verify_password_component_1.VerifyPasswordComponent },
            { path: 'all-books', component: all_books_component_1.AllBooksComponent },
            { path: 'all-book-show/:name', component: all_book_show_component_1.AllBookShowComponent },
            { path: 'kvkk', component: kvkk_component_1.KvkkComponent },
            { path: 'privacy-policy', component: privacy_policy_component_1.PrivacyPolicyComponent },
            { path: 'terms-of-service', component: terms_of_service_component_1.TermsOfServiceComponent },
            { path: 'star-rating', component: star_rating_component_1.StarRatingComponent },
            { path: 'floating-button', component: floating_button_component_1.FloatingButtonComponent },
        ],
    },
    {
        path: '',
        component: main_layout_component_1.MainLayoutComponent,
        children: [
            { path: 'admin', component: admin_component_1.AdminComponent, canActivate: [admin_guard_1.AdminGuard] },
            { path: 'not-authorized', component: not_authorized_component_1.NotAuthorizedComponent },
        ],
    },
];
var AppRoutingModule = function () {
    var _classDecorators = [(0, core_1.NgModule)({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AppRoutingModule = _classThis = /** @class */ (function () {
        function AppRoutingModule_1() {
        }
        return AppRoutingModule_1;
    }());
    __setFunctionName(_classThis, "AppRoutingModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppRoutingModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppRoutingModule = _classThis;
}();
exports.AppRoutingModule = AppRoutingModule;
