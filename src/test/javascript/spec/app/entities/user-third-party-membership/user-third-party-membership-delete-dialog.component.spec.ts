/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GethackedTestModule } from '../../../test.module';
import { UserThirdPartyMembershipDeleteDialogComponent } from 'app/entities/user-third-party-membership/user-third-party-membership-delete-dialog.component';
import { UserThirdPartyMembershipService } from 'app/entities/user-third-party-membership/user-third-party-membership.service';

describe('Component Tests', () => {
    describe('UserThirdPartyMembership Management Delete Component', () => {
        let comp: UserThirdPartyMembershipDeleteDialogComponent;
        let fixture: ComponentFixture<UserThirdPartyMembershipDeleteDialogComponent>;
        let service: UserThirdPartyMembershipService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GethackedTestModule],
                declarations: [UserThirdPartyMembershipDeleteDialogComponent]
            })
                .overrideTemplate(UserThirdPartyMembershipDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UserThirdPartyMembershipDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserThirdPartyMembershipService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
