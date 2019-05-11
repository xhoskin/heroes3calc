import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Location } from '@angular/common';
import { Creature } from '../../model/creature';
import { CreatureService } from '../../service/creature.service';
import { CalcService } from '../../service/calc.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'creatures-list',
    templateUrl: './creatures-list.component.html',
    styleUrls: ['./creatures-list.component.css']
})
export class CreaturesListComponent implements OnInit {
    creatures: Creature[] = [];
    side: string;
    
    constructor(
        private calc: CalcService,
        private creatureService: CreatureService,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    @Output() onSelected = new EventEmitter<Creature>();

    selectedCreature: Creature;

    getCreatures() {
        this.creatureService.getCreatures()
            .subscribe(creatures => this.creatures = creatures)
    }

    select(creature: Creature, side: any): void {
        this.selectedCreature = creature;
        if (this.side === 'player') {
            this.calc.setPlayer(creature);
        } else if (this.side === 'enemy') {
            this.calc.setEnemy(creature);
        }
        this.location.back();
    }

    ngOnInit() {
        this.getCreatures();
        this.side = this.route.snapshot.paramMap.get('side');
    }
}
