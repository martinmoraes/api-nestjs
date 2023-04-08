import { IsEmail, IsStrongPassword } from 'class-validator';

export class AuthLiginDTO {
  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 6,
  })
  password: string;
}
