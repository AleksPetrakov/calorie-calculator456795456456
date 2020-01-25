import * as $ from 'jquery';
import calorie from './js/calorie';
import fatsecret from './js/fatsecret';
require('./css/style.css');

var calorieModule = new calorie();

$('button').click(() => {
  calorieModule.show();
});
