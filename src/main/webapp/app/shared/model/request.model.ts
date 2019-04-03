import { Moment } from 'moment';
import { IContract } from 'app/shared/model/contract.model';

export interface IRequest {
    id?: number;
    maxBuyPrice?: number;
    description?: string;
    date?: Moment;
    contract?: IContract;
}

export class Request implements IRequest {
    constructor(
        public id?: number,
        public maxBuyPrice?: number,
        public description?: string,
        public date?: Moment,
        public contract?: IContract
    ) {}
}
