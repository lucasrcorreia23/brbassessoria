import { Deserializable } from "./deserializable.model";

export class User implements Deserializable {
  id!: number;
  nome!: string;
  usuario!: string;
  senha!: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
