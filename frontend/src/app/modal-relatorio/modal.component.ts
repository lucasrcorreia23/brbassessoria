import { Component, Inject } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AppService } from "../app.service";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
})
export class ModalComponent {
  plano = "";
  tipo = 4;
  mostrarComplementos = false;
  error = false;
  funcionou = false;

  msgerror = "";
  carregando = false;

  get pessoal(): FormGroup {
    return this.form.get("pessoal") as FormGroup;
  }

  get cartao(): FormGroup {
    return this.form.get("cartao") as FormGroup;
  }

  get cobranca(): FormGroup {
    return this.form.get("cobranca") as FormGroup;
  }

  get processo(): FormGroup {
    return this.form.get("processo") as FormGroup;
  }

  form = this.fb.group({
    pessoal: this.fb.group({
      nome: ["", Validators.required],
      email: ["", Validators.required],
      cpfcnpj: ["", Validators.required],
      celular: ["", Validators.required],
    }),
    cartao: this.fb.group({
      nomecartao: ["", Validators.required],
      numerocartao: ["", Validators.required],
      validade: ["", Validators.required],
      cvv: ["", Validators.required],
      parcelas: ["", Validators.required],
    }),
    cobranca: this.fb.group({
      cep: ["", Validators.required],
      logradouro: ["", Validators.required],
      numerocobranca: [0, Validators.required],
      complementocobranca: [""],
      bairrocobranca: ["", Validators.required],
      cidadecobranca: ["", Validators.required],
      estadocobranca: ["", Validators.required],
      paiscobranca: ["BR", Validators.required],
    }),
    processo: this.fb.group({
      competencia: [""],
      naturezaDoDebito: [""],
      datadoAjuizamento: [""],
      execucaodaPena: [""],
      execucaoFiscal: [""],
      exequente: [""],
      executado: [""],
      valordaCausa: [""],
      sintesedosFatos: [""],
      situacaodoProcesso: [""],
    }),
  });

  formFields = [
    { label: "Competência", controlName: "competencia" },
    { label: "Natureza do Débito", controlName: "naturezaDoDebito" },
    { label: "Data do Ajuizamento", controlName: "datadoAjuizamento" },
    { label: "Execução da Pena", controlName: "execucaodaPena" },
    { label: "Execução Fiscal", controlName: "execucaoFiscal" },
    { label: "Exequente", controlName: "exequente" },
    { label: "Executado", controlName: "executado" },
    { label: "Valor da Causa", controlName: "valordaCausa" },
    {
      label: "Sintese dos Fatos",
      controlName: "sintesedosFatos",
      isTextArea: true,
    },
    {
      label: "Situação do Processo",
      controlName: "situacaodoProcesso",
      isTextArea: true,
    },
  ];

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private appService: AppService
  ) {
    this.plano = this.data.plano;
    this.tipo = this.data.tipo;
  }

  submit() {
    this.carregando = true;
    this.error = false;

    if (this.form.valid) {
      let dados: any = this.form.value;
      dados.tipo = this.tipo;

      this.appService.pagar(dados).subscribe(
        (_) => {
          this.funcionou = true;
          this.carregando = false;
        },
        (error) => {
          this.error = true;
          this.msgerror = error;

          this.carregando = false;
        }
      );
    } else {
      this.error = true;
      this.msgerror = "Por favor, preencha todos os campos";
      this.carregando = false;
    }
  }

  getCepCorreios(): void {
    let cep = this.form.get("cobranca")!.get("cep")!.value!;

    if (cep.length == 8) {
      this.appService.getCorreios(cep).subscribe((response) => {
        if (response) {
          this.form.get("cobranca")!.patchValue({
            cep: cep,
            numerocobranca: 0,
            complementocobranca: "",
            paiscobranca: "BR",

            estadocobranca: response.estado,
            cidadecobranca: response.cidade,
            bairrocobranca: response.bairro,
            logradouro: response.logradouro,
          });
        }
      });
    }
  }
}
