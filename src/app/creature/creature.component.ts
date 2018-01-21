import { Component, OnInit } from '@angular/core';
import { Creature } from '../creature';
import { CREATURES } from '../../data/creatures';

@Component({
    selector: 'app-creature',
    templateUrl: './creature.component.html',
    styleUrls: ['./creature.component.css']
})
export class CreatureComponent implements OnInit {

    creatures = CREATURES;

    constructor() { }

    ngOnInit() {
    }

}
