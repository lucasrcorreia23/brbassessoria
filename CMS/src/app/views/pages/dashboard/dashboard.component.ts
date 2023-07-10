import { Component, OnInit, ViewChild } from "@angular/core";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Swal from "sweetalert2";
import { DashboardService } from "./dashboard.service";

@Component({
  selector: "kt-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  imgPreview = "http://www.placehold.it/200x150/EFEFEF/AAAAAA&text=SEM IMAGEM";
  fileNameLabel = "Nenhuma imagem selecionada";

  imgPreview2 = "http://www.placehold.it/200x150/EFEFEF/AAAAAA&text=SEM IMAGEM";
  fileNameLabel2 = "Nenhuma imagem selecionada";

  imgPreview3 = "http://www.placehold.it/200x150/EFEFEF/AAAAAA&text=SEM IMAGEM";
  fileNameLabel3 = "Nenhuma imagem selecionada";

  @ViewChild("file") file: { nativeElement: any } | undefined;
  @ViewChild("file2") file2: { nativeElement: any } | undefined;
  @ViewChild("file3") file3: { nativeElement: any } | undefined;

  public Editor = ClassicEditor;

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
    segmentos: any[];
    planos: { nome: string; descricao: string; topicos: any[] }[];
  } = {
    banner_foto: "",
    banner_frase: "",
    quemsomos_foto: "",
    quemsomos_frase: "",
    frasefinal: "",
    contato_email: "",
    contato_endereco: "",
    contato_telefone: "",
    metodologias: [],
    segmentos: [],
    planos: [
      {
        nome: "",
        descricao: "",
        topicos: [],
      },
      {
        nome: "",
        descricao: "",
        topicos: [],
      },
      {
        nome: "",
        descricao: "",
        topicos: [],
      },
    ],
  };

  metodologia = {
    titulo: "",
    descricao: "",
  };

  segmento = "";
  planoin1 = "";
  planoin2 = "";
  planoin3 = "";

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getDashboard();
  }

  getDashboard() {
    this.dashboardService.get().subscribe((resp) => {
      this.dados = resp;

      this.imgPreview = this.dados.banner_foto;
      this.imgPreview2 = this.dados.quemsomos_foto;
    });
  }

  onFilesAdded(type: number) {
    let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.svg)$/i;
    let name = "Selecionar arquivo";
    let imgPreview = "";
    let me = this;

    let file;

    switch (type) {
      case 1:
        file = this.file?.nativeElement;
        break;
      case 2:
        file = this.file2?.nativeElement;
        break;
      case 3:
        file = this.file3?.nativeElement;
        break;
    }

    if (file.files.length > 0) {
      if (allowedExtensions.exec(file.files[0].name)) {
        let reader = new FileReader();

        reader.onloadend = function (e) {
          imgPreview = e!.target!.result!.toString();

          switch (type) {
            case 1:
              me.imgPreview = imgPreview;
              break;
            case 2:
              me.imgPreview2 = imgPreview;
              break;
            case 3:
              me.imgPreview3 = imgPreview;
              break;
          }
        };

        reader.readAsDataURL(file.files[0]);

        name = file.files[0].name;
      } else {
        Swal.fire(
          "",
          "Por favor, selecione arquivos do tipo .jpeg/.jpg/.png/.gif/.svg somente.",
          "error"
        );
      }
    } else {
      imgPreview =
        "http://www.placehold.it/200x150/EFEFEF/AAAAAA&text=SEM+IMAGEM";

      switch (type) {
        case 1:
          me.imgPreview = imgPreview;
          break;
        case 2:
          me.imgPreview2 = imgPreview;
          break;
        case 3:
          me.imgPreview3 = imgPreview;
          break;
      }
    }

    switch (type) {
      case 1:
        this.fileNameLabel = name;
        break;
      case 2:
        this.fileNameLabel2 = name;
        break;
      case 3:
        this.fileNameLabel3 = name;
        break;
    }
  }

  save() {
    this.dados.banner_foto = this.imgPreview;
    this.dados.quemsomos_foto = this.imgPreview2;

    Swal.fire({
      title: "Alterar dados?",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.dashboardService.put(this.dados).subscribe(
          (_) => {
            Swal.fire("", "Dados salvos com sucesso!", "success");
          },
          (e) => {
            Swal.fire("", e, "error");
          }
        );
      }
    });
  }

  addMetodologia() {
    this.dados.metodologias.push({
      icone: this.imgPreview3,
      titulo: this.metodologia.titulo,
      descricao: this.metodologia.descricao,
    });

    this.imgPreview3 =
      "http://www.placehold.it/200x150/EFEFEF/AAAAAA&text=SEM IMAGEM";
    this.metodologia = {
      titulo: "",
      descricao: "",
    };
  }

  delMetodologia(index: number) {
    this.dados.metodologias.splice(index, 1);
  }

  addSegmento() {
    this.dados.segmentos.push({
      nome: this.segmento,
    });

    this.segmento = "";
  }

  delSegmento(index: number) {
    this.dados.segmentos.splice(index, 1);
  }

  addPlano(plano: number) {
    switch (plano) {
      case 0:
        if (this.planoin1) {
          this.dados.planos[plano].topicos.push(this.planoin1);
          this.planoin1 = "";
        }
        break;
      case 1:
        if (this.planoin2) {
          this.dados.planos[plano].topicos.push(this.planoin2);
          this.planoin2 = "";
        }
        break;
      case 2:
        if (this.planoin3) {
          this.dados.planos[plano].topicos.push(this.planoin3);
          this.planoin3 = "";
        }
        break;
    }
  }

  delPlano(plano: number, index: number) {
    this.dados.planos[plano].topicos.splice(index, 1);
  }
}
