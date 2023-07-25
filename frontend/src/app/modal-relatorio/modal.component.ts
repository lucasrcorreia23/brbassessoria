import { Component, Inject } from '@angular/core';
import { FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from '../app.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  plano = '';
  tipo = 0;
  mostrarComplementos = false;
  error = false;
  funcionou = false;

  msgerror = '';
  carregando = false;

  form = this.fb.group({
    nome: ['', Validators.required],
    email: ['', Validators.required],
    cpfcnpj: ['', Validators.required],
    celular: ['', Validators.required],
    nomecartao: ['', Validators.required],
    numerocartao: ['', Validators.required],
    bandeira: ['', Validators.required],
    validade: ['', Validators.required],
    cvv: ['', Validators.required],
    cep: ['', Validators.required],
    logradouro: ['', Validators.required],
    numerocobranca: [0, Validators.required],
    complementocobranca: [''],
    bairrocobranca: ['', Validators.required],
    cidadecobranca: ['', Validators.required],
    estadocobranca: ['', Validators.required],
    paiscobranca: ['BR', Validators.required],
    competencia: [''],
    naturezaDoDebito: [''],
    datadoAjuizamento: [''],
    execucaodaPena: [''],
    execucaoFiscal: [''],
    exequente: [''],
    executado: [''],
    valordaCausa: [''],
    sintesedosFatos: [''],
    situacaodoProcesso: [''],
  });

  formFields = [
    { label: 'Competência', controlName: 'competencia' },
    { label: 'Natureza do Débito', controlName: 'naturezaDoDebito' },
    { label: 'Data do Ajuizamento', controlName: 'datadoAjuizamento' },
    { label: 'Execução da Pena', controlName: 'execucaodaPena' },
    { label: 'Execução Fiscal', controlName: 'execucaoFiscal' },
    { label: 'Exequente', controlName: 'exequente' },
    { label: 'Executado', controlName: 'executado' },
    { label: 'Valor da Causa', controlName: 'valordaCausa' },
    {
      label: 'Sintese dos Fatos',
      controlName: 'sintesedosFatos',
      isTextArea: true,
    },
    {
      label: 'Situação do Processo',
      controlName: 'situacaodoProcesso',
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

    this.mostrarComplementos = this.data.tipo > 2;
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
        },
        (error) => {
          this.error = true;
          this.msgerror = error;

          this.carregando = false;
        }
      );
    } else {
      this.error = true;
      this.msgerror = 'Por favor, preencha todos os campos';
      this.carregando = false;
    }
  }
}
