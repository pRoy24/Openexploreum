// Copyright 2018 Tokenplex LLC. https://tokenplex.io. proy24

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
// or implied. See the License for the specific language governing
// permissions and limitations under the License.

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