// const option = [
//   {}, // 상수'
//   [
//     {
//       keyname: '',
//       callback: function (req, res) {},
//     },
//   ], // 변수
// ];

module.exports = (option = [{}, []]) => {
  return function (req, res, next) {
    const [conObj, varObj] = option;

    res.json_ = res.json;
    const dataKey = res.statusCode >= 400 ? 'errors' : 'data';
    res.json = function (data) {
      return res.json_({
        status: res.statusCode,
        jsonapi: {
          version: process.env.API_VERSION,
        },
        ...conObj,
        ...Object.assign(
          varObj.map((item) => {
            return { [item.keyname]: item.callback(req, res) };
          })
        ),

        [dataKey]: data,
      });
    };
    next();
  };
};
