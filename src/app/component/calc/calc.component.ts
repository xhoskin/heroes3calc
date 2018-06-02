import { Component, OnInit } from '@angular/core';
import { Creature } from '../../model/creature';
import { CreatureService } from '../../service/creature.service';
import { CalcService } from '../../service/calc.service';
import { CREATURES } from '../../../data/creatures';
import { BattleSide } from '../../model/battle-side';

@Component({
    selector: 'calc',
    templateUrl: './calc.component.html',
    styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit {

    creatures: Creature[];

    player: BattleSide;
    enemy: BattleSide;

    getCreatures(): void {
        this.creatures = this.creatureService.getCreatures();
    }

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

    constructor(
        public creatureService: CreatureService,
        public calc: CalcService
    ) { }

    ngOnInit() {
        this.getCreatures();
        this.calc.player = new BattleSide(this.creatures[0]);
        this.calc.enemy = new BattleSide(this.creatures[28]);
    }
}