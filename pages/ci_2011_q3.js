// JavaScript Document
(function(FTi) {
	
	// due to the flash built content redirection pointer placed.
	var htmlElements = '';
	htmlElements += '<div style="width: 610px; height: 50px; position: absolute; top: 180px; left: 150px; z-index:600;text-align:centre">';
	htmlElements += '<p> The original content was developed in another technology that is no longer supported.<br/>';
	htmlElements += 'You will find the original content <a href="http://www.ft.com/cms/s/0/1e3fecae-0b82-11e1-9a61-00144feabdc0.html">here</a> </p>';
	htmlElements += '</div>';
	//$('#dropDown_0').css('display', 'none');
	$('#blurbText').html('');
	$('#chartLabel').html('');
	$('#tab_3').html(htmlElements);
	$('div#dropDown_0').css("visibility", "hidden");
	$('#sectionBlurb').css("visibility", "hidden");
	
}(FT.Interactive));