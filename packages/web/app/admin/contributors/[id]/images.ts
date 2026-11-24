import type { EditableContributor } from '@dismoi/api/application/Supervision';
import type { ContributorImageField } from '@dismoi/api/domain/UploadedImage';

// Shared between the form and the action: the name of the field is their
// only meeting point, and separating them would make the upload fail in
// silence.
export interface ImageSlot {
  readonly name: string;
  readonly field: ContributorImageField;
  readonly label: string;
  readonly current: (contributor: EditableContributor) => string | null;
}

export const IMAGE_SLOTS: ReadonlyArray<ImageSlot> = [
  {
    name: 'avatar',
    field: 'imageFile',
    label: 'Avatar',
    current: (contributor) => contributor.avatar,
  },
  {
    name: 'banner',
    field: 'bannerImageFile',
    label: 'Bannière',
    current: (contributor) => contributor.banner,
  },
  {
    name: 'preview',
    field: 'previewImageFile',
    label: 'Aperçu',
    current: (contributor) => contributor.preview,
  },
];
