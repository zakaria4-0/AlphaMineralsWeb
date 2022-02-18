import { Component, OnInit} from '@angular/core';
import { Output } from './output';
import { AlphaMineralsService } from './service';
import {Chart, ChartConfiguration,CategoryScale, LineController, LineElement, PointElement, LinearScale, Title} from 'node_modules/chart.js';
import { Production } from './production';
import { Time } from '@angular/common';
Chart.register(LineController,CategoryScale, LineElement, PointElement, LinearScale, Title);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public output:Output=new Output();
  public efficiency:number[]=[];
  public ppm:number[]=[];
  public heures:Time[]=[];
  public heures2:Time[]=[];
  public chart:Chart;
  public chart2:Chart;
  
  constructor(private service:AlphaMineralsService){}
  ngOnInit(): void {
    this.getproducts();
    this.getEffeciency();
    this.getproductsNC();
  }

  public getEffeciency(){
    this.service.getEffeciency().subscribe(
      (response:Output) =>{
        this.output=response;
        
        console.log(this.output)
      },
      error =>{
        console.log("exception occured")
      }
    )
  }
  public getproducts(){
    this.service.getProducts().subscribe(
      (response:Production[]) =>{
        for (let i = 0; i< response.length; i++) {
          this.efficiency.push(response[i].id*100/900);
         this.heures.push(response[i].heure);
        }
        this.chart=new Chart("myAreaChart", {
          type: 'line',
          data: {
              datasets: [{
                  label: 'Current Vallue',
                  data: this.efficiency,
                  backgroundColor: "rgb(115 185 243 / 65%)",
                  borderColor: "#00e741",
                  fill: true,
              },
             ],
              labels: this.heures
          },
      });
        
        console.log(this.heures)
      },
      error =>{
        console.log("exception occured")
      }
    )
  }
  public getproductsNC(){
    this.service.getProductsNC().subscribe(
      (response:Production[]) =>{
        for (let i = 0; i< response.length; i++) {
          this.ppm.push(response[i].id*1000000/900);
         this.heures2.push(response[i].heure);
        }
        this.chart2=new Chart("myAreaChart2", {
          type: 'line',
          data: {
              datasets: [{
                  label: 'Current Vallue',
                  data: this.ppm,
                  backgroundColor: "rgb(115 185 243 / 65%)",
                  borderColor: "#e70800",
                  fill: true,
              },
             ],
              labels: this.heures2
          },
      });
        
        console.log(this.heures2)
      },
      error =>{
        console.log("exception occured")
      }
    )
  }
  
}
