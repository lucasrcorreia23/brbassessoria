import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['./app.component.scss'],
})
export class ModalComponent {
  
  form = this.fb.group({
    competencia: ['', Validators.required],
    naturezaDoDebito: ['', Validators.required],
    datadoAjuizamento: ['', Validators.required],
    execucaodaPena: ['', Validators.required],
    execucaoFiscal: ['', Validators.required],
    exequente: ['', Validators.required],
    executado: ['', Validators.required],
    valordaCausa: ['', Validators.required],
    sintesedosFatos: ['', Validators.required],
    situacaodoProcesso: ['', Validators.required]
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
    { label: 'Sintese dos Fatos', controlName: 'sintesedosFatos', isTextArea: true },
    { label: 'Situação do Processo', controlName: 'situacaodoProcesso', isTextArea: true },
    // etc...
  ];

  constructor(private fb: FormBuilder) {}

  submit() {
    console.log(this.form.value);
  }
}
