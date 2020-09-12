import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NeuralNetworkComponent } from './neural-network/neural-network.component';

const routes: Routes = [
  { path: 'model', component: NeuralNetworkComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
