import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GethackedSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';
import { USERS_ROUTE } from '../our-third-party/our-third-party.route';

@NgModule({
    imports: [GethackedSharedModule, RouterModule.forChild([HOME_ROUTE, USERS_ROUTE])],
    declarations: [HomeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GethackedHomeModule {}
