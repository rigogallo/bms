export class User {
    constructor(
        public uid: string = "",
        public email: string = "",
        public password: string = "",
        public name: string = "",
        public isAdmin: boolean = false,
        public emailVerified: boolean = false,
        public displayName: string = "",
        public photoURL: string = "",  
    ) {}
}

export type Roles = 'SUSCRIPTOR' | 'EDITOR' | 'ADMIN';

export interface UserI {
  uid: string;
  email: string;
  displayName?: string;
  emailVerified: boolean;
  isAdmin?: boolean;
  password?: string;
  photoURL?: string;
  role?: Roles;
}

