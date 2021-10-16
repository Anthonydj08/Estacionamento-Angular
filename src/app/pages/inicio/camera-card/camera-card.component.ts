import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ShowcaseDialogComponent } from '../showcase-dialog/showcase-dialog.component';
import { Veiculo } from '../../../@core/model/veiculo';
import { EntradaSaidaEntradaComponent } from '../../entrada-saida/entrada-saida-entrada/entrada-saida-entrada.component';
import { DbService } from '../../../@core/services/db.service';

import * as cocoSSD from '@tensorflow-models/coco-ssd';
import { CommonService } from '../../../@core/services/common.service';
import { numVagas } from '../../../@core/model/numVagas';
import { EntradaESaida } from '../../../@core/model/entradaESaida';


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
  public foto: any;
  public fotoConvertida: any;
  public result: any;
  public veiculo: any;
  public req: any;
  public count: boolean = true;
  hasVagas: boolean;

  constructor(
    private dialogService: NbDialogService,
    public http: HttpClient,
    private dbService: DbService,
    private toastrService: NbToastrService,
    private _commonService: CommonService,
  ) { }

  ngOnInit() {
    this.webcam_init();
    let self = this;
    this.videoTensor.onloadeddata = function () {
      self.predictWithCocoModel();
    };
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

  public async predictWithCocoModel() {
    const model = await cocoSSD.load();
    this.detectFrame(this.videoTensor, model);
    console.log('model loaded');
  }

  detectFrame = (videoTensor, model) => {
    setTimeout(() => {
      model.detect(videoTensor).then(predictions => {
        this.renderPredictions(predictions);
        this.req = requestAnimationFrame(() => {
          this.detectFrame(videoTensor, model);
        });
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

    this.verificaVeiculo(predictions);
  };

  //verifica se existe um carro
  verificaVeiculo(predictions) {
    if (predictions.length != 0 && predictions[0].class == "car") {
      setTimeout(() => {
        cancelAnimationFrame(this.req);
        this.verificaLotacao().then(() => {
          if (this.count == true && this.hasVagas) {
            this.capture();
            this.count = false;
          }

          if (!this.hasVagas) {
            this.toastrService.warning("Não há vagas disponíveis", "Estacionamento lotado", { preventDuplicates: true });
          }
        });

      }, 2000);
    }

  }
  async verificaLotacao() {
    var vagasTotais = 0;
    var ocupadas = 0;

    await this.dbService.listWithUIDs<numVagas>('/numVagas').then(numVagas => {
      vagasTotais = parseInt(numVagas[0].vagas);
    }).catch(error => {
      console.log(error);
    });

    await this.dbService.listWithUIDs<EntradaESaida>('/entradaesaida').then(entradaESaidas => {
      for (let i = 0; i < entradaESaidas.length; i++) {
        if (!entradaESaidas[i].saida) {
          ocupadas++;
        }
      }
    }).then(() => {
      var vagasDisponiveis = vagasTotais - ocupadas;
      if (vagasDisponiveis > 0) {
        this.hasVagas = true;
      } else {
        this.hasVagas = false;
      }
    }).catch(error => {
      console.log(error);
    });
  }

  public capture() {
    this.foto = this.canvas.nativeElement.toDataURL("image/png");
    this.fotoConvertida = this.foto.substring(this.foto.indexOf(",") + 1)
    // leitura(this.fotoConvertida);
    this.leituras(this.fotoConvertida).then((res) => {

      if (this.placa.nativeElement.textContent == "Placa não identificada") {
        this.dialogCadastrarVeiculo("Placa não identificada")
      } else {
        this.veiculo = JSON.parse(this.placa.nativeElement.textContent);
        this.verificarPlaca();
      }
    });
  }

  async leituras(foto64) {
    var secret_key = "sk_fde22bcc8fe54ef476718757";
    var url = "https://api.openalpr.com/v2/recognize_bytes?recognize_vehicle=1&country=br&secret_key=" + secret_key;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    // Send POST data and display response
    xhr.send(foto64); // Replace with base64 string of an actual image
    let promise = new Promise(resolve => {
      xhr.onreadystatechange = function () {
        console.log(xhr, xhr.readyState);
        if (xhr.readyState == 4) {
          resolve(document.getElementById("response").innerHTML = xhr.responseText);
        } else {
          document.getElementById("response").innerHTML = "Placa não identificada";
        }
      }
    });
    let result: any = await promise;
    return result
  }

  dialogCadastrarVeiculo(mensagem) {
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        data: mensagem,
      },
    });
  }

  private async verificarPlaca() {
    if (this.veiculo.results.length != 0) {
      await this.dbService.search<Veiculo>('/veiculo', 'placa', this.veiculo.results[0].plate)
        .then(veiculos => {
          if (!veiculos[0]) {
            this.dialogCadastrarVeiculo(this.veiculo.results[0])
          } else {
            this.showToast("Veículo encontrado!", "", "success");
            this.irParaEntrada(veiculos[0]);
          }
        }).catch(error => {
          console.log(error);
        });
    } else {
      this.showToast("Placa não identificada", "", "warning");
      this._commonService.callCommonMethod();
    }
  }

  private async irParaEntrada(veiculo) {
    this.dialogService.open(EntradaSaidaEntradaComponent, {
      context: {
        data: veiculo,
      },
    });
  }

  showToast(mensagem, descricao, status) {
    this.toastrService.show(
      descricao,
      mensagem,
      { status });
  }
}