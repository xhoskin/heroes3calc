import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcComponent } from './calc.component';
import { CreatureDetailComponent } from '../creature-detail/creature-detail.component';
import { FormsModule } from '@angular/forms';
import { CreatureService } from '../../service/creature.service';
import { CalcService } from '../../service/calc.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('CalcComponent', () => {
  let component: CalcComponent;
  let fixture: ComponentFixture<CalcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CalcComponent,
        CreatureDetailComponent
      ],
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      providers: [
        CreatureService,
        CalcService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
