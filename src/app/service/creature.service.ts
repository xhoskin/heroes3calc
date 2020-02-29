import { Injectable } from '@angular/core';
import { BattleSide } from '../model/battle-side';
import { Observable ,  of } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Creature } from "../model/creature";

@Injectable()
export class CreatureService {
    player: BattleSide;
    enemy: BattleSide;

    constructor(
        private httpClient: HttpClient
    ) {
    }

    getCreatures(): Observable<Creature[]> {
        return this.httpClient.get<any>('assets/data/creatures.json');
    }
}
