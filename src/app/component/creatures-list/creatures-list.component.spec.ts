import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaturesListComponent } from './creatures-list.component';
import { CreatureService } from '../../service/creature.service';
import { CalcService } from '../../service/calc.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('CreaturesListComponent', () => {
  let component: CreaturesListComponent;
  let fixture: ComponentFixture<CreaturesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CreaturesListComponent
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        CreatureService,
        CalcService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreaturesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display creatures', () => {
    expect(fixture.nativeElement.querySelector('button')).toBeTruthy();
  });
});
