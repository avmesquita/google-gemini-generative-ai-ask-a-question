import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GoogleGenerativeAiService } from '../../services/google-generative-ai.service';

@Component({
  selector: 'app-gemini',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,    
    MatCardModule,
    MatButtonModule,
    MatIconModule
],
  templateUrl: './gemini.component.html',
  styleUrl: './gemini.component.scss'
})
export class GeminiComponent {
  question: string = '';
  asking: string = '';
  answer: string = '';
  
  constructor(private readonly ai: GoogleGenerativeAiService) {    
  }

  ask() {
    this.asking = this.question;
    if (this.asking && this.asking.length > 0) {
      this.ai.ask(this.asking).then
      (
        (data: any) => {
          this.answer = data;
          this.ai.historic.push({
            answer: this.answer,
            question: this.question,
            instant: new Date().toDateString()
          });    
          this.ai.storeHistoric();      
        },
        (reason: any) => {
          this.answer = reason;
        }
      );  
    }

    
  }

}
