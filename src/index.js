require('./css/style.css');
var $ = require('jquery');
var calorie = require('./js/calorie.js');

var calorieModule = new calorie();

$('button').click(() => {
  calorieModule.show();
});
