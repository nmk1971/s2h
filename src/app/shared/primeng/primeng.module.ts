import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DataViewModule } from 'primeng/dataview';
import { OrderListModule } from 'primeng/orderlist';
import { PaginatorModule } from 'primeng/paginator';
import { PickListModule } from 'primeng/picklist';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SidebarModule } from 'primeng/sidebar';
import { TooltipModule } from 'primeng/tooltip';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SlideMenuModule } from 'primeng/slidemenu';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { CarouselModule } from 'primeng/carousel';
import { BlockUIModule } from 'primeng/blockui';
import { FocusTrapModule } from 'primeng/focustrap';
import { InplaceModule } from 'primeng/inplace';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';

const material = [
  AutoCompleteModule,
  CheckboxModule,
  MultiSelectModule,
  ChipsModule,
  InputSwitchModule,
  InputTextModule,
  ListboxModule,
  PasswordModule,
  RadioButtonModule,
  SelectButtonModule,
  ButtonModule,
  ToggleButtonModule,
  SplitButtonModule,
  DataViewModule,
  OrderListModule,
  PaginatorModule,
  PickListModule,
  CardModule,
  FieldsetModule,
  PanelModule,
  TabViewModule,
  ToolbarModule,
  ConfirmDialogModule,
  DialogModule,
  DynamicDialogModule,
  OverlayPanelModule,
  SidebarModule,
  TooltipModule,
  MenuModule,
  MenubarModule,
  PanelMenuModule,
  SlideMenuModule,
  StepsModule,
  TabMenuModule,
  TieredMenuModule,
  MessagesModule,
  MessageModule,
  ToastModule,
  CarouselModule,
  BlockUIModule,
  FocusTrapModule,
  InplaceModule,
  ProgressBarModule,
  ProgressSpinnerModule,
  TableModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    material
  ],
  exports: [material]
})
export class PrimengModule { }
