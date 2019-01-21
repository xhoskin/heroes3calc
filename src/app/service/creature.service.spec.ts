import { TestBed, inject } from '@angular/core/testing';
import { CreatureService } from './creature.service';
import { CalcService } from './calc.service';

describe('CreatureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreatureService, CalcService]
    });
  });

  it('should be created', inject([CreatureService], (service: CreatureService) => {
    expect(service).toBeTruthy();
  }));
});
