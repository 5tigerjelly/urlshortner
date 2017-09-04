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
     var shortUrl = window.location.href + data.shortUrl;
     $('#shortUrlLink').text(shortUrl);
     $("a").attr("href", shortUrl);
     $('#formUrl').val('');
     $('#resultsBox').fadeIn();
     copyToClipboard(shortUrl);
   }
 });
}

function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val(element).select();
  document.execCommand("copy");
  $temp.remove();
}
