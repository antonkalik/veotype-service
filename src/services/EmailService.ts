import process from 'process';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import { generateAttachments } from 'src/helpers/generateAttachments';
import { generateTemplate } from 'src/helpers/generateTemplate';
import { getHost } from 'src/helpers/getHost';
import { Service, ServiceResponse } from 'src/services/Service';

dotenv.config();

export class EmailService {
  private static transporter: nodemailer.Transporter;
  private static env = {
    USER: process.env.MAIL_USER,
    PASS: process.env.MAIL_PASSWORD,
  };

  public static initialize() {
    try {
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: this.env.USER,
          pass: this.env.PASS,
        },
      });
    } catch (error) {
      console.error('Error initializing email service');
      throw error;
    }
  }

  public static async sendPasswordResetEmail(
    email: string,
    token: string
  ): Promise<ServiceResponse<{ messageId: string }>> {
    try {
      const host = getHost();
      const template = generateTemplate<{
        token: string;
        host: string;
      }>('passwordResetTemplate', { token, host });
      const attachments = generateAttachments([{ name: 'email_logo' }]);
      const info = await this.transporter.sendMail({
        from: this.env.USER,
        to: email,
        subject: 'Password Reset',
        html: template,
        attachments,
      });

      return Service.success<{ messageId: string }>(info);
    } catch (error) {
      return Service.error(error.message, 500);
    }
  }
}
