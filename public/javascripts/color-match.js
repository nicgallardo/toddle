var game = {
  player: {
    attempts: 0,
    hits: 0
  },
  colors: [
    {
      color: 'Red',
      classValue: 'bf3c41',
    },
    {
      color: 'Blue',
      classValue: 'blue-3d65a4',
    },
    {
      color: 'Green',
      classValue: 'green-00FF00',
    },
    {
      color: 'Yellow',
      classValue: 'FFFF00',
    },
    {
      color: 'Orange',
      classValue: 'FFA500',
    },
    {
      color: 'Black',
      classValue: 'black-000000',
    },
  ],
  callTest: function(){
    if(game.colorState.length === 0){
      return false;
    };
    var random = Math.floor(Math.random() * game.colorState.length);
    var splicedVal = game.colorState.splice(random, 1);
    return splicedVal[0];
  },
  unbinder: function(){
    var tmpColors = game.colors;
    for (var i = 0; i < tmpColors.length; i++) {
      var selector = "." + tmpColors[i].classValue;
      $(selector).unbind( "click" );
    };
  },
  createQuiz: function(){
    var currentValue = game.callTest();
    if(currentValue === false){
      game.endGame();
      return;
    }else{
      $('.game-state').empty();
      $('.game-state').append(
        '<h1>Which block is ' + currentValue.color+ '?</h1>'
      );
      var selector = "." + currentValue.classValue;
      game.unbinder();
      game.createAnti();
      $(selector).click(function(){
        game.attempt(1, 1);
        game.playAudio('/audio/ding.mp3');
        $(selector).remove();
        game.createQuiz();
      });
    }
  },
  playAudio: function(path){
    var audio = new Audio(path);
    audio.play();
  },
  createAnti: function(){
    var antiClicks = game.colorState;
    for (var i = 0; i < antiClicks.length; i++) {
      var selector = "." + antiClicks[i].classValue;
      $(selector).click(function(){
        game.attempt(1, 0);
        game.playAudio('/audio/buzzer.mp3');
      });
    };
  },
  attempt: function(attempt, hit){
    game.player.attempts += attempt;
    game.player.hits += hit;
    game.percentage();
  },
  percentage: function(){
    var percent = game.player.hits / game.player.attempts;
    dThreeRender(percent);
  },
  endGame: function(){
    $('.game-state').empty();
    $('.game-state').append(
      '<h1>Game Over</h1>'
    );
  },
};

game['colorState'] = game.colors.slice(),

$(document).ready(function(){
  for (var i = 0; i < game.colors.length; i++) {
    $('.color-block').append(
      '<div class=" col-md-2 blocks ' +game.colors[i].classValue + '"</div>'
    );
  };
  $('.game-state').append(
    '<button class="initiate-test btn btn-default" type="button">Begin Test</button>'
  );
  $('.initiate-test').click(function(){
    game.createQuiz();
    dThreeRender(0.00);
  });
});

var dThreeRender = function(newValue){
    $('div#content').empty();

    var colors = {
        'pink': '#E1499A',
        'yellow': '#f0ff08',
        'green': '#69BE28'
    };

    var color = colors.green;

    var radius = 100;
    var border = 5;
    var padding = 30;
    var startPercent = 0;
    var endPercent = newValue;

    var twoPi = Math.PI * 2;
    var formatPercent = d3.format('.0%');
    var boxSize = (radius + padding) * 2;


    var count = Math.abs((endPercent - startPercent) / 0.01);
    var step = endPercent < startPercent ? -0.01 : 0.01;

    var arc = d3.svg.arc()
        .startAngle(0)
        .innerRadius(radius)
        .outerRadius(radius - border);

    var parent = d3.select('div#content');

    var svg = parent.append('svg')
        .attr('width', boxSize)
        .attr('height', boxSize);

    var defs = svg.append('defs');

    var filter = defs.append('filter')
        .attr('id', 'blur');

    filter.append('feGaussianBlur')
        .attr('in', 'SourceGraphic')
        .attr('stdDeviation', '7');

    var g = svg.append('g')
        .attr('transform', 'translate(' + boxSize / 2 + ',' + boxSize / 2 + ')');

    var meter = g.append('g')
        .attr('class', 'progress-meter');

    meter.append('path')
        .attr('class', 'background')
        .attr('fill', '#ccc')
        .attr('fill-opacity', 0.5)
        .attr('d', arc.endAngle(twoPi));

    var foreground = meter.append('path')
        .attr('class', 'foreground')
        .attr('fill', color)
        .attr('fill-opacity', 1)
        .attr('stroke', color)
        .attr('stroke-width', 5)
        .attr('stroke-opacity', 1)
        .attr('filter', 'url(#blur)');

    var front = meter.append('path')
        .attr('class', 'foreground')
        .attr('fill', color)
        .attr('fill-opacity', 1);

    var numberText = meter.append('text')
        .attr('fill', color)
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em');

    function updateProgress(progress) {
        foreground.attr('d', arc.endAngle(twoPi * progress));
        front.attr('d', arc.endAngle(twoPi * progress));
        numberText.text(formatPercent(progress));
    }

    var progress = startPercent;

    (function loops() {
        updateProgress(progress);

        if (count > 0) {
            count--;
            progress += step;
            setTimeout(loops, 10);
        }
    })();
}
