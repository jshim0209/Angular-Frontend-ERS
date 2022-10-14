import { AuthorDto } from "./author-dto";
import { ResolverDto } from "./resolver-dto";
import { Status } from "./status";
import { Type } from "./type";

export interface ReimbursementDto {
  id: number;
  amount: number;
  timeSubmitted: string;
  timeResolved: string;
  description: string;
  receipt: string;
  author: AuthorDto;
  resolver: ResolverDto;
  status: Status;
  type: Type;
}
