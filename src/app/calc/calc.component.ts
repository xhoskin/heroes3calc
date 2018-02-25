import { Component, OnInit } from '@angular/core';
import { Creature } from '../creature';
import { CREATURES } from '../../data/creatures';
import { CreatureService } from '../creature.service';

@Component({
    selector: 'calc',
    templateUrl: './calc.component.html',
    styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit {

    creatures: Creature[];

    attacker: Creature;
    defencer: Creature;

    getCreatures(): void {
        this.creatures = this.creatureService.getCreatures();
    }

    constructor(private creatureService: CreatureService) { }

    ngOnInit() {
        this.getCreatures();
        this.setAttacker(this.creatures[0]);
        this.setDefencer(this.creatures[28]);
    }

    setAttacker(creature: Creature) {
        this.attacker = creature;
    }

    setDefencer(creature: Creature) {
        this.defencer = creature;
    }


}
