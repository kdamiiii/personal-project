import * as jose from "jose";

export const SECRET = new TextEncoder().encode(
  process.env.NEXT_PUBLIC_JWT_SECRET
);

export const getDecodedCookies = async (token: string) => {
  try {
    return await jose.jwtVerify(token, SECRET);
  } catch {
    throw new Error("Token has expired");
  }
};
