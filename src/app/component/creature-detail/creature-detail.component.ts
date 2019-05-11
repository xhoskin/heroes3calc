import { Component, Input } from '@angular/core';
import { Creature } from '../../model/creature';
import { CalcService } from '../../service/calc.service';
import { CreatureService } from '../../service/creature.service';

@Component({
    selector: 'creature-detail',
    templateUrl: './creature-detail.component.html',
    styleUrls: ['./creature-detail.component.css']
})

export class CreatureDetailComponent {
    @Input() side: string;

    constructor(
        public calc: CalcService
    ) { }

    get creature(){
        return this.calc[this.side+'Creature'];
    }
}
