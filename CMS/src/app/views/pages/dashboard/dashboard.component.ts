import { Component, OnInit, ViewChild } from "@angular/core";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { DashboardService } from "./dashboard.service";

@Component({
  selector: "kt-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  imgPreview = "http://www.placehold.it/200x150/EFEFEF/AAAAAA&text=SEM IMAGEM";
  fileNameLabel = "Nenhuma imagem selecionada";

  @ViewChild("file") file: { nativeElement: any } | undefined;

  public Editor = ClassicEditor;

  dados = {
    banner_foto: "",
    banner_frase: "",
    quemsomos_foto: "",
    quemsomos_frase: "",
    frasefinal: "",
    contato_email: "",
    contato_endereco: "",
    contato_telefone: "",
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getDashboard();
  }

  getDashboard() {
    this.dashboardService.get().subscribe((resp) => {
      this.dados = resp;
    });
  }

  onFilesAdded() {
    let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    let name = "Selecionar arquivo";
    let imgPreview = "";
    let me = this;

    let file = this.file?.nativeElement;

    if (file.files.length > 0) {
      if (allowedExtensions.exec(file.files[0].name)) {
        let reader = new FileReader();

        reader.onloadend = function (e) {
          imgPreview = e!.target!.result!.toString();
          me.imgPreview = imgPreview;
        };

        reader.readAsDataURL(file.files[0]);

        name = file.files[0].name;
      } else {
        // swal.fire('', 'Por favor, selecione arquivos do tipo .jpeg/.jpg/.png/.gif somente.', 'error');
      }
    } else {
      imgPreview =
        "http://www.placehold.it/200x150/EFEFEF/AAAAAA&text=SEM+IMAGEM";
      me.imgPreview = imgPreview;
    }

    this.fileNameLabel = name;
  }
}
