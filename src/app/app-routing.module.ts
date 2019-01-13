import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CreaturesListComponent } from './component/creatures-list/creatures-list.component';
import { WrongUrlComponent } from './component/wrong-url/wrong-url.component';
import { CalcComponent } from './component/calc/calc.component';

const calcRoutes: Routes = [
  {
      path: 'calc',
      component: CalcComponent
  },
  {
      path: 'choose/:side',
      component: CreaturesListComponent
  },
  {
      path: '',
      redirectTo: 'calc',
      pathMatch: 'full'
  },
  {
      path: '**',
      component: WrongUrlComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(calcRoutes),
  ],
  declarations: []
})
export class AppRoutingModule { }
