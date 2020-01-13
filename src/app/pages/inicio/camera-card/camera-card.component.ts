import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NbDialogService } from '@nebular/theme';
import { ShowcaseDialogComponent } from '../showcase-dialog/showcase-dialog.component';
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
  public veiculo:any


  constructor(private dialogService: NbDialogService, public http: HttpClient) {
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

        this.open(this.veiculo.results[0])
      }
      //console.log(leitura(this.fotoConvertida));

    }, 3000);
}

}
