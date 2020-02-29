import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from "rxjs";
import { spyOnClass} from 'jasmine-es6-spies/dist';

import { CreaturesListComponent } from './creatures-list.component';
import { CreatureService } from '../../service/creature.service';
import { CalcService } from '../../service/calc.service';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('CreaturesListComponent', () => {
    let component: CreaturesListComponent;
    let fixture: ComponentFixture<CreaturesListComponent>;
    let creatureService: jasmine.SpyObj<CreatureService>;

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
                CalcService,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreaturesListComponent);
        component = fixture.componentInstance;
        creatureService = TestBed.get(CreatureService);
        creatureService.getCreatures.and.returnValue(of([
            {
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
            },
            {
                "name": "Алебардщик",
                "level": 1,
                "damageMin": 2,
                "damageMax": 3,
                "attack": 6,
                "defense": 5,
                "health": 10,
                "speed": 5,
                "growth": 14,
                "goldPrice": 75,
                "resourcePrice": "",
                "city": 0
            }
        ]));
        fixture.detectChanges();
    });

    it('should display creatures', () => {
        expect(fixture.nativeElement.querySelectorAll('button').length).toBeGreaterThan(1);
    });

    it('should display creature info', () => {
        expect(fixture.nativeElement.querySelector('button').innerText).toEqual('Копейщик');
    });
});
