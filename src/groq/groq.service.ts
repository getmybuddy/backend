import { BadGatewayException, Injectable } from '@nestjs/common';
import { ChatGroq } from '@langchain/groq';

import { SharedService } from '../shared/shared.service';

@Injectable()
export class GroqService {
  private chatGroq: ChatGroq;

  constructor(private readonly sharedService: SharedService) {
    this.chatGroq = new ChatGroq({
      model: 'llama-3.1-8b-instant',
      temperature: 0,
      maxRetries: 2,
    });
  }

  // This method is using the Groq API directly without the Langchain SDK
  // private async generate(prompt: string) {
  //   const url = this.sharedService.groqApiBaseUrl;
  //   const method = 'POST';
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${this.sharedService.groqApiKey}`,
  //   };

  //   try {
  //     const res = await fetch(url, {
  //       method,
  //       headers,
  //       body: JSON.stringify({
  //         model: 'llama-3.1-8b-instant',
  //         messages: [{ role: 'user', content: prompt }],
  //         stream: false,
  //         temperature: 1,
  //       }),
  //     });

  //     const result = await res.json();
  //     return result.choices[0].message.content;
  //   } catch (error) {
  //     console.error(error);
  //     throw new BadGatewayException(error);
  //   }
  // }

  async handleMessage(message: string): Promise<any> {
    try {
      const resultFromLangchain = await this.chatGroq.invoke([
        [
          'system',
          'You are a helpful assistant that translates English to Indonesia. Translate the user sentence.',
        ],
        ['human', message],
      ]);
      return resultFromLangchain.content;

      // const resultDirectFromGroq = await this.generate(message);
      // return resultDirectFromGroq;
    } catch (error) {
      console.error(error);
      throw new BadGatewayException(error);
    }
  }
}
