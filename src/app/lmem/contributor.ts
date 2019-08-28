interface Avatar {
  small: Picture;
  normal: Picture;
  large: Picture;
}
interface Picture {
  url: string;
}

export interface Contributor {
  id: number;
  name: string;
  avatar?: Avatar;
  intro?: string;
  contributions: number;
}
