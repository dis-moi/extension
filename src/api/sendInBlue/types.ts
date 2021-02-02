export interface PersonEmail {
  name?: string;
  email: string;
}
export interface Sender extends PersonEmail {}
export interface Recipient extends PersonEmail {}

export interface UrlAttachment {
  name?: string;
  url: string;
}
export interface Base64Attachment {
  name: string;
  content: string;
}
export type Attachment = UrlAttachment | Base64Attachment;

export interface TransactionEmail {
  sender?: Sender; // Mandatory if 'templateId' is not passed. Pass name (optional) and email of sender from which emails will be sent. For example, {'name':'Mary from MyShop', 'email':'no-reply@myshop.com'}
  to: Recipient[]; // List of email addresses and names (optional) of the recipients. For example, [{'name':'Jimmy', 'email':'jimmy98@example.com'}, {'name':'Joe', 'email':'joe@example.com'}]
  bcc?: Recipient[]; // List of email addresses and names (optional) of the recipients in bcc
  cc?: Recipient[]; // List of email addresses and names (optional) of the recipients in cc
  htmlContent?: string; // HTML body of the message ( Mandatory if 'templateId' is not passed, ignored if 'templateId' is passed )
  textContent?: string; // Plain Text body of the message ( Ignored if 'templateId' is passed )
  subject?: string; // Subject of the message. Mandatory if 'templateId' is not passed
  replyTo?: Sender; // Email (required), along with name (optional), on which transactional mail recipients will be able to reply back. For example, {'email':'ann6533@example.com', 'name':'Ann'}.
  attachment?: Attachment[]; // Pass the absolute URL (no local file) or the base64 content of the attachment along with the attachment name (Mandatory if attachment content is passed). For example, [{"url":"https://attachment.domain.com/myAttachmentFromUrl.jpg", "name":"My attachment 1"}, {"content":"base64 exmaple content", "name":"My attachment 2"}]. Allowed extensions for attachment file: xlsx, xls, ods, docx, docm, doc, csv, pdf, txt, gif, jpg, jpeg, png, tif, tiff, rtf, bmp, cgm, css, shtml, html, htm, zip, xml, ppt, pptx, tar, ez, ics, mobi, msg, pub, eps, odt, mp3, m4a, m4v, wma, ogg, flac, wav, aif, aifc, aiff, mp4, mov, avi, mkv, mpeg, mpg and wmv ( If 'templateId' is passed and is in New Template Language format then only attachment url is accepted. If template is in Old template Language format, then 'attachment' is ignored )
  headers?: { [key: string]: string }; // Pass the set of headers that shall be sent along the mail headers in the original email. 'sender.ip' header can be set (only for dedicated ip users) to mention the IP to be used for sending transactional emails. For example, {'Content-Type':'text/html', 'charset':'iso-8859-1', 'sender.ip':'1.2.3.4'}
  templateId?: number; // int64 Id of the template
  params?: {}; // Pass the set of attributes to customize the template. For example, {'FNAME':'Joe', 'LNAME':'Doe'}. It's considered only if template is in New Template Language format.
  tags?: string[]; // Tag your emails to find them more ea
}
