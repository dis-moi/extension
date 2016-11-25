export default function (objects, expectedKey){
  let myMap = new Map();

  Object.keys(objects).forEach(function (key){
    myMap.set(objects[key][expectedKey], objects[key]);
  });

  return myMap;
}
