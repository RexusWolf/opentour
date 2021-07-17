import { Email } from './Email';
import EmailAddress from './EmailAddress';
import EmailBranding from './EmailBranding';
import Subject from './Subject';
import getMessage from './templates/CompetitionWasStarted/getMessage';
import getSubject from './templates/CompetitionWasStarted/getSubject';
import fillLayout from './templates/layout';

type Data = {
  recipientsEmails: EmailAddress[];
};

export class CompetitionWasStartedEmail implements Email {
  private emailBranding = EmailBranding.create();
  readonly sender: string;
  readonly senderName: string;
  readonly recipients: string[];
  readonly subject: Subject;
  readonly body: string;

  constructor(data: Data) {
    this.recipients = data.recipientsEmails.map((recipient) => recipient.value);
    this.sender = this.emailBranding.sender.value;
    this.senderName = this.emailBranding.senderName;
    this.subject = getSubject();
    this.body = this.compileBody();
  }

  private compileBody(): string {
    const body = fillLayout(this.emailBranding, getMessage());
    return body;
  }
}
