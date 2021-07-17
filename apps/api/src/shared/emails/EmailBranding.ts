import EmailAddress from './EmailAddress';

type Data = {
  emailLayoutCompanyName: string;
  emailLayoutHelpEmail: string;
  footerCountry: string;
  footerCompanyName: string;
  footerCopyright: string;
  headerLogo: string;
  headerLogoAlt: string;
  sender: EmailAddress;
  senderName: string;
};

class EmailBranding {
  readonly footerCountry: string;
  readonly footerCompanyName: string;
  readonly footerCopyright: string;
  readonly headerLogo: string;
  readonly headerLogoAlt: string;
  readonly layoutCompanyName: string;
  readonly layoutHelpEmail: string;
  readonly sender: EmailAddress;
  readonly senderName: string;

  constructor(data: Data) {
    this.footerCountry = data.footerCountry;
    this.footerCompanyName = data.footerCompanyName;
    this.footerCopyright = data.footerCopyright;
    this.headerLogo = data.headerLogo;
    this.headerLogoAlt = data.headerLogoAlt;
    this.layoutCompanyName = data.emailLayoutCompanyName;
    this.layoutHelpEmail = data.emailLayoutHelpEmail;
    this.sender = data.sender;
    this.senderName = data.senderName;
  }

  static create(): EmailBranding {
    return new EmailBranding({
      emailLayoutCompanyName: 'OpenTour',
      emailLayoutHelpEmail: 'opentour@gmail.com',
      headerLogo: 'https://i.ibb.co/0D50y9p/opentour-logo-v1.png',
      headerLogoAlt: 'OpenTour',
      footerCountry: 'Córdoba',
      footerCompanyName: 'OpenTour',
      footerCopyright:
        'Copyright © 2021 OpenTour, Todos los derechos reservados.',
      sender: EmailAddress.fromString('noreply@opentour.com'),
      senderName: 'OpenTour',
    });
  }
}

export default EmailBranding;
