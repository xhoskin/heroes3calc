import { Injectable } from '@angular/core';
import { Creature } from '../model/creature';
import { BattleSide } from '../model/battle-side';
import { CreatureService } from './creature.service';
import { Observable ,  of } from 'rxjs';

@Injectable()
export class CalcService {
    // player: Observable<BattleSide>;
    // enemy: Observable<BattleSide>;

    public playerCreature: Creature = null;
    public enemyCreature:  Creature = null;
    public playerQuantity: number = 1;
    public enemyQuantity:  number = 1;

    constructor(
        creatures: CreatureService
    ) {
    }

    setPlayer(creature: Creature) {
        this.playerCreature = creature;
    }

    setEnemy(creature: Creature) {
        this.enemyCreature = creature;
    }

    range(min, max){
        return min === max ? min : min + '-' + max
    }
    
    damage(baseDmg) {
        // baseDmg -  базовый урон существа

        // условный множитель урона 
        // зависит от того больше или меньше атака и защита
        if ( this.playerCreature.attack >= this.playerCreature.defense ) {
            var multDmg = 0.05;
        } else {
            var multDmg = 0.025;
        }

        // модификатор урона
        // если атака больше то за каждую единицу +5% урона
        // если защита больше то за каждую единицу -25% урона
        // МD(баз) = (Атака - Защита) * 005  
        // MD(баз) = (Атака - Защита) * 0025 
        var modDmg = ( this.playerCreature.attack - this.playerCreature.defense ) * multDmg;

        // допустимый промежуток для модификатора: [-70% 300%] урона
        if ( modDmg > 3 ) { 
            modDmg = 3;
        } else if ( modDmg < -0.7 ) { 
            modDmg = -0.7;
        }

        // урон с учетом модификатора
        var modifiedDmg = baseDmg * modDmg;

        // итоговая формула урона
        var totalDmg = (modifiedDmg + baseDmg) * this.playerQuantity;

        return {
            baseDmg:  baseDmg * this.playerQuantity,
            totalDmg: totalDmg,
            modDmg:   ( modDmg * 100 )
        }

    }

    min() {
        return this.damage(this.playerCreature.damageMin);
    }
    
    max() {
        return this.damage(this.playerCreature.damageMax);
    }
    
    // базовый урон который наносит 1 юнит
    unitDmg (unit){
        return this.range( unit.damageMin, unit.damageMax );
    }

    // базовый урон который наносит весь стек
    stackDmg(){
        return this.range( Math.round(this.min().baseDmg), Math.round(this.max().baseDmg) );
    }

    // полный урон с учетом модификаторов
    totalDmg(){
        return this.range( Math.round(this.min().totalDmg), Math.round(this.max().totalDmg) );
    }

    // модификатор урона - на сколько процентов увеличится или уменьшится
    modDmg() {
        return Math.round( this.min().modDmg );
    }

    // кол-во существ чтобы убить одним ударом
    needToKill() {
        var stackHealth = this.playerCreature.health * this.enemyQuantity;
        var kill = {
            min: Math.floor( stackHealth / ( this.min().totalDmg / this.playerQuantity ) ),
            max: Math.floor( stackHealth / ( this.max().totalDmg / this.playerQuantity ) )
        };
        return this.range( 
            kill.max > 1 ? kill.max : 1,
            kill.min > 1 ? kill.min : 1
        );
    }

    enemiesLeft() {
        var stackHealth = this.playerCreature.health * this.enemyQuantity;
        var healthLeft = {
            min: stackHealth - this.min().totalDmg,
            max: stackHealth - this.max().totalDmg
        }

        return this.range( 
            healthLeft.max > 0 ? Math.floor(healthLeft.max / this.playerCreature.health) : 0,
            healthLeft.min > 0 ? Math.floor(healthLeft.min / this.playerCreature.health) : 0 
        );
    }
}