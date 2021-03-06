import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RlTagInputModule } from 'angular2-tag-input';
import {
  AutoCompleteModule,
  ButtonModule,
  CalendarModule,
  CheckboxModule,
  DataTableModule,
  DialogModule,
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

import { ValidationModule } from '../../core/validators/validation.module';
import { WidgetModule } from '../../core/widget/widget.module';
import { ZoneListComponent } from './zone-list/zone-list.component';
import { ZoneComponent } from './zone/zone.component';
import { ZoneRoutingModule } from './zones-routing.module';

@NgModule({
  imports: [
    CommonModule,
    WidgetModule,
    ZoneRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    FieldsetModule,
    RlTagInputModule,
    ValidationModule,
    PanelModule,
    FileUploadModule,
    SplitButtonModule,
    AutoCompleteModule,
    PasswordModule,
    RadioButtonModule,
    TabViewModule,
    GMapModule,
    InputSwitchModule,
    InputTextareaModule,
    InputMaskModule,
    SliderModule,
    SpinnerModule,
    ToggleButtonModule,
    ButtonModule,
    DataTableModule,
    SharedModule,
    GrowlModule,
    MultiSelectModule,
    CheckboxModule,
    DropdownModule,
    DialogModule,
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAQvXMZY_1l5uHWAGn1a60hoj9Pech1Qf4',
      libraries: ['places']
    }),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ZoneComponent, ZoneListComponent]
})
export class ZonesModule {}
