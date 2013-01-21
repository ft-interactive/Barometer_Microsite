<?php
require('php/phpQuery-onefile.php');

// first get our thir party wrapper page
$rUrl = "http://www.ft.com/thirdpartywarpper/businessbarometer";

function rdContent($rUrl){
	$ch = curl_init($rUrl);
	$options = array(
		CURLOPT_HEADER => false,
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_HTTPHEADER => array('Access-Control-Allow-Origin: *','Content-type: text/javascript;charset=utf-8')
		);
	curl_setopt_array( $ch, $options );
    return curl_exec($ch);
};

$rDoc = rdContent($rUrl);
$wrapper = phpQuery::newDocumentHTML($rDoc);
phpQuery::selectDocument($wrapper);
/*
strip out procedural code
*/
pq('div.freestyle > div#FTi')->remove();
pq('div.freestyle > script')->remove();
pq('div.freestyle > link')->remove();
/*
add plainHtml tag
*/
pq('div.freestyle:first')->append('<div role="main" id="igabcde-012345-098765-fedcba"></div>');

$doc = phpQuery::newDocumentFile('default.html');
phpQuery::selectDocument($doc);
$innerHTML = pq('div#igabcde-012345-098765-fedcba')->html();
phpQuery::selectDocument($wrapper);
pq('div.freestyle > div#igabcde-012345-098765-fedcba')->html($innerHTML);
print $wrapper;
?>