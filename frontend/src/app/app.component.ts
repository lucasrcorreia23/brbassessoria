import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit, AfterViewInit {
  dados: {
    banner_foto: string;
    banner_frase: string;
    quemsomos_foto: string;
    quemsomos_frase: string;
    frasefinal: string;
    contato_email: string;
    contato_endereco: string;
    contato_telefone: string;
    metodologias: any[];
    planos: any[];
    segmentos: any[];
  } = {
    banner_foto: '',
    banner_frase: '',
    quemsomos_foto: '',
    quemsomos_frase: '',
    frasefinal: '',
    contato_email: '',
    contato_endereco: '',
    contato_telefone: '',
    metodologias: [],
    planos: [
      {
        nome: '',
        descricao: '',
        topicos: '',
      },
      {
        nome: '',
        descricao: '',
        topicos: '',
      },
      {
        nome: '',
        descricao: '',
        topicos: '',
      },
    ],
    segmentos: [],
  };

  segmentos: { itens: string[] }[] = [];

  constructor(private appService: AppService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.appService.get().subscribe((response) => {
      this.dados = response;

      if (this.dados.segmentos.length > 0) {
        this.segmentos.push({
          itens: [],
        });

        let qntdItens = 0;
        let indiceUl = 0;

        for (let i = 0; i < this.dados.segmentos.length; i++) {
          if (qntdItens == 4) {
            indiceUl++;
            qntdItens = 0;

            this.segmentos.push({
              itens: [],
            });
          }

          this.segmentos[indiceUl].itens.push(this.dados.segmentos[i].nome);
          qntdItens++;
        }
      }
    });
  }
  
  

  ngAfterViewInit() {
    const script = document.createElement('script');
    script.src = 'assets/js/custom.js';
    document.body.appendChild(script);
  }
  openDialog() {
    this.dialog.open(ModalComponent);
  }
  
  
}

