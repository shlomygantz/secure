// client-side js

// Code inside this special JQuery wrapper function will run after the page loads.
$(function() {

  

  $("#orderToggle").click(function(){
    $('#orderSection').css('display') == 'none' ? $("#orderSection").slideDown("slow") : $("#orderSection").slideUp("slow");
  });


  $("#stockToggle").click(function(){
    $('#stockSection').css('display') == 'none' ? $("#stockSection").slideDown("slow") : $("#stockSection").slideUp("slow");
  });

  $("#voterToggle").click(function(){
    $('#voterSection').css('display') == 'none' ? $("#voterSection").slideDown("slow") : $("#voterSection").slideUp("slow");
  });

  
  $('#loginButton').click(function (){
    
  
     $('#loginButton').disabled=true;
   
     var loginData = {};
     loginData.username = $('input[name=username]').val();
     loginData.password = $('input[name=password]').val();
     $.get('/login?' + $.param({loginData: loginData}), function() {
      
     });
  })

 //////////////////////////////////////////////////// 
// eval is evil - stockdata demonstration   
  $('#stockButton').click(function (){

    $.post('/stockdata', "{'symbol' : '"+ $('input[name=symbol]').val() +"'}")
    .done(function( data ) {
      $('#stockPrice').html('The close price was :$' + data.toString());
    });

 
  })
  
})
 //////////////////////////////////////////////////// 
// regexdos - order status


$('#orderButton').click(function() {

  $( "#orderValidation" ).text('validating...');
  

    $.get('/orderStatus?email=' + $('#email').val(), function(data) {
      $( "#orderValidation" ).text( data );
     }) 

    .fail(function() {
      $( "#orderValidation" ).text( 'Order number or email is invalid' );
    })

});
 //////////////////////////////////////////////////// 
// voter validation 

$('#voterButton').click(function() {
  
    $( "#voterValidation" ).text('validating...');
    
  
      $.get('/voterValidation?id=' + $('#idNo').val(), function(data) {

      $( "#voterValidation" ).empty();
      $( "#voterValidation" ).append($('<p>').html('ID : ' + data.id))
      $( "#voterValidation" ).append($('<p>').html('Name : ' + data.name))
      $( "#voterValidation" ).append($('<p>').append($('h4')).html('Your polling station : ' + data.polling))
       }) 
  
      .fail(function() {
        $( "#voterValidation" ).text( 'Invalid ID' );
      })
  
  });
  




