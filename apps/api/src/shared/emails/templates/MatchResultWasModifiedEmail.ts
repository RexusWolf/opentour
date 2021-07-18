import { Email } from '../Email';
import EmailAddress from '../EmailAddress';
import EmailBranding from '../EmailBranding';
import Subject from '../Subject';
import fillLayout from './layout';
import getMessage from './MatchResultWasModified/getMessage';
import getSubject from './MatchResultWasModified/getSubject';

type Data = {
  recipientsEmails: EmailAddress[];
  competitionUrl: string;
};

export class MatchResultWasModifiedEmail implements Email {
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
    this.body = this.compileBody(data.competitionUrl);
  }

  private compileBody(competitionUrl: string): string {
    const body = fillLayout(this.emailBranding, getMessage(competitionUrl));
    return body;
  }
}
