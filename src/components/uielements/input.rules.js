let mobile = {
  pattern: /^[2-9]{1}[0-9]{9}$/,
  message: "Phone Number is Incorrect"
};
let email = {
  type: "email"
};
let pincode = {
  pattern: /^[1-9]?[0-9]{5}$/,
  len: 6,
  message: "Pincode must be of 6 digits"
};
let integer = {
  pattern: /^[-+]?[0-9]+$/,
  message: "Only Integers are allowed"
};

let float = {
  message: "Only Float are allowed",
  pattern: /^[-+]?[0-9]+\.[0-9]+$/
};

let number = {
  message: "Only Numbers are allowed",
  pattern: /^[+]?[0-9]+(\.[0-9]+)?$/
};

let amount = {
  message: "Amount is Incorrect",
  pattern: /^[+]?[0-9]+(\.[0-9]+)?$/
};

// ^\d+(\.\d{1,2})?$

let positiveNumber = {
  pattern: /^[+]?[0-9]+$/,
  message: "Only Number are allowed"
};
let positiveFloat = {
  pattern: /^(?:[1-9][0-9]*|0)?(?:\.[0-9]+)?$/,
  message: "Incorrect Format. Example 10.00"
};
let pannumber = {
  message: "Pan Number must be exactly 10 characters",
  len: 10
};
let aadhar = {
  message: "Aadhar Number must be exactly 12 characters",
  len: 12
};
let rules = {};
rules.mobile = mobile;
rules.email = email;
rules.number = number;
rules.amount = amount;
rules.pannumber = pannumber;
rules.positiveNumber = positiveNumber;
rules.pincode = pincode;
rules.positiveFloat = positiveFloat;
rules.aadhar = aadhar;
export default rules;
