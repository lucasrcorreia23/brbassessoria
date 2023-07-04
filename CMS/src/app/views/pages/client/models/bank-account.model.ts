import { Deserializable } from "../../../../models/deserializable.model";

export class BankAccountModel implements Deserializable {
  id!: number;
  bancoCodigo!: string;
  bancoAgencia!: string;
  bancoConta!: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
