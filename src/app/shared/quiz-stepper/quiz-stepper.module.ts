import { PrimengModule } from './../primeng/primeng.module';
import { MaterialModule } from './../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QcuFormComponent } from './qcu-form/qcu-form.component';
import { QcmFormComponent } from './qcm-form/qcm-form.component';
import { FinalResultComponent } from './final-result/final-result.component';





@NgModule({
  declarations: [QcuFormComponent, QcmFormComponent, FinalResultComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    MaterialModule,
    PrimengModule
  ],
  exports: [QcuFormComponent, QcmFormComponent]
})
export class QuizStepperModule { }
