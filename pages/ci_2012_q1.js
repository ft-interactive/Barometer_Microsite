// JavaScript Document ci_2012_q1.js
$('div#dropDown_0').css("visibility", "visible");
$('#sectionBlurb').css("visibility", "visible");	
var htmlElements = '';
FT.Interactive.topical.pageHtml(htmlElements);
htmlElements += '<div style="width: 910px; height: 50px; position: absolute; top: 180px; left: 14px; z-index:600">';
htmlElements += '<div id="pieTopicalTitle_0" class="pieTopical" style="width:300px;"></div>';
htmlElements += '<div id="pieTopicalTitle_1" class="pieTopical" style="width:300px;"></div>';
htmlElements += '<div id="pieTopicalTitle_2" class="pieTopical" style="width:300px;"></div>';
htmlElements += '</div>';
htmlElements += '<!-- <div id="countryBarsTitle" style="position:absolute;top:350px;left:50px;"></div> -->';
htmlElements += '<div id="container_topicalBars" style="width: 420px; height: 550px; position: absolute; top: 470px; left: 14px; z-index:600" ></div>';
htmlElements += '<div id="container_topicalBars2" style="width: 420px; height: 550px; position: absolute; top: 470px; left: 450px; z-index:600" ></div>';
htmlElements += '<div id="container_pieTopical" style="width: 860px; height: 240px; position: absolute; top: 230px; left: 20px; z-index:600" ></div>';
FT.Interactive.topical.pageHtml(htmlElements);
FT.Interactive.topical.dataSources = [
	'http://interactive.ftdata.co.uk/data/ft.interactive.data_v2.php?_cf=116&id=36&y=2012&q=1',
	'http://interactive.ftdata.co.uk/data/ft.interactive.data_v2.php?_cf=117&id=36&y=2012&q=1&filter='
	];
$('#FTi .content').css('height','760px');

//FTi.chart_4 && FTi.chart_4.destroy();
//FTi.chart_4 = null;
//FTi.chart_5 && FTi.chart_5.destroy();
//FTi.chart_5 = null;

FT.Interactive.topical.pageData();

function pageBuild(ds){ 
	var FTi = FT.Interactive;
	//FTi.wrBlurb(3);
	if(FT.Interactive.tPointer == 3){
		$('#blurbText').text(ds.query.results.dataset.pagefurniture.tab[3].questionDetail);
	}
	var topicQ = ds.query.results.dataset.topicalQuestions.question;
	FT.Interactive.chkDataObj(FT.Interactive.dataset,0,[FT.Interactive.dataset.cData[0], FT.Interactive.dataset.cData[1], FT.Interactive.dataset.cData[2], 'topicalQuestions']);
	FT.Interactive.dataset[FT.Interactive.dataset.cData[0]][FT.Interactive.dataset.cData[1]][FT.Interactive.dataset.cData[2]].topicalQuestions.question = topicQ;
	FTi.yesNoBars(420,3,3,topicQ[3].option[0].qlabel,topicQ[3].option[1].qlabel,$('#container_topicalBars'));
	FTi.yesNoBars(420,4,4,topicQ[4].option[0].qlabel,topicQ[4].option[1].qlabel,$('#container_topicalBars'));
	FTi.yesNoBars(420,5,5,topicQ[5].option[0].qlabel,topicQ[5].option[1].qlabel,$('#container_topicalBars2'));
	FTi.yesNoMaybeBars(420,6,6, topicQ[6].option[0].qlabel,topicQ[6].option[2].qlabel, topicQ[6].option[1].qlabel, $('#container_topicalBars2'));
	FTi.pieColoursTopical = [];
	for(i=0; i<topicQ.length; i++){
		if(topicQ[i].type == "pie"){
			for(j=0; j<topicQ[i].option.length; j++){
				switch(i){
					case 0:
					FTi.pieColoursTopical.push(FTi.pieColoursTopicalFirst[j]);
					break;
					
					case 1:
					FTi.pieColoursTopical.push(FTi.pieColoursTopicalSecond[j]);
					break;
					
					case 2:
					FTi.pieColoursTopical.push(FTi.pieColoursTopicalThird[j]);
					break;
				}
			}
		}
	}
	FT.Interactive.options_4triple.colors = FT.Interactive.pieColoursTopical;
	FT.Interactive.options_4triple.plotOptions.series = {
		animation: false
	}
	$(topicQ)
		.each( function(i){
			if(i<3) {
				//console.log(i)
				var _d={
					name: '',
					data: [],
					type:'pie',
					center:[],
					};
				var item;
				_d.name = $(this).attr('qtext');
				_d.center.push([((i+1) * 35) - 19 + "%"])
				var _n, _v, _c
				for(item in this.option){	
						_n = this.option[item].qlabel
						_v = Number(this.option[item].content); 
						_d.data.push([_n,_v]);
				}
			FT.Interactive.options_4triple.series.data = [];
			FT.Interactive.options_4triple.series.push(_d);
			$("#pieTopicalTitle_" + i).empty();
			$("#pieTopicalTitle_" + i).append('<b>' + topicQ[i].qtext + '</b>');
		}
	})
	$("#container_pieTopical").empty();
	FTi.chart_4 && FTi.chart_4.destroy();
	FTi.chart_4 = null;
	FTi.chart_4 = new Highcharts.Chart(FT.Interactive.options_4triple);

}
function pageReBuild(ds){
	//console.log('func:pageReBuild');
	var FTi = FT.Interactive;
	var topicQ = ds.query.results.dataset.topicalQuestions.question;
	FT.Interactive.chkDataObj(FT.Interactive.dataset,0,[FT.Interactive.dataset.cData[0], FT.Interactive.dataset.cData[1], FT.Interactive.dataset.cData[2], 'topicalQuestions']);
	FT.Interactive.dataset[FT.Interactive.dataset.cData[0]][FT.Interactive.dataset.cData[1]][FT.Interactive.dataset.cData[2]].topicalQuestions.question = topicQ;
	$('#container_topicalBars').html('');
	$('#container_topicalBars2').html('');
	FTi.yesNoBars(420,3,4,topicQ[3].option[0].qlabel,topicQ[3].option[1].qlabel,$('#container_topicalBars'));
	FTi.yesNoBars(420,5,5,topicQ[3].option[0].qlabel,topicQ[3].option[1].qlabel,$('#container_topicalBars2'));
	FTi.yesNoMaybeBars(420,6,6, topicQ[6].option[0].qlabel,topicQ[6].option[2].qlabel, topicQ[6].option[1].qlabel, $('#container_topicalBars2'));
	FTi.pieColoursTopical = [];
	for(i=0; i<topicQ.length; i++){
		if(topicQ[i].type == "pie"){
			for(j=0; j<topicQ[i].option.length; j++){
				switch(i){
					case 0:
					FTi.pieColoursTopical.push(FTi.pieColoursTopicalFirst[j]);
					break;
					
					case 1:
					FTi.pieColoursTopical.push(FTi.pieColoursTopicalSecond[j]);
					break;
					
					case 2:
					FTi.pieColoursTopical.push(FTi.pieColoursTopicalThird[j]);
					break;
				}
			}
		}
	}
	FT.Interactive.options_4triple.colors = FT.Interactive.pieColoursTopical;
	FT.Interactive.options_4triple.plotOptions.series = {
		animation: false
	}
	$(topicQ)
		.each( function(i){
			if(i<3) {
				//console.log(i)
				var _d={
					name: '',
					data: [],
					type:'pie',
					center:[],
					};
				var item;
				_d.name = $(this).attr('qtext');
				_d.center.push([((i+1) * 35) - 19 + "%"])
				var _n, _v, _c
				for(item in this.option){	
						_n = this.option[item].qlabel
						_v = Number(this.option[item].content); 
						_d.data.push([_n,_v]);
				}
			FT.Interactive.options_4triple.series.data = [];
			FT.Interactive.options_4triple.series.push(_d);
			$("#pieTopicalTitle_" + i).empty();
			$("#pieTopicalTitle_" + i).append('<b>' + topicQ[i].qtext + '</b>');
		}
	})
	$("#container_pieTopical").empty();
	FTi.chart_4 && FTi.chart_4.destroy();
	FTi.chart_4 = null;
	FTi.chart_4 = new Highcharts.Chart(FT.Interactive.options_4triple);
}