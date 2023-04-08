import { IsEmail } from 'class-validator';

export class AuthLForgetDTO {
  @IsEmail()
  email: string;
}
