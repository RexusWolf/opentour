import Subject from './Subject';

export class Email {
  readonly recipients: string[];
  readonly sender: string;
  readonly senderName: string;
  readonly subject: Subject;
  readonly body: string;

  constructor(params: {
    recipients: string[];
    sender: string;
    senderName: string;
    subject: Subject;
    body: string;
  }) {
    this.recipients = params.recipients;
    this.sender = params.sender;
    this.senderName = params.senderName;
    this.subject = params.subject;
    this.body = params.body;
  }
}
