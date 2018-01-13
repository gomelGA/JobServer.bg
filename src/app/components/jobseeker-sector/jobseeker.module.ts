import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { jobseekerComponents } from './index';
import { jobseekerRoutes } from './jobseeker-routes';

@NgModule({
    imports: [
        RouterModule.forChild(jobseekerRoutes),
        ReactiveFormsModule,
        CommonModule
    ],
    exports: [],
    declarations: [...jobseekerComponents],
    providers: [],
})
export class JobseekerModule { }
