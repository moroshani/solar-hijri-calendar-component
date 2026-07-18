declare module "jalaali-js" {
  export type JalaaliDate = {
    jy: number;
    jm: number;
    jd: number;
  };

  export type GregorianDate = {
    gy: number;
    gm: number;
    gd: number;
  };

  const jalaali: {
    toJalaali(gy: number, gm: number, gd: number): JalaaliDate;
    toGregorian(jy: number, jm: number, jd: number): GregorianDate;
    jalaaliMonthLength(jy: number, jm: number): number;
  };

  export default jalaali;
}
