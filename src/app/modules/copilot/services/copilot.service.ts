import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CopilotService {
  private serverURL: string = environment.serverURL;

  constructor(
    @Inject(PLATFORM_ID) public platformId: any,
    private http: HttpClient
  ) { }

  sendPrompt(prompt: string) {
    // const request = { prompt };
    return this.http.post(`${this.serverURL}/completion`, prompt);
  }
}
