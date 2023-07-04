import { Client } from "../views/pages/client/models/client.model";
import { Deserializable } from "./deserializable.model";
import { User } from "./user.model";

export class UsuarioCliente implements Deserializable {
  clientsId!: number;
  usuariosId!: number;

  client?: Client;
  usuario?: User;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
