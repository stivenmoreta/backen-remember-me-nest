import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailtrapService {
  constructor(private mailService: MailerService) {}

  async send(data): Promise<void> {
    await this.mailService.sendMail(data);
  }
}
