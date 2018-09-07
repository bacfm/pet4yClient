'use strict';

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _createDateObjects = require('../createDateObjects');

var _createDateObjects2 = _interopRequireDefault(_createDateObjects);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('createDateObjects', function () {
  for (var month = 0; month < 12; month++) {
    var date = _moment2.default.utc([2016, month, 1]);
    expect((0, _createDateObjects2.default)(date)).toMatchSnapshot();
  }
});