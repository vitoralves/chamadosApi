import { Component, OnInit } from '@angular/core';

import { AppComponent } from '../../app.component';
import { EmpresasService } from './empresas.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

declare var swal: any;

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  empresas: any;

  public rows:Array<any> = [];
  public columns:Array<any> = [
    {title: 'ID', name: 'id', filtering: {filterString: '', placeholder: 'Filtrar por id'}},
    {title: 'Nome', name: 'nome', filtering: {filterString: '', placeholder: 'Filtrar por Nome'}},
    {title: 'Telefone', name: 'telefone', filtering: {filterString: '', placeholder: 'Filtrar por Telefone'}},
    {title: 'Celular', name: 'celular', filtering: {filterString: '', placeholder: 'Filtrar por Celular'}},
    {title: 'Email', name: 'email', filtering: {filterString: '', placeholder: 'Filtrar por Email'}},
    {title: 'Endereço', name: 'endereco', filtering: {filterString: '', placeholder: 'Filtrar por Endereço'}},
  ];

  public page:number = 1;
  public itemsPerPage:number = 10;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;

  public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };

  private data:Array<any>;

  constructor(private rootComp: AppComponent, private service: EmpresasService, private rota: Router) {
    this.rootComp.cssClass = 'hold-transition skin-blue-light sidebar-mini';
  }

  ngOnInit() {
    this.iniciarTabela();
  }

  public iniciarTabela(){
    this.service.retornaTodasEmpresas().then(data => {
      this.data = data.data;
      this.length = data.data.length;
      this.onChangeTable(this.config);
    });
  }

  novo() {
    this.rota.navigate(['/pages/empresas/novo']);
  }

  public changePage(page:any, data:Array<any> = this.data):Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data:any, config:any):any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data:any, config:any):any {
    let filteredData:Array<any> = data;
    this.columns.forEach((column:any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item:any) => {
          if (item[column.name] === null){
            var array = [
              {
                "0": 0,
                "index": 0,
                "input": ""
              }
            ];
            return array;
          }else{
            return item[column.name].toString().match(column.filtering.filterString);
          }
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item:any) =>
      item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray:Array<any> = [];
    filteredData.forEach((item:any) => {
      let flag = false;
      this.columns.forEach((column:any) => {
        if(item[column.name] === null){
          flag = false;
        }else if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  public onCellClick(data: any) {
    this.rota.navigate(['pages/empresas/', data.row.id]);
  }

  public mostraAlert(): Promise<any>{
    return swal({
      title: 'Você tem certeza?',
      text: "Essa ação não poderá ser desfeita!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, apagar!',
      cancelButtonText: 'Cancelar'
    }).then(function() {
      return true;
    }, function (dismiss) {
      return false;
    })
  }

  public deletar(data: any){
    this.mostraAlert().then(retorno => {
      if (retorno) {
        this.apagarItem(data.row.id);
      }
    })
  }

  public apagarItem(id: number){
    this.service.apagarItem(id).then(result => {
      if (result.status === 'success'){
        swal(
          'Apagado!',
          'O item de código '+id+' foi apagado!',
          'success'
        )
        this.iniciarTabela();
      }else{
        swal(
          'Erro!',
          'Ocorreu um erro ao apagar o registro: <b>'+result.message+'</b>',
          'error'
        )
      }
    })
  }

}
