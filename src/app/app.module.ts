import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CreaturesListComponent } from './component/creatures-list/creatures-list.component';
import { CreatureDetailComponent } from './component/creature-detail/creature-detail.component';

import { CreatureService } from './service/creature.service';
import { CalcComponent } from './component/calc/calc.component';
import { CalcService } from './service/calc.service';


@NgModule({
    declarations: [
        AppComponent,
        CreaturesListComponent,
        CreatureDetailComponent,
        CalcComponent
    ],
    imports: [
        BrowserModule,
        FormsModule
    ],
    providers: [
        CreatureService,
        CalcService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
