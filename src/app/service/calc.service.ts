import { Injectable } from '@angular/core';
import { Creature } from '../model/creature';
import { BattleSide } from '../model/battle-side';

@Injectable()
export class CalcService {

    player: BattleSide;
    enemy: BattleSide;

    constructor() { }

    setPlayer(creature: Creature) {
        this.player.creature = creature;
    }

    setEnemy(creature: Creature) {
        this.enemy.creature = creature;
    }

    range(min, max){
        return min === max ? min : min + '-' + max
    }
    
    damage(baseDmg) {
        // baseDmg -  базовый урон существа

        // условный множитель урона 
        // зависит от того больше или меньше атака и защита
        if ( this.player.creature.attack >= this.enemy.creature.defense ) {
            var multDmg = 0.05;
        } else {
            var multDmg = 0.025;
        }

        // модификатор урона
        // если атака больше то за каждую единицу +5% урона
        // если защита больше то за каждую единицу -25% урона
        // МD(баз) = (Атака - Защита) * 005  
        // MD(баз) = (Атака - Защита) * 0025 
        var modDmg = ( this.player.creature.attack - this.enemy.creature.defense ) * multDmg;

        // допустимый промежуток для модификатора: [-70% 300%] урона
        if ( modDmg > 3 ) { 
            modDmg = 3;
        } else if ( modDmg < -0.7 ) { 
            modDmg = -0.7;
        }

        // урон с учетом модификатора
        var modifiedDmg = baseDmg * modDmg;

        // итоговая формула урона
        var totalDmg = (modifiedDmg + baseDmg) * this.player.quantity;

        return {
            baseDmg:  baseDmg * this.player.quantity,
            totalDmg: totalDmg,
            modDmg:   ( modDmg * 100 )
        }

    }

    min() {
        return this.damage(this.player.creature.damageMin);
    }
    
    max() {
        return this.damage(this.player.creature.damageMax);
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
        var stackHealth = this.enemy.creature.health * this.enemy.quantity;
        var kill = {
            min: Math.floor( stackHealth / ( this.min().totalDmg / this.player.quantity ) ),
            max: Math.floor( stackHealth / ( this.max().totalDmg / this.player.quantity ) )
        };
        return this.range( 
            kill.max > 1 ? kill.max : 1,
            kill.min > 1 ? kill.min : 1
        );
    }

    enemiesLeft() {
        var stackHealth = this.enemy.creature.health * this.enemy.quantity;
        var healthLeft = {
            min: stackHealth - this.min().totalDmg,
            max: stackHealth - this.max().totalDmg
        }

        return this.range( 
            healthLeft.max > 0 ? Math.floor(healthLeft.max / this.enemy.creature.health) : 0,
            healthLeft.min > 0 ? Math.floor(healthLeft.min / this.enemy.creature.health) : 0 
        );
    }
}