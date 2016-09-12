$( function() {
  $( "#datepicker" ).datepicker();
} );

var validate = function (value, type) {


};

$(document).ready(function(){
  console.log('hello')
  $('#submit').click(function(e){
    var name = $('#name').val();
    var dob = $('#datepicker').val();
    validate(name, String);
    validate(name, Date);
  })
})
