import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ComparisonService } from "app/tsp-opt/services/comparison.service";

@Component({
  selector: 'app-compare-results-page',
  templateUrl: './compare-results-page.component.html',
  styleUrls: ['./compare-results-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CompareResultsPageComponent implements OnInit {

  @ViewChild('chartTime') private chartTime;
  @ViewChild('costChart') private costChart;

  // Charts
  routeCostdata: any;
  searchTime: any;

  options = {
    title: {
      display: true,
      fontSize: 16,
    },
    legend: {
      display: false,
      position: 'bottom',
    }
  };

  // Table
  cols = [
    { field: 'name', header: 'Algorithm' },
    { field: 'searchTime', header: 'Search Time' },
    { field: 'cost', header: 'Cost' },
    { field: 'order', header: 'Order' }
  ];

  resultsArray = [];

  constructor(private comparisonService: ComparisonService) {
    this.routeCostdata = {
      labels: [],
      datasets: [
        {
          label: '',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: []
        },
      ]
    };

    this.searchTime = {
      labels: [],
      datasets: [
        {
          label: '',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: []
        },
      ]
    };
  }

  ngOnInit() {
    const results = this.comparisonService.getAllResults();

    results.forEach((value, key) => {
      this.routeCostdata.labels.push(key);
      this.searchTime.labels.push(key);
    });

    results.forEach((value, key) => {
      this.resultsArray.push(value);
      this.routeCostdata.datasets[0].data.push(value.cost);
      this.searchTime.datasets[0].data.push(value.searchTime);
    });

    // this.chartTime.refresh();
    // this.costChart.refresh();
  }

  ngOnDestroy(){
    this.comparisonService.clear();
  }
}
