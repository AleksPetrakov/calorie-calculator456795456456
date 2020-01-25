import * as $ from 'jquery';
import calorie from './js/calorie';
import fatsecret from './js/fatsecret';
import './css/style.css';

const calorieModule = new calorie();
const fatsecretModule = new fatsecret();

$('button').click(() => {
  calorieModule.show();
  fatsecretModule.searchFood('apple');
});
