import { SubmitHandler } from 'redux-form';
import { FormMeta } from '../../actions';

type OnSubmit<FormData> = (payload: FormData, meta: FormMeta) => void;
type HandleFormSubmitArgs<FormData, P> = {
  handleSubmit: SubmitHandler<FormData, P, string>;
  form: string;
};

const handleFormSubmit = <FormData, P>({
  handleSubmit,
  form
}: HandleFormSubmitArgs<FormData, P>) => (onSubmit: OnSubmit<FormData>) =>
  handleSubmit(
    payload =>
      new Promise((resolve, reject) =>
        onSubmit(payload, { form, resolve, reject })
      )
  );

export default handleFormSubmit;
