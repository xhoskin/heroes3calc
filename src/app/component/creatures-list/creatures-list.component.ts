import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Creature } from '../../model/creature';
import { CREATURES } from '../../../data/creatures';
import { CreatureService } from '../../service/creature.service';


@Component({
    selector: 'creatures-list',
    templateUrl: './creatures-list.component.html',
    styleUrls: ['./creatures-list.component.css']
})
export class CreaturesListComponent implements OnInit {

    @Input() creatures: Creature[];
    @Output() onSelected = new EventEmitter<Creature>();

    selectedCreature: Creature;

    onSelect(creature: Creature): void {
        this.onSelected.emit(creature);
        this.selectedCreature = creature;
    }

    constructor() { }

    ngOnInit() {
    }

}
