import { SubmitHandler } from 'redux-form';
import { FormMeta } from '../../actions';
export default ({
  handleSubmit,
  form
}: {
  // @ts-ignore
  handleSubmit: SubmitHandler<any, any, string>; // eslint-disable-line
  form: string;
  // @ts-ignore
}) => (onSubmit: (payload: any, meta: FormMeta) => void) =>
  handleSubmit(
    // @ts-ignore
    (payload: any) =>
      new Promise((resolve, reject) =>
        onSubmit(payload, { form, resolve, reject })
      )
  );
