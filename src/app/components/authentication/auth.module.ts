import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { authComponents } from './index';

import { authRoutes } from './auth-routes';


@NgModule({
    declarations: [
        ...authComponents
    ],
    imports: [
        RouterModule.forChild(authRoutes),
        ReactiveFormsModule,
        CommonModule
    ],
    providers: [],
    exports: []
})
export class AuthModule { }
