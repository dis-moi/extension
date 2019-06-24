import { SubmitHandler } from 'redux-form';
import { FormMeta } from '../../actions';

export default ({
  handleSubmit,
  form
}: {
  handleSubmit: SubmitHandler<any, any, string>;
  form: string;
}) => (onSubmit: (payload: any, meta: FormMeta) => void) =>
  handleSubmit(
    (payload: any) =>
      new Promise((resolve, reject) =>
        onSubmit(payload, { form, resolve, reject })
      )
  );
