// pfeeney
$(document).ready( function(){
	/*
		function list start
	*/
function shareNow(){
	$('div#social-button map area:nth-child(1)').attr('href', "http://www.facebook.com/sharer.php?u="+window.location); 
	$('div#social-button map area:nth-child(2)').attr('href', "https://twitter.com/intent/tweet?url="+window.location);
	$('div#social-button map area:nth-child(3)').attr('href', "http://www.linkedin.com/shareArticle?mini=true&url="+window.location);
	$('div#social-button map area:nth-child(4)').attr('href', "http://plus.google.com/share?url="+window.location);
	//html body div#igabcde-012345-098765-fedcba div#FTi div.wideWidth div#social-button map area		
};
	
function getSourcesList(){
	$.getJSON(yqlUrl('http://interactive.ftdata.co.uk/data/ft.interactive.data_v2.php?_cf=233'), function(ds){}).success(wrDateSelector);
}
function cleanStage(){
	//console.log('func:cleanStage()');
	var FTi = FT.Interactive;
	//chart_4 && chart_4.destroy();
	//chart_4 = null;
	//if(FTi.chart_4){FTi.chart_4.series.data = [];}
	//FTi.chart_4 && FTi.chart_4.destroy();
	//FTi.chart_4 = null;
	//FTi.chart_5 && FTi.chart_5.destroy();
	//FTi.chart_5 = null;
}	
function wrDateSelector(ds){
	FT.Interactive.conf = {sourcesList: ds.query.results.dataset.dateMenu.survey};
	fillDataList();
	$('#selectYr').click(function () { $('#yrList').toggle(); });
	$('div#selectYr ul#yrList.the_menu li').bind("click", function(event){
		$('#selectYrStart').html($('div#selectYr ul#yrList.the_menu li:nth-child(' + ( $(this).index() +1) + ') a ').html());
		var dTmp = $(this).attr("data-value").split('_');
		//cleanStage();
		//FT.Interactive.appBuild = true;
		loadDataset(dTmp[0], dTmp[1], 'all');
	});
	var hTag = '';
	if(getHashTag() !== ''){
		hTag = getHashTag();
		FT.Interactive.dataset.cData = [hTag.split('/')[1], hTag.split('/')[2], 'all'];
		var tObj  = {'confidence':0,'friendliness':1,'risk':2,'current':3};
		FT.Interactive.tPointer = tObj[hTag.split('/')[3]];
	} else {
		FT.Interactive.dataset.cData = [FT.Interactive.conf.sourcesList[0].year, FT.Interactive.conf.sourcesList[0].quarter, 'all'];
		setHashTag('#/' + FT.Interactive.conf.sourcesList[0].year + '/' + FT.Interactive.conf.sourcesList[0].quarter + '/confidence');
	}
	
	setYrStart();
	loadDataset(FT.Interactive.dataset.cData[0], FT.Interactive.dataset.cData[1], FT.Interactive.dataset.cData[2]);
};

function getHashTag(){ return window.location.hash; };

function setHashTag(val){ window.location.hash = val;  shareNow();};

function setYrStart(){
	var arr = getHashTag().split('/');
	var p = arr[1] + '_' + arr[2];
	$('#yrList li').each( function(index, value){
		if(p === $(this).attr('data-value')){ $('#selectYrStart').html($(this).text()) }
	})
};
	
function fillDataList(){
	var s = FT.Interactive.conf.sourcesList;
	for(var i=0; i<s.length; i++){
		$('#yrList').append('<li data-value="' + s[i].year + '_' + s[i].quarter + '"><a href="javascript:void(0)">' + s[i].yearLabel + '&nbsp;' + s[i].monthLabel +'</a></li>');
	}
};
	
function loadDataset(yr, qtr, filter){
	//console.log('func:loadDataset()');
	FT.Interactive.chkDataObj(FT.Interactive.dataset,0,[yr, qtr, filter]);
	FT.Interactive.dataset.cData = [yr, qtr, filter];
	var tUrl = '';
	if(filter == 'all'){ 
		tUrl = FT.Interactive.dataSourceBase + '&y=' + yr + '&q=' + qtr 
	} else {
		tUrl = FT.Interactive.dataSourceFilter + '&y=' + yr + '&q=' + qtr + '&filter=' + filter
	};
	var arr = getHashTag().split('/');
	setHashTag('#/' + yr + '/' + qtr + '/' + arr[3]);
	
	$.getJSON(yqlUrl(tUrl), intStep_1_Build);
};

function intStep_1_Build(ds){
	var p = FT.Interactive.dataset.cData
	FT.Interactive.dataset[p[0]][p[1]][p[2]] = ds.query.results.dataset;
	if(FT.Interactive.appBuild){
		FT.Interactive.dataset.pagefurniture = ds.query.results.dataset.pagefurniture;
		FT.Interactive.dataset.barometerConfig = ds.query.results.dataset.barometerConfig;
		FT.Interactive.dataset.filtermenus = ds.query.results.dataset.filtermenus;
		FT.Interactive.dataset.standardQuestions = ds.query.results.dataset.standardQuestions;
	}
	// if true first build
	$.getScript('http://interactive.ftdata.co.uk/Barometer_Microsite/pages/ci_' +p[0] + '_q' + p[1] + '.js', intStep_2_Build);
	//FT.Interactive.appBuild? iniPanels(ds,p[0],p[1],p[2]): updatePanels(ds,p[0],p[1],p[2]);
};
function intStep_2_Build(ds){
	var p = FT.Interactive.dataset.cData;
	FT.Interactive.appBuild? iniPanels(ds,p[0],p[1],p[2]): updatePanels(ds,p[0],p[1],p[2]);
}
function iniPanels(ds,yr,qtr,filter){
	//console.log('func:iniPanels()');
	// this needs reduction
	FT.Interactive.appBuild = false;
	crTabs();
	FT.Interactive.wrBlurb(FT.Interactive.tPointer);
	crTab_0_Content();
	crTab_0_ContentPlus();
	if(FT.Interactive.dataset.cData[2] != 'all'){ 
		crTab_0_ContentPlus();
		$("div#tab_0 div#allPies div#container_pie").css('display', 'block');
	} else {
		$("#dropDown_1").css('display', 'none');
		$('#ddList_0 li:last-child').html('<a href="javascript:void(0)">All (' + FT.Interactive.dataset.standardQuestions.n + ')</a>');
		$('#dd_title_0').html('All (' + FT.Interactive.dataset.standardQuestions.n + ')');
		$("div#tab_0 div#allPies div#container_pie").css('display', 'none');
	}
	crTab_1_Content();
	crTab_2_Content();
	if(getHashTag() === ''){
		setStage(0);
	} else {
		var pArr = getHashTag().split('/');
		var arr= ['confidence','friendliness','risk','current'];
		for(var i=0; i<arr.length; i++){
			if(arr[i] === pArr[3]){
				setStage(i);
			}
		}
	};
	createEvents();
	FT.Interactive.chkDataObj(FT.Interactive.dataset,0,[yr, qtr, 'topical']);
};
	
function updatePanels(ds,yr,qtr,filter){
	FTi = 	FT.Interactive.dataset[FT.Interactive.dataset.cData[0]][FT.Interactive.dataset.cData[1]][FT.Interactive.dataset.cData[2]];
	if(filter === 'all'){
		$("#dropDown_1").css('display', 'none');
		$('#ddList_0 li:last-child').html('<a href="#">All (' + FT.Interactive.dataset.standardQuestions.n + ')</a>');
		$('#dd_title_0').html('All (' + FT.Interactive.dataset.standardQuestions.n + ')');
		$("div#tab_0 div#allPies div#container_pie").css('display', 'none');
		setDataSeries(chart_0, getPieDataSeries(FTi.standardQuestions.pies.pie, false));
	} else {
		$("#dropDown_1").css('display', 'block');
		//crTab_0_ContentPlus();
		setDataSeries(chart_1, getPieDataSeries(FTi.standardQuestions.pies.pie, true));
	}
		
	var _d0={ name: "'Friendly' or 'very friendly' to business'", data: [] };
	var _d1={ name: "'Unfriendly' or 'very unfriendly to business'", data: [] };
	$(FTi.standardQuestions.countryFriendliness.country)
		.each( function(i){
			_d0.data.push({ y: Math.round(Number(this.friendly)), });
			_d1.data.push({ y: Math.round(Number(this.unfriendly)), });
		});
	chart_2.series[0].setData(_d0.data);
	chart_2.series[1].setData(_d1.data);
		
	var _d={ name: FT.Interactive.dataset.cData[2], data: [] };
	$(FTi.standardQuestions.threats.dataItem).each( function(i){ _d.data.push({y:Math.round(Number(this.content)), }) });
	chart_3.series[0].setData(_d.data, true); 
	FT.Interactive.chkDataObj(FT.Interactive.dataset,0,[yr, qtr, 'topical']);
	//console.log("tab id: " + FT.Interactive.tPointer);
	FT.Interactive.wrBlurb(FT.Interactive.tPointer);
};
	
function setDataSeries(chartObj, datasets){
	$.each(datasets, function(index, value) {
		chartObj.series[index].setData(value.data, true);
	});
};
	
function crTabs(){
	$("#divNav ul li a").bind("click", function(event){
		var p = this.id.split('_')[1]; // pointer!
		//console.log('p=' + p);
		FT.Interactive.tPointer = p;
		FT.Interactive.wrBlurb(FT.Interactive.tPointer);
		var hash = getHashTag().split('/');
		var arr= ['confidence','friendliness','risk','current'];
		setHashTag('/' + hash[1] + '/' + hash[2] + '/' + arr[p]);
		setStage(FT.Interactive.tPointer);
	});
	return true;
};
	
function setStage(id){
	showHideNav(id);
	showHidePanel(id);
	//if(!FT.Interactive.appBuild){ FT.Interactive.(id); }
	//FT.Interactive.wrBlurb(id);
	/*
	if(id == 3){
		delete pageBuild;
		delete pageReBuild;
		$.getScript('http://interactive.ftdata.co.uk/Barometer_Microsite/pages/ci_' + FT.Interactive.dataset.cData[0] + '_q' + FT.Interactive.dataset.cData[1] + '.js')
	}
	*/
};
	
function crTab_0_Content(){
	var FTi = FT.Interactive.dataset[FT.Interactive.dataset.cData[0]][FT.Interactive.dataset.cData[1]]['all'];
	FT.Interactive.options_0.series = getPieDataSeries(FTi.standardQuestions.pies.pie, false);
	FT.Interactive.options_0.colors = FT.Interactive.globalPieColours;
	chart_0 = new Highcharts.Chart(FT.Interactive.options_0);
	return true;
};
	
function crTab_0_ContentPlus(){
	var FTi = 	FT.Interactive.dataset[FT.Interactive.dataset.cData[0]][FT.Interactive.dataset.cData[1]][FT.Interactive.dataset.cData[2]];
	FT.Interactive.options_1.series = getPieDataSeries(FTi.standardQuestions.pies.pie, true);
	FT.Interactive.options_1.colors = FT.Interactive.pieColours;
	chart_1 = new Highcharts.Chart(FT.Interactive.options_1);
	return true;
};
	
function crTab_1_Content(){
	var FTi = 	FT.Interactive.dataset[FT.Interactive.dataset.cData[0]][FT.Interactive.dataset.cData[1]][FT.Interactive.dataset.cData[2]];
	var fTable = FTi.standardQuestions.countryFriendliness.country;
	var fTableStr = '';	
	for(var i=0; i<fTable.length; i++){
		fTableStr += '<tr>';
		fTableStr += '<td>' + fTable[i].name + '</td>';
		for(var j=0; j<5; j++){
			fTableStr += '<td>' + Number(fTable[i].option[j].content).toFixed(1) + '</td>';
		}
		fTableStr += '</tr>';
	};
		
	$('#container_friendliness_table tbody').html(fTableStr);
	$("#friendlyTable").tablesorter( {	 widgets: ['zebra'], sortList:[[1,1]] });
		
	var _d0={
			name: "'Friendly' or 'very friendly' to business'",
			data: []
		};
	var _d1={
			name: "'Unfriendly' or 'very unfriendly to business'",
			data: []
		};
	var _sFriendly=[];
	$(FTi.standardQuestions.countryFriendliness.country)
		.each( function(i){
			_sFriendly.push($(this).attr('name'));
					
			_d0.data.push({
				y: Math.round(Number(this.friendly)),
			});
			_d1.data.push({
				y: Math.round(Number(this.unfriendly)),
			});
		});
			
	FT.Interactive.options_2.xAxis.categories = _sFriendly;
	FT.Interactive.options_2.title.text = '<br>';
	FT.Interactive.options_2.subtitle.text = '<b>How businesses see governments</b> (% of respondents)<br><br>';
	FT.Interactive.options_2.series = [];
	FT.Interactive.options_2.series.push(_d0);
	FT.Interactive.options_2.series.push(_d1);
	//FT.Interactive.options_2.series = FT.Interactive.dataFriendliness;
	$("#container_friendliness").empty();
	chart_2 = new Highcharts.Chart(FT.Interactive.options_2);
	return true; 
};
	
function crTab_2_Content(){
	var FTi = 	FT.Interactive.dataset[FT.Interactive.dataset.cData[0]][FT.Interactive.dataset.cData[1]][FT.Interactive.dataset.cData[2]];
	FT.Interactive.options_3.xAxis.categories = [];
	FT.Interactive.options_3.series = [];
	$(FTi.standardQuestions.threats)
		.each( function(i){
			var _d={
					name: '',
					data: []
					};
			var _s=[];
			var item;
			for(item in this.dataItem){
				if(item == 'name'){
					_d.name = this.dataItem[item].name;
						
				} else {
					_s.push(this.dataItem[item].name);
					_d.data.push({
						y: Math.round(Number(this.dataItem[item].content)),
					});
				}
			}
			FT.Interactive.options_3.xAxis.categories = _s;
			FT.Interactive.options_3.series.push(_d);
		});
	$("#container_barRisks").empty();
	chart_3 = new Highcharts.Chart(FT.Interactive.options_3);
	return true;
};
	
function createEvents(){
	//console.log('func:createEvents');
	$("#ddList_0 li").bind("click", function() {
		$("#dd_title_0").empty();
		$("#dd_title_0").append($(this).text());
		wrDropDownLabel('2. ' + $(this).text().split(' ')[1].toUpperCase() + ' (NO. OF RESPONDENTS)');
		if(this.id == 4){
			$("#dropDown_1").css('display', 'none');
			$("div#tab_0 div#allPies div#container_pie").css('display', 'none');
			wrChartLabel('All respondents');
		} else {
			var FTi = FT.Interactive.dataset;
			$("#dd_title_1").html("All");
			$("#ddList_1").html("");
			var tList = ['region','sector','job','size'];
			for(var i=0; i< FTi.filtermenus.item.length; i++){
				if(FTi.filtermenus.item[i].menu == tList[this.id]){
					$("#ddList_1").append("<li id= " + $("#ddList_1 li").length + "><a data-menu='" + FTi.filtermenus.item[i].code + "'>" +  FTi.filtermenus.item[i].label + "<span style='font-size:11px'><i> (" + FTi.filtermenus.item[i].n + ")</i></span></a></li>");
				}
			}
			$("#dropDown_1").css('display', 'block');
			$("#ddList_1 li").unbind();
			$("#ddList_1 li").bind("click", function() {
				$("#dd_title_1").empty();
				$("#dd_title_1").append('<b>' + $(this).text() + '</b>');
				wrChartLabel($(this).text().substr(0, $(this).text().length-5));
				$("div#tab_0 div#allPies div#container_pie").css('display', 'block');
				FTi.cData[2] = $(this).find('a').attr('data-menu');
				//if(FT.Interactive.topical){
					//FT.Interactive.topical.pageData();
				//}
				loadDataset(FTi.cData[0],FTi.cData[1],$(this).find('a').attr('data-menu'));
			});
		};	
	});
};
function wrChartLabel(str){
	$('#chartLabel').text(str);
};
function wrDropDownLabel(str){
	$('#ddSection').html(str);
};
/*
	function list end
*/

	// initiate process
	$("#dropDown_1").css('display', 'none');
	$('#dropDown_0').click(function () { $('#ddList_0').toggle(); });
	$('#dropDown_1').click(function () { $('#ddList_1').toggle(); });
	setStage(0); 
	getSourcesList();
});