import { Type } from "./type";
import { User } from "./user";
import { Status } from "./status"


export interface Reimbursement {
  id: number;
  amount: number;
  timeSubmitted: string;
  timeResolved: string;
  description: string;
  receipt: string;
  author: User;
  resolver: User;
  status: Status;
  type: Type;

}
