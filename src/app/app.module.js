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
exports.AppModule = void 0;
exports.HttpLoaderFactory = HttpLoaderFactory;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var about_component_1 = require("./components/about/about.component");
// import { HeaderComponent } from './components/header/header.component';
var contact_component_1 = require("./components/contact/contact.component");
var login_component_1 = require("./components/login/login.component");
var home_component_1 = require("./components/home/home.component");
var carousel_component_1 = require("./carousel/carousel.component");
var button_1 = require("@angular/material/button");
var forms_1 = require("@angular/forms");
var snack_bar_1 = require("@angular/material/snack-bar");
var ngx_toastr_1 = require("ngx-toastr");
var animations_1 = require("@angular/platform-browser/animations");
var core_2 = require("@ngx-translate/core");
var http_loader_1 = require("@ngx-translate/http-loader");
var register_component_1 = require("./components/register/register.component");
var auth_layout_component_1 = require("./layouts/auth-layout/auth-layout.component");
var main_layout_component_1 = require("./layouts/main-layout/main-layout.component");
var navbar_component_1 = require("./navbar/navbar.component");
var another_navbar_component_1 = require("./another-navbar/another-navbar.component");
var profile_component_1 = require("./profile/profile.component");
var http_1 = require("@angular/common/http");
var my_books_component_1 = require("./my-books/my-books.component");
var book_module_1 = require("./components/book/book.module"); //BookModule
var book_service_1 = require("./components/book/book.service"); //bookservice
var profil_edit_component_1 = require("./profil-edit/profil-edit.component");
var ngx_spinner_1 = require("ngx-spinner");
var borrowbook_service_1 = require("./components/borrowbook/borrowbook.service");
var borrowbook_module_1 = require("./components/borrowbook/borrowbook.module");
var verification_enter_component_1 = require("./verification-enter/verification-enter.component");
var admin_component_1 = require("./admin/admin.component");
var not_authorized_component_1 = require("./not-authorized/not-authorized.component");
var common_1 = require("@angular/common");
var reset_password_component_1 = require("./components/reset-password/reset-password.component");
var forgot_password_component_1 = require("./components/forgot-password/forgot-password.component");
var verify_password_component_1 = require("./components/verify-password/verify-password.component");
var all_books_component_1 = require("./all-books/all-books.component");
var all_book_show_component_1 = require("./all-book-show/all-book-show.component");
var kvkk_component_1 = require("./kvkk/kvkk.component");
var privacy_policy_component_1 = require("./privacy-policy/privacy-policy.component");
var terms_of_service_component_1 = require("./terms-of-service/terms-of-service.component");
var star_rating_component_1 = require("./star-rating/star-rating.component");
var floating_button_component_1 = require("./floating-button/floating-button.component");
var AppModule = function () {
    var _classDecorators = [(0, core_1.NgModule)({
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                about_component_1.AboutComponent,
                contact_component_1.ContactComponent,
                login_component_1.LoginComponent,
                carousel_component_1.CarouselComponent,
                register_component_1.RegisterComponent,
                auth_layout_component_1.AuthLayoutComponent,
                main_layout_component_1.MainLayoutComponent,
                navbar_component_1.NavbarComponent,
                another_navbar_component_1.AnotherNavbarComponent,
                profile_component_1.ProfileComponent,
                my_books_component_1.MyBooksComponent,
                profil_edit_component_1.ProfilEditComponent,
                verification_enter_component_1.VerificationEnterComponent,
                admin_component_1.AdminComponent,
                not_authorized_component_1.NotAuthorizedComponent,
                reset_password_component_1.ResetPasswordComponent,
                forgot_password_component_1.ForgotPasswordComponent,
                verify_password_component_1.VerifyPasswordComponent,
                all_books_component_1.AllBooksComponent,
                all_book_show_component_1.AllBookShowComponent,
                kvkk_component_1.KvkkComponent,
                privacy_policy_component_1.PrivacyPolicyComponent,
                terms_of_service_component_1.TermsOfServiceComponent,
                star_rating_component_1.StarRatingComponent,
                floating_button_component_1.FloatingButtonComponent,
            ],
            providers: [
                (0, http_1.provideHttpClient)((0, http_1.withFetch)()),
                [book_service_1.BookService, borrowbook_service_1.BorrowbookService], //  BookService  providers
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule, //form module
                app_routing_module_1.AppRoutingModule,
                common_1.CommonModule,
                animations_1.BrowserAnimationsModule,
                button_1.MatButtonModule,
                http_1.HttpClientModule,
                forms_1.ReactiveFormsModule,
                snack_bar_1.MatSnackBarModule,
                ngx_toastr_1.ToastrModule.forRoot(),
                ngx_spinner_1.NgxSpinnerModule,
                book_module_1.BookModule,
                borrowbook_module_1.BorrowbookModule,
                core_2.TranslateModule.forRoot({
                    loader: {
                        provide: core_2.TranslateLoader,
                        useFactory: HttpLoaderFactory,
                        deps: [http_1.HttpClient]
                    }
                })
            ],
            bootstrap: [app_component_1.AppComponent]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AppModule = _classThis = /** @class */ (function () {
        function AppModule_1() {
        }
        return AppModule_1;
    }());
    __setFunctionName(_classThis, "AppModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppModule = _classThis;
}();
exports.AppModule = AppModule;
function HttpLoaderFactory(http) {
    return new http_loader_1.TranslateHttpLoader(http, './assets/i18n/', '.json');
}
