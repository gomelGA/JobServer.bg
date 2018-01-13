export class PublishAdvertisementModel {
    constructor(
        public shortPreview: string,
        public jobTitle: string,
        public refNumber: string,
        public mainResponsibilities: string,
        public requirements: string,        
        public sector: string,
        public employmentType: string, 
        public hierarchyLevel: string,       
        public place: string,
    ) { }
}