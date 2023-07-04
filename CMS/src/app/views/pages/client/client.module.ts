import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { PartialsModule } from "../../partials/partials.module";
import { ClientComponent } from "./client.component";
import { SharedModule } from "../../../shared/shared.module";
import { ListComponent } from "./list/list.component";
import { EditComponent } from "./edit/edit.component";
import { ClientService } from "./services/client.service";
import { UserService } from "src/app/services/user.service";

const routes: Routes = [
  {
    path: "",
    component: ClientComponent,
    data: { breadcrumb: "Empresas" },
    children: [
      {
        path: "",
        redirectTo: "list",
        pathMatch: "full",
      },
      {
        path: "list",
        component: ListComponent,
        data: { breadcrumb: "Lista" },
      },
      {
        path: "add",
        component: EditComponent,
        data: { breadcrumb: "Cadastrar" },
      },
      {
        path: "edit/:id",
        component: EditComponent,
        data: { breadcrumb: "Editar" },
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PartialsModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [ClientService, UserService],
  entryComponents: [],
  declarations: [ClientComponent, ListComponent, EditComponent],
})
export class ClientModule {}
