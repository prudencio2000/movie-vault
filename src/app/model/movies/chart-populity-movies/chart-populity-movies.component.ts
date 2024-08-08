import { AfterViewInit, Component, Input } from '@angular/core';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-chart-populity-movies',
  templateUrl: './chart-populity-movies.component.html',
})
export class ChartPopulityMoviesComponent implements AfterViewInit {
  /**
   * Etiquetas para el eje X de la gráfica. Se espera que contenga los nombres de las películas.
   * @Input('chartLabels') 
   */
  @Input('chartLabels') chartLabels: string[] = [];

  /**
   * Datos de popularidad para el eje Y de la gráfica. Se espera que contenga números que representan la popularidad de las películas.
   * @Input('popularityData') 
   */
  @Input('popularityData') popularityData: number[] = [];

  /**
   * Constructor del componente.
   */
  constructor() { }

  /**
   * Método del ciclo de vida del componente que se ejecuta después de que la vista ha sido inicializada.
   * Aquí se crea la gráfica.
   */
  ngAfterViewInit(): void {
    this.createChart();
  }

  /**
   * Crea la gráfica utilizando Chart.js.
   * Configura la gráfica de tipo 'bar' con las etiquetas y datos proporcionados.
   */
  createChart(): void {
    const ctx = (document.getElementById('movieChart') as HTMLCanvasElement).getContext('2d');

    if (ctx) {
    
      new Chart(ctx, {
        type: 'bar',  
        data: {
          labels: this.chartLabels,  
          datasets: [
            {
              label: 'Popularidad',  
              data: this.popularityData,  
              backgroundColor: 'rgba(75, 192, 192, 0.2)',  
              borderColor: 'rgba(75, 192, 192, 1)', 
              borderWidth: 1,  
              yAxisID: 'y-axis-popularity' 
            }
          ]
        },
        options: {
          responsive: true, 
          plugins: {
            legend: {
              position: 'top',  
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  
                  return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                }
              }
            }
          },
          scales: {
            x: {
              beginAtZero: true,  
              title: {
                display: true,  
                text: 'Películas' 
              }
            },
            'y-axis-popularity': {
              type: 'linear',  
              position: 'left',  
              beginAtZero: true,  
              title: {
                display: true,  
                text: 'Popularidad' 
              }
            }
          }
        }
      });
    }
  }
}
