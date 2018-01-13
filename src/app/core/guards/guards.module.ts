import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { AuthEmployerGuard } from './authentication/auth-employer.guard';
import { AuthJobseekerGuard } from './authentication/auth-jobseeker.guard';

@NgModule({
    providers: [
        AuthEmployerGuard,
        AuthJobseekerGuard
    ],
    imports: [
        CommonModule
    ]
})
export class GuardsModule {
}
