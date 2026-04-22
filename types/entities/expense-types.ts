import { ExpenseTypeCategory } from "./expense-type-category";

export interface ExpenseType {
  expensetypeid: number;
  companyid: number;
  expensetypedesc: string;
  expensetypecat: number;
  isactive: boolean;
  createdbyid: number;
  datecreated?: Date;
  updatedbyid: number;
  dateupdated?: Date;
  category?: ExpenseTypeCategory;
}
