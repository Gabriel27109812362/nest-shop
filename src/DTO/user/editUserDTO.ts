export class EditUserDTO {
  readonly login?: string;
  readonly password?: string;
  readonly role?: 'employee' | 'client';
}
