import { Injectable } from '@angular/core';
import { Creature } from '../model/creature';
import { BattleSide } from '../model/battle-side';
import { CreatureService } from './creature.service';
import { Observable ,  of } from 'rxjs';
import { calculationResult } from '../interface/calculation-result.interface';

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

    damageMultiplier(): number {
        const percent = .01;

        // условный множитель урона 
        // зависит от того больше или меньше атака и защита
        if ( this.playerCreature.attack >= this.enemyCreature.defense ) {
            var multDmg = 5 * percent;
        } else {
            var multDmg = 2.5 * percent;
        }
        
        // модификатор урона
        // если атака больше то за каждую единицу +5% урона
        // если защита больше то за каждую единицу -25% урона
        // МD(баз) = (Атака - Защита) * .05  
        // MD(баз) = (Атака - Защита) * .025 
        var modDmg = (this.playerCreature.attack - this.enemyCreature.defense) * multDmg;

        // допустимый промежуток для модификатора: [-70%...+300%] урона
        if ( modDmg > 3 ) { 
            modDmg = 3;
        } else if ( modDmg < -0.7 ) { 
            modDmg = -0.7;
        }

        return modDmg;
    }
    
    damage(baseDmg): calculationResult {
        // baseDmg -  базовый урон существа

        // урон с учетом модификатора
        var modifiedDmg = baseDmg * this.damageMultiplier();

        // итоговая формула урона
        var totalDmg = (modifiedDmg + baseDmg) * this.playerQuantity;

        return {
            baseDmg:  baseDmg * this.playerQuantity,
            totalDmg: totalDmg,
            modDmg:   ( this.damageMultiplier() * 100 )
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
        var stackHealth = this.enemyCreature.health * this.enemyQuantity;
        var healthLeft = {
            min: stackHealth - this.min().totalDmg,
            max: stackHealth - this.max().totalDmg
        }

        return this.range( 
            healthLeft.max > 0 ? Math.floor(healthLeft.max / this.enemyCreature.health) + 1 : 0,
            healthLeft.min > 0 ? Math.floor(healthLeft.min / this.enemyCreature.health) + 1  : 0 
        );
    }

    enemiesWillDie() {
        var stackHealth = this.enemyCreature.health * this.enemyQuantity;
        var healthLeft = {
            min: stackHealth - this.min().totalDmg,
            max: stackHealth - this.max().totalDmg
        }

        return this.range( 
            healthLeft.max > 0 ? this.enemyQuantity - Math.round(healthLeft.max / this.enemyCreature.health) : 0,
            healthLeft.min > 0 ? this.enemyQuantity - Math.round(healthLeft.min / this.enemyCreature.health) : 0 
        );
    }
}