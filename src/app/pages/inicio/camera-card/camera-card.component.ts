import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ShowcaseDialogComponent } from '../showcase-dialog/showcase-dialog.component';
import { Veiculo } from '../../../@core/model/veiculo';
import { EntradaSaidaEntradaComponent } from '../../entrada-saida/entrada-saida-entrada/entrada-saida-entrada.component';
import { DbService } from '../../../@core/services/db.service';

import * as cocoSSD from '@tensorflow-models/coco-ssd';


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

  public captures: Array<any>;
  public fotoBase64: any;
  public fotoConvertida: any;
  public result: any;
  public veiculo: any;
  public executado: boolean;
  public veiculos: Veiculo[];


  constructor(private dialogService: NbDialogService, public http: HttpClient, private dbService: DbService, private toastrService: NbToastrService) {
    this.captures = [];
    this.executado = false
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

  // public ngAfterViewInit() {
  //   if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  //     navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
  //       this.video.nativeElement.srcObject = stream;
  //       this.video.nativeElement.play();
  //     });
  //   }
  // }


  public capture() {
    //var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 540, 480);
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
    }

  }

  private async irParaEntrada(veiculo) {
    this.executado = false
    this.dialogService.open(EntradaSaidaEntradaComponent, {
      context: {
        data: veiculo,
      },
    })
  }

  showToast(mensagem, status) {
    this.toastrService.show(
      status || "Success",
      mensagem,
      { status });
  }


  public async predictWithCocoModel() {
    const model = await cocoSSD.load();
    this.detectFrame(this.videoTensor, model);
    console.log('model loaded');
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
    model.detect(videoTensor).then(predictions => {
      this.renderPredictions(predictions);
      requestAnimationFrame(() => {
        this.detectFrame(videoTensor, model);
      });
    });
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


      if (prediction.class == "car" && this.executado == false) {
        console.log("é um carro");
        this.executado = true
        setTimeout(() => {
          this.capture();
        }, 2000);
      }


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
