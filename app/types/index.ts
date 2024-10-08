export interface UserData {
    uid: string;
    email: string;
    stripeAccountId?: string;
    chargesEnabled?: boolean;
    payoutsEnabled?: boolean;
    plan?:string;
    isNew?:boolean;
  }
