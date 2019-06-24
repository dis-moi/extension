import { SubmissionError } from 'redux-form';

export default (e: Error) => new SubmissionError({ _error: e.message });
