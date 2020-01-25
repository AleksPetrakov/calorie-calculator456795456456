var $ = require('jquery');

function calorie() {
  this.show = () => {
    const isMale = $("input[name='gender']:checked").val();
    const weight = +$("input[name='weight']").val();
    const height = +$("input[name='height']").val();
    const years = +$("input[name='years']").val();
    const bmr =
      (isMale ? 88.36 : 447.6) +
      ((isMale ? 13.4 : 9.2) * weight) +
      ((isMale ? 4.8 : 3.1) * height) -
      ((isMale ? 5.7 : 4.3) * years);
    const ca = +$("input[name='ca']:checked").val();
    $('#result').addClass('opened');
    $('#result').text(`Your daily calorie value is ${Math.round(bmr * ca)}`);
  }
}

module.exports = calorie;