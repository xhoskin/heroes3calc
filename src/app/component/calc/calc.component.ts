import { Component, OnInit } from '@angular/core';
import { CreatureService } from '../../service/creature.service';
import { CalcService } from '../../service/calc.service';
import { BattleSide } from '../../model/battle-side';
import { Observable } from 'rxjs/Observable';
import { Creature } from '../../model/creature';
import { calcBindingFlags } from '@angular/core/src/view/util';

@Component({
    selector: 'calc',
    templateUrl: './calc.component.html',
    styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit {
    constructor(
        private creatureService: CreatureService,
        private calcService: CalcService
    ) { }

    // player: BattleSide;
    // enemy: BattleSide;

    playerCreature: Creature;
    enemyCreature: Creature;

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
        this.calcService.playerCreature$
            .subscribe(playerCreature => { 
                this.playerCreature = playerCreature
            });
            
        this.calcService.enemyCreature$
            .subscribe(enemyCreature => { 
                 this.enemyCreature = enemyCreature
            });

        this.calcService.setPlayer(this.creatureService.list[0])
        this.calcService.setEnemy(this.creatureService.list[28])
    }
}