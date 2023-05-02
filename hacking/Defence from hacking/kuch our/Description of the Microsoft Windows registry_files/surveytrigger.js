var animationFPS = 65;
var animationDuration;
var stduration = Math.round(1000*(1/animationFPS));
var movementPX = false;
var surveyHeight;
var surveyWidth;
var surveyObj;
var surveyLoadRetryMax = 2;
var surveyLoadRetryTimeout = 500;
var surveyLoadRetrys = 0;

function triggerInit()
{
	var MiliDay = 86400000;
	var maturity = 1;
	var curDate = new Date();
	var visits = fetchcookieval(CookieDef);
	var parts = visits.split('_');
	if(null == visits || parts.length != 2 || isNaN(parts[0]))
	{
		setcookieval(CookieDef, '1_' + (curDate.getTime()/MiliDay - Exp));
		return false;
	}
	else
	{
		var origDate = parseInt(parts[1]);
		visits = parseInt(parts[0]);
		if
		(
			((!isNaN(Freq)) && (Freq > 0)) && ((visits >= maturity) && ((curDate.getTime()/MiliDay - Exp) >= origDate) && (Math.floor(Math.random() * Freq) == 0))
		)
		{
			setcookieval(CookieDef, visits+1 + '_' + curDate.getTime()/MiliDay);
			return true;
		}
		else
		{
			setcookieval(CookieDef, visits+1 + '_' + parts[1]);
			return false;
		}
	}
}

function fireTrigger(SurveyURL)
{
	if(triggerInit())
	{		
		var sSiteID = '', sSiteRegionID = '', sReferringURL = '', P0 = '', P1 = '', P2 = '', P3 = '', P4 = '', P5 = '', P6 = '', P7 = '', P8 = '', P9 = '';		
		if(fireTrigger.arguments.length > 1){sSiteID = fireTrigger.arguments[1];}
		if(fireTrigger.arguments.length > 2){sSiteRegionID = fireTrigger.arguments[2];}
		if(fireTrigger.arguments.length > 3){sReferringURL = fireTrigger.arguments[3];}
		if(fireTrigger.arguments.length > 4){P0 = fireTrigger.arguments[4];}
		if(fireTrigger.arguments.length > 5){P1 = fireTrigger.arguments[5];}
		if(fireTrigger.arguments.length > 6){P2 = fireTrigger.arguments[6];}
		if(fireTrigger.arguments.length > 7){P3 = fireTrigger.arguments[7];} 
		if(fireTrigger.arguments.length > 8){P4 = fireTrigger.arguments[8];}
		if(fireTrigger.arguments.length > 9){P5 = fireTrigger.arguments[9];}		
		if(fireTrigger.arguments.length > 12){P8 = fireTrigger.arguments[12];}
		if(fireTrigger.arguments.length > 13){P9 = fireTrigger.arguments[13];}	
		
		var fullURL = SurveyURL + '&site=' + sSiteID + '&sd=' + sSiteID + '&SurveyStyle=' + SurveyStyle + '&siteregion=' + sSiteRegionID + '&url=' + sReferringURL + '&p0=' + P0 + '&p1=' + P1 + '&p2=' + P2 + '&p3=' + P3 + '&p4=' + P4 + '&p5=' + P5 + '&p6=' + P6 + '&p7=' + P7 + '&p8=' + P8 + '&p9=' + P9;
		
		if (EmailStyle == 1)
			fullURL = fullURL + '&emailsurveyid=' + EmailSurveyID + '&sessionid=-1';
				
		if (DisplayIntroPage != '1')
			fullURL = fullURL + '&showpage=1';		
		if (SurveyStyle == null)
			SurveyStyle = "popup";		
		SurveyStyle = SurveyStyle.toLowerCase();
		if (SurveyStyle == "embedded"){
			if (embedSurveyPrompt == 'nothing') 
				window.location.href=fullURL;
			else
			{			
				if (embedSurveyPrompt != "" && window.screenTop<10000 && window.confirm(embedSurveyPrompt) == true) //unload event
				{
					// we can not do a window.location.href for the redirection because when refreshing the window that redirection won't work
					// Optimally if it is refreshing, we should not do survey. But we have no way to know it is refreshing window, so we keep the behavior same				
					document.writeln('<html><body>');
					document.writeln('<form name="the_form" action="' + fullURL + '" method="post"><\/form>');
					document.writeln("<\/body><\/html>");
					document.the_form.submit();
				}					
			}
		}else{			
			fullURL = fullURL.toLowerCase().replace("survey.aspx", "surveyinvite.aspx");
			if (DisplayIntroPage == '1')
				fullURL = fullURL + '&showpage=1'; //always add &showpage=1
			if (document.location.href.toLowerCase().indexOf('fr=1') > 0)
				fullURL = fullURL + '&fr=1';
			fireSurvey(fullURL);					
		}
	}
}

function fireSurvey(fullURL){		
		presentSurvey(fullURL);
		if(window.attachEvent) window.attachEvent("onresize", animateSurvey);
		else if(window.addEventListener) window.addEventListener("resize", animateSurvey, false);	
}

function surveyDiv(fullURL){
	var sd = document.createElement("div");		
	sd.id = "surveyDivBlock";
	sd.className = "surveyDiv";	
	var si = document.createElement("iframe");
	si.scrolling = 'no';	
	si.frameborder = 0;
	si.width = 600;	
	si.src = fullURL;	
	sd.appendChild(si);
	return sd;
}
function hI(name, value){
	var inp = document.createElement("input");
	inp.type = "hidden";
	inp.name = name;
	inp.value = value;
	return inp;
}
function declineSurvey(el){
	while(el.className != "surveyDiv") el = el.parentNode;
	el.parentNode.removeChild(el);
}

function closeEnough(int1, int2){
	if(Math.abs(int1-int2) <= movementPX) return true;
	return false;
}

function placeXY(p, x, y){
	eval("var z = parseInt("+p+",10);");
	var cent = x-(y/2);
	if(!closeEnough(z, cent)){
		var dir = (z-cent)/Math.abs(z-cent);
		eval(p+" = "+(z-(movementPX*dir)));
		return true;
	}
	return false;
}

function animateSurvey(){
	var wh = Math.round(fbp(window.innerHeight, document.body.clientHeight)/2);
	var ww = Math.round(fbp(window.innerWidth, document.body.clientWidth)/2);	
	var cont = placeXY("surveyObj.style.top", wh, surveyHeight);	
	if(placeXY("surveyObj.style.left", ww, surveyWidth)) cont = true;	
	if(cont) setTimeout("animateSurvey()", stduration);
	surveyObj.style.width = surveyWidth;
	surveyObj.style.height = surveyHeight;
}

function fbp(p1, p2){
	if(!p1|| p1 < 1) return p2
	return p1;
}

function calcFPS(){
	if(!animationDuration) animationDuration = 0.5;
	if(movementPX == false){
	
		var x = getPositionDelta("Width");
		var y = getPositionDelta("Height");
		
		if(y > x) x = y;
		
		var t = animationDuration * animationFPS;
		movementPX = Math.ceil(x / t);
	}
}

function getPositionDelta(dim){
	var wh;
	eval("wh = Math.round(fbp(window.inner"+dim+", document.body.client"+dim+")/2);");
	var sh;
	eval("sh = surveyObj.client"+dim+"/2;");
	return Math.abs(wh - sh);
}

function placeSurvey(){				
	if (surveyObj.style.top == '0px')
	{
		calcFPS();
		animateSurvey();
	}
	else{
		if (surveyLoadRetrys < surveyLoadRetryMax){
			surveyLoadRetrys ++;
			setTimeout("placeSurvey()", surveyLoadRetryTimeout);	
		}
		else
			surveyObj.style.display = 'none';
	}	
}

function presentSurvey(fullURL){	
	surveyObj = surveyDiv(fullURL);						
	document.body.appendChild(surveyObj);	
	var ww = fbp(window.innerWidth, document.body.clientWidth);			
	surveyWidth = fbp(surveyObj.clientWidth, surveyObj.offsetWidth);
	surveyHeight = fbp(surveyObj.clientHeight, surveyObj.offsetHeight);
	surveyObj.style.left = Math.round((ww/2)-(surveyWidth/2));
	surveyObj.style.top = -2000;//put it in a hidden place so user won't see it before it is loaded
	placeSurvey();			
}