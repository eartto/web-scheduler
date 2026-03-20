const rootkey = process.env.ROOTKEY;
const rootId = process.env.ROOTID;

const numberConverter = (number: string) => {
  return number[1].toString();
};

/* Generates id based on the number of timetables in the database to
ensure that each key generated is unique. The number is then converted
into base 36 system of randomized string consisting of numbers 0-9 and 
lowercase alphabet characters. This is done to considerably shorten 
the id part of the key. */
const keyIdGen = () => {
  const n = 5000;
  let keyId = "";
  const base = (n / 36).toString().split(".")[0];
  const numeral = n % 36;

  if (Number(base) > 36) {
    const indexes = base.split("");
    indexes.forEach((index) => {
      keyId += rootId![Number(index)];
    });
    keyId += rootId![numeral];
  }
  return keyId;
};

const generateKey = () => {
  const date = Date.now().toString();
  let z = date.slice(-6).split("").reverse().join("");
  let key = "";
  if (z[0] === "0") {
    z = "1" + Number(z).toString();
  }
  let x = 0;
  let y = 2;
  for (let i = 0; i < 3; i++) {
    if (Number(z.slice(x, y)) > 25) {
      key += numberConverter(z.slice(x, y));
    } else {
      key += rootkey![Number(z.slice(x, y))];
    }
    x = x + 2;
    y = y + 2;
  }
  const keyId = keyIdGen();
  key = keyId + key;
  return key;
};

export default { generateKey };
