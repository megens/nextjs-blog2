interface RegisterFormTypes {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface LoginFormTypes {
  email: string;
  password: string;
}

export type { RegisterFormTypes, LoginFormTypes };
