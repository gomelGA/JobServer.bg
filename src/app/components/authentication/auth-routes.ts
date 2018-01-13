import { Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { JobseekerRegisterFormComponent } from './register-form/jobseekers/jobseeker-register-form.component';
import { EmployerRegisterFormComponent } from './register-form/employers/employer-register-form.component';
import { LogoutComponent } from './logout/logout.component';

export const authRoutes: Routes = [
    { path: 'login', component: LoginFormComponent },
    { path: 'registration', component: JobseekerRegisterFormComponent },
    { path: 'register', component: EmployerRegisterFormComponent },
    { path: 'logout', component: LogoutComponent }
]