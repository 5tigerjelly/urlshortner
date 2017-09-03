$(function(){
    $('#shortUrlform').submit(function(event){
        event.preventDefault();
        setUrl($('#formUrl').val());
    });
});

function setUrl(fullUrl){
  $.ajax({
   url: '/',
   type: 'PUT',
   dataType: "json",
   data: { url: fullUrl },
   success: function(data) {
     console.log(data);
   }
 });
}
