import { Configuration } from './../../core/ak.constants';
import { CognitoUtil, UserLoginService } from './../../core/aws/cognito.service';
import { DynamoDBService } from './../../core/aws/ddb.service';
import { GlobalService } from './../../core/global.service';
import { HttpRestService } from './../../core/http-rest.service';
import { ValidationModule } from './../../core/validators/validation.module';
import { ValidationService } from './../../core/validators/validation.service';
import { HeaderComponent } from './../../themes/stryker/header/header.component';
import { NotificationBoxComponent } from './../../themes/stryker/notification-box/notification-box.component';
import { PageComponent } from './../../themes/stryker/page/page.component';
import { DashboardService } from './../../themes/stryker/services/dashboard.service';
import { ScreenService } from './../../themes/stryker/services/screen.service';
import { SidebarComponent } from './../../themes/stryker/sidebar/sidebar.component';
import { AttributeComponent } from './../shared/addmore/attribute/attribute.component';
import { ProductListComponent } from './product-list/product-list.component';
import { routes } from './product-routing.module';
import { ProductComponent } from './product/product.component';
import { Location } from '@angular/common';
import { async, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
    AutoCompleteModule,
    ButtonModule,
    CalendarModule,
    CheckboxModule,
    DataTableModule,
    DropdownModule,
    FieldsetModule,
    FileUploadModule,
    GMapModule,
    GrowlModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextareaModule,
    MultiSelectModule,
    PanelModule,
    PasswordModule,
    RadioButtonModule,
    SharedModule,
    SliderModule,
    SpinnerModule,
    SplitButtonModule,
    TabViewModule,
    ToggleButtonModule
} from 'primeng/primeng';
import { OverlayPanelModule } from 'primeng/primeng';





describe('Product Routing', () => {

    let location: Location;
    let router: Router;
    let fixture;

    const mockCognito = {
        getAwsCognito: () => { },
        getCurrentUser: () => { },
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes(routes), FormsModule,
                ValidationModule, BrowserAnimationsModule,
                FormsModule,
                HttpModule,
                ReactiveFormsModule,
                DropdownModule,
                CalendarModule,
                FieldsetModule, PanelModule,
                FileUploadModule,
                SplitButtonModule,
                AutoCompleteModule,
                PasswordModule,
                RadioButtonModule,
                TabViewModule,
                GMapModule, InputSwitchModule,
                InputTextareaModule,
                InputMaskModule,
                SliderModule,
                SpinnerModule,
                CheckboxModule,
                ToggleButtonModule, ButtonModule,
                DataTableModule,
                SharedModule,
                GrowlModule,


                OverlayPanelModule,
                MultiSelectModule,
                CheckboxModule,
                DropdownModule],



            declarations: [NotificationBoxComponent, PageComponent, AttributeComponent,
                ProductComponent, ProductListComponent,
                HeaderComponent, SidebarComponent],

            providers: [{ provide: CognitoUtil, useValue: mockCognito },
                UserLoginService,
                GlobalService, ValidationService, HttpRestService,
                Configuration, DynamoDBService, ScreenService, DashboardService],
        });
        router = TestBed.get(Router);
        location = TestBed.get(Location);
        fixture = TestBed.createComponent(PageComponent);

        router.initialNavigation();
    });
    it('should go on product list screen when we use /products ', async(() => {
        router.navigate(['/products']).then(() => {
            expect(location.path()).toBe('/products');

        });
    }));

});

