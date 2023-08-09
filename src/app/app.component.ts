import { Component } from '@angular/core';
import { CopilotService } from './modules/copilot/services/copilot.service';
import { take } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'day2-chat-prototype';
  result: any = '';

  formControl = new FormControl('', [ Validators.required ]);

  constructor(
    private copilotService: CopilotService,
  ) {}

  async onPromptKeyPress(event: any) {
    if (event?.key === 'Enter') {
      const prompt = String(this.formControl.value);
      console.log(prompt);
      const { result } = await this.sendPrompt(prompt);
      console.log(result);
      this.formControl.setValue('');
      this.formControl.setErrors(null);

      this.result = JSON.stringify(result);
      // this.socketService.emitPrompt(prompt);
    }
  }

  private sendPrompt(prompt: string): Promise<any> {
    return this.copilotService.sendPrompt(prompt).pipe(take(1)).toPromise();
  }
}
