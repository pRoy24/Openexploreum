export function isNonEmptyArray(arr) {
  if (arr === null || typeof arr === "undefined" || arr.length === 0) {
    return false;
  }
  return true;
}

export function isEmptyArray(arr) {
  if (arr === null || typeof arr === "undefined" || arr.length === 0) {
    return true;
  }
  return false;
}

export function isNonEmptyString(str) {
  if (str !== null && typeof(str) !== "undefined" && str.length !== 0) {
    return true;
  }
  return false;
}

export function isEmptyObject(obj) {
  if (obj === null || typeof obj === "undefined" || Object.keys(obj).length === 0) {
    return true;
  }
  return false;
}

export function isNonEmptyObject(obj) {
  if (obj === null || typeof obj === "undefined" || Object.keys(obj).length === 0) {
    return false;
  }
  return true;
}