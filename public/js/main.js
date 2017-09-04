$(function () {
	$('#resultsBox').hide();
	$('#shortUrlform').submit(function (event) {
		event.preventDefault();
		setUrl($('#formUrl').val())
			.done(function (data) {
				var shortUrl = window.location.href + data.shortUrl;
				$('#shortUrlLink').text(shortUrl);
				$("a").attr("href", shortUrl);
				$('#formUrl').val(shortUrl);
				$('#resultsBox').fadeIn();
			});
	});
	document.getElementById("copyLinkBtn").addEventListener("click", function () {
		console.log("Hey pretty");
		copyToClipboard(document.getElementById("formUrl"));
		$('#resultsBox').fadeOut();
	});
});

function setUrl(fullUrl) {
	return $.ajax({
		url: '/',
		type: 'PUT',
		dataType: "json",
		data: {
			url: fullUrl
		}
	});
}

function copyToClipboard(element) {
	console.log($(element).val());
	var $temp = $("<input>");
	$("body").append($temp);
	$temp.val($(element).val()).select();
	document.execCommand("copy");
	$temp.remove();
}
