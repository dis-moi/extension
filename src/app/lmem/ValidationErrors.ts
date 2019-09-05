export default interface ValidationErrors {
  [key: string]: string | ValidationErrors | undefined;
}
