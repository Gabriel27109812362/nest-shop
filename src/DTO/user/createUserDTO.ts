export class CreateUserDTO {
  readonly login: string;
  readonly password: string;
  readonly email: string;
  readonly role: 'employee' | 'client';
}
