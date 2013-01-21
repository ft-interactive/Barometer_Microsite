function yqlUrl(url){
	//console.log('func:yqlUrl');
	return 'http://query.yahooapis.com/v1/public/yql?q='+encodeURIComponent("select * from xml where url='" + url + "'")+'&format=json&diagnostics=true&callback=?';
};
	
function getSourcesList(){
	//console.log('func:getSourcesList');
	$.getJSON(yqlUrl('http://interactive.ftdata.co.uk/data/ft.interactive.data_v2.php?_cf=233'), function(ds){}).success(wrDateSelector);
}
	
function wrDateSelector(ds){
	console.log('func:wrDateSelector');
	FT.Interactive.conf = {sourcesList: ds.query.results.dataset.dateMenu.survey};
	fillDataList();
	$('#selectYr').click(function () { $('#yrList').slideToggle('fast'); });
	$('div#selectYr ul#yrList.the_menu li').bind("click", function(event){
		$('#selectYrStart').html($('div#selectYr ul#yrList.the_menu li:nth-child(' + ( $(this).index() +1) + ') a ').html());
		var dTmp = $(this).attr("data-value").split('_');
		loadDataset(dTmp[0], dTmp[1], 'all');
	});
	var hTag = '';
	if(getHashTag() !== ''){
		hTag = getHashTag();
		FT.Interactive.dataset.cData = [hTag.split('/')[1], hTag.split('/')[2], 'all']; 
	} else {
		FT.Interactive.dataset.cData = [FT.Interactive.conf.sourcesList[0].year, FT.Interactive.conf.sourcesList[0].quarter, 'all'];
		setHashTag('#/' + FT.Interactive.conf.sourcesList[0].year + '/' + FT.Interactive.conf.sourcesList[0].quarter + '/confidence');
	}
	setYrStart();
	loadDataset(FT.Interactive.dataset.cData[0], FT.Interactive.dataset.cData[1], FT.Interactive.dataset.cData[2]);
};

function getHashTag(){ return window.location.hash; };

function setHashTag(val){ window.location.hash = val; };

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
	console.log('func:loadDataset:' + yr +':' + qtr + ':' + filter);
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
	
	$.getJSON(yqlUrl(tUrl), function(ds){
		FT.Interactive.dataset[yr][qtr][filter] = ds.query.results.dataset;
		// if true first build
		FT.Interactive.appBuild? iniPanels(ds,yr,qtr,filter): updatePanels(ds,yr,qtr,filter);
	});
	
}
	
function iniPanels(ds,yr,qtr,filter){
	console.log('func:iniPanels');
	// this needs reduction
	FT.Interactive.dataset.pagefurniture = ds.query.results.dataset.pagefurniture;
	FT.Interactive.dataset.barometerConfig = ds.query.results.dataset.barometerConfig;
	FT.Interactive.dataset.filtermenus = ds.query.results.dataset.filtermenus;
	FT.Interactive.dataset.standardQuestions = ds.query.results.dataset.standardQuestions;
	//initGraphic(FT.Interactive.dataset.pagefurniture);
	FT.Interactive.appBuild = false;
	crTabs();
	FT.Interactive.wrBlurb(0);
	crTab_0_Content();
	crTab_0_ContentPlus();
	if(FT.Interactive.dataset.cData[2] != 'all'){ 
		crTab_0_ContentPlus();
		$("div#tab_0 div#allPies div#container_pie").css('display', 'block');
	} else {
		$("#dropDown_1").css('display', 'none');
		$('#ddList_0 li:last-child').html('<a href="javascript:void(0)">All (' + ds.query.results.dataset.standardQuestions.n + ')</a>');
		$('#dd_title_0').html('All (' + ds.query.results.dataset.standardQuestions.n + ')');
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
	console.log('filter=' + filter);
	FTi = 	FT.Interactive.dataset[FT.Interactive.dataset.cData[0]][FT.Interactive.dataset.cData[1]][FT.Interactive.dataset.cData[2]];
	if(filter === 'all'){
		$("#dropDown_1").css('display', 'none');
		$('#ddList_0 li:last-child').html('<a href="#">All (' + ds.query.results.dataset.standardQuestions.n + ')</a>');
		$('#dd_title_0').html('All (' + ds.query.results.dataset.standardQuestions.n + ')');
		$("div#tab_0 div#allPies div#container_pie").css('display', 'none');
		setDataSeries(chart_0, getPieDataSeries(FTi.standardQuestions.pies.pie));
	} else {
		$("#dropDown_1").css('display', 'block');
		//crTab_0_ContentPlus();
		setDataSeries(chart_1, getPieDataSeries(FTi.standardQuestions.pies.pie));
	}
		
	var _d0={ name: "'Friendly' or 'very friendly' to business'", data: [] };
	var _d1={ name: "'Unfriendly' or 'very unfriendly to business'", data: [] };
	$(FTi.standardQuestions.countryFriendliness.country)
		.each( function(i){
			_d0.data.push({ y: Math.round(Number(this.friendly)), });
			_d1.data.push({ y: Math.round(Number(this.unfriendly)), });
		});
	chart_2.series[0].setData(_d0.data);
	chart_2.series[0].setData(_d0.data);
		
	var _d={ name: FT.Interactive.dataset.cData[2], data: [] };
	$(FTi.standardQuestions.threats.dataItem).each( function(i){ _d.data.push({y:Math.round(Number(this.content)), }) });
	chart_3.series[0].setData(_d.data, true); 
	FT.Interactive.chkDataObj(FT.Interactive.dataset,0,[yr, qtr, 'topical']);
		
};
	
function setDataSeries(chartObj, datasets){
	$.each(datasets, function(index, value) {
		chartObj.series[index].setData(value.data, true);
	});
};
	
function crTabs(){
	$("#divNav ul li a").bind("click", function(event){
		var p = this.id.split('_')[1]; // pointer!
		var hash = getHashTag().split('/');
		var arr= ['confidence','friendliness','risk','current'];
		setHashTag('/' + hash[1] + '/' + hash[2] + '/' + arr[p])
		setStage(p);
	});
	return true;
};
	
function setStage(id){
	showHideNav(id);
	showHidePanel(id);
	if(!FT.Interactive.appBuild){ FT.Interactive.wrBlurb(id); }
	if(id === '3'){
		$.getScript('http://interactive.ftdata.co.uk/Barometer_Microsite/pages/ci_' + FT.Interactive.dataset.cData[0] + '_q' + FT.Interactive.dataset.cData[1] + '.js')
	}
};
	
function crTab_0_Content(){
	console.log('func:crTab_0_Content');
	var FTi = FT.Interactive.dataset[FT.Interactive.dataset.cData[0]][FT.Interactive.dataset.cData[1]]['all'];
	FT.Interactive.options_0.series = getPieDataSeries(FTi.standardQuestions.pies.pie);
	FT.Interactive.options_0.colors = FT.Interactive.globalPieColours;
	console.log(FT.Interactive.options_0);
	chart_0 = new Highcharts.Chart(FT.Interactive.options_0);
	return true;
};
	
function crTab_0_ContentPlus(){
	console.log('func:crTab_0_ContentPlus');
	var FTi = 	FT.Interactive.dataset[FT.Interactive.dataset.cData[0]][FT.Interactive.dataset.cData[1]][FT.Interactive.dataset.cData[2]];
	FT.Interactive.options_1.series = getPieDataSeries(FTi.standardQuestions.pies.pie);
	FT.Interactive.options_1.colors = FT.Interactive.globalPieColours;
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
	//chart_3 && chart_3.destroy();
	//chart_3 = null;
	chart_3 = new Highcharts.Chart(FT.Interactive.options_3);
	return true;
};
	
function createEvents(){
	$("#ddList_0 li").bind("click", function() {
		$("#dd_title_0").empty();
		$("#dd_title_0").append($(this).text());
		if(this.id == 4){
			$("#dropDown_1").css('display', 'none');
			$("div#tab_0 div#allPies div#container_pie").css('display', 'none');
		} else {
			var FTi = FT.Interactive.dataset;
			$("#dd_title_1").html("All");
			$("#ddList_1").html("");
			for(var i=0; i< FTi.filtermenus.item.length; i++){
				if(this.id == 0 && FTi.filtermenus.item[i].menu == 'region'){
					$("#ddList_1").append("<li id= " + $("#ddList_1 li").length + "><a data-menu='" + FTi.filtermenus.item[i].code + "'>" +  FTi.filtermenus.item[i].label + "<span style='font-size:11px'><i> (" + FTi.filtermenus.item[i].n + ")</i></span></a></li>");
				} else if(this.id == 1 && FTi.filtermenus.item[i].menu == 'sector'){
					$("#ddList_1").append("<li id= " + $("#ddList_1 li").length + "><a data-menu='" + FTi.filtermenus.item[i].code + "'>" +  FTi.filtermenus.item[i].label + "<span style='font-size:11px'><i> (" + FTi.filtermenus.item[i].n + ")</i></span></a></li>");
				} else if(this.id == 2 && FTi.filtermenus.item[i].menu == 'job'){
					$("#ddList_1").append("<li id= " + $("#ddList_1 li").length + "><a data-menu='" + FTi.filtermenus.item[i].code + "'>" +  FTi.filtermenus.item[i].label + "<span style='font-size:11px'><i> (" + FTi.filtermenus.item[i].n + ")</i></span></a></li>");
				} else if(this.id == 3 && FTi.filtermenus.item[i].menu == 'size'){
					$("#ddList_1").append("<li id= " + $("#ddList_1 li").length + "><a data-menu='" + FTi.filtermenus.item[i].code + "'>" +  FTi.filtermenus.item[i].label + "<span style='font-size:11px'><i> (" + FTi.filtermenus.item[i].n + ")</i></span></a></li>");
				} else {
					// nothing selected
				}
			}
			$("#dropDown_1").css('display', 'block');
			$("#ddList_1 li").unbind();
			$("#ddList_1 li").bind("click", function() {
				$("#dd_title_1").empty();
				$("#dd_title_1").append($(this).text());
				$("div#tab_0 div#allPies div#container_pie").css('display', 'block');
				loadDataset(FTi.cData[0],FTi.cData[1],$(this).find('a').attr('data-menu'));
			});
		};
			
	});
};

$(document).ready( function(){
	
	// initiate process
	$("#dropDown_1").css('display', 'none');
	$('#dropDown_0').click(function () { $('#ddList_0').slideToggle('fast'); });
	$('#dropDown_1').click(function () { $('#ddList_1').slideToggle('fast'); });
	
	/*if(getHashTag() === ''){
		setStage(0);
	} else {
		var pArr = getHashTag().split('/');
		var arr= ['confidence','friendliness','risk','current'];
		for(var i=0; i<arr.length; i++){
			if(arr[i] === pArr[3]){
				setStage(i);
			}
		}
	};*/
	setStage(0);
	getSourcesList();
	
});