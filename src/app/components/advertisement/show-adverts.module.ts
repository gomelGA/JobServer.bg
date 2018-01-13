import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { showAdvertsComponents } from './index';
import { showAdvertsRoutes } from './show-adverts-routes';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        RouterModule.forChild(showAdvertsRoutes),
        CommonModule
    ],
    exports: [],
    declarations: [...showAdvertsComponents],
    providers: [],
})
export class ShowAdvertsModule { }
