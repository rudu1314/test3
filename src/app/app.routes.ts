import { Routes } from '@angular/router';
import { Component1Component } from './component1/component1.component';
import { Component2Component } from './component2/component2.component';

import { AppComponent } from './app.component';
import { TeachPageComponent } from './teach-page/teach-page.component';
import { Inputpage1Component } from './inputpage1/inputpage1.component';
import { Inputpage2Component } from './inputpage2/inputpage2.component';
import { ApitestComponent } from './apitest/apitest.component';
import { Apitest2Component } from './apitest2/apitest2.component';
export const routes: Routes = [
  { path: 'comp2', component: Component2Component },
  { path: 'index', component: AppComponent },
  { path: 'test', component: TeachPageComponent },

  { path: 'input1', component: Inputpage1Component },
  { path: 'input2', component: Inputpage2Component },
  { path: 'apitest', component: ApitestComponent },
  { path: 'apitest2', component: Apitest2Component },
];
