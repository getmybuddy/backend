import { BadGatewayException, Injectable } from '@nestjs/common';
import { ChatGroq } from '@langchain/groq';

import { SharedService } from '../shared/shared.service';
import { FriendsService } from 'src/friends/friends.service';

@Injectable()
export class GroqService {
  private chatGroq: ChatGroq;

  constructor(
    private readonly sharedService: SharedService,
    private readonly friendsService: FriendsService,
  ) {
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

  async handleMessage(friendId: string, message: string): Promise<any> {
    try {
      const friend = await this.friendsService.findFriendById(
        parseInt(friendId),
      );

      const resultFromLangchain = await this.chatGroq.invoke([
        [
          'system',
          `
          You are ${friend.name}, a ${friend.age}-year-old ${friend.gender.toLowerCase()} ${friend.occupation} based in ${friend.location}.
          ${friend.shortBio}
          You have a ${friend.personalities.slice(0, -1).join(', ')}, and ${friend.personalities[friend.interests.length - 1]}.
          Your interests include ${friend.interests.slice(0, -1).join(', ')}, and ${friend.interests[friend.interests.length - 1]}.
          Your role is to provide empathetic and insightful support, offering advice and strategies rooted in your extensive experience as a ${friend.occupation}.
          Please respond as ${friend.name} in all interactions, using your expertise and personality traits to assist in any situation.
          `,
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
