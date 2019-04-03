/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GethackedTestModule } from '../../../test.module';
import { RequestComponent } from 'app/entities/request/request.component';
import { RequestService } from 'app/entities/request/request.service';
import { Request } from 'app/shared/model/request.model';

describe('Component Tests', () => {
    describe('Request Management Component', () => {
        let comp: RequestComponent;
        let fixture: ComponentFixture<RequestComponent>;
        let service: RequestService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GethackedTestModule],
                declarations: [RequestComponent],
                providers: []
            })
                .overrideTemplate(RequestComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RequestComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RequestService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Request(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.requests[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
