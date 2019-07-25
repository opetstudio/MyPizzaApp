import {
  prepend,
  sortBy,
  compose,
  toLower,
  prop,
  map,
  pipe,
  pick,
  isNil
} from 'ramda'

function mapAttributes (dataIn, obj) {
  // console.log('mapAttributes')
  // const mrg = (x) => {
  //   // console.log('mapAttributes mrg ==>', x)
  //   return merge(x.company, pick(['id'], x))
  // }
  const mp = map(x => {
    // console.log('mapAttributes map ==>', x)
    // return mrg(x)
    // return mrg(x)
    if (!isNil(obj)) return pick(obj, x)
    else return x
  })
  var mapAttrs = pipe(mp)
  return mapAttrs(dataIn)
  // return mapAttrs(isNil(obj) ? dataIn : dataIn.data)
}

function getAttributes (dataIn, obj) {
  // var x = dataIn

  // console.log('x.company==>', x.company)
  // console.log('p==>', p)
  // var co = merge(x.company, p)
  // console.log('co==>', co)
  // var mapAttrs = pipe(map((x) => {
  //   // console.log('xxx=>', x)
  //   var p = pick(['id'], x)
  //   // console.log('p=>', p)
  //   // console.log('x.company=>', x.company)
  //   var m = merge(x.company, p)
  //   // console.log('m=>', m)
  //   return m
  // }))
  var mapAttrs = pipe(x => {
    // var p = pick(['id'], x)
    // var m = merge(x.company, p)
    // return m
    if (!isNil(obj)) return pick(obj, x)
    else return x
  })
  // var mapAttrs = pipe((x) => {
  //   var p = pick(['id'], x)
  //   var m = merge(x.company, p)
  //   return m
  // }, path(['catchPhrase']))
  // var mapAttrs = pipe(
  //   map(x => merge(x.company, pick(['id'], x))),
  //   path(['data'])
  // )
  // return mapAttrs(dataIn)
  // var mapAttrs = pipe(merge(x.company, pick(['id'], x)))
  // return mapAttrs(dataIn)
  var r = mapAttrs(dataIn)
  // console.log('r=>=====>', r)
  return r
}

function updateMulti (singleIn, multiIn) {
  // If the key matches, return whats in Single Object,
  // Otherwise, return whats in multi
  return map(x => (x.id === singleIn.id ? singleIn : x), multiIn)
}

function insertMulti (singleIn, multiIn) {
  var newList = pipe(prepend(singleIn), sortBy(compose(toLower, prop('name'))))
  return newList(multiIn)
}

export { getAttributes, mapAttributes, updateMulti, insertMulti }
