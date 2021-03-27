import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { takeWhile, delay } from 'rxjs/operators';
import { LayoutService } from '../../../@core/utils';
import { NbThemeService } from '@nebular/theme';
import { DbService } from '../../../@core/services/db.service';
import { numVagas } from '../../../@core/model/numVagas';
import { EntradaESaida } from '../../../@core/model/entradaESaida';

@Component({
  selector: 'ngx-vagas-card',
  templateUrl: './vagas-card.component.html',
  styleUrls: ['./vagas-card.component.scss']
})
export class VagasCardComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  numVagas: numVagas[];
  entradaESaidas: EntradaESaida[];

  disponiveis: any;
  ocupadas: any;

  constructor(private theme: NbThemeService, private dbService: DbService, ) {
  }

  private async load() {
    await this.dbService.listWithUIDs<numVagas>('/numVagas')
      .then(numVagas => {
        this.numVagas = numVagas;
        console.log(numVagas);
      }).catch(error => {
        console.log(error);
      });

    await this.dbService.listWithUIDs<EntradaESaida>('/entradaesaida')
      .then(entradaESaidas => {
        this.entradaESaidas = entradaESaidas;
      }).catch(error => {
        console.log(error);
      });
  }

  private async atualizar() {
    await this.load()
      .then(num => {
        
        this.ocupadas = 0
        console.log(this.entradaESaidas);
        for (let i = 0; i < this.entradaESaidas.length; i++) {
          if (!this.entradaESaidas[i].saida) {
            this.ocupadas++
          }
        }
        this.disponiveis = parseInt(this.numVagas[0].vagas) - this.ocupadas
      })
  }

  async ngAfterViewInit() {
    await this.atualizar()
      .then(num => {

        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

          const colors = config.variables;
          const echarts: any = config.variables.echarts;

          this.options = {
            backgroundColor: echarts.bg,
            color: [colors.successLight, colors.dangerLight],
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)',
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: ['Disponíveis', 'Ocupadas'],
              textStyle: {
                color: echarts.textColor,
              },
            },
            series: [
              {
                name: 'Vagas',
                type: 'pie',
                radius: ['50%', '70%'],
                center: ['50%', '50%'],
                data: [
                  { value: this.disponiveis, name: 'Disponíveis' },
                  { value: this.ocupadas, name: 'Ocupadas' },
                ],
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: echarts.itemHoverShadowColor,
                  },
                },
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '25',
                      fontWeight: 'bold'
                    }
                  }
                },
              },
            ],
          };
        });
      })
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
