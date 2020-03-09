import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from "@angular/common/http";

import { CalcService } from './calc.service';
import { CreatureService } from './creature.service';
import { Creature } from '../model/creature';
import { calculationResult } from '../interface/calculation-result.interface';

fdescribe('CalcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [CalcService, CreatureService, HttpClient]
    });
  });

  it('should be created', inject([CalcService], (service: CalcService) => {
    expect(service).toBeTruthy();
  }));


  it(
    '1 Naga hits 10 Pikemen: 31 damage, 3 kills', 
    inject([CalcService, CreatureService], (calcService: CalcService, creatureService: CreatureService) => {

    let naga = {
      "name": "Нага",
      "level": 6,
      "damageMin": 20,
      "damageMax": 20,
      "attack": 16,
      "defense": 13,
      "health": 110,
      "speed": 5,
      "growth": 2,
      "goldPrice": 1100,
      "resourcePrice": "",
      "city": 2
    };
    let pikeman = {
      "name": "Копейщик",
      "level": 1,
      "damageMin": 1,
      "damageMax": 3,
      "attack": 4,
      "defense": 5,
      "health": 10,
      "speed": 4,
      "growth": 14,
      "goldPrice": 60,
      "resourcePrice": "",
      "city": 0
    }


    // select player to naga
    calcService.setPlayer(naga);
    expect(calcService.playerCreature.name).toBe('Нага');

    // set it 1
    calcService.playerQuantity = 1;

    // select enemy to pikeman
    calcService.setEnemy(pikeman);

    // set it 10
    calcService.enemyQuantity = 10;

    let result: calculationResult = calcService.damage(calcService.playerCreature.damageMin);

    // check for 31 damage
    expect(result.totalDmg).toBe(31);

    // check for 3 kills
    expect(calcService.enemiesWillDie()).toBe(3);

  }));
});
