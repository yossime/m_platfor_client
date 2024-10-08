

export interface Store {
    id: string;
    name: string;
    ownerId?: string;
    stripeAccountId?: string;
    chargesEnabled?: boolean;
    payoutsEnabled?: boolean;
    status: 'pending' | 'active' | 'suspended';
  }
  