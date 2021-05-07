import {snakeToCamelStr, camelToSnakeStr} from '../helpers';

function base(
  test: (key: string) => boolean,
  convertStr: (key: string) => string
) {
  return function (object: object) {
    for (const key in object) {
      if (!object.hasOwnProperty(key)) {
        continue;
      }
      if (!test(key)) {
        continue;
      }

      const newKey = convertStr(key);
      const oldValue = object[key];
      delete object[key];
      object[newKey] = oldValue;
    }
  };
}

export const snakeToCamel = base((key) => key.includes('_'), snakeToCamelStr);
export const camelToSnake = base(
  (key) => key.match(/\w[A-Z]/) !== null,
  camelToSnakeStr
);