// Get the abbreviated day of the week
export function getDay3(index) {
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return days[index];
}

// Ease between two values
export function ease(t, b, c, d, type) {
  switch (type) {
    case "inOutQuart":
      if ((t/=d/2) < 1) return c/2 * Math.pow(t, 4) + b;
	    return -c/2 * (Math.pow(t-2, 4) - 2) + b;
      
    default: // outExpo
      return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
  }
}

// Insert comma into long numbers
export function addComma(num) {
  let str = num.toString();
  if (str.length > 3) {
    str = `${str.slice(0, str.length - 3)},${str.slice(str.length - 3)}`;
  }
  return str;
}

// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) i = "0" + i;
  return i;
}

// Convert a number to a special monospace number
export function monoDigits(digits) {
  let ret = "";
  let str = digits.toString();
  for (let i = 0, length = str.length; i < length; i++) {
    let num = str.charAt(i);
    ret = ret.concat(hex2a("0x1" + num));
  }
  return ret;
}

// Hex to string
function hex2a(hex) {
  let str = "";
  for (let i = 0, length = hex.length; i < length; i += 2) {
    let val = parseInt(hex.substr(i, 2), 16);
    if (val) str += String.fromCharCode(val);
  }
  return str.toString();
}
