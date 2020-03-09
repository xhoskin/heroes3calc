import { Component, OnInit } from '@angular/core';
import { CreatureService } from '../../service/creature.service';
import { CalcService } from '../../service/calc.service';
import { BattleSide } from '../../model/battle-side';
import { Observable } from 'rxjs';
import { Creature } from '../../model/creature';
import { isNull } from 'util';

@Component({
    selector: 'calc',
    templateUrl: './calc.component.html',
    styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit {
    public creatures: Creature[];

    constructor(
        public creatureService: CreatureService,
        public calc: CalcService
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

    getCreature(name: string): Creature {
        return this.creatures.find(creature => creature.name === name);
    }

    ngOnInit() {
        this.creatureService.getCreatures().subscribe((creatures) => {
            this.creatures = creatures;
            if (!this.calc.playerCreature) {
                this.calc.setPlayer(this.getCreature('Нага'));
            }
            if (!this.calc.enemyCreature) {
                this.calc.setEnemy(this.getCreature('Копейщик'));
                this.calc.enemyQuantity = 10;
            }
        });
    }
}
