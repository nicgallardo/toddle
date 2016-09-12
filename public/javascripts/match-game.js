var attrs = [
  {
    value: "cat",
    img: "images/cat.gif"
  },
  {
    value: "bat",
    img: "images/bat.gif"
  },
  {
    value: "rat",
    img: "images/rat.gif"
  },
  {
    value: "bear",
    img: "images/bear.gif"
  },
  {
    value: "button",
    img: "images/button.gif"
  },
  {
    value: "pillow",
    img: "images/pillow.gif"
  },
  {
    value: "face",
    img: "images/face.gif"
  },
  {
    value: "shoes",
    img: "images/shoes.gif"
  },
]

var randomDom = function(attrCopy){
  var random = Math.floor(Math.random() * attrCopy.length);
  var elem = attrCopy.splice(random, 1);
  $( ".drag" ).append( "<div class='draggable' id='" + elem[0].value + "'>" + elem[0].value + "</div>" );
  attrCopy.length > 0 ? randomDom(attrCopy) : true;
}

$(document).ready(function(){

  randomDom(attrs.slice());


  for (var i = 0; i < attrs.length; i++) {
    $( ".drops" ).append( "<div class='droppable' id='" + attrs[i].value + "-drop'>" + attrs[i].value + "</div>" );
    // $( ".drag" ).append( "<div class='draggable' id='" + attrs[i].value + "'>" + attrs[i].value + "</div>" );

    var selector =  "#" + attrs[i].value + "-drop";

    $(selector).droppable({
      drop: function( event, ui ) {
        if($(ui.draggable[0]).attr('id') === $(this).html()){
          $(ui.draggable[0]).remove();
          console.log('hit');
          $( this ).addClass( "highlight" );
        }else{
          console.log("not a match");
        }
      }
    });

  };

  $( ".draggable" ).draggable();
});
