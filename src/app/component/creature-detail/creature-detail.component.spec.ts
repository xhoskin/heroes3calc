import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatureDetailComponent } from './creature-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { CreatureService } from '../../service/creature.service';
import { CalcService } from '../../service/calc.service';

describe('CreatureDetailComponent', () => {
  let component: CreatureDetailComponent;
  let fixture: ComponentFixture<CreatureDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
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
    fixture = TestBed.createComponent(CreatureDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
