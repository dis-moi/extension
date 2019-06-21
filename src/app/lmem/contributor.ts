export interface OtherContributor {
  id: number;
  name: string;
  image?: string;
}

export interface NewContributor {
  name: string;
  email: string;
}

export type Contributor = NewContributor | OtherContributor;
