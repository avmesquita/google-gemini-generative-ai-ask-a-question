import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { environment } from '../../environments/environment.development';
import { ToastrService } from 'ngx-toastr';
import { IHistoric } from '../interfaces/ihistoric.interface';

@Injectable({
  providedIn: 'root'
})
export class GoogleGenerativeAiService {

  protected readonly genAI = new GoogleGenerativeAI(environment.apikey);
  protected model: any;

  protected readonly special = '. por favor, resultados em portugues e formatadamente adequado em html. Exiba fontes da informação.';

  versions = [
    { name: 'Gemini 1.5 Flash', model: "gemini-1.5-flash"},
    { name: 'Gemini 1.5 Flash 8B', model: "gemini-1.5-flash-8b"},    
    { name: 'Gemini 1.5 Pro', model: "gemini-1.5-pro"},  
    { name: 'Gemini 2.0 Flash', model: "gemini-2.0-flash-exp"}    
  ]

  public historic: IHistoric[] = [];

  constructor(private toastr: ToastrService) {
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });    
    this.loadHistoric();
  }

  async ask(question: string) {    
    try {
      this.toastr.info('Thinking...','Google Generative AI', {
        progressAnimation: 'increasing',
        progressBar: true,
        closeButton: true,
        timeOut: 8000,
        disableTimeOut: false
      });
      const result = await this.model.generateContent(question + ' ' + this.special);
      this.toastr.success('Showing results.','Google Generative AI',{disableTimeOut: false, timeOut: 5000});      
      return result.response.text();
    } catch (error: any) {
      this.toastr.success(error.message ?? error,'Google Generative AI');
      return 'Ops!';
    }
  }

  public storeHistoric() {
    localStorage.setItem('historic', JSON.stringify(this.historic));
  }

  public loadHistoric() {
    const _historic = localStorage.getItem('historic');
    if (_historic) {
      const historic = JSON.parse(_historic);
      if (historic.length > 0) {
        this.historic = historic;
      }
    }      
  }

  public clearHistoric() {
    this.historic = [];
    this.storeHistoric();
  }


}
