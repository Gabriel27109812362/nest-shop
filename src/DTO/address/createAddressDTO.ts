export class CreateAddressDTO {
  readonly town: string;
  readonly province: string;
  readonly postCode: string;
  readonly street: string;
  readonly houseNumber: string;
  readonly flatNumber?: number;
}
