export default (responseData = {}) => {
  const r = {}
  if ('alldata' in responseData) {
    responseData.alldata.forEach((v) => {
      r[v._id] = r
    })
  }
  return r
}
