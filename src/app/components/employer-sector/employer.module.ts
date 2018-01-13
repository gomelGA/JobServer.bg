import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { employerComponents } from './index';
import { employerRoutes } from './employer-routes';

@NgModule({
    imports: [
        RouterModule.forChild(employerRoutes),
        ReactiveFormsModule,
        CommonModule
    ],
    exports: [],
    declarations: [...employerComponents],
    providers: [],
})
export class EmployerModule { }
