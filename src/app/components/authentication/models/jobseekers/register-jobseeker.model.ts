export class RegisterJobseekerModel {
    constructor(
        public isEmployer: boolean,
        public username: string,
        public email: string,
        public firstName: string,
        public lastName: string,
        public password: string
    ) { }
}