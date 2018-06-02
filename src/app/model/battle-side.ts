import { Creature } from "./creature";

export class BattleSide {
    creature:   Creature;
    quantity:   number;

    constructor(creature: Creature) {
        this.creature = creature;
        this.quantity = 1;
    }
}
