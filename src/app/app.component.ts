import { Component, OnInit} from '@angular/core';
import { Output } from './output';
import { AlphaMineralsService } from './service';
import {Chart, ChartConfiguration,LegendElement,CategoryScale, LineController,BarElement , LineElement, PointElement, LinearScale, Title, BarController, Legend} from 'node_modules/chart.js';
import { Production } from './production';
import { Time } from '@angular/common';
import { EMPTY, isEmpty } from 'rxjs';


Chart.register(LineController ,BarController,BarElement ,CategoryScale, LineElement, PointElement, LinearScale, Title);
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
  public products:Production[];
  public pr:Production=new Production();
  
  constructor(private service:AlphaMineralsService){}
  ngOnInit(): void {
    this.pr.date="2021-03-01";
    this.getEffeciency();
  }

  public getEffeciency(){
    this.service.getEffeciency(this.pr.date).subscribe(
      (response:Output) =>{
        this.output=response;
      },
      error =>{
        console.log("exception occured")
      }
    )
    this.getproducts();
    
    this.getproductsNC();
  }
  public getproducts(){
    this.service.getProducts(this.pr.date).subscribe(
      (response:Production[]) =>{
        this.products=response;
        this.efficiency=[];
        this.heures=[];
        for (let i = 0; i< response.length; i++) {
          this.efficiency.push((response[i].id-response[0].id+1)*100/900);
         this.heures.push(response[i].heure);
        }
      if (this.chart!=null) {
        
        this.chart.destroy();
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
          options:{
            scales: {
              x: {
                  display: true
              },
              y: {
                  display: true
              }
          }
          }
     
      });
        
        console.log(this.heures)
      },
      error =>{
        console.log("exception occured")
      }
    )
  }
  public getproductsNC(){
    this.service.getProductsNC(this.pr.date).subscribe(
      (response:Production[]) =>{
        this.ppm=[];
          this.heures2=[]
        for (let i = 0; i< response.length; i++) {
          this.ppm.push((response[i].id-response[0].id+1)*1000000/900);
         this.heures2.push(response[i].heure);
        }
        if (this.chart2!=null) {
          
          this.chart2.destroy();
        }
        this.chart2=new Chart("myAreaChart2", {
          type: 'bar',
          data: {
              datasets: [{
                  label: 'Current Vallue',
                  data: this.ppm,
                  backgroundColor: "rgb(115 185 243 / 65%)",
                  borderColor: "#e70800",
                  
              },
              
             ],
              labels: this.heures2
          },
          options:{
            scales: {
              x: {
                  display: true
              },
              y: {
                  display: true
              }
          }
          }
          
      });
        
        console.log(this.heures2)
      },
      error =>{
        console.log("exception occured")
      }
    )
  }
  
}
