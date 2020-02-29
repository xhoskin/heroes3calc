import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';

import { AppComponent } from './app.component';
import { CreaturesListComponent } from './component/creatures-list/creatures-list.component';
import { CreatureDetailComponent } from './component/creature-detail/creature-detail.component';
import { WrongUrlComponent } from './component/wrong-url/wrong-url.component';
import { CalcComponent } from './component/calc/calc.component';

import { CreatureService } from './service/creature.service';
import { CalcService } from './service/calc.service';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule } from "@angular/common/http";


@NgModule({
    declarations: [
        AppComponent,
        CreaturesListComponent,
        CreatureDetailComponent,
        CalcComponent,
        WrongUrlComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        RouterModule,
        HttpClientModule
    ],
    providers: [
        CreatureService,
        CalcService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
