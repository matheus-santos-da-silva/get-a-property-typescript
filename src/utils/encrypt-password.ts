import { genSaltSync, hash } from 'bcrypt';

export const encryptingPass = async (password: string) => {

  const salt = genSaltSync(12);
  const passwordHash = await hash(password, salt);

  return passwordHash;
};