import { Context, type Effect } from 'effect';
import type { FilterName } from '../domain/Thumbnail';
import type { ImageField } from '../domain/UploadedImage';

export interface ServedImage {
  readonly bytes: Uint8Array;
  readonly contentType: string;
}

export class Images extends Context.Service<
  Images,
  {
    original(
      field: ImageField,
      fileName: string,
    ): Effect.Effect<ServedImage | null>;

    thumbnail(
      filter: FilterName,
      field: ImageField,
      fileName: string,
    ): Effect.Effect<ServedImage | null>;
  }
>()('api/application/Images') {}
