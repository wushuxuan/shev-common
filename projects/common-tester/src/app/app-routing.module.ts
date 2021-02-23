import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchTestComponent } from './tests/search-test/search-test.component'
import { CardTestComponent } from './tests/card-test/card-test.component'

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: SearchTestComponent, data: {} },
  { path: 'card', component: CardTestComponent, data: {} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
