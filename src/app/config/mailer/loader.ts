import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

type MailerConfig = {
  mailer: MailerOptions;
};

export const loadMailerConfig = (): MailerConfig => ({
  mailer: {
    transport: {
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: process.env.MAIL_SECURE === 'true',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    },
    defaults: {
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_EMAIL}>`,
    },
    template: {
      dir: `${process.cwd()}/${process.env.MAIL_TEMPLATE_DIR}`,
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  },
});
