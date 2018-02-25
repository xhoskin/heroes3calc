import { Injectable } from '@angular/core';
import { Creature } from './creature';
import { CREATURES } from '../data/creatures';

@Injectable()
export class CreatureService {

    getCreatures(): Creature[] {
        return CREATURES;
    }

    constructor() { }

}
