import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { DbService } from '../../../@core/services/db.service';
import { Veiculo } from '../../../@core/model/veiculo';
import { Router } from '@angular/router';
import { VeiculoInsertComponent } from '../../veiculo/veiculo-insert/veiculo-insert.component';

@Component({
  selector: 'ngx-showcase-dialog',
  templateUrl: './showcase-dialog.component.html',
  styleUrls: ['./showcase-dialog.component.scss']
})
export class ShowcaseDialogComponent implements OnInit {

  @Input() data: any;
  public veiculo: Veiculo;
  public veiculos: Veiculo[];


  constructor(protected ref: NbDialogRef<ShowcaseDialogComponent>,private dialogService: NbDialogService,) { }

  async ngOnInit() {
    
  }

  dismiss() {
    this.ref.close();
  }

  cadastrar() {
    this.irParaCadastro();
    console.log("ir para tela de cadastrar veiculo passando placa");
  }

  private async irParaCadastro() {
    this.dialogService.open(VeiculoInsertComponent,{
      context: {
        data: this.data,
      },
    })
  }
  
}
