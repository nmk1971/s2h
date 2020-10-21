import { SelectItemGroup } from 'primeng/api';

export interface IUser {
    _id?: string;
    firstname: string;
    lastname: string;
    gender: string;
    loginname: string;
    password: string;
    creator: string;
    group: string;
    avatar_url?: string;
    token?: string;
}