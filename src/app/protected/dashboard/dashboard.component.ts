import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../auth/services/auth.service";
import {VacunacionService} from "../../auth/services/vacunacion.service";
import {Product, Usuario, Vacuna} from "../../auth/interfaces/interface";
import {Table} from "primeng/table";
import {ProductService} from "../../auth/services/productservice";
import {ConfirmationService, MessageService} from "primeng/api";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
    `
      * {
        margin: 15px;
      }
      .contenedor{
        margin: 20px;
      }
      .p-input-icon-left,
      .p-input-icon-right {
        float: end;
      }
      span.p-input-icon-left input[type="text"]{
        padding: 12px 295px;
      }
      .botonLogout{
        float: end;
      }
    `
  ]
})
export class DashboardComponent implements OnInit{
  vacunaDialog!: boolean;
  products!: Product[];
  product!: Product;
  selectedProducts!: Product[];
  submitted!: boolean;


  get usuario(){
   // console.log(this.authService.usuario)
    return this.authService.usuario;
  }

  constructor( private router: Router,
               private authService: AuthService,
               private  vacunacionService: VacunacionService,
               private productService: ProductService,
               private messageService: MessageService,
               private confirmationService: ConfirmationService) { }

  vacuna!: Vacuna[];
  usuarioArray!: any[];
  vacunas!: any[];
  //vacunacionTable: any;

@ViewChild('vacunacionTable') vacunacionTable: Table | undefined;
@ViewChild('empleadoTable') empleadoTable: Table | undefined;
//@ViewChild('rol') rol: string | undefined;

ngOnInit() {
    this.vacunacion();
    this.usuarios();
    //this.applyFilterGlobal();
  this.productService.getProducts().then(data => this.products = data);
}



  deleteVacuna(id: string) {
    // this.vacunacionService.deleteVacunas(id).subscribe(
    //   resp => {
    //     console.log(resp);
    //   }
    // )
  }


  openNew() {
    this.product = {};
    this.submitted = false;
    this.vacunaDialog = true;
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.vacunacionTable!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  applyFilterGlobalEmpleado($event: any, stringVal: any) {
    this.empleadoTable!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  filtro($event: any, stringVal: any, macheo: any) {
    this.vacunacionTable!.filter(($event.target as HTMLInputElement).value, stringVal, macheo);
  }
  filtroEmpleado($event: any, stringVal: any, macheo: any) {
    this.empleadoTable!.filter(($event.target as HTMLInputElement).value, stringVal, macheo);
  }


  vacunacion(){
    this.vacunacionService.getVacunacion().subscribe(
      resp => {
        this.vacunas = resp.vacunas;
       // console.log('VACUNAS',resp.vacunas);
      }
    )
  }

  usuarios(){
    this.vacunacionService.getUsuario().subscribe(
      resp => {
        this.usuarioArray = resp.usuarios;
       // console.log('USUARIOS',resp);
      }
    )
  }

  logout(){
      this.router.navigateByUrl('/auth');
      this.authService.logout();
  }


  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.selectedProducts = [];
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
      }
    });
  }

  editProduct(product: Product) {
    // this.product = {...product};
    // this.vacunaDialog = true;
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter(val => val.id !== product.id);
        this.product = {};
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
      }
    });
  }

  hideDialog() {
    this.vacunaDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.name!.trim()) {
      if (this.product.id) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
      }
      else {
        this.product.id = this.createId();
        this.product.image = 'product-placeholder.svg';
        this.products.push(this.product);
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
      }

      this.products = [...this.products];
      this.vacunaDialog = false;
      this.product = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < 5; i++ ) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }




}
