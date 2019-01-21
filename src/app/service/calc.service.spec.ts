import { TestBed, inject } from '@angular/core/testing';

import { CalcService } from './calc.service';
import { CreatureService } from './creature.service';

describe('CalcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalcService, CreatureService]
    });
  });

  it('should be created', inject([CalcService], (service: CalcService) => {
    expect(service).toBeTruthy();
  }));
});
