import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Client } from "../client/models/client.model";
import { ClientService } from "../client/services/client.service";

@Component({
  selector: "kt-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  currentTab = 3;

  clients: Client[] = [];

  constructor(
    private clientService: ClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getDashboard();
  }

  setCurrentTab(tab: number) {
    this.currentTab = tab;
    this.getDashboard();
  }

  getDashboard() {
    this.clientService.getDashboard(this.currentTab).subscribe((resp) => {
      this.clients = resp;
    });
  }

  edit(id: number) {
    this.router.navigate(["../client/edit", id], {
      relativeTo: this.activatedRoute,
    });
  }
}
