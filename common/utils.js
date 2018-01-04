export function getDay3(index) {
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return days[index];
}

export function ease(t, b, c, d, type) {
  switch (type) {
    case "inOutQuart":
      if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
	    return -c/2 * ((t-=2)*t*t*t - 2) + b;
      
    default: // outExpo
      return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
  }
}

// Insert commas into long numbers
export function formatNum(num) {
  let numStr = num.toString();
  if (numStr.length > 3) {
    numStr = `${numStr.slice(0, numStr.length - 3)},${numStr.slice(numStr.length - 3)}`;
  }
  return numStr;
}

// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// Convert a number to a special monospace number
export function monoDigits(digits) {
  var ret = "";
  var str = digits.toString();
  for (var index = 0; index < str.length; index++) {
    var num = str.charAt(index);
    ret = ret.concat(hex2a("0x1" + num));
  }
  return ret;
}

// Hex to string
function hex2a(hex) {
  var str = '';
  for (var index = 0; index < hex.length; index += 2) {
    var val = parseInt(hex.substr(index, 2), 16);
    if (val) str += String.fromCharCode(val);
  }
  return str.toString();
}
