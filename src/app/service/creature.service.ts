import { Injectable } from '@angular/core';
import { CREATURES } from '../../data/creatures';
import { Creature } from '../model/creature';
import { BattleSide } from '../model/battle-side';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class CreatureService {
    player: BattleSide;
    enemy: BattleSide;
    list: Creature[] = CREATURES;

    constructor() { 
    }

    getCreatures(): Observable<Creature[]> {
        return of(CREATURES);
    }
}