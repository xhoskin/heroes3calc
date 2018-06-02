import { Component, OnInit, Input } from '@angular/core';
import { Creature } from '../../model/creature';
import { BattleSide } from '../../model/battle-side';

@Component({
    selector: 'creature-detail',
    templateUrl: './creature-detail.component.html',
    styleUrls: ['./creature-detail.component.css']
})

export class CreatureDetailComponent implements OnInit {

    @Input() battleSide: BattleSide;

    constructor() { }

    ngOnInit() {
    }

}
