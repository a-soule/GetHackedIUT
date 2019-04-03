import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IContract } from 'app/shared/model/contract.model';
import { ContractService } from './contract.service';
import { IThirdParty } from 'app/shared/model/third-party.model';
import { ThirdPartyService } from 'app/entities/third-party';
import { IRequest } from 'app/shared/model/request.model';
import { RequestService } from 'app/entities/request';

@Component({
    selector: 'jhi-contract-update',
    templateUrl: './contract-update.component.html'
})
export class ContractUpdateComponent implements OnInit {
    contract: IContract;
    isSaving: boolean;

    providers: IThirdParty[];

    clients: IThirdParty[];

    requests: IRequest[];
    date: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected contractService: ContractService,
        protected thirdPartyService: ThirdPartyService,
        protected requestService: RequestService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ contract }) => {
            this.contract = contract;
            this.date = this.contract.date != null ? this.contract.date.format(DATE_TIME_FORMAT) : null;
        });
        this.thirdPartyService
            .query({ filter: 'contract-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IThirdParty[]>) => mayBeOk.ok),
                map((response: HttpResponse<IThirdParty[]>) => response.body)
            )
            .subscribe(
                (res: IThirdParty[]) => {
                    if (!this.contract.provider || !this.contract.provider.id) {
                        this.providers = res;
                    } else {
                        this.thirdPartyService
                            .find(this.contract.provider.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IThirdParty>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IThirdParty>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IThirdParty) => (this.providers = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.thirdPartyService
            .query({ filter: 'contract-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IThirdParty[]>) => mayBeOk.ok),
                map((response: HttpResponse<IThirdParty[]>) => response.body)
            )
            .subscribe(
                (res: IThirdParty[]) => {
                    if (!this.contract.client || !this.contract.client.id) {
                        this.clients = res;
                    } else {
                        this.thirdPartyService
                            .find(this.contract.client.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IThirdParty>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IThirdParty>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IThirdParty) => (this.clients = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.requestService
            .query({ filter: 'contract-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IRequest[]>) => mayBeOk.ok),
                map((response: HttpResponse<IRequest[]>) => response.body)
            )
            .subscribe(
                (res: IRequest[]) => {
                    if (!this.contract.request || !this.contract.request.id) {
                        this.requests = res;
                    } else {
                        this.requestService
                            .find(this.contract.request.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IRequest>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IRequest>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IRequest) => (this.requests = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.contract.date = this.date != null ? moment(this.date, DATE_TIME_FORMAT) : null;
        if (this.contract.id !== undefined) {
            this.subscribeToSaveResponse(this.contractService.update(this.contract));
        } else {
            this.subscribeToSaveResponse(this.contractService.create(this.contract));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IContract>>) {
        result.subscribe((res: HttpResponse<IContract>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackThirdPartyById(index: number, item: IThirdParty) {
        return item.id;
    }

    trackRequestById(index: number, item: IRequest) {
        return item.id;
    }
}
