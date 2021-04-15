import { FieldState } from 'redux-form';

export default interface FormMeta {
  [name: string]: FieldState & { [name: string]: FieldState };
}
