import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { NgxSoundmanager2Module } from 'ngx-soundmanager2';
import { HttpClientModule } from '@angular/common/http';

import { PlayerComponent } from './player/player.component';
import { ErrorComponent } from './error/error.component';

const appRoutes: Routes = [
  {path:':token',component:PlayerComponent},
  {path:'error',component:ErrorComponent},
  {path:'',redirectTo:'/error',pathMatch:'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule,
    NgxSoundmanager2Module.forRoot(),
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
