import { TestBed, inject } from '@angular/core/testing';

import { CalcService } from './calc.service';
import { CreatureService } from './creature.service';

fdescribe('CalcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalcService, CreatureService]
    });
  });

  it('should be created', inject([CalcService], (service: CalcService) => {
    expect(service).toBeTruthy();
  }));


  it('1 Naga hits 10 Pikemen: 31 damage, 3 kills', inject([CalcService], (service: CalcService) => {
    expect(service).toBeTruthy();

    // select player to naga

    // set it 1

    // select enemy to pikeman

    // set it 10

    // check for 31 damage

    // check for 3 kills



  }));
});
