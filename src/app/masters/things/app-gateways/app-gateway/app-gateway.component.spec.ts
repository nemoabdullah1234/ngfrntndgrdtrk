import { WidgetModule } from './../../../../core/widget/widget.module';
import { DashboardService } from './../../../../themes/stryker/services/dashboard.service';
import { Configuration } from '../../../../core/ak.constants';
import { GlobalService } from '../../../../core/global.service';
import { HttpRestService } from '../../../../core/http-rest.service';
import { ValidationModule } from '../../../../core/validators/validation.module';
import { ValidationService } from '../../../../core/validators/validation.service';
import { ThingsService } from './../../shared/things.service';
import { AppGatewayComponent } from './app-gateway.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';

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
import {Observable} from 'rxjs/Rx';

describe('Edit App Gateway', () => {
  let component: AppGatewayComponent;
  let fixture: ComponentFixture<AppGatewayComponent>;
  const testData = require('./app-gateway_component.spec.json');
  const appGatewayData = testData.appGataway;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppGatewayComponent],
      providers: [{ provide: Router, useValue: mockRouter }, {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {params: Observable.of({ id: 123 })}
        }
      }
        , GlobalService, ValidationService, HttpRestService,
        ThingsService, Configuration, DashboardService],
      imports: [ValidationModule, BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        WidgetModule,
        ReactiveFormsModule,
        DropdownModule,
        CalendarModule, FieldsetModule, PanelModule,
        FileUploadModule, SplitButtonModule, AutoCompleteModule, PasswordModule, RadioButtonModule, TabViewModule,
        GMapModule, InputSwitchModule, InputTextareaModule, InputMaskModule, SliderModule, SpinnerModule, ToggleButtonModule, ButtonModule,
        DataTableModule, SharedModule, GrowlModule, MultiSelectModule, CheckboxModule, DropdownModule

      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.appGatewayFG.setValue(appGatewayData);

  });


  it('Name requiered', () => {
    let errors: any = {};
    const name = component.appGatewayFG.controls['name'];
    errors = name.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('Is Name max length', () => {
    let errors: any = {};
    const name = component.appGatewayFG.controls['name'];
    errors = name.errors || {};
    expect(errors['maxlength']).toBeFalsy();
  });

  it('is form valid', () => {
    expect(component.appGatewayFG.valid).toBeTruthy();
  });
});

