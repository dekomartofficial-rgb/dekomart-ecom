import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [ ChartModule],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {
  data: any;
  options: any;
  basicData: any;
  basicOptions: any;
  doughnutData: any;
  doughnutOptions: any;
  

  constructor() {
    // Line Chart Data
    this.data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [
        {
          label: 'Sales',
          data: [30, 50, 80, 60, 100],
          borderColor: '#42A5F5',
          fill: false,
          tension: 0.4
        },
        {
          label: 'Revenue',
          data: [20, 40, 70, 50, 90],
          borderColor: '#FFA726',
          fill: false,
          tension: 0.4
        }
      ]
    };

    this.options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top'
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Months'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Value'
          },
          ticks: {
            stepSize: 20, 
            min: 0,       
            max: 100      
          }
        }
      }
    };

    // Bar Chart Data
    this.basicData = {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Sales',
          data: [540, 325, 702, 620],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
          borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
          borderWidth: 1
        }
      ]
    };

    this.basicOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top'
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Quarters'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Sales'
          },
          ticks: {
            beginAtZero: true
          }
        }
      }
    };

    // Doughnut Chart Data
    this.doughnutData = {
      labels: ['Electronics', 'Clothing', 'Grocery', 'Books'],
      datasets: [
        {
          data: [300, 500, 100, 200],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
        }
      ]
    };

    this.doughnutOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top'
        }
      }
    };
  } 
}
