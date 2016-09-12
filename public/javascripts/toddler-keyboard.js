var attrs = {
  A: {
    item: [
      {
        value: 'Apple',
        img: '/images/apple.gif',
        audio: '/audio/apple.mp3',
      },
    ]
  },
  B: {
    item: [
      {
        value: 'Banana',
        img: '/images/banana.gif'
      },
    ]
  },
  C: {
    item: [
      {
        value: 'Car',
        img: '/images/car.gif'
      },
    ]
  },
  D: {
    item: [
      {
        value: 'Dog',
        img: '/images/dog.gif',
        audio: '/audio/dog.mp3',
      },
    ]
  },
  E: {
    item: [
      {
        value: 'Egg',
        img: '/images/egg.gif'
      },
    ]
  },
  F: {
    item: [
      {
        value: 'Farm',
        img: '/images/farm.gif'
      },
    ]
  },
  G: {
    item: [
      {
        value: 'Gold',
        img: '/images/gold.gif'
      },
    ]
  },
  H: {
    item: [
      {
        value: 'Hat',
        img: '/images/hat.gif'
      },
    ]
  },
  I: {
    item: [
      {
        value: 'Igloo',
        img: '/images/igloo.gif'
      },
    ]
  },
  J: {
    item: [
      {
        value: 'Jewell',
        img: '/images/jewell.gif'
      },
    ]
  },
  K: {
    item: [
      {
        value: 'Kite',
        img: '/images/kite.gif'
      },
    ]
  },
  L: {
    item: [
      {
        value: 'Light',
        img: '/images/light.gif'
      },
    ]
  },
  M: {
    item: [
      {
        value: 'Moon',
        img: '/images/moon.gif'
      },
      {
        value: 'Monkey',
        img: '/images/monkey.gif'
      },
    ]
  },
  N: {
    item: [
      {
        value: 'Night',
        img: '/images/night.gif'
      },
    ]
  },
  O: {
    item: [
      {
        value: 'Open',
        img: '/images/open.gif'
      },
    ]
  },
  P: {
    item: [
      {
        value: 'Penguine',
        img: '/images/penguine.gif'
      },
    ]
  },
  Q: {
    item: [
      {
        value: 'Quiet',
        img: '/images/quiet.gif'
      },
    ]
  },
  R: {
    item: [
      {
        value: 'Rainbow',
        img: '/images/rainbow.gif'
      },
    ]
  },
  S: {
    item: [
      {
        value: 'Star',
        img: '/images/star.gif'
      },
    ]
  },
  T: {
    item: [
      {
        value: 'Triangle',
        img: '/images/triangle.gif'
      },
    ]
  },
  U: {
    item: [
      {
        value: 'Umbrella',
        img: '/images/umbrella.gif'
      },
    ]
  },
  V: {
    item: [
      {
        value: 'Volcano',
        img: '/images/volcano.gif'
      },
    ]
  },
  W: {
    item: [
      {
        value: 'Walrus',
        img: '/images/walrus.gif'
      },
    ]
  },
  X: {
    item: [
      {
        value: 'Xylophone',
        img: '/images/xylophone.gif'
      },
    ]
  },
  Y: {
    item: [
      {
        value: 'Yarn',
        img: '/images/yarn.gif'
      },
    ]
  },
  Z: {
    item: [
      {
        value: 'Zoo',
        img: '/images/zoo.gif'
      },
    ]
  },
};

function getValues(val) {
  var random = Math.floor(Math.random() * attrs[val].item.length);
  console.log(random);
  var attr = attrs[val].item[random];
  return {value: val, attr: attr};
};

function emptyDom(){
  var elements = [
    "#output-text",
    "#output-attr-text",
    "#output-img"
  ];
  for (var i = 0; i < elements.length; i++) {
    $(elements[i]).empty();
  };
};

function appendAttrs(attrObj){
  $("#output-text").append('<h2>'+attrObj.value + " is for...</h2>");
  $("#output-attr-text").append('<h2>' + attrObj.attr.value + '</ h2>');
  $("#output-img").append('<img src="'+attrObj.attr.img+'" width="200px">');
};

function playAudio(path){
  var audio = new Audio(path);
  audio.play();
};

$(document).ready(function(){
  var contain = [];
  for( var val in attrs){
    var attr = '<td>' + val + '</td>';
    contain.push(attr);
  };
  for (var i = 0; i < 5; i++) {
    $('.alphabet').append('<tr>' + JSON.stringify(contain.splice(0, 6)) + '</tr>');
  };

  $( "td" ).click(function() {
    emptyDom();
    var attrs = getValues($(this).html());
    appendAttrs(attrs);
    playAudio(attrs.attr.audio);
  });

  $(document).keypress(function(e){
    emptyDom();
    var entryVal = e.key.toUpperCase();
    var result = entryVal.match(/[a-zA-Z]/);
    if(result){
      var attrs = getValues(entryVal);
      appendAttrs(attrs);
      playAudio(attrs.attr.audio);
    }else{
      $("#output-text").append('<h2>Oops! Pick a letter!</h2>');
      playAudio('/audio/ding.mp3');
    }
  })
});
