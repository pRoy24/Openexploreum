module.exports = {
  isNonEmptyObject: function(obj) {
    if (!verifyEmpty(obj)) {
      return true;
    }
    return false;
  },
  isEmptyObject(obj) {
    if (verifyEmpty(obj)) {
      return true;
    }
    return false;
  },
  isNonEmptyArray: function(arr) {
    if (verifyEmptyArray(arr)) {
     return false; 
    }
    return true;
  }
}

function verifyEmpty(obj) {
  if (obj === null || typeof obj === "undefined" || Object.keys(obj).length === 0) {
    return true;
  }
  return false;
}

function verifyEmptyArray(arr) {
  if (arr === null || typeof arr === "undefined" || arr.length === 0) {
    return true;
  }
  return false;
}