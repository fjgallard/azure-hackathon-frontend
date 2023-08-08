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

  constructor(private copilotService: CopilotService) {}

  async onPromptKeyPress(event: any) {
    if (event?.key === 'Enter') {
      console.log(this.formControl.value);
      this.formControl.setValue('');
      this.formControl.setErrors(null);

      const { result } = await this.sendPrompt(String(this.formControl.value));
      console.log(result);
      this.result = result;
    }
  }

  private sendPrompt(prompt: string): Promise<any> {
    return this.copilotService.sendPrompt(prompt).pipe(take(1)).toPromise();
  }
}
