var calculate = new Calculate();
var battle =  new Battlefield();

$(function () {
  cities.print()
  $('#player-cities>li:nth(0)>a').click();
  $('#player-creatures>li:nth(6)>a').click();
  $('#player-creature-number').val(1);

  $('#enemy-cities>li:nth(0)>a').click();
  $('#enemy-creatures>li:nth(13)>a').click();
  $('#enemy-creature-number').val(2);

  battle.refresh();
});
