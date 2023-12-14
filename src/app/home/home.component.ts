import { Component } from '@angular/core';
import { HistoryService } from '../history.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  currentYear: number;
  currentMonth: number;
  currentDate: number;
  currentDay: string = '';
  HistoryOfCurrency: any;
  formattedValue: string[] = [];
  formattedDate: string[] = [];
  formatTableDate:string[]=[];
  selectedCurrency: string;
  tableDate:string='';
  tableVisible:boolean=false;
  charLen:number;

  constructor(private History: HistoryService) {

    this.currentYear = new Date().getFullYear();
    this.currentMonth = new Date().getMonth() + 1;
    this.currentDate = new Date().getDate();
    this.charLen=0;
    this.selectedCurrency='';
    this.GetCurrencyStatus();
    this.tableVisible=false;
  }

  currencies = [
    { code: 'AED', name: 'United Arab Emirates Dirham' },
    { code: 'AFN', name: 'Afghanistan' },
    {code:'INR',name:'Indian Rupee'},
    {code:'IDR',name:'Indonesia'},
    {code:'JPY',name:'Japan'},
    {code:'AUD',name:'Australia'},
    {code:'CNY',name:'China'},
    {code:'LKR',name:'Srilanka'}
  ]

  async GetCurrencyStatus() {
    this.reset();
    this.charLength();
    for (let i = 0; i <= 15; i++) {
      this.currentDay = this.currentYear + "-" + this.currentMonth + "-" + this.formatDay(this.currentDate);
      this.tableDate = this.formatDay(this.currentDate)+ "-" + this.currentMonth+"-"+this.currentYear ;
      try {
        const res = await this.History.getHistory(this.currentDay).toPromise();
        this.HistoryOfCurrency = res.rates[this.selectedCurrency];
        this.formattedValue.push(this.HistoryOfCurrency);
        this.formattedDate.push(this.currentDay);
        this.formatTableDate.push(this.tableDate);
      }
      catch (error) {
        console.log("error")
      }

      if (this.currentDate == 1) {
        this.currentDate = 30;
        if (this.currentMonth == 1) {
          this.currentYear = this.currentYear - 1;
        }
        else {
          this.currentMonth = this.currentMonth - 1;
        }
      }
      else {
        this.currentDate = this.currentDate - 1;
      }
    }
  }

  formatDay(day: number): string {
    return day < 10 ? '0' + day : day.toString();
  }

  public reset(){
    this.formattedValue=[];
    this.formattedDate=[];
    this.currentYear = new Date().getFullYear();
    this.currentMonth = new Date().getMonth() + 1;
    this.currentDate = new Date().getDate();
    this.tableVisible=true;
  }

  public charLength(){
    this.charLen=this.selectedCurrency.length;
  }

}

