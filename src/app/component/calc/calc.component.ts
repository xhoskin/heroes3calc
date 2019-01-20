import { Component, OnInit } from '@angular/core';
import { CreatureService } from '../../service/creature.service';
import { CalcService } from '../../service/calc.service';
import { BattleSide } from '../../model/battle-side';
import { Observable } from 'rxjs/Observable';
import { Creature } from '../../model/creature';
import { calcBindingFlags } from '@angular/core/src/view/util';
import { isNull } from 'util';

@Component({
    selector: 'calc',
    templateUrl: './calc.component.html',
    styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit {
    constructor(
        private creatureService: CreatureService,
        private calc: CalcService
    ) { }
    
    modStatusClass = function(val) {
        if ( val === 0 ) {
            return 'hidden';
        } else if ( val > 0 ) {
            return 'text-success';
        } else {
            return 'text-danger';
        }
    }

    modStatusPos = function(val) {
        return ( val > 0 ) ? '+' : '';
    }

    ngOnInit() {
        if (isNull(this.calc.playerCreature)) {
            this.calc.setPlayer(this.creatureService.list[0]);
            this.calc.setEnemy(this.creatureService.list[28]);
        }
    }
}