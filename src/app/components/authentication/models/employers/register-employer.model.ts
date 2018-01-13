export class RegisterEmployerModel {
    constructor(
        public isEmployer: boolean,
        public username: string,
        public password: string,
        public entityName: string,
        public sector: string,
        public phone: string,
        public email: string,
        public website: string,
        public address: string,
        public logo: string
    ) { }
}