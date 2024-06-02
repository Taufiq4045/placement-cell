// create token and save into cookie

export const sendToken = async (user) => {
  const token = user.getJWTToken();
  return token;
};
