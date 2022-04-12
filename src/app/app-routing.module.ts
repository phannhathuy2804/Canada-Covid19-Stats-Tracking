import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphsComponent } from './graphs/graphs.component';
import { MainDataTableComponent } from './main-data-table/main-data-table.component';

const routes: Routes = [
  {
    path: '',
    component: MainDataTableComponent,
  },
  {
    path: 'graphs',
    component: GraphsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
