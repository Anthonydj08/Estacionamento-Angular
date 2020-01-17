import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ShowcaseDialogComponent } from '../showcase-dialog/showcase-dialog.component';
import { Veiculo } from '../../../@core/model/veiculo';
import { EntradaSaidaEntradaComponent } from '../../entrada-saida/entrada-saida-entrada/entrada-saida-entrada.component';
import { DbService } from '../../../@core/services/db.service';
declare const leitura: any;

@Component({
  selector: 'ngx-camera-card',
  templateUrl: './camera-card.component.html',
  styleUrls: ['./camera-card.component.scss']
})
export class CameraCardComponent implements OnInit {

  @ViewChild("video", { static: false })
  public video: ElementRef;

  @ViewChild("canvas", { static: false })
  public canvas: ElementRef;

  @ViewChild("placa", { static: false })
  public placa: ElementRef;

  public captures: Array<any>;
  public fotoBase64: any;
  public fotoConvertida: any;

  public result: any;
  public veiculo: any

  public veiculos: Veiculo[];


  constructor(private dialogService: NbDialogService, public http: HttpClient, private dbService: DbService, private toastrService: NbToastrService,) {
    this.captures = [];
  }

  open(mensagem) {
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        data: mensagem,
      },
    });
  }


  ngOnInit() {
  }

  public ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
      });
    }
  }

  public capture() {
    var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 540, 480);
    this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
    this.fotoBase64 = this.canvas.nativeElement.toDataURL("image/png");
    this.fotoConvertida = this.fotoBase64.substring(this.fotoBase64.indexOf(",") + 1)
    leitura(this.fotoConvertida);

    setTimeout(() => {
      if (this.placa.nativeElement.textContent == "Placa não identificada") {
        this.open("Placa não identificada")
      } else {
        this.result = this.placa.nativeElement.textContent
        this.veiculo = JSON.parse(this.result);
        this.verificarPlaca();
      }

    }, 3000);
  }

  private async verificarPlaca() {
    await this.dbService.search<Veiculo>('/veiculo', 'placa', this.veiculo.results[0].plate)
      .then(veiculos => {
        this.veiculos = veiculos;
         if (veiculos.length == 0) {
          this.open(this.veiculo.results[0])
          console.log("não achou ir para tela de cadastrar veiculo");
        } else {
          console.log("achou IR PARA TELA DE REGISTRAR ENTRADA VEICULO");
          this.showToast("Veículo encontrado!", "success");
          this.irParaEntrada(veiculos[0]);
        }
      }).catch(error => {
        console.log(error);
      });
  }

  private async irParaEntrada(veiculo) {
    this.dialogService.open(EntradaSaidaEntradaComponent,{
      context: {
        data: veiculo,
      },
    })
  }

  showToast(mensagem, status) {
    this.toastrService.show(
      status || "Success",
      mensagem,
      { status  });
  }

}
