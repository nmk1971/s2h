export interface ISession {
    _id?: string;
    idquiz: string | any;
    evaluationType: string;
    isAnonymous: boolean;
    returnCorrectResponse: boolean;
    group?: string;
    creator?: string;
    quizSessionCode?: string;
    isOpen: boolean;
    createDate: Date;
    startDate: Date;
    closeDate: Date;
}