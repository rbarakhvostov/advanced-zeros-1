module.exports = function getZerosCount(number, base) {

   // array with prime numbers in the interval [2; 256];
  const simpleNumber = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 
                      59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113,
                      127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 
                      191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251]; 

  const multiplier = []; // array with prime factors on which the base is expanded;

  for (let i = 0, l = simpleNumber.length; i < l; i++) {
    if (base % simpleNumber[i] !== 0) continue;
    multiplier.push(simpleNumber[i]);
    base = base / simpleNumber[i];
    i--;
    if (base === 1) break;
  };

  const arr = [];   // if multiplier = [2,2,7], then arr = [2,1], because two "2" and one "7";
  let counter = 1; // count repetitions;
  for (let i = 0, l = multiplier.length; i < l; i++) {
    if (multiplier[i] !== multiplier[i+1]) {
      arr.push(counter);
      counter = 1;
    } else {
      counter++;      
    };  
  };

  const brr = [];  
  let res = 0; // for number = 100 and multiplier[i] = 5 : 100/5 + 100/25, (5**3 > 100); res = 24;
  for (let i = 0, l = multiplier.length; i < l; i++) {
    if (multiplier[i] == multiplier[i-1]) continue;
    let copy = multiplier[i];
    for (copy; copy <= number; copy *= multiplier[i]) {
      res = res + Math.floor(number / copy);
    };
    brr.push(res);
    res = 0;
  };

  for (let i = 0, l = brr.length; i < l; i++) {
    brr[i] = Math.floor(brr[i] / arr[i]);
  };

    // find the minimum number in brr;

  let min = brr[0];

  for (let i = 1, l = brr.length; i < l; i++) {
    if (brr[i] < min) {
      min = brr[i];
    };
  };

  return min;
};
