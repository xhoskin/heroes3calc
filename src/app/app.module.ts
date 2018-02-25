import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CreaturesListComponent } from './creatures-list/creatures-list.component';
import { CreatureDetailComponent } from './creature-detail/creature-detail.component';

import { CreatureService } from './creature.service';
import { CalcComponent } from './calc/calc.component';


@NgModule({
    declarations: [
        AppComponent,
        CreaturesListComponent,
        CreatureDetailComponent,
        CalcComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [
        CreatureService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
