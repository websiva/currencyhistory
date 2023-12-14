import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
 /* currentYear: number;
  currentMonth: number;
  currentDate: number;*/

  ApiId:string="d4099a83e27c496c983f74d6b4ab987e";
  constructor(private http: HttpClient) {
    /*this.currentYear = new Date().getFullYear();
    this.currentMonth = new Date().getMonth() + 1;
    this.currentDate = new Date().getDate();*/
  }

  getHistory(endDate:string):Observable<any>{
    return this.http.get<any>("https://openexchangerates.org/api/historical/" +endDate+".json?app_id="+this.ApiId);
  }

  private calculateStartDate(endDate: string, days: number): string {
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - days);
  
    return startDate.toISOString().split('T')[0];
  }
}
