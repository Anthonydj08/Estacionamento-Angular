import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { takeWhile, delay } from 'rxjs/operators';
import { LayoutService } from '../../../@core/utils';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-vagas-card',
  templateUrl: './vagas-card.component.html',
  styleUrls: ['./vagas-card.component.scss']
})
export class VagasCardComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
  }

  ngAfterViewInit() {
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
              { value: 114, name: 'Disponíveis' },
              { value: 36, name: 'Ocupadas' },
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
            labelLine: {
              normal: {
                show: false
              }
            },
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
