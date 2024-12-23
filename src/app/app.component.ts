import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GeminiComponent } from "./components/gemini/gemini.component";
import { MatTabsModule } from '@angular/material/tabs'
import { GoogleGenerativeAiService } from './services/google-generative-ai.service';
import { AnswersComponent } from "./components/answers/answers.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    GeminiComponent,
    MatTabsModule,
    AnswersComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    GoogleGenerativeAiService
  ]
})
export class AppComponent {
  title = 'gemini-app';

}
