export const calculateEmi = (P, R, N) => {
  if (N == 0) N = 1;
  if (R == 0) return P / N;
  //EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
  //Covert to Monthly Rate
  let RM = R / (12 * 100);
  let RN = Math.pow(1 + RM, N);
  let emi = (P * RM * RN) / (RN - 1);
  return emi;
};
