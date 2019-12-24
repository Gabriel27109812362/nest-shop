export class CreateUserDTO {
  readonly login: string;
  readonly password: string;
  readonly role: 'employee' | 'client';
}
