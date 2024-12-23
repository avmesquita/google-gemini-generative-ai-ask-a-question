import { Component, OnInit } from '@angular/core';
import { GoogleGenerativeAiService } from '../../services/google-generative-ai.service';
import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { IHistoric } from '../../interfaces/ihistoric.interface';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-answers',
  standalone: true,
  imports: [
    NgFor,
    DatePipe,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './answers.component.html',
  styleUrl: './answers.component.scss'
})
export class AnswersComponent implements OnInit {    

  private history: BehaviorSubject<IHistoric[]> = new BehaviorSubject<IHistoric[]>([]);
  public history$ = this.history.asObservable();

  constructor(private readonly ai: GoogleGenerativeAiService) {
  }

  ngOnInit(): void {
    this.ai.loadHistoric();
    this.history.next(this.ai.historic);
  }

  clear() {
    this.ai.clearHistoric();
    this.history.next([]);
  }

}
