
import { FarmaciasServiceService } from '../farmacias-service.service';
import {Component, ElementRef, OnInit, ViewChild, Input} from '@angular/core';

import {HttpResponse} from "@angular/common/http";

//import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";

@Component({
  selector: 'app-farmacias',
  templateUrl: './farmacias.component.html',
  styleUrls: ['./farmacias.component.css']
})
export class FarmaciasComponent implements OnInit {
  @Input() public nodes: any;
  
  // @ts-ignore
  @ViewChild('optionButton') optionButton: ElementRef;

  // @ts-ignore
  @ViewChild('txtoBusqueda') txtoBusqueda: ElementRef;
  public busqueda: any;
  constructor(private farmaciaService:FarmaciasServiceService) { }
  listaComunasByRegion: Comuna[] = [];
  listaFarmaciasPorComuna: Farmacia[] = [];
  listaFarmaciasTexto: Farmacia[] = [];
  comunaSeleccionada: boolean = false;
  mostrarBusquedaPorCombo: boolean = false;
  mostrarBusquedaPorTexto: boolean = false;
  mostrarResultadoCombo: boolean = false;
  mostrarResultadoTexto: boolean = false;
  mostrarError: boolean = false;
  mostrarNoHayRegistros: boolean = false;
  mostrarPanelPrincipal: boolean = false;
  farmaciaSeleccionada: Farmacia = null;
  valorTexto: any;
  regionSeleccionada: string = '';
  error: string = '';
  codigoComunaSeleccionada: string = '';
  nombreFarmacia: string = '';
  filtroTipoDeBusqueda: string = '';
  ngOnInit() {
  }
  filterComunasByRegion(value: any) {
    this.error = '';
    this.mostrarNoHayRegistros = false;
    this.mostrarError = false;
    this.mostrarResultadoCombo = false;
    this.mostrarResultadoTexto = false;
    this.mostrarBusquedaPorCombo = false;
    this.mostrarBusquedaPorTexto = false;
    this.listaComunasByRegion = [];
    this.listaFarmaciasPorComuna = [];
    this.comunaSeleccionada = false;
    this.regionSeleccionada = value;
    this.nombreFarmacia = '';
    this.codigoComunaSeleccionada = '';

    console.log(value);
    if (value != 0){
      this.farmaciaService.getComunasByIdRegion(value).subscribe((data: HttpResponse<any>) => {
        console.log(data);
        console.log('data.body');
        console.log(data.body);
        var listaComunas = data.body.body;
        if (data.body.codigo === "0"){
          for(let comuna of listaComunas){
            this.listaComunasByRegion.push(comuna);
            
          }
          if (this.listaComunasByRegion.length == 0){
            console.log('this.mostrarNoHayRegistros 3')
            this.mostrarNoHayRegistros = true;
          }
        }else{
          this.error = data.body.mensaje;
          this.mostrarError = true;
      }
        

          });

    }
  }
  
  filterFarmaciasByComuna(value: any) {
    this.mostrarNoHayRegistros = false;
    this.error = '';
    this.mostrarError = false;
    this.mostrarResultadoCombo = false;
    this.mostrarResultadoTexto = false;
  this.comunaSeleccionada = true;
  this.codigoComunaSeleccionada = value;
  this.listaFarmaciasPorComuna = [];
  console.log('filterFarmaciasByComuna');
    console.log('value');
    console.log(value);
    console.log('this.regionSeleccionada');
    console.log(this.regionSeleccionada);
    if (value != 0){
      this.farmaciaService.getFarmaciasByComuna(this.regionSeleccionada, this.codigoComunaSeleccionada, '', this.filtroTipoDeBusqueda).subscribe((data: HttpResponse<any>) => {
        console.log(data);
        console.log('data.body');
        console.log(data.body);
        var listaFarmacias = data.body.body;

        if (data.body.codigo === "0"){
          for(let farmacia of listaFarmacias){
            this.listaFarmaciasPorComuna.push(farmacia);
/*             console.log('comuna')
            console.log(farmacia) */
          }
          if (this.mostrarBusquedaPorCombo === true){
            if (this.listaFarmaciasPorComuna.length == 0){
              console.log('this.mostrarNoHayRegistros 1')
              this.mostrarNoHayRegistros = true;
            }
          }
          
          
        }else{
            this.error = data.body.mensaje;
            this.mostrarError = true;
        }
        

          });
    }
  }
  selectFarmacia(value: any){
    this.mostrarNoHayRegistros = false;
    this.error = '';
    this.mostrarError = false;
    this.farmaciaSeleccionada = null;
    this.mostrarResultadoCombo = true;
    this.mostrarResultadoTexto = false;
    console.log('selectFarmacia');
    console.log('value');
    console.log(value);

    for(let farmacia of this.listaFarmaciasPorComuna){
      if (farmacia.localId === value){
        this.farmaciaSeleccionada = farmacia;
        
        console.log(farmacia);
        break;
      }

    }
    
  }
  optionSelection(value: number) {
    this.mostrarNoHayRegistros = false;
    this.error = '';
    this.mostrarError = false;
    this.mostrarResultadoCombo = false;
    this.mostrarResultadoTexto = false;
    console.log('optionSelection value');
    console.log(value);
    if (value == 1){
      this.mostrarBusquedaPorCombo = true;
      this.mostrarBusquedaPorTexto = false;
      if (this.listaFarmaciasPorComuna.length == 0){
        console.log('this.mostrarNoHayRegistros 1')
        this.mostrarNoHayRegistros = true;
      }
    }else{
     
      this.mostrarBusquedaPorCombo = false;
      this.mostrarBusquedaPorTexto = true;
      console.log('mostrarBusquedaPorTexto');
      console.log(this.mostrarBusquedaPorTexto);
    }
  
  }
  
  optionSelectionFiltro(value: any) {
    console.log('optionSelectionFiltro');
    console.log('value');
    console.log(value);
    console.log('this.mostrarPanelPrincipal');
    console.log(this.mostrarPanelPrincipal);
    this.mostrarNoHayRegistros = false;
    this.error = '';
    this.mostrarError = false;
    this.mostrarResultadoCombo = false;
    this.mostrarResultadoTexto = false;
    this.filtroTipoDeBusqueda = value;
    this.mostrarPanelPrincipal = true;
    console.log('################3');
    console.log('this.mostrarPanelPrincipal');
    console.log(this.mostrarPanelPrincipal);
    if (this.regionSeleccionada !== '' && this.comunaSeleccionada === true && this.mostrarBusquedaPorCombo === true){
      this.listaFarmaciasPorComuna = [];
      this.farmaciaService.getFarmaciasByComuna(this.regionSeleccionada, this.codigoComunaSeleccionada, '', this.filtroTipoDeBusqueda).subscribe((data: HttpResponse<any>) => {
        console.log(data);
        console.log('data.body');
        console.log(data.body);
        var listaFarmacias = data.body.body;

        if (data.body.codigo === "0"){
          for(let farmacia of listaFarmacias){
            this.listaFarmaciasPorComuna.push(farmacia);
/*             console.log('comuna')
            console.log(farmacia) */
          }
          if (this.mostrarBusquedaPorCombo === true){
            if (this.listaFarmaciasPorComuna.length == 0){
              console.log('this.mostrarNoHayRegistros 1')
              this.mostrarNoHayRegistros = true;
            }
          }
          
        }else{
            this.error = data.body.mensaje;
            this.mostrarError = true;
        }
        

          });
    }
  
  }
  buscar(){
    this.mostrarNoHayRegistros = false;
    this.error = '';
    this.mostrarError = false;
    this.listaFarmaciasTexto =  [];
    this.mostrarResultadoTexto = true;
    console.log('this.busqueda');
    console.log(this.busqueda);
    console.log('this.regionSeleccionada');
    console.log(this.regionSeleccionada);
    console.log('this.comunaSeleccionada');
    console.log(this.comunaSeleccionada);
    this.farmaciaService.getFarmaciasByComuna(this.regionSeleccionada, this.codigoComunaSeleccionada, this.busqueda, this.filtroTipoDeBusqueda).subscribe((data: HttpResponse<any>) => {
      console.log(data);
      console.log('data.body');
      console.log(data.body);
      if (data.body.codigo === "0"){
        var listaFarmacias = data.body.body;
        console.log('listaFarmacias');
        console.log(listaFarmacias);
        for(let farmacia of listaFarmacias){
          this.listaFarmaciasTexto.push(farmacia);
  
        }
        if (this.listaFarmaciasTexto.length == 0){
          console.log('this.mostrarNoHayRegistros 2')
          this.mostrarNoHayRegistros = true;
          this.mostrarResultadoTexto = false;
        }
      }else{
        this.error = data.body.mensaje;
        this.mostrarError = true;
      }
      

        });
    
  }
}
class Comuna {
  idComuna: number;
  nombre: string;

}
class Farmacia{
  comunaNombre: string;
  fecha: string;
  fkComuna: string;
  fkRegion: string;
  funcionamientoDia: string;
  funcionamientoHoraApertura: string;
  funcionamientoHoraCierre: string;
  localDireccion: string;
  localId: string;
  localLat: string;
  localLng: string;
  localNombre: string;
  localTelefono: string;
  localidadNombre: string;
}