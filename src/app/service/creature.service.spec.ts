import { TestBed, inject } from '@angular/core/testing';
import { CreatureService } from './creature.service';
import { CalcService } from './calc.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";

describe('CreatureService', () => {
    let httpClient: HttpClient;
    let creaturesService: CreatureService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                CreatureService,
                CalcService
            ]
        });
    });

    it('should return the list of creatures', inject([CreatureService], (service: CreatureService) => {
        // Spy on and mock the HttpClient.
        httpClient = TestBed.get(HttpClient);
        const creaturesMock = [
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
                "name": "ahahah-Алебардщик",
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
        ];
        spyOn(httpClient, 'get').and.returnValue(of(creaturesMock));

        // Use our service to get creatures.
        creaturesService = TestBed.get(CreatureService);
        const spy = jasmine.createSpy('spy' );
        creaturesService.getCreatures().subscribe(spy);

        // Verify that the service returned mocked data.
        expect(spy).toHaveBeenCalledWith(creaturesMock);

        // Verify that service called the proper http endpoint.
        expect(httpClient.get).toHaveBeenCalledWith('assets/data/creatures.json');
    }));
});
