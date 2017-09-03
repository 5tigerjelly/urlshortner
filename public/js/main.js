$(function(){
    $('#resultsBox').hide();
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
     shortUrl = window.location.href + data.shortUrl;
     $('#shortUrlLink').text(shortUrl);
     $("a").attr("href", shortUrl);
     $('#resultsBox').fadeIn();
   }
 });
}
