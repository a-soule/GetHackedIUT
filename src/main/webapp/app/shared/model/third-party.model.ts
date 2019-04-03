import { IUserThirdPartyMembership } from 'app/shared/model/user-third-party-membership.model';

export interface IThirdParty {
    id?: number;
    tradeName?: string;
    userThirdPartyMemberships?: IUserThirdPartyMembership[];
}

export class ThirdParty implements IThirdParty {
    constructor(public id?: number, public tradeName?: string, public userThirdPartyMemberships?: IUserThirdPartyMembership[]) {}
}
