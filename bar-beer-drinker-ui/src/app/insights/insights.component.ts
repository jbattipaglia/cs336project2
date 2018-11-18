import { Component, OnInit } from '@angular/core';
import { BarsService } from '../bars.service';
declare const Highcharts: any;

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.css']
})
export class InsightsComponent implements OnInit {

  constructor(private barService: BarsService) {
    this.barService.getFrequentCounts().subscribe(
      data => {
        console.log(data);

        const bars = [];
        const counts = [];

        data.forEach(bar => {
          bars.push(bar.bar);
          counts.push(bar.FrequentCount);
        });

        this.renderChart(bars, counts);
      }
    );
  }

  ngOnInit() {
  }

  renderChart(bars: string[], counts: number[]) {
    Highcharts.chart('bargraph', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Frequenting count at bars'
      },
      xAxis: {
        categories: bars,
        crosshair: true,
        title: { 
          text: 'Bar'
        }
      },
      yAxis: {
        min: 0,
        title : {
          text: 'Number of customers'
        },
        labels: {
          overflow: 'justify'
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      legend: {
        enabled: false
      },
      credits: { 
        enabled: false
      },
      series: [{
        data: counts
      }]
    });
  }

  

}
