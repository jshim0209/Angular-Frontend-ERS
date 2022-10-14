import { UserRole } from "./user-role";

export interface UserDto {
  id: number;
  username: string;
  userRole: UserRole;
  firstName: string;
  jwt: string;
}
