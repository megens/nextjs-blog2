interface cookiePropertiesType {
  expires: number;
  httpOnly: boolean;
  secure: boolean;
  sameSite: "strict";
  maxAge: number;
  path: string;
}

export const cookieProperties: cookiePropertiesType = {
  expires: 1,
  httpOnly: true,
  secure: process.env.NODE_ENV !== "development",
  sameSite: "strict",
  maxAge: 3600 * 24,
  path: "/",
};
