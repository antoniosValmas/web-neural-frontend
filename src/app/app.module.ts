import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvasModule } from './canvas/canvas.module';
import { SpinnerModule } from './spinner/spinner.module';
import { NeuralNetworkModule } from './neural-network/neural-network.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CanvasModule,
    NeuralNetworkModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SpinnerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
