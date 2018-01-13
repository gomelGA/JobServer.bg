import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { adminComponents } from './index';
import { adminRoutes } from './admin-routes';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes),
        ReactiveFormsModule,
        CommonModule
    ],
    exports: [],
    declarations: [...adminComponents],
    providers: [],
})
export class AdminModule { }
