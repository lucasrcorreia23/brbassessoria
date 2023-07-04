import { LocalityService } from "./../../../../services/locality.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { LayoutUtilsService } from "../../../../services/layout-utils.service";
import { Client } from "../models/client.model";
import { ClientService } from "../services/client.service";

@Component({
  selector: "kt-client-edit",
  templateUrl: "./edit.component.html",
})
export class EditComponent implements OnInit, OnDestroy {
  form!: FormGroup;

  carregando = true;

  client: Client = new Client();

  hasFormErrors = false;
  msgFormError = "";

  selectedTab = 0;

  regimeTributarioEnum: { name: string; value: number }[] = [];
  regimeTributarioEspecialEnum: { name: string; value: number }[] = [];

  private subscriptions: Subscription[] = [];

  isEdit = false;

  certificadoName = "";

  constructor(
    private clientService: ClientService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private layoutUtilsService: LayoutUtilsService,
    private localityService: LocalityService
  ) {}

  ngOnInit() {
    this.clientService.getEnums().subscribe((response) => {
      this.regimeTributarioEnum = response.RegimeTributarioEnum;
      this.regimeTributarioEspecialEnum = response.RegimeTributarioEspecialEnum;
    });

    this.form = this.fb.group({
      estado: ["", Validators.compose([Validators.required])],
      municipio: ["", Validators.compose([Validators.required])],
      bairro: ["", Validators.compose([Validators.required])],
      endereco: ["", Validators.compose([Validators.required])],
      numero: ["", Validators.compose([Validators.required])],
      cep: ["", Validators.compose([Validators.required])],
      complemento: [""],
      ddd: [""],
      telefone: [""],
      email: [""],
      contato: ["", Validators.compose([Validators.required])],
      inscricaoEstadual: [""],
      inscricaoMunicipal: ["", Validators.compose([Validators.required])],
      certificado: ["", Validators.compose([Validators.required])],
      certificadoSenha: ["", Validators.compose([Validators.required])],
      appKey: ["", Validators.compose([Validators.required])],
      appSecret: ["", Validators.compose([Validators.required])],
      simplesNacional: [false, Validators.compose([Validators.required])],
      incentivoFiscal: [false, Validators.compose([Validators.required])],
      incentivadorCultural: [false, Validators.compose([Validators.required])],
      regimeTributarioEspecial: [0, Validators.compose([Validators.required])],
      regimeTributario: [0, Validators.compose([Validators.required])],
      pessoa: this.fb.group({
        nomefantasia: ["", Validators.compose([Validators.required])],
        razaosocial: ["", Validators.compose([Validators.required])],
        cpfcnpj: ["", Validators.compose([Validators.required])],
      }),
    });

    const routeSubscription = this.activatedRoute.params.subscribe((params) => {
      const id = params.id;

      if (id) {
        this.isEdit = true;

        this.form.get("certificado")!.clearValidators();

        this.clientService.getById(id).subscribe((response) => {
          this.client = new Client().deserialize(response);

          this.certificadoName = this.client.certificado;

          this.form.patchValue({
            estado: this.client.estado,
            municipio: this.client.municipio,
            bairro: this.client.bairro,
            endereco: this.client.endereco,
            cep: this.client.cep,
            telefone: this.client.telefone,
            email: this.client.email,
            contato: this.client.contato,
            inscricaoEstadual: this.client.inscricaoEstadual,
            certificadoSenha: this.client.certificadoSenha,
            inscricaoMunicipal: this.client.inscricaoMunicipal,
            simplesNacional: this.client.simplesNacional,
            regimeTributario: this.client.regimeTributario,
            incentivoFiscal: this.client.incentivoFiscal,
            incentivadorCultural: this.client.incentivadorCultural,
            regimeTributarioEspecial: this.client.regimeTributarioEspecial,
            numero: this.client.numero,
            complemento: this.client.complemento,
            ddd: this.client.ddd,
          });

          this.form.get("pessoa")!.patchValue({
            id: this.client.pessoa.id,
            nomefantasia: this.client.pessoa.nomefantasia,
            razaosocial: this.client.pessoa.razaosocial,
            cpfcnpj: this.client.pessoa.cpfcnpj,
          });

          this.carregando = false;
        });
      } else {
        this.carregando = false;
      }
    });

    this.subscriptions.push(routeSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  onAlertClose() {
    this.hasFormErrors = false;
  }

  isFormValid(): boolean {
    return !this.form.invalid;
  }

  isControlHasError(
    controlName: string,
    validationType: string,
    hasSubGroup = false,
    nameSubGroup = ""
  ): boolean {
    let control;

    if (!hasSubGroup) {
      control = this.form.controls[controlName];

      if (!control) {
        return false;
      }
    } else {
      let subControl: any = this.form.controls[nameSubGroup];
      control = subControl.controls[controlName];
    }

    return (
      control.hasError(validationType) && (control.dirty || control.touched)
    );
  }

  submit() {
    const controls = this.form.controls;

    if (this.form.invalid) {
      Object.keys(controls).forEach((controlName) => {
        if (controls[controlName] instanceof FormGroup) {
          let subControl: any = controls[controlName];

          Object.keys(subControl.controls).forEach((controlControlName) =>
            subControl.controls[controlControlName].markAsTouched()
          );
        }

        controls[controlName].markAsTouched();
      });
      return;
    }

    if (
      this.form.get("certificado")!.value &&
      this.form.get("certificado")!.value.files[0].name.split(".").pop() !=
        "pfx"
    ) {
      this.hasFormErrors = true;
      this.msgFormError =
        "O arquivo do certificado tem que ser um arquivo .pfx";
      return;
    }

    this.hasFormErrors = false;
    this.carregando = true;

    let dados: Client = Object.assign({}, this.form.value);

    if (!this.isEdit) {
      dados.certificado = "";
    }

    dados.certificado = this.client.certificado;
    dados.id = this.client.id;
    dados.idPessoa = this.client.idPessoa;
    dados.pessoa.id = this.client.idPessoa;

    let formData: FormData = new FormData();
    formData.append("Client", JSON.stringify(dados));

    if (this.form.get("certificado")!.value) {
      formData.append(
        "Certificado",
        this.form.get("certificado")!.value.files[0],
        this.form.get("certificado")!.value.files[0].name
      );
    }

    if (!this.isEdit) {
      this.clientService.add(formData).subscribe(
        (_) => {
          this.carregando = false;

          this.layoutUtilsService.showActionNotification(
            `Empresa cadastrado com sucesso.`
          );

          // this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
          this.router.navigate(["../"], { relativeTo: this.activatedRoute });
        },
        (error) => {
          this.carregando = false;
          this.hasFormErrors = true;
          this.msgFormError = error;
        }
      );
    } else {
      this.clientService.edit(formData).subscribe(
        (_) => {
          this.carregando = false;

          this.layoutUtilsService.showActionNotification(
            `Empresa editado com sucesso.`
          );

          this.router.navigate(["../../"], { relativeTo: this.activatedRoute });
        },
        (error) => {
          this.carregando = false;
          this.hasFormErrors = true;
          this.msgFormError = error;
        }
      );
    }
  }

  getCepCorreios(): void {
    if (this.form.get("cep")!.value.length == 8) {
      this.localityService
        .getCorreios(this.form.get("cep")!.value)
        .subscribe((response) => {
          this.form.patchValue({
            estado: response.estado,
            municipio: response.cidade,
            bairro: response.bairro,
            endereco: response.logradouro,
          });
        });
    }
  }

  voltar(): void {
    if (!this.isEdit) {
      this.router.navigate(["../"], { relativeTo: this.activatedRoute });
      return;
    }

    this.router.navigate(["../../"], { relativeTo: this.activatedRoute });
  }
}
