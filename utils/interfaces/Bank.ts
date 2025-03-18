export interface Bank {
    name: string;
    slug: string;
    code: string;
    longCode?: string;
    gateway?: string;
    payWithBank?: boolean;
    supportsTransfer: boolean;
    active: boolean;
    isDeleted?: boolean;
    country: string;
    currency: string;
    type?: string;
    id?: number;
    createdAt?: string;
    updatedAt?: string;
  }
  