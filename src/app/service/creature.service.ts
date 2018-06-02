import { Injectable } from '@angular/core';
import { CREATURES } from '../../data/creatures';
import { Creature } from '../model/creature';

@Injectable()
export class CreatureService {

    getCreatures(): Creature[] {
        return CREATURES;
    }

    constructor() { }

}
