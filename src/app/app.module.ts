import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainDataTableComponent } from './main-data-table/main-data-table.component';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { CalculateStatsProvincialPipe } from './calculate-stats.pipe';
import { GraphsComponent } from './graphs/graphs.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    MainDataTableComponent,
    FilterFormComponent,
    CalculateStatsProvincialPipe,
    GraphsComponent,
    BarChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
