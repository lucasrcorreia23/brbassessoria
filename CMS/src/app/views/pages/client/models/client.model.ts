import { Deserializable } from "../../../../models/deserializable.model";
import { BankAccountModel } from "./bank-account.model";

export class Client implements Deserializable {
  id!: number;
  idPessoa!: number;
  createdAt!: string;
  estado!: string;
  municipio!: string;
  bairro!: string;
  endereco!: string;
  cep!: string;
  telefone!: string;
  email!: string;
  contato!: string;
  inscricaoEstadual!: string;
  inscricaoMunicipal!: number;
  logoTipo!: string;
  certificado!: string;
  certificadoSenha!: string;
  certificadoId!: string;
  simplesNacional!: boolean;
  regimeTributario!: number;
  incentivoFiscal!: boolean;
  incentivadorCultural!: boolean;
  regimeTributarioEspecial!: number;
  tipoLogradouro!: number;
  numero!: string;
  complemento!: string;
  codigoCidade!: number;
  ddd!: number;
  nfseAtivo!: boolean;
  nfseTipoContrato!: number;
  nfseProducao!: boolean;
  nfseEmail!: boolean;
  nfseSerie!: string;
  nfseNumero!: number;
  nfseLote!: number;
  nfseLogin!: string;
  nfseSenha!: string;
  nfeAtivo!: boolean;
  nfeTipoContrato!: number;
  nfeProducao!: boolean;
  nfeImpressaoFcp!: boolean;
  nfeImpressaoPartilha!: boolean;
  nfeSerie!: number;
  nfeNumero!: number;
  nfeDfe!: boolean;
  nfeEmail!: boolean;
  nfceAtivo!: boolean;
  nfceTipoContrato!: number;
  nfceProducao!: boolean;
  nfceSerie!: number;
  nfceNumero!: number;
  nfceEmail!: boolean;
  nfceIdCodigoSegurancaContribuinte!: string;
  nfceCodigoSegurancaContribuinte!: string;
  cnpjPlugNota!: string;
  pessoa!: {
    id: number;
    tipo: number;
    nomefantasia: string;
    razaosocial: string;
    cpfcnpj: string;
  };

  servicoPadraoId?: number;

  contasBancaria!: BankAccountModel[];
  bancoCodigo!: string;
  bancoAgencia!: string;
  bancoConta!: string;

  nossaNumeroCount = 0;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
