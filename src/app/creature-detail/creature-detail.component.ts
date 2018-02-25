import { Component, OnInit, Input } from '@angular/core';
import { Creature } from '../creature';

@Component({
    selector: 'creature-detail',
    templateUrl: './creature-detail.component.html',
    styleUrls: ['./creature-detail.component.css']
})

export class CreatureDetailComponent implements OnInit {

    @Input() creature: Creature;

    constructor() { }

    ngOnInit() {
    }

}
