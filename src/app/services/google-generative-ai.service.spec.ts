import { TestBed } from '@angular/core/testing';

import { GoogleGenerativeAiService } from './google-generative-ai.service';

describe('GoogleGenerativeAiService', () => {
  let service: GoogleGenerativeAiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleGenerativeAiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
