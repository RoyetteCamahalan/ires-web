export interface Office {
    accountid: number;
    companyid: number;
    accountname: string;
    isactive: boolean;
    memo: string;
    pettycashbalance: number;
    createdbyid: number;
    datecreated: Date | null;
    updatedbyid: number;
    dateupdated: Date | null;
}