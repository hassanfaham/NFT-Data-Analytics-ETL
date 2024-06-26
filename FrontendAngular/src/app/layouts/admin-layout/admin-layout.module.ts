import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

import { ChartModule } from 'angular-highcharts';
import { MatDividerModule } from '@angular/material/divider';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { HomeComponent } from '../../home/home.component';








@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatSelectModule,
    ChartModule,
    MatDividerModule
    
  ],
  declarations: [
    HomeComponent,

    

  
 

  ]
})

export class AdminLayoutModule {}
