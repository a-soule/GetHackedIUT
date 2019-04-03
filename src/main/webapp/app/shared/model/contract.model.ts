import { Moment } from 'moment';
import { IThirdParty } from 'app/shared/model/third-party.model';
import { IRequest } from 'app/shared/model/request.model';

export interface IContract {
    id?: number;
    pdf?: string;
    date?: Moment;
    provider?: IThirdParty;
    client?: IThirdParty;
    request?: IRequest;
}

export class Contract implements IContract {
    constructor(
        public id?: number,
        public pdf?: string,
        public date?: Moment,
        public provider?: IThirdParty,
        public client?: IThirdParty,
        public request?: IRequest
    ) {}
}
