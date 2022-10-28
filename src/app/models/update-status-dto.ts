import { Status } from './status';

export interface UpdateStatusDto {
  resolverId: number;
  status: Status;
  timeResolved: string;
}
