import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailtrapService } from './mailtrap.service';

@Module({
  exports: [MailtrapService],
  providers: [MailtrapService],
  imports: [
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: 'smtp.mailtrap.io',
          port: 2525,
          auth: {
            user: 'ef84fd226df86c',
            pass: 'ac906db1a30297',
          },
        },
      }),
    }),
  ],
})
export class MailtrapModule {}
