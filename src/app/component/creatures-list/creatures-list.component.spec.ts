import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from "rxjs";
import { spyOnClass} from 'jasmine-es6-spies/dist';

import { CreaturesListComponent } from './creatures-list.component';
import { CreatureService } from '../../service/creature.service';
import { CalcService } from '../../service/calc.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('CreaturesListComponent', () => {
    let component: CreaturesListComponent;
    let fixture: ComponentFixture<CreaturesListComponent>;
    let creatureService: jasmine.SpyObj<CreatureService>;
    let calcService: jasmine.SpyObj<CalcService>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CreaturesListComponent
            ],
            imports: [
                RouterTestingModule
            ],
            providers: [
                { provide: CreatureService, useFactory: () => spyOnClass(CreatureService)},
                { provide: CalcService, useFactory: () => spyOnClass(CalcService)},
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreaturesListComponent);
        component = fixture.componentInstance;
        creatureService = TestBed.get(CreatureService);
        calcService = TestBed.get(CalcService);

        const creatures = require('../../../assets/data/creatures.json');
        creatureService.getCreatures.and.returnValue(of(creatures));
        fixture.detectChanges();
    });

    it('should display creatures', () => {
        expect(fixture.nativeElement.querySelectorAll('button').length).toBeGreaterThan(1);
    });

    it('should display creature info', () => {
        expect(fixture.nativeElement.querySelector('button').innerText).toEqual('Копейщик');
    });


    it('should change player\'s creature', () => {

        // Set side
        fixture.componentInstance.side = 'player';

        // Find second button,
        const targetBtn = fixture.nativeElement.querySelectorAll('button')[1];
        expect(targetBtn.textContent).toContain('Алебардщик');

        // Click on it.
        targetBtn.click();

        // Player's creature should change
        expect(calcService.setPlayer).toHaveBeenCalled();
    });
});
