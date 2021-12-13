import mapKeys from 'lodash/mapKeys';
import rearg from 'lodash/rearg';
import camelCase from 'lodash/camelCase';

export const snakeToCamel = (object) => {
  if (object === undefined) {
    return undefined;
  };  
  
  const newObject = mapKeys(object, rearg(camelCase, 1));

  return newObject;
}
