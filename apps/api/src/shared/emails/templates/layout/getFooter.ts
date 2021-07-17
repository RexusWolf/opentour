import EmailBranding from '../../EmailBranding';

export default function (emailBranding: EmailBranding) {
  return `<td>
    <br>
    <font style="font-family:Arial, Helvetica, sans-serif; font-size:10px;color:#e6e6e5">
      <b style="font-size: 11px; font-weight: normal; color:#e6e6e5">
        <p> ${emailBranding.footerCopyright} </p>
        <p> ${emailBranding.footerCompanyName} </p>
        <p> ${emailBranding.footerCountry} </p>
      </b>
    </font>
  </td>`;
}
