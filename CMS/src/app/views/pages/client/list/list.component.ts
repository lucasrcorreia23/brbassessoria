import { Client } from "./../models/client.model";
import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { debounceTime, distinctUntilChanged, tap } from "rxjs/operators";
import { fromEvent, merge, Subscription } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { QueryParamsModel } from "../../../../models/query-params.model";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { ClientService } from "../services/client.service";

@Component({
  selector: "kt-client-list",
  templateUrl: "./list.component.html",
})
export class ListComponent implements OnInit, OnDestroy {
  pageSize = 10;

  dataSource = new MatTableDataSource<Client>();
  displayedColumns = [
    "id",
    "nomefantasia",
    "razaosocial",
    "cpfcnpj",
    "actions",
  ];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild("sort1", { static: true }) sort!: MatSort;
  @ViewChild("searchInput", { static: true }) searchInput!: ElementRef;

  result: Client[] = [];

  private subscriptions: Subscription[] = [];

  carregando = true;

  constructor(
    private clientService: ClientService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const sortSubscription = this.sort.sortChange.subscribe(
      () => (this.paginator.pageIndex = 0)
    );
    this.subscriptions.push(sortSubscription);

    const paginatorSubscriptions = merge(
      this.sort.sortChange,
      this.paginator.page
    )
      .pipe(
        tap(() => {
          this.loadList();
        })
      )
      .subscribe();
    this.subscriptions.push(paginatorSubscriptions);

    // Filtration, bind to searchInput
    const searchSubscription = fromEvent(
      this.searchInput.nativeElement,
      "keyup"
    )
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadList();
        })
      )
      .subscribe();
    this.subscriptions.push(searchSubscription);

    this.sort.initialized.subscribe(() => {
      this.loadList();
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((el) => el.unsubscribe());
  }

  loadList() {
    this.carregando = true;
    this.dataSource = new MatTableDataSource<Client>();

    const queryParams = new QueryParamsModel(
      this.searchInput.nativeElement.value,
      this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize || this.pageSize
    );

    this.clientService.get(queryParams).subscribe((response) => {
      this.result = response.items;

      this.dataSource = new MatTableDataSource<Client>(this.result);

      this.paginator.length = parseInt(response.count);

      this.carregando = false;
    });
  }

  add() {
    this.router.navigate(["../add"], { relativeTo: this.activatedRoute });
  }

  edit(id: string) {
    this.router.navigate(["../edit", id], { relativeTo: this.activatedRoute });
  }

  users(id: string) {
    this.router.navigate(["../users", id], { relativeTo: this.activatedRoute });
  }

  excel() {
    const queryParams = new QueryParamsModel(
      this.searchInput.nativeElement.value
    );

    this.clientService.excel(queryParams).subscribe((event) => {
      const a = document.createElement("a");
      a.setAttribute("style", "display:none;");
      document.body.appendChild(a);
      a.download = "empresas.xlsx";
      a.href = URL.createObjectURL(event);
      a.target = "_blank";
      a.click();
      document.body.removeChild(a);
    });
  }
}
