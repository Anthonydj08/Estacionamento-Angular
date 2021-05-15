import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ShowcaseDialogComponent } from '../showcase-dialog/showcase-dialog.component';
import { Veiculo } from '../../../@core/model/veiculo';
import { EntradaSaidaEntradaComponent } from '../../entrada-saida/entrada-saida-entrada/entrada-saida-entrada.component';
import { DbService } from '../../../@core/services/db.service';

import * as cocoSSD from '@tensorflow-models/coco-ssd';
import { Router } from '@angular/router';
import { CommonService } from '../../../@core/services/common.service';


declare const leitura: any;

@Component({
  selector: 'ngx-camera-card',
  templateUrl: './camera-card.component.html',
  styleUrls: ['./camera-card.component.scss']
})
export class CameraCardComponent implements OnInit {

  private videoTensor: HTMLVideoElement;

  @ViewChild("video", { static: false })
  public video: ElementRef;

  @ViewChild("canvas", { static: false })
  public canvas: ElementRef;

  @ViewChild("placa", { static: false })
  public placa: ElementRef;
  public fotoBase64: any;
  public fotoConvertida: any;
  public result: any;
  public veiculo: any;
  public executado: boolean;
  public veiculos: Veiculo[];
  public req: any;
  public count: boolean = true;

  constructor(
    private dialogService: NbDialogService,
    public http: HttpClient,
    private dbService: DbService,
    private toastrService: NbToastrService,
    private _router: Router,
    private _commonService: CommonService,
  ) {
    this.executado = false;
  }

  open(mensagem) {
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        data: mensagem,
      },
    });
  }

  ngOnInit() {
    this.webcam_init();
    let self = this
    this.videoTensor.onloadeddata = function () {
      self.predictWithCocoModel();
    };
  }

  public capture() {
    this.fotoBase64 = this.canvas.nativeElement.toDataURL("image/png");
    this.fotoConvertida = this.fotoBase64.substring(this.fotoBase64.indexOf(",") + 1)
    leitura(this.fotoConvertida);

    setTimeout(() => {
      if (this.placa.nativeElement.textContent == "Placa não identificada") {
        this.open("Placa não identificada")
      } else {
        this.veiculo = JSON.parse(this.placa.nativeElement.textContent);
        this.verificarPlaca();
      }
      this.executado = false;
    }, 3000);
  }

  private async verificarPlaca() {
    if (this.veiculo.results.length != 0) {
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
    } else {
      this.showToast("Placa não identificada", "warning");
      console.log("ALPR não achou a placa");
      this._commonService.callCommonMethod();
    }

  }

  private async irParaEntrada(veiculo) {
    console.log(document)
    this.executado = false
    this.dialogService.open(EntradaSaidaEntradaComponent, {
      context: {
        data: veiculo,
      },
    });
  }

  showToast(mensagem, status) {
    this.toastrService.show(
      status || "Success",
      mensagem,
      { status });
  }

  public async predictWithCocoModel() {
    const model = await cocoSSD.load();
    if (this.executado == false) {
      this.detectFrame(this.videoTensor, model);
      console.log('model loaded');
    }
  }

  webcam_init() {
    this.videoTensor = <HTMLVideoElement>document.getElementById("vid");

    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          facingMode: "environment",
        }
      })
      .then(stream => {
        this.videoTensor.srcObject = stream;
        this.videoTensor.onloadedmetadata = () => {
          this.videoTensor.play();
        };
      });
  }
  detectFrame = (videoTensor, model) => {
    setTimeout(() => {
      model.detect(videoTensor).then(predictions => {
        this.renderPredictions(predictions);
        this.req = requestAnimationFrame(() => {
          this.detectFrame(videoTensor, model);
          console.log(videoTensor, predictions);
        });
        if (this.executado == false && predictions.length != 0 && predictions[0].class == "car") {
          setTimeout(() => {
            cancelAnimationFrame(this.req);
            if (this.count == true) {
              console.log("É um carro");
              this.capture();
              this.count = false;
            }
          }, 2000);
        }
      });
    }, 250);
  }

  renderPredictions = predictions => {
    const canvas = <HTMLCanvasElement>document.getElementById("canvas");

    const ctx = canvas.getContext("2d");

    canvas.width = 540;
    canvas.height = 480;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // Font options.
    const font = "16px sans-serif";
    ctx.font = font;
    ctx.textBaseline = "top";
    ctx.drawImage(this.videoTensor, 0, 0, 540, 480);

    predictions.forEach(prediction => {
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      const width = prediction.bbox[2];
      const height = prediction.bbox[3];
      // Draw the bounding box.
      ctx.strokeStyle = "#00FFFF";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);
      // Draw the label background.
      ctx.fillStyle = "#00FFFF";
      const textWidth = ctx.measureText(prediction.class).width;
      const textHeight = parseInt(font, 10); // base 10
      ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
    });

    predictions.forEach(prediction => {
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      // Draw the text last to ensure it's on top.
      ctx.fillStyle = "#000000";
      ctx.fillText(prediction.class, x, y);
    });
  };
}
