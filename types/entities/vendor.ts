export interface Vendor {
  vendorid: number;
  companyid: number;
  vendorname: string;
  address: string;
  contactno: string;
  tinno: string;
  isactive: boolean;
  createdbyid: number;
  datecreated?: Date;
  updatedbyid: number;
  dateupdated?: Date;
}
