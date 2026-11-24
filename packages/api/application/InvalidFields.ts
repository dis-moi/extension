import { Schema } from 'effect';

// The answer a form must be able to display, as opposed to a breakdown. It
// belongs to no one port in particular: a notice, a contributor, a domain
// and an account are all submitted through a form, and all come back this
// way when a rule refuses them.
export class InvalidFields extends Schema.TaggedError<InvalidFields>()(
  'InvalidFields',
  { reasons: Schema.Array(Schema.String) },
) {}
