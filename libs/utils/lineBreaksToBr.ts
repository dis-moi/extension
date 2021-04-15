export default (text: string) => text.replace(/(?:\r\n|\r|\n)/g, '<br />');
