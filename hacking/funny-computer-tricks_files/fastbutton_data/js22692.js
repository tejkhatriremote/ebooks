(function($,_1){
$.ui=$.ui||{};
if($.ui.version){
return;
}
$.extend($.ui,{version:"1.8.13",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}});
$.fn.extend({_focus:$.fn.focus,focus:function(_2,fn){
return typeof _2==="number"?this.each(function(){
var _3=this;
setTimeout(function(){
$(_3).focus();
if(fn){
fn.call(_3);
}
},_2);
}):this._focus.apply(this,arguments);
},scrollParent:function(){
var _4;
if(($.browser.msie&&(/(static|relative)/).test(this.css("position")))||(/absolute/).test(this.css("position"))){
_4=this.parents().filter(function(){
return (/(relative|absolute|fixed)/).test($.curCSS(this,"position",1))&&(/(auto|scroll)/).test($.curCSS(this,"overflow",1)+$.curCSS(this,"overflow-y",1)+$.curCSS(this,"overflow-x",1));
}).eq(0);
}else{
_4=this.parents().filter(function(){
return (/(auto|scroll)/).test($.curCSS(this,"overflow",1)+$.curCSS(this,"overflow-y",1)+$.curCSS(this,"overflow-x",1));
}).eq(0);
}
return (/fixed/).test(this.css("position"))||!_4.length?$(document):_4;
},zIndex:function(_5){
if(_5!==_1){
return this.css("zIndex",_5);
}
if(this.length){
var _6=$(this[0]),_7,_8;
while(_6.length&&_6[0]!==document){
_7=_6.css("position");
if(_7==="absolute"||_7==="relative"||_7==="fixed"){
_8=parseInt(_6.css("zIndex"),10);
if(!isNaN(_8)&&_8!==0){
return _8;
}
}
_6=_6.parent();
}
}
return 0;
},disableSelection:function(){
return this.bind(($.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(_9){
_9.preventDefault();
});
},enableSelection:function(){
return this.unbind(".ui-disableSelection");
}});
$.each(["Width","Height"],function(i,_a){
var _b=_a==="Width"?["Left","Right"]:["Top","Bottom"],_c=_a.toLowerCase(),_d={innerWidth:$.fn.innerWidth,innerHeight:$.fn.innerHeight,outerWidth:$.fn.outerWidth,outerHeight:$.fn.outerHeight};
function _e(_f,_10,_11,_12){
$.each(_b,function(){
_10-=parseFloat($.curCSS(_f,"padding"+this,true))||0;
if(_11){
_10-=parseFloat($.curCSS(_f,"border"+this+"Width",true))||0;
}
if(_12){
_10-=parseFloat($.curCSS(_f,"margin"+this,true))||0;
}
});
return _10;
};
$.fn["inner"+_a]=function(_13){
if(_13===_1){
return _d["inner"+_a].call(this);
}
return this.each(function(){
$(this).css(_c,_e(this,_13)+"px");
});
};
$.fn["outer"+_a]=function(_14,_15){
if(typeof _14!=="number"){
return _d["outer"+_a].call(this,_14);
}
return this.each(function(){
$(this).css(_c,_e(this,_14,true,_15)+"px");
});
};
});
function _16(_17,_18){
var _19=_17.nodeName.toLowerCase();
if("area"===_19){
var map=_17.parentNode,_1a=map.name,img;
if(!_17.href||!_1a||map.nodeName.toLowerCase()!=="map"){
return false;
}
img=$("img[usemap=#"+_1a+"]")[0];
return !!img&&_1b(img);
}
return (/input|select|textarea|button|object/.test(_19)?!_17.disabled:"a"==_19?_17.href||_18:_18)&&_1b(_17);
};
function _1b(_1c){
return !$(_1c).parents().andSelf().filter(function(){
return $.curCSS(this,"visibility")==="hidden"||$.expr.filters.hidden(this);
}).length;
};
$.extend($.expr[":"],{data:function(_1d,i,_1e){
return !!$.data(_1d,_1e[3]);
},focusable:function(_1f){
return _16(_1f,!isNaN($.attr(_1f,"tabindex")));
},tabbable:function(_20){
var _21=$.attr(_20,"tabindex"),_22=isNaN(_21);
return (_22||_21>=0)&&_16(_20,!_22);
}});
$(function(){
var _23=document.body,div=_23.appendChild(div=document.createElement("div"));
$.extend(div.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0});
$.support.minHeight=div.offsetHeight===100;
$.support.selectstart="onselectstart" in div;
_23.removeChild(div).style.display="none";
});
$.extend($.ui,{plugin:{add:function(_24,_25,set){
var _26=$.ui[_24].prototype;
for(var i in set){
_26.plugins[i]=_26.plugins[i]||[];
_26.plugins[i].push([_25,set[i]]);
}
},call:function(_27,_28,_29){
var set=_27.plugins[_28];
if(!set||!_27.element[0].parentNode){
return;
}
for(var i=0;i<set.length;i++){
if(_27.options[set[i][0]]){
set[i][1].apply(_27.element,_29);
}
}
}},contains:function(a,b){
return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b);
},hasScroll:function(el,a){
if($(el).css("overflow")==="hidden"){
return false;
}
var _2a=(a&&a==="left")?"scrollLeft":"scrollTop",has=false;
if(el[_2a]>0){
return true;
}
el[_2a]=1;
has=(el[_2a]>0);
el[_2a]=0;
return has;
},isOverAxis:function(x,_2b,_2c){
return (x>_2b)&&(x<(_2b+_2c));
},isOver:function(y,x,top,_2d,_2e,_2f){
return $.ui.isOverAxis(y,top,_2e)&&$.ui.isOverAxis(x,_2d,_2f);
}});
})(jQuery);
(function($,_30){
if($.cleanData){
var _31=$.cleanData;
$.cleanData=function(_32){
for(var i=0,_33;(_33=_32[i])!=null;i++){
$(_33).triggerHandler("remove");
}
_31(_32);
};
}else{
var _34=$.fn.remove;
$.fn.remove=function(_35,_36){
return this.each(function(){
if(!_36){
if(!_35||$.filter(_35,[this]).length){
$("*",this).add([this]).each(function(){
$(this).triggerHandler("remove");
});
}
}
return _34.call($(this),_35,_36);
});
};
}
$.widget=function(_37,_38,_39){
var _3a=_37.split(".")[0],_3b;
_37=_37.split(".")[1];
_3b=_3a+"-"+_37;
if(!_39){
_39=_38;
_38=$.Widget;
}
$.expr[":"][_3b]=function(_3c){
return !!$.data(_3c,_37);
};
$[_3a]=$[_3a]||{};
$[_3a][_37]=function(_3d,_3e){
if(arguments.length){
this._createWidget(_3d,_3e);
}
};
var _3f=new _38();
_3f.options=$.extend(true,{},_3f.options);
$[_3a][_37].prototype=$.extend(true,_3f,{namespace:_3a,widgetName:_37,widgetEventPrefix:$[_3a][_37].prototype.widgetEventPrefix||_37,widgetBaseClass:_3b},_39);
$.widget.bridge(_37,$[_3a][_37]);
};
$.widget.bridge=function(_40,_41){
$.fn[_40]=function(_42){
var _43=typeof _42==="string",_44=Array.prototype.slice.call(arguments,1),_45=this;
_42=!_43&&_44.length?$.extend.apply(null,[true,_42].concat(_44)):_42;
if(_43&&_42.charAt(0)==="_"){
return _45;
}
if(_43){
this.each(function(){
var _46=$.data(this,_40),_47=_46&&$.isFunction(_46[_42])?_46[_42].apply(_46,_44):_46;
if(_47!==_46&&_47!==_30){
_45=_47;
return false;
}
});
}else{
this.each(function(){
var _48=$.data(this,_40);
if(_48){
_48.option(_42||{})._init();
}else{
$.data(this,_40,new _41(_42,this));
}
});
}
return _45;
};
};
$.Widget=function(_49,_4a){
if(arguments.length){
this._createWidget(_49,_4a);
}
};
$.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:false},_createWidget:function(_4b,_4c){
$.data(_4c,this.widgetName,this);
this.element=$(_4c);
this.options=$.extend(true,{},this.options,this._getCreateOptions(),_4b);
var _4d=this;
this.element.bind("remove."+this.widgetName,function(){
_4d.destroy();
});
this._create();
this._trigger("create");
this._init();
},_getCreateOptions:function(){
return $.metadata&&$.metadata.get(this.element[0])[this.widgetName];
},_create:function(){
},_init:function(){
},destroy:function(){
this.element.unbind("."+this.widgetName).removeData(this.widgetName);
this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled "+"ui-state-disabled");
},widget:function(){
return this.element;
},option:function(key,_4e){
var _4f=key;
if(arguments.length===0){
return $.extend({},this.options);
}
if(typeof key==="string"){
if(_4e===_30){
return this.options[key];
}
_4f={};
_4f[key]=_4e;
}
this._setOptions(_4f);
return this;
},_setOptions:function(_50){
var _51=this;
$.each(_50,function(key,_52){
_51._setOption(key,_52);
});
return this;
},_setOption:function(key,_53){
this.options[key]=_53;
if(key==="disabled"){
this.widget()[_53?"addClass":"removeClass"](this.widgetBaseClass+"-disabled"+" "+"ui-state-disabled").attr("aria-disabled",_53);
}
return this;
},enable:function(){
return this._setOption("disabled",false);
},disable:function(){
return this._setOption("disabled",true);
},_trigger:function(_54,_55,_56){
var _57=this.options[_54];
_55=$.Event(_55);
_55.type=(_54===this.widgetEventPrefix?_54:this.widgetEventPrefix+_54).toLowerCase();
_56=_56||{};
if(_55.originalEvent){
for(var i=$.event.props.length,_58;i;){
_58=$.event.props[--i];
_55[_58]=_55.originalEvent[_58];
}
}
this.element.trigger(_55,_56);
return !($.isFunction(_57)&&_57.call(this.element[0],_55,_56)===false||_55.isDefaultPrevented());
}};
})(jQuery);
(function($,_59){
var _5a=false;
$(document).mousedown(function(e){
_5a=false;
});
$.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){
var _5b=this;
this.element.bind("mousedown."+this.widgetName,function(_5c){
return _5b._mouseDown(_5c);
}).bind("click."+this.widgetName,function(_5d){
if(true===$.data(_5d.target,_5b.widgetName+".preventClickEvent")){
$.removeData(_5d.target,_5b.widgetName+".preventClickEvent");
_5d.stopImmediatePropagation();
return false;
}
});
this.started=false;
},_mouseDestroy:function(){
this.element.unbind("."+this.widgetName);
},_mouseDown:function(_5e){
if(_5a){
return;
}
(this._mouseStarted&&this._mouseUp(_5e));
this._mouseDownEvent=_5e;
var _5f=this,_60=(_5e.which==1),_61=(typeof this.options.cancel=="string"?$(_5e.target).parents().add(_5e.target).filter(this.options.cancel).length:false);
if(!_60||_61||!this._mouseCapture(_5e)){
return true;
}
this.mouseDelayMet=!this.options.delay;
if(!this.mouseDelayMet){
this._mouseDelayTimer=setTimeout(function(){
_5f.mouseDelayMet=true;
},this.options.delay);
}
if(this._mouseDistanceMet(_5e)&&this._mouseDelayMet(_5e)){
this._mouseStarted=(this._mouseStart(_5e)!==false);
if(!this._mouseStarted){
_5e.preventDefault();
return true;
}
}
if(true===$.data(_5e.target,this.widgetName+".preventClickEvent")){
$.removeData(_5e.target,this.widgetName+".preventClickEvent");
}
this._mouseMoveDelegate=function(_62){
return _5f._mouseMove(_62);
};
this._mouseUpDelegate=function(_63){
return _5f._mouseUp(_63);
};
$(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);
_5e.preventDefault();
_5a=true;
return true;
},_mouseMove:function(_64){
if($.browser.msie&&!(document.documentMode>=9)&&!_64.button){
return this._mouseUp(_64);
}
if(this._mouseStarted){
this._mouseDrag(_64);
return _64.preventDefault();
}
if(this._mouseDistanceMet(_64)&&this._mouseDelayMet(_64)){
this._mouseStarted=(this._mouseStart(this._mouseDownEvent,_64)!==false);
(this._mouseStarted?this._mouseDrag(_64):this._mouseUp(_64));
}
return !this._mouseStarted;
},_mouseUp:function(_65){
$(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);
if(this._mouseStarted){
this._mouseStarted=false;
if(_65.target==this._mouseDownEvent.target){
$.data(_65.target,this.widgetName+".preventClickEvent",true);
}
this._mouseStop(_65);
}
return false;
},_mouseDistanceMet:function(_66){
return (Math.max(Math.abs(this._mouseDownEvent.pageX-_66.pageX),Math.abs(this._mouseDownEvent.pageY-_66.pageY))>=this.options.distance);
},_mouseDelayMet:function(_67){
return this.mouseDelayMet;
},_mouseStart:function(_68){
},_mouseDrag:function(_69){
},_mouseStop:function(_6a){
},_mouseCapture:function(_6b){
return true;
}});
})(jQuery);
(function($,_6c){
$.widget("ui.sortable",$.ui.mouse,{widgetEventPrefix:"sort",options:{appendTo:"parent",axis:false,connectWith:false,containment:false,cursor:"auto",cursorAt:false,dropOnEmpty:true,forcePlaceholderSize:false,forceHelperSize:false,grid:false,handle:false,helper:"original",items:"> *",opacity:false,placeholder:false,revert:false,scroll:true,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1000},_create:function(){
var o=this.options;
this.containerCache={};
this.element.addClass("ui-sortable");
this.refresh();
this.floating=this.items.length?o.axis==="x"||(/left|right/).test(this.items[0].item.css("float"))||(/inline|table-cell/).test(this.items[0].item.css("display")):false;
this.offset=this.element.offset();
this._mouseInit();
},destroy:function(){
this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");
this._mouseDestroy();
for(var i=this.items.length-1;i>=0;i--){
this.items[i].item.removeData("sortable-item");
}
return this;
},_setOption:function(key,_6d){
if(key==="disabled"){
this.options[key]=_6d;
this.widget()[_6d?"addClass":"removeClass"]("ui-sortable-disabled");
}else{
$.Widget.prototype._setOption.apply(this,arguments);
}
},_mouseCapture:function(_6e,_6f){
if(this.reverting){
return false;
}
if(this.options.disabled||this.options.type=="static"){
return false;
}
this._refreshItems(_6e);
var _70=null,_71=this,_72=$(_6e.target).parents().each(function(){
if($.data(this,"sortable-item")==_71){
_70=$(this);
return false;
}
});
if($.data(_6e.target,"sortable-item")==_71){
_70=$(_6e.target);
}
if(!_70){
return false;
}
if(this.options.handle&&!_6f){
var _73=false;
$(this.options.handle,_70).find("*").andSelf().each(function(){
if(this==_6e.target){
_73=true;
}
});
if(!_73){
return false;
}
}
this.currentItem=_70;
this._removeCurrentsFromItems();
return true;
},_mouseStart:function(_74,_75,_76){
var o=this.options,_77=this;
this.currentContainer=this;
this.refreshPositions();
this.helper=this._createHelper(_74);
this._cacheHelperProportions();
this._cacheMargins();
this.scrollParent=this.helper.scrollParent();
this.offset=this.currentItem.offset();
this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};
this.helper.css("position","absolute");
this.cssPosition=this.helper.css("position");
$.extend(this.offset,{click:{left:_74.pageX-this.offset.left,top:_74.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});
this.originalPosition=this._generatePosition(_74);
this.originalPageX=_74.pageX;
this.originalPageY=_74.pageY;
(o.cursorAt&&this._adjustOffsetFromHelper(o.cursorAt));
this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]};
if(this.helper[0]!=this.currentItem[0]){
this.currentItem.hide();
}
this._createPlaceholder();
if(o.containment){
this._setContainment();
}
if(o.cursor){
if($("body").css("cursor")){
this._storedCursor=$("body").css("cursor");
}
$("body").css("cursor",o.cursor);
}
if(o.opacity){
if(this.helper.css("opacity")){
this._storedOpacity=this.helper.css("opacity");
}
this.helper.css("opacity",o.opacity);
}
if(o.zIndex){
if(this.helper.css("zIndex")){
this._storedZIndex=this.helper.css("zIndex");
}
this.helper.css("zIndex",o.zIndex);
}
if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){
this.overflowOffset=this.scrollParent.offset();
}
this._trigger("start",_74,this._uiHash());
if(!this._preserveHelperProportions){
this._cacheHelperProportions();
}
if(!_76){
for(var i=this.containers.length-1;i>=0;i--){
this.containers[i]._trigger("activate",_74,_77._uiHash(this));
}
}
if($.ui.ddmanager){
$.ui.ddmanager.current=this;
}
if($.ui.ddmanager&&!o.dropBehaviour){
$.ui.ddmanager.prepareOffsets(this,_74);
}
this.dragging=true;
this.helper.addClass("ui-sortable-helper");
this._mouseDrag(_74);
return true;
},_mouseDrag:function(_78){
this.position=this._generatePosition(_78);
this.positionAbs=this._convertPositionTo("absolute");
if(!this.lastPositionAbs){
this.lastPositionAbs=this.positionAbs;
}
if(this.options.scroll){
var o=this.options,_79=false;
if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){
if((this.overflowOffset.top+this.scrollParent[0].offsetHeight)-_78.pageY<o.scrollSensitivity){
this.scrollParent[0].scrollTop=_79=this.scrollParent[0].scrollTop+o.scrollSpeed;
}else{
if(_78.pageY-this.overflowOffset.top<o.scrollSensitivity){
this.scrollParent[0].scrollTop=_79=this.scrollParent[0].scrollTop-o.scrollSpeed;
}
}
if((this.overflowOffset.left+this.scrollParent[0].offsetWidth)-_78.pageX<o.scrollSensitivity){
this.scrollParent[0].scrollLeft=_79=this.scrollParent[0].scrollLeft+o.scrollSpeed;
}else{
if(_78.pageX-this.overflowOffset.left<o.scrollSensitivity){
this.scrollParent[0].scrollLeft=_79=this.scrollParent[0].scrollLeft-o.scrollSpeed;
}
}
}else{
if(_78.pageY-$(document).scrollTop()<o.scrollSensitivity){
_79=$(document).scrollTop($(document).scrollTop()-o.scrollSpeed);
}else{
if($(window).height()-(_78.pageY-$(document).scrollTop())<o.scrollSensitivity){
_79=$(document).scrollTop($(document).scrollTop()+o.scrollSpeed);
}
}
if(_78.pageX-$(document).scrollLeft()<o.scrollSensitivity){
_79=$(document).scrollLeft($(document).scrollLeft()-o.scrollSpeed);
}else{
if($(window).width()-(_78.pageX-$(document).scrollLeft())<o.scrollSensitivity){
_79=$(document).scrollLeft($(document).scrollLeft()+o.scrollSpeed);
}
}
}
if(_79!==false&&$.ui.ddmanager&&!o.dropBehaviour){
$.ui.ddmanager.prepareOffsets(this,_78);
}
}
this.positionAbs=this._convertPositionTo("absolute");
if(!this.options.axis||this.options.axis!="y"){
this.helper[0].style.left=this.position.left+"px";
}
if(!this.options.axis||this.options.axis!="x"){
this.helper[0].style.top=this.position.top+"px";
}
for(var i=this.items.length-1;i>=0;i--){
var _7a=this.items[i],_7b=_7a.item[0],_7c=this._intersectsWithPointer(_7a);
if(!_7c){
continue;
}
if(_7b!=this.currentItem[0]&&this.placeholder[_7c==1?"next":"prev"]()[0]!=_7b&&!$.ui.contains(this.placeholder[0],_7b)&&(this.options.type=="semi-dynamic"?!$.ui.contains(this.element[0],_7b):true)){
this.direction=_7c==1?"down":"up";
if(this.options.tolerance=="pointer"||this._intersectsWithSides(_7a)){
this._rearrange(_78,_7a);
}else{
break;
}
this._trigger("change",_78,this._uiHash());
break;
}
}
this._contactContainers(_78);
if($.ui.ddmanager){
$.ui.ddmanager.drag(this,_78);
}
this._trigger("sort",_78,this._uiHash());
this.lastPositionAbs=this.positionAbs;
return false;
},_mouseStop:function(_7d,_7e){
if(!_7d){
return;
}
if($.ui.ddmanager&&!this.options.dropBehaviour){
$.ui.ddmanager.drop(this,_7d);
}
if(this.options.revert){
var _7f=this;
var cur=_7f.placeholder.offset();
_7f.reverting=true;
$(this.helper).animate({left:cur.left-this.offset.parent.left-_7f.margins.left+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft),top:cur.top-this.offset.parent.top-_7f.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){
_7f._clear(_7d);
});
}else{
this._clear(_7d,_7e);
}
return false;
},cancel:function(){
var _80=this;
if(this.dragging){
this._mouseUp({target:null});
if(this.options.helper=="original"){
this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
}else{
this.currentItem.show();
}
for(var i=this.containers.length-1;i>=0;i--){
this.containers[i]._trigger("deactivate",null,_80._uiHash(this));
if(this.containers[i].containerCache.over){
this.containers[i]._trigger("out",null,_80._uiHash(this));
this.containers[i].containerCache.over=0;
}
}
}
if(this.placeholder){
if(this.placeholder[0].parentNode){
this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
}
if(this.options.helper!="original"&&this.helper&&this.helper[0].parentNode){
this.helper.remove();
}
$.extend(this,{helper:null,dragging:false,reverting:false,_noFinalSort:null});
if(this.domPosition.prev){
$(this.domPosition.prev).after(this.currentItem);
}else{
$(this.domPosition.parent).prepend(this.currentItem);
}
}
return this;
},serialize:function(o){
var _81=this._getItemsAsjQuery(o&&o.connected);
var str=[];
o=o||{};
$(_81).each(function(){
var res=($(o.item||this).attr(o.attribute||"id")||"").match(o.expression||(/(.+)[-=_](.+)/));
if(res){
str.push((o.key||res[1]+"[]")+"="+(o.key&&o.expression?res[1]:res[2]));
}
});
if(!str.length&&o.key){
str.push(o.key+"=");
}
return str.join("&");
},toArray:function(o){
var _82=this._getItemsAsjQuery(o&&o.connected);
var ret=[];
o=o||{};
_82.each(function(){
ret.push($(o.item||this).attr(o.attribute||"id")||"");
});
return ret;
},_intersectsWith:function(_83){
var x1=this.positionAbs.left,x2=x1+this.helperProportions.width,y1=this.positionAbs.top,y2=y1+this.helperProportions.height;
var l=_83.left,r=l+_83.width,t=_83.top,b=t+_83.height;
var _84=this.offset.click.top,_85=this.offset.click.left;
var _86=(y1+_84)>t&&(y1+_84)<b&&(x1+_85)>l&&(x1+_85)<r;
if(this.options.tolerance=="pointer"||this.options.forcePointerForContainers||(this.options.tolerance!="pointer"&&this.helperProportions[this.floating?"width":"height"]>_83[this.floating?"width":"height"])){
return _86;
}else{
return (l<x1+(this.helperProportions.width/2)&&x2-(this.helperProportions.width/2)<r&&t<y1+(this.helperProportions.height/2)&&y2-(this.helperProportions.height/2)<b);
}
},_intersectsWithPointer:function(_87){
var _88=$.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,_87.top,_87.height),_89=$.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,_87.left,_87.width),_8a=_88&&_89,_8b=this._getDragVerticalDirection(),_8c=this._getDragHorizontalDirection();
if(!_8a){
return false;
}
return this.floating?(((_8c&&_8c=="right")||_8b=="down")?2:1):(_8b&&(_8b=="down"?2:1));
},_intersectsWithSides:function(_8d){
var _8e=$.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,_8d.top+(_8d.height/2),_8d.height),_8f=$.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,_8d.left+(_8d.width/2),_8d.width),_90=this._getDragVerticalDirection(),_91=this._getDragHorizontalDirection();
if(this.floating&&_91){
return ((_91=="right"&&_8f)||(_91=="left"&&!_8f));
}else{
return _90&&((_90=="down"&&_8e)||(_90=="up"&&!_8e));
}
},_getDragVerticalDirection:function(){
var _92=this.positionAbs.top-this.lastPositionAbs.top;
return _92!=0&&(_92>0?"down":"up");
},_getDragHorizontalDirection:function(){
var _93=this.positionAbs.left-this.lastPositionAbs.left;
return _93!=0&&(_93>0?"right":"left");
},refresh:function(_94){
this._refreshItems(_94);
this.refreshPositions();
return this;
},_connectWith:function(){
var _95=this.options;
return _95.connectWith.constructor==String?[_95.connectWith]:_95.connectWith;
},_getItemsAsjQuery:function(_96){
var _97=this;
var _98=[];
var _99=[];
var _9a=this._connectWith();
if(_9a&&_96){
for(var i=_9a.length-1;i>=0;i--){
var cur=$(_9a[i]);
for(var j=cur.length-1;j>=0;j--){
var _9b=$.data(cur[j],"sortable");
if(_9b&&_9b!=this&&!_9b.options.disabled){
_99.push([$.isFunction(_9b.options.items)?_9b.options.items.call(_9b.element):$(_9b.options.items,_9b.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),_9b]);
}
}
}
}
_99.push([$.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):$(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]);
for(var i=_99.length-1;i>=0;i--){
_99[i][0].each(function(){
_98.push(this);
});
}
return $(_98);
},_removeCurrentsFromItems:function(){
var _9c=this.currentItem.find(":data(sortable-item)");
for(var i=0;i<this.items.length;i++){
for(var j=0;j<_9c.length;j++){
if(_9c[j]==this.items[i].item[0]){
this.items.splice(i,1);
}
}
}
},_refreshItems:function(_9d){
this.items=[];
this.containers=[this];
var _9e=this.items;
var _9f=this;
var _a0=[[$.isFunction(this.options.items)?this.options.items.call(this.element[0],_9d,{item:this.currentItem}):$(this.options.items,this.element),this]];
var _a1=this._connectWith();
if(_a1){
for(var i=_a1.length-1;i>=0;i--){
var cur=$(_a1[i]);
for(var j=cur.length-1;j>=0;j--){
var _a2=$.data(cur[j],"sortable");
if(_a2&&_a2!=this&&!_a2.options.disabled){
_a0.push([$.isFunction(_a2.options.items)?_a2.options.items.call(_a2.element[0],_9d,{item:this.currentItem}):$(_a2.options.items,_a2.element),_a2]);
this.containers.push(_a2);
}
}
}
}
for(var i=_a0.length-1;i>=0;i--){
var _a3=_a0[i][1];
var _a4=_a0[i][0];
for(var j=0,_a5=_a4.length;j<_a5;j++){
var _a6=$(_a4[j]);
_a6.data("sortable-item",_a3);
_9e.push({item:_a6,instance:_a3,width:0,height:0,left:0,top:0});
}
}
},refreshPositions:function(_a7){
if(this.offsetParent&&this.helper){
this.offset.parent=this._getParentOffset();
}
for(var i=this.items.length-1;i>=0;i--){
var _a8=this.items[i];
if(_a8.instance!=this.currentContainer&&this.currentContainer&&_a8.item[0]!=this.currentItem[0]){
continue;
}
var t=this.options.toleranceElement?$(this.options.toleranceElement,_a8.item):_a8.item;
if(!_a7){
_a8.width=t.outerWidth();
_a8.height=t.outerHeight();
}
var p=t.offset();
_a8.left=p.left;
_a8.top=p.top;
}
if(this.options.custom&&this.options.custom.refreshContainers){
this.options.custom.refreshContainers.call(this);
}else{
for(var i=this.containers.length-1;i>=0;i--){
var p=this.containers[i].element.offset();
this.containers[i].containerCache.left=p.left;
this.containers[i].containerCache.top=p.top;
this.containers[i].containerCache.width=this.containers[i].element.outerWidth();
this.containers[i].containerCache.height=this.containers[i].element.outerHeight();
}
}
return this;
},_createPlaceholder:function(_a9){
var _aa=_a9||this,o=_aa.options;
if(!o.placeholder||o.placeholder.constructor==String){
var _ab=o.placeholder;
o.placeholder={element:function(){
var el=$(document.createElement(_aa.currentItem[0].nodeName)).addClass(_ab||_aa.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
if(!_ab){
el.style.visibility="hidden";
}
return el;
},update:function(_ac,p){
if(_ab&&!o.forcePlaceholderSize){
return;
}
if(!p.height()){
p.height(_aa.currentItem.innerHeight()-parseInt(_aa.currentItem.css("paddingTop")||0,10)-parseInt(_aa.currentItem.css("paddingBottom")||0,10));
}
if(!p.width()){
p.width(_aa.currentItem.innerWidth()-parseInt(_aa.currentItem.css("paddingLeft")||0,10)-parseInt(_aa.currentItem.css("paddingRight")||0,10));
}
}};
}
_aa.placeholder=$(o.placeholder.element.call(_aa.element,_aa.currentItem));
_aa.currentItem.after(_aa.placeholder);
o.placeholder.update(_aa,_aa.placeholder);
},_contactContainers:function(_ad){
var _ae=null,_af=null;
for(var i=this.containers.length-1;i>=0;i--){
if($.ui.contains(this.currentItem[0],this.containers[i].element[0])){
continue;
}
if(this._intersectsWith(this.containers[i].containerCache)){
if(_ae&&$.ui.contains(this.containers[i].element[0],_ae.element[0])){
continue;
}
_ae=this.containers[i];
_af=i;
}else{
if(this.containers[i].containerCache.over){
this.containers[i]._trigger("out",_ad,this._uiHash(this));
this.containers[i].containerCache.over=0;
}
}
}
if(!_ae){
return;
}
if(this.containers.length===1){
this.containers[_af]._trigger("over",_ad,this._uiHash(this));
this.containers[_af].containerCache.over=1;
}else{
if(this.currentContainer!=this.containers[_af]){
var _b0=10000;
var _b1=null;
var _b2=this.positionAbs[this.containers[_af].floating?"left":"top"];
for(var j=this.items.length-1;j>=0;j--){
if(!$.ui.contains(this.containers[_af].element[0],this.items[j].item[0])){
continue;
}
var cur=this.items[j][this.containers[_af].floating?"left":"top"];
if(Math.abs(cur-_b2)<_b0){
_b0=Math.abs(cur-_b2);
_b1=this.items[j];
}
}
if(!_b1&&!this.options.dropOnEmpty){
return;
}
this.currentContainer=this.containers[_af];
_b1?this._rearrange(_ad,_b1,null,true):this._rearrange(_ad,null,this.containers[_af].element,true);
this._trigger("change",_ad,this._uiHash());
this.containers[_af]._trigger("change",_ad,this._uiHash(this));
this.options.placeholder.update(this.currentContainer,this.placeholder);
this.containers[_af]._trigger("over",_ad,this._uiHash(this));
this.containers[_af].containerCache.over=1;
}
}
},_createHelper:function(_b3){
var o=this.options;
var _b4=$.isFunction(o.helper)?$(o.helper.apply(this.element[0],[_b3,this.currentItem])):(o.helper=="clone"?this.currentItem.clone():this.currentItem);
if(!_b4.parents("body").length){
$(o.appendTo!="parent"?o.appendTo:this.currentItem[0].parentNode)[0].appendChild(_b4[0]);
}
if(_b4[0]==this.currentItem[0]){
this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")};
}
if(_b4[0].style.width==""||o.forceHelperSize){
_b4.width(this.currentItem.width());
}
if(_b4[0].style.height==""||o.forceHelperSize){
_b4.height(this.currentItem.height());
}
return _b4;
},_adjustOffsetFromHelper:function(obj){
if(typeof obj=="string"){
obj=obj.split(" ");
}
if($.isArray(obj)){
obj={left:+obj[0],top:+obj[1]||0};
}
if("left" in obj){
this.offset.click.left=obj.left+this.margins.left;
}
if("right" in obj){
this.offset.click.left=this.helperProportions.width-obj.right+this.margins.left;
}
if("top" in obj){
this.offset.click.top=obj.top+this.margins.top;
}
if("bottom" in obj){
this.offset.click.top=this.helperProportions.height-obj.bottom+this.margins.top;
}
},_getParentOffset:function(){
this.offsetParent=this.helper.offsetParent();
var po=this.offsetParent.offset();
if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&$.ui.contains(this.scrollParent[0],this.offsetParent[0])){
po.left+=this.scrollParent.scrollLeft();
po.top+=this.scrollParent.scrollTop();
}
if((this.offsetParent[0]==document.body)||(this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&$.browser.msie)){
po={top:0,left:0};
}
return {top:po.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:po.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)};
},_getRelativeOffset:function(){
if(this.cssPosition=="relative"){
var p=this.currentItem.position();
return {top:p.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:p.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()};
}else{
return {top:0,left:0};
}
},_cacheMargins:function(){
this.margins={left:(parseInt(this.currentItem.css("marginLeft"),10)||0),top:(parseInt(this.currentItem.css("marginTop"),10)||0)};
},_cacheHelperProportions:function(){
this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()};
},_setContainment:function(){
var o=this.options;
if(o.containment=="parent"){
o.containment=this.helper[0].parentNode;
}
if(o.containment=="document"||o.containment=="window"){
this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,$(o.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,($(o.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];
}
if(!(/^(document|window|parent)$/).test(o.containment)){
var ce=$(o.containment)[0];
var co=$(o.containment).offset();
var _b5=($(ce).css("overflow")!="hidden");
this.containment=[co.left+(parseInt($(ce).css("borderLeftWidth"),10)||0)+(parseInt($(ce).css("paddingLeft"),10)||0)-this.margins.left,co.top+(parseInt($(ce).css("borderTopWidth"),10)||0)+(parseInt($(ce).css("paddingTop"),10)||0)-this.margins.top,co.left+(_b5?Math.max(ce.scrollWidth,ce.offsetWidth):ce.offsetWidth)-(parseInt($(ce).css("borderLeftWidth"),10)||0)-(parseInt($(ce).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,co.top+(_b5?Math.max(ce.scrollHeight,ce.offsetHeight):ce.offsetHeight)-(parseInt($(ce).css("borderTopWidth"),10)||0)-(parseInt($(ce).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top];
}
},_convertPositionTo:function(d,pos){
if(!pos){
pos=this.position;
}
var mod=d=="absolute"?1:-1;
var o=this.options,_b6=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&$.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,_b7=(/(html|body)/i).test(_b6[0].tagName);
return {top:(pos.top+this.offset.relative.top*mod+this.offset.parent.top*mod-($.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(_b7?0:_b6.scrollTop()))*mod)),left:(pos.left+this.offset.relative.left*mod+this.offset.parent.left*mod-($.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():_b7?0:_b6.scrollLeft())*mod))};
},_generatePosition:function(_b8){
var o=this.options,_b9=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&$.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,_ba=(/(html|body)/i).test(_b9[0].tagName);
if(this.cssPosition=="relative"&&!(this.scrollParent[0]!=document&&this.scrollParent[0]!=this.offsetParent[0])){
this.offset.relative=this._getRelativeOffset();
}
var _bb=_b8.pageX;
var _bc=_b8.pageY;
if(this.originalPosition){
if(this.containment){
if(_b8.pageX-this.offset.click.left<this.containment[0]){
_bb=this.containment[0]+this.offset.click.left;
}
if(_b8.pageY-this.offset.click.top<this.containment[1]){
_bc=this.containment[1]+this.offset.click.top;
}
if(_b8.pageX-this.offset.click.left>this.containment[2]){
_bb=this.containment[2]+this.offset.click.left;
}
if(_b8.pageY-this.offset.click.top>this.containment[3]){
_bc=this.containment[3]+this.offset.click.top;
}
}
if(o.grid){
var top=this.originalPageY+Math.round((_bc-this.originalPageY)/o.grid[1])*o.grid[1];
_bc=this.containment?(!(top-this.offset.click.top<this.containment[1]||top-this.offset.click.top>this.containment[3])?top:(!(top-this.offset.click.top<this.containment[1])?top-o.grid[1]:top+o.grid[1])):top;
var _bd=this.originalPageX+Math.round((_bb-this.originalPageX)/o.grid[0])*o.grid[0];
_bb=this.containment?(!(_bd-this.offset.click.left<this.containment[0]||_bd-this.offset.click.left>this.containment[2])?_bd:(!(_bd-this.offset.click.left<this.containment[0])?_bd-o.grid[0]:_bd+o.grid[0])):_bd;
}
}
return {top:(_bc-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+($.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(_ba?0:_b9.scrollTop())))),left:(_bb-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+($.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():_ba?0:_b9.scrollLeft())))};
},_rearrange:function(_be,i,a,_bf){
a?a[0].appendChild(this.placeholder[0]):i.item[0].parentNode.insertBefore(this.placeholder[0],(this.direction=="down"?i.item[0]:i.item[0].nextSibling));
this.counter=this.counter?++this.counter:1;
var _c0=this,_c1=this.counter;
window.setTimeout(function(){
if(_c1==_c0.counter){
_c0.refreshPositions(!_bf);
}
},0);
},_clear:function(_c2,_c3){
this.reverting=false;
var _c4=[],_c5=this;
if(!this._noFinalSort&&this.currentItem[0].parentNode){
this.placeholder.before(this.currentItem);
}
this._noFinalSort=null;
if(this.helper[0]==this.currentItem[0]){
for(var i in this._storedCSS){
if(this._storedCSS[i]=="auto"||this._storedCSS[i]=="static"){
this._storedCSS[i]="";
}
}
this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
}else{
this.currentItem.show();
}
if(this.fromOutside&&!_c3){
_c4.push(function(_c6){
this._trigger("receive",_c6,this._uiHash(this.fromOutside));
});
}
if((this.fromOutside||this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!=this.currentItem.parent()[0])&&!_c3){
_c4.push(function(_c7){
this._trigger("update",_c7,this._uiHash());
});
}
if(!$.ui.contains(this.element[0],this.currentItem[0])){
if(!_c3){
_c4.push(function(_c8){
this._trigger("remove",_c8,this._uiHash());
});
}
for(var i=this.containers.length-1;i>=0;i--){
if($.ui.contains(this.containers[i].element[0],this.currentItem[0])&&!_c3){
_c4.push((function(c){
return function(_c9){
c._trigger("receive",_c9,this._uiHash(this));
};
}).call(this,this.containers[i]));
_c4.push((function(c){
return function(_ca){
c._trigger("update",_ca,this._uiHash(this));
};
}).call(this,this.containers[i]));
}
}
}
for(var i=this.containers.length-1;i>=0;i--){
if(!_c3){
_c4.push((function(c){
return function(_cb){
c._trigger("deactivate",_cb,this._uiHash(this));
};
}).call(this,this.containers[i]));
}
if(this.containers[i].containerCache.over){
_c4.push((function(c){
return function(_cc){
c._trigger("out",_cc,this._uiHash(this));
};
}).call(this,this.containers[i]));
this.containers[i].containerCache.over=0;
}
}
if(this._storedCursor){
$("body").css("cursor",this._storedCursor);
}
if(this._storedOpacity){
this.helper.css("opacity",this._storedOpacity);
}
if(this._storedZIndex){
this.helper.css("zIndex",this._storedZIndex=="auto"?"":this._storedZIndex);
}
this.dragging=false;
if(this.cancelHelperRemoval){
if(!_c3){
this._trigger("beforeStop",_c2,this._uiHash());
for(var i=0;i<_c4.length;i++){
_c4[i].call(this,_c2);
}
this._trigger("stop",_c2,this._uiHash());
}
return false;
}
if(!_c3){
this._trigger("beforeStop",_c2,this._uiHash());
}
this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
if(this.helper[0]!=this.currentItem[0]){
this.helper.remove();
}
this.helper=null;
if(!_c3){
for(var i=0;i<_c4.length;i++){
_c4[i].call(this,_c2);
}
this._trigger("stop",_c2,this._uiHash());
}
this.fromOutside=false;
return true;
},_trigger:function(){
if($.Widget.prototype._trigger.apply(this,arguments)===false){
this.cancel();
}
},_uiHash:function(_cd){
var _ce=_cd||this;
return {helper:_ce.helper,placeholder:_ce.placeholder||$([]),position:_ce.position,originalPosition:_ce.originalPosition,offset:_ce.positionAbs,item:_ce.currentItem,sender:_cd?_cd.element:null};
}});
$.extend($.ui.sortable,{version:"1.8.13"});
})(jQuery);
jQuery.effects||(function($,_cf){
$.effects={};
$.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","borderColor","color","outlineColor"],function(i,_d0){
$.fx.step[_d0]=function(fx){
if(!fx.colorInit){
fx.start=_d1(fx.elem,_d0);
fx.end=_d2(fx.end);
fx.colorInit=true;
}
fx.elem.style[_d0]="rgb("+Math.max(Math.min(parseInt((fx.pos*(fx.end[0]-fx.start[0]))+fx.start[0],10),255),0)+","+Math.max(Math.min(parseInt((fx.pos*(fx.end[1]-fx.start[1]))+fx.start[1],10),255),0)+","+Math.max(Math.min(parseInt((fx.pos*(fx.end[2]-fx.start[2]))+fx.start[2],10),255),0)+")";
};
});
function _d2(_d3){
var _d4;
if(_d3&&_d3.constructor==Array&&_d3.length==3){
return _d3;
}
if(_d4=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(_d3)){
return [parseInt(_d4[1],10),parseInt(_d4[2],10),parseInt(_d4[3],10)];
}
if(_d4=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(_d3)){
return [parseFloat(_d4[1])*2.55,parseFloat(_d4[2])*2.55,parseFloat(_d4[3])*2.55];
}
if(_d4=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(_d3)){
return [parseInt(_d4[1],16),parseInt(_d4[2],16),parseInt(_d4[3],16)];
}
if(_d4=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(_d3)){
return [parseInt(_d4[1]+_d4[1],16),parseInt(_d4[2]+_d4[2],16),parseInt(_d4[3]+_d4[3],16)];
}
if(_d4=/rgba\(0, 0, 0, 0\)/.exec(_d3)){
return _d5["transparent"];
}
return _d5[$.trim(_d3).toLowerCase()];
};
function _d1(_d6,_d7){
var _d8;
do{
_d8=$.curCSS(_d6,_d7);
if(_d8!=""&&_d8!="transparent"||$.nodeName(_d6,"body")){
break;
}
_d7="backgroundColor";
}while(_d6=_d6.parentNode);
return _d2(_d8);
};
var _d5={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]};
var _d9=["add","remove","toggle"],_da={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};
function _db(){
var _dc=document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle,_dd={},key,_de;
if(_dc&&_dc.length&&_dc[0]&&_dc[_dc[0]]){
var len=_dc.length;
while(len--){
key=_dc[len];
if(typeof _dc[key]=="string"){
_de=key.replace(/\-(\w)/g,function(all,_df){
return _df.toUpperCase();
});
_dd[_de]=_dc[key];
}
}
}else{
for(key in _dc){
if(typeof _dc[key]==="string"){
_dd[key]=_dc[key];
}
}
}
return _dd;
};
function _e0(_e1){
var _e2,_e3;
for(_e2 in _e1){
_e3=_e1[_e2];
if(_e3==null||$.isFunction(_e3)||_e2 in _da||(/scrollbar/).test(_e2)||(!(/color/i).test(_e2)&&isNaN(parseFloat(_e3)))){
delete _e1[_e2];
}
}
return _e1;
};
function _e4(_e5,_e6){
var _e7={_:0},_e8;
for(_e8 in _e6){
if(_e5[_e8]!=_e6[_e8]){
_e7[_e8]=_e6[_e8];
}
}
return _e7;
};
$.effects.animateClass=function(_e9,_ea,_eb,_ec){
if($.isFunction(_eb)){
_ec=_eb;
_eb=null;
}
return this.queue(function(){
var _ed=$(this),_ee=_ed.attr("style")||" ",_ef=_e0(_db.call(this)),_f0,_f1=_ed.attr("class");
$.each(_d9,function(i,_f2){
if(_e9[_f2]){
_ed[_f2+"Class"](_e9[_f2]);
}
});
_f0=_e0(_db.call(this));
_ed.attr("class",_f1);
_ed.animate(_e4(_ef,_f0),{queue:false,duration:_ea,easding:_eb,complete:function(){
$.each(_d9,function(i,_f3){
if(_e9[_f3]){
_ed[_f3+"Class"](_e9[_f3]);
}
});
if(typeof _ed.attr("style")=="object"){
_ed.attr("style").cssText="";
_ed.attr("style").cssText=_ee;
}else{
_ed.attr("style",_ee);
}
if(_ec){
_ec.apply(this,arguments);
}
$.dequeue(this);
}});
});
};
$.fn.extend({_addClass:$.fn.addClass,addClass:function(_f4,_f5,_f6,_f7){
return _f5?$.effects.animateClass.apply(this,[{add:_f4},_f5,_f6,_f7]):this._addClass(_f4);
},_removeClass:$.fn.removeClass,removeClass:function(_f8,_f9,_fa,_fb){
return _f9?$.effects.animateClass.apply(this,[{remove:_f8},_f9,_fa,_fb]):this._removeClass(_f8);
},_toggleClass:$.fn.toggleClass,toggleClass:function(_fc,_fd,_fe,_ff,_100){
if(typeof _fd=="boolean"||_fd===_cf){
if(!_fe){
return this._toggleClass(_fc,_fd);
}else{
return $.effects.animateClass.apply(this,[(_fd?{add:_fc}:{remove:_fc}),_fe,_ff,_100]);
}
}else{
return $.effects.animateClass.apply(this,[{toggle:_fc},_fd,_fe,_ff]);
}
},switchClass:function(_101,add,_102,_103,_104){
return $.effects.animateClass.apply(this,[{add:add,remove:_101},_102,_103,_104]);
}});
$.extend($.effects,{version:"1.8.13",save:function(_105,set){
for(var i=0;i<set.length;i++){
if(set[i]!==null){
_105.data("ec.storage."+set[i],_105[0].style[set[i]]);
}
}
},restore:function(_106,set){
for(var i=0;i<set.length;i++){
if(set[i]!==null){
_106.css(set[i],_106.data("ec.storage."+set[i]));
}
}
},setMode:function(el,mode){
if(mode=="toggle"){
mode=el.is(":hidden")?"show":"hide";
}
return mode;
},getBaseline:function(_107,_108){
var y,x;
switch(_107[0]){
case "top":
y=0;
break;
case "middle":
y=0.5;
break;
case "bottom":
y=1;
break;
default:
y=_107[0]/_108.height;
}
switch(_107[1]){
case "left":
x=0;
break;
case "center":
x=0.5;
break;
case "right":
x=1;
break;
default:
x=_107[1]/_108.width;
}
return {x:x,y:y};
},createWrapper:function(_109){
if(_109.parent().is(".ui-effects-wrapper")){
return _109.parent();
}
var _10a={width:_109.outerWidth(true),height:_109.outerHeight(true),"float":_109.css("float")},_10b=$("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0});
_109.wrap(_10b);
_10b=_109.parent();
if(_109.css("position")=="static"){
_10b.css({position:"relative"});
_109.css({position:"relative"});
}else{
$.extend(_10a,{position:_109.css("position"),zIndex:_109.css("z-index")});
$.each(["top","left","bottom","right"],function(i,pos){
_10a[pos]=_109.css(pos);
if(isNaN(parseInt(_10a[pos],10))){
_10a[pos]="auto";
}
});
_109.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"});
}
return _10b.css(_10a).show();
},removeWrapper:function(_10c){
if(_10c.parent().is(".ui-effects-wrapper")){
return _10c.parent().replaceWith(_10c);
}
return _10c;
},setTransition:function(_10d,list,_10e,_10f){
_10f=_10f||{};
$.each(list,function(i,x){
unit=_10d.cssUnit(x);
if(unit[0]>0){
_10f[x]=unit[0]*_10e+unit[1];
}
});
return _10f;
}});
function _110(_111,_112,_113,_114){
if(typeof _111=="object"){
_114=_112;
_113=null;
_112=_111;
_111=_112.effect;
}
if($.isFunction(_112)){
_114=_112;
_113=null;
_112={};
}
if(typeof _112=="number"||$.fx.speeds[_112]){
_114=_113;
_113=_112;
_112={};
}
if($.isFunction(_113)){
_114=_113;
_113=null;
}
_112=_112||{};
_113=_113||_112.duration;
_113=$.fx.off?0:typeof _113=="number"?_113:_113 in $.fx.speeds?$.fx.speeds[_113]:$.fx.speeds._default;
_114=_114||_112.complete;
return [_111,_112,_113,_114];
};
function _115(_116){
if(!_116||typeof _116==="number"||$.fx.speeds[_116]){
return true;
}
if(typeof _116==="string"&&!$.effects[_116]){
return true;
}
return false;
};
$.fn.extend({effect:function(_117,_118,_119,_11a){
var args=_110.apply(this,arguments),_11b={options:args[1],duration:args[2],callback:args[3]},mode=_11b.options.mode,_11c=$.effects[_117];
if($.fx.off||!_11c){
if(mode){
return this[mode](_11b.duration,_11b.callback);
}else{
return this.each(function(){
if(_11b.callback){
_11b.callback.call(this);
}
});
}
}
return _11c.call(this,_11b);
},_show:$.fn.show,show:function(_11d){
if(_115(_11d)){
return this._show.apply(this,arguments);
}else{
var args=_110.apply(this,arguments);
args[1].mode="show";
return this.effect.apply(this,args);
}
},_hide:$.fn.hide,hide:function(_11e){
if(_115(_11e)){
return this._hide.apply(this,arguments);
}else{
var args=_110.apply(this,arguments);
args[1].mode="hide";
return this.effect.apply(this,args);
}
},__toggle:$.fn.toggle,toggle:function(_11f){
if(_115(_11f)||typeof _11f==="boolean"||$.isFunction(_11f)){
return this.__toggle.apply(this,arguments);
}else{
var args=_110.apply(this,arguments);
args[1].mode="toggle";
return this.effect.apply(this,args);
}
},cssUnit:function(key){
var _120=this.css(key),val=[];
$.each(["em","px","%","pt"],function(i,unit){
if(_120.indexOf(unit)>0){
val=[parseFloat(_120),unit];
}
});
return val;
}});
$.easing.jswing=$.easing.swing;
$.extend($.easing,{def:"easeOutQuad",swing:function(x,t,b,c,d){
return $.easing[$.easing.def](x,t,b,c,d);
},easeInQuad:function(x,t,b,c,d){
return c*(t/=d)*t+b;
},easeOutQuad:function(x,t,b,c,d){
return -c*(t/=d)*(t-2)+b;
},easeInOutQuad:function(x,t,b,c,d){
if((t/=d/2)<1){
return c/2*t*t+b;
}
return -c/2*((--t)*(t-2)-1)+b;
},easeInCubic:function(x,t,b,c,d){
return c*(t/=d)*t*t+b;
},easeOutCubic:function(x,t,b,c,d){
return c*((t=t/d-1)*t*t+1)+b;
},easeInOutCubic:function(x,t,b,c,d){
if((t/=d/2)<1){
return c/2*t*t*t+b;
}
return c/2*((t-=2)*t*t+2)+b;
},easeInQuart:function(x,t,b,c,d){
return c*(t/=d)*t*t*t+b;
},easeOutQuart:function(x,t,b,c,d){
return -c*((t=t/d-1)*t*t*t-1)+b;
},easeInOutQuart:function(x,t,b,c,d){
if((t/=d/2)<1){
return c/2*t*t*t*t+b;
}
return -c/2*((t-=2)*t*t*t-2)+b;
},easeInQuint:function(x,t,b,c,d){
return c*(t/=d)*t*t*t*t+b;
},easeOutQuint:function(x,t,b,c,d){
return c*((t=t/d-1)*t*t*t*t+1)+b;
},easeInOutQuint:function(x,t,b,c,d){
if((t/=d/2)<1){
return c/2*t*t*t*t*t+b;
}
return c/2*((t-=2)*t*t*t*t+2)+b;
},easeInSine:function(x,t,b,c,d){
return -c*Math.cos(t/d*(Math.PI/2))+c+b;
},easeOutSine:function(x,t,b,c,d){
return c*Math.sin(t/d*(Math.PI/2))+b;
},easeInOutSine:function(x,t,b,c,d){
return -c/2*(Math.cos(Math.PI*t/d)-1)+b;
},easeInExpo:function(x,t,b,c,d){
return (t==0)?b:c*Math.pow(2,10*(t/d-1))+b;
},easeOutExpo:function(x,t,b,c,d){
return (t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b;
},easeInOutExpo:function(x,t,b,c,d){
if(t==0){
return b;
}
if(t==d){
return b+c;
}
if((t/=d/2)<1){
return c/2*Math.pow(2,10*(t-1))+b;
}
return c/2*(-Math.pow(2,-10*--t)+2)+b;
},easeInCirc:function(x,t,b,c,d){
return -c*(Math.sqrt(1-(t/=d)*t)-1)+b;
},easeOutCirc:function(x,t,b,c,d){
return c*Math.sqrt(1-(t=t/d-1)*t)+b;
},easeInOutCirc:function(x,t,b,c,d){
if((t/=d/2)<1){
return -c/2*(Math.sqrt(1-t*t)-1)+b;
}
return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b;
},easeInElastic:function(x,t,b,c,d){
var s=1.70158;
var p=0;
var a=c;
if(t==0){
return b;
}
if((t/=d)==1){
return b+c;
}
if(!p){
p=d*0.3;
}
if(a<Math.abs(c)){
a=c;
var s=p/4;
}else{
var s=p/(2*Math.PI)*Math.asin(c/a);
}
return -(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;
},easeOutElastic:function(x,t,b,c,d){
var s=1.70158;
var p=0;
var a=c;
if(t==0){
return b;
}
if((t/=d)==1){
return b+c;
}
if(!p){
p=d*0.3;
}
if(a<Math.abs(c)){
a=c;
var s=p/4;
}else{
var s=p/(2*Math.PI)*Math.asin(c/a);
}
return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b;
},easeInOutElastic:function(x,t,b,c,d){
var s=1.70158;
var p=0;
var a=c;
if(t==0){
return b;
}
if((t/=d/2)==2){
return b+c;
}
if(!p){
p=d*(0.3*1.5);
}
if(a<Math.abs(c)){
a=c;
var s=p/4;
}else{
var s=p/(2*Math.PI)*Math.asin(c/a);
}
if(t<1){
return -0.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;
}
return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*0.5+c+b;
},easeInBack:function(x,t,b,c,d,s){
if(s==_cf){
s=1.70158;
}
return c*(t/=d)*t*((s+1)*t-s)+b;
},easeOutBack:function(x,t,b,c,d,s){
if(s==_cf){
s=1.70158;
}
return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;
},easeInOutBack:function(x,t,b,c,d,s){
if(s==_cf){
s=1.70158;
}
if((t/=d/2)<1){
return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;
}
return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;
},easeInBounce:function(x,t,b,c,d){
return c-$.easing.easeOutBounce(x,d-t,0,c,d)+b;
},easeOutBounce:function(x,t,b,c,d){
if((t/=d)<(1/2.75)){
return c*(7.5625*t*t)+b;
}else{
if(t<(2/2.75)){
return c*(7.5625*(t-=(1.5/2.75))*t+0.75)+b;
}else{
if(t<(2.5/2.75)){
return c*(7.5625*(t-=(2.25/2.75))*t+0.9375)+b;
}else{
return c*(7.5625*(t-=(2.625/2.75))*t+0.984375)+b;
}
}
}
},easeInOutBounce:function(x,t,b,c,d){
if(t<d/2){
return $.easing.easeInBounce(x,t*2,0,c,d)*0.5+b;
}
return $.easing.easeOutBounce(x,t*2-d,0,c,d)*0.5+c*0.5+b;
}});
})(jQuery);
(function($,_121){
$.effects.blind=function(o){
return this.queue(function(){
var el=$(this),_122=["position","top","bottom","left","right"];
var mode=$.effects.setMode(el,o.options.mode||"hide");
var _123=o.options.direction||"vertical";
$.effects.save(el,_122);
el.show();
var _124=$.effects.createWrapper(el).css({overflow:"hidden"});
var ref=(_123=="vertical")?"height":"width";
var _125=(_123=="vertical")?_124.height():_124.width();
if(mode=="show"){
_124.css(ref,0);
}
var _126={};
_126[ref]=mode=="show"?_125:0;
_124.animate(_126,o.duration,o.options.easing,function(){
if(mode=="hide"){
el.hide();
}
$.effects.restore(el,_122);
$.effects.removeWrapper(el);
if(o.callback){
o.callback.apply(el[0],arguments);
}
el.dequeue();
});
});
};
})(jQuery);
(function($,_127){
$.effects.bounce=function(o){
return this.queue(function(){
var el=$(this),_128=["position","top","bottom","left","right"];
var mode=$.effects.setMode(el,o.options.mode||"effect");
var _129=o.options.direction||"up";
var _12a=o.options.distance||20;
var _12b=o.options.times||5;
var _12c=o.duration||250;
if(/show|hide/.test(mode)){
_128.push("opacity");
}
$.effects.save(el,_128);
el.show();
$.effects.createWrapper(el);
var ref=(_129=="up"||_129=="down")?"top":"left";
var _12d=(_129=="up"||_129=="left")?"pos":"neg";
var _12a=o.options.distance||(ref=="top"?el.outerHeight({margin:true})/3:el.outerWidth({margin:true})/3);
if(mode=="show"){
el.css("opacity",0).css(ref,_12d=="pos"?-_12a:_12a);
}
if(mode=="hide"){
_12a=_12a/(_12b*2);
}
if(mode!="hide"){
_12b--;
}
if(mode=="show"){
var _12e={opacity:1};
_12e[ref]=(_12d=="pos"?"+=":"-=")+_12a;
el.animate(_12e,_12c/2,o.options.easing);
_12a=_12a/2;
_12b--;
}
for(var i=0;i<_12b;i++){
var _12f={},_130={};
_12f[ref]=(_12d=="pos"?"-=":"+=")+_12a;
_130[ref]=(_12d=="pos"?"+=":"-=")+_12a;
el.animate(_12f,_12c/2,o.options.easing).animate(_130,_12c/2,o.options.easing);
_12a=(mode=="hide")?_12a*2:_12a/2;
}
if(mode=="hide"){
var _12e={opacity:0};
_12e[ref]=(_12d=="pos"?"-=":"+=")+_12a;
el.animate(_12e,_12c/2,o.options.easing,function(){
el.hide();
$.effects.restore(el,_128);
$.effects.removeWrapper(el);
if(o.callback){
o.callback.apply(this,arguments);
}
});
}else{
var _12f={},_130={};
_12f[ref]=(_12d=="pos"?"-=":"+=")+_12a;
_130[ref]=(_12d=="pos"?"+=":"-=")+_12a;
el.animate(_12f,_12c/2,o.options.easing).animate(_130,_12c/2,o.options.easing,function(){
$.effects.restore(el,_128);
$.effects.removeWrapper(el);
if(o.callback){
o.callback.apply(this,arguments);
}
});
}
el.queue("fx",function(){
el.dequeue();
});
el.dequeue();
});
};
})(jQuery);
(function($,_131){
$.effects.clip=function(o){
return this.queue(function(){
var el=$(this),_132=["position","top","bottom","left","right","height","width"];
var mode=$.effects.setMode(el,o.options.mode||"hide");
var _133=o.options.direction||"vertical";
$.effects.save(el,_132);
el.show();
var _134=$.effects.createWrapper(el).css({overflow:"hidden"});
var _135=el[0].tagName=="IMG"?_134:el;
var ref={size:(_133=="vertical")?"height":"width",position:(_133=="vertical")?"top":"left"};
var _136=(_133=="vertical")?_135.height():_135.width();
if(mode=="show"){
_135.css(ref.size,0);
_135.css(ref.position,_136/2);
}
var _137={};
_137[ref.size]=mode=="show"?_136:0;
_137[ref.position]=mode=="show"?0:_136/2;
_135.animate(_137,{queue:false,duration:o.duration,easing:o.options.easing,complete:function(){
if(mode=="hide"){
el.hide();
}
$.effects.restore(el,_132);
$.effects.removeWrapper(el);
if(o.callback){
o.callback.apply(el[0],arguments);
}
el.dequeue();
}});
});
};
})(jQuery);
(function($,_138){
$.effects.drop=function(o){
return this.queue(function(){
var el=$(this),_139=["position","top","bottom","left","right","opacity"];
var mode=$.effects.setMode(el,o.options.mode||"hide");
var _13a=o.options.direction||"left";
$.effects.save(el,_139);
el.show();
$.effects.createWrapper(el);
var ref=(_13a=="up"||_13a=="down")?"top":"left";
var _13b=(_13a=="up"||_13a=="left")?"pos":"neg";
var _13c=o.options.distance||(ref=="top"?el.outerHeight({margin:true})/2:el.outerWidth({margin:true})/2);
if(mode=="show"){
el.css("opacity",0).css(ref,_13b=="pos"?-_13c:_13c);
}
var _13d={opacity:mode=="show"?1:0};
_13d[ref]=(mode=="show"?(_13b=="pos"?"+=":"-="):(_13b=="pos"?"-=":"+="))+_13c;
el.animate(_13d,{queue:false,duration:o.duration,easing:o.options.easing,complete:function(){
if(mode=="hide"){
el.hide();
}
$.effects.restore(el,_139);
$.effects.removeWrapper(el);
if(o.callback){
o.callback.apply(this,arguments);
}
el.dequeue();
}});
});
};
})(jQuery);
(function($,_13e){
$.effects.explode=function(o){
return this.queue(function(){
var rows=o.options.pieces?Math.round(Math.sqrt(o.options.pieces)):3;
var _13f=o.options.pieces?Math.round(Math.sqrt(o.options.pieces)):3;
o.options.mode=o.options.mode=="toggle"?($(this).is(":visible")?"hide":"show"):o.options.mode;
var el=$(this).show().css("visibility","hidden");
var _140=el.offset();
_140.top-=parseInt(el.css("marginTop"),10)||0;
_140.left-=parseInt(el.css("marginLeft"),10)||0;
var _141=el.outerWidth(true);
var _142=el.outerHeight(true);
for(var i=0;i<rows;i++){
for(var j=0;j<_13f;j++){
el.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-j*(_141/_13f),top:-i*(_142/rows)}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:_141/_13f,height:_142/rows,left:_140.left+j*(_141/_13f)+(o.options.mode=="show"?(j-Math.floor(_13f/2))*(_141/_13f):0),top:_140.top+i*(_142/rows)+(o.options.mode=="show"?(i-Math.floor(rows/2))*(_142/rows):0),opacity:o.options.mode=="show"?0:1}).animate({left:_140.left+j*(_141/_13f)+(o.options.mode=="show"?0:(j-Math.floor(_13f/2))*(_141/_13f)),top:_140.top+i*(_142/rows)+(o.options.mode=="show"?0:(i-Math.floor(rows/2))*(_142/rows)),opacity:o.options.mode=="show"?1:0},o.duration||500);
}
}
setTimeout(function(){
o.options.mode=="show"?el.css({visibility:"visible"}):el.css({visibility:"visible"}).hide();
if(o.callback){
o.callback.apply(el[0]);
}
el.dequeue();
$("div.ui-effects-explode").remove();
},o.duration||500);
});
};
})(jQuery);
(function($,_143){
$.effects.fade=function(o){
return this.queue(function(){
var elem=$(this),mode=$.effects.setMode(elem,o.options.mode||"hide");
elem.animate({opacity:mode},{queue:false,duration:o.duration,easing:o.options.easing,complete:function(){
(o.callback&&o.callback.apply(this,arguments));
elem.dequeue();
}});
});
};
})(jQuery);
(function($,_144){
$.effects.fold=function(o){
return this.queue(function(){
var el=$(this),_145=["position","top","bottom","left","right"];
var mode=$.effects.setMode(el,o.options.mode||"hide");
var size=o.options.size||15;
var _146=!(!o.options.horizFirst);
var _147=o.duration?o.duration/2:$.fx.speeds._default/2;
$.effects.save(el,_145);
el.show();
var _148=$.effects.createWrapper(el).css({overflow:"hidden"});
var _149=((mode=="show")!=_146);
var ref=_149?["width","height"]:["height","width"];
var _14a=_149?[_148.width(),_148.height()]:[_148.height(),_148.width()];
var _14b=/([0-9]+)%/.exec(size);
if(_14b){
size=parseInt(_14b[1],10)/100*_14a[mode=="hide"?0:1];
}
if(mode=="show"){
_148.css(_146?{height:0,width:size}:{height:size,width:0});
}
var _14c={},_14d={};
_14c[ref[0]]=mode=="show"?_14a[0]:size;
_14d[ref[1]]=mode=="show"?_14a[1]:0;
_148.animate(_14c,_147,o.options.easing).animate(_14d,_147,o.options.easing,function(){
if(mode=="hide"){
el.hide();
}
$.effects.restore(el,_145);
$.effects.removeWrapper(el);
if(o.callback){
o.callback.apply(el[0],arguments);
}
el.dequeue();
});
});
};
})(jQuery);
(function($,_14e){
$.effects.highlight=function(o){
return this.queue(function(){
var elem=$(this),_14f=["backgroundImage","backgroundColor","opacity"],mode=$.effects.setMode(elem,o.options.mode||"show"),_150={backgroundColor:elem.css("backgroundColor")};
if(mode=="hide"){
_150.opacity=0;
}
$.effects.save(elem,_14f);
elem.show().css({backgroundImage:"none",backgroundColor:o.options.color||"#ffff99"}).animate(_150,{queue:false,duration:o.duration,easing:o.options.easing,complete:function(){
(mode=="hide"&&elem.hide());
$.effects.restore(elem,_14f);
(mode=="show"&&!$.support.opacity&&this.style.removeAttribute("filter"));
(o.callback&&o.callback.apply(this,arguments));
elem.dequeue();
}});
});
};
})(jQuery);
(function($,_151){
$.effects.pulsate=function(o){
return this.queue(function(){
var elem=$(this),mode=$.effects.setMode(elem,o.options.mode||"show");
times=((o.options.times||5)*2)-1;
duration=o.duration?o.duration/2:$.fx.speeds._default/2,isVisible=elem.is(":visible"),animateTo=0;
if(!isVisible){
elem.css("opacity",0).show();
animateTo=1;
}
if((mode=="hide"&&isVisible)||(mode=="show"&&!isVisible)){
times--;
}
for(var i=0;i<times;i++){
elem.animate({opacity:animateTo},duration,o.options.easing);
animateTo=(animateTo+1)%2;
}
elem.animate({opacity:animateTo},duration,o.options.easing,function(){
if(animateTo==0){
elem.hide();
}
(o.callback&&o.callback.apply(this,arguments));
});
elem.queue("fx",function(){
elem.dequeue();
}).dequeue();
});
};
})(jQuery);
(function($,_152){
$.effects.puff=function(o){
return this.queue(function(){
var elem=$(this),mode=$.effects.setMode(elem,o.options.mode||"hide"),_153=parseInt(o.options.percent,10)||150,_154=_153/100,_155={height:elem.height(),width:elem.width()};
$.extend(o.options,{fade:true,mode:mode,percent:mode=="hide"?_153:100,from:mode=="hide"?_155:{height:_155.height*_154,width:_155.width*_154}});
elem.effect("scale",o.options,o.duration,o.callback);
elem.dequeue();
});
};
$.effects.scale=function(o){
return this.queue(function(){
var el=$(this);
var _156=$.extend(true,{},o.options);
var mode=$.effects.setMode(el,o.options.mode||"effect");
var _157=parseInt(o.options.percent,10)||(parseInt(o.options.percent,10)==0?0:(mode=="hide"?0:100));
var _158=o.options.direction||"both";
var _159=o.options.origin;
if(mode!="effect"){
_156.origin=_159||["middle","center"];
_156.restore=true;
}
var _15a={height:el.height(),width:el.width()};
el.from=o.options.from||(mode=="show"?{height:0,width:0}:_15a);
var _15b={y:_158!="horizontal"?(_157/100):1,x:_158!="vertical"?(_157/100):1};
el.to={height:_15a.height*_15b.y,width:_15a.width*_15b.x};
if(o.options.fade){
if(mode=="show"){
el.from.opacity=0;
el.to.opacity=1;
}
if(mode=="hide"){
el.from.opacity=1;
el.to.opacity=0;
}
}
_156.from=el.from;
_156.to=el.to;
_156.mode=mode;
el.effect("size",_156,o.duration,o.callback);
el.dequeue();
});
};
$.effects.size=function(o){
return this.queue(function(){
var el=$(this),_15c=["position","top","bottom","left","right","width","height","overflow","opacity"];
var _15d=["position","top","bottom","left","right","overflow","opacity"];
var _15e=["width","height","overflow"];
var _15f=["fontSize"];
var _160=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"];
var _161=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"];
var mode=$.effects.setMode(el,o.options.mode||"effect");
var _162=o.options.restore||false;
var _163=o.options.scale||"both";
var _164=o.options.origin;
var _165={height:el.height(),width:el.width()};
el.from=o.options.from||_165;
el.to=o.options.to||_165;
if(_164){
var _166=$.effects.getBaseline(_164,_165);
el.from.top=(_165.height-el.from.height)*_166.y;
el.from.left=(_165.width-el.from.width)*_166.x;
el.to.top=(_165.height-el.to.height)*_166.y;
el.to.left=(_165.width-el.to.width)*_166.x;
}
var _167={from:{y:el.from.height/_165.height,x:el.from.width/_165.width},to:{y:el.to.height/_165.height,x:el.to.width/_165.width}};
if(_163=="box"||_163=="both"){
if(_167.from.y!=_167.to.y){
_15c=_15c.concat(_160);
el.from=$.effects.setTransition(el,_160,_167.from.y,el.from);
el.to=$.effects.setTransition(el,_160,_167.to.y,el.to);
}
if(_167.from.x!=_167.to.x){
_15c=_15c.concat(_161);
el.from=$.effects.setTransition(el,_161,_167.from.x,el.from);
el.to=$.effects.setTransition(el,_161,_167.to.x,el.to);
}
}
if(_163=="content"||_163=="both"){
if(_167.from.y!=_167.to.y){
_15c=_15c.concat(_15f);
el.from=$.effects.setTransition(el,_15f,_167.from.y,el.from);
el.to=$.effects.setTransition(el,_15f,_167.to.y,el.to);
}
}
$.effects.save(el,_162?_15c:_15d);
el.show();
$.effects.createWrapper(el);
el.css("overflow","hidden").css(el.from);
if(_163=="content"||_163=="both"){
_160=_160.concat(["marginTop","marginBottom"]).concat(_15f);
_161=_161.concat(["marginLeft","marginRight"]);
_15e=_15c.concat(_160).concat(_161);
el.find("*[width]").each(function(){
child=$(this);
if(_162){
$.effects.save(child,_15e);
}
var _168={height:child.height(),width:child.width()};
child.from={height:_168.height*_167.from.y,width:_168.width*_167.from.x};
child.to={height:_168.height*_167.to.y,width:_168.width*_167.to.x};
if(_167.from.y!=_167.to.y){
child.from=$.effects.setTransition(child,_160,_167.from.y,child.from);
child.to=$.effects.setTransition(child,_160,_167.to.y,child.to);
}
if(_167.from.x!=_167.to.x){
child.from=$.effects.setTransition(child,_161,_167.from.x,child.from);
child.to=$.effects.setTransition(child,_161,_167.to.x,child.to);
}
child.css(child.from);
child.animate(child.to,o.duration,o.options.easing,function(){
if(_162){
$.effects.restore(child,_15e);
}
});
});
}
el.animate(el.to,{queue:false,duration:o.duration,easing:o.options.easing,complete:function(){
if(el.to.opacity===0){
el.css("opacity",el.from.opacity);
}
if(mode=="hide"){
el.hide();
}
$.effects.restore(el,_162?_15c:_15d);
$.effects.removeWrapper(el);
if(o.callback){
o.callback.apply(this,arguments);
}
el.dequeue();
}});
});
};
})(jQuery);
(function($,_169){
$.effects.shake=function(o){
return this.queue(function(){
var el=$(this),_16a=["position","top","bottom","left","right"];
var mode=$.effects.setMode(el,o.options.mode||"effect");
var _16b=o.options.direction||"left";
var _16c=o.options.distance||20;
var _16d=o.options.times||3;
var _16e=o.duration||o.options.duration||140;
$.effects.save(el,_16a);
el.show();
$.effects.createWrapper(el);
var ref=(_16b=="up"||_16b=="down")?"top":"left";
var _16f=(_16b=="up"||_16b=="left")?"pos":"neg";
var _170={},_171={},_172={};
_170[ref]=(_16f=="pos"?"-=":"+=")+_16c;
_171[ref]=(_16f=="pos"?"+=":"-=")+_16c*2;
_172[ref]=(_16f=="pos"?"-=":"+=")+_16c*2;
el.animate(_170,_16e,o.options.easing);
for(var i=1;i<_16d;i++){
el.animate(_171,_16e,o.options.easing).animate(_172,_16e,o.options.easing);
}
el.animate(_171,_16e,o.options.easing).animate(_170,_16e/2,o.options.easing,function(){
$.effects.restore(el,_16a);
$.effects.removeWrapper(el);
if(o.callback){
o.callback.apply(this,arguments);
}
});
el.queue("fx",function(){
el.dequeue();
});
el.dequeue();
});
};
})(jQuery);
(function($,_173){
$.effects.slide=function(o){
return this.queue(function(){
var el=$(this),_174=["position","top","bottom","left","right"];
var mode=$.effects.setMode(el,o.options.mode||"show");
var _175=o.options.direction||"left";
$.effects.save(el,_174);
el.show();
$.effects.createWrapper(el).css({overflow:"hidden"});
var ref=(_175=="up"||_175=="down")?"top":"left";
var _176=(_175=="up"||_175=="left")?"pos":"neg";
var _177=o.options.distance||(ref=="top"?el.outerHeight({margin:true}):el.outerWidth({margin:true}));
if(mode=="show"){
el.css(ref,_176=="pos"?(isNaN(_177)?"-"+_177:-_177):_177);
}
var _178={};
_178[ref]=(mode=="show"?(_176=="pos"?"+=":"-="):(_176=="pos"?"-=":"+="))+_177;
el.animate(_178,{queue:false,duration:o.duration,easing:o.options.easing,complete:function(){
if(mode=="hide"){
el.hide();
}
$.effects.restore(el,_174);
$.effects.removeWrapper(el);
if(o.callback){
o.callback.apply(this,arguments);
}
el.dequeue();
}});
});
};
})(jQuery);
(function($,_179){
$.effects.transfer=function(o){
return this.queue(function(){
var elem=$(this),_17a=$(o.options.to),_17b=_17a.offset(),_17c={top:_17b.top,left:_17b.left,height:_17a.innerHeight(),width:_17a.innerWidth()},_17d=elem.offset(),_17e=$("<div class=\"ui-effects-transfer\"></div>").appendTo(document.body).addClass(o.options.className).css({top:_17d.top,left:_17d.left,height:elem.innerHeight(),width:elem.innerWidth(),position:"absolute"}).animate(_17c,o.duration,o.options.easing,function(){
_17e.remove();
(o.callback&&o.callback.apply(elem[0],arguments));
elem.dequeue();
});
});
};
})(jQuery);
function tip_init(){
jQuery("a.hptip").each(function(){
var url=jQuery(this).attr("data-tip");
if(jQuery(this).hasClass("mouseoverable")){
jQuery(this).hover(function(){
jQuery(this).data("sticky",1);
tip_show(url,this.id,this.name,true);
},function(){
jQuery(this).data("sticky",0);
var id=this.id;
setTimeout(function(){
tip_remove(id);
},800);
}).click(function(){
return false;
});
jQuery("#HPT").live("mouseover",function(){
var _17f=jQuery(this).data("linkId");
if(_17f){
jQuery("#"+_17f).data("sticky",1);
}
}).live("mouseout",function(_180){
var hpts=jQuery(_180.relatedTarget).closest("#HPT");
if(hpts.size()==0){
var _181=jQuery(this).data("linkId");
if(_181){
jQuery("#"+_181).data("sticky",0);
}
setTimeout(function(){
tip_remove(_181);
},800);
}
});
}else{
jQuery(this).hover(function(){
tip_show(url,this.id,this.name,false);
},function(){
jQuery("#HPT").remove();
}).click(function(){
return false;
});
}
});
};
function tip_remove(_182){
var _183=jQuery("#HPT").data("linkId");
if(_182!=_183){
return;
}
var _184=jQuery("#"+_182).data("sticky");
if(!_184){
jQuery("#HPT").remove();
}
};
function tip_show(url,_185,_186,_187){
if(jQuery("#HPT").size()){
jQuery("#HPT").remove();
}
if(_186==false&&_187){
_186="&nbsp;";
}
var de=document.documentElement;
var w=self.innerWidth||(de&&de.clientWidth)||document.body.clientWidth;
var _188=getElementWidth(_185);
var _189=w-getAbsoluteLeft(_185)-_188;
var _18a=getAbsoluteLeft(_185);
var _18b=getAbsoluteTop(_185)-3;
var _18c=url.replace(/^[^\?]+\??/,"");
var _18d=parseQuery(_18c);
if(_18d["width"]===undefined){
_18d["width"]=250;
}
if(_18d["link"]!==undefined){
jQuery("#"+_185).bind("click",function(){
window.location=_18d["link"];
});
jQuery("#"+_185).css("cursor","pointer");
}
var _18e=_187?" <a href='#' class='close' onclick='jQuery(\"#HPT\").remove(); return false;'>x</a>":"";
var _18f=_18d["css"]?" class='"+_18d["css"]+"'":"";
var _190;
var _191=false;
if(_18d["dir"]!==undefined){
_190=_18d["dir"];
}else{
if(_189>(_18d["width"]*1+11)){
_190="right";
}else{
if(_189+_188*0.3>(_18d["width"]*1+11)){
_190="right";
_191=true;
}else{
if(_18a>(_18d["width"]*1+11)){
_190="left";
}else{
_190="right";
_191=true;
}
}
}
}
var _192=_190=="left"?"right":"left";
var _193=_186?"<div id='HPT_close_"+_192+"'>"+_186+_18e+"</div>":"";
var _194=_190=="left"?"style='left:"+((_18d["width"]*1)+1)+"px"+"'":"";
jQuery("#container").append("<div id='HPT' style='width:"+_18d["width"]*1+"px'"+_18f+"><div id='HPT_arrow_"+_192+"' "+_194+"></div>"+_193+"<div id='HPT_copy'><div class='HPT_loader'><div></div></div>");
if(_190=="right"){
var _194=_188+11;
if(_191){
var _195=getAbsoluteLeft(_185)+_194-_188*0.3;
}else{
var _195=getAbsoluteLeft(_185)+_194;
}
}else{
var _195=getAbsoluteLeft(_185)-((_18d["width"]*1)+15);
}
var _196=jQuery("#container").offset();
_195-=_196.left;
_18b-=_196.top;
jQuery("#HPT").css({left:_195+"px",top:_18b+"px"});
jQuery("#HPT").data("linkId",_185);
jQuery("#HPT").show();
jQuery("#HPT_copy").load(url);
};
function getElementWidth(_197){
x=document.getElementById(_197);
return x.offsetWidth;
};
function getAbsoluteLeft(_198){
o=document.getElementById(_198);
oLeft=o.offsetLeft;
while(o.offsetParent!=null){
oParent=o.offsetParent;
oLeft+=oParent.offsetLeft;
o=oParent;
}
return oLeft;
};
function getAbsoluteTop(_199){
o=document.getElementById(_199);
oTop=o.offsetTop;
while(o.offsetParent!=null){
oParent=o.offsetParent;
oTop+=oParent.offsetTop;
o=oParent;
}
return oTop;
};
function parseQuery(_19a){
var _19b=new Object();
if(!_19a){
return _19b;
}
var _19c=_19a.split(/[;&]/);
for(var i=0;i<_19c.length;i++){
var _19d=_19c[i].split("=");
if(!_19d||_19d.length!=2){
continue;
}
var key=unescape(_19d[0]);
var val=unescape(_19d[1]);
val=val.replace(/\+/g," ");
_19b[key]=val;
}
return _19b;
};
function blockEvents(evt){
if(evt.target){
evt.preventDefault();
}else{
evt.returnValue=false;
}
};
if(Prototype.Version=="1.7"){
Object.extend(Hash.prototype,{remove:function(){
return this.unset(arguments);
}});
}
Form.Element.setValue=function(_19e,_19f){
element_id=_19e;
_19e=$(_19e);
if(!_19e){
_19e=document.getElementsByName(element_id)[0];
}
if(!_19e){
return false;
}
var _1a0=_19e.tagName.toLowerCase();
var _1a1=Form.Element.SetSerializers[_1a0](_19e,_19f);
};
Form.Element.SetSerializers={input:function(_1a2,_1a3){
switch(_1a2.type.toLowerCase()){
case "submit":
case "hidden":
case "password":
case "text":
return Form.Element.SetSerializers.textarea(_1a2,_1a3);
case "checkbox":
return Form.Element.SetSerializers.checkbox(_1a2,_1a3);
case "radio":
return Form.Element.SetSerializers.inputSelector(_1a2,_1a3);
}
return false;
},checkbox:function(_1a4,_1a5){
if(_1a5==0||_1a5==null||_1a5==""){
_1a4.checked=false;
}else{
_1a4.checked=true;
}
},inputSelector:function(_1a6,_1a7){
fields=document.getElementsByName(_1a6.name);
for(var i=0;i<fields.length;i++){
if(fields[i].value==_1a7){
fields[i].checked=true;
}
}
},textarea:function(_1a8,_1a9){
_1a8.value=_1a9;
},select:function(_1aa,_1ab){
var _1ac="",opt,_1ad=_1aa.selectedIndex;
for(var i=0;i<_1aa.options.length;i++){
if(_1aa.options[i].value==_1ab){
_1aa.selectedIndex=i;
return true;
}
}
}};
var fx=new Object();
fx.Base=function(){
};
fx.Base.prototype={setOptions:function(_1ae){
this.options={duration:500,onComplete:"",transition:fx.sinoidal};
Object.extend(this.options,_1ae||{});
},step:function(){
var time=(new Date).getTime();
if(time>=this.options.duration+this.startTime){
this.now=this.to;
clearInterval(this.timer);
this.timer=null;
if(this.options.onComplete){
setTimeout(this.options.onComplete.bind(this),10);
}
}else{
var Tpos=(time-this.startTime)/(this.options.duration);
this.now=this.options.transition(Tpos)*(this.to-this.from)+this.from;
}
this.increase();
},custom:function(from,to){
if(this.timer!=null){
return;
}
this.from=from;
this.to=to;
this.startTime=(new Date).getTime();
this.timer=setInterval(this.step.bind(this),13);
},hide:function(){
this.now=0;
this.increase();
},clearTimer:function(){
clearInterval(this.timer);
this.timer=null;
}};
fx.Layout=Class.create();
fx.Layout.prototype=Object.extend(new fx.Base(),{initialize:function(el,_1af){
this.el=$(el);
this.el.style.overflow="hidden";
this.iniWidth=this.el.offsetWidth;
this.iniHeight=this.el.offsetHeight;
this.setOptions(_1af);
}});
fx.Height=Class.create();
Object.extend(Object.extend(fx.Height.prototype,fx.Layout.prototype),{increase:function(){
this.el.style.height=this.now+"px";
},toggle:function(){
var _1b0=this.options.toHeight?this.options.toHeight:0;
if(this.el.offsetHeight>0){
this.custom(this.el.offsetHeight,_1b0);
}else{
this.custom(0,this.el.scrollHeight);
}
}});
fx.Width=Class.create();
Object.extend(Object.extend(fx.Width.prototype,fx.Layout.prototype),{increase:function(){
this.el.style.width=this.now+"px";
},toggle:function(){
if(this.el.offsetWidth>0){
this.custom(this.el.offsetWidth,0);
}else{
this.custom(0,this.iniWidth);
}
}});
fx.Opacity=Class.create();
fx.Opacity.prototype=Object.extend(new fx.Base(),{initialize:function(el,_1b1){
this.el=$(el);
this.now=1;
this.increase();
this.setOptions(_1b1);
},increase:function(){
if(this.now==1&&(/Firefox/.test(navigator.userAgent))){
this.now=0.9999;
}
this.setOpacity(this.now);
},setOpacity:function(_1b2){
if(_1b2==0&&this.el.style.visibility!="hidden"){
this.el.style.visibility="hidden";
}else{
if(this.el.style.visibility!="visible"){
this.el.style.visibility="visible";
}
}
if(window.ActiveXObject){
this.el.style.filter="alpha(opacity="+_1b2*100+")";
}
this.el.style.opacity=_1b2;
},toggle:function(){
if(this.now>0){
this.custom(1,0);
}else{
this.custom(0,1);
}
}});
fx.sinoidal=function(pos){
return ((-Math.cos(pos*Math.PI)/2)+0.5);
};
fx.linear=function(pos){
return pos;
};
fx.cubic=function(pos){
return Math.pow(pos,3);
};
fx.circ=function(pos){
return Math.sqrt(pos);
};
fx.Scroll=Class.create();
fx.Scroll.prototype=Object.extend(new fx.Base(),{initialize:function(_1b3){
this.setOptions(_1b3);
},scrollTo:function(el){
var dest=Position.cumulativeOffset($(el))[1]-20;
var _1b4=window.innerHeight||document.documentElement.clientHeight;
var full=document.documentElement.scrollHeight;
var top=window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop;
if(dest+_1b4>full){
this.custom(top,dest-_1b4+(full-dest));
}else{
this.custom(top,dest);
}
},increase:function(){
window.scrollTo(0,this.now);
}});
fx.Text=Class.create();
fx.Text.prototype=Object.extend(new fx.Base(),{initialize:function(el,_1b5){
this.el=$(el);
this.setOptions(_1b5);
if(!this.options.unit){
this.options.unit="em";
}
},increase:function(){
this.el.style.fontSize=this.now+this.options.unit;
}});
fx.Combo=Class.create();
fx.Combo.prototype={setOptions:function(_1b6){
this.options={opacity:true,height:true,width:false};
Object.extend(this.options,_1b6||{});
},initialize:function(el,_1b7){
this.el=$(el);
this.setOptions(_1b7);
if(this.options.opacity){
this.o=new fx.Opacity(el,_1b7);
_1b7.onComplete=null;
}
if(this.options.height){
this.h=new fx.Height(el,_1b7);
_1b7.onComplete=null;
}
if(this.options.width){
this.w=new fx.Width(el,_1b7);
}
},toggle:function(){
this.checkExec("toggle");
},hide:function(){
this.checkExec("hide");
},clearTimer:function(){
this.checkExec("clearTimer");
},checkExec:function(func){
if(this.o){
this.o[func]();
}
if(this.h){
this.h[func]();
}
if(this.w){
this.w[func]();
}
},resizeTo:function(hto,wto){
if(this.h&&this.w){
this.h.custom(this.el.offsetHeight,this.el.offsetHeight+hto);
this.w.custom(this.el.offsetWidth,this.el.offsetWidth+wto);
}
},customSize:function(hto,wto){
if(this.h&&this.w){
this.h.custom(this.el.offsetHeight,hto);
this.w.custom(this.el.offsetWidth,wto);
}
}};
fx.Accordion=Class.create();
fx.Accordion.prototype={setOptions:function(_1b8){
this.options={delay:100,opacity:false};
Object.extend(this.options,_1b8||{});
},initialize:function(_1b9,_1ba,_1bb){
this.elements=_1ba;
this.setOptions(_1bb);
var _1bb=_1bb||"";
_1ba.each(function(el,i){
_1bb.onComplete=function(){
if(el.offsetHeight>0){
el.style.height="1%";
}
};
el.fx=new fx.Combo(el,_1bb);
el.fx.hide();
});
_1b9.each(function(tog,i){
tog.onclick=function(){
this.showThisHideOpen(_1ba[i]);
}.bind(this);
}.bind(this));
},showThisHideOpen:function(_1bc){
this.elements.each(function(el,i){
if(el.offsetHeight>0&&el!=_1bc){
this.clearAndToggle(el);
}
}.bind(this));
if(_1bc.offsetHeight==0){
setTimeout(function(){
this.clearAndToggle(_1bc);
}.bind(this),this.options.delay);
}
},clearAndToggle:function(el){
el.fx.clearTimer();
el.fx.toggle();
}};
var Remember=new Object();
Remember=function(){
};
Remember.prototype={initialize:function(el,_1bd){
this.el=$(el);
this.days=365;
this.options=_1bd;
this.effect();
var _1be=this.readCookie();
if(_1be){
this.fx.now=_1be;
this.fx.increase();
}
},setCookie:function(_1bf){
var date=new Date();
date.setTime(date.getTime()+(this.days*24*60*60*1000));
var _1c0="; expires="+date.toGMTString();
document.cookie=this.el+this.el.id+this.prefix+"="+_1bf+_1c0+"; path=/";
},readCookie:function(){
var _1c1=this.el+this.el.id+this.prefix+"=";
var ca=document.cookie.split(";");
for(var i=0;c=ca[i];i++){
while(c.charAt(0)==" "){
c=c.substring(1,c.length);
}
if(c.indexOf(_1c1)==0){
return c.substring(_1c1.length,c.length);
}
}
return false;
},custom:function(from,to){
if(this.fx.now!=to){
this.setCookie(to);
this.fx.custom(from,to);
}
}};
fx.RememberHeight=Class.create();
fx.RememberHeight.prototype=Object.extend(new Remember(),{effect:function(){
this.fx=new fx.Height(this.el,this.options);
this.prefix="height";
},toggle:function(){
if(this.el.offsetHeight==0){
this.setCookie(this.el.scrollHeight);
}else{
this.setCookie(0);
}
this.fx.toggle();
},resize:function(to){
this.setCookie(this.el.offsetHeight+to);
this.fx.custom(this.el.offsetHeight,this.el.offsetHeight+to);
},hide:function(){
if(!this.readCookie()){
this.fx.hide();
}
}});
fx.RememberText=Class.create();
fx.RememberText.prototype=Object.extend(new Remember(),{effect:function(){
this.fx=new fx.Text(this.el,this.options);
this.prefix="text";
}});
fx.expoIn=function(pos){
return Math.pow(2,10*(pos-1));
};
fx.expoOut=function(pos){
return (-Math.pow(2,-10*pos)+1);
};
fx.quadIn=function(pos){
return Math.pow(pos,2);
};
fx.quadOut=function(pos){
return -(pos)*(pos-2);
};
fx.circOut=function(pos){
return Math.sqrt(1-Math.pow(pos-1,2));
};
fx.circIn=function(pos){
return -(Math.sqrt(1-Math.pow(pos,2))-1);
};
fx.backIn=function(pos){
return (pos)*pos*((2.7)*pos-1.7);
};
fx.backOut=function(pos){
return ((pos-1)*(pos-1)*((2.7)*(pos-1)+1.7)+1);
};
fx.sineOut=function(pos){
return Math.sin(pos*(Math.PI/2));
};
fx.sineIn=function(pos){
return -Math.cos(pos*(Math.PI/2))+1;
};
fx.sineInOut=function(pos){
return -(Math.cos(Math.PI*pos)-1)/2;
};
fx.Position=Class.create();
fx.Position.prototype=Object.extend(new fx.Base(),{initialize:function(el,_1c2){
this.el=$(el);
this.setOptions(_1c2);
this.now=[0,0];
},step:function(){
var time=(new Date).getTime();
if(time>=this.options.duration+this.startTime){
this.now=this.to;
clearInterval(this.timer);
this.timer=null;
if(this.options.onComplete){
setTimeout(this.options.onComplete.bind(this),10);
}
}else{
var Tpos=(time-this.startTime)/(this.options.duration);
var tmp=[];
tmp[0]=(this.options.transition(Tpos)*(this.to[0]-this.from[0])+this.from[0]);
tmp[1]=(this.options.transition(Tpos)*(this.to[1]-this.from[1])+this.from[1]);
this.now=tmp;
}
this.increase();
},increase:function(){
this.el.style["left"]=this.now[0]+"px";
this.el.style["top"]=this.now[1]+"px";
},move:function(from,to){
to=to?to:this.now;
this.custom(from,to);
}});
fx.Color=Class.create();
fx.Color.prototype=Object.extend(new fx.Base(),{initialize:function(el,_1c3){
this.el=$(el);
this.setOptions(_1c3);
this.now=0;
this.regex=new RegExp("#?(..?)(..?)(..?)");
if(!this.options.fromColor){
this.options.fromColor="#FFFFFF";
}
if(!this.options.toColor){
this.options.toColor="#FFFFFF";
}
if(!this.options.property){
this.props=new Array("backgroundColor");
}else{
this.props=this.options.property.split(",");
}
},increase:function(){
var hex="rgb("+(Math.round(this.cs[0]+(this.ce[0]-this.cs[0])*this.now))+","+(Math.round(this.cs[1]+(this.ce[1]-this.cs[1])*this.now))+","+(Math.round(this.cs[2]+(this.ce[2]-this.cs[2])*this.now))+")";
for(i=0;i<this.props.length;i++){
if(this.props[i]=="backgroundColor"){
this.el.style.backgroundColor=hex;
}else{
if(this.props[i]=="color"){
this.el.style.color=hex;
}else{
if(this.props[i]=="borderColor"){
this.el.style.borderColor=hex;
}
}
}
}
},toggle:function(){
this.cs=this.regex.exec(this.options.fromColor);
this.ce=this.regex.exec(this.options.toColor);
for(i=1;i<this.cs.length;i++){
this.cs[i-1]=parseInt(this.cs[i],16);
this.ce[i-1]=parseInt(this.ce[i],16);
}
if(this.now>0){
this.custom(1,0);
}else{
this.custom(0,1);
}
},cycle:function(){
this.toggle();
setTimeout(this.toggle.bind(this),this.options.duration+10);
},customColor:function(from,to){
this.cs=this.regex.exec(from);
this.ce=this.regex.exec(to);
for(i=1;i<this.cs.length;i++){
if(this.cs[i].length==1){
this.cs[i]+=this.cs[i];
}
if(this.ce[i].length==1){
this.ce[i]+=this.ce[i];
}
this.cs[i-1]=parseInt(this.cs[i],16);
this.ce[i-1]=parseInt(this.ce[i],16);
}
this.custom(0,1);
},customColorRGB:function(from,to){
this.rgb_regex=new RegExp("^rgb.([^,]*),s?([^,]*),s?([^)]*)");
this.cs=this.rgb_regex.exec(from);
this.ce=this.rgb_regex.exec(to);
if(!this.cs){
this.customColor(from,to);
return;
}
for(i=1;i<this.cs.length;i++){
this.cs[i-1]=parseInt(this.cs[i]);
this.ce[i-1]=parseInt(this.ce[i]);
}
this.custom(0,1);
}});
fx.Slide=Class.create();
Object.extend(Object.extend(fx.Slide.prototype,fx.Layout.prototype),{increase:function(){
this.el.style.height=this.now+"px";
},toggle:function(){
if(this.el.offsetHeight>0){
this.custom(this.el.offsetHeight,0);
}else{
this.custom(0,this.el.scrollHeight);
}
}});
function toggleOverlay(id){
toggleOverlay.init(id);
toggleOverlay.toggleCurtain();
};
function overlayIsOpen(id){
toggleOverlay.init(id);
return toggleOverlay.curtain.style.display=="block";
};
toggleOverlay.init=function(id){
this.isIE6orBelow=false;
var _1c4=navigator.userAgent.toLowerCase();
var _1c5=_1c4.indexOf("msie")+1;
if(_1c5){
version=_1c4.charAt(_1c5+4);
if(version<=6){
this.isIE6orBelow=true;
}
}
this.isMobile=_1c4.indexOf("mobile")>-1;
this.overlay=$(id);
this.wrapper=this.getWrapper();
this.curtain=this.getCurtain();
this.wrapper.appendChild(this.overlay);
if(this.isIE6orBelow){
this.iframe=this.getIframe();
}
if(navigator.userAgent.indexOf("Linux")!=-1){
tempObjects=document.body.getElementsByTagName("object");
this.elementsToHide=[];
for(var i=0;i<tempObjects.length;i++){
if(!$(tempObjects[i]).descendantOf(this.overlay)){
this.elementsToHide.push(tempObjects[i]);
}
}
}
if(this.isMobile){
scroll(0,0);
}
};
toggleOverlay.toggleCurtain=function(id){
this.overlay.toggle();
if(this.curtain.style.display!="block"){
this.showCurtain();
}else{
this.hideCurtain();
}
};
toggleOverlay.showCurtain=function(){
this.setElementVisibility("hidden");
this.wrapper.style.display="block";
this.curtain.style.display="block";
if(this.isIE6orBelow){
this.iframe.style.display="block";
}
this.stretchCurtain();
jq(this.overlay).trigger("visible",true);
Event.observe(window,"resize",this.stretchCurtain,false);
};
toggleOverlay.hideCurtain=function(){
this.setElementVisibility("visible");
this.curtain.style.display="none";
this.wrapper.style.display="none";
if(this.isIE6orBelow){
this.iframe.style.display="none";
}
jq(this.overlay).trigger("visible",false);
Event.stopObserving(window,"resize",this.stretchCurtain,false);
};
toggleOverlay.setElementVisibility=function(_1c6){
if(this.elementsToHide){
for(i=0;i<this.elementsToHide.length;i++){
this.elementsToHide[i].style.visibility=_1c6;
}
}
};
toggleOverlay.getWrapper=function(){
var id="toggleOverlayWrapper";
var div=$(id);
if(div){
return div;
}
div=document.createElement("div");
div.id=id;
document.body.appendChild(div);
div.style.zIndex="1000";
if(this.isIE6orBelow){
div.style.position="absolute";
div.style.top=Position.getViewportScrollY()+"px";
Event.observe(window,"scroll",function(){
div.style.top=Position.getViewportScrollY()+"px";
});
}else{
div.style.position="fixed";
}
return div;
};
toggleOverlay.getCurtain=function(){
var id="toggleOverlayCurtain";
var _1c7=$(id);
if(_1c7){
return _1c7;
}
_1c7=document.createElement("div");
_1c7.id=id;
this.wrapper.appendChild(_1c7);
return _1c7;
};
toggleOverlay.getIframe=function(){
var id="toggleOverlayIframe";
var _1c8=$(id);
if(_1c8){
return _1c8;
}
_1c8=document.createElement("iframe");
_1c8.id=id;
_1c8.src="";
_1c8.frameBorder="no";
_1c8.scrolling="no";
document.body.appendChild(_1c8);
return _1c8;
};
toggleOverlay.stretchCurtain=function(){
if(document.documentElement){
height=document.documentElement.scrollHeight;
}else{
height=document.body.scrollHeight;
}
toggleOverlay.wrapper.style.height=height+"px";
toggleOverlay.wrapper.style.width=document.body.scrollWidth+"px";
toggleOverlay.curtain.style.height=height+"px";
if(this.isIE6orBelow){
toggleOverlay.iframe.style.height=height+"px";
toggleOverlay.iframe.style.width=document.body.scrollWidth+"px";
}
if(this.isMobile||navigator.userAgent.indexOf("AppleWebKit/")>-1&&!document.evaluate){
wd=self["innerWidth"];
}else{
if(navigator.userAgent.indexOf("Opera")>-1&&parseFloat(window.opera.version())<9.5){
wd=document.body["clientWidth"];
}else{
wd=document.documentElement["clientWidth"];
}
}
left=wd/2-toggleOverlay.overlay.clientWidth/2+"px";
toggleOverlay.overlay.style.left=left;
};
JSONstring={compactOutput:false,includeProtos:false,includeFunctions:false,detectCirculars:false,restoreCirculars:true,make:function(arg,_1c9){
this.restore=_1c9;
this.mem=[];
this.pathMem=[];
return this.toJsonStringArray(arg).join("");
},toObject:function(x){
eval("this.myObj="+x);
if(!this.restoreCirculars||!alert){
return this.myObj;
}
this.restoreCode=[];
this.make(this.myObj,true);
var r=this.restoreCode.join(";")+";";
eval("r=r.replace(/\\W([0-9]{1,})(\\W)/g,\"[$1]$2\").replace(/\\.\\;/g,\";\")");
eval(r);
return this.myObj;
},toJsonStringArray:function(arg,out){
if(!out){
this.path=[];
}
out=out||[];
var u;
switch(typeof arg){
case "object":
this.lastObj=arg;
if(this.detectCirculars){
var m=this.mem;
var n=this.pathMem;
for(var i=0;i<m.length;i++){
if(arg===m[i]){
out.push("\"JSONcircRef:"+n[i]+"\"");
return out;
}
}
m.push(arg);
n.push(this.path.join("."));
}
if(arg){
if(arg.constructor==Array){
out.push("[");
for(var i=0;i<arg.length;++i){
this.path.push(i);
if(i>0){
out.push(",\n");
}
this.toJsonStringArray(arg[i],out);
this.path.pop();
}
out.push("]");
return out;
}else{
if(typeof arg.toString!="undefined"){
out.push("{");
var _1ca=true;
for(var i in arg){
if(!this.includeProtos&&arg[i]===arg.constructor.prototype[i]){
continue;
}
this.path.push(i);
var curr=out.length;
if(!_1ca){
out.push(this.compactOutput?",":",\n");
}
this.toJsonStringArray(i,out);
out.push(":");
this.toJsonStringArray(arg[i],out);
if(out[out.length-1]==u){
out.splice(curr,out.length-curr);
}else{
_1ca=false;
}
this.path.pop();
}
out.push("}");
return out;
}
}
return out;
}
out.push("null");
return out;
case "unknown":
case "undefined":
case "function":
out.push(this.includeFunctions?arg:u);
return out;
case "string":
if(this.restore&&arg.indexOf("JSONcircRef:")==0){
this.restoreCode.push("this.myObj."+this.path.join(".")+"="+arg.split("JSONcircRef:").join("this.myObj."));
}
out.push("\"");
var a=["\\","\\\\","\n","\\n","\r","\\r","\"","\\\""];
arg+="";
for(var i=0;i<8;i+=2){
arg=arg.split(a[i]).join(a[i+1]);
}
out.push(arg);
out.push("\"");
return out;
default:
out.push(String(arg));
return out;
}
}};
var detect=navigator.userAgent.toLowerCase();
var OS,browser,version,total,thestring;
if(checkIt("konqueror")){
browser="Konqueror";
OS="Linux";
}else{
if(checkIt("safari")){
browser="Safari";
}else{
if(checkIt("opera")){
browser="Opera";
}else{
if(checkIt("msie")){
browser="IE";
}else{
if(!checkIt("compatible")){
browser="Netscape Navigator";
version=detect.charAt(8);
}else{
browser="An unknown browser";
}
}
}
}
}
if(!version){
version=detect.charAt(place+thestring.length);
}
if(!OS){
if(checkIt("linux")){
OS="Linux";
}else{
if(checkIt("x11")){
OS="Unix";
}else{
if(checkIt("mac")){
OS="Mac";
}else{
if(checkIt("win")){
OS="Windows";
}else{
OS="an unknown operating system";
}
}
}
}
}
var insideHubEditor=false;
function checkIt(_1cb){
place=detect.indexOf(_1cb)+1;
thestring=_1cb;
return place;
};
function ssToId(id){
var s=new SoftScroll(id);
return false;
};
function ssTo(_1cc){
var s=new SoftScroll("mod_"+_1cc);
return false;
};
function ssOnload(){
var _1cd=location.hash.slice(1);
if(_1cd=="comments"){
ssToId("comFirst");
}else{
if(_1cd.substr(0,8)=="comment-"){
ssToId("comment"+_1cd.substr(8));
}else{
if(_1cd!=null&&_1cd){
ssToId(_1cd);
}
}
}
};
var SoftScroll=Class.create();
SoftScroll.prototype={initialize:function(ele,_1ce,_1cf){
this.ele=$(ele);
this.durat=_1ce||1000;
this.delay=_1cf||0;
if(this.delay){
setTimeout(this.toggle.bind(this),this.delay);
}else{
this.toggle();
}
},toggle:function(){
this.scroll=new fx.Scroll({duration:this.durat});
this.scroll.scrollTo(this.ele);
}};
function insertVideo(type,key,css,_1d0,_1d1,_1d2){
var _1d3="<div class=\"video\">";
var mode="opaque";
if(_1d1){
mode="transparent";
}
if(_1d2=="bad"){
_1d3="<div class=\"video\" style=\"background-color: #f7e1e1; border-bottom:3px solid #ed9693; color: #440000; padding: 5px;\">"+"<p style=\"margin:0;\">&nbsp;The specified URL is not working</p></div>";
}
if(type=="Google"){
_1d3+="<embed style=\""+_1d0+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" id=\"VideoPlayback\" "+"src=\"http://video.google.com/googleplayer.swf?docId="+key+"&hl=en\""+" flashvars=\"\" wmode=\""+mode+"\">"+"</embed>";
}else{
if(type=="YouTube"){
_1d3+="<embed style=\""+_1d0+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://www.youtube.com/v/"+key+"\" scale=\"exactFit\" "+"wmode=\""+mode+"\">"+"</embed>";
}else{
if(type=="Revver"){
_1d3+="<embed style=\""+_1d0+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://flash.revver.com/player/1.0/player.swf?mediaId="+key+"\" scale=\"exactFit\" "+"wmode=\""+mode+"\" allowfullscreen=\"true\" allowScriptAccess=\"always\" flashvars=\"allowFullScreen=true\">"+"</embed>";
}else{
if(type=="Metacafe"){
_1d3+="<embed style=\""+_1d0+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://www.metacafe.com/fplayer/"+key+".swf\" scale=\"exactFit\" "+"wmode=\""+mode+"\">"+"</embed>";
}else{
if(type=="Yahoo"){
var vid=key.substr(0,key.indexOf("/"));
var id=key.substr(key.indexOf("/")+1);
_1d3+="<embed class=\""+css+"\" flashvars=\"callback_function=YAHOO.yv.Player.SWFInterface&amp;id="+id+"&amp;vid="+vid+"&amp;autoPlay=0"+"&amp;site=video.yahoo.com&amp;lang=en-US&amp;intl=us&amp;"+"thumbUrl=http%3A//us.i1.yimg.com/us.yimg.com/i/us/sch/cn/video08/"+vid+"_rnde180d393_19.jpg\""+" allowfullscreen=\"true\" allowscriptaccess=\"never\" quality=\"high\" bgcolor=\"#000\" scale=\"exactFit\" "+" src=\"http://d.yimg.com/static.video.yahoo.com/yep/YV_YEP.swf\""+" type=\"application/x-shockwave-flash\" wmode=\""+mode+"\" />";
}else{
if(type=="YahooSports"){
_1d3+="<embed class=\""+css+"\" vid=\""+key+"\" flashvars=\"vid="+key+"\" allowfullscreen=\"true\" allowscriptaccess=\"never\" quality=\"high\" "+" bgcolor=\"#000\" scale=\"exactFit\" src=\"http://d.yimg.com/m/up/ypp/sports/player.swf\" type=\"application/x-shockwave-flash\" wmode=\""+mode+"\" />";
}else{
if(type=="Vimeo"){
_1d3+="<embed style=\""+_1d0+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://vimeo.com/moogaloop.swf?clip_id="+key+"&amp;server=vimeo.com&amp;show_title=1&amp;show_byline=1&amp;"+"show_portrait=0&amp;color=&amp;fullscreen=1\" scale=\"exactFit\" allowFullscreen=\"true\" allowScriptAccess=\"never\" "+"wmode=\""+mode+"\">"+"</embed>";
}else{
if(type=="BlipTV"){
_1d3+="<embed style=\""+_1d0+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://blip.tv/play/"+key+"\" scale=\"exactFit\" allowFullscreen=\"true\" allowScriptAccess=\"always\" "+"wmode=\""+mode+"\">"+"</embed>";
}else{
if(type=="Unknown"){
_1d3+="<p style=\"margin-left:1em\">The specified URL was not recognized</p>";
}else{
_1d3+="<p style=\"margin-left:1em\">Video Not Available</p>";
}
}
}
}
}
}
}
}
}
_1d3+="</div>";
if(_1d1){
Element.update(_1d1,_1d3);
}else{
if(type!="New"){
document.write(_1d3);
}
}
};
function safeScriptEval(_1d4){
var _1d5=_1d4.innerHTML.strip();
if(_1d5.substring(0,4)=="<!--"){
_1d5=_1d5.substring(4,_1d5.length-3);
}
try{
eval(_1d5);
}
catch(e){
}
};
function seeMoreTags(id){
jq.post("/xml/tags.php",{a:id},function(rsp){
jq("#nav_tags").append(rsp);
});
};
function shareHub(url){
new Ajax.Request("/xml/hubfeedshare.php",{parameters:$H({url:url}).toQueryString(),onSuccess:function(req){
eval(req.responseText);
if(success){
$("share_with_followers").innerHTML="Hub shared!";
}else{
$("share_with_followers").innerHTML="Sorry, something went wrong!";
}
}});
};
function praiseHub(id,val,d,c){
if(!id){
return;
}
$("praise_feedback").innerHTML="Saving ...";
var uri=$H({a:id,v:val,h:1}).toQueryString();
var ajax=new Ajax.Updater("praise_item_"+Math.abs(val),"/xml/feedback.php",{parameters:uri,onFailure:reportError,onSuccess:function(){
$("praise_feedback").innerHTML="Saved. Thanks!";
}});
return false;
};
function recArt(id,val){
var _1d6="rec_"+id;
var uri=$H({a:id,v:val}).toQueryString();
var ajax=new Ajax.Updater({success:_1d6},"/xml/feedback.php",{parameters:uri,onFailure:reportError});
return false;
};
function selectTab(_1d7,_1d8,_1d9){
var _1da,_1db;
for(var i=0;i<_1d9;i++){
_1da=$("tab_"+_1d7+"_"+i);
_1db=$("tabcontent_"+_1d7+"_"+i);
if(!_1da||!_1db){
alert("Cannot locate element: baseid="+_1d7+" index="+_1d8+" tabcount="+_1d9);
}
if(i==_1d8){
Element.addClassName(_1da,"selected");
Element.addClassName(_1db,"selected");
}else{
Element.removeClassName(_1da,"selected");
Element.removeClassName(_1db,"selected");
}
}
return false;
};
function categoryFanMy(){
categoryFanBulkJoin("my_category_fans",false,true);
$("category_fan_search").innerHTML="";
$("category_fan_search_text").value="";
return false;
};
function categoryFanBulkJoin(id,_1dc,_1dd,_1de,_1df,_1e0){
var _1e1=document.getElementsByClassName("jc");
var cids=Array();
var _1e2=Array();
var i=0;
var k=0;
for(var j=0;j<_1e1.length;j++){
if(_1e1[j].checked){
cids[i++]=Number(_1e1[j].name.substr(3));
}else{
if(!_1de){
_1e2[k++]=Number(_1e1[j].name.substr(3));
}
}
}
checked_ids=cids.join(",");
unchecked_ids=_1e2.join(",");
if(_1de){
var ajax=new Ajax.Request("/xml/categoryFanBulkJoin.php",{parameters:$H({checked_ids:checked_ids,unchecked_ids:unchecked_ids,html_target:id}).toQueryString(),onSuccess:function(req){
if(_1df){
_1df(req);
}
}});
}else{
params={checked_ids:checked_ids,unchecked_ids:unchecked_ids,html_target:id};
if(typeof (_1e0)!="undefined"){
params["searchTxt"]=_1e0;
}
var ajax=new Ajax.Updater({success:id},"/xml/categoryFanBulkJoin.php",{parameters:$H(params).toQueryString(),onSuccess:function(req){
if(_1dc){
window.location.replace("/contacts/newuser.php");
return;
}else{
if(_1dd){
setTimeout(categoryFanHighlight,500);
}
}
if(_1df){
_1df(req);
}
}});
}
return false;
};
function categoryFanHighlight(){
var elts=$$(".highlighted");
elts.each(function(elt){
var _1e3=new fx.Color(elt,{duration:700,fromColor:"#feffd7",toColor:"#ffffff"});
_1e3.toggle();
});
};
function categoryFanSearch(_1e4,_1e5,_1e6,cols,_1e7){
if(!_1e6){
var _1e6=8;
}
if(!cols){
var cols=2;
}
var _1e8=$F(_1e5);
if(_1e8.strip()==""){
return;
}
var ajax=new Ajax.Updater({success:_1e4},"/xml/categoryFanSearch.php",{parameters:$H({search:_1e8,limit:_1e6,cols:cols}),onComplete:function(){
if(_1e7){
_1e7();
}
}});
return false;
};
function facebookConnect(_1e9){
if(typeof (_1e9)=="undefined"){
_1e9="/user/new/facebook_window.php";
}
this.child=facebookPopup("");
var uri=$H({returnurl:_1e9}).toQueryString();
var ajax=new Ajax.Request("/xml/facebook_authurl.php",{method:"post",parameters:uri,onFailure:reportError,onComplete:function(req){
eval(req.responseText);
if(typeof (authorizationUrl)!="undefined"){
this.child.document.location=authorizationUrl;
}else{
this.child.close();
}
}});
return false;
};
function facebookPopup(_1ea){
xyPos="";
if(window.screenX&&window.innerWidth){
xPos=window.screenX+((window.innerWidth-550)/2);
yPos=window.screenY+((window.innerHeight-300)/2);
xyPos="top="+yPos+",left="+xPos+",";
}else{
if(window.screenLeft&&document.body.clientHeight){
xPos=window.screenLeft+((document.body.clientWidth-550)/2);
yPos=window.screenTop+((document.body.clientHeight-300)/2);
xyPos="top="+yPos+",left="+xPos+",";
}
}
child=window.open(_1ea,"authwindow",xyPos+"width=550,height=300,scrollbars=no,location=yes");
child.opener=self;
if(window.focus){
this.child.focus();
}
return child;
};
function toggleShareIt(id,flg){
if(flg){
var uri=$H({art_id:id}).toQueryString();
var ajax=new Ajax.Updater({success:"share_tgt"},"/xml/shareit.php",{parameters:uri,onFailure:reportError});
}else{
$("share_tgt").innerHTML="";
}
return false;
};
function checkViolations(_1eb){
if(_1eb){
jq(".violations_span").html("");
var _1ec={check_violation:1};
}else{
var _1ec={update_status:1};
}
jQuery.ajax({type:"POST",url:"/xml/checkviolations.php",data:_1ec,dataType:"json",success:function(_1ed){
if(_1ed.data){
jq(".violations_span").html(_1ed.data);
}
if(!_1ed.complete){
setTimeout(checkViolations,30000);
}
}});
return false;
};
function showAskSignup(_1ee){
var uri=$H({btn_text:"ask!",explain:_1ee,show_signup:1}).toQueryString();
showAjaxOverlay("/xml/showsignup.php",uri,"linkarticle");
return false;
};
function showLinkArticle(url,_1ef){
var uri=$H({page_url:url,page_title:_1ef}).toQueryString();
showAjaxOverlay("/xml/linkarticle.php",uri,"linkarticle");
return false;
};
function showFlagHub(id){
var uri=$H({}).toQueryString();
showAjaxOverlay("/xml/flaghub.php?a="+id,uri,"flaghub");
return false;
};
function showFlagRequest(id){
var uri=$H({}).toQueryString();
showAjaxOverlay("/xml/flagrequest.php?r="+id,uri,"flagrequest");
return false;
};
function showFlagProfile(id){
var uri=$H({}).toQueryString();
showAjaxOverlay("/xml/flagprofile.php?u="+id,uri,"flagrequest");
return false;
};
function showEmailForm(purl,_1f0,_1f1){
var uri=$H({page_url:purl,page_type:_1f0,page_filter:_1f1}).toQueryString();
showAjaxOverlay("/xml/emailpage.php",uri,"emailhub");
return false;
};
function showEditProfileForm(){
var uri=$H({}).toQueryString();
showAjaxOverlay("/xml/profileform.php",uri,"editprofile");
return false;
};
function showTermsOfService(){
var uri=$H({}).toQueryString();
showAjaxOverlay("/xml/termsofservice.php",uri,"tos");
return false;
};
function showHubOverlay(url,_1f2,_1f3){
var uri=$H({url:url,addComment:_1f2,commentText:_1f3}).toQueryString();
showAjaxOverlay("/xml/articlerender.php",uri,"hubpage");
return false;
};
function showBioOverlay(uid){
var uri=$H({id:uid}).toQueryString();
showAjaxOverlay("/xml/userbio.php",uri,"userbio");
return false;
};
function showAjaxOverlay(_1f4,_1f5,_1f6){
if(!$("overlay")){
var pole=new Insertion.Before("footer","<div id=\"overlay\" class=\"overlay\" style=\"display:none\"><a id=\"overlay_close\" href=\"#\" onclick=\"return closeAjaxOverlay();\"/>close</a><div id=\"overlay_content\"><div class=\"spinner\"></div></div></div>");
}
if(_1f6){
$("overlay").addClassName(_1f6);
}
toggleOverlay("overlay");
var ajax=new Ajax.Updater({success:"overlay_content"},_1f4,{parameters:_1f5,onComplete:function(){
if(!$("fixed_title")){
return;
}
var _1f7=$("fixed_title").getHeight();
if(browser!="IE"||version>6){
$("overlay").setStyle({paddingTop:_1f7+"px"});
}
adjustOverlayHeight();
}.bind(this),onFailure:reportError,evalScripts:true});
};
function closeAjaxOverlay(){
toggleOverlay("overlay");
$("overlay").className="overlay";
$("overlay_content").innerHTML="<div class=\"spinner\"></div>";
return false;
};
function adjustOverlayHeight(){
var _1f8=browser=="IE"&&version<=6;
var _1f9=$("overlay");
var _1fa=Position.getViewportHeight();
if(_1fa>750){
var _1fb=_1fa-150;
}else{
var _1fb=_1fa-90;
}
var _1fc=_1f9.getStyle("paddingTop");
var _1fd=_1f9.getStyle("paddingBottom");
_1fb-=_1fc.substring(0,_1fc.length-2);
_1fb-=_1fd.substring(0,_1fd.length-2);
_1fb=Math.max(_1fb,100);
$("overlay").setStyle({height:_1fb+"px"});
if(_1fa>750){
$("overlay").setStyle({top:"75px"});
if($("fixed_title")&&!_1f8){
$("fixed_title").setStyle({top:"75px"});
}
}else{
$("overlay").setStyle({top:"45px"});
if($("fixed_title")&&!_1f8){
$("fixed_title").setStyle({top:"45px"});
}
}
if($("scrollable_content")){
var _1fe=$("overlay").getHeight()-$("fixed_title").getHeight()-10;
$("scrollable_content").setStyle({height:_1fe+"px"});
$("overlay_content").setStyle({overflowY:"visible"});
}else{
$("overlay_content").setStyle({height:(_1fb-60)+"px",overflowY:"auto"});
}
};
function follow(_1ff,_200,_201,_202,_203){
var data={typeId:_1ff,objectId:_200,isActive:_201,printNumbers:_202,overrides:_203};
var ajax=new jQuery.ajax({type:"POST",url:"/xml/follow.php",data:data,success:function(data){
if(data=="Not signed in"){
var url="/signin?explain=";
switch(_1ff){
case 1:
url+=escape("follow answers to this question");
break;
case 2:
url+=escape("follow comments to this Hub");
break;
case 3:
url+=escape("follow users");
break;
case 4:
url+=escape("follow categories");
break;
case 5:
url+=escape("follow posts in this forum topic");
break;
}
url+="&url=";
url+=encodeURI(document.URL);
document.location.href=url;
}else{
switch(_1ff){
case 1:
jQuery("#follow_"+_200).replaceWith(data);
break;
case 2:
jQuery(".follow_article_"+_200).replaceWith(data);
break;
case 3:
var json=JSONstring.toObject(data);
jQuery("#follow_"+_200).replaceWith(json.buttonText);
jQuery.fancybox(json.fanMail,{"autoDimensions":false,"height":400});
break;
case 4:
jQuery(".follow_"+_200).replaceWith(data);
break;
case 5:
jQuery("#follow_"+_200).replaceWith(data);
break;
}
}
}});
};
function updateFollowButton(_204,_205,_206,_207){
jQuery.ajax({type:"POST",url:"/xml/get_follow_text.php",data:{typeId:_204,objectId:_205,printNumbers:_206,overrides:_207},success:function(data){
switch(_204){
case 1:
jQuery("#follow_"+_205).replaceWith(data);
break;
case 2:
jQuery(".follow_article_"+_205).html(data);
break;
case 3:
var json=JSONstring.toObject(data);
jQuery("#follow_"+_205).replaceWith(json.buttonText);
break;
case 4:
jQuery(".follow_"+_205).replaceWith(data);
break;
case 5:
jQuery("#follow_"+_205).replaceWith(data);
break;
}
}});
};
function expandComments(id,mm,flg){
if(flg){
var _208=$H({mdc_id:id,modMode:mm}).toQueryString();
var ajax=new Ajax.Updater({success:"comment_tgt"},"/xml/comments.php",{parameters:_208,onFailure:reportError});
}else{
$("comment_tgt").innerHTML="";
}
return false;
};
function expandRequests(id,_209){
var _20a=$H({article_id:id,num_pages:_209}).toQueryString();
var ajax=new Ajax.Updater({success:"request_list_tgt"},"/xml/questions.php",{parameters:_20a,onFailure:reportError});
return false;
};
function activity_why(id,_20b,_20c,_20d){
var ajax=new Ajax.Updater({success:id},"/xml/activity_why.php",{parameters:$H({actionTypeId:_20b,actionTargetId:_20c,createDate:_20d}).toQueryString(),onFailure:reportError,onComplete:function(){
if(typeof canvas!="undefined"&&canvas.redraw){
canvas.redraw();
}
}});
return false;
};
function article_flag(id,flag){
var ajax=new Ajax.Updater({success:"flaglink_"+id+"_"+flag},"/xml/flaghub.php",{parameters:$H({aID:id,reason:flag}).toQueryString(),onFailure:reportError});
};
function ellipse(str,_20e){
if(str.length>_20e&&_20e!=0){
str=str.substr(0,_20e-3);
var pos=str.lastIndexOf(" ");
if(pos===-1){
str=str.substr(0,_20e-3)+"...";
}else{
str=str.substr(0,pos)+"...";
}
}
return str;
};
function loadRandomArt(_20f,_210){
var ajax=new Ajax.Request("/xml/random.php",{method:"post",parameters:"score="+_210,onFailure:reportError,onComplete:function(req){
_20f.location.href=req.responseText;
}});
};
function toggleCommentEdit(_211,_212){
if(_212){
$("cedit_"+_211).style.display="none";
$("cbox_"+_211).style.display="";
$("ctext_"+_211).style.display="none";
}else{
$("cedit_"+_211).style.display="";
$("cbox_"+_211).style.display="none";
$("ctext_"+_211).style.display="";
}
};
function reportError(req){
alert("Something went wrong. Please try again. And when you get a chance, you may want to report this issue in the Hubpages forums.");
var _213=req.getAllResponseHeaders();
var ajax=new Ajax.Request("/xml/reporterror.php",{parameters:_213+"&error=1"});
};
function addTagEntries(){
var _214=4;
var _215=document.createElement("div");
_215.id="moreEntryDiv";
var li=null;
var _216=4+1;
var _217=_216+_214;
for(var i=_216;i<_217;i++){
li=document.createElement("li");
_215.appendChild(li);
var _218=document.createElement("input");
_218.className="tagEntry";
_218.name="tag_"+i;
_218.type="text";
_218.size=40;
li.appendChild(_218);
}
$("tagEntries").appendChild(_215);
return true;
};
function hubtool_add_tag(_219){
var _21a=(_219)?$(_219):$("add_tag_input");
if(!_21a){
return;
}
var tag;
if(Field.present(_21a)&&_21a.type){
tag=$F(_21a);
Field.clear(_21a);
}else{
if(_21a.innerHTML){
tag=_21a.innerHTML;
Element.remove(Element.findElement(_21a,"li"));
}
}
if(!tag){
return;
}
var _21b=0;
var _21c=/^tag_(\d+)$/i;
var _21d=$$(".tagEntry");
_21d.each(function(ele){
if(ele.id){
var ms=_21c.exec(ele.id);
if(ms&&ms.length>0){
var id=parseInt(ms[1],10);
if($F(ele).length&&id>_21b){
_21b=id;
}
}
}
});
_21b++;
var _21e="tag_"+_21b;
var _21f=$("add_tag_input").parentNode;
var _220="<input class=\"tagEntry\" id=\""+_21e+"\" name=\""+_21e+"\" value=\""+tag+"\" size=\"30\" onFocus=\"_helpOn('help__tags')\" onBlur=\"_helpOff('help__tags')\" />";
if($(_21e)){
var _221=$(_21e).tabIndex;
Element.update($(_21e).parentNode,_220);
$(_21e).tabIndex=_221;
}else{
var _222=$("tag_1").tabIndex-1;
var _221=_222+_21b;
var pole=new Insertion.Before(_21f,"<li>"+_220+"</li>");
$(_21e).tabIndex=_221;
_221=$("add_tag_input").tabIndex;
_221++;
$("add_tag_input").tabIndex=_221;
}
return false;
};
function add_calculated_tag(_223,tag,_224){
var _225=tag.replace(/'/g,"\\'");
var _226=tag.replace(/ /g,"+");
var _227="tagd_"+tag.replace(/ /g,"_");
_227=_227.toLowerCase();
if($(_227)){
$(_227).style.fontWeight="bolder";
Field.clear("add_tag_input");
}else{
if(!tag.match(/^[a-zA-Z0-9 \-\'\&\.]{2,100}$/)){
alert("Invalid tag \""+tag+"\".\n\nTags should be from 2-100 characters, and contain only numbers, letters, spaces, dashes, periods, and ampersands.");
}else{
var _228=$("nav_tags_edit");
var _229="<a href=\"javascript:void delete_tag('"+_223+"','"+_225+"');\"><img src=\"http://x.hubpages.com/x/hubtool_discard_tag.gif\" width=\"14\" height=\"14\"/></a>";
_229+="<a id=\""+_227+"\" href=\"/tag/"+_226+"\">"+tag+"</a>";
var item=document.createElement("li");
item.innerHTML=_229;
_228.appendChild(item);
save_tag(_223,tag,false);
}
}
var _22a=$(_224);
Element.remove(Element.findElement(_22a,"li"));
return false;
};
function update_suggested_tags(_22b){
var _22c=$H({id:_22b});
var ajax=new Ajax.Updater({success:"suggested_tags"},"/xml/suggestedtags.php",{parameters:_22c,onFailure:reportError,onComplete:function(){
}});
};
function add_tag(_22d){
if(!$("add_tag_input")||!$F("add_tag_input")){
return;
}
var tag=$F("add_tag_input");
var _22e=tag.replace(/'/g,"\\'");
var _22f=tag.replace(/ /g,"+");
var _230="tagd_"+tag.replace(/ /g,"_");
_230=_230.toLowerCase();
if($(_230)){
$(_230).style.fontWeight="bolder";
Field.clear("add_tag_input");
}else{
if(!tag.match(/^[a-zA-Z0-9 \-\'\&\.]{2,100}$/)){
alert("Invalid tag \""+tag+"\".\n\nTags should be from 2-100 characters, and contain only numbers, letters, spaces, dashes, periods, and ampersands.");
}else{
var _231=$("nav_tags_edit");
var _232="<a href=\"javascript:void delete_tag('"+_22d+"','"+_22e+"');\"><img src=\"http://x.hubpages.com/x/hubtool_discard_tag.gif\" width=\"14\" height=\"14\"/></a>";
_232+="<a id=\""+_230+"\" href=\"/tag/"+_22f+"\">"+tag+"</a>";
var item=document.createElement("li");
item.innerHTML=_232;
_231.appendChild(item);
save_tag(_22d,tag,false);
Field.clear("add_tag_input");
}
}
return false;
};
function delete_tag(_233,tag){
if(!_233||!tag){
return;
}
var _234="tagd_"+tag.replace(/ /g,"_");
var _235=$(_234);
if(!_235){
return;
}
var li=_235.parentNode;
Element.remove(li);
save_tag(_233,tag,true);
return false;
};
function save_tag(_236,tag,del){
var _237=(del)?1:0;
var req={a:_236,v:tag,d:_237};
var _238=$H(req).toQueryString();
var ajax=new Ajax.Request("/xml/tagadd.php",{parameters:_238,onFailure:reportError,onComplete:function(){
if(typeof updateHubtoolWarnings!="undefined"){
updateHubtoolWarnings();
}
}});
};
function handleReturnKeyPress(_239,func){
_239=_239||window.event;
if(_239.keyCode==Event.KEY_RETURN){
Event.stop(_239);
func();
return false;
}else{
return true;
}
};
function fireOnReturn(_23a,func){
Event.observe(_23a,"keyup",function(_23b){
_23b=_23b||window.event;
if(_23b.which){
if(_23b.which==Event.KEY_RETURN){
_23b.preventDefault();
func();
}
}else{
if(_23b.keyCode){
if(_23b.keyCode==Event.KEY_RETURN){
Event.stop(_23b);
func();
}
}
}
},false);
};
function InlineEdit(){
};
InlineEdit._registered=[];
InlineEdit._onedit=[];
InlineEdit._ondone=[];
InlineEdit._editting=[];
InlineEdit._setonclick=false;
InlineEdit.register=function(ele,_23c){
var obj=$(ele);
obj.title="Click to edit";
obj.style.backgroundColor="#ffe";
obj.empty_text="";
InlineEdit._registered[obj.id]=_23c;
obj.highlight=function(){
if(this.hide_timer){
clearTimeout(this.hide_timer);
}
this.style.backgroundColor="#ffffd3";
if(this.empty_text&&(this.innerHTML=="&nbsp;"||this.innerHTML==" "||this.innerHTML.charCodeAt(0)==160)){
this.innerHTML=this.empty_text;
}
};
obj.onmouseover=obj.highlight;
obj.onmouseout=function(){
if(this.hide_timer){
clearTimeout(this.hide_timer);
}
this.hide_timer=setTimeout("var el=$('"+this.id+"');if (el) {el.unhighlight();}",1000);
};
obj.unhighlight=function(){
this.style.backgroundColor="#ffe";
if(this.empty_text&&this.innerHTML==this.empty_text){
this.innerHTML="&nbsp;";
}
};
if(!InlineEdit._setonclick){
document.onclick=InlineEdit._handleDocClick;
InlineEdit._setonclick=true;
}
};
InlineEdit.unregister=function(ele){
var obj=$(ele);
obj.title="";
if(obj.hide_timer){
clearTimeout(obj.hide_timer);
}
obj.onmouseover=function(){
};
obj.onmouseout=function(){
};
obj.style.backgroundColor="";
delete InlineEdit._registered[obj.id];
};
InlineEdit.registerCallbacks=function(ele,_23d,_23e){
var obj=$(ele);
InlineEdit._onedit[obj.id]=_23d;
InlineEdit._ondone[obj.id]=_23e;
};
InlineEdit._handleDocClick=function(e){
if(!document.getElementById||!document.createElement){
return;
}
var obj;
if(!e){
obj=window.event.srcElement;
}else{
obj=e.target;
}
while(obj.nodeType!=1){
obj=obj.parentNode;
}
if(obj.tagName=="TEXTAREA"||obj.tagName=="A"){
return;
}
while(!InlineEdit._registered[obj.id]&&obj.nodeName!="HTML"){
obj=obj.parentNode;
}
if(obj.nodeName=="HTML"){
return;
}
InlineEdit.edit(obj);
};
InlineEdit.edit=function(ele){
ele=$(ele);
if(!InlineEdit._registered[ele.id]){
return false;
}
if(InlineEdit._onedit[ele.id]){
var _23f=InlineEdit._onedit[ele.id];
_23f(ele);
}
var text=ele.innerHTML;
if(ele.empty_text&&ele.empty_text==text){
text=" ";
}
var _240=document.createElement("INPUT");
_240.type="text";
Element.cloneStyles(ele,_240);
ele.parentNode.insertBefore(_240,ele);
InlineEdit._insertEditSpanBefore(ele);
_240.id=ele.id+"_edit_inplace";
InlineEdit._editting[_240.id]=ele;
Element.remove(ele);
_240.value=text;
_240.focus();
_240.select();
return false;
};
InlineEdit._onButtonClick=function(_241){
_241=_241||window.event;
var _242=_241.target||_241.srcElement;
var _243=(_242.innerHTML.search(/CANCEL/)==-1)?true:false;
var _244=_242.parentNode;
var _245=_244;
while(_245&&!InlineEdit._editting[_245.id]){
_245=_245.previousSibling;
}
var _246=InlineEdit._editting[_245.id];
_245.hasFocus=false;
var z=_245.parentNode;
z.insertBefore(_246,_245);
z.removeChild(_245);
z.removeChild(document.getElementsByClassName("buttonSpan",z)[0]);
delete InlineEdit._editting[_245.id];
if(InlineEdit._ondone[_246.id]){
var _247=InlineEdit._ondone[_246.id];
_247(_246);
}
if(_243){
_246.innerHTML=(_245.value.length>0)?_245.value:"&nbsp;";
var _248=InlineEdit._registered[_246.id];
_248(_245.value);
}
};
InlineEdit._insertEditSpanBefore=function(obj){
if(document.getElementById&&document.createElement){
var _249=document.createElement("span");
_249.className="buttonSpan";
var butt=document.createElement("button");
var _24a=document.createTextNode("OK");
butt.appendChild(_24a);
_249.appendChild(butt);
var _24b=document.createElement("button");
var _24c=document.createTextNode("CANCEL");
_24b.appendChild(_24c);
_249.appendChild(_24b);
obj.parentNode.insertBefore(_249,obj);
butt.onclick=InlineEdit._onButtonClick;
_24b.onclick=InlineEdit._onButtonClick;
}
};
var SampleDuration=Class.create();
SampleDuration.prototype={initialize:function(_24d){
this.art_id=_24d;
this.t=new Timer();
this.onleaveListener=this.onleave.bindAsEventListener(this);
Event.observe(window,"beforeunload",this.onleaveListener,false);
},onleave:function(e){
e=e||window.event;
this.t.stop();
var _24e=$H({art_id:this.art_id,dur:this.t.length});
var ajax=new Ajax.Request("/xml/duration",{parameters:_24e.toQueryString()});
}};
var myGlobalHandlers={onCreate:function(){
this.flag(true);
},onComplete:function(){
if(Ajax.activeRequestCount==0){
this.flag(false);
this.shouldShowIcon=false;
}
},onScroll:function(){
var div=insideHubEditor?$("ajaxing_big"):$("ajaxing");
if(div){
var _24f=insideHubEditor?200:0;
div.style.top=(Position.getViewportScrollY()+_24f)+"px";
}
},flagUp:function(){
this.flag(true);
},flagDown:function(){
this.flag(false);
},flag:function(up){
if(up){
this.shouldShowIcon=true;
setTimeout(this.showIcon.bind(this),2000);
}else{
if(!this.iconVisible){
return;
}
var _250=insideHubEditor?$("ajaxing_big"):$("ajaxing");
if(_250){
this.shouldShowIcon=false;
_250.style.display="none";
Event.stopObserving(window,"scroll",this.scrollListener,false);
this.scrollListener=null;
this.iconVisible=false;
}
}
},showIcon:function(id){
if(this.shouldShowIcon&&!this.iconVisible&&Ajax.activeRequestCount>0){
this.iconVisible=true;
var _251=insideHubEditor?$("ajaxing_big"):$("ajaxing");
_251.style.display="inline";
this.onScroll();
this.scrollListener=this.onScroll.bindAsEventListener(this);
Event.observe(window,"scroll",this.scrollListener,false);
}
}};
Ajax.Responders.register(myGlobalHandlers);
Element.setOpacity=function(ele,_252){
ele=$(ele);
if(window.ActiveXObject){
ele.style.filter="alpha(opacity="+Math.round(_252*100)+")";
}
ele.style.opacity=_252;
};
Element.getCurrentStyle=function(ele){
ele=$(ele);
var _253;
if(document.defaultView){
_253=document.defaultView.getComputedStyle(ele,"");
}else{
_253=ele.currentStyle;
}
return _253;
};
Element.cloneStyles=function(ele,_254,_255){
ele=$(ele);
_254=$(_254);
var _256=Element.getCurrentStyle(ele);
for(var name in _256){
if(browser=="Opera"){
if(name=="height"||name=="pixelHeight"||name=="pixelWidth"||name=="posHeight"||name=="posWidth"||name=="width"||name=="font"||name=="fontSize"){
continue;
}
}
var _257=_256[name];
if(_257!==""&&!(_257 instanceof Object)&&name!="length"&&name!="parentRule"){
if(_255&&name.indexOf(_255)!==0){
continue;
}
_254.style[name]=_257;
}
}
return _254;
};
Element.findElement=function(_258,_259){
_258=$(_258);
while(_258.parentNode&&(!_258.tagName||(_258.tagName.toUpperCase()!=_259.toUpperCase()))){
_258=_258.parentNode;
}
return _258;
};
String.prototype.trim=function(){
var res=this;
while(res.substring(0,1)==" "){
res=res.substring(1,res.length);
}
while(res.substring(res.length-1,res.length)==" "){
res=res.substring(0,res.length-1);
}
return res;
};
String.prototype.startsWith=function(_25a){
var res=this;
return res.substring(0,_25a.length)==_25a;
};
Element.getWidth=function(ele){
ele=$(ele);
return ele.offsetWidth;
};
Element.ellipsis=function(ele,len){
len=len||(100);
var p=$(ele);
if(p&&p.innerHTML){
var _25b=p.innerHTML;
if(_25b.length>len){
_25b=_25b.substring(0,len);
_25b=_25b.replace(/\w+$/,"");
_25b+="...";
p.innerHTML=_25b;
}
}
};
Position.getViewportHeight=function(){
if(window.innerHeight!=window.undefined){
return window.innerHeight;
}
if(document.compatMode=="CSS1Compat"){
return document.documentElement.clientHeight;
}
if(document.body){
return document.body.clientHeight;
}
return window.undefined;
};
Position.getViewportWidth=function(){
if(window.innerWidth!=window.undefined){
return window.innerWidth;
}
if(document.compatMode=="CSS1Compat"){
return document.documentElement.clientWidth;
}
if(document.body){
return document.body.clientWidth;
}
return window.undefined;
};
Position.getDocumentHeight=function(){
return document.documentElement.scrollHeight;
};
Position.getDocumentWidth=function(){
return document.documentElement.scrollWidth;
};
Position.getViewportScrollX=function(){
var _25c=0;
if(document.documentElement&&document.documentElement.scrollLeft){
_25c=document.documentElement.scrollLeft;
}else{
if(document.body&&document.body.scrollLeft){
_25c=document.body.scrollLeft;
}else{
if(window.pageXOffset){
_25c=window.pageXOffset;
}else{
if(window.scrollX){
_25c=window.scrollX;
}
}
}
}
return _25c;
};
Position.getViewportScrollY=function(){
var _25d=0;
if(document.documentElement&&document.documentElement.scrollTop){
_25d=document.documentElement.scrollTop;
}else{
if(document.body&&document.body.scrollTop){
_25d=document.body.scrollTop;
}else{
if(window.pageYOffset){
_25d=window.pageYOffset;
}else{
if(window.scrollY){
_25d=window.scrollY;
}
}
}
}
return _25d;
};
Position.viewportPosition=function(id){
var off=jq("#"+id).offset();
eleBot=off.top+jq("#"+id).height();
var _25e=jq(window).scrollTop();
var _25f=_25e+jq(window).height();
if(eleBot<_25e){
return -1;
}
if(off.top>_25f){
return 1;
}
return 0;
};
Position.withinViewport=function(ele){
var off=Position.cumulativeOffset($(ele));
var _260=[0+Position.getViewportScrollX(),Position.getViewportScrollY()];
var _261=[_260[0]+Position.getViewportWidth(),_260[1]+Position.getViewportHeight()];
return (_260[0]<off[0]&&off[0]<_261[0]&&_260[1]<off[1]&&off[1]<_261[1]);
};
Position.set=function(ele,_262){
if(ele&&_262){
ele.style.left=_262[0]+"px";
ele.style.top=_262[1]+"px";
}
};
function check_signed_in_ajax(_263,_264){
jQuery.ajax({url:"/xml/checksignedin.php",complete:function(_265,_266){
_263(eval(_265.responseText),_264);
}});
};
function phone_verify_required(_267,_268,_269,_26a){
if(typeof (_26a)=="undefined"){
data={};
}else{
data={a:_26a};
}
jq.post("/xml/verify/phoneverifyrequired.php",data,function(req){
if(req){
require_phone_verification(_267);
}else{
_268.apply(null,_269);
}
},"json");
};
function require_phone_verification(_26b,_26c){
url="/xml/verify/phone.php";
if(typeof (_26c)!="undefined"&&_26c){
url+="?update=1";
}
jq.post(url,{inOrderToDoWhat:_26b},function(rsp){
jq.fancybox({content:"<div id=\"phone_verify\">"+rsp+"</div>",overlayColor:"#000",overlayOpacity:0.8,titleShow:false,autoDimensions:false,height:300});
});
};
function select_all(name,_26d,end){
for(var i=_26d;i<=end;i++){
var ele=$(name+"_"+i);
if(ele){
ele.checked=true;
}
}
var disp=$(name+"_selected");
if(disp){
disp.innerHTML=(end-_26d)+1;
}
update_plural(name);
};
function unselect_all(name,_26e,end){
for(var i=_26e;i<=end;i++){
var ele=$(name+"_"+i);
if(ele){
ele.checked=false;
}
}
var disp=$(name+"_selected");
if(disp){
disp.innerHTML=0;
}
update_plural(name);
};
function checkbox_onchange(name,num){
var disp=$(name+"_selected");
if(disp){
var ele=$(name+"_"+num);
if(ele.checked){
disp.innerHTML=parseInt(disp.innerHTML,10)+1;
update_plural(name);
}else{
disp.innerHTML=parseInt(disp.innerHTML,10)-1;
update_plural(name);
}
}
};
function update_plural(name){
var ele=document.getElementById(name+"_selected");
if(ele){
var disp=document.getElementById(name+"_plural");
if(disp){
if(parseInt(ele.innerHTML,10)==1){
disp.innerHTML=" is";
}else{
disp.innerHTML="s are";
}
}
}
};
function import_now(_26f,name,_270,end){
var _271=self.opener.document.getElementById(_26f);
if(_271){
for(var i=_270;i<=end;i++){
var ele=$(name+"_"+i);
if(ele&&ele.checked){
var _272=$(name+"_email_"+i);
if(_271.value.length<2||_271.value.charAt(_271.value.length)==","||_271.value.charAt(_271.value.length-1)==","){
_271.value=_271.value+_272.innerHTML;
}else{
_271.value=_271.value+", "+_272.innerHTML;
}
}
}
}else{
alert("cannot locate parent (opener) window!");
}
};
function charCounter(_273,_274,max){
var _275=document.getElementById(_273);
var _276=document.getElementById(_274);
if(!_275){
alert("charCounter bad source: "+_273);
}
if(!_276){
alert("charCounter bad source: "+_274);
}
if(_275.value.length>max){
_275.value=_275.value.substring(0,max);
}
_276.value=max-_275.value.length;
};
function hideAnswers(){
$("hiddenAnswers").hide();
$("hideAnswers").hide();
$("showAnswers").show();
return false;
};
function showAnswers(){
$("hiddenAnswers").show();
$("hideAnswers").show();
$("showAnswers").hide();
return false;
};
function fetchAnswers(_277,_278,_279){
var _27a=$H({answerIds:_277,enableVoting:_278,enableEditing:_279}).toQueryString();
new Ajax.Updater("hiddenAnswers","/xml/answerfetch.php",{parameters:_27a});
$("hideAnswers").show();
$("fetchAnswers").hide();
return false;
};
function answerVote(id,v){
new Ajax.Updater("voting_"+id,"/xml/answervote.php",{parameters:{id:id,vote:v}});
return false;
};
function answerVoteDown(id){
return answerVote(id,-1);
};
function answerVoteUp(id){
return answerVote(id,1);
};
function fetchRecaptcha(_27b){
var _27c="6LemUQQAAAAAAC6mNwmiXb8ZwmUU0R9Z5v_yZ5xl";
if(typeof (Recaptcha)=="undefined"){
var _27d=document.getElementsByTagName("head")[0];
var _27e=document.createElement("script");
_27e.type="text/javascript";
_27e.src="http://api.recaptcha.net/js/recaptcha_ajax.js";
_27e.onload=function(){
Recaptcha.create(_27c,_27b,{theme:"red"});
};
_27e.onreadystatechange=function(){
if(this.readyState=="loaded"||this.readyState=="complete"){
Recaptcha.create(_27c,_27b,{theme:"red"});
}
};
_27d.appendChild(_27e);
}else{
Recaptcha.create(_27c,_27b,{theme:"red"});
}
};
function whenSignedIn(_27f,fn){
args=Array.prototype.slice.call(arguments);
args=args.slice(2);
info={options:_27f,fn:fn,args:args};
check_signed_in_ajax(whenSignedInCallback,info);
return false;
};
function whenSignedInCallback(_280,info){
if(_280){
info.fn.apply(null,info.args);
}else{
if(jQuery("#signInOverlay").size()==0){
var html="<div id=\"signInOverlay\" class=\"overlay\" style=\"display: none;\">";
html+="<a class=\"close\" href=\"#\" onclick=\"toggleOverlay('signInOverlay'); return false;\">close</a>";
html+="<div id=\"signInOverlayContent\"></div>";
html+="</div>";
jQuery("body").append(html);
}
jQuery.get("/xml/signinupform.php",info.options,function(data){
jQuery("#signInOverlayContent").html(data);
suFH.onSuccess=afterSignedIn.bind(null,info);
siFH.onSuccess=afterSignedIn.bind(null,info);
if(typeof (fetchRecaptcha)!="undefined"){
fetchRecaptcha("captcha_div");
}
toggleOverlay("signInOverlay");
});
}
return false;
};
function afterSignedIn(info){
toggleOverlay("signInOverlay");
info.fn.apply(null,info.args);
};
function getEvent(evt){
return window.event||evt;
};
function getKeyProperties(evt){
var e=getEvent(evt);
var k=e.keyCode?e.keyCode:e.charCode?e.charCode:e.which;
var t=e.target?e.target:e.srcElement?e.srcElement:e.which;
return {evt:e,keyCode:k,target:t};
};
function checkTabKeyAlone(evt){
var p=getKeyProperties(evt);
return (p.keyCode==9&&!p.evt.shiftKey&&!p.evt.ctrlKey&&!p.evt.altKey);
};
function checkShiftTabKey(evt){
var p=getKeyProperties(evt);
return (p.keyCode==9&&p.evt.shiftKey&&!p.evt.ctrlKey&&!p.evt.altKey);
};
function getSelectionProperties(evt){
var p=getKeyProperties(evt);
var tr=(p.target.setSelectionRange)?null:document.selection.createRange();
var tab=String.fromCharCode(9);
if(tr){
var br=document.body.createTextRange();
br.moveToElementText(p.target);
br.setEndPoint("StartToStart",tr);
var ss=p.target.value.length-br.text.length;
var se=ss+tr.text.length;
}else{
var ss=p.target.selectionStart;
var se=p.target.selectionEnd;
}
return {setSelection:function(ss,se){
if(tr){
var adj=ss-tab.length*(p.target.value.substring(0,ss).split("\n").length-1);
var adj2=se+tab.length*(p.target.value.substring(se,p.target.value.length).split("\n").length-1);
var nr=document.body.createTextRange();
nr.moveToElementText(p.target);
nr.moveStart("character",adj);
nr.moveEnd("character",-(p.target.value.length-adj2));
nr.select();
}else{
p.target.selectionStart=ss;
p.target.selectionEnd=se;
}
},isMultiline:function(){
return (se>(ss+2)&&p.target.value.slice(ss,se-2).indexOf("\n")!=-1);
},removeTab:function(){
if(this.isMultiline()){
var sel=p.target.value.slice(ss,se);
var a=sel.split("\n");
for(var i=0;i<a.length;i++){
if(a[i].slice(0,1)==tab||a[i].slice(0,1)==" "){
a[i]=a[i].slice(1,a[i].length);
}
}
sel=a.join("\n");
var pre=p.target.value.slice(0,ss);
var post=p.target.value.slice(se,p.target.value.length);
p.target.value=pre.concat(sel,post);
this.setSelection(ss,pre.length+sel.length);
}else{
var brt=p.target.value.slice(0,ss);
var ch=brt.slice(brt.length-1,brt.length);
if(ch==tab||ch==" "){
p.target.value=brt.slice(0,brt.length-1).concat(p.target.value.slice(ss,p.target.value.length));
this.setSelection(ss-1,se-1);
}
}
},addTab:function(){
if(this.isMultiline()){
if(ss>0){
ss=p.target.value.slice(0,ss).lastIndexOf("\n")+1;
}
var pre=p.target.value.slice(0,ss);
var sel=p.target.value.slice(ss,se);
var post=p.target.value.slice(se,p.target.value.length);
sel=sel.replace(/\n/g,"\n"+tab);
pre=pre.concat(tab);
p.target.value=pre.concat(sel,post);
this.setSelection(ss,se+(tab.length*sel.split("\n").length));
}else{
var pre=p.target.value.substring(0,ss);
var sel=p.target.value.substring(ss,se);
var post=p.target.value.substring(se,p.target.value.length);
pre=pre.concat(tab);
p.target.value=pre.concat(sel,post);
this.setSelection(ss+tab.length,se+tab.length);
}
}};
};
function getTextAreaSelection(evt){
var p=getKeyProperties(evt);
if(p.target.setSelectionRange){
var ss=p.target.selectionStart;
var se=p.target.selectionEnd;
return (ss!=se)?p.target.value.slice(ss,se):null;
}else{
var r=document.selection.createRange();
return (r.text.length!=0)?r.text:null;
}
};
function updateNumCharCount(_281,_282,_283){
if($(_282).hasClassName("dimmed")){
$(_283).update(_281);
}else{
if($(_282).value.length>_281){
$(_282).value=$(_282).value.substring(0,_281);
}
$(_283).update(_281-$(_282).value.length);
}
};
function checkCharCount(_284,_285,_286){
updateNumCharCount(_284,_285,_286);
Event.observe(_285,"click",function(){
updateNumCharCount(_284,_285,_286);
});
Event.observe(_285,"keypress",function(evt){
updateNumCharCount(_284,_285,_286);
if(evt.keyCode!=Event.KEY_BACKSPACE&&evt.keyCode!=Event.KEY_LEFT&&evt.keyCode!=Event.KEY_RIGHT&&evt.keyCode!=Event.KEY_UP&&evt.keyCode!=Event.KEY_DOWN&&(browser=="Opera"||evt.keyCode!=Event.KEY_DELETE)){
if($(_285).value.length>=_284){
Event.stop(evt);
return false;
}
}
return true;
});
Event.observe(_285,"keyup",function(){
updateNumCharCount(_284,_285,_286);
});
Event.observe(_285,"keydown",function(){
updateNumCharCount(_284,_285,_286);
});
};
function _drawPointerInd(_287,_288,_289){
if(typeof _289=="undefined"){
_289="ind";
}
var _28a="<div id=\""+_289+"\"><div>"+_288+"</div></div>";
var pole=new Insertion.Bottom(_287,_28a);
if(!window.ActiveXObject){
$(_289).style.position="fixed";
}
setTimeout(function(){
if($(_289)){
Element.remove(_289);
}
},3500);
};
function getElementScreenTop(){
var _28b=(window.pageYOffset)?window.pageYOffset:(document.documentElement)?document.documentElement.scrollTop:document.body.scrollTop;
return _28b;
};
function setElementScreenTop(top){
if(window.pageYOffset){
var x=window.pageXOffset;
window.scrollTo(x,top);
}else{
if(document.documentElement){
document.documentElement.scrollTop=top;
}else{
document.body.scrollTop=top;
}
}
};
function scrollElementInView(_28c){
var _28d=getElementScreenTop();
var top=getElementTop(_28c);
if(top<_28d){
setElementScreenTop(top);
}
};
function getElementDimensions(elem){
var top=0,left=0,_28e=elem.getWidth(),_28f=elem.getHeight();
do{
top+=elem.offsetTop;
left+=elem.offsetLeft;
elem=elem.offsetParent;
}while(elem!=null);
return {top:top,left:left,right:left+_28e,bottom:top+_28f};
};
function getElementTop(elem){
var top=0;
do{
top+=elem.offsetTop;
elem=elem.offsetParent;
}while(elem!=null);
return top;
};
function getElementLeft(elem){
var left=0;
do{
left+=elem.offsetLeft;
elem=elem.offsetParent;
}while(elem!=null);
return left;
};
function getElementRight(elem){
return getElementLeft(elem)+elem.getWidth();
};
function getElementBottom(elem){
return getElementTop(elem)+elem.getHeight();
};
function removePXFromSize(size){
if(size.length>2&&size.substring(size.length-2).toLowerCase()=="px"){
return size.substring(0,size.length-2);
}else{
return size;
}
};
function StringBuffer(){
this.buffer=[];
};
StringBuffer.prototype.append=function(_290){
this.buffer.push(_290);
return this;
};
StringBuffer.prototype.toString=function toString(){
return this.buffer.join("");
};
function dump_divs(){
var _291="DIV REPORT:<br/>";
var divs=$A(document.getElementsByTagName("div"));
divs.each(function(div){
if(div.id){
_291+="#"+div.id+", ";
}
_291+="."+div.className+", "+div.offsetWidth+" x "+div.offsetHeight+"<br/>";
});
if(!$("debug_div")){
out("create");
}
$("debug_div").innerHTML=_291;
};
function out(_292){
if(window.console){
console.log(_292);
}else{
var pole;
var _293="<div id=\"debug_div\"></div>";
if(!$("debug_div")){
if($("footer")){
pole=new Insertion.Bottom("footer",_293);
}else{
if($("sidebar")){
pole=new Insertion.Bottom("sidebar",_293);
}
}
}
if($("debug_div")){
pole=new Insertion.Bottom("debug_div",_292+"<br/>");
}
}
};
function search_escape(str){
newstr=encodeURI(str);
newstr=newstr.replace(/\%20/g,"+");
return newstr;
};
var Timer=Class.create();
Timer.prototype={initialize:function(){
this.start();
},start:function(){
this.startTime=new Date();
},stop:function(){
this.stopTime=new Date();
this.length=(this.stopTime-this.startTime);
},inspect:function(){
if(!this.stopTime){
this.stop();
}
return "duration: "+this.length+"ms";
}};
function google_ad_request_done(_294){
var s="";
var i;
if(_294.length==0){
return;
}
if(_294[0].type=="flash"){
s+="<a class=\"adsbygoogle\" href=\""+google_info.feedback_url+"\">Ads by Google</a><br>"+"<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\""+" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0\" WIDTH=\""+_294[0].image_width+"\" HEIGHT=\""+_294[0].image_height+"\"> <PARAM NAME=\"movie\" VALUE=\""+_294[0].image_url+"\">"+"<PARAM NAME=\"quality\" VALUE=\"high\">"+"<PARAM NAME=\"AllowScriptAccess\" VALUE=\"never\">"+"<EMBED src=\""+_294[0].image_url+"\" WIDTH=\""+_294[0].image_width+"\" HEIGHT=\""+_294[0].image_height+"\" TYPE=\"application/x-shockwave-flash\""+" AllowScriptAccess=\"never\" "+" PLUGINSPAGE=\"http://www.macromedia.com/go/getflashplayer\"></EMBED></OBJECT>";
}else{
if(_294[0].type=="image"){
s+="<a class=\"adsbygoogle\" href=\""+google_info.feedback_url+"\">Ads by Google</a><br> <a href=\""+_294[0].url+"\" target=\"_top\" title=\"go to "+_294[0].visible_url+"\" onmouseout=\"window.status=''\" onmouseover=\"window.status='go to "+_294[0].visible_url+"';return true\"><img border=\"0\" src=\""+_294[0].image_url+"\"width=\""+_294[0].image_width+"\"height=\""+_294[0].image_height+"\"></a>";
}else{
if(_294[0].type=="html"){
s+=_294[0].snippet;
}else{
s+="<div class=\"cjs_wrapper\">";
s+="<a class=\"adsbygoogle\" href=\""+google_info.feedback_url+"\">Ads by Google</a><br>";
for(i=0;i<_294.length;++i){
ad=_294[i];
s+="<div class=\"cjs_titleurl\">";
s+="<a class=\"cjs_title\" href=\""+ad.url+"\">"+ad.line1+"</a> ";
s+="<a class=\"cjs_url\" href=\""+ad.url+"\">"+ad.visible_url+"</a>";
s+="</div>";
s+="<div class=\"cjs_desc\">"+ad.line2+" "+ad.line3+"</div>";
}
s+="</div>";
}
}
}
document.write(s);
return;
};
function hpFormHandler(_295){
this.submitMode=false;
this.submitUri="/";
this.nextUri="/";
this.lit=false;
this.form=$(_295);
this.errors=$H({});
this.method="post";
this.errorId="formErrors";
this.errorHeader="<strong>Please fix these errors before continuing:</strong><br/>";
this.useEffects=true;
this.individualerrors=false;
this.scrollToErrors=false;
this.ensureSignedInBeforeSave=false;
this.ensureSignedInOptions={};
this.ensureCheckedSecurity=false;
this.lastCheckedSecurity=new Date().getTime()-(1000*1000);
this.setValidators();
};
hpFormHandler.prototype.handleSubmitServerError=function(req){
};
hpFormHandler.prototype.validateHideDiv=function(id){
$(id).hide();
};
hpFormHandler.prototype.validateLengthMax=function(ele,max,msg){
var val=$F(ele);
this.testForError(($F(ele).trim().length>max),ele,msg);
};
hpFormHandler.prototype.validateLengthMin=function(ele,min,msg){
var val=$F(ele);
this.testForError((val.length!=0&&val.length<min),ele,msg);
};
hpFormHandler.prototype.validateLengthExactly=function(ele,len,msg){
var val=$F(ele);
this.testForError((val.length!=0&&val.length!=len),ele,msg);
};
hpFormHandler.prototype.validateValueMin=function(ele,min,msg){
var val=$F(ele);
this.testForError(val<min,ele,msg);
};
hpFormHandler.prototype.validateValueMax=function(ele,max,msg){
var val=$F(ele);
this.testForError(val>max,ele,msg);
};
hpFormHandler.prototype.validateMandatory=function(ele,msg){
var val=false;
if($F(ele)){
val=$F(ele).trim();
}
this.testForError((!val||val.length==0),ele,msg);
};
hpFormHandler.prototype.validateRadioChecked=function(ele,msg){
if(!ele.name){
return;
}
var _296=$$("input[name="+ele.name+"]");
var _297=false;
_296.each(function(r){
if(r.checked==true){
_297=true;
throw $break;
}
});
this.testForError(!_297,ele,msg);
};
hpFormHandler.prototype.validateEnoughSpaces=function(ele,msg){
val=$F(ele).trim();
var _298=false;
if(val.length>=20){
var _299=val.match(/\s+/g);
var _29a=_299?_299.length:0;
var _29b=_29a+1;
_298=_29b/(val.length-_29a)<0.08;
}
this.testForError(_298,ele,msg);
};
hpFormHandler.prototype.validateIsNumeric=function(ele,msg){
this.validateRegex(ele,/^\s*[0-9]*\s*$/,msg);
};
hpFormHandler.prototype.validateRegex=function(ele,_29c,msg){
var val=$F(ele);
this.testForError((val.length!=0&&val.search(_29c)==-1),ele,msg);
};
hpFormHandler.prototype.validateNoRegex=function(ele,_29d,msg){
var val=$F(ele);
this.testForError((val.search(_29d)!=-1),ele,msg);
};
hpFormHandler.prototype.validateNoSpaces=function(ele,msg){
var val=$F(ele).trim();
this.testForError(val.search(/ /)!=-1,ele,msg);
};
hpFormHandler.prototype.validateNot=function(ele,not,msg){
this.testForError(($F(ele).trim()==not),ele,msg);
};
hpFormHandler.prototype.validateSameAs=function(ele,ele2,msg){
this.testForError(($F(ele)!=$F(ele2)),ele,msg);
};
hpFormHandler.prototype.validateNoWords=function(ele,_29e,msg){
var val=$F(ele);
var _29f=false;
for(i=0;i<_29e.length&&!_29f;i++){
var _2a0=new RegExp("[^a-zA-Z]"+_29e[i]+"[^a-zA-Z]","i");
_29f=(val.search(_2a0)>=0);
if(!_29f){
_2a0=new RegExp("^"+_29e[i]+"[^a-zA-Z]","i");
_29f=(val.search(_2a0)>=0);
}
if(!_29f){
_2a0=new RegExp("[^a-zA-Z]"+_29e[i]+"$","i");
_29f=(val.search(_2a0)>=0);
}
if(!_29f){
_2a0=new RegExp("^"+_29e[i]+"$","i");
_29f=(val.search(_2a0)>=0);
}
}
this.testForError(_29f,ele,msg);
};
hpFormHandler.prototype.validateServerCheck=function(ele,url,msg){
var val=$F(ele);
if(val.length==0){
return;
}
if(ele.lastGoodValue&&ele.lastGoodValue==val){
return;
}
val=encodeURIComponent(val);
var _2a1=new Ajax.Request(url,{method:"post",parameters:ele.id+"="+val,onComplete:function(req){
eval(req.responseText);
if(!valid&&typeof msg=="object"){
if(typeof errorCode!="undefined"&&typeof msg[errorCode]!="undefined"){
msg=msg[errorCode];
}else{
msg=msg[0];
}
}
this.testForError(!valid,ele,msg);
if(valid){
ele.lastGoodValue=val;
}
this._showErrors();
}.bind(this),onException:function(){
alert("There was an error performing server side validation of your input, proceed with caution.");
},onFailure:reportError});
};
hpFormHandler.prototype.checkAnsweredSecurityQuestionBeforeSave=function(){
new Ajax.Request("/xml/profile/securityquestion.php",{method:"get",onComplete:function(req){
eval(req.responseText);
if(!valid){
showAskSecurityQuestion();
this.lastCheckedSecurity=new Date().getTime();
this._showErrors();
}else{
if(!this.submitMode){
this.params="ajax=1&"+Form.serialize(this.form);
var _2a2=new Ajax.Request(this.submitUri,{method:this.method,parameters:this.params,onComplete:this.handleResponse.bind(this),onFailure:reportError});
return;
}
this.form.submit();
}
}.bind(this),onException:function(){
alert("There was an error performing server side validation of your input, proceed with caution.");
},onFailure:"There was an error performing server side validation of your input, proceed with caution."});
};
function validateCheckedSecurityAndSubmit(form,fn,args){
new Ajax.Request("/xml/profile/securityquestion.php",{method:"get",onComplete:function(req){
eval(req.responseText);
if(!valid){
showAskSecurityQuestion();
}else{
if(typeof (fn)=="function"){
fn.apply(form,args);
}else{
form.submit();
}
}
}.bind(this),onException:function(){
alert("There was an error performing server side validation of your input, proceed with caution.");
},onFailure:"There was an error performing server side validation of your input, proceed with caution."});
};
function showAskSecurityQuestion(){
var aEl=jq("<a class=\"iframe\" href=\"/my/profile/security_ask_iframe.php\" style=\"display:none\">This goes to iframe</a>");
jq("#container").append(aEl);
jq(".iframe").fancybox({"hideOnContentClick":false,"hideOnOverlayClick":false,"enableEscapeButton":false,"showCloseButton":false,"width":624,"height":160,"scrolling":"no"});
jq(".iframe").click();
};
hpFormHandler.prototype.validateEmailList=function(ele){
var _2a3=800;
var _2a4=6;
this.validateLengthMin(ele,_2a4,"The address you entered is too short. Please use an address at least "+_2a4+" characters in length.");
this.validateNoRegex(ele,/\$/,"Dollar signs are not valid in an email address.");
this.validateNoRegex(ele,/\\/,"Backslashes are not valid in an email address.");
this.validateRegex(ele,/\@/,"A valid email address must contain an @ symbol.");
};
hpFormHandler.prototype.validateEmail=function(ele){
this.validateEmailList(ele);
var _2a5=200;
this.validateLengthMax(ele,_2a5,"Your email address is too long. Please use a shorter address.");
this.validateNoSpaces(ele,"Spaces are not valid characters in an email address.  Please recheck your address.");
};
hpFormHandler.prototype.validateEmailName=function(ele){
var _2a6=2;
var _2a7=200;
this.validateLengthMin(ele,_2a6,"Your name is too short.  Please enter at least 2 characters.");
this.validateLengthMax(ele,_2a7,"Your name is too long. Please use a shorter name.");
};
hpFormHandler.prototype.validatePhone=function(ele){
var val=$F(ele);
var us=/^(?:\([2-9]\d{2}\)\ ?|[2-9]\d{2}(?:\-?|\ ?))[2-9]\d{2}[- ]?\d{4}$/;
this.testForError(!us.test(val)&&val.length>0,ele,"Please enter a valid phone number");
};
hpFormHandler.prototype.validatePostal=function(ele){
var val=$F(ele).trim();
var _2a8=false;
var us=/^\d{5}(-\d{4})?$/;
var ca=/[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ] \d[ABCEGHJKLMNPRSTVWXYZ]\d/i;
var gb=/^[A-Za-z]{1,2}[\d]{1,2}([A-Za-z])?\s?[\d][A-Za-z]{2}$/i;
if(val.length==0||(us.test(val)||ca.test(val)||gb.test(val))){
_2a8=true;
}
this.testForError(!_2a8,ele,"Please enter a valid postal code");
};
hpFormHandler.prototype.validateNewPassword=function(ele1,ele2){
ele1=$(ele1);
ele2=$(ele2);
var _2a9=40;
var _2aa=5;
this.validateMandatory(ele1,"Please protect your hubpages account with a password.");
this.validateLengthMin(ele1,_2aa,"Your password is too short.  Protect your account by choosing a password that is at least  "+_2aa+" characters long.  Safety first!");
this.validateLengthMax(ele1,_2a9,"Your password is too long; it will be difficult to type.  Please use a shorter password.");
this.validateMandatory(ele2,"Please confirm your password.");
this.validateSameAs(ele1,ele2,"Your passwords do not match.  Please retype them.");
};
hpFormHandler.prototype.validateTag=function(ele){
ele=$(ele);
var _2ab=60;
var _2ac=3;
this.validateRegex(ele,/^[\w\s\$\-\'\%\&]*$/,"Please use only alphanumeric and $, ', % or & characters in your tag.");
this.validateLengthMin(ele,3,"A tag should be at least three characters long.");
this.validateLengthMax(ele,_2ab,"A tag should not be longer than 60 characters.");
};
hpFormHandler.prototype.validateGroupName=function(ele,_2ad){
this.validateMandatory(ele,"Please specify a group name.");
this.validateLengthMax(ele,50,"Group names may be no longer than 50 characters.");
this.validateRegex(ele,/^[\w\s\$\-\'\%\&\!\?]*$/,"Please use only alphanumeric and $, ', -, %, !, ? or & characters in your group name.");
existingName=_2ad.detect(function(name){
return ($F(ele)==name);
});
this.testForError(existingName,ele,"You already have a group with this name.  Please select it from the list, or enter a new name.");
};
hpFormHandler.prototype.observe=function(){
new Form.EventObserver(this.form,this._elemsChanged.bind(this));
};
hpFormHandler.prototype.focusFirst=function(){
Form.focusFirstElement(this.form);
};
hpFormHandler.prototype.tabOnEnter=function(){
hpFormHandler.tabOnEnter(this.form);
};
hpFormHandler.tabOnEnter=function(form){
if(!$(form)){
return;
}
var _2ae=$A($(form).getElementsByTagName("input"));
_2ae.each(function(node){
Event.observe(node,"keydown",_handleInputKeypress,false);
});
};
hpFormHandler.prototype.ghostField=function(_2af,_2b0,_2b1){
if($(_2af)&&$(_2b0)){
var gw=new GhostWatcher(_2af,_2b0,_2b1);
}
};
hpFormHandler.prototype.setValidators=function(_2b2,_2b3){
this.toValidate=$H(_2b2);
this.toValidateOnsubmit=$H(_2b3);
};
hpFormHandler.prototype.hasErrors=function(){
return (this.errors&&this.errors.keys()&&this.errors.keys().length>0);
};
hpFormHandler.prototype.cancel=function(){
this.reset();
};
hpFormHandler.prototype.reset=function(){
Form.reset(this.form);
if(this.cancelUri){
location.href=this.cancelUri;
}
};
hpFormHandler.prototype.valid=function(){
this._runValidators(true);
if(this.hasErrors()){
return false;
}
return true;
};
hpFormHandler.prototype.save=function(_2b4){
if(this.ensureSignedInBeforeSave&&!_2b4){
whenSignedIn(this.ensureSignedInOptions,this.save.bind(this,true));
return false;
}
this.form.descendants().each(function(elt){
if(elt&&elt.tagName&&elt.hasClassName&&(elt.tagName=="TEXTAREA"||elt.tagName=="INPUT")&&elt.hasClassName("dimmed")){
elt.value="";
}
});
this._runValidators(true);
if(this.hasErrors()){
if(this.scrollToErrors){
var _2b5=new fx.Scroll({duration:100});
_2b5.scrollTo(this.errorDiv);
}
return false;
}
if((this.ensureCheckedSecurity)&&(new Date().getTime()-this.lastCheckedSecurity>1000*15)){
this.checkAnsweredSecurityQuestionBeforeSave();
return false;
}
if(window.tinyMCE&&tinyMCE.triggerSave){
try{
tinyMCE.triggerSave(false,true);
}
catch(e){
}
}
if(!this.submitMode){
this.params="ajax=1&"+Form.serialize(this.form);
var _2b6=new Ajax.Request(this.submitUri,{method:this.method,parameters:this.params,onComplete:this.handleResponse.bind(this),onFailure:reportError});
}
return (this.submitMode);
};
hpFormHandler.prototype.handleResponse=function(req){
if(!this.skipValidationOfResponse){
eval(req.responseText);
}
if(this.skipValidationOfResponse||valid==1){
if(this.saveCallback){
this.saveCallback(req);
}
if(this.nextUri){
location.href=this.nextUri;
}
return true;
}else{
this.handleSubmitServerError(req);
return false;
}
};
hpFormHandler.prototype.testForError=function(_2b7,ele,msg){
if(_2b7){
var tmp=new Object();
tmp[ele.id]=msg;
this.errors=this.errors.merge(tmp);
}else{
if(this.errors[ele.id]){
if(typeof msg=="object"){
for(idx in msg){
if(this.errors[ele.id]==msg[idx]){
delete this.errors[ele.id];
}
}
}else{
if(this.errors[ele.id]==msg){
delete this.errors[ele.id];
}
}
}
}
};
hpFormHandler.prototype._elemsChanged=function(ele){
this._runValidators(false);
};
hpFormHandler.prototype._runValidators=function(_2b8){
var _2b9=Form.getElements(this.form);
var _2ba=$A(_2b9);
_2ba.each(function(node){
if(_2b8){
if(Prototype.Version=="1.5.0"){
var _2bb=this.toValidateOnsubmit[node.id];
}else{
var _2bb=this.toValidateOnsubmit.get(node.id);
}
if(!_2bb){
if(Prototype.Version=="1.5.0"){
_2bb=this.toValidateOnsubmit[node.className];
}else{
_2bb=this.toValidateOnsubmit.get(node.className);
}
}
if(_2bb){
_2bb(node);
}
}
if(Prototype.Version=="1.5.0"){
var _2bb=this.toValidate[node.id];
}else{
var _2bb=this.toValidate.get(node.id);
}
if(!_2bb){
if(Prototype.Version=="1.5.0"){
_2bb=this.toValidate[node.className];
}else{
_2bb=this.toValidate.get(node.className);
}
}
if(_2bb){
_2bb(node);
}
}.bind(this));
this._showErrors();
return !this.hasErrors();
};
hpFormHandler.prototype.alertServerErrors=function(req){
var json=JSONstring.toObject(req.responseText);
var _2bc="";
if(json.status=="error"){
var _2bd=0;
for(var key in json.errors){
if(key=="security"){
showAskSecurityQuestion();
}else{
for(i=0;i<json.errors[key].length;i++){
_2bc+=" - "+json.errors[key][i]+"\n";
}
_2bd++;
}
}
if(_2bd>0){
var _2be=json.header?(json.header+"\n\n"):"An error occurred while saving your changes:\n\n";
_2be+=_2bc+"\nPlease make any necessary changes and Save Changes again. If you still have problems saving after making all necessary changes, please contact team@hubpages.com.";
alert(_2be);
}
}else{
if(json.status=="saved"||json.status=="no change"){
var _2bf=new fx.Scroll({duration:300});
_2bf.scrollTo("changesSaved");
$("changesSaved").show();
}else{
alert("An unknown error has occured.  Please try saving again.  If the problem persists, contact team@hubpages.com");
}
}
};
hpFormHandler.prototype._showErrors=function(){
if(this.individualerrors){
this._showErrorsPerField();
}else{
this._showErrorsOneDiv();
}
};
hpFormHandler.prototype._showErrorsOneDiv=function(){
if(!this.errorDiv&&!$(this.errorId)){
new Insertion.Top(this.form,"<div id=\""+this.errorId+"\"></div>");
}
if(!this.errorDiv){
this.errorDiv=$(this.errorId);
}
if(this.useEffects&&!this.errFade){
this.errFade=new fx.Opacity(this.errorDiv,{duration:500});
this.errFade.now=0;
}
if(!this.hasErrors()){
if(this.lit){
if(this.useEffects){
this.errFade.toggle();
}
if(Prototype.Version=="1.5.0"){
var eles=document.getElementsByClassName("alertBorder",this.form);
}else{
var eles=this.form.select(".alertBorder");
}
eles.each(function(ele){
hpFormHandler.lightEle(ele,false);
});
if($("nextB")){
$("nextB").src="http://x.hubpages.com/i/next.gif";
}
this.lit=false;
}
return;
}
var _2c0=this.errorHeader;
_2c0+="<ul>";
this.errors.each(function(err){
_2c0+="<li>"+err.value+"</li>";
var ele=$(err.key);
hpFormHandler.lightEle(ele,true);
});
_2c0+="</ul>";
this.errorDiv.className="alert";
if(!this.lit){
if(this.useEffects){
Element.setOpacity(this.errorDiv,0);
this.errFade.toggle();
}
}
this.errorDiv.innerHTML=_2c0;
this.lit=true;
};
hpFormHandler.prototype._showErrorsPerField=function(){
if(this.hasErrors()){
this.errors.each(function(err){
var _2c1=$(err.key);
var _2c2=err.key+"_error";
var _2c3=$(_2c2);
if(_2c3){
_2c3.innerHTML=err.value;
_2c3.className="alert";
_2c3.show();
}else{
new Insertion.Top(_2c1.parentNode,"<div id=\""+_2c2+"\" class=\"alert\">"+err.value+"</div>");
}
hpFormHandler.lightEle(_2c1,true);
});
if(Prototype.Version=="1.5.0"){
var eles=document.getElementsByClassName("alertBorder",this.form);
}else{
var eles=this.form.select(".alertBorder");
}
eles.each(function(ele){
targetId=ele.id;
if(typeof this.errors[targetId]=="undefined"){
if($(targetId+"_error")){
$(targetId+"_error").hide();
}
hpFormHandler.lightEle(ele,false);
}
}.bind(this));
this.lit=true;
}else{
if(this.lit){
if(this.useEffects){
if(Prototype.Version=="1.5.0"){
var eles=document.getElementsByClassName("alert",this.form);
}else{
var eles=this.form.select(".alert");
}
eles.each(function(ele){
ele.hide();
});
}
if(Prototype.Version=="1.5.0"){
var eles=document.getElementsByClassName("alertBorder",this.form);
}else{
var eles=this.form.select(".alertBorder");
}
eles.each(function(ele){
hpFormHandler.lightEle(ele,false);
});
this.lit=false;
}
}
};
function _handleInputKeypress(_2c4){
_2c4=_2c4||window.event;
if(_2c4.which){
if(_2c4.which==Event.KEY_RETURN){
var _2c5=document.createEvent("KeyboardEvent");
_2c5.initKeyEvent("keydown",true,true,document.defaultView,_2c4.ctrlKey,_2c4.altKey,_2c4.shiftKey,_2c4.metaKey,Event.KEY_TAB,0);
_2c4.preventDefault();
_2c4.target.dispatchEvent(_2c5);
}
}else{
if(_2c4.keyCode){
if(_2c4.keyCode==Event.KEY_RETURN){
_2c4.keyCode=Event.KEY_TAB;
}
}
}
return true;
};
hpFormHandler.lightEle=function(ele,on){
ele=$(ele);
if(!ele){
return;
}
if(on){
Element.addClassName(ele,"alertBorder");
}else{
Element.removeClassName(ele,"alertBorder");
}
};
var GhostWatcher=Class.create();
GhostWatcher.prototype={initialize:function(_2c6,_2c7,_2c8){
this.fromEle=$(_2c6);
this.toEle=$(_2c7);
this.copyFunction=(_2c8!=null)?_2c8:this.copyValue;
if(this.fromEle&&this.toEle){
Event.observe(this.fromEle,"keyup",this.copyFunction.bind(this),false);
}
Event.observe(window,"focus",this.copyFunction.bind(this),false);
Event.observe(window,"load",this.copyFunction.bind(this),false);
},copyValue:function(evt){
var text=$F(this.fromEle);
this.toEle.innerHTML=text.stripTags();
},recopy:function(){
this.copyFunction();
}};
function growTextArea(elt,_2c9,_2ca,_2cb){
var rows=Math.ceil($F(elt).length/_2c9)+1;
var _2cc=rows*_2ca;
_2cc=Math.max(_2cc,_2cb);
elt.setStyle({height:_2cc+"px"});
};
function makeGrowable(id,_2cd,_2ce,_2cf){
var elt=$(id);
if(!elt){
return;
}
elt.observe("keyup",function(){
growTextArea(elt,_2cd,_2ce,_2cf);
});
};
function makeExpandable(id,_2d0,_2d1,_2d2,_2d3){
var elt=jq("#"+id);
if(!elt.size()){
return;
}
elt.addClass("expandable_text dimmed").val(_2d0);
elt.bind("focus",function(){
var anc=jq(this).closest("div");
if(!anc.hasClass("expanded")){
anc.addClass("expanded");
if(typeof (_2d3)=="function"){
_2d3.apply(this);
}
}
if(jq(this).hasClass("dimmed")){
jq(this).removeClass("dimmed").val("");
}
if(typeof (_2d1)=="function"){
_2d1.apply(this);
}
});
elt.bind("blur",function(){
if(elt.val()!=""){
return;
}
if(!_2d2){
jq(this).css({height:""}).closest("div").removeClass("expanded");
}
jq(this).addClass("dimmed").val(_2d0);
});
};
function initAutoComplete(_2d4,_2d5){
var _2d6="";
var _2d7="++none++";
var _2d8=false;
var _2d9=false;
var _2da=false;
var _2db="#the_auto_comp_box";
var _2dc="#search_form";
var _2dd=".search_input";
var _2de=".search_submit";
var _2df="/xml/getautocompletestrings.php";
var _2e0="";
var _2e1=0;
var _2e2=null;
var _2e3=null;
var _2e4=null;
var _2e5=null;
var _2e6=false;
if(_2d5){
_2db=_2d5.boxid;
_2dc=_2d5.container;
_2dd=_2d5.input;
_2de=_2d5.submit;
if(_2d5.ajaxtarget!=undefined){
_2df=_2d5.ajaxtarget;
}
if(_2d5.querystring!=undefined){
_2e0="&"+_2d5.querystring;
}
if(_2d5.filter!=undefined){
_2e2=_2d5.filter;
}
if(_2d5.keyboardelem!=undefined){
_2e4=_2d5.keyboardelem;
}
if(_2d5.targoutput!=undefined){
_2e3=_2d5.targoutput;
}
if(_2d5.keyuptarget!=undefined){
_2e5=_2d5.keyuptarget;
}
if(_2d5.showprogress!=undefined){
_2e6=_2d5.showprogress;
}
}
if(!_2e4){
_2e4=_2dd;
}
if(!_2e3){
_2e3=_2dd;
}
if(!_2e5){
_2e5=_2e4;
}
jQuery(document).ready(function(){
if(!_2d8){
_2d8=true;
jQuery("<div id=\""+_2db.substr(1)+"\" class=\"auto_comp_box\"></div>").insertAfter(_2e4);
if(_2e6){
jQuery("<div id=\"auto_comp_close\">&nbsp;</div>").appendTo(_2db);
jQuery("#auto_comp_close").bind("click",function(){
jQuery(_2db).hide();
jQuery("#auto_comp_close").hide();
});
}
jQuery(_2db).hide();
if(!_2e6){
jQuery(_2db).bind("focusin",function(){
_2d9=true;
});
jQuery(_2db).bind("focusout",function(){
_2d9=false;
});
jQuery(_2dc).bind("focusin",function(){
_2da=true;
});
jQuery(_2dc).bind("focusout",function(){
_2da=false;
setTimeout(function(){
if(!_2d9&&!_2da){
jQuery(_2db).hide();
jQuery("#auto_comp_close").hide();
_2e0=_2e0.replace(/start=[^&]*&?/,"");
}
},300);
});
}
jQuery(_2dc).attr("autocomplete","off");
jQuery(_2e4).bind("keydown",function(e){
var key=0;
if(e==null){
key=event.keyCode;
}else{
key=e.which;
}
switch(key){
case 40:
_2e1=0;
jQuery(_2db+" > .auto_comp_row:visible:eq(0) > a").trigger("focus");
return (false);
break;
}
return (true);
});
jQuery(_2e5).bind("keyup",function(){
var _2e7=jQuery(_2dd).attr("value");
if(_2dd!=_2e4){
if(_2d6!=_2e7){
_2e0=_2e0.replace(/start=[0123456789]+/,"");
_2e0=_2e0.replace(/&&/,"&");
}
_2d6="";
_2d7="++none++";
}
var _2e8;
if(_2d5){
_2e8="hubs";
}else{
_2e8=jQuery(".search_type option:selected").val();
}
if(_2e7.strip().length==0){
jQuery(_2db).hide();
jQuery("#auto_comp_close").hide();
}
if(_2e7.strip().length>0&&_2d6!=_2e7){
_2d6=_2e7;
if(_2e7.indexOf(_2d7)==0){
jQuery(_2db+" > .auto_comp_row").each(function(){
var _2e9=jQuery(this).text();
if(_2e2){
_2e9=_2e2(_2e9);
}
if(_2e9.indexOf(_2e7)==0){
jQuery(this).show();
}else{
jQuery(this).hide();
}
});
return true;
}
_2d7="++none++";
jQuery(_2db+" > .auto_comp_row").remove();
var _2ea="?";
if(_2e6){
jQuery("<div id=\"auto_comp_progress\" >&nbsp;</div>").appendTo(_2db);
jQuery(_2db).show();
_2ea="?s="+escape(_2e7)+"&";
}
jQuery.get(_2df+_2ea+"t="+escape(_2e8)+_2e0,jQuery(_2dc).serialize(),function(data){
jQuery("#auto_comp_error").remove();
jQuery("#auto_comp_progress").remove();
_2e0=_2e0.replace(/start=[0123456789]+/,"");
_2e0=_2e0.replace(/&&/,"&");
var _2eb=jQuery(data).find("div").length;
var _2ec=false;
if(_2eb==0){
return true;
}
var _2ed=jQuery(_2dd).val();
if(_2ed!=_2e7){
return true;
}
if(_2eb<_2d4){
_2d7=_2e7;
}else{
_2d7="++none++";
}
jQuery(_2db).show();
jQuery(_2e4).focus();
var _2ee=jQuery(_2e4).position();
var _2ef=jQuery(_2e4).outerHeight(true);
jQuery(_2db).position(_2ee.top+_2ef,_2ee.left+5);
jQuery(data).find("div").appendTo(_2db);
jQuery(_2db+" > .auto_comp_row").bind("click",function(){
var _2f0=false;
jQuery(this).find("a").each(function(){
var aid=jQuery(this).attr("id");
var href=jQuery(this).attr("href");
if(aid=="acrup"||aid=="acrdown"){
_2f0=true;
var _2f1=href.substr(8);
_2e0+="&start="+_2f1;
_2e0=_2e0.replace(/&&/,"&");
}
});
if(_2f0){
if(!_2ec){
setTimeout(function(){
jQuery(_2e5).trigger("keyup");
},200);
_2d9=false;
_2ec=true;
}
return (false);
}
var _2f2=jQuery(this).text();
if(_2e2){
_2f2=_2e2(_2f2);
}
jQuery(_2e3).attr("value",_2f2);
if(_2de){
jQuery(_2de).trigger("click");
}
return (false);
});
jQuery(_2db+" > .auto_comp_row").bind("keypress",function(e){
var key=0;
if(e==null){
key=event.keyCode;
}else{
key=e.which;
}
switch(key){
case 13:
jQuery(this).trigger("click");
return (false);
break;
}
return (true);
});
jQuery(_2db+" > .auto_comp_row").bind("keydown",function(e){
var key=0;
if(e==null){
key=event.keyCode;
}else{
key=e.which;
}
switch(key){
case 40:
if(!jQuery(_2db+" > .auto_comp_row:visible:eq("+_2e1+") > a").length){
return (false);
}
++_2e1;
jQuery(_2db+" > .auto_comp_row:visible:eq("+_2e1+") > a").trigger("focus");
return (false);
break;
case 38:
--_2e1;
if(_2e1<0){
jQuery(_2e4).trigger("focus");
}else{
jQuery(_2db+" > .auto_comp_row:visible:eq("+_2e1+") > a").trigger("focus");
}
return (false);
break;
}
return (true);
});
});
}
});
}
});
};
var ImageViewerControl=Class.create();
ImageViewerControl.prototype={initialize:function(_2f3,_2f4,_2f5,_2f6){
this.modId=_2f3;
this.floatStatus=_2f4;
this.displayStatus=_2f5;
this.popupFlg=_2f6;
this.photoData=new Object();
this.photoOrder=new Array();
this.viewer_id=null;
this.timer=null;
this.slide_idx=-1;
this.displaySlideshowLinks=false;
this.excludeImageIdsFromSlideshow=$A(new Array());
this.resources={ht_viewer_sect:"image_viewer_"+this.modId,ht_inline_sect:"image_inline_"+this.modId,ht_slideshow_sect:"image_slideshow_"+this.modId,ht_thumbnail_sect:"image_thumbnail_"+this.modId,inline_images:"imgs_"+this.modId,viewer_display:"slide_display_"+this.modId,viewer_photo:"slide_img_"+this.modId,viewer_caption:"slide_desc_"+this.modId,thumb_tn_section:"slide_tn_section_"+this.modId};
},setMaxHeight:function(_2f7){
this.firstTimeLoadingImage=true;
this.maxHeight=_2f7;
},addPhoto:function(rec){
this.photoData[rec.id]=rec;
this.photoOrder.push(rec.id);
},clear:function(){
delete this.photoData;
this.photoData=new Object();
this.photoOrder.clear();
},render:function(){
switch(this.displayStatus){
case "No Border":
case "With Border":
this.renderInlineImages();
break;
case "Thumbnail":
this.renderThumbnails();
break;
}
},toggleViewer:function(){
switch(this.displayStatus){
case "No Border":
case "With Border":
Element.hide(this.resources.ht_viewer_sect);
Element.show(this.resources.ht_inline_sect);
Element.hide(this.resources.ht_thumbnail_sect);
break;
case "Thumbnail":
Element.show(this.resources.ht_viewer_sect);
Element.hide(this.resources.ht_inline_sect);
Element.show(this.resources.ht_thumbnail_sect);
break;
}
},loadSlide:function(id){
if(!this.firstTimeLoadingImage&&this.maxHeight){
$(this.resources.viewer_display).style.height=this.maxHeight+"px";
}
this.viewer_id=id;
rec=this.photoData[id];
$(this.resources.viewer_photo).innerHTML=this._getDisplayUrl();
$(this.resources.viewer_caption).innerHTML=this._getCaptionAndSource(rec);
if(this.popupFlg){
this._addpopup(id,$(this.resources.viewer_photo).firstChild);
}
this.firstTimeLoadingImage=false;
},getMaxDisplayHeight:function(){
var top=0;
this.photoOrder.each(function(id){
var hgt=this._getDisplayHeight(id);
top=hgt>top?hgt:top;
}.bind(this));
return top;
},setDisplaySlideshowLinks:function(_2f8){
this.displaySlideshowLinks=_2f8;
},setExcludeImagesFromSlideshow:function(){
this.excludeImageIdsFromSlideshow=$A(arguments);
},_getDisplayUrl:function(){
rec=this.photoData[this.viewer_id];
var _2f9=rec.origWidth>=200&&rec.origHeight>=150;
if(rec.maxSize==2&&this.displayStatus=="With Border"){
return this._createImageTag(rec.urlQuarter,"quarter_frame",rec.esc_cap)+(_2f9&&this.displaySlideshowLinks&&this.excludeImageIdsFromSlideshow.indexOf(this.viewer_id)==-1?getHubSlideshowHtml("quarter",this.displayStatus=="With Border"):"");
}else{
if(rec.maxSize==2){
return this._createImageTag(rec.urlQuarter,"quarter",rec.esc_cap)+(_2f9&&this.displaySlideshowLinks&&this.excludeImageIdsFromSlideshow.indexOf(this.viewer_id)==-1?getHubSlideshowHtml("quarter",this.displayStatus=="With Border"):"");
}else{
if((this.floatStatus=="right"||rec.maxSize==1)&&this.displayStatus=="With Border"){
return this._createImageTag(rec.urlHalfPad,"half_frame",rec.esc_cap)+(_2f9&&this.displaySlideshowLinks&&this.excludeImageIdsFromSlideshow.indexOf(this.viewer_id)==-1?getHubSlideshowHtml("half",this.displayStatus=="With Border"):"");
}else{
if(this.floatStatus=="right"||rec.maxSize==1){
return this._createImageTag(rec.urlHalf,"half",rec.esc_cap)+(_2f9&&this.displaySlideshowLinks?getHubSlideshowHtml("half",this.displayStatus=="With Border"):"");
}else{
if(this.floatStatus=="none"&&this.displayStatus=="With Border"){
return this._createImageTag(rec.urlFullPad,"full_frame",rec.esc_cap)+(_2f9&&this.displaySlideshowLinks&&this.excludeImageIdsFromSlideshow.indexOf(this.viewer_id)==-1?getHubSlideshowHtml("full",this.displayStatus=="With Border"):"");
}else{
if(this.floatStatus=="none"){
return this._createImageTag(rec.urlFull,"full",rec.esc_cap)+(_2f9&&this.displaySlideshowLinks&&this.excludeImageIdsFromSlideshow.indexOf(this.viewer_id)==-1?getHubSlideshowHtml("full",this.displayStatus=="With Border"):"");
}
}
}
}
}
}
},_createImageTag:function(url,_2fa,_2fb){
if(undefined==_2fb){
_2fb="";
}
return "<img class='"+_2fa+"' title='"+_2fb+"' alt='"+_2fb+"' src='"+url+"' />";
},_getDisplayHeight:function(_2fc){
rec=this.photoData[_2fc];
if(rec.maxSize==2){
return rec.ratio*120;
}else{
if((this.floatStatus=="right"||rec.maxSize==1)&&this.displayStatus=="With Border"){
return rec.ratio*248;
}else{
if(this.floatStatus=="right"||rec.maxSize==1){
return rec.ratio*260;
}else{
if(this.floatStatus=="none"&&this.displayStatus=="With Border"){
return rec.ratio*496;
}else{
if(this.floatStatus=="none"){
return rec.ratio*520;
}
}
}
}
}
},_getCaptionAndSource:function(rec){
var _2fd=rec.nofollow?" rel=\"nofollow\"":"";
var _2fe="";
if(rec.sourceUrl==""){
_2fe=rec.sourceName;
}else{
if(rec.sourceName==""){
_2fe="<a href=\""+rec.sourceUrl.replace(/"/g,"")+"\""+_2fd+">"+rec.sourceUrl.truncate(50)+"</a>";
}else{
_2fe="<a href=\""+rec.sourceUrl.replace(/"/g,"")+"\""+_2fd+">"+rec.sourceName+"</a>";
}
}
if(_2fe!=""){
_2fe="<div>Source: "+_2fe+"</div>";
}
return rec.caption+_2fe;
},_addInlineImage:function(id){
this.viewer_id=id;
var rec=this.photoData[id];
var _2ff=document.createElement("div");
var _300=this._getDisplayUrl();
if(this.floatStatus=="none"){
var _301="caption_full";
}else{
var _301="caption_half";
}
_2ff.id="img_"+rec.id;
_2ff.innerHTML="<div id='img_url_"+rec.id+"'>"+_300+"</div>"+"<div class='"+_301+"' id='img_desc_"+rec.id+"'>"+this._getCaptionAndSource(rec)+"</div>";
$(this.resources.inline_images).appendChild(_2ff);
if(this.popupFlg){
this._addpopup(rec.id,$("img_url_"+rec.id).firstChild);
}
},renderInlineImages:function(){
$(this.resources.inline_images).innerHTML="";
this.photoOrder.each(function(id){
this._addInlineImage(id);
}.bind(this));
},_addThumbnail:function(id){
var rec=this.photoData[id];
var _302=document.createElement("img");
_302.id="slide_tn_"+rec.id;
_302.src=rec.urlThumb;
_302.alt=rec.caption;
_302.title=rec.caption;
_302.onclick=function(){
this.loadSlide(rec.id);
}.bind(this);
$(this.resources.thumb_tn_section).appendChild(_302);
},renderThumbnails:function(){
$(this.resources.thumb_tn_section).innerHTML="";
this.photoOrder.each(function(id){
this._addThumbnail(id);
}.bind(this));
if(this.photoOrder.length>0){
$("slide_tn_"+this.photoOrder[0]).onclick();
}
},_addpopup:function(id,img){
img.title="Click to see full-size image.";
var link=jq("<a href=\"#\"></a>");
link.attr("data-lightbox",this.photoData[id].lightboxUrl).addClass("imglightbox");
jq(img).after(link).detach();
link.append(img);
link.fancybox({overlayOpacity:0.8,overlayColor:"#000",titleShow:false});
}};
var ForumSelector=Class.create();
ForumSelector.prototype={initialize:function(id,_303){
this.id=id;
this.userId=_303;
this.observeChanges();
},observeChanges:function(){
$(this.id+"_forum_id").observe("change",this.changeForum.bindAsEventListener(this));
$$("."+this.id+"_category_selector").each(function(elt){
elt.observe("change",this.changeCategory.bindAsEventListener(this));
}.bind(this));
},changeForum:function(_304){
var elt=Event.findElement(_304,"select");
this.chooseForum($F(elt));
},changeCategory:function(_305){
var elt=Event.findElement(_305,"select");
this.chooseCategory($F(elt));
},chooseForum:function(_306){
if(/fave/.test(_306)){
var _307=_306.substring(5);
this.chooseCategory(_307);
return;
}
new Ajax.Updater(this.id+"_forum_selector","/xml/forumselector.php",{parameters:$H({forumId:_306,id:this.id,userId:this.userId}).toQueryString(),onComplete:this.observeChanges.bind(this)});
},chooseCategory:function(_308){
new Ajax.Updater(this.id+"_forum_selector","/xml/forumselector.php",{parameters:$H({categoryId:_308,id:this.id,userId:this.userId}).toQueryString(),onComplete:this.observeChanges.bind(this)});
}};
var CategorySelector=Class.create();
CategorySelector.prototype={initialize:function(id,_309,_30a,_30b){
this.id=id;
this.onchange=_309;
this.onselect=_30a;
this.userId=_30b?_30b:0;
this.observeChanges();
},observeChanges:function(){
$$("."+this.id+"_category_selector").each(function(elt){
elt.observe("change",this.changeCategory.bindAsEventListener(this));
}.bind(this));
$("startOver"+this.id).observe("click",this.startOver.bind(this));
},changeCategory:function(_30c){
var elt=Event.findElement(_30c,"select");
this.chooseCategory($F(elt));
},chooseCategory:function(_30d,_30e,_30f){
new Ajax.Request("/xml/categoryselector.php",{parameters:$H({categoryId:_30d,userId:this.userId,id:this.id}).toQueryString(),onComplete:function(req){
var data=JSONstring.toObject(req.responseText);
$(this.id+"Wrapper").innerHTML=data["render"];
this.observeChanges();
if($(this.uniqueId+"SearchText")){
$(this.uniqueId+"SearchText").value="";
}
if($(this.uniqueId+"SearchResults")){
$(this.uniqueId+"SearchResults").innerHTML="";
}
this.onchange(data);
if(!_30e&&_30f){
this.onselect(_30f);
}
}.bind(this)});
},getValue:function(){
return $F(this.id+"Id");
},startOver:function(_310){
this.chooseCategory(0);
},refresh:function(){
this.chooseCategory(this.getValue());
},search:function(_311,_312,_313){
new Ajax.Updater(_312,"/xml/categorysearch.php",{parameters:$H({uniqueId:this.id,searchText:_311,numTabs:_313}),onFailure:function(){
}});
return false;
}};
function addEvent(_314,type,_315){
if(!_315.$$guid){
_315.$$guid=addEvent.guid++;
}
if(!_314.events){
_314.events={};
}
var _316=_314.events[type];
if(!_316){
_316=_314.events[type]={};
if(_314["on"+type]){
_316[0]=_314["on"+type];
}
}
_316[_315.$$guid]=_315;
_314["on"+type]=handleEvent;
};
addEvent.guid=1;
function removeEvent(_317,type,_318){
if(_317.events&&_317.events[type]){
delete _317.events[type][_318.$$guid];
}
};
function handleEvent(_319){
var _31a=true;
_319=_319||fixEvent(window.event);
if(_319==null){
return false;
}
if(this.events==null){
return false;
}
var _31b=this.events[_319.type];
for(var i in _31b){
this.$$handleEvent=_31b[i];
if(this.$$handleEvent(_319)===false){
_31a=false;
}
}
return _31a;
};
function fixEvent(_31c){
if(_31c!=null){
_31c.preventDefault=fixEvent.preventDefault;
_31c.stopPropagation=fixEvent.stopPropagation;
}
return _31c;
};
fixEvent.preventDefault=function(){
this.returnValue=false;
};
fixEvent.stopPropagation=function(){
this.cancelBubble=true;
};
function getEventTarget(e){
var targ;
if(!e){
e=window.event;
}
if(e.target){
targ=e.target;
}else{
if(e.srcElement){
targ=e.srcElement;
}
}
if(targ.nodeType==3){
targ=targ.parentNode;
}
return targ;
};
var css={getElementsByClass:function(node,_31d,tag){
var _31e=new Array();
var els=node.getElementsByTagName(tag);
var _31f=els.length;
var _320=new RegExp("(^|\\s)"+_31d+"(\\s|$)");
for(var i=0,j=0;i<_31f;i++){
if(this.elementHasClass(els[i],_31d)){
_31e[j]=els[i];
j++;
}
}
return _31e;
},elementHasClass:function(el,_321){
if(!el){
return false;
}
var _322=new RegExp("\\b"+_321+"\\b");
if(el.className.match(_322)){
return true;
}
return false;
}};
var standardistaTableSorting={that:false,sortColumnIndex:-1,lastAssignedId:0,newRows:-1,lastSortedTable:-1,init:function(){
if(!document.getElementsByTagName){
return;
}
this.that=this;
this.run();
},run:function(){
var _323=document.getElementsByTagName("table");
for(var i=0;i<_323.length;i++){
var _324=_323[i];
if(css.elementHasClass(_324,"sortable")){
this.makeSortable(_324);
}
}
},makeSortable:function(_325){
if(!_325.id){
_325.id="sortableTable"+this.lastAssignedId++;
}
if(!_325.tHead||!_325.tHead.rows||0==_325.tHead.rows.length){
return;
}
var row=_325.tHead.rows[_325.tHead.rows.length-1];
for(var i=0;i<row.cells.length;i++){
var _326=row.cells[i].firstChild;
_326.onclick=this.headingClicked;
_326.setAttribute("columnId",i);
}
},sortTheTable:function(e){
var that=standardistaTableSorting.that;
var _327=getEventTarget(e);
var td=_327.parentNode;
var tr=td.parentNode;
var _328=tr.parentNode;
var _329=_328.parentNode;
if(!_329.tBodies||_329.tBodies[0].rows.length<=1){
return false;
}
var _32a=_327.getAttribute("columnId")||td.cellIndex;
var _32b=css.getElementsByClass(td,"tableSortArrow","span");
var _32c="";
if(_32b.length>0){
_32c=_32b[0].getAttribute("sortOrder");
}
var itm="";
var _32d=0;
while(""==itm&&_32d<_329.tBodies[0].rows.length){
var elm=_329.tBodies[0].rows[_32d].cells[_32a];
if(elm.childNodes.length==1){
itm=that.getInnerText(_329.tBodies[0].rows[_32d].cells[_32a]);
}else{
itm=that.getInnerText(_329.tBodies[0].rows[_32d].cells[_32a].firstChild);
}
_32d++;
}
var _32e=that.determineSortFunction(itm);
var _32f;
if(_329.id==that.lastSortedTable&&_32a==that.sortColumnIndex){
_32f=that.newRows;
_32f.reverse();
}else{
that.sortColumnIndex=_32a;
_32f=new Array();
for(var j=0;j<_329.tBodies[0].rows.length;j++){
_32f[j]=_329.tBodies[0].rows[j];
}
_32f.sort(_32e);
}
that.moveRows(_329,_32f);
that.newRows=_32f;
that.lastSortedTable=_329.id;
var _32b=css.getElementsByClass(tr,"tableSortArrow","span");
for(var j=0;j<_32b.length;j++){
if(j==_32a){
if(null==_32c||""==_32c||"DESC"==_32c){
_32b[j].innerHTML="▼";
_32b[j].setAttribute("sortOrder","ASC");
}else{
_32b[j].innerHTML="▲";
_32b[j].setAttribute("sortOrder","DESC");
}
}else{
_32b[j].innerHTML="&nbsp;";
}
}
if(Element.hasClassName(_329.tBodies[0].rows[0],"evenRow")||Element.hasClassName(_329.tBodies[0].rows[0],"oddRow")){
for(var i=0;i<_329.tBodies[0].rows.length;i++){
tr=_329.tBodies[0].rows[i];
if(i%2==0){
if(!Element.hasClassName(tr,"oddRow")){
Element.addClassName(tr,"oddRow");
}
if(Element.hasClassName(tr,"evenRow")){
Element.removeClassName(tr,"evenRow");
}
}else{
if(!Element.hasClassName(tr,"evenRow")){
Element.addClassName(tr,"evenRow");
}
if(Element.hasClassName(tr,"oddRow")){
Element.removeClassName(tr,"oddRow");
}
}
}
}
return false;
},headingClicked:function(e){
var that=standardistaTableSorting.that;
that.sortTheTable(e);
return false;
},getInnerText:function(el){
if("string"==typeof el||"undefined"==typeof el){
return el;
}
if(null==el){
return "";
}
if(el.innerText){
return el.innerText;
}
if(el.nodeType&&el.nodeType==3){
return jq(el).text();
}
var str=el.getAttribute("standardistaTableSortingInnerText");
if(null!=str&&""!=str){
return str;
}
str="";
var cs=el.childNodes;
var l=cs.length;
for(var i=0;i<l;i++){
if(1==cs[i].nodeType){
str+=this.getInnerText(cs[i]);
break;
}else{
if(3==cs[i].nodeType){
str+=cs[i].nodeValue;
break;
}
}
}
el.setAttribute("standardistaTableSortingInnerText",str);
return str;
},determineSortFunction:function(itm){
var _330=this.sortCaseInsensitive;
if(itm.match(/^\d\d[\/-]\d\d[\/-]\d\d\d\d$/)){
_330=this.sortDate;
}
if(itm.match(/^\d\d[\/-]\d\d[\/-]\d\d$/)){
_330=this.sortDate;
}
if(itm.match(/^[�$]/)){
_330=this.sortCurrency;
}
if(itm.match(/^\d?\.?\d+$/)){
_330=this.sortNumeric;
}
if(itm.match(/^[+-]?\d*\.?\d+([eE]-?\d+)?$/)){
_330=this.sortNumeric;
}
if(itm.match(/^([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])$/)){
_330=this.sortIP;
}
return _330;
},sortCaseInsensitive:function(a,b){
var that=standardistaTableSorting.that;
var aa=that.getInnerText(a.cells[that.sortColumnIndex]).toLowerCase();
var bb=that.getInnerText(b.cells[that.sortColumnIndex]).toLowerCase();
if(aa==bb){
return 0;
}else{
if(aa<bb){
return -1;
}else{
return 1;
}
}
},sortDate:function(a,b){
var that=standardistaTableSorting.that;
var aa=that.getInnerText(a.cells[that.sortColumnIndex]);
var bb=that.getInnerText(b.cells[that.sortColumnIndex]);
var dt1,dt2,yr=-1;
if(aa.length==10){
dt1=aa.substr(6,4)+aa.substr(3,2)+aa.substr(0,2);
}else{
yr=aa.substr(6,2);
if(parseInt(yr)<50){
yr="20"+yr;
}else{
yr="19"+yr;
}
dt1=yr+aa.substr(3,2)+aa.substr(0,2);
}
if(bb.length==10){
dt2=bb.substr(6,4)+bb.substr(3,2)+bb.substr(0,2);
}else{
yr=bb.substr(6,2);
if(parseInt(yr)<50){
yr="20"+yr;
}else{
yr="19"+yr;
}
dt2=yr+bb.substr(3,2)+bb.substr(0,2);
}
if(dt1==dt2){
return 0;
}else{
if(dt1<dt2){
return -1;
}
}
return 1;
},sortCurrency:function(a,b){
var that=standardistaTableSorting.that;
var aa=that.getInnerText(a.cells[that.sortColumnIndex]).replace(/[^0-9.]/g,"");
var bb=that.getInnerText(b.cells[that.sortColumnIndex]).replace(/[^0-9.]/g,"");
return parseFloat(aa)-parseFloat(bb);
},sortNumeric:function(a,b){
var that=standardistaTableSorting.that;
var _331=a.cells[that.sortColumnIndex];
if(_331.childNodes.length>1){
var aa=parseFloat(that.getInnerText(a.cells[that.sortColumnIndex].firstChild));
}else{
aa=parseFloat(that.getInnerText(a.cells[that.sortColumnIndex]));
}
if(isNaN(aa)){
aa=0;
}
var _332=b.cells[that.sortColumnIndex];
if(_332.childNodes.length>1){
var bb=parseFloat(that.getInnerText(b.cells[that.sortColumnIndex].firstChild));
}else{
bb=parseFloat(that.getInnerText(b.cells[that.sortColumnIndex]));
}
if(isNaN(bb)){
bb=0;
}
return aa-bb;
},makeStandardIPAddress:function(val){
var vals=val.split(".");
for(x in vals){
val=vals[x];
while(3>val.length){
val="0"+val;
}
vals[x]=val;
}
val=vals.join(".");
return val;
},sortIP:function(a,b){
var that=standardistaTableSorting.that;
var aa=that.makeStandardIPAddress(that.getInnerText(a.cells[that.sortColumnIndex]).toLowerCase());
var bb=that.makeStandardIPAddress(that.getInnerText(b.cells[that.sortColumnIndex]).toLowerCase());
if(aa==bb){
return 0;
}else{
if(aa<bb){
return -1;
}else{
return 1;
}
}
},moveRows:function(_333,_334){
for(var i=0;i<_334.length;i++){
var _335=_334[i];
_333.tBodies[0].appendChild(_335);
}
}};
function standardistaTableSortingInit(){
standardistaTableSorting.init();
};
Event.observe(window,"load",standardistaTableSortingInit);
var PollManager=Class.create();
PollManager.prototype={initialize:function(_336,_337,_338){
this.modId=_336;
this.pollId=_337;
this.results_div_id=_336+"_poll_results";
this.vote_form_id=_336+"_vote_form";
this.vote_radio_name=_336+"_vote";
this.hubnugget=_338;
},seePollVotes:function(){
this.question_HTML=$(this.results_div_id).innerHTML;
var _339=$H({id:this.pollId}).toQueryString();
var ajax=new Ajax.Updater({success:this.results_div_id},"/xml/pollvote.php",{parameters:_339,onFailure:reportError,onComplete:function(){
}});
},goBackAndVote:function(){
$(this.results_div_id).innerHTML=this.question_HTML;
},voteInPoll:function(){
var vote;
var hn=this.hubnugget?1:0;
var _33a=Form.getInputs(this.vote_form_id,"radio",this.vote_radio_name).find(function(_33b){
return _33b.checked;
});
if(null==_33a){
return;
}else{
vote=_33a.value;
}
var _33c=$H({id:this.pollId,vote:vote,hn:hn}).toQueryString();
var ajax=new Ajax.Updater({success:this.results_div_id},"/xml/pollvote.php",{parameters:_33c,onFailure:reportError,onComplete:function(){
}});
}};
var PollManagerManager=Class.create();
PollManagerManager.prototype={initialize:function(){
this.pollManagers=[];
},add:function(id,pm){
this.pollManagers[id]=pm;
},getById:function(id){
return this.pollManagers[id];
}};
var pmm=new PollManagerManager();
var ContentRotator=Class.create();
ContentRotator.prototype={initialize:function(ids,_33d,_33e,_33f,_340,_341,_342,_343,_344,loop){
this.ids=ids;
this.prefix=_33d;
this.interval=_33e;
this.position=0;
this.paused=false;
this.transitionEffect=_33f;
this.transitioning=false;
this.activeUpdateThreadId=0;
this.fadeTransition=false;
if(_340){
this.playId=_340;
}
if(_341){
this.pauseId=_341;
}
if(_342){
this.positionIndicatorId=_342;
}
if(this.interval>0){
setTimeout(this.update.bind(this,this.activeUpdateThreadId),this.interval);
}
if(_343){
this.prevId=_343;
}
if(_344){
this.nextId=_344;
}
if(loop==undefined||loop){
this.loop=true;
}else{
this.loop=false;
}
},update:function(_345){
if(this.paused||this.activeUpdateThreadId!=_345){
return;
}
this.next();
setTimeout(this.update.bind(this,_345),this.interval);
},pause:function(){
$(this.pauseId).hide();
$(this.playId).show();
this.paused=true;
},play:function(){
$(this.playId).hide();
$(this.pauseId).show();
this.paused=false;
this.activeUpdateThreadId++;
this.update(this.activeUpdateThreadId);
},endTransition:function(){
this.transitioning=false;
},seek:function(_346){
var next=this.position<_346;
newPosition=_346%this.ids.length;
while(newPosition<0){
newPosition+=this.ids.length;
}
if(this.position==newPosition){
return;
}
if(this.positionIndicatorId){
$(this.positionIndicatorId+"_"+this.position).removeClassName("active");
}
if(this.transitionEffect>0){
if(this.transitioning){
if(next){
setTimeout(this.next.bind(this),400);
}else{
setTimeout(this.previous.bind(this),400);
}
return;
}
this.transitioning=true;
var _347=new fx.Opacity(this.prefix+this.ids[this.position],{duration:this.transitionEffect});
_347.toggle();
this.position=newPosition;
if(this.fadeTransition){
var _348=new fx.Opacity(this.prefix+this.ids[this.position],{duration:this.transitionEffect});
}else{
var _348=new fx.Height(this.prefix+this.ids[this.position],{duration:this.transitionEffect});
}
if(window.ActiveXObject){
$(this.prefix+this.ids[this.position]).setStyle({display:"inline",visibility:"visible"});
$(this.prefix+this.ids[this.position]).style.removeAttribute("filter");
}else{
$(this.prefix+this.ids[this.position]).setStyle({display:"inline",visibility:"visible",opacity:1});
}
_348.options.onComplete=this.endTransition.bind(this);
_348.hide();
_348.toggle();
}else{
$(this.prefix+this.ids[this.position]).hide();
this.position=newPosition;
$(this.prefix+this.ids[this.position]).show();
}
if(this.positionIndicatorId){
$(this.positionIndicatorId+"_"+this.position).addClassName("active");
}
if(!this.loop){
$(this.nextId).removeClassName("disabled");
$(this.prevId).removeClassName("disabled");
if(this.position==this.ids.length-1){
$(this.nextId).addClassName("disabled");
}
if(this.position==0){
$(this.prevId).addClassName("disabled");
}
}
},next:function(){
this.seek(this.position+1);
},previous:function(){
this.seek(this.position-1);
}};
var FeedManager=Class.create();
FeedManager.prototype={initialize:function(_349,_34a,_34b,_34c){
this.typeId=_349;
this.categoryId=_34a;
this.mobile=navigator.userAgent.toLowerCase().indexOf("mobile")>-1;
this.standalone=_34c;
this.updateTime=_34b;
this.originalUpdateTime=_34b;
this.currentTime=parseInt(_34b,10);
this.reportingFeedStoryId=0;
this.hiddenCount=0;
this.handlers=[];
this.feedItems=[];
this.feedItemCollection=[];
jq(".feed_interact_link").live("click",function(_34d){
_34d.preventDefault();
jq(this).closest(".options").prevAll(".feed_interact").show();
return false;
});
if(!this.standalone){
Event.observe(window,"load",function(){
if(browser=="IE"&&version<=6){
$("old_browser").show();
}
this.updateFeedTypeFilters();
$$("#sidebar .cat").each(function(elt){
if(elt.hasClassName("disabled")){
return;
}
elt.observe("mouseover",function(){
elt.addClassName("active_category");
elt.down(".delete_category").show();
});
elt.observe("mouseout",function(){
elt.removeClassName("active_category");
elt.down(".delete_category").hide();
});
});
this.newStoriesAvailable=0;
this.updaterFibonacciValue=60000;
this.updaterFibonacciValue2=60000;
setTimeout(this.fibonacciUpdate.bind(this),this.updaterFibonacciValue);
}.bind(this));
}
setInterval(this.updateTimes.bind(this),60000);
},updateTimes:function(){
this.currentTime+=60;
$$(".timestamp").each(function(elt){
var _34e=0;
elt.classNames().each(function(name){
if(name.substring(0,2)=="t_"){
_34e=parseInt(name.substring(2),10);
throw $break;
}
});
elt.innerHTML=this.getTimeAgo(this.currentTime-_34e);
}.bind(this));
},getTimeAgo:function(_34f){
if(_34f<=1){
return "1 second ago";
}
var _350=Math.round(_34f/60);
var _351=Math.round(_34f/3600);
var days=Math.round(_34f/86400);
var _352=Math.round(_34f/604800);
var _353=Math.round(_34f/2592000);
var _354=Math.round(_34f/31536000);
var ret="";
if(_354>=2){
ret=_354+" years ago";
}else{
if(_353>=2){
ret=_353+" months ago";
}else{
if(_352>=2){
ret=_352+" weeks ago";
}else{
if(days>=2){
ret=days+" days ago";
}else{
if(_351>=2){
ret=_351+" hours ago";
}else{
if(_350>=1){
ret=_350+" minute"+(_350==1?"":"s")+" ago";
}else{
ret=_34f+" second"+(_34f==1?"":"s")+" ago";
}
}
}
}
}
}
return ret;
},fibonacciUpdate:function(){
var _355=this.updaterFibonacciValue+this.updaterFibonacciValue2;
this.updaterFibonacciValue=this.updaterFibonacciValue2;
this.updaterFibonacciValue2=_355;
new Ajax.Request("/xml/feedupdate.php",{parameters:$H({render:0,a:this.updateTime,typeId:this.typeId,cId:this.categoryId}).toQueryString(),onComplete:function(req){
var _356=parseInt(req.responseText,10);
if(_356>0){
this.newStoriesAvailable=_356;
this.updateStoriesAvailable();
}
setTimeout(this.fibonacciUpdate.bind(this),this.updaterFibonacciValue);
}.bind(this)});
},updateStoriesAvailable:function(){
if(this.newStoriesAvailable==0){
$("new_stories_available").innerHTML="";
return;
}
var _357=this.newStoriesAvailable==1?"y":"ies";
var is=this.newStoriesAvailable==1?"is":"are";
$("new_stories_available").innerHTML="at least "+this.newStoriesAvailable+" new stor"+_357+" "+is+" available (click to load)";
},loadNewStories:function(_358){
var nt=_358?_358:0;
$("loading_feed").show();
new Ajax.Request("/xml/feedupdate.php",{parameters:$H({render:1,a:this.updateTime,typeId:this.typeId,cId:this.categoryId,nt:nt}).toQueryString(),onComplete:function(req){
var data=JSONstring.toObject(req.responseText);
this.updateTime=data["utime"];
var _359=$(document.createElement("div"));
_359.addClassName("feed_item");
_359.innerHTML=data["render"];
var _35a=$("feed_box").down(".feed_item",0);
_35a.parentNode.insertBefore(_359,_35a);
_359.descendants().each(function(elt){
if(elt.tagName=="SCRIPT"){
eval(elt.innerHTML);
}
});
this.addItems(data["feedData"]);
this.updaterFibonacciValue=30000;
this.updaterFibonacciValue2=30000;
this.newStoriesAvailable=0;
this.updateStoriesAvailable();
$("loading_feed").hide();
}.bind(this)});
return false;
},userFanJoin:function(u){
$("loading_feed").show();
new Ajax.Request("/xml/fan.php",{parameters:"u="+u+"&action=add",onComplete:function(req){
var info=JSONstring.toObject(req.responseText);
$("loading_feed").hide();
var _35b=$(document.createElement("div"));
_35b.addClassName("feed_item");
_35b.innerHTML="<h2 class=\"feed_heading\">You are now following <a href=\""+info["url"]+"\">"+info["username"]+"</a>.</h2>";
var _35c=$("feed_box").down(".feed_item",0);
_35c.parentNode.insertBefore(_35b,_35c);
var li=$("suggested_author_"+u);
var ul=li.up("ul");
li.remove();
if(ul.immediateDescendants().size()==0){
new Ajax.Updater("suggested_author_box","/xml/fan.php",{parameters:"action=suggest&c="+this.categoryId});
}
}.bind(this)});
return false;
},categoryFanJoin:function(){
categoryFanBulkJoin("feed_category_fans",false,false,true,this.categoryFanCallback.bind(this));
$("loading_feed").show();
$("category_fan_search").innerHTML="";
$("category_fan_search_text").value="";
return false;
},categoryFanCallback:function(req){
var info=JSONstring.toObject(req.responseText);
if(info.length>0){
if(this.categoryId||this.typeId){
$("loading_feed").hide();
$A(info).each(function(data){
var _35d=$(document.createElement("div"));
_35d.addClassName("feed_item");
_35d.innerHTML="<h2 class=\"feed_heading\">You are now following the topic <a href=\"/feed/all/"+data["id"]+"\">"+data["name"]+"</a>.</h2>";
var _35e=$("feed_box").down(".feed_item",0);
_35e.parentNode.insertBefore(_35d,_35e);
});
}else{
this.loadNewStories(info.length);
}
$A(info).each(function(data){
jq("#hc_"+data["id"]).remove();
});
}else{
$("loading_feed").hide();
var _35f=$(document.createElement("div"));
_35f.addClassName("feed_item");
_35f.innerHTML="<h2 class=\"feed_heading\">You were already a fan of that topic or topics.</h2>";
var _360=$("feed_box").down(".feed_item",0);
_360.parentNode.insertBefore(_35f,_360);
return;
}
var _361=$("category_filters");
if(!_361){
var _362=$(document.createElement("div"));
_362.addClassName("feed_setting_box");
_362.innerHTML="<h3>Filter By Topic</h3><ul id=\"category_filters\" class=\"feed_filter\"><li class=\"all active\">All Topics</li></ul>";
jq("#find_feed_topics").after(_362);
var _361=$("category_filters");
}
$A(info).each(function(data){
var li=$(document.createElement("li"));
li.id="category_filter_"+data["id"];
li.addClassName("cat");
li.innerHTML="<a class=\"delete_category\" onclick=\"return fm.deleteCategory("+data["id"]+",'"+data["name"]+"');"+"\" style=\"display: none;\" href=\"#\">delete</a>";
li.innerHTML+="<a href=\"/feed/all/"+data["id"]+"\" title=\""+data["path"]+"\">"+data["name"]+"</a>";
_361.appendChild(li);
li.observe("mouseover",function(){
li.addClassName("active_category");
li.down(".delete_category").show();
});
li.observe("mouseout",function(){
li.removeClassName("active_category");
li.down(".delete_category").hide();
});
});
},readMore:function(_363,type,id){
new Ajax.Updater(_363,"/xml/readmore.php",{parameters:$H({id:id,type:type}).toQueryString()});
return false;
},makeGrowable:function(id,_364,_365,_366){
makeGrowable(id,_364,_365,_366);
},makeExpandable:function(id,_367,_368,_369){
var elt=jq("#"+id);
if(!elt.size()){
return;
}
var anc=elt.closest("div");
ancId=anc.attr("id");
if(ancId==""||!anc.hasClass("feed_interact")){
makeExpandable(id,_367,_368,_369);
return;
}
elt.addClass("expandable_text dimmed").val(_367).data("hasFocus",false);
function _36a(){
anyHasFocus=false;
anc.find("input, textarea").each(function(_36b,elt){
if(jq(elt).data("hasFocus")){
anyHasFocus=true;
return false;
}
});
return !anc.data("mouseInside")&&!anyHasFocus&&elt.val()=="";
};
function _36c(){
if(_36a()){
if(!_369){
elt.css({height:""}).closest("div").removeClass("expanded");
}
elt.addClass("dimmed").val(_367);
}
};
elt.bind("focus",function(){
if(!anc.hasClass("expanded")){
anc.addClass("expanded");
updateFollowCheckbox.apply(this);
}
if(jq(this).hasClass("dimmed")){
jq(this).removeClass("dimmed").val("");
}
if(typeof (_368)=="function"){
_368.apply(this);
}
});
jq("#"+ancId+" input, #"+ancId+" textarea").live("blur",function(){
jq(this).data("hasFocus",false);
_36c();
}).live("focus",function(){
jq(this).data("hasFocus",true);
});
anc.bind("mouseenter",function(){
anc.data("mouseInside",true);
});
anc.bind("mouseleave",function(){
anc.data("mouseInside",false);
_36c();
});
},addItems:function(feed){
feed.each(function(item){
var fi=new FeedItemManager(item["id"],item["fid"],item["date"],item["hidden"],this);
this.feedItems[item["id"]]=fi;
this.feedItemCollection.push(fi);
if(!item["temporary"]){
if(item["hidden"]){
this.hiddenCount++;
}else{
if(!this.standalone){
fi.hideMenuObserve();
}
}
}
}.bind(this));
if(!this.standalone){
this.updateHiddenLink();
}
},addHandler:function(name,h){
h.ensureSignedInBeforeSave=true;
this.handlers[name]=h;
},getHandler:function(name){
return this.handlers[name];
},saveForm:function(_36d){
this.getHandler(_36d).save();
return false;
},addStoryToTop:function(_36e,id,_36f){
var _370=$(document.createElement("div"));
_370.innerHTML=_36e;
_370.addClassName("feed_item");
var _371=$("feed_box").down(".feed_item",0);
_371.parentNode.insertBefore(_370,_371);
_370.descendants().each(function(elt){
if(elt.tagName=="SCRIPT"){
safeScriptEval(elt);
}
});
this.addItems(new Array({id:id,fid:id,date:0,hidden:0,temporary:1}));
var _372=new fx.Color(_370,{duration:1600,fromColor:"#feffd7",toColor:"#ffffff",onComplete:(_36f?_36f:function(){
})});
_372.toggle();
},shrinkStatus:function(){
photoGalleryInserter.instance().close();
var s=$("status");
s.value="What's on your mind?";
s.addClassName("dimmed");
$$("#status_update input[type=checkbox]")[0].checked=false;
$$("#status_update .photo_preview")[0].innerHTML="";
$$("#status_update input[name=imageId]")[0].value=0;
$("status_wrapper").removeClassName("expanded");
var _373=new fx.Height("status_wrapper",{duration:400,toHeight:23,onComplete:function(){
$("status_wrapper").setStyle({height:"auto"});
$("tabcontent_feed_top_0").removeClassName("expanded");
}});
_373.toggle();
},shrinkQuestion:function(data){
photoGalleryInserter.instance().close();
$("question_errors").innerHTML="";
if(data["limitReached"]){
$("tabcontent_feed_top_1").innerHTML="<h2>You have reached your daily limit for asking questions.</h2>";
}else{
var _374=new fx.Height("question_wrapper",{duration:800,toHeight:31,onComplete:function(){
category.startOver();
$("categorySearchResults").innerHTML="";
Form.reset($("question_form"));
var _375=$("question");
_375.value="What is your question?";
_375.addClassName("dimmed");
_375.up("div").removeClassName("expanded");
var _376=$("additionalDetails");
_376.value="Additional details to your question (optional)";
_376.setStyle({height:""});
_376.addClassName("dimmed");
_376.up("div").removeClassName("expanded");
$("q_numcharsvalue").innerHTML=100;
$("ad_numcharsvalue").innerHTML=600;
$("requestSuggestions").hide();
$("confirmquestion").hide();
$("requestSuggestionsButton").show();
$("question_details").hide();
selectTab("categoryTabs",1,2);
subFlg=false;
$("question_wrapper").setStyle({height:"auto"});
$$("#question_details input[type=checkbox]")[0].checked=false;
$$("#question_details .photo_preview")[0].innerHTML="";
$$("#question_details input[name=imageId]")[0].value=0;
}});
_374.toggle();
}
},forumShrink:function(){
photoGalleryInserter.instance().close();
var _377=new fx.Height("forum_wrapper",{duration:600,toHeight:22,onComplete:function(){
$("forum_msg").innerHTML="";
$("forum_details").hide();
var _378=$("subject");
var _379=$("message");
_378.addClassName("dimmed");
_378.value="What is the subject of your forum post?";
_378.up("div").removeClassName("expanded");
_379.addClassName("dimmed");
_379.value="Type your message";
_379.setStyle({height:""});
_379.up("div").removeClassName("expanded");
feed_forum_selector.chooseForum(0);
$("forum_wrapper").setStyle({height:"auto"});
$$("#forum_details input[type=checkbox]")[1].checked=false;
$$("#forum_details .photo_preview")[0].innerHTML="";
$$("#forum_details input[name=imageId]")[0].value=0;
}});
_377.toggle();
},forumCallback:function(req){
var data=JSONstring.toObject(req.responseText);
if(data["valid"]){
fm.addStoryToTop(data["render"],data["id"],this.forumShrink.bind(this));
}else{
if(data["msg"]){
$("forum_msg").innerHTML=data["msg"];
}
}
},statusCallback:function(req){
var data=JSONstring.toObject(req.responseText);
sId=data["id"].substring(7);
linkId="delete_status_"+sId;
removeHtml="<a href=\"#\" id=\""+linkId+"\" title=\"delete this status update\">[delete]</a>";
fm.addStoryToTop(data["render"]+removeHtml,data["id"],this.shrinkStatus.bind(this));
jq("#"+linkId).click(deleteStatus);
},questionCallback:function(req){
var data=JSONstring.toObject(req.responseText);
this.addStoryToTop(data["render"],data["id"],this.shrinkQuestion.bind(this,data));
},moreFeed:function(_37a){
new Ajax.Request("/xml/feedmore.php",{parameters:$H({b:this.originalUpdateTime,startpos:_37a,typeId:this.typeId,categoryId:this.categoryId,sa:this.standalone?1:0,mobile:this.mobile?1:0}).toQueryString(),onComplete:function(req){
var _37b=JSONstring.toObject(req.responseText);
var _37c=$("show_more");
_37c.style.display="none";
_37c.id="";
var _37d=$(document.createElement("div"));
$("feed_box").appendChild(_37d);
_37d.innerHTML=_37b["render"];
var _37e=$("feed_more_"+_37a);
$$("#feed_more_"+_37a+" script").each(function(_37f){
safeScriptEval(_37f);
});
this.addItems(_37b["feed"]);
}.bind(this)});
return false;
},updateHiddenLink:function(){
if(this.hiddenCount==1){
$("show_hidden").innerHTML="show 1 hidden story";
}else{
if(this.hiddenCount>0){
$("show_hidden").innerHTML="show "+this.hiddenCount+" hidden stories";
}else{
$("show_hidden").innerHTML="";
}
}
},getById:function(id){
return this.feedItems[id];
},stopReporting:function(){
if(this.reportingFeedStoryId){
this.getById(this.reportingFeedStoryId).stopObservePostReporting();
this.reportingFeedStoryId=0;
}
},unhideAll:function(){
this.feedItemCollection.each(function(fi){
fi.unhide();
});
this.updateHiddenLink();
return false;
},unhideUser:function(_380){
new Ajax.Request("/xml/feedhide.php",{parameters:$H({u:_380,del:1}).toQueryString(),onComplete:function(){
$$(".u"+_380).each(function(elt){
if(elt.id){
var fid=elt.id.substring(elt.id.indexOf("_")+1);
var _381=this.getById(fid);
if(_381){
_381.unhide(true);
}
}
}.bind(this));
var hu=$("hu_"+_380);
if(hu){
if(hu.siblings().size()==0){
var _382=$("hidden_people");
if(!($("hidden_topics"))){
var p=$(document.createElement("p"));
p.innerHTML="All people and topics are visible.";
_382.parentNode.insertBefore(p,_382);
}
_382.remove();
}else{
hc.remove();
}
}
this.updateHiddenLink();
}.bind(this)});
return false;
},unhideCategory:function(_383){
new Ajax.Request("/xml/feedhide.php",{parameters:$H({c:_383,del:1}).toQueryString(),onComplete:function(){
$$(".c"+_383).each(function(elt){
if(elt.id){
var fid=elt.id.substring(elt.id.indexOf("_")+1);
var _384=this.getById(fid);
if(_384){
_384.unhide(true);
}
}
}.bind(this));
var hc=$("hc_"+_383);
if(hc){
if(hc.siblings().size()==0){
var _385=$("hidden_topics");
if(!($("hidden_people"))){
var p=$(document.createElement("p"));
p.innerHTML="All people and topics are visible.";
_385.parentNode.insertBefore(p,_385);
}
_385.remove();
}else{
hc.remove();
}
}
this.updateHiddenLink();
}.bind(this)});
return false;
},toggleEditHidden:function(){
var val=$("edit_hidden").innerHTML;
if(val=="done editing"){
$("edit_hidden").innerHTML="edit";
$("hidden_list").hide();
}else{
$("edit_hidden").innerHTML="done editing";
if($("hidden_list").innerHTML==""){
this.updateHiddenList(true);
}else{
$("hidden_list").show();
}
}
return false;
},updateHiddenList:function(show){
new Ajax.Updater("hidden_list","/xml/feedhide.php",{parameters:"list=1",onComplete:function(){
if(show){
$("hidden_list").show();
}
}});
},closeOverlay:function(){
this.stopReporting();
toggleOverlay("overlay");
var _386=$("overlay");
_386.classNames().each(function(name){
if(name!="overlay"){
_386.removeClassName(name);
}
});
$("overlay_content").innerHTML="<div class=\"spinner\"></div>";
$("overlay").setStyle({paddingTop:"0"});
return false;
},openOverlay:function(_387){
if(_387){
$("overlay").addClassName(_387);
}
adjustOverlayHeight();
toggleOverlay("overlay");
},showHelpOverlay:function(url){
this.openOverlay("help");
new Ajax.Updater("overlay_content","/xml/staticpage.php?url="+url);
return false;
},showQuestionOverlay:function(id){
this.openOverlay("hubpage");
new Ajax.Updater("overlay_content","/xml/answersrender.php?id="+id,{evalScripts:true,onComplete:function(){
var _388=$("fixed_title").getHeight();
if(browser!="IE"||version>6){
$("overlay").setStyle({paddingTop:_388+"px"});
}
adjustOverlayHeight();
jQuery.ajax({type:"POST",url:"/xml/get_follow_text.php",data:{typeId:1,objectId:id,printNumbers:true},success:function(data){
jQuery("#follow_"+id).replaceWith(data);
}});
jQuery.ajax({url:"http://platform.twitter.com/widgets.js",dataType:"script",cache:true});
}.bind(this)});
return false;
},showFlagRequestOverlay:function(id){
this.openOverlay("flagrequest");
new Ajax.Updater("overlay_content","/xml/flagrequest.php?r="+id,{evalScripts:true,onComplete:function(){
var _389=$("fixed_title").getHeight();
if(browser!="IE"||version>6){
$("overlay").setStyle({paddingTop:_389+"px"});
}
adjustOverlayHeight();
}.bind(this)});
return false;
},showImageOverlay:function(url){
jq.fancybox({type:"image",href:url});
return false;
},showFlagHubOverlay:function(id){
this.openOverlay("flaghub");
new Ajax.Updater("overlay_content","/xml/flaghub.php?a="+id,{evalScripts:true,onComplete:function(req){
var _38a=$("fixed_title").getHeight();
if(browser!="IE"||version>6){
$("overlay").setStyle({paddingTop:_38a+"px"});
}
adjustOverlayHeight();
}.bind(this)});
return false;
},showHubOverlay:function(url){
this.openOverlay("hubpage");
new Ajax.Request("/xml/articlerender.php?url="+url,{onComplete:function(req){
var _38b=0;
$("overlay_content").innerHTML=req.responseText;
var _38c=$("fixed_title").getHeight();
if(browser!="IE"||version>6){
$("overlay").setStyle({paddingTop:_38c+"px"});
}
adjustOverlayHeight();
$$("#overlay_content script").each(function(_38d){
var code=_38d.innerHTML;
eval(code);
});
}.bind(this)});
return false;
},reportPost:function(_38e){
this.openOverlay("postreport");
new Ajax.Updater("overlay_content","/xml/reportpostrender.php?p="+_38e,{evalScripts:true});
return false;
},reportPostCallback:function(){
$("overlay_content").innerHTML="<h2>The post has been flagged. Thanks for your input!</h2>";
},deleteCategory:function(_38f,_390){
var sure=confirm("Are you sure that you want to stop following "+_390+"?");
if(!sure){
return false;
}
var ajax=new Ajax.Request("/xml/categoryFanBulkJoin.php",{parameters:$H({checked_ids:"",unchecked_ids:_38f,html_target:"feed_category_fans"}).toQueryString(),onSuccess:function(){
$("category_filter_"+_38f).remove();
}});
return false;
},updateFeedTypeFilters:function(){
var _391=$A(["hubs","comments","posts","questions","answers","fans","milestones"]);
_391.each(function(type){
var _392=false;
$$("#type_filters li."+type+" input.ht_box").each(function(_393){
if(_393.checked){
_392=true;
throw $break;
}
});
var li=$("type_filters").down("li."+type);
if(li){
if(_392){
li.removeClassName("inactive");
}else{
li.addClassName("inactive");
li.hide();
}
}
});
},toggleFeedPrefs:function(){
var _394=$("edit_button");
var _395=$("filter").value;
var _396="edit";
if(_394.innerHTML=="save"){
_396="save";
}
if(_396=="save"){
this.updateFeedTypeFilters();
var _397=0;
var _398=document.getElementsByClassName("ht_box");
for(var j=0;j<_398.length;j++){
if(_398[j].checked){
_397+=Number(_398[j].name.substr(3));
}
}
var _399=$("current_prefs");
if(_397!=_399.value){
var ajax=new Ajax.Request("/xml/activityPref.php",{parameters:$H({prefs:_397,filter:_395,feed:1}).toQueryString(),onComplete:function(){
Element.update(_394,"edit");
var pf=$("preference_feedback");
pf.update("<span class=\"changes_saved\">Saved</span>. Changes take effect going forward. <a href=\"#\" id=\"preference_change_hide\" onclick=\"$('preference_feedback').hide(); return false;\">hide</a>");
pf.setStyle({height:""});
pf.show();
var _39a=parseInt(pf.getStyle("height"));
var _39b=new fx.Height("preference_feedback",{duration:600});
_39b.hide();
_39b.custom(0,_39a);
}});
_399.value=_397;
}else{
Element.update(_394,"edit");
var pf=$("preference_feedback");
pf.update("No changes were made. <a href=\"#\" id=\"preference_change_hide\" onclick=\"$('preference_feedback').hide(); return false;\">hide</a>");
pf.setStyle({height:""});
pf.show();
var _39c=parseInt(pf.getStyle("height"));
var _39d=new fx.Height("preference_feedback",{duration:600});
_39d.hide();
_39d.custom(0,_39c);
}
}
var curs=document.getElementsByClassName("ht_cur");
var _39e="";
for(var i=0;i<curs.length;i++){
_39e=curs[i].className;
}
var eles=document.getElementsByClassName("ht_pref");
for(var i=0;i<eles.length;i++){
if(_396=="edit"){
if(_39e=="ht_all ht_cur"){
eles[i].style.display="block";
}else{
if(eles[i].parentNode.className==_39e){
eles[i].style.display="block";
}
}
}else{
eles[i].style.display="none";
}
}
if(_396=="edit"){
_394.innerHTML="save";
$("preference_feedback").hide();
$$("#type_filters li.inactive").each(function(elt){
elt.show();
});
}
return false;
}};
var FeedItemManager=Class.create();
FeedItemManager.prototype={initialize:function(id,fid,_39f,_3a0,_3a1){
this.id=id;
this.feedItemId=fid;
this.cdate=_39f;
this.hidden=_3a0;
this.manager=_3a1;
this.menuVisible=0;
this.mobile=navigator.userAgent.toLowerCase().indexOf("mobile")>-1;
this.mouseoverHandlers=new Array();
this.mouseoutHandlers=new Array();
this.clickHandlers=new Array();
this.prefix="story_";
this.htmlId=this.prefix+this.id;
this.triggerId="menu_trigger_"+this.id;
this.hideId="menu_"+this.id;
this.mainId="hide_menu_"+this.id;
this.messageId="message_"+this.id;
this.hideMessageId="hide_message_"+this.id;
this.likeId="feed_like_"+this.id;
},unhide:function(_3a2){
if(!$(this.htmlId).hasClassName("hidden")){
return;
}
$(this.htmlId).removeClassName("hidden");
this.manager.hiddenCount--;
if(_3a2){
this.hidden=0;
this.hideMenuObserve();
}
},hideMenuObserve:function(){
if(!this.mobile){
Event.observe(this.htmlId,"mouseover",this.showHideMenu.bindAsEventListener(this));
Event.observe(this.htmlId,"mouseout",this.hideHideMenu.bindAsEventListener(this));
Event.observe(this.triggerId,"mouseover",function(){
$(this.hideId).show();
}.bind(this));
Event.observe(this.triggerId,"mouseout",function(){
$(this.hideId).hide();
}.bind(this));
}
$(this.hideId).immediateDescendants().each(function(elt){
elt=$(elt);
var _3a3=elt.immediateDescendants().detect(function(c){
return c.tagName=="UL";
});
if(_3a3){
elt.observe("mouseover",function(_3a4){
_3a4.show();
}.bind(this,_3a3));
elt.observe("mouseout",function(_3a5){
_3a5.hide();
}.bind(this,_3a3));
}
});
$(this.hideId).descendants().each(function(elt){
elt=$(elt);
if(elt.tagName=="LI"){
elt.observe("mouseover",function(){
if(!elt.hasClassName("active")){
elt.addClassName("active");
}
});
elt.observe("mouseout",function(){
if(elt.hasClassName("active")){
elt.removeClassName("active");
}
});
}
});
},showHideMenu:function(e){
if(!this.hidden&&!this.menuVisible){
this.menuVisible=1;
$(this.mainId).show();
}
},hideHideMenu:function(e){
if(this.menuVisible){
this.menuVisible=0;
$(this.mainId).hide();
}
},share:function(){
check_signed_in_ajax(this.doShare.bind(this));
return false;
},doShare:function(_3a6,_3a7){
if(_3a6){
new Ajax.Updater("share_"+this.id,"/xml/feedshare.php",{parameters:$H({id:this.feedItemId,d:this.cdate}).toQueryString(),onComplete:function(){
$(this.messageId).innerHTML="This story has been shared with your followers.";
}.bind(this)});
if(_3a7){
toggleOverlay("feedSignUp");
}
}else{
suFH.onSuccess=this.doShare.bind(this,true,true);
siFH.onSuccess=this.doShare.bind(this,true,true);
fetchRecaptcha("feedCaptcha");
toggleOverlay("feedSignUp");
}
},hide:function(){
this.manager.hiddenCount++;
this.hidden=1;
$(this.htmlId).addClassName("hidden");
},hideStory:function(){
new Ajax.Request("/xml/feedhide.php",{parameters:$H({id:this.feedItemId}).toQueryString(),onComplete:function(){
var hmsg=$(this.hideMessageId);
if(!hmsg){
var hmsg=$(document.createElement("div"));
hmsg.id=this.hideMessageId;
hmsg.addClassName("hide_notice");
var _3a8=$(this.htmlId);
_3a8.parentNode.insertBefore(hmsg,_3a8);
}
hmsg.innerHTML="Story hidden";
jq("#"+this.hideMessageId).delay(2500).fadeOut(1000);
this.hide();
this.manager.updateHiddenLink();
}.bind(this)});
return false;
},removeHideMessage:function(){
$(this.hideMessageId).remove();
return false;
},hideUser:function(_3a9,_3aa){
_3aa=_3aa?1:0;
new Ajax.Request("/xml/feedhide.php",{parameters:$H({id:this.id,userId:_3a9,force:_3aa}).toQueryString(),onComplete:function(req){
var data=JSONstring.toObject(req.responseText);
var hmsg=$(this.hideMessageId);
if(!hmsg){
var hmsg=$(document.createElement("div"));
hmsg.id=this.hideMessageId;
hmsg.addClassName("hide_notice");
var _3ab=$(this.htmlId);
_3ab.parentNode.insertBefore(hmsg,_3ab);
}
hmsg.innerHTML=data["msgHtml"];
if(data["success"]){
$$(".u"+_3a9).each(function(elt){
eltId=elt.id.substring(this.prefix.length);
this.manager.getById(eltId).hide();
}.bind(this));
this.manager.updateHiddenLink();
this.manager.updateHiddenList();
}
}.bind(this)});
return false;
},hideCategory:function(_3ac,_3ad){
_3ad=_3ad?1:0;
new Ajax.Request("/xml/feedhide.php",{parameters:$H({id:this.id,force:_3ad,categoryId:_3ac}).toQueryString(),onComplete:function(req){
var data=JSONstring.toObject(req.responseText);
var hmsg=$(this.hideMessageId);
if(!hmsg){
var hmsg=$(document.createElement("div"));
hmsg.id=this.hideMessageId;
hmsg.addClassName("hide_notice");
var _3ae=$(this.htmlId);
_3ae.parentNode.insertBefore(hmsg,_3ae);
}
hmsg.innerHTML=data["msgHtml"];
if(data["success"]){
$$(".c"+_3ac).each(function(elt){
eltId=elt.id.substring(this.prefix.length);
this.manager.getById(eltId).hide();
}.bind(this));
this.manager.updateHiddenLink();
this.manager.updateHiddenList();
}
if(data["ids"]){
$A(data["ids"]).each(function(id){
if($("category_filter_"+id)){
$("category_filter_"+id).remove();
}
});
}
}.bind(this)});
return false;
},hidePreviousPosts:function(){
var _3af=$("feed_posts_"+this.id).immediateDescendants();
var _3b0=_3af.size();
_3af.each(function(elt,_3b1){
if(_3b1==_3b0-1){
elt.show();
}else{
elt.remove();
}
}.bind(this));
return false;
},hidePreviousComments:function(){
var _3b2=$("feed_comments_"+this.id).immediateDescendants();
var _3b3=_3b2.size();
var _3b4=0;
_3b2.each(function(elt,_3b5){
if(elt.hasClassName("show_previous")){
_3b4=_3b5;
}
});
_3b2.each(function(elt,_3b6){
if(_3b6==_3b4){
elt.show();
throw $break;
}else{
elt.remove();
}
}.bind(this));
return false;
},seePreviousPosts:function(_3b7,num,_3b8){
new Ajax.Request("/xml/moreposts.php",{parameters:$H({uid:this.id,t:_3b7,num:num,startpos:_3b8}).toQueryString(),onComplete:function(req){
var _3b9=$("feed_posts_"+this.id);
_3b9.down("div").hide();
new Insertion.Top(_3b9,req.responseText);
}.bind(this)});
return false;
},seePreviousFeedComments:function(num,_3ba){
new Ajax.Request("/xml/morefeedcomments.php",{parameters:$H({fid:this.feedItemId,id:this.id,num:num,startpos:_3ba}).toQueryString(),onComplete:function(req){
var _3bb=$("feed_comments_"+this.id);
_3bb.down("div").hide();
new Insertion.Top(_3bb,req.responseText);
}.bind(this)});
return false;
},seePreviousComments:function(_3bc,num,_3bd){
new Ajax.Request("/xml/morecomments.php",{parameters:$H({uid:this.id,mdcId:_3bc,num:num,startpos:_3bd}).toQueryString(),onComplete:function(req){
var _3be=$("feed_comments_"+this.id);
_3be.down("div").hide();
new Insertion.Top(_3be,req.responseText);
}.bind(this)});
return false;
},commentCallback:function(req){
data=JSONstring.toObject(req.responseText);
var _3bf=$("feed_comments_"+this.id);
_3bf.innerHTML+=data["render"];
jq("#comment_"+this.id).val("").blur();
},answerCallback:function(req){
var data=JSONstring.toObject(req.responseText);
if(data["valid"]){
$("server_error_"+this.id).innerHTML="";
$("answer_interact_"+this.id).innerHTML=data["msg"];
$("answers_"+this.id).innerHTML=data["c"]+" answer"+(data["c"]==1?"":"s");
}else{
$("server_error_"+this.id).innerHTML="<span class=\"alert\">"+data["msg"]+"</span>";
}
},postCallback:function(req){
var data=JSONstring.toObject(req.responseText);
if(data["valid"]){
$("server_error_"+this.id).innerHTML="";
$("new_posts_"+this.id).innerHTML+=data["render"];
jq("#post_"+this.id).val("").blur();
}else{
$("server_error_"+this.id).innerHTML="<span class=\"alert\">"+data["msg"]+"</span>";
}
},activatePost:function(elt){
elt.addClassName("feed_post_active");
},deactivatePost:function(elt){
elt.removeClassName("feed_post_active");
},observePostReporting:function(_3c0){
this.manager.stopReporting();
this.manager.reportingFeedStoryId=this.id;
var _3c1=$$("#story_"+this.id+" .feed_post");
if(_3c1.size()>1){
_3c1.each(function(elt){
var _3c2=this.postIdFromDivId(elt.id);
elt.setStyle({cursor:"pointer"});
var _3c3=this.activatePost.bind(this,elt);
this.mouseoverHandlers[_3c2]=_3c3;
elt.observe("mouseover",_3c3);
var _3c4=this.deactivatePost.bind(this,elt);
this.mouseoutHandlers[_3c2]=_3c4;
elt.observe("mouseout",_3c4);
var _3c5=this.manager.reportPost.bind(this.manager,_3c2);
this.clickHandlers[_3c2]=_3c5;
elt.observe("click",_3c5);
}.bind(this));
var msg=$(document.createElement("p"));
msg.appendChild(document.createTextNode("Click on the post that you want to report or "));
var _3c6=$(document.createElement("a"));
_3c6.innerHTML="cancel report";
_3c6.href="#";
msg.appendChild(_3c6);
var _3c7=$(this.messageId);
_3c7.innerHTML="";
_3c7.appendChild(msg);
_3c7.addClassName("report_instructions");
var _3c8=parseInt(_3c7.getStyle("height"));
var _3c9=new fx.Height(this.messageId,{duration:500});
_3c9.hide();
_3c9.custom(0,_3c8);
_3c6.observe("click",this.stopObservePostReporting.bind(this));
}else{
if(_3c1.size()==1){
var post=_3c1.detect(function(elt){
return true;
});
var _3ca=post.id;
this.manager.reportPost(this.postIdFromDivId(_3ca));
}
}
return false;
},postIdFromDivId:function(_3cb){
return _3cb.substring(_3cb.lastIndexOf("_")+1);
},stopObservePostReporting:function(_3cc){
var _3cd=$$("#story_"+this.id+" .feed_post");
if(_3cd.size()>1){
_3cd.each(function(elt){
elt.setStyle({cursor:"auto"});
this.deactivatePost(elt);
var _3ce=this.postIdFromDivId(elt.id);
elt.stopObserving("mouseover",this.mouseoverHandlers[_3ce]);
elt.stopObserving("mouseout",this.mouseoutHandlers[_3ce]);
elt.stopObserving("click",this.clickHandlers[_3ce]);
}.bind(this));
}
$(this.messageId).innerHTML="";
$(this.messageId).removeClassName("report_instructions");
$(this.messageId).setStyle({height:""});
if(_3cc){
Event.stop(_3cc);
}
}};
function updateFollowCheckbox(){
var key=jq(this).attr("data-key");
if(key){
var id=jq(this).attr("data-id");
data={};
data[key]=id;
if(jq(this).next(".follow").size()==0){
jq(this).after("<span class=\"follow\"></span>");
}
jq(this).next(".follow").html("").css("height","0px").load("/xml/get_follow_checkbox.php",data,function(){
if(jq(this).html()!=""){
jq(this).css("height","auto");
}
});
}
};
function deleteStatus(_3cf){
link=jq(_3cf.target);
id=link.attr("id").substring(14);
jq.post("/xml/status.php",{del:id},function(){
link.prev("div").remove();
link.remove();
});
return false;
};
var mm;
function mapsManager(){
this.maps=[];
};
mapsManager.prototype.addMap=function(id,map){
this.maps[id]=map;
map.id=id;
};
mapsManager.prototype.getMapById=function(id){
return this.maps[id];
};
function markerMap(m,_3d0,tmId,usId){
this.map=m;
this.markers=[];
this.infowindow=new google.maps.InfoWindow();
this.polyline=new google.maps.Polyline({clickable:false,strokeColor:"#0000ff",strokeWeight:5,strokeOpacity:0.7});
this.polyline.setMap(m);
this.directionsResult=null;
this.legend=$(_3d0);
this.travelModeId=tmId;
this.unitSystemId=usId;
this.id=null;
};
markerMap.prototype.addMarker=function(_3d1,_3d2){
this.markers.push(new infoMarker(this,_3d1,_3d2,this.markers.length));
};
markerMap.prototype.removeAllMarkers=function(){
for(var i=0;i<this.markers.length;i++){
this.markers[i].marker.setMap(null);
}
this.markers=[];
};
function infoMarker(_3d3,_3d4,_3d5,_3d6){
this.markermap=_3d3;
this.marker=_3d4;
this.content=_3d5;
this.position=_3d6;
this.open=false;
google.maps.event.addListener(this.marker,"click",function(){
this.markermap.infowindow.setContent(this.content);
this.markermap.infowindow.open(this.markermap.map,this.marker);
this.open=true;
google.maps.event.addListenerOnce(this.markermap.infowindow,"closeclick",function(){
this.open=false;
unhighlightMarker(this);
}.bind(this));
highlightMarker(this);
}.bind(this));
google.maps.event.addListener(this.marker,"mouseover",function(){
highlightMarker(this);
}.bind(this));
google.maps.event.addListener(this.marker,"mouseout",function(){
if(!this.open){
unhighlightMarker(this);
}
}.bind(this));
};
markerMap.prototype.hideDirections=function(){
var i=0;
while(true){
var _3d7=$(this.legend.id+"_"+i);
if(_3d7){
_3d7.innerHTML="";
}else{
break;
}
i++;
}
$(this.legend.id+"_copyright").innerHTML="";
$(this.legend.id+"_warnings").innerHTML="";
this.polyline.setMap(null);
};
markerMap.prototype.renderDirections=function(){
if(this.directionsResult.routes[0].overview_path.length==0){
this.polyline.setMap(null);
}else{
if(!this.polyline.getMap()){
this.polyline.setMap(this.map);
}
this.polyline.setPath(this.directionsResult.routes[0].overview_path);
}
var _3d8=this.directionsResult.routes[0];
var legs=_3d8.legs;
for(var i=0;i<legs.length;i++){
var leg=legs[i];
var html="<div>"+leg.distance.text+" - about "+leg.duration.text+" of "+$F(this.travelModeId).toLowerCase()+"</div><table><tbody>";
if(leg.steps.length>100){
html+="<p>We're sorry, but the directions for this step are too long to display.</p>";
}else{
for(var j=0;j<leg.steps.length;j++){
var step=leg.steps[j];
html+="<tr><td>"+(j+1)+".</td><td>"+step.instructions+"</td><td>"+step.distance.text+"</td></tr>";
}
html+="</tbody></table>";
}
$(this.legend.id+"_"+i).innerHTML=html;
}
while(true){
var _3d9=$(this.legend.id+"_"+i);
if(_3d9){
_3d9.innerHTML="";
}else{
break;
}
i++;
}
$(this.legend.id+"_copyright").innerHTML=_3d8.copyrights;
var _3da="";
for(var j=0;j<_3d8.warnings.length;j++){
_3da+=_3d8.warnings[j]+"<br/>";
}
$(this.legend.id+"_warnings").innerHTML=_3da;
};
markerMap.prototype.fetchDirections=function(){
var _3db=this.markers;
var l=_3db.length;
var _3dc=new google.maps.LatLng(_3db[0].marker.getPosition().lat(),_3db[0].marker.getPosition().lng());
var _3dd=new google.maps.LatLng(_3db[l-1].marker.getPosition().lat(),_3db[l-1].marker.getPosition().lng());
var _3de=[];
for(var i=1;i<l-1;i++){
_3de.push({location:new google.maps.LatLng(_3db[i].marker.getPosition().lat(),_3db[i].marker.getPosition().lng()),stopover:true});
}
var _3df={origin:_3dc,destination:_3dd,waypoints:_3de,travelMode:google.maps.DirectionsTravelMode[$F(this.travelModeId)],unitSystem:google.maps.DirectionsUnitSystem[$F(this.unitSystemId)]};
var _3e0=new google.maps.DirectionsService();
_3e0.route(_3df,function(_3e1,_3e2){
if(_3e2==google.maps.DirectionsStatus.OK&&this.markers.length==l){
this.directionsResult=_3e1;
this.renderDirections();
}
}.bind(this));
};
jQuery(function(){
mm=new mapsManager();
});
function renderMapFromData(id,data,_3e3){
var _3e4="map_canvas_"+id;
var _3e5=mm.getMapById(id);
if(!_3e5){
var map=new google.maps.Map(document.getElementById(_3e4));
var _3e5=new markerMap(map,"map_legend_"+id,"travel_mode_"+id,"unit_system_"+id);
mm.addMap(id,_3e5);
sv=true;
}else{
var map=_3e5.map;
sv=false;
}
map.setOptions({zoom:data.zoom,center:new google.maps.LatLng(data.lat,data.lng),mapTypeId:google.maps.MapTypeId[data.mapType],streetViewControl:sv,scrollwheel:false});
_3e5.removeAllMarkers();
var _3e6="";
for(var i=0;i<data.markers.length;i++){
var m=data.markers[i];
var _3e7=mapLetterFromPosition(i);
var icon="http://www.google.com/mapfiles/marker_green"+_3e7+".png";
var _3e8="<div class=\"infowindow_content\"><strong>"+m.name+"</strong><br/><small>"+m.address+"</small><p>"+m.description+"</p>";
var _3e9=new google.maps.Marker({position:new google.maps.LatLng(m.lat,m.lng),map:map,title:m.name,icon:icon});
_3e5.addMarker(_3e9,_3e8);
if(data.hubtool){
var dest=(m.address.strip()=="")?m.name:m.address;
_3e6+="<div class=\"map_stopover\" onmouseover=\"highlightMapMarker(event, "+id+", "+i+");\" onmouseout=\"unhighlightMapMarker(event, "+id+", "+i+");\">"+"<img src=\""+icon+"\" id=\"stopover_icon_"+id+"_"+i+"\"/>"+"<strong>"+m.name+"</strong> - "+"<small>"+m.address+" "+"<a href=\"http://maps.google.com/maps?f=d&z="+data.zoom+"&q="+encodeURI(dest)+"@"+m.lat+","+m.lng+"\">[get directions]</a>"+"</small>"+"<p>"+m.description+"</p>"+"</div>"+"<div id=\""+_3e5.legend.id+"_"+i+"\"></div>";
}
}
if(data.hubtool){
_3e6+="<div id=\""+_3e5.legend.id+"_warnings\" class=\"map_warnings\"></div>";
_3e6+="<div id=\""+_3e5.legend.id+"_copyright\" class=\"map_copyright\"></div>";
_3e5.legend.innerHTML=_3e6;
if(data.markers.length>=2){
$("map_route_"+id).show();
}else{
$("map_route_"+id).hide();
}
if(data.markers.length>=2&&$("route_options_"+id).visible()){
if(_3e3||!_3e5.directionsResult){
_3e5.fetchDirections();
}else{
_3e5.renderDirections();
}
}else{
var _3ea={status:"OK",routes:[{legs:[],overview_path:[],copyrights:"",warnings:[]}]};
_3e5.directionsResult=_3ea;
_3e5.renderDirections();
}
}
};
function showRouteAndDirections(id){
mm.getMapById(id).fetchDirections();
};
function hideRouteAndDirections(id){
mm.getMapById(id).hideDirections();
};
function highlightMarker(_3eb){
var id=_3eb.markermap.id;
if(!id){
return;
}
var _3ec=mapLetterFromPosition(_3eb.position);
var icon="http://www.google.com/mapfiles/marker_yellow"+_3ec+".png";
_3eb.marker.setIcon(icon);
var img=$("stopover_icon_"+id+"_"+_3eb.position);
if(img){
img.src=icon;
}
};
function unhighlightMarker(_3ed){
var id=_3ed.markermap.id;
if(!id){
return;
}
var _3ee=mapLetterFromPosition(_3ed.position);
var icon="http://www.google.com/mapfiles/marker_green"+_3ee+".png";
_3ed.marker.setIcon(icon);
var img=$("stopover_icon_"+id+"_"+_3ed.position);
if(img){
img.src=icon;
}
};
function mapLetterFromPosition(pos){
return String.fromCharCode(65+pos);
};
function highlightMapMarker(_3ef,id,_3f0){
var _3f1=mm.getMapById(id);
if(_3f0<_3f1.markers.length){
highlightMarker(_3f1.markers[_3f0]);
}
};
function unhighlightMapMarker(_3f2,id,_3f3){
var _3f4=mm.getMapById(id);
if(_3f3<_3f4.markers.length){
unhighlightMarker(_3f4.markers[_3f3]);
}
};
var lastEditedMessageEle=null;
function attach_forum_topic_events(){
jQuery("div.posts a.reply").live("click",function(){
jQuery("#report_box").hide();
jQuery(".actionmenu a").removeClass("selected");
jQuery(this).addClass("selected");
var post=jQuery(this).closest("li.threaded");
post.append("<img class=\"wait\" src=\"/i/spnr.gif\" />");
check_signed_in_ajax(processReplyStart,{"ele":this});
return false;
});
jQuery("div.posts a.delete").live("click",function(){
if(confirm("Are you sure you want to delete this post?")){
var post=jQuery(this).closest("li.threaded");
post.append("<img class=\"wait\" src=\"/i/spnr.gif\" />");
jQuery(this).closest("li.threaded").load("/xml/forum/delete_inline.php",{postId:post.attr("id").substring(4)},processDeleteResponse);
}
return false;
});
jQuery("div.posts a.undelete").live("click",function(){
if(confirm("Are you sure you want to undelete this post?")){
var post=jQuery(this).closest("li.threaded");
post.append("<img class=\"wait\" src=\"/i/spnr.gif\" />");
jQuery(this).closest("li.threaded").load("/xml/forum/undelete_inline.php",{postId:post.attr("id").substring(4)},processUndeleteResponse);
}
return false;
});
jQuery("div.posts a.edit").live("click",function(){
jQuery("#report_box").hide();
jQuery(".actionmenu a").removeClass("selected");
jQuery(this).addClass("selected");
var post=jQuery(this).closest("li.threaded");
post.append("<img class=\"wait\" src=\"/i/spnr.gif\" />");
jQuery.ajax({type:"GET",url:"/xml/forum/edit_inline.php",data:{postId:post.attr("id").substring(4)},complete:processStartEditResponse});
return false;
});
jQuery("div.posts a.report").live("click",function(){
jQuery("#editor_box").hide();
jQuery(".actionmenu a").removeClass("selected");
jQuery(this).addClass("selected");
var post=jQuery(this).closest("li.threaded");
post.append("<img class=\"wait\" src=\"/i/spnr.gif\" />");
check_signed_in_ajax(processReportStart,{"ele":this});
return false;
});
jQuery("#editor_box .inline_cancel").click(function(){
jq("#photo_insert_code").hide();
jQuery(".actionmenu a").removeClass("selected");
var _3f5=jQuery("#editor_box");
if(_3f5.hasClass("edit_box")){
jQuery(".message",_3f5.closest(".postright")).show();
}
_3f5.hide();
return false;
});
jq("#editor_box #photo_insert_add").click(function(){
jq(this).hide();
jq("#photo_insert_code").hide();
var pgi=photoGalleryInserter.instance();
pgi.setOnImageSelect(function(id,_3f6,_3f7){
var ta=jq("#editor_box textarea");
var _3f8=ta.val();
if(_3f8.length){
ta.val(_3f8+"\n\n[img]"+photoGalleryInserter.getImagePreviewURL(id,_3f6,_3f7)+"[/img]\n\n");
}else{
ta.val("[img]"+photoGalleryInserter.getImagePreviewURL(id,_3f6,_3f7)+"[/img]\n\n");
}
ta.focus();
});
pgi.setOnClose(function(){
jq("#editor_box #photo_insert_add").show();
});
jq("#editor_box #photo_insert").show();
return false;
});
jQuery("#editor_box .inline_reply").click(function(){
jq("#photo_insert_code").hide();
jQuery("#editor_box form").submit();
jQuery("#editor_box").append("<img class=\"wait\" src=\"/i/spnr.gif\" />");
return false;
});
jQuery("#report_box input[value=Cancel]").click(function(){
jQuery(".actionmenu a").removeClass("selected");
var _3f9=jQuery("#report_box");
_3f9.hide();
});
jQuery("#report_box input[value=Submit]").click(function(){
if(jQuery("#reportTypeId").val()=="0"){
alert("Please select a reason");
return false;
}
jQuery("#report_box").append("<img class=\"wait\" src=\"/i/spnr.gif\" />");
});
jQuery("div.reply_collapser a").live("click",function(){
var _3fa=jQuery(this).closest("div.replies_box_wrapper");
var _3fb=jQuery(this).closest("div.reply_collapser");
if(_3fb.hasClass("show")){
_3fb.addClass("hide").removeClass("show");
jQuery("a",_3fb).html("");
jQuery("> .replies_box",_3fa).slideDown();
}else{
jQuery("> .replies_box",_3fa).slideUp(500,function(){
_3fb.addClass("show").removeClass("hide");
jQuery("a",_3fb).html(""+jQuery("li.threaded",_3fa).length+" replies");
});
}
return false;
});
jQuery("a.toggle").live("click",function(){
if(jQuery(this).hasClass("expanded")){
jQuery(this).removeClass("expanded");
jQuery(this).html("more &rarr;");
}else{
jQuery(this).addClass("expanded");
jQuery(this).html("less &larr;");
}
jQuery("a.more",jQuery(this).closest(".actionmenu")).toggle();
return false;
});
jQuery("#reportTypeId").change(function(){
if(jQuery(this).val()=="5"){
jQuery("#new_category_wrapper").show();
}else{
jQuery("#new_category_wrapper").hide();
}
});
jQuery("li.threaded .in_reply_to a").live("click",function(){
var _3fc=jQuery(this);
var _3fd=jQuery("#threaded_reply_to_box");
if(_3fc.html()=="hide"){
_3fc.html("this");
_3fd.hide();
return false;
}
var _3fe=_3fc.attr("class").substr(7);
var _3ff=jQuery("#post"+_3fe+" .username").html();
var html="<p class=\"by\">By "+_3ff+"</p>"+jQuery("#message"+_3fe).html();
var _400=_3fc.closest("li.threaded");
if(_3fd.length>0){
_400.append(_3fd);
}else{
jQuery(_400).append("<div id=\"threaded_reply_to_box\"></div>");
_3fd=jQuery("#threaded_reply_to_box");
}
_3fd.html(html);
var pos=_3fc.position();
var _401=_3fc.width();
_3fd.css({"left":(pos.left+_401)+"px","top":pos.top+"px"});
_3fd.show();
_3fc.html("hide");
return false;
});
jQuery.each(jQuery("div.reply_collapser.show"),function(){
replies_wrapper=jQuery(this).closest("div.replies_box_wrapper");
jQuery("a",this).html(""+jQuery("li.threaded",replies_wrapper).length+" replies");
});
};
function show_post_reply_box(_402){
_402.append(jQuery("#editor_box"));
if(lastEditedMessageEle){
lastEditedMessageEle.show();
}
var _403=jQuery("#editor_box");
_403.removeClass("edit_box").addClass("reply_box");
jQuery(".inline_reply",_403).text("submit");
jQuery("form",_403).attr("action","/xml/forum/reply_inline.php");
jQuery("form",_403).ajaxForm({type:"POST",dataType:"json",success:processReplyResponse,error:processReplyError});
var _404=document.getElementById("admincenter");
if(jQuery("input[name=highlightReply]").length==0){
var _405=_404?"<p><input type=\"checkbox\" name=\"highlightReply\"/> Highlight this reply</p>":"";
_405+="<br/>";
jQuery("textarea",_403).after(_405);
}
if(jQuery("#follow_topic").length==0){
var _406="checked";
var _407=window.location.pathname;
var arr=_407.split("/");
jQuery.ajax({type:"POST",url:"/xml/get_is_following_topic.php",data:{topicId:arr[3]},success:function(data){
jQuery("#follow_topic").html(data);
}});
var _405="<p id=\"follow_topic\"></p>";
jQuery("textarea",_403).after(_405);
}
jQuery("#posterror ul",_403).html("");
jQuery("#posterror",_403).hide();
jQuery("textarea",_403).val("");
jQuery("#postId",_403).val(_402.attr("id").substring(4));
_403.append(jQuery("#formatting_tips"));
_403.show();
var x=_403.offset().top-300;
jQuery("html,body").animate({scrollTop:x},500);
};
function show_report_box(_408){
if(lastEditedMessageEle){
lastEditedMessageEle.show();
}
var _409=jQuery("#report_box");
jQuery("#reportPostId",_409).val(_408.attr("id").substring(4));
jQuery("form",_409).ajaxForm({type:"POST",dataType:"json",complete:processReportResponse});
jQuery(">.post_highlight > .actionmenu",_408).append(_409);
jQuery(">.post_wrap > .actionmenu",_408).append(_409);
_409.show();
var x=_409.offset().top-300;
jQuery("html,body").animate({scrollTop:x},500);
};
function processReplyStart(_40a,_40b){
jQuery("li.threaded img.wait").remove();
var post=jQuery(_40b["ele"]).closest("li.threaded");
if(!_40a){
suFH.nextUri="?reply="+post.attr("id");
siFH.nextUri=suFH.nextUri;
fetchRecaptcha("replyCaptcha");
toggleOverlay("replySignUp");
}else{
show_post_reply_box(post);
}
};
function processReplyError(data,_40c,_40d){
alert("There may have been an error posting your reply ("+_40c+").  We recommend copying the content of your reply somewhere for safekeeping, and then refreshing this page to see if your message has been posted. If this problem persists, please contact us at team@hubpages.com.");
};
function processEditedResponseError(data,_40e,_40f){
alert("There may have been an error updating your post ("+_40e+").  We recommend copying the content of your edited reply somewhere for safekeeping, and then refreshing this page to see if your edit has been posted.  If this problem persists, please contact us at team@hubpages.com.");
};
function processReplyResponse(data){
jQuery("li.threaded img.wait").remove();
if(data.errors.length==0){
jQuery(".actionmenu a").removeClass("selected");
jQuery("#editor_box").hide();
var ol=jQuery("#replies_box_"+data.postId+" > ol");
if(ol.length==0){
jQuery("#replies_box_"+data.postId).append("<ol></ol>");
}
jQuery("#replies_box_"+data.postId+" > ol").append(data.replyHtml);
replies_wrapper=jQuery("#replies_box_"+data.postId).closest(".replies_box_wrapper");
replies_wrapper.show();
reply_collapser=jQuery("> .reply_collapser",replies_wrapper);
reply_collapser.addClass("hide").removeClass("show");
jQuery("a",reply_collapser).html("");
jQuery("> .replies_box",replies_wrapper).slideDown();
}else{
jQuery("#editor_box #posterror").show();
errors_html="<li>"+data.errors.join("</li><li>")+"</li>";
jQuery("#editor_box #posterror ul").html(errors_html);
}
};
function processStartEditResponse(_410,_411){
jQuery("li.threaded img.wait").remove();
if(_411=="error"){
alert(_410.responseText);
return;
}
data=eval("("+_410.responseText+")");
if(lastEditedMessageEle){
lastEditedMessageEle.show();
}
lastEditedMessageEle=jQuery("#message"+data.postId).hide();
var _412=jQuery("#editor_box");
_412.removeClass("reply_box").addClass("edit_box");
jQuery(".inline_reply",_412).text("Save");
jQuery("form",_412).attr("action","/xml/forum/edit_inline.php");
jQuery("form",_412).ajaxForm({type:"POST",dataType:"json",success:processEditedResponse,error:processEditedResponseError});
if(jQuery("input[name=highlightReply]").length==0){
var _413=document.getElementById("admincenter");
replyOptionsHTML=_413?"<p><input type=\"checkbox\" name=\"highlightReply\"/> Highlight this reply</p>":"";
replyOptionsHTML+="<br/>";
jQuery("textarea",_412).after(replyOptionsHTML);
}
jQuery("input[name=follow]").attr("checked",data.follow==1);
jQuery("#posterror ul",_412).html("");
jQuery("#posterror",_412).hide();
jQuery("#postId",_412).val(data.postId);
jQuery("textarea",_412).val(data.message);
jQuery("#post"+data.postId+" > .post_wrap > .postright").append(jQuery("#editor_box"));
jQuery("#post"+data.postId+" > .post_highlight > .postright").append(jQuery("#editor_box"));
_412.append(jQuery("#formatting_tips"));
_412.show();
var x=_412.offset().top-300;
jQuery("html,body").animate({scrollTop:x},500);
};
function processEditedResponse(data){
jQuery("li.threaded img.wait").remove();
if(data.errors.length==0){
jQuery(".actionmenu a").removeClass("selected");
jQuery("#editor_box").hide();
jQuery("#message"+data.postId).html(data.editedHtml);
jQuery("#message"+data.postId).show();
document.getElementById("postwrap"+data.postId).className=data.highlight?"post_highlight":"post_wrap";
}else{
jQuery("#editor_box #posterror").show();
errors_html="<li>"+data.errors.join("</li><li>")+"</li>";
jQuery("#editor_box #posterror ul").html(errors_html);
}
};
function processDeleteResponse(_414,_415,_416){
if(_415=="error"){
jQuery("li.threaded img.wait").remove();
alert(_414);
}
};
function processUndeleteResponse(_417,_418,_419){
if(_418=="error"){
jQuery("li.threaded img.wait").remove();
alert(_417);
}
};
function processReportStart(_41a,_41b){
jQuery("li.threaded img.wait").remove();
var post=jQuery(_41b["ele"]).closest("li.threaded");
if(!_41a){
suFH.nextUri="?report="+post.attr("id");
siFH.nextUri=suFH.nextUri;
fetchRecaptcha("replyCaptcha");
toggleOverlay("replySignUp");
}else{
show_report_box(post);
}
};
function processReportResponse(_41c,_41d){
jQuery(".actionmenu a").removeClass("selected");
jQuery("li.threaded img.wait").remove();
var _41e=jQuery("#report_box");
_41e.hide();
alert(_41c.responseText);
};
(function($){
$.extend($.fn,{validate:function(_41f){
if(!this.length){
_41f&&_41f.debug&&window.console&&console.warn("nothing selected, can't validate, returning nothing");
return;
}
var _420=$.data(this[0],"validator");
if(_420){
return _420;
}
_420=new $.validator(_41f,this[0]);
$.data(this[0],"validator",_420);
if(_420.settings.onsubmit){
this.find("input, button").filter(".cancel").click(function(){
_420.cancelSubmit=true;
});
if(_420.settings.submitHandler){
this.find("input, button").filter(":submit").click(function(){
_420.submitButton=this;
});
}
this.submit(function(_421){
if(_420.settings.debug){
_421.preventDefault();
}
function _422(){
if(_420.settings.submitHandler){
if(_420.submitButton){
var _423=$("<input type='hidden'/>").attr("name",_420.submitButton.name).val(_420.submitButton.value).appendTo(_420.currentForm);
}
_420.settings.submitHandler.call(_420,_420.currentForm);
if(_420.submitButton){
_423.remove();
}
return false;
}
return true;
};
if(_420.cancelSubmit){
_420.cancelSubmit=false;
return _422();
}
if(_420.form()){
if(_420.pendingRequest){
_420.formSubmitted=true;
return false;
}
return _422();
}else{
_420.focusInvalid();
return false;
}
});
}
return _420;
},valid:function(){
if($(this[0]).is("form")){
return this.validate().form();
}else{
var _424=true;
var _425=$(this[0].form).validate();
this.each(function(){
_424&=_425.element(this);
});
return _424;
}
},removeAttrs:function(_426){
var _427={},_428=this;
$.each(_426.split(/\s/),function(_429,_42a){
_427[_42a]=_428.attr(_42a);
_428.removeAttr(_42a);
});
return _427;
},rules:function(_42b,_42c){
var _42d=this[0];
if(_42b){
var _42e=$.data(_42d.form,"validator").settings;
var _42f=_42e.rules;
var _430=$.validator.staticRules(_42d);
switch(_42b){
case "add":
$.extend(_430,$.validator.normalizeRule(_42c));
_42f[_42d.name]=_430;
if(_42c.messages){
_42e.messages[_42d.name]=$.extend(_42e.messages[_42d.name],_42c.messages);
}
break;
case "remove":
if(!_42c){
delete _42f[_42d.name];
return _430;
}
var _431={};
$.each(_42c.split(/\s/),function(_432,_433){
_431[_433]=_430[_433];
delete _430[_433];
});
return _431;
}
}
var data=$.validator.normalizeRules($.extend({},$.validator.metadataRules(_42d),$.validator.classRules(_42d),$.validator.attributeRules(_42d),$.validator.staticRules(_42d)),_42d);
if(data.required){
var _434=data.required;
delete data.required;
data=$.extend({required:_434},data);
}
return data;
}});
$.extend($.expr[":"],{blank:function(a){
return !$.trim(""+a.value);
},filled:function(a){
return !!$.trim(""+a.value);
},unchecked:function(a){
return !a.checked;
}});
$.validator=function(_435,form){
this.settings=$.extend(true,{},$.validator.defaults,_435);
this.currentForm=form;
this.init();
};
$.validator.format=function(_436,_437){
if(arguments.length==1){
return function(){
var args=$.makeArray(arguments);
args.unshift(_436);
return $.validator.format.apply(this,args);
};
}
if(arguments.length>2&&_437.constructor!=Array){
_437=$.makeArray(arguments).slice(1);
}
if(_437.constructor!=Array){
_437=[_437];
}
$.each(_437,function(i,n){
_436=_436.replace(new RegExp("\\{"+i+"\\}","g"),n);
});
return _436;
};
$.extend($.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:true,errorContainer:$([]),errorLabelContainer:$([]),onsubmit:true,ignore:[],ignoreTitle:false,onfocusin:function(_438){
this.lastActive=_438;
if(this.settings.focusCleanup&&!this.blockFocusCleanup){
this.settings.unhighlight&&this.settings.unhighlight.call(this,_438,this.settings.errorClass,this.settings.validClass);
this.addWrapper(this.errorsFor(_438)).hide();
}
},onfocusout:function(_439){
if(!this.checkable(_439)&&(_439.name in this.submitted||!this.optional(_439))){
this.element(_439);
}
},onkeyup:function(_43a){
if(_43a.name in this.submitted||_43a==this.lastElement){
this.element(_43a);
}
},onclick:function(_43b){
if(_43b.name in this.submitted){
this.element(_43b);
}else{
if(_43b.parentNode.name in this.submitted){
this.element(_43b.parentNode);
}
}
},highlight:function(_43c,_43d,_43e){
$(_43c).addClass(_43d).removeClass(_43e);
},unhighlight:function(_43f,_440,_441){
$(_43f).removeClass(_440).addClass(_441);
}},setDefaults:function(_442){
$.extend($.validator.defaults,_442);
},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",accept:"Please enter a value with a valid extension.",maxlength:$.validator.format("Please enter no more than {0} characters."),minlength:$.validator.format("Please enter at least {0} characters."),rangelength:$.validator.format("Please enter a value between {0} and {1} characters long."),range:$.validator.format("Please enter a value between {0} and {1}."),max:$.validator.format("Please enter a value less than or equal to {0}."),min:$.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:false,prototype:{init:function(){
this.labelContainer=$(this.settings.errorLabelContainer);
this.errorContext=this.labelContainer.length&&this.labelContainer||$(this.currentForm);
this.containers=$(this.settings.errorContainer).add(this.settings.errorLabelContainer);
this.submitted={};
this.valueCache={};
this.pendingRequest=0;
this.pending={};
this.invalid={};
this.reset();
var _443=(this.groups={});
$.each(this.settings.groups,function(key,_444){
$.each(_444.split(/\s/),function(_445,name){
_443[name]=key;
});
});
var _446=this.settings.rules;
$.each(_446,function(key,_447){
_446[key]=$.validator.normalizeRule(_447);
});
function _448(_449){
var _44a=$.data(this[0].form,"validator"),_44b="on"+_449.type.replace(/^validate/,"");
_44a.settings[_44b]&&_44a.settings[_44b].call(_44a,this[0]);
};
$(this.currentForm).validateDelegate(":text, :password, :file, select, textarea","focusin focusout keyup",_448).validateDelegate(":radio, :checkbox, select, option","click",_448);
if(this.settings.invalidHandler){
$(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler);
}
},form:function(){
this.checkForm();
$.extend(this.submitted,this.errorMap);
this.invalid=$.extend({},this.errorMap);
if(!this.valid()){
$(this.currentForm).triggerHandler("invalid-form",[this]);
}
this.showErrors();
return this.valid();
},checkForm:function(){
this.prepareForm();
for(var i=0,_44c=(this.currentElements=this.elements());_44c[i];i++){
this.check(_44c[i]);
}
return this.valid();
},element:function(_44d){
_44d=this.clean(_44d);
this.lastElement=_44d;
this.prepareElement(_44d);
this.currentElements=$(_44d);
var _44e=this.check(_44d);
if(_44e){
delete this.invalid[_44d.name];
}else{
this.invalid[_44d.name]=true;
}
if(!this.numberOfInvalids()){
this.toHide=this.toHide.add(this.containers);
}
this.showErrors();
return _44e;
},showErrors:function(_44f){
if(_44f){
$.extend(this.errorMap,_44f);
this.errorList=[];
for(var name in _44f){
this.errorList.push({message:_44f[name],element:this.findByName(name)[0]});
}
this.successList=$.grep(this.successList,function(_450){
return !(_450.name in _44f);
});
}
this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors();
},resetForm:function(){
if($.fn.resetForm){
$(this.currentForm).resetForm();
}
this.submitted={};
this.prepareForm();
this.hideErrors();
this.elements().removeClass(this.settings.errorClass);
},numberOfInvalids:function(){
return this.objectLength(this.invalid);
},objectLength:function(obj){
var _451=0;
for(var i in obj){
_451++;
}
return _451;
},hideErrors:function(){
this.addWrapper(this.toHide).hide();
},valid:function(){
return this.size()==0;
},size:function(){
return this.errorList.length;
},focusInvalid:function(){
if(this.settings.focusInvalid){
try{
$(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin");
}
catch(e){
}
}
},findLastActive:function(){
var _452=this.lastActive;
return _452&&$.grep(this.errorList,function(n){
return n.element.name==_452.name;
}).length==1&&_452;
},elements:function(){
var _453=this,_454={};
return $([]).add(this.currentForm.elements).filter(":input").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){
!this.name&&_453.settings.debug&&window.console&&console.error("%o has no name assigned",this);
if(this.name in _454||!_453.objectLength($(this).rules())){
return false;
}
_454[this.name]=true;
return true;
});
},clean:function(_455){
return $(_455)[0];
},errors:function(){
return $(this.settings.errorElement+"."+this.settings.errorClass,this.errorContext);
},reset:function(){
this.successList=[];
this.errorList=[];
this.errorMap={};
this.toShow=$([]);
this.toHide=$([]);
this.currentElements=$([]);
},prepareForm:function(){
this.reset();
this.toHide=this.errors().add(this.containers);
},prepareElement:function(_456){
this.reset();
this.toHide=this.errorsFor(_456);
},check:function(_457){
_457=this.clean(_457);
if(this.checkable(_457)){
_457=this.findByName(_457.name).not(this.settings.ignore)[0];
}
var _458=$(_457).rules();
var _459=false;
for(var _45a in _458){
var rule={method:_45a,parameters:_458[_45a]};
try{
var _45b=$.validator.methods[_45a].call(this,_457.value.replace(/\r/g,""),_457,rule.parameters);
if(_45b=="dependency-mismatch"){
_459=true;
continue;
}
_459=false;
if(_45b=="pending"){
this.toHide=this.toHide.not(this.errorsFor(_457));
return;
}
if(!_45b){
this.formatAndAdd(_457,rule);
return false;
}
}
catch(e){
this.settings.debug&&window.console&&console.log("exception occured when checking element "+_457.id+", check the '"+rule.method+"' method",e);
throw e;
}
}
if(_459){
return;
}
if(this.objectLength(_458)){
this.successList.push(_457);
}
return true;
},customMetaMessage:function(_45c,_45d){
if(!$.metadata){
return;
}
var meta=this.settings.meta?$(_45c).metadata()[this.settings.meta]:$(_45c).metadata();
return meta&&meta.messages&&meta.messages[_45d];
},customMessage:function(name,_45e){
var m=this.settings.messages[name];
return m&&(m.constructor==String?m:m[_45e]);
},findDefined:function(){
for(var i=0;i<arguments.length;i++){
if(arguments[i]!==undefined){
return arguments[i];
}
}
return undefined;
},defaultMessage:function(_45f,_460){
return this.findDefined(this.customMessage(_45f.name,_460),this.customMetaMessage(_45f,_460),!this.settings.ignoreTitle&&_45f.title||undefined,$.validator.messages[_460],"<strong>Warning: No message defined for "+_45f.name+"</strong>");
},formatAndAdd:function(_461,rule){
var _462=this.defaultMessage(_461,rule.method),_463=/\$?\{(\d+)\}/g;
if(typeof _462=="function"){
_462=_462.call(this,rule.parameters,_461);
}else{
if(_463.test(_462)){
_462=jQuery.format(_462.replace(_463,"{$1}"),rule.parameters);
}
}
this.errorList.push({message:_462,element:_461});
this.errorMap[_461.name]=_462;
this.submitted[_461.name]=_462;
},addWrapper:function(_464){
if(this.settings.wrapper){
_464=_464.add(_464.parent(this.settings.wrapper));
}
return _464;
},defaultShowErrors:function(){
for(var i=0;this.errorList[i];i++){
var _465=this.errorList[i];
this.settings.highlight&&this.settings.highlight.call(this,_465.element,this.settings.errorClass,this.settings.validClass);
this.showLabel(_465.element,_465.message);
}
if(this.errorList.length){
this.toShow=this.toShow.add(this.containers);
}
if(this.settings.success){
for(var i=0;this.successList[i];i++){
this.showLabel(this.successList[i]);
}
}
if(this.settings.unhighlight){
for(var i=0,_466=this.validElements();_466[i];i++){
this.settings.unhighlight.call(this,_466[i],this.settings.errorClass,this.settings.validClass);
}
}
this.toHide=this.toHide.not(this.toShow);
this.hideErrors();
this.addWrapper(this.toShow).show();
},validElements:function(){
return this.currentElements.not(this.invalidElements());
},invalidElements:function(){
return $(this.errorList).map(function(){
return this.element;
});
},showLabel:function(_467,_468){
var _469=this.errorsFor(_467);
if(_469.length){
_469.removeClass().addClass(this.settings.errorClass);
_469.attr("generated")&&_469.html(_468);
}else{
_469=$("<"+this.settings.errorElement+"/>").attr({"for":this.idOrName(_467),generated:true}).addClass(this.settings.errorClass).html(_468||"");
if(this.settings.wrapper){
_469=_469.hide().show().wrap("<"+this.settings.wrapper+"/>").parent();
}
if(!this.labelContainer.append(_469).length){
this.settings.errorPlacement?this.settings.errorPlacement(_469,$(_467)):_469.insertAfter(_467);
}
}
if(!_468&&this.settings.success){
_469.text("");
typeof this.settings.success=="string"?_469.addClass(this.settings.success):this.settings.success(_469);
}
this.toShow=this.toShow.add(_469);
},errorsFor:function(_46a){
var name=this.idOrName(_46a);
return this.errors().filter(function(){
return $(this).attr("for")==name;
});
},idOrName:function(_46b){
return this.groups[_46b.name]||(this.checkable(_46b)?_46b.name:_46b.id||_46b.name);
},checkable:function(_46c){
return /radio|checkbox/i.test(_46c.type);
},findByName:function(name){
var form=this.currentForm;
return $(document.getElementsByName(name)).map(function(_46d,_46e){
return _46e.form==form&&_46e.name==name&&_46e||null;
});
},getLength:function(_46f,_470){
switch(_470.nodeName.toLowerCase()){
case "select":
return $("option:selected",_470).length;
case "input":
if(this.checkable(_470)){
return this.findByName(_470.name).filter(":checked").length;
}
}
return _46f.length;
},depend:function(_471,_472){
return this.dependTypes[typeof _471]?this.dependTypes[typeof _471](_471,_472):true;
},dependTypes:{"boolean":function(_473,_474){
return _473;
},"string":function(_475,_476){
return !!$(_475,_476.form).length;
},"function":function(_477,_478){
return _477(_478);
}},optional:function(_479){
return !$.validator.methods.required.call(this,$.trim(_479.value),_479)&&"dependency-mismatch";
},startRequest:function(_47a){
if(!this.pending[_47a.name]){
this.pendingRequest++;
this.pending[_47a.name]=true;
}
},stopRequest:function(_47b,_47c){
this.pendingRequest--;
if(this.pendingRequest<0){
this.pendingRequest=0;
}
delete this.pending[_47b.name];
if(_47c&&this.pendingRequest==0&&this.formSubmitted&&this.form()){
$(this.currentForm).submit();
this.formSubmitted=false;
}else{
if(!_47c&&this.pendingRequest==0&&this.formSubmitted){
$(this.currentForm).triggerHandler("invalid-form",[this]);
this.formSubmitted=false;
}
}
},previousValue:function(_47d){
return $.data(_47d,"previousValue")||$.data(_47d,"previousValue",{old:null,valid:true,message:this.defaultMessage(_47d,"remote")});
}},classRuleSettings:{required:{required:true},email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},dateDE:{dateDE:true},number:{number:true},numberDE:{numberDE:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(_47e,_47f){
_47e.constructor==String?this.classRuleSettings[_47e]=_47f:$.extend(this.classRuleSettings,_47e);
},classRules:function(_480){
var _481={};
var _482=$(_480).attr("class");
_482&&$.each(_482.split(" "),function(){
if(this in $.validator.classRuleSettings){
$.extend(_481,$.validator.classRuleSettings[this]);
}
});
return _481;
},attributeRules:function(_483){
var _484={};
var _485=$(_483);
for(var _486 in $.validator.methods){
var _487=_485.attr(_486);
if(_487){
_484[_486]=_487;
}
}
if(_484.maxlength&&/-1|2147483647|524288/.test(_484.maxlength)){
delete _484.maxlength;
}
return _484;
},metadataRules:function(_488){
if(!$.metadata){
return {};
}
var meta=$.data(_488.form,"validator").settings.meta;
return meta?$(_488).metadata()[meta]:$(_488).metadata();
},staticRules:function(_489){
var _48a={};
var _48b=$.data(_489.form,"validator");
if(_48b.settings.rules){
_48a=$.validator.normalizeRule(_48b.settings.rules[_489.name])||{};
}
return _48a;
},normalizeRules:function(_48c,_48d){
$.each(_48c,function(prop,val){
if(val===false){
delete _48c[prop];
return;
}
if(val.param||val.depends){
var _48e=true;
switch(typeof val.depends){
case "string":
_48e=!!$(val.depends,_48d.form).length;
break;
case "function":
_48e=val.depends.call(_48d,_48d);
break;
}
if(_48e){
_48c[prop]=val.param!==undefined?val.param:true;
}else{
delete _48c[prop];
}
}
});
$.each(_48c,function(rule,_48f){
_48c[rule]=$.isFunction(_48f)?_48f(_48d):_48f;
});
$.each(["minlength","maxlength","min","max"],function(){
if(_48c[this]){
_48c[this]=Number(_48c[this]);
}
});
$.each(["rangelength","range"],function(){
if(_48c[this]){
_48c[this]=[Number(_48c[this][0]),Number(_48c[this][1])];
}
});
if($.validator.autoCreateRanges){
if(_48c.min&&_48c.max){
_48c.range=[_48c.min,_48c.max];
delete _48c.min;
delete _48c.max;
}
if(_48c.minlength&&_48c.maxlength){
_48c.rangelength=[_48c.minlength,_48c.maxlength];
delete _48c.minlength;
delete _48c.maxlength;
}
}
if(_48c.messages){
delete _48c.messages;
}
return _48c;
},normalizeRule:function(data){
if(typeof data=="string"){
var _490={};
$.each(data.split(/\s/),function(){
_490[this]=true;
});
data=_490;
}
return data;
},addMethod:function(name,_491,_492){
$.validator.methods[name]=_491;
$.validator.messages[name]=_492!=undefined?_492:$.validator.messages[name];
if(_491.length<3){
$.validator.addClassRules(name,$.validator.normalizeRule(name));
}
},methods:{required:function(_493,_494,_495){
if(!this.depend(_495,_494)){
return "dependency-mismatch";
}
switch(_494.nodeName.toLowerCase()){
case "select":
var val=$(_494).val();
return val&&val.length>0;
case "input":
if(this.checkable(_494)){
return this.getLength(_493,_494)>0;
}
default:
return $.trim(_493).length>0;
}
},remote:function(_496,_497,_498){
if(this.optional(_497)){
return "dependency-mismatch";
}
var _499=this.previousValue(_497);
if(!this.settings.messages[_497.name]){
this.settings.messages[_497.name]={};
}
_499.originalMessage=this.settings.messages[_497.name].remote;
this.settings.messages[_497.name].remote=_499.message;
_498=typeof _498=="string"&&{url:_498}||_498;
if(this.pending[_497.name]){
return "pending";
}
if(_499.old===_496){
return _499.valid;
}
_499.old=_496;
var _49a=this;
this.startRequest(_497);
var data={};
data[_497.name]=_496;
$.ajax($.extend(true,{url:_498,mode:"abort",port:"validate"+_497.name,dataType:"json",data:data,success:function(_49b){
_49a.settings.messages[_497.name].remote=_499.originalMessage;
var _49c=_49b===true;
if(_49c){
var _49d=_49a.formSubmitted;
_49a.prepareElement(_497);
_49a.formSubmitted=_49d;
_49a.successList.push(_497);
_49a.showErrors();
}else{
var _49e={};
var _49f=_49b||_49a.defaultMessage(_497,"remote");
_49e[_497.name]=_499.message=$.isFunction(_49f)?_49f(_496):_49f;
_49a.showErrors(_49e);
}
_499.valid=_49c;
_49a.stopRequest(_497,_49c);
}},_498));
return "pending";
},minlength:function(_4a0,_4a1,_4a2){
return this.optional(_4a1)||this.getLength($.trim(_4a0),_4a1)>=_4a2;
},maxlength:function(_4a3,_4a4,_4a5){
return this.optional(_4a4)||this.getLength($.trim(_4a3),_4a4)<=_4a5;
},rangelength:function(_4a6,_4a7,_4a8){
var _4a9=this.getLength($.trim(_4a6),_4a7);
return this.optional(_4a7)||(_4a9>=_4a8[0]&&_4a9<=_4a8[1]);
},min:function(_4aa,_4ab,_4ac){
return this.optional(_4ab)||_4aa>=_4ac;
},max:function(_4ad,_4ae,_4af){
return this.optional(_4ae)||_4ad<=_4af;
},range:function(_4b0,_4b1,_4b2){
return this.optional(_4b1)||(_4b0>=_4b2[0]&&_4b0<=_4b2[1]);
},email:function(_4b3,_4b4){
return this.optional(_4b4)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(_4b3);
},url:function(_4b5,_4b6){
return this.optional(_4b6)||/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(_4b5);
},date:function(_4b7,_4b8){
return this.optional(_4b8)||!/Invalid|NaN/.test(new Date(_4b7));
},dateISO:function(_4b9,_4ba){
return this.optional(_4ba)||/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(_4b9);
},number:function(_4bb,_4bc){
return this.optional(_4bc)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(_4bb);
},digits:function(_4bd,_4be){
return this.optional(_4be)||/^\d+$/.test(_4bd);
},creditcard:function(_4bf,_4c0){
if(this.optional(_4c0)){
return "dependency-mismatch";
}
if(/[^0-9-]+/.test(_4bf)){
return false;
}
var _4c1=0,_4c2=0,_4c3=false;
_4bf=_4bf.replace(/\D/g,"");
for(var n=_4bf.length-1;n>=0;n--){
var _4c4=_4bf.charAt(n);
var _4c2=parseInt(_4c4,10);
if(_4c3){
if((_4c2*=2)>9){
_4c2-=9;
}
}
_4c1+=_4c2;
_4c3=!_4c3;
}
return (_4c1%10)==0;
},accept:function(_4c5,_4c6,_4c7){
_4c7=typeof _4c7=="string"?_4c7.replace(/,/g,"|"):"png|jpe?g|gif";
return this.optional(_4c6)||_4c5.match(new RegExp(".("+_4c7+")$","i"));
},equalTo:function(_4c8,_4c9,_4ca){
var _4cb=$(_4ca).unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){
$(_4c9).valid();
});
return $.trim(_4c8)==$.trim(_4cb.val());
}}});
$.format=$.validator.format;
})(jQuery);
(function($){
var _4cc={};
if($.ajaxPrefilter){
$.ajaxPrefilter(function(_4cd,_4ce,xhr){
var port=_4cd.port;
if(_4cd.mode=="abort"){
if(_4cc[port]){
_4cc[port].abort();
}
_4cc[port]=xhr;
}
});
}else{
var ajax=$.ajax;
$.ajax=function(_4cf){
var mode=("mode" in _4cf?_4cf:$.ajaxSettings).mode,port=("port" in _4cf?_4cf:$.ajaxSettings).port;
if(mode=="abort"){
if(_4cc[port]){
_4cc[port].abort();
}
return (_4cc[port]=ajax.apply(this,arguments));
}
return ajax.apply(this,arguments);
};
}
})(jQuery);
(function($){
if(!jQuery.event.special.focusin&&!jQuery.event.special.focusout&&document.addEventListener){
$.each({focus:"focusin",blur:"focusout"},function(_4d0,fix){
$.event.special[fix]={setup:function(){
this.addEventListener(_4d0,_4d1,true);
},teardown:function(){
this.removeEventListener(_4d0,_4d1,true);
},handler:function(e){
arguments[0]=$.event.fix(e);
arguments[0].type=fix;
return $.event.handle.apply(this,arguments);
}};
function _4d1(e){
e=$.event.fix(e);
e.type=fix;
return $.event.handle.call(this,e);
};
});
}
$.extend($.fn,{validateDelegate:function(_4d2,type,_4d3){
return this.bind(type,function(_4d4){
var _4d5=$(_4d4.target);
if(_4d5.is(_4d2)){
return _4d3.apply(_4d5,arguments);
}
});
}});
})(jQuery);
jQuery.validator.addMethod("exactlength",function(_4d6,_4d7,_4d8){
return this.optional(_4d7)||this.getLength(jq.trim(_4d6),_4d7)==_4d8;
},jQuery.format("Please enter exactly {0} characters."));
jQuery.validator.addMethod("forbidden",function(_4d9,_4da,_4db){
if(!this.depend(_4db,_4da)){
return "dependency-mismatch";
}
switch(_4da.nodeName.toLowerCase()){
case "select":
var val=jq(_4da).val();
return !(val&&val.length>0);
case "input":
if(this.checkable(_4da)){
return this.getLength(_4d9,_4da)==0;
}
default:
return jq.trim(_4d9).length==0;
}
},"This field must be empty.");
jQuery.validator.addMethod("ssn",function(ssn,_4dc,_4dd){
if(!this.depend(_4dd,_4dc)){
return "dependency-mismatch";
}
var _4de=false;
if(ssn.search(/^[0-9]{3}\-[0-9]{2}\-[0-9]{4}$/)==-1){
_4de=true;
}else{
var _4df=ssn.split("-");
if(_4df[0]=="000"||_4df[1]=="00"||_4df[2]=="0000"){
_4de=true;
}
if(_4df[0]=="666"){
_4de=true;
}
var _4e0=parseInt(_4df[0],10);
if(_4e0>=900){
if(_4df[1][0]!=7&&_4df[1][0]!=8){
_4de=true;
}
}
}
return !_4de;
},"Your SSN or ITIN appears to be invalid. It should be in the format xxx-xx-xxxx, where each x is a digit. Please contact us at payments@hubpages.com for help.");
jQuery.validator.addMethod("nohtml",function(_4e1,_4e2,_4e3){
if(!this.depend(_4e3,_4e2)){
return "dependency-mismatch";
}
return _4e1.search(/[<|>]/)==-1;
},"Please do not include inequality signs (&lt; or &gt;) or HTML tags.");
jQuery.validator.addMethod("ein",function(ein,_4e4,_4e5){
if(!this.depend(_4e5,_4e4)){
return "dependency-mismatch";
}
return ein.search(/^[0-9]{2}\-[0-9]{7}$/)!=-1;
},"Your EIN appears to be invalid. It should be in the format xx-xxxxxxx, where each x is a digit. Please contact us at payments@hubpages.com for help.");
jQuery.validator.addMethod("mmddyyyy",function(_4e6,_4e7,_4e8){
var _4e6=jq.trim(_4e6);
if(_4e6.search(/^[0-9]{2}\-[0-9]{2}\-[0-9]{4}$/)==-1){
return false;
}
var _4e9=_4e6.split("-");
var m=1*_4e9[0]-1;
var d=1*_4e9[1];
var y=1*_4e9[2];
if(y>2037){
return false;
}
var dte=new Date(y,m,d,1);
return (d==1*dte.getDate()&&m==1*dte.getMonth()&&y==1*dte.getFullYear());
},"Please provide a valid date with the format MM-DD-YYYY.");
jQuery.validator.addMethod("dollars",function(_4ea,_4eb,_4ec){
return jq.trim(_4ea).search(/^-?[0-9]+\.[0-9]{2}$/)!=-1;
},"Please enter a valid dollar and cents amount such as 50.04 or -0.26");
(function($){
$.fn.checkLikeRadio=function(){
var that=this;
this.each(function(){
$(this).click(function(){
if($(this).attr("checked")){
var _4ed=$(this);
$(that).each(function(){
if($(this)[0]!==_4ed[0]){
$(this).attr("checked",false);
}
});
}
});
});
};
})(jQuery);
(function($){
$.fn.ajaxSubmit=function(_4ee){
if(!this.length){
log("ajaxSubmit: skipping submit process - no element selected");
return this;
}
if(typeof _4ee=="function"){
_4ee={success:_4ee};
}
var _4ef=this.attr("action");
var url=(typeof _4ef==="string")?$.trim(_4ef):"";
if(url){
url=(url.match(/^([^#]+)/)||[])[1];
}
url=url||window.location.href||"";
_4ee=$.extend(true,{url:url,type:this[0].getAttribute("method")||"GET",iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},_4ee);
var veto={};
this.trigger("form-pre-serialize",[this,_4ee,veto]);
if(veto.veto){
log("ajaxSubmit: submit vetoed via form-pre-serialize trigger");
return this;
}
if(_4ee.beforeSerialize&&_4ee.beforeSerialize(this,_4ee)===false){
log("ajaxSubmit: submit aborted via beforeSerialize callback");
return this;
}
var n,v,a=this.formToArray(_4ee.semantic);
if(_4ee.data){
_4ee.extraData=_4ee.data;
for(n in _4ee.data){
if(_4ee.data[n] instanceof Array){
for(var k in _4ee.data[n]){
a.push({name:n,value:_4ee.data[n][k]});
}
}else{
v=_4ee.data[n];
v=$.isFunction(v)?v():v;
a.push({name:n,value:v});
}
}
}
if(_4ee.beforeSubmit&&_4ee.beforeSubmit(a,this,_4ee)===false){
log("ajaxSubmit: submit aborted via beforeSubmit callback");
return this;
}
this.trigger("form-submit-validate",[a,this,_4ee,veto]);
if(veto.veto){
log("ajaxSubmit: submit vetoed via form-submit-validate trigger");
return this;
}
var q=$.param(a);
if(_4ee.type.toUpperCase()=="GET"){
_4ee.url+=(_4ee.url.indexOf("?")>=0?"&":"?")+q;
_4ee.data=null;
}else{
_4ee.data=q;
}
var _4f0=this,_4f1=[];
if(_4ee.resetForm){
_4f1.push(function(){
_4f0.resetForm();
});
}
if(_4ee.clearForm){
_4f1.push(function(){
_4f0.clearForm();
});
}
if(!_4ee.dataType&&_4ee.target){
var _4f2=_4ee.success||function(){
};
_4f1.push(function(data){
var fn=_4ee.replaceTarget?"replaceWith":"html";
$(_4ee.target)[fn](data).each(_4f2,arguments);
});
}else{
if(_4ee.success){
_4f1.push(_4ee.success);
}
}
_4ee.success=function(data,_4f3,xhr){
var _4f4=_4ee.context||_4ee;
for(var i=0,max=_4f1.length;i<max;i++){
_4f1[i].apply(_4f4,[data,_4f3,xhr||_4f0,_4f0]);
}
};
var _4f5=$("input:file",this).length>0;
var mp="multipart/form-data";
var _4f6=(_4f0.attr("enctype")==mp||_4f0.attr("encoding")==mp);
if(_4ee.iframe!==false&&(_4f5||_4ee.iframe||_4f6)){
if(_4ee.closeKeepAlive){
$.get(_4ee.closeKeepAlive,_4f7);
}else{
_4f7();
}
}else{
$.ajax(_4ee);
}
this.trigger("form-submit-notify",[this,_4ee]);
return this;
function _4f7(){
var form=_4f0[0];
if($(":input[name=submit],:input[id=submit]",form).length){
alert("Error: Form elements must not have name or id of \"submit\".");
return;
}
var s=$.extend(true,{},$.ajaxSettings,_4ee);
s.context=s.context||s;
var id="jqFormIO"+(new Date().getTime()),fn="_"+id;
var $io=$("<iframe id=\""+id+"\" name=\""+id+"\" src=\""+s.iframeSrc+"\" />");
var io=$io[0];
$io.css({position:"absolute",top:"-1000px",left:"-1000px"});
var xhr={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){
},getResponseHeader:function(){
},setRequestHeader:function(){
},abort:function(){
log("aborting upload...");
var e="aborted";
this.aborted=1;
$io.attr("src",s.iframeSrc);
xhr.error=e;
s.error&&s.error.call(s.context,xhr,"error",e);
g&&$.event.trigger("ajaxError",[xhr,s,e]);
s.complete&&s.complete.call(s.context,xhr,"error");
}};
var g=s.global;
if(g&&!$.active++){
$.event.trigger("ajaxStart");
}
if(g){
$.event.trigger("ajaxSend",[xhr,s]);
}
if(s.beforeSend&&s.beforeSend.call(s.context,xhr,s)===false){
if(s.global){
$.active--;
}
return;
}
if(xhr.aborted){
return;
}
var _4f8=0;
var sub=form.clk;
if(sub){
var n=sub.name;
if(n&&!sub.disabled){
s.extraData=s.extraData||{};
s.extraData[n]=sub.value;
if(sub.type=="image"){
s.extraData[n+".x"]=form.clk_x;
s.extraData[n+".y"]=form.clk_y;
}
}
}
function _4f9(){
var t=_4f0.attr("target"),a=_4f0.attr("action");
form.setAttribute("target",id);
if(form.getAttribute("method")!="POST"){
form.setAttribute("method","POST");
}
if(form.getAttribute("action")!=s.url){
form.setAttribute("action",s.url);
}
if(!s.skipEncodingOverride){
_4f0.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"});
}
if(s.timeout){
setTimeout(function(){
_4f8=true;
cb();
},s.timeout);
}
var _4fa=[];
try{
if(s.extraData){
for(var n in s.extraData){
_4fa.push($("<input type=\"hidden\" name=\""+n+"\" value=\""+s.extraData[n]+"\" />").appendTo(form)[0]);
}
}
$io.appendTo("body");
io.attachEvent?io.attachEvent("onload",cb):io.addEventListener("load",cb,false);
form.submit();
}
finally{
form.setAttribute("action",a);
if(t){
form.setAttribute("target",t);
}else{
_4f0.removeAttr("target");
}
$(_4fa).remove();
}
};
if(s.forceSync){
_4f9();
}else{
setTimeout(_4f9,10);
}
var data,doc,_4fb=50;
function cb(){
if(xhr.aborted){
return;
}
var doc=io.contentWindow?io.contentWindow.document:io.contentDocument?io.contentDocument:io.document;
if(!doc||doc.location.href==s.iframeSrc){
return;
}
io.detachEvent?io.detachEvent("onload",cb):io.removeEventListener("load",cb,false);
var ok=true;
try{
if(_4f8){
throw "timeout";
}
var _4fc=s.dataType=="xml"||doc.XMLDocument||$.isXMLDoc(doc);
log("isXml="+_4fc);
if(!_4fc&&window.opera&&(doc.body==null||doc.body.innerHTML=="")){
if(--_4fb){
log("requeing onLoad callback, DOM not available");
setTimeout(cb,250);
return;
}
}
xhr.responseText=doc.body?doc.body.innerHTML:doc.documentElement?doc.documentElement.innerHTML:null;
xhr.responseXML=doc.XMLDocument?doc.XMLDocument:doc;
xhr.getResponseHeader=function(_4fd){
var _4fe={"content-type":s.dataType};
return _4fe[_4fd];
};
var scr=/(json|script)/.test(s.dataType);
if(scr||s.textarea){
var ta=doc.getElementsByTagName("textarea")[0];
if(ta){
xhr.responseText=ta.value;
}else{
if(scr){
var pre=doc.getElementsByTagName("pre")[0];
var b=doc.getElementsByTagName("body")[0];
if(pre){
xhr.responseText=pre.textContent;
}else{
if(b){
xhr.responseText=b.innerHTML;
}
}
}
}
}else{
if(s.dataType=="xml"&&!xhr.responseXML&&xhr.responseText!=null){
xhr.responseXML=_4ff(xhr.responseText);
}
}
data=_501(xhr,s.dataType,s);
}
catch(e){
log("error caught:",e);
ok=false;
xhr.error=e;
s.error&&s.error.call(s.context,xhr,"error",e);
g&&$.event.trigger("ajaxError",[xhr,s,e]);
}
if(xhr.aborted){
log("upload aborted");
ok=false;
}
if(ok){
s.success&&s.success.call(s.context,data,"success",xhr);
g&&$.event.trigger("ajaxSuccess",[xhr,s]);
}
g&&$.event.trigger("ajaxComplete",[xhr,s]);
if(g&&!--$.active){
$.event.trigger("ajaxStop");
}
s.complete&&s.complete.call(s.context,xhr,ok?"success":"error");
setTimeout(function(){
$io.removeData("form-plugin-onload");
$io.remove();
xhr.responseXML=null;
},100);
};
var _4ff=$.parseXML||function(s,doc){
if(window.ActiveXObject){
doc=new ActiveXObject("Microsoft.XMLDOM");
doc.async="false";
doc.loadXML(s);
}else{
doc=(new DOMParser()).parseFromString(s,"text/xml");
}
return (doc&&doc.documentElement&&doc.documentElement.nodeName!="parsererror")?doc:null;
};
var _500=$.parseJSON||function(s){
return window["eval"]("("+s+")");
};
var _501=function(xhr,type,s){
var ct=xhr.getResponseHeader("content-type")||"",xml=type==="xml"||!type&&ct.indexOf("xml")>=0,data=xml?xhr.responseXML:xhr.responseText;
if(xml&&data.documentElement.nodeName==="parsererror"){
$.error&&$.error("parsererror");
}
if(s&&s.dataFilter){
data=s.dataFilter(data,type);
}
if(typeof data==="string"){
if(type==="json"||!type&&ct.indexOf("json")>=0){
data=_500(data);
}else{
if(type==="script"||!type&&ct.indexOf("javascript")>=0){
$.globalEval(data);
}
}
}
return data;
};
};
};
$.fn.ajaxForm=function(_502){
if(this.length===0){
var o={s:this.selector,c:this.context};
if(!$.isReady&&o.s){
log("DOM not ready, queuing ajaxForm");
$(function(){
$(o.s,o.c).ajaxForm(_502);
});
return this;
}
log("terminating; zero elements found by selector"+($.isReady?"":" (DOM not ready)"));
return this;
}
return this.ajaxFormUnbind().bind("submit.form-plugin",function(e){
if(!e.isDefaultPrevented()){
e.preventDefault();
$(this).ajaxSubmit(_502);
}
}).bind("click.form-plugin",function(e){
var _503=e.target;
var $el=$(_503);
if(!($el.is(":submit,input:image"))){
var t=$el.closest(":submit");
if(t.length==0){
return;
}
_503=t[0];
}
var form=this;
form.clk=_503;
if(_503.type=="image"){
if(e.offsetX!=undefined){
form.clk_x=e.offsetX;
form.clk_y=e.offsetY;
}else{
if(typeof $.fn.offset=="function"){
var _504=$el.offset();
form.clk_x=e.pageX-_504.left;
form.clk_y=e.pageY-_504.top;
}else{
form.clk_x=e.pageX-_503.offsetLeft;
form.clk_y=e.pageY-_503.offsetTop;
}
}
}
setTimeout(function(){
form.clk=form.clk_x=form.clk_y=null;
},100);
});
};
$.fn.ajaxFormUnbind=function(){
return this.unbind("submit.form-plugin click.form-plugin");
};
$.fn.formToArray=function(_505){
var a=[];
if(this.length===0){
return a;
}
var form=this[0];
var els=_505?form.getElementsByTagName("*"):form.elements;
if(!els){
return a;
}
var i,j,n,v,el,max,jmax;
for(i=0,max=els.length;i<max;i++){
el=els[i];
n=el.name;
if(!n){
continue;
}
if(_505&&form.clk&&el.type=="image"){
if(!el.disabled&&form.clk==el){
a.push({name:n,value:$(el).val()});
a.push({name:n+".x",value:form.clk_x},{name:n+".y",value:form.clk_y});
}
continue;
}
v=$.fieldValue(el,true);
if(v&&v.constructor==Array){
for(j=0,jmax=v.length;j<jmax;j++){
a.push({name:n,value:v[j]});
}
}else{
if(v!==null&&typeof v!="undefined"){
a.push({name:n,value:v});
}
}
}
if(!_505&&form.clk){
var _506=$(form.clk),_507=_506[0];
n=_507.name;
if(n&&!_507.disabled&&_507.type=="image"){
a.push({name:n,value:_506.val()});
a.push({name:n+".x",value:form.clk_x},{name:n+".y",value:form.clk_y});
}
}
return a;
};
$.fn.formSerialize=function(_508){
return $.param(this.formToArray(_508));
};
$.fn.fieldSerialize=function(_509){
var a=[];
this.each(function(){
var n=this.name;
if(!n){
return;
}
var v=$.fieldValue(this,_509);
if(v&&v.constructor==Array){
for(var i=0,max=v.length;i<max;i++){
a.push({name:n,value:v[i]});
}
}else{
if(v!==null&&typeof v!="undefined"){
a.push({name:this.name,value:v});
}
}
});
return $.param(a);
};
$.fn.fieldValue=function(_50a){
for(var val=[],i=0,max=this.length;i<max;i++){
var el=this[i];
var v=$.fieldValue(el,_50a);
if(v===null||typeof v=="undefined"||(v.constructor==Array&&!v.length)){
continue;
}
v.constructor==Array?$.merge(val,v):val.push(v);
}
return val;
};
$.fieldValue=function(el,_50b){
var n=el.name,t=el.type,tag=el.tagName.toLowerCase();
if(_50b===undefined){
_50b=true;
}
if(_50b&&(!n||el.disabled||t=="reset"||t=="button"||(t=="checkbox"||t=="radio")&&!el.checked||(t=="submit"||t=="image")&&el.form&&el.form.clk!=el||tag=="select"&&el.selectedIndex==-1)){
return null;
}
if(tag=="select"){
var _50c=el.selectedIndex;
if(_50c<0){
return null;
}
var a=[],ops=el.options;
var one=(t=="select-one");
var max=(one?_50c+1:ops.length);
for(var i=(one?_50c:0);i<max;i++){
var op=ops[i];
if(op.selected){
var v=op.value;
if(!v){
v=(op.attributes&&op.attributes["value"]&&!(op.attributes["value"].specified))?op.text:op.value;
}
if(one){
return v;
}
a.push(v);
}
}
return a;
}
return $(el).val();
};
$.fn.clearForm=function(){
return this.each(function(){
$("input,select,textarea",this).clearFields();
});
};
$.fn.clearFields=$.fn.clearInputs=function(){
return this.each(function(){
var t=this.type,tag=this.tagName.toLowerCase();
if(t=="text"||t=="password"||tag=="textarea"){
this.value="";
}else{
if(t=="checkbox"||t=="radio"){
this.checked=false;
}else{
if(tag=="select"){
this.selectedIndex=-1;
}
}
}
});
};
$.fn.resetForm=function(){
return this.each(function(){
if(typeof this.reset=="function"||(typeof this.reset=="object"&&!this.reset.nodeType)){
this.reset();
}
});
};
$.fn.enable=function(b){
if(b===undefined){
b=true;
}
return this.each(function(){
this.disabled=!b;
});
};
$.fn.selected=function(_50d){
if(_50d===undefined){
_50d=true;
}
return this.each(function(){
var t=this.type;
if(t=="checkbox"||t=="radio"){
this.checked=_50d;
}else{
if(this.tagName.toLowerCase()=="option"){
var $sel=$(this).parent("select");
if(_50d&&$sel[0]&&$sel[0].type=="select-one"){
$sel.find("option").selected(false);
}
this.selected=_50d;
}
}
});
};
function log(){
if($.fn.ajaxSubmit.debug){
var msg="[jquery.form] "+Array.prototype.join.call(arguments,"");
if(window.console&&window.console.log){
window.console.log(msg);
}else{
if(window.opera&&window.opera.postError){
window.opera.postError(msg);
}
}
}
};
})(jQuery);
(function($){
$.ui=$.ui||{};
$.fn.extend({accordion:function(_50e,data){
var args=Array.prototype.slice.call(arguments,1);
return this.each(function(){
if(typeof _50e=="string"){
var _50f=$.data(this,"ui-accordion");
_50f[_50e].apply(_50f,args);
}else{
if(!$(this).is(".ui-accordion")){
$.data(this,"ui-accordion",new $.ui.accordion(this,_50e));
}
}
});
},activate:function(_510){
return this.accordion("activate",_510);
}});
$.ui.accordion=function(_511,_512){
this.options=_512=$.extend({},$.ui.accordion.defaults,_512);
this.element=_511;
$(_511).addClass("ui-accordion");
if(_512.navigation){
var _513=$(_511).find("a").filter(_512.navigationFilter);
if(_513.length){
if(_513.filter(_512.header).length){
_512.active=_513;
}else{
_512.active=_513.parent().parent().prev();
_513.addClass("current");
}
}
}
_512.headers=$(_511).find(_512.header);
_512.active=_514(_512.headers,_512.active);
if(_512.fillSpace){
var _515=$(_511).parent().height();
_512.headers.each(function(){
_515-=$(this).outerHeight();
});
var _516=0;
_512.headers.next().each(function(){
_516=Math.max(_516,$(this).innerHeight()-$(this).height());
}).height(_515-_516);
}else{
if(_512.autoheight){
var _515=0;
_512.headers.next().each(function(){
_515=Math.max(_515,$(this).outerHeight());
}).height(_515);
}
}
_512.headers.not(_512.active||"").next().hide();
_512.active.parent().andSelf().addClass(_512.selectedClass);
if(_512.event){
$(_511).bind((_512.event)+".ui-accordion",_517);
}
};
$.ui.accordion.prototype={activate:function(_518){
_517.call(this.element,{target:_514(this.options.headers,_518)[0]});
},enable:function(){
this.options.disabled=false;
},disable:function(){
this.options.disabled=true;
},destroy:function(){
this.options.headers.next().css("display","");
if(this.options.fillSpace||this.options.autoheight){
this.options.headers.next().css("height","");
}
$.removeData(this.element,"ui-accordion");
$(this.element).removeClass("ui-accordion").unbind(".ui-accordion");
}};
function _519(_51a,_51b){
return function(){
return _51a.apply(_51b,arguments);
};
};
function _51c(_51d){
if(!$.data(this,"ui-accordion")){
return;
}
var _51e=$.data(this,"ui-accordion");
var _51f=_51e.options;
_51f.running=_51d?0:--_51f.running;
if(_51f.running){
return;
}
if(_51f.clearStyle){
_51f.toShow.add(_51f.toHide).css({height:"",overflow:""});
}
$(this).triggerHandler("change.ui-accordion",[_51f.data],_51f.change);
};
function _520(_521,_522,data,_523,down){
var _524=$.data(this,"ui-accordion").options;
_524.toShow=_521;
_524.toHide=_522;
_524.data=data;
var _525=_519(_51c,this);
_524.running=_522.size()==0?_521.size():_522.size();
if(_524.animated){
if(!_524.alwaysOpen&&_523){
$.ui.accordion.animations[_524.animated]({toShow:jQuery([]),toHide:_522,complete:_525,down:down,autoheight:_524.autoheight});
}else{
$.ui.accordion.animations[_524.animated]({toShow:_521,toHide:_522,complete:_525,down:down,autoheight:_524.autoheight});
}
}else{
if(!_524.alwaysOpen&&_523){
_521.toggle();
}else{
_522.hide();
_521.show();
}
_525(true);
}
};
function _517(_526){
var _527=$.data(this,"ui-accordion").options;
if(_527.disabled){
return false;
}
if(!_526.target&&!_527.alwaysOpen){
_527.active.parent().andSelf().toggleClass(_527.selectedClass);
var _528=_527.active.next(),data={instance:this,options:_527,newHeader:jQuery([]),oldHeader:_527.active,newContent:jQuery([]),oldContent:_528},_529=_527.active=$([]);
_520.call(this,_529,_528,data);
return false;
}
var _52a=$(_526.target);
if(_52a.parents(_527.header).length){
while(!_52a.is(_527.header)){
_52a=_52a.parent();
}
}
var _52b=_52a[0]==_527.active[0];
if(_527.running||(_527.alwaysOpen&&_52b)){
return false;
}
if(!_52a.is(_527.header)){
return;
}
_527.active.parent().andSelf().toggleClass(_527.selectedClass);
if(!_52b){
_52a.parent().andSelf().addClass(_527.selectedClass);
}
var _529=_52a.next(),_528=_527.active.next(),data={instance:this,options:_527,newHeader:_52a,oldHeader:_527.active,newContent:_529,oldContent:_528},down=_527.headers.index(_527.active[0])>_527.headers.index(_52a[0]);
_527.active=_52b?$([]):_52a;
_520.call(this,_529,_528,data,_52b,down);
return false;
};
function _514(_52c,_52d){
return _52d!=undefined?typeof _52d=="number"?_52c.filter(":eq("+_52d+")"):_52c.not(_52c.not(_52d)):_52d===false?$([]):_52c.filter(":eq(0)");
};
$.extend($.ui.accordion,{defaults:{selectedClass:"selected",alwaysOpen:true,animated:"slide",event:"click",header:"a",autoheight:true,running:0,navigationFilter:function(){
return this.href.toLowerCase()==location.href.toLowerCase();
}},animations:{slide:function(_52e,_52f){
_52e=$.extend({easing:"swing",duration:300},_52e,_52f);
if(!_52e.toHide.size()){
_52e.toShow.animate({height:"show"},_52e);
return;
}
var _530=_52e.toHide.height(),_531=_52e.toShow.height(),_532=_531/_530;
_52e.toShow.css({height:0,overflow:"hidden"}).show();
_52e.toHide.filter(":hidden").each(_52e.complete).end().filter(":visible").animate({height:"hide"},{step:function(now){
var _533=(_530-now)*_532;
if($.browser.msie||$.browser.opera){
_533=Math.ceil(_533);
}
_52e.toShow.height(_533);
},duration:_52e.duration,easing:_52e.easing,complete:function(){
if(!_52e.autoheight){
_52e.toShow.css("height","auto");
}
_52e.complete();
}});
},bounceslide:function(_534){
this.slide(_534,{easing:_534.down?"bounceout":"swing",duration:_534.down?1000:200});
},easeslide:function(_535){
this.slide(_535,{easing:"easeinout",duration:700});
}}});
})(jQuery);
(function($){
var tmp,_536,_537,wrap,_538,_539,_53a,_53b,_53c,_53d=0,_53e={},_53f=[],_540=0,_541={},_542=[],_543=null,_544=new Image(),_545=/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,_546=/[^\.]\.(swf)\s*$/i,_547,_548=1,_549,_54a,busy=false,_54b=20,fx=$.extend($("<div/>")[0],{prop:0}),_54c=0,_54d=!$.support.opacity&&!window.XMLHttpRequest,_54e=function(){
_536.hide();
_544.onerror=_544.onload=null;
if(_543){
_543.abort();
}
tmp.empty();
},_54f=function(){
$.fancybox("<p id=\"fancybox_error\">The requested content cannot be loaded.<br />Please try again later.</p>",{"scrolling":"no","padding":20,"transitionIn":"none","transitionOut":"none"});
},_550=function(){
return [$(window).width(),$(window).height(),$(document).scrollLeft(),$(document).scrollTop()];
},_551=function(){
var view=_550(),to={},_552=_541.margin,_553=_541.autoScale,_554=(_54b+_552)*2,_555=(_54b+_552)*2,_556=(_541.padding*2),_557;
if(_541.width.toString().indexOf("%")>-1){
to.width=((view[0]*parseFloat(_541.width))/100)-(_54b*2);
_553=false;
}else{
to.width=_541.width+_556;
}
if(_541.height.toString().indexOf("%")>-1){
to.height=((view[1]*parseFloat(_541.height))/100)-(_54b*2);
_553=false;
}else{
to.height=_541.height+_556;
}
if(_553&&(to.width>(view[0]-_554)||to.height>(view[1]-_555))){
if(_53e.type=="image"||_53e.type=="swf"){
_554+=_556;
_555+=_556;
_557=Math.min(Math.min(view[0]-_554,_541.width)/_541.width,Math.min(view[1]-_555,_541.height)/_541.height);
to.width=Math.round(_557*(to.width-_556))+_556;
to.height=Math.round(_557*(to.height-_556))+_556;
}else{
to.width=Math.min(to.width,(view[0]-_554));
to.height=Math.min(to.height,(view[1]-_555));
}
}
to.top=view[3]+((view[1]-(to.height+(_54b*2)))*0.5);
if(_541.minWidth==false){
to.left=view[2]+((view[0]-(to.width+(_54b*2)))*0.5);
}else{
to.left=view[2]+((view[0]-(Math.max(to.width,_541.minWidth)+(_54b*2)))*0.5);
}
if(_541.autoScale===false){
to.top=Math.max(view[3]+_552,to.top);
to.left=Math.max(view[2]+_552,to.left);
}
return to;
},_558=function(_559){
if(_559&&_559.length){
switch(_541.titlePosition){
case "inside":
return _559;
case "over":
return "<span id=\"fancybox-title-over\">"+_559+"</span>";
default:
return "<span id=\"fancybox-title-wrap\"><span id=\"fancybox-title-left\"></span><span id=\"fancybox-title-main\">"+_559+"</span><span id=\"fancybox-title-right\"></span></span>";
}
}
return false;
},_55a=function(){
var _55b=_541.title,_55c=_54a.width-(_541.padding*2),_55d="fancybox-title-"+_541.titlePosition;
$("#fancybox-title").remove();
_54c=0;
if(_541.titleShow===false){
return;
}
_55b=$.isFunction(_541.titleFormat)?_541.titleFormat(_55b,_542,_540,_541):_558(_55b);
if(!_55b||_55b===""){
return;
}
$("<div id=\"fancybox-title\" class=\""+_55d+"\" />").css({"width":_55c,"paddingLeft":_541.padding,"paddingRight":_541.padding}).html(_55b).appendTo("body");
switch(_541.titlePosition){
case "inside":
_54c=$("#fancybox-title").outerHeight(true)-_541.padding;
_54a.height+=_54c;
break;
case "over":
$("#fancybox-title").css("bottom",_541.padding);
break;
default:
$("#fancybox-title").css("bottom",$("#fancybox-title").outerHeight(true)*-1);
break;
}
$("#fancybox-title").appendTo(_538).hide();
},_55e=function(){
$(document).unbind("keydown.fb").bind("keydown.fb",function(e){
if(e.keyCode==27&&_541.enableEscapeButton){
e.preventDefault();
$.fancybox.close();
}else{
if(e.keyCode==37){
e.preventDefault();
$.fancybox.prev();
}else{
if(e.keyCode==39){
e.preventDefault();
$.fancybox.next();
}
}
}
});
if($.fn.mousewheel){
wrap.unbind("mousewheel.fb");
if(_542.length>1){
wrap.bind("mousewheel.fb",function(e,_55f){
e.preventDefault();
if(busy||_55f===0){
return;
}
if(_55f>0){
$.fancybox.prev();
}else{
$.fancybox.next();
}
});
}
}
if(!_541.showNavArrows){
return;
}
if((_541.cyclic&&_542.length>1)||_540!==0){
_53b.show();
}
if((_541.cyclic&&_542.length>1)||_540!=(_542.length-1)){
_53c.show();
}
},_560=function(){
var href,_561;
if((_542.length-1)>_540){
href=_542[_540+1].href;
if(typeof href!=="undefined"&&href.match(_545)){
_561=new Image();
_561.src=href;
}
}
if(_540>0){
href=_542[_540-1].href;
if(typeof href!=="undefined"&&href.match(_545)){
_561=new Image();
_561.src=href;
}
}
},_562=function(){
_539.css("overflow",(_541.scrolling=="auto"?(_541.type=="image"||_541.type=="iframe"||_541.type=="swf"?"hidden":"auto"):(_541.scrolling=="yes"?"auto":"visible")));
if(!$.support.opacity){
_539.get(0).style.removeAttribute("filter");
wrap.get(0).style.removeAttribute("filter");
}
$("#fancybox-title").show();
if(_541.hideOnContentClick){
_539.one("click",$.fancybox.close);
}
if(_541.hideOnOverlayClick){
_537.one("click",$.fancybox.close);
}
if(_541.showCloseButton){
_53a.show();
}
_55e();
$(window).bind("resize.fb",$.fancybox.center);
if(_541.centerOnScroll){
$(window).bind("scroll.fb",$.fancybox.center);
}else{
$(window).unbind("scroll.fb");
}
if($.isFunction(_541.onComplete)){
_541.onComplete(_542,_540,_541);
}
busy=false;
_560();
},_563=function(pos){
var _564=Math.round(_549.width+(_54a.width-_549.width)*pos),_565=Math.round(_549.height+(_54a.height-_549.height)*pos),top=Math.round(_549.top+(_54a.top-_549.top)*pos),left=Math.round(_549.left+(_54a.left-_549.left)*pos);
wrap.css({"width":_564+"px","height":_565+"px","top":top+"px","left":left+"px"});
_564=Math.max(_564-_541.padding*2,0);
_565=Math.max(_565-(_541.padding*2+(_54c*pos)),0);
_539.css({"width":_564+"px","height":_565+"px"});
if(typeof _54a.opacity!=="undefined"){
wrap.css("opacity",(pos<0.5?0.5:pos));
}
},_566=function(obj){
var pos=obj.offset();
pos.top+=parseFloat(obj.css("paddingTop"))||0;
pos.left+=parseFloat(obj.css("paddingLeft"))||0;
pos.top+=parseFloat(obj.css("border-top-width"))||0;
pos.left+=parseFloat(obj.css("border-left-width"))||0;
pos.width=obj.width();
pos.height=obj.height();
return pos;
},_567=function(){
var orig=_53e.orig?$(_53e.orig):false,from={},pos,view;
if(orig&&orig.length){
pos=_566(orig);
from={width:(pos.width+(_541.padding*2)),height:(pos.height+(_541.padding*2)),top:(pos.top-_541.padding-_54b),left:(pos.left-_541.padding-_54b)};
}else{
view=_550();
from={width:1,height:1,top:view[3]+view[1]*0.5,left:view[2]+view[0]*0.5};
}
return from;
},_568=function(){
_536.hide();
if(wrap.is(":visible")&&$.isFunction(_541.onCleanup)){
if(_541.onCleanup(_542,_540,_541)===false){
$.event.trigger("fancybox-cancel");
busy=false;
return;
}
}
_542=_53f;
_540=_53d;
_541=_53e;
_539.get(0).scrollTop=0;
_539.get(0).scrollLeft=0;
if(_541.overlayShow){
if(_54d){
$("select:not(#fancybox-tmp select)").filter(function(){
return this.style.visibility!=="hidden";
}).css({"visibility":"hidden"}).one("fancybox-cleanup",function(){
this.style.visibility="inherit";
});
}
_537.css({"background-color":_541.overlayColor,"opacity":_541.overlayOpacity}).unbind().show();
}
_54a=_551();
_55a();
if(wrap.is(":visible")){
$(_53a.add(_53b).add(_53c)).hide();
var pos=wrap.position(),_569;
_549={top:pos.top,left:pos.left,width:wrap.width(),height:wrap.height()};
_569=(_549.width==_54a.width&&_549.height==_54a.height);
_539.fadeOut(_541.changeFade,function(){
var _56a=function(){
_539.html(tmp.contents()).fadeIn(_541.changeFade,_562);
};
$.event.trigger("fancybox-change");
_539.empty().css("overflow","hidden");
if(_569){
_539.css({top:_541.padding,left:_541.padding,width:Math.max(_54a.width-(_541.padding*2),1),height:Math.max(_54a.height-(_541.padding*2)-_54c,1)});
_56a();
}else{
_539.css({top:_541.padding,left:_541.padding,width:Math.max(_549.width-(_541.padding*2),1),height:Math.max(_549.height-(_541.padding*2),1)});
fx.prop=0;
$(fx).animate({prop:1},{duration:_541.changeSpeed,easing:_541.easingChange,step:_563,complete:_56a});
}
});
return;
}
wrap.css("opacity",1);
if(_541.transitionIn=="elastic"){
_549=_567();
_539.css({top:_541.padding,left:_541.padding,width:Math.max(_549.width-(_541.padding*2),1),height:Math.max(_549.height-(_541.padding*2),1)}).html(tmp.contents());
wrap.css(_549).show();
if(_541.opacity){
_54a.opacity=0;
}
fx.prop=0;
$(fx).animate({prop:1},{duration:_541.speedIn,easing:_541.easingIn,step:_563,complete:_562});
}else{
_539.css({top:_541.padding,left:_541.padding,width:Math.max(_54a.width-(_541.padding*2),1),height:Math.max(_54a.height-(_541.padding*2)-_54c,1)}).html(tmp.contents());
wrap.css(_54a).fadeIn(_541.transitionIn=="none"?0:_541.speedIn,_562);
}
},_56b=function(){
tmp.width(_53e.width);
tmp.height(_53e.height);
if(_53e.width=="auto"){
_53e.width=tmp.width();
}
if(_53e.height=="auto"){
_53e.height=tmp.height();
}
_568();
},_56c=function(){
busy=true;
_53e.width=_544.width;
_53e.height=_544.height;
$("<img />").attr({"id":"fancybox-img","src":_544.src,"alt":_53e.title}).appendTo(tmp);
_568();
},_56d=function(){
_54e();
var obj=_53f[_53d],href,type,_56e,str,emb,_56f,data;
_53e=$.extend({},$.fn.fancybox.defaults,(typeof $(obj).data("fancybox")=="undefined"?_53e:$(obj).data("fancybox")));
_56e=obj.title||$(obj).title||_53e.title||"";
if(obj.nodeName&&!_53e.orig){
_53e.orig=$(obj).children("img:first").length?$(obj).children("img:first"):$(obj);
}
if(_56e===""&&_53e.orig){
_56e=_53e.orig.attr("alt");
}
if(obj.nodeName&&(/^(?:javascript|#)/i).test(jq(obj).attr("href"))){
lb=jq(obj).attr("data-lightbox");
href=lb||_53e.href||null;
}else{
href=_53e.href||obj.href||null;
}
if(typeof href=="function"){
href=href();
}
if(_53e.type){
type=_53e.type;
if(!href){
href=_53e.content;
}
}else{
if(_53e.content){
type="html";
}else{
if(href){
if(href.match(_545)){
type="image";
}else{
if(href.match(_546)){
type="swf";
}else{
if($(obj).hasClass("iframe")){
type="iframe";
}else{
if(href.match(/#/)){
obj=href.substr(href.indexOf("#"));
type=$(obj).length>0?"inline":"ajax";
}else{
type="ajax";
}
}
}
}
}else{
type="inline";
}
}
}
_53e.type=type;
_53e.href=href;
_53e.title=_56e;
if(_53e.autoDimensions&&_53e.type!=="iframe"&&_53e.type!=="swf"){
_53e.width="auto";
_53e.height="auto";
}
if(_53e.modal){
_53e.overlayShow=true;
_53e.hideOnOverlayClick=false;
_53e.hideOnContentClick=false;
_53e.enableEscapeButton=false;
_53e.showCloseButton=false;
}
if($.isFunction(_53e.onStart)){
if(_53e.onStart(_53f,_53d,_53e)===false){
busy=false;
return;
}
}
tmp.css("padding",(_54b+_53e.padding+_53e.margin));
$(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change",function(){
$(this).replaceWith(_539.children());
});
switch(type){
case "html":
tmp.html(_53e.content);
_56b();
break;
case "inline":
$("<div class=\"fancybox-inline-tmp\" />").hide().insertBefore($(obj)).bind("fancybox-cleanup",function(){
$(this).replaceWith(_539.children());
}).bind("fancybox-cancel",function(){
$(this).replaceWith(tmp.children());
});
$(obj).appendTo(tmp);
_56b();
break;
case "image":
busy=false;
$.fancybox.showActivity();
_544=new Image();
_544.onerror=function(){
_54f();
};
_544.onload=function(){
_544.onerror=null;
_544.onload=null;
_56c();
};
_544.src=href;
break;
case "swf":
str="<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+_53e.width+"\" height=\""+_53e.height+"\"><param name=\"movie\" value=\""+href+"\"></param>";
emb="";
$.each(_53e.swf,function(name,val){
str+="<param name=\""+name+"\" value=\""+val+"\"></param>";
emb+=" "+name+"=\""+val+"\"";
});
str+="<embed src=\""+href+"\" type=\"application/x-shockwave-flash\" width=\""+_53e.width+"\" height=\""+_53e.height+"\""+emb+"></embed></object>";
tmp.html(str);
_56b();
break;
case "ajax":
_56f=href.split("#",2);
data=_53e.ajax.data||{};
if(_56f.length>1){
href=_56f[0];
if(typeof data=="string"){
data+="&selector="+_56f[1];
}else{
data.selector=_56f[1];
}
}
busy=false;
$.fancybox.showActivity();
_543=$.ajax($.extend(_53e.ajax,{url:href,data:data,error:_54f,success:function(data,_570,_571){
if(_543.status==200){
tmp.html(data);
_56b();
}
}}));
break;
case "iframe":
$("<iframe id=\"fancybox-frame\" name=\"fancybox-frame"+new Date().getTime()+"\" frameborder=\"0\" hspace=\"0\" scrolling=\""+_53e.scrolling+"\" src=\""+_53e.href+"\"></iframe>").appendTo(tmp);
_568();
break;
}
},_572=function(){
if(!_536.is(":visible")){
clearInterval(_547);
return;
}
$("div",_536).css("top",(_548*-40)+"px");
_548=(_548+1)%12;
},_573=function(){
if($("#fancybox-wrap").length){
return;
}
$("body").append(tmp=$("<div id=\"fancybox-tmp\"></div>"),_536=$("<div id=\"fancybox-loading\"><div></div></div>"),_537=$("<div id=\"fancybox-overlay\"></div>"),wrap=$("<div id=\"fancybox-wrap\"></div>"));
if(!$.support.opacity){
wrap.addClass("fancybox-ie");
_536.addClass("fancybox-ie");
}
_538=$("<div id=\"fancybox-outer\"></div>").append("<div class=\"fancy-bg\" id=\"fancy-bg-n\"></div><div class=\"fancy-bg\" id=\"fancy-bg-ne\"></div><div class=\"fancy-bg\" id=\"fancy-bg-e\"></div><div class=\"fancy-bg\" id=\"fancy-bg-se\"></div><div class=\"fancy-bg\" id=\"fancy-bg-s\"></div><div class=\"fancy-bg\" id=\"fancy-bg-sw\"></div><div class=\"fancy-bg\" id=\"fancy-bg-w\"></div><div class=\"fancy-bg\" id=\"fancy-bg-nw\"></div>").appendTo(wrap);
_538.append(_539=$("<div id=\"fancybox-inner\"></div>"),_53a=$("<a id=\"fancybox-close\"></a>"),_53b=$("<a href=\"javascript:;\" id=\"fancybox-left\"><span class=\"fancy-ico\" id=\"fancybox-left-ico\"></span></a>"),_53c=$("<a href=\"javascript:;\" id=\"fancybox-right\"><span class=\"fancy-ico\" id=\"fancybox-right-ico\"></span></a>"));
_53a.click($.fancybox.close);
_536.click($.fancybox.cancel);
_53b.click(function(e){
e.preventDefault();
$.fancybox.prev();
});
_53c.click(function(e){
e.preventDefault();
$.fancybox.next();
});
if(_54d){
_537.get(0).style.setExpression("height","document.body.scrollHeight > document.body.offsetHeight ? document.body.scrollHeight : document.body.offsetHeight + 'px'");
_536.get(0).style.setExpression("top","(-20 + (document.documentElement.clientHeight ? document.documentElement.clientHeight/2 : document.body.clientHeight/2 ) + ( ignoreMe = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop )) + 'px'");
_538.prepend("<iframe id=\"fancybox-hide-sel-frame\" src=\"javascript:'';\" scrolling=\"no\" frameborder=\"0\" ></iframe>");
}
};
$.fn.fancybox=function(_574){
$(this).data("fancybox",$.extend({},_574,($.metadata?$(this).metadata():{}))).unbind("click.fb").bind("click.fb",function(e){
e.preventDefault();
if(busy){
return;
}
busy=true;
$(this).blur();
_53f=[];
_53d=0;
var rel=$(this).attr("rel")||"";
if(!rel||rel==""||rel==="nofollow"){
_53f.push(this);
}else{
_53f=$("a[rel="+rel+"], area[rel="+rel+"]");
_53d=_53f.index(this);
}
_56d();
return false;
});
return this;
};
$.fancybox=function(obj){
if(busy){
return;
}
busy=true;
var opts=typeof arguments[1]!=="undefined"?arguments[1]:{};
_53f=[];
_53d=opts.index||0;
if($.isArray(obj)){
for(var i=0,j=obj.length;i<j;i++){
if(typeof obj[i]=="object"){
$(obj[i]).data("fancybox",$.extend({},opts,obj[i]));
}else{
obj[i]=$({}).data("fancybox",$.extend({content:obj[i]},opts));
}
}
_53f=jQuery.merge(_53f,obj);
}else{
if(typeof obj=="object"){
$(obj).data("fancybox",$.extend({},opts,obj));
}else{
obj=$({}).data("fancybox",$.extend({content:obj},opts));
}
_53f.push(obj);
}
if(_53d>_53f.length||_53d<0){
_53d=0;
}
_56d();
};
$.fancybox.showActivity=function(){
clearInterval(_547);
_536.show();
_547=setInterval(_572,66);
};
$.fancybox.hideActivity=function(){
_536.hide();
};
$.fancybox.next=function(){
return $.fancybox.pos(_540+1);
};
$.fancybox.prev=function(){
return $.fancybox.pos(_540-1);
};
$.fancybox.pos=function(pos){
if(busy){
return;
}
pos=parseInt(pos,10);
if(pos>-1&&_542.length>pos){
_53d=pos;
_56d();
}
if(_541.cyclic&&_542.length>1&&pos<0){
_53d=_542.length-1;
_56d();
}
if(_541.cyclic&&_542.length>1&&pos>=_542.length){
_53d=0;
_56d();
}
return;
};
$.fancybox.cancel=function(){
if(busy){
return;
}
busy=true;
$.event.trigger("fancybox-cancel");
_54e();
if(_53e&&$.isFunction(_53e.onCancel)){
_53e.onCancel(_53f,_53d,_53e);
}
busy=false;
};
$.fancybox.close=function(){
if(busy||wrap.is(":hidden")){
return;
}
busy=true;
if(_541&&$.isFunction(_541.onCleanup)){
if(_541.onCleanup(_542,_540,_541)===false){
busy=false;
return;
}
}
_54e();
$(_53a.add(_53b).add(_53c)).hide();
$("#fancybox-title").remove();
wrap.add(_539).add(_537).unbind();
$(window).unbind("resize.fb scroll.fb");
$(document).unbind("keydown.fb");
function _575(){
_537.fadeOut("fast");
wrap.hide();
$.event.trigger("fancybox-cleanup");
_539.empty();
if($.isFunction(_541.onClosed)){
_541.onClosed(_542,_540,_541);
}
_542=_53e=[];
_540=_53d=0;
_541=_53e={};
busy=false;
};
_539.css("overflow","hidden");
if(_541.transitionOut=="elastic"){
_549=_567();
var pos=wrap.position();
_54a={top:pos.top,left:pos.left,width:wrap.width(),height:wrap.height()};
if(_541.opacity){
_54a.opacity=1;
}
fx.prop=1;
$(fx).animate({prop:0},{duration:_541.speedOut,easing:_541.easingOut,step:_563,complete:_575});
}else{
wrap.fadeOut(_541.transitionOut=="none"?0:_541.speedOut,_575);
}
};
$.fancybox.resize=function(){
var c,h;
if(busy||wrap.is(":hidden")){
return;
}
busy=true;
c=_539.wrapInner("<div style='overflow:auto'></div>").children();
h=c.height();
wrap.css({height:h+(_541.padding*2)+_54c});
_539.css({height:h});
c.replaceWith(c.children());
$.fancybox.center();
};
$.fancybox.center=function(){
busy=true;
var view=_550(),_576=_541.margin,to={};
to.top=view[3]+((view[1]-((wrap.height()-_54c)+(_54b*2)))*0.5);
to.left=view[2]+((view[0]-(wrap.width()+(_54b*2)))*0.5);
to.top=Math.max(view[3]+_576,to.top);
to.left=Math.max(view[2]+_576,to.left);
wrap.css(to);
busy=false;
};
$.fn.fancybox.defaults={padding:10,margin:20,opacity:false,modal:false,cyclic:false,scrolling:"auto",width:560,minWidth:false,height:340,autoScale:true,autoDimensions:true,centerOnScroll:false,ajax:{},swf:{wmode:"transparent"},hideOnOverlayClick:true,hideOnContentClick:false,overlayShow:true,overlayOpacity:0.3,overlayColor:"#666",titleShow:true,titlePosition:"outside",titleFormat:null,transitionIn:"fade",transitionOut:"fade",speedIn:300,speedOut:300,changeSpeed:300,changeFade:"fast",easingIn:"swing",easingOut:"swing",showCloseButton:true,showNavArrows:true,enableEscapeButton:true,onStart:null,onCancel:null,onComplete:null,onCleanup:null,onClosed:null};
$(document).ready(function(){
_573();
});
})(jQuery);
(function(_577,_578){
var _579=_577.document;
(function(){
var _57a=false,_57b=/xyz/.test(function(){
xyz;
})?/\b_super\b/:/.*/;
this.JRClass=function(){
};
JRClass.extend=function(prop){
var _57c=this.prototype;
_57a=true;
var _57d=new this();
_57a=false;
for(var name in prop){
_57d[name]=typeof prop[name]=="function"&&typeof _57c[name]=="function"&&_57b.test(prop[name])?(function(name,fn){
return function(){
var tmp=this._super;
this._super=_57c[name];
var ret=fn.apply(this,arguments);
this._super=tmp;
return ret;
};
})(name,prop[name]):prop[name];
}
function _57e(){
if(!_57a&&this.init){
this.init.apply(this,arguments);
}
};
_57e.prototype=_57d;
_57e.constructor=_57e;
_57e.extend=arguments.callee;
return _57e;
};
})();
var _57f=JRClass.extend({init:function(_580,_581){
if(typeof _580=="string"){
this.video=_579.getElementById(_580);
}else{
this.video=_580;
}
this.video.player=this;
this.values={};
this.elements={};
this.options={autoplay:false,preload:true,useBuiltInControls:false,controlsBelow:false,controlsAtStart:true,controlsHiding:true,defaultVolume:0.85,playerFallbackOrder:["html5","flash","links"],flashPlayer:"htmlObject",flashPlayerVersion:false};
if(typeof _57f.options=="object"){
_V_.merge(this.options,_57f.options);
}
if(typeof _581=="object"){
_V_.merge(this.options,_581);
}
if(this.getPreloadAttribute()!==_578){
this.options.preload=this.getPreloadAttribute();
}
if(this.getAutoplayAttribute()!==_578){
this.options.autoplay=this.getAutoplayAttribute();
}
this.box=this.video.parentNode;
this.linksFallback=this.getLinksFallback();
this.hideLinksFallback();
this.each(this.options.playerFallbackOrder,function(_582){
if(this[_582+"Supported"]()){
this[_582+"Init"]();
return true;
}
});
this.activateElement(this,"player");
this.activateElement(this.box,"box");
},behaviors:{},newBehavior:function(name,_583,_584){
this.behaviors[name]=_583;
this.extend(_584);
},activateElement:function(_585,_586){
if(typeof _585=="string"){
_585=_579.getElementById(_585);
}
this.behaviors[_586].call(this,_585);
},errors:[],warnings:[],warning:function(_587){
this.warnings.push(_587);
this.log(_587);
},history:[],log:function(_588){
if(!_588){
return;
}
if(typeof _588=="string"){
_588={type:_588};
}
if(_588.type){
this.history.push(_588.type);
}
if(this.history.length>=50){
this.history.shift();
}
try{
console.log(_588.type);
}
catch(e){
try{
opera.postError(_588.type);
}
catch(e){
}
}
},setLocalStorage:function(key,_589){
if(!localStorage){
return;
}
try{
localStorage[key]=_589;
}
catch(e){
if(e.code==22||e.code==1014){
this.warning(_57f.warnings.localStorageFull);
}
}
},getPreloadAttribute:function(){
if(typeof this.video.hasAttribute=="function"&&this.video.hasAttribute("preload")){
var _58a=this.video.getAttribute("preload");
if(_58a===""||_58a==="true"){
return "auto";
}
if(_58a==="false"){
return "none";
}
return _58a;
}
},getAutoplayAttribute:function(){
if(typeof this.video.hasAttribute=="function"&&this.video.hasAttribute("autoplay")){
var _58b=this.video.getAttribute("autoplay");
if(_58b==="false"){
return false;
}
return true;
}
},bufferedPercent:function(){
return (this.duration())?this.buffered()[1]/this.duration():0;
},each:function(arr,fn){
if(!arr||arr.length===0){
return;
}
for(var i=0,j=arr.length;i<j;i++){
if(fn.call(this,arr[i],i)){
break;
}
}
},extend:function(obj){
for(var _58c in obj){
if(obj.hasOwnProperty(_58c)){
this[_58c]=obj[_58c];
}
}
}});
_57f.player=_57f.prototype;
_57f.player.extend({flashSupported:function(){
if(!this.flashElement){
this.flashElement=this.getFlashElement();
}
if(this.flashElement&&this.flashPlayerVersionSupported()){
return true;
}else{
return false;
}
},flashInit:function(){
this.replaceWithFlash();
this.element=this.flashElement;
this.video.src="";
var _58d=_57f.flashPlayers[this.options.flashPlayer];
this.extend(_57f.flashPlayers[this.options.flashPlayer].api);
(_58d.init.context(this))();
},getFlashElement:function(){
var _58e=this.video.children;
for(var i=0,j=_58e.length;i<j;i++){
if(_58e[i].className=="vjs-flash-fallback"){
return _58e[i];
}
}
},replaceWithFlash:function(){
if(this.flashElement){
this.box.insertBefore(this.flashElement,this.video);
this.video.style.display="none";
}
},flashPlayerVersionSupported:function(){
var _58f=(this.options.flashPlayerVersion)?this.options.flashPlayerVersion:_57f.flashPlayers[this.options.flashPlayer].flashPlayerVersion;
return _57f.getFlashVersion()>=_58f;
}});
_57f.flashPlayers={};
_57f.flashPlayers.htmlObject={flashPlayerVersion:9,init:function(){
return true;
},api:{width:function(_590){
if(_590!==_578){
this.element.width=_590;
this.box.style.width=_590+"px";
this.triggerResizeListeners();
return this;
}
return this.element.width;
},height:function(_591){
if(_591!==_578){
this.element.height=_591;
this.box.style.height=_591+"px";
this.triggerResizeListeners();
return this;
}
return this.element.height;
}}};
_57f.player.extend({linksSupported:function(){
return true;
},linksInit:function(){
this.showLinksFallback();
this.element=this.video;
},getLinksFallback:function(){
return this.box.getElementsByTagName("P")[0];
},hideLinksFallback:function(){
if(this.linksFallback){
this.linksFallback.style.display="none";
}
},showLinksFallback:function(){
if(this.linksFallback){
this.linksFallback.style.display="block";
}
}});
_57f.merge=function(obj1,obj2,safe){
for(var _592 in obj2){
if(obj2.hasOwnProperty(_592)&&(!safe||!obj1.hasOwnProperty(_592))){
obj1[_592]=obj2[_592];
}
}
return obj1;
};
_57f.extend=function(obj){
this.merge(this,obj,true);
};
_57f.extend({setupAllWhenReady:function(_593){
_57f.options=_593;
_57f.DOMReady(_57f.setup);
},DOMReady:function(fn){
_57f.addToDOMReady(fn);
},setup:function(_594,_595){
var _596=false,_597=[],_598;
if(!_594||_594=="All"){
_594=_57f.getVideoJSTags();
}else{
if(typeof _594!="object"||_594.nodeType==1){
_594=[_594];
_596=true;
}
}
for(var i=0;i<_594.length;i++){
if(typeof _594[i]=="string"){
_598=_579.getElementById(_594[i]);
}else{
_598=_594[i];
}
_597.push(new _57f(_598,_595));
}
return (_596)?_597[0]:_597;
},getVideoJSTags:function(){
var _599=_579.getElementsByTagName("video"),_59a=[],_59b;
for(var i=0,j=_599.length;i<j;i++){
_59b=_599[i];
if(_59b.className.indexOf("video-js")!=-1){
_59a.push(_59b);
}
}
return _59a;
},browserSupportsVideo:function(){
if(typeof _57f.videoSupport!="undefined"){
return _57f.videoSupport;
}
_57f.videoSupport=!!_579.createElement("video").canPlayType;
return _57f.videoSupport;
},getFlashVersion:function(){
if(typeof _57f.flashVersion!="undefined"){
return _57f.flashVersion;
}
var _59c=0,desc;
if(typeof navigator.plugins!="undefined"&&typeof navigator.plugins["Shockwave Flash"]=="object"){
desc=navigator.plugins["Shockwave Flash"].description;
if(desc&&!(typeof navigator.mimeTypes!="undefined"&&navigator.mimeTypes["application/x-shockwave-flash"]&&!navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin)){
_59c=parseInt(desc.match(/^.*\s+([^\s]+)\.[^\s]+\s+[^\s]+$/)[1],10);
}
}else{
if(typeof _577.ActiveXObject!="undefined"){
try{
var _59d=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
if(_59d){
_59c=parseInt(_59d.GetVariable("$version").match(/^[^\s]+\s(\d+)/)[1],10);
}
}
catch(e){
}
}
}
_57f.flashVersion=_59c;
return _57f.flashVersion;
},isIE:function(){
return !+"\v1";
},isIPad:function(){
return navigator.userAgent.match(/iPad/i)!==null;
},isIPhone:function(){
return navigator.userAgent.match(/iPhone/i)!==null;
},isIOS:function(){
return _57f.isIPhone()||_57f.isIPad();
},iOSVersion:function(){
var _59e=navigator.userAgent.match(/OS (\d+)_/i);
if(_59e&&_59e[1]){
return _59e[1];
}
},isAndroid:function(){
return navigator.userAgent.match(/Android/i)!==null;
},androidVersion:function(){
var _59f=navigator.userAgent.match(/Android (\d+)\./i);
if(_59f&&_59f[1]){
return _59f[1];
}
},warnings:{videoNotReady:"Video is not ready yet (try playing the video first).",localStorageFull:"Local Storage is Full"}});
if(_57f.isIE()){
_579.createElement("video");
}
_577.VideoJS=_577._V_=_57f;
_57f.player.extend({html5Supported:function(){
if(_57f.browserSupportsVideo()&&this.canPlaySource()){
return true;
}else{
return false;
}
},html5Init:function(){
this.element=this.video;
this.fixPreloading();
this.supportProgressEvents();
this.volume((localStorage&&localStorage.volume)||this.options.defaultVolume);
if(_57f.isIOS()){
this.options.useBuiltInControls=true;
this.iOSInterface();
}else{
if(_57f.isAndroid()){
this.options.useBuiltInControls=true;
this.androidInterface();
}
}
if(!this.options.useBuiltInControls){
this.video.controls=false;
if(this.options.controlsBelow){
_V_.addClass(this.box,"vjs-controls-below");
}
this.activateElement(this.video,"playToggle");
this.buildStylesCheckDiv();
this.buildAndActivatePoster();
this.buildBigPlayButton();
this.buildAndActivateSpinner();
this.buildAndActivateControlBar();
this.loadInterface();
this.getSubtitles();
this.fixAutoplay();
}
},canPlaySource:function(){
if(this.canPlaySourceResult){
return this.canPlaySourceResult;
}
var _5a0=this.video.children;
for(var i=0,j=_5a0.length;i<j;i++){
if(_5a0[i].tagName.toUpperCase()=="SOURCE"){
var _5a1=this.video.canPlayType(_5a0[i].type)||this.canPlayExt(_5a0[i].src);
if(_5a1=="probably"||_5a1=="maybe"){
this.firstPlayableSource=_5a0[i];
this.canPlaySourceResult=true;
return true;
}
}
}
this.canPlaySourceResult=false;
return false;
},canPlayExt:function(src){
if(!src){
return "";
}
var _5a2=src.match(/\.([^\.]+)$/);
if(_5a2&&_5a2[1]){
var ext=_5a2[1].toLowerCase();
if(_57f.isAndroid()){
if(ext=="mp4"||ext=="m4v"){
return "maybe";
}
}else{
if(_57f.isIOS()){
if(ext=="m3u8"){
return "maybe";
}
}
}
}
return "";
},forceTheSource:function(){
this.video.src=this.firstPlayableSource.src;
this.video.load();
},fixPreloading:function(){
if(typeof this.video.hasAttribute=="function"&&this.video.hasAttribute("preload")&&this.video.preload!="none"){
this.video.autobuffer=true;
}else{
this.video.autobuffer=false;
this.video.preload="none";
}
},supportProgressEvents:function(e){
_V_.addListener(this.video,"progress",this.playerOnVideoProgress.context(this));
},playerOnVideoProgress:function(_5a3){
this.setBufferedFromProgress(_5a3);
},setBufferedFromProgress:function(_5a4){
if(_5a4.total>0){
var _5a5=(_5a4.loaded/_5a4.total)*this.duration();
if(_5a5>this.values.bufferEnd){
this.values.bufferEnd=_5a5;
}
}
},iOSInterface:function(){
if(_57f.iOSVersion()<4){
this.forceTheSource();
}
if(_57f.isIPad()){
this.buildAndActivateSpinner();
}
},androidInterface:function(){
this.forceTheSource();
_V_.addListener(this.video,"click",function(){
this.play();
});
this.buildBigPlayButton();
_V_.addListener(this.bigPlayButton,"click",function(){
this.play();
}.context(this));
this.positionBox();
this.showBigPlayButtons();
},loadInterface:function(){
if(!this.stylesHaveLoaded()){
if(!this.positionRetries){
this.positionRetries=1;
}
if(this.positionRetries++<100){
setTimeout(this.loadInterface.context(this),10);
return;
}
}
this.hideStylesCheckDiv();
if(this.video.paused){
this.showPoster();
}else{
this.hidePoster();
}
if(this.video.paused!==false){
this.showBigPlayButtons();
}
if(this.options.controlsAtStart){
this.showControlBars();
}
this.positionAll();
},buildAndActivateControlBar:function(){
this.controls=_V_.createElement("div",{className:"vjs-controls"});
this.box.appendChild(this.controls);
this.activateElement(this.controls,"controlBar");
this.activateElement(this.controls,"mouseOverVideoReporter");
this.playControl=_V_.createElement("div",{className:"vjs-play-control",innerHTML:"<span></span>"});
this.controls.appendChild(this.playControl);
this.activateElement(this.playControl,"playToggle");
this.progressControl=_V_.createElement("div",{className:"vjs-progress-control"});
this.controls.appendChild(this.progressControl);
this.progressHolder=_V_.createElement("div",{className:"vjs-progress-holder"});
this.progressControl.appendChild(this.progressHolder);
this.activateElement(this.progressHolder,"currentTimeScrubber");
this.loadProgressBar=_V_.createElement("div",{className:"vjs-load-progress"});
this.progressHolder.appendChild(this.loadProgressBar);
this.activateElement(this.loadProgressBar,"loadProgressBar");
this.playProgressBar=_V_.createElement("div",{className:"vjs-play-progress"});
this.progressHolder.appendChild(this.playProgressBar);
this.activateElement(this.playProgressBar,"playProgressBar");
this.timeControl=_V_.createElement("div",{className:"vjs-time-control"});
this.controls.appendChild(this.timeControl);
this.currentTimeDisplay=_V_.createElement("span",{className:"vjs-current-time-display",innerHTML:"00:00"});
this.timeControl.appendChild(this.currentTimeDisplay);
this.activateElement(this.currentTimeDisplay,"currentTimeDisplay");
this.timeSeparator=_V_.createElement("span",{innerHTML:" / "});
this.timeControl.appendChild(this.timeSeparator);
this.durationDisplay=_V_.createElement("span",{className:"vjs-duration-display",innerHTML:"00:00"});
this.timeControl.appendChild(this.durationDisplay);
this.activateElement(this.durationDisplay,"durationDisplay");
this.volumeControl=_V_.createElement("div",{className:"vjs-volume-control",innerHTML:"<div><span></span><span></span><span></span><span></span><span></span><span></span></div>"});
this.controls.appendChild(this.volumeControl);
this.activateElement(this.volumeControl,"volumeScrubber");
this.volumeDisplay=this.volumeControl.children[0];
this.activateElement(this.volumeDisplay,"volumeDisplay");
this.fullscreenControl=_V_.createElement("div",{className:"vjs-fullscreen-control",innerHTML:"<div><span></span><span></span><span></span><span></span></div>"});
this.controls.appendChild(this.fullscreenControl);
this.activateElement(this.fullscreenControl,"fullscreenToggle");
},buildAndActivatePoster:function(){
this.updatePosterSource();
if(this.video.poster){
this.poster=_579.createElement("img");
this.box.appendChild(this.poster);
this.poster.src=this.video.poster;
this.poster.className="vjs-poster";
this.activateElement(this.poster,"poster");
}else{
this.poster=false;
}
},buildBigPlayButton:function(){
this.bigPlayButton=_V_.createElement("div",{className:"vjs-big-play-button",innerHTML:"<span></span>"});
this.box.appendChild(this.bigPlayButton);
this.activateElement(this.bigPlayButton,"bigPlayButton");
},buildAndActivateSpinner:function(){
this.spinner=_V_.createElement("div",{className:"vjs-spinner",innerHTML:"<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>"});
this.box.appendChild(this.spinner);
this.activateElement(this.spinner,"spinner");
},buildStylesCheckDiv:function(){
this.stylesCheckDiv=_V_.createElement("div",{className:"vjs-styles-check"});
this.stylesCheckDiv.style.position="absolute";
this.box.appendChild(this.stylesCheckDiv);
},hideStylesCheckDiv:function(){
this.stylesCheckDiv.style.display="none";
},stylesHaveLoaded:function(){
if(this.stylesCheckDiv.offsetHeight!=5){
return false;
}else{
return true;
}
},positionAll:function(){
this.positionBox();
this.positionControlBars();
this.positionPoster();
},positionBox:function(){
if(this.videoIsFullScreen){
this.box.style.width="";
this.element.style.height="";
if(this.options.controlsBelow){
this.box.style.height="";
this.element.style.height=(this.box.offsetHeight-this.controls.offsetHeight)+"px";
}
}else{
this.box.style.width=this.width()+"px";
this.element.style.height=this.height()+"px";
if(this.options.controlsBelow){
this.element.style.height="";
}
}
},getSubtitles:function(){
var _5a6=this.video.getElementsByTagName("TRACK");
for(var i=0,j=_5a6.length;i<j;i++){
if(_5a6[i].getAttribute("kind")=="subtitles"&&_5a6[i].getAttribute("src")){
this.subtitlesSource=_5a6[i].getAttribute("src");
this.loadSubtitles();
this.buildSubtitles();
}
}
},loadSubtitles:function(){
_V_.get(this.subtitlesSource,this.parseSubtitles.context(this));
},parseSubtitles:function(_5a7){
var _5a8=_5a7.split("\n"),line="",_5a9,time,text;
this.subtitles=[];
this.currentSubtitle=false;
this.lastSubtitleIndex=0;
for(var i=0;i<_5a8.length;i++){
line=_V_.trim(_5a8[i]);
if(line){
_5a9={id:line,index:this.subtitles.length};
line=_V_.trim(_5a8[++i]);
time=line.split(" --> ");
_5a9.start=this.parseSubtitleTime(time[0]);
_5a9.end=this.parseSubtitleTime(time[1]);
text=[];
for(var j=i;j<_5a8.length;j++){
line=_V_.trim(_5a8[++i]);
if(!line){
break;
}
text.push(line);
}
_5a9.text=text.join("<br/>");
this.subtitles.push(_5a9);
}
}
},parseSubtitleTime:function(_5aa){
var _5ab=_5aa.split(":"),time=0;
time+=parseFloat(_5ab[0])*60*60;
time+=parseFloat(_5ab[1])*60;
var _5ac=_5ab[2].split(/\.|,/);
time+=parseFloat(_5ac[0]);
ms=parseFloat(_5ac[1]);
if(ms){
time+=ms/1000;
}
return time;
},buildSubtitles:function(){
this.subtitlesDisplay=_V_.createElement("div",{className:"vjs-subtitles"});
this.box.appendChild(this.subtitlesDisplay);
this.activateElement(this.subtitlesDisplay,"subtitlesDisplay");
},addVideoListener:function(type,fn){
_V_.addListener(this.video,type,fn.rEvtContext(this));
},play:function(){
this.video.play();
return this;
},onPlay:function(fn){
this.addVideoListener("play",fn);
return this;
},pause:function(){
this.video.pause();
return this;
},onPause:function(fn){
this.addVideoListener("pause",fn);
return this;
},paused:function(){
return this.video.paused;
},currentTime:function(_5ad){
if(_5ad!==_578){
try{
this.video.currentTime=_5ad;
}
catch(e){
this.warning(_57f.warnings.videoNotReady);
}
this.values.currentTime=_5ad;
return this;
}
return this.video.currentTime;
},onCurrentTimeUpdate:function(fn){
this.currentTimeListeners.push(fn);
},duration:function(){
return this.video.duration;
},buffered:function(){
if(this.values.bufferStart===_578){
this.values.bufferStart=0;
this.values.bufferEnd=0;
}
if(this.video.buffered&&this.video.buffered.length>0){
var _5ae=this.video.buffered.end(0);
if(_5ae>this.values.bufferEnd){
this.values.bufferEnd=_5ae;
}
}
return [this.values.bufferStart,this.values.bufferEnd];
},volume:function(_5af){
if(_5af!==_578){
this.values.volume=Math.max(0,Math.min(1,parseFloat(_5af)));
this.video.volume=this.values.volume;
this.setLocalStorage("volume",this.values.volume);
return this;
}
if(this.values.volume){
return this.values.volume;
}
return this.video.volume;
},onVolumeChange:function(fn){
_V_.addListener(this.video,"volumechange",fn.rEvtContext(this));
},width:function(_5b0){
if(_5b0!==_578){
this.video.width=_5b0;
this.box.style.width=_5b0+"px";
this.triggerResizeListeners();
return this;
}
return this.video.offsetWidth;
},height:function(_5b1){
if(_5b1!==_578){
this.video.height=_5b1;
this.box.style.height=_5b1+"px";
this.triggerResizeListeners();
return this;
}
return this.video.offsetHeight;
},supportsFullScreen:function(){
if(typeof this.video.webkitEnterFullScreen=="function"){
if(!navigator.userAgent.match("Chrome")&&!navigator.userAgent.match("Mac OS X 10.5")){
return true;
}
}
return false;
},html5EnterNativeFullScreen:function(){
try{
this.video.webkitEnterFullScreen();
}
catch(e){
if(e.code==11){
this.warning(_57f.warnings.videoNotReady);
}
}
return this;
},enterFullScreen:function(){
if(this.supportsFullScreen()){
this.html5EnterNativeFullScreen();
}else{
this.enterFullWindow();
}
},exitFullScreen:function(){
if(this.supportsFullScreen()){
}else{
this.exitFullWindow();
}
},enterFullWindow:function(){
this.videoIsFullScreen=true;
this.docOrigOverflow=_579.documentElement.style.overflow;
_V_.addListener(_579,"keydown",this.fullscreenOnEscKey.rEvtContext(this));
_V_.addListener(_577,"resize",this.fullscreenOnWindowResize.rEvtContext(this));
_579.documentElement.style.overflow="hidden";
_V_.addClass(this.box,"vjs-fullscreen");
this.positionAll();
},exitFullWindow:function(){
this.videoIsFullScreen=false;
_579.removeEventListener("keydown",this.fullscreenOnEscKey,false);
_577.removeEventListener("resize",this.fullscreenOnWindowResize,false);
_579.documentElement.style.overflow=this.docOrigOverflow;
_V_.removeClass(this.box,"vjs-fullscreen");
this.positionAll();
},onError:function(fn){
this.addVideoListener("error",fn);
return this;
},onEnded:function(fn){
this.addVideoListener("ended",fn);
return this;
}});
_57f.player.newBehavior("player",function(_5b2){
this.onError(this.playerOnVideoError);
this.onPlay(this.playerOnVideoPlay);
this.onPlay(this.trackCurrentTime);
this.onPause(this.playerOnVideoPause);
this.onPause(this.stopTrackingCurrentTime);
this.onEnded(this.playerOnVideoEnded);
this.trackBuffered();
this.onBufferedUpdate(this.isBufferFull);
},{playerOnVideoError:function(_5b3){
this.log(_5b3);
this.log(this.video.error);
},playerOnVideoPlay:function(_5b4){
this.hasPlayed=true;
},playerOnVideoPause:function(_5b5){
},playerOnVideoEnded:function(_5b6){
this.currentTime(0);
this.pause();
},trackBuffered:function(){
this.bufferedInterval=setInterval(this.triggerBufferedListeners.context(this),500);
},stopTrackingBuffered:function(){
clearInterval(this.bufferedInterval);
},bufferedListeners:[],onBufferedUpdate:function(fn){
this.bufferedListeners.push(fn);
},triggerBufferedListeners:function(){
this.isBufferFull();
this.each(this.bufferedListeners,function(_5b7){
(_5b7.context(this))();
});
},isBufferFull:function(){
if(this.bufferedPercent()==1){
this.stopTrackingBuffered();
}
},trackCurrentTime:function(){
if(this.currentTimeInterval){
clearInterval(this.currentTimeInterval);
}
this.currentTimeInterval=setInterval(this.triggerCurrentTimeListeners.context(this),100);
this.trackingCurrentTime=true;
},stopTrackingCurrentTime:function(){
clearInterval(this.currentTimeInterval);
this.trackingCurrentTime=false;
},currentTimeListeners:[],triggerCurrentTimeListeners:function(late,_5b8){
this.each(this.currentTimeListeners,function(_5b9){
(_5b9.context(this))(_5b8||this.currentTime());
});
},resizeListeners:[],onResize:function(fn){
this.resizeListeners.push(fn);
},triggerResizeListeners:function(){
this.each(this.resizeListeners,function(_5ba){
(_5ba.context(this))();
});
}});
_57f.player.newBehavior("mouseOverVideoReporter",function(_5bb){
_V_.addListener(_5bb,"mousemove",this.mouseOverVideoReporterOnMouseMove.context(this));
_V_.addListener(_5bb,"mouseout",this.mouseOverVideoReporterOnMouseOut.context(this));
},{mouseOverVideoReporterOnMouseMove:function(){
this.showControlBars();
clearInterval(this.mouseMoveTimeout);
this.mouseMoveTimeout=setTimeout(this.hideControlBars.context(this),4000);
},mouseOverVideoReporterOnMouseOut:function(_5bc){
var _5bd=_5bc.relatedTarget;
while(_5bd&&_5bd!==this.box){
_5bd=_5bd.parentNode;
}
if(_5bd!==this.box){
this.hideControlBars();
}
}});
_57f.player.newBehavior("box",function(_5be){
this.positionBox();
_V_.addClass(_5be,"vjs-paused");
this.activateElement(_5be,"mouseOverVideoReporter");
this.onPlay(this.boxOnVideoPlay);
this.onPause(this.boxOnVideoPause);
},{boxOnVideoPlay:function(){
_V_.removeClass(this.box,"vjs-paused");
_V_.addClass(this.box,"vjs-playing");
},boxOnVideoPause:function(){
_V_.removeClass(this.box,"vjs-playing");
_V_.addClass(this.box,"vjs-paused");
}});
_57f.player.newBehavior("poster",function(_5bf){
this.activateElement(_5bf,"mouseOverVideoReporter");
this.activateElement(_5bf,"playButton");
this.onPlay(this.hidePoster);
this.onEnded(this.showPoster);
this.onResize(this.positionPoster);
},{showPoster:function(){
if(!this.poster){
return;
}
this.poster.style.display="block";
this.positionPoster();
},positionPoster:function(){
if(!this.poster||this.poster.style.display=="none"){
return;
}
this.poster.style.height=this.height()+"px";
this.poster.style.width=this.width()+"px";
},hidePoster:function(){
if(!this.poster){
return;
}
this.poster.style.display="none";
},updatePosterSource:function(){
if(!this.video.poster){
var _5c0=this.video.getElementsByTagName("img");
if(_5c0.length>0){
this.video.poster=_5c0[0].src;
}
}
}});
_57f.player.newBehavior("controlBar",function(_5c1){
if(!this.controlBars){
this.controlBars=[];
this.onResize(this.positionControlBars);
}
this.controlBars.push(_5c1);
_V_.addListener(_5c1,"mousemove",this.onControlBarsMouseMove.context(this));
_V_.addListener(_5c1,"mouseout",this.onControlBarsMouseOut.context(this));
},{showControlBars:function(){
if(!this.options.controlsAtStart&&!this.hasPlayed){
return;
}
this.each(this.controlBars,function(bar){
bar.style.display="block";
});
},positionControlBars:function(){
this.updatePlayProgressBars();
this.updateLoadProgressBars();
},hideControlBars:function(){
if(this.options.controlsHiding&&!this.mouseIsOverControls){
this.each(this.controlBars,function(bar){
bar.style.display="none";
});
}
},onControlBarsMouseMove:function(){
this.mouseIsOverControls=true;
},onControlBarsMouseOut:function(_5c2){
this.mouseIsOverControls=false;
}});
_57f.player.newBehavior("playToggle",function(_5c3){
if(!this.elements.playToggles){
this.elements.playToggles=[];
this.onPlay(this.playTogglesOnPlay);
this.onPause(this.playTogglesOnPause);
}
this.elements.playToggles.push(_5c3);
_V_.addListener(_5c3,"click",this.onPlayToggleClick.context(this));
},{onPlayToggleClick:function(_5c4){
if(this.paused()){
this.play();
}else{
this.pause();
}
},playTogglesOnPlay:function(_5c5){
this.each(this.elements.playToggles,function(_5c6){
_V_.removeClass(_5c6,"vjs-paused");
_V_.addClass(_5c6,"vjs-playing");
});
},playTogglesOnPause:function(_5c7){
this.each(this.elements.playToggles,function(_5c8){
_V_.removeClass(_5c8,"vjs-playing");
_V_.addClass(_5c8,"vjs-paused");
});
}});
_57f.player.newBehavior("playButton",function(_5c9){
_V_.addListener(_5c9,"click",this.onPlayButtonClick.context(this));
},{onPlayButtonClick:function(_5ca){
this.play();
}});
_57f.player.newBehavior("pauseButton",function(_5cb){
_V_.addListener(_5cb,"click",this.onPauseButtonClick.context(this));
},{onPauseButtonClick:function(_5cc){
this.pause();
}});
_57f.player.newBehavior("playProgressBar",function(_5cd){
if(!this.playProgressBars){
this.playProgressBars=[];
this.onCurrentTimeUpdate(this.updatePlayProgressBars);
}
this.playProgressBars.push(_5cd);
},{updatePlayProgressBars:function(_5ce){
var _5cf=(_5ce!==_578)?_5ce/this.duration():this.currentTime()/this.duration();
if(isNaN(_5cf)){
_5cf=0;
}
this.each(this.playProgressBars,function(bar){
if(bar.style){
bar.style.width=_V_.round(_5cf*100,2)+"%";
}
});
}});
_57f.player.newBehavior("loadProgressBar",function(_5d0){
if(!this.loadProgressBars){
this.loadProgressBars=[];
}
this.loadProgressBars.push(_5d0);
this.onBufferedUpdate(this.updateLoadProgressBars);
},{updateLoadProgressBars:function(){
this.each(this.loadProgressBars,function(bar){
if(bar.style){
bar.style.width=_V_.round(this.bufferedPercent()*100,2)+"%";
}
});
}});
_57f.player.newBehavior("currentTimeDisplay",function(_5d1){
if(!this.currentTimeDisplays){
this.currentTimeDisplays=[];
this.onCurrentTimeUpdate(this.updateCurrentTimeDisplays);
}
this.currentTimeDisplays.push(_5d1);
},{updateCurrentTimeDisplays:function(_5d2){
if(!this.currentTimeDisplays){
return;
}
var time=(_5d2)?_5d2:this.currentTime();
this.each(this.currentTimeDisplays,function(dis){
dis.innerHTML=_V_.formatTime(time);
});
}});
_57f.player.newBehavior("durationDisplay",function(_5d3){
if(!this.durationDisplays){
this.durationDisplays=[];
this.onCurrentTimeUpdate(this.updateDurationDisplays);
}
this.durationDisplays.push(_5d3);
},{updateDurationDisplays:function(){
if(!this.durationDisplays){
return;
}
this.each(this.durationDisplays,function(dis){
if(this.duration()){
dis.innerHTML=_V_.formatTime(this.duration());
}
});
}});
_57f.player.newBehavior("currentTimeScrubber",function(_5d4){
_V_.addListener(_5d4,"mousedown",this.onCurrentTimeScrubberMouseDown.rEvtContext(this));
},{onCurrentTimeScrubberMouseDown:function(_5d5,_5d6){
_5d5.preventDefault();
this.currentScrubber=_5d6;
this.stopTrackingCurrentTime();
this.videoWasPlaying=!this.paused();
this.pause();
_V_.blockTextSelection();
this.setCurrentTimeWithScrubber(_5d5);
_V_.addListener(_579,"mousemove",this.onCurrentTimeScrubberMouseMove.rEvtContext(this));
_V_.addListener(_579,"mouseup",this.onCurrentTimeScrubberMouseUp.rEvtContext(this));
},onCurrentTimeScrubberMouseMove:function(_5d7){
this.setCurrentTimeWithScrubber(_5d7);
},onCurrentTimeScrubberMouseUp:function(_5d8){
_V_.unblockTextSelection();
_579.removeEventListener("mousemove",this.onCurrentTimeScrubberMouseMove,false);
_579.removeEventListener("mouseup",this.onCurrentTimeScrubberMouseUp,false);
if(this.videoWasPlaying){
this.play();
this.trackCurrentTime();
}
},setCurrentTimeWithScrubber:function(_5d9){
var _5da=_V_.getRelativePosition(_5d9.pageX,this.currentScrubber);
var _5db=_5da*this.duration();
this.triggerCurrentTimeListeners(0,_5db);
if(_5db==this.duration()){
_5db=_5db-0.1;
}
this.currentTime(_5db);
}});
_57f.player.newBehavior("volumeDisplay",function(_5dc){
if(!this.volumeDisplays){
this.volumeDisplays=[];
this.onVolumeChange(this.updateVolumeDisplays);
}
this.volumeDisplays.push(_5dc);
this.updateVolumeDisplay(_5dc);
},{updateVolumeDisplays:function(){
if(!this.volumeDisplays){
return;
}
this.each(this.volumeDisplays,function(dis){
this.updateVolumeDisplay(dis);
});
},updateVolumeDisplay:function(_5dd){
var _5de=Math.ceil(this.volume()*6);
this.each(_5dd.children,function(_5df,num){
if(num<_5de){
_V_.addClass(_5df,"vjs-volume-level-on");
}else{
_V_.removeClass(_5df,"vjs-volume-level-on");
}
});
}});
_57f.player.newBehavior("volumeScrubber",function(_5e0){
_V_.addListener(_5e0,"mousedown",this.onVolumeScrubberMouseDown.rEvtContext(this));
},{onVolumeScrubberMouseDown:function(_5e1,_5e2){
_V_.blockTextSelection();
this.currentScrubber=_5e2;
this.setVolumeWithScrubber(_5e1);
_V_.addListener(_579,"mousemove",this.onVolumeScrubberMouseMove.rEvtContext(this));
_V_.addListener(_579,"mouseup",this.onVolumeScrubberMouseUp.rEvtContext(this));
},onVolumeScrubberMouseMove:function(_5e3){
this.setVolumeWithScrubber(_5e3);
},onVolumeScrubberMouseUp:function(_5e4){
this.setVolumeWithScrubber(_5e4);
_V_.unblockTextSelection();
_579.removeEventListener("mousemove",this.onVolumeScrubberMouseMove,false);
_579.removeEventListener("mouseup",this.onVolumeScrubberMouseUp,false);
},setVolumeWithScrubber:function(_5e5){
var _5e6=_V_.getRelativePosition(_5e5.pageX,this.currentScrubber);
this.volume(_5e6);
}});
_57f.player.newBehavior("fullscreenToggle",function(_5e7){
_V_.addListener(_5e7,"click",this.onFullscreenToggleClick.context(this));
},{onFullscreenToggleClick:function(_5e8){
if(!this.videoIsFullScreen){
this.enterFullScreen();
}else{
this.exitFullScreen();
}
},fullscreenOnWindowResize:function(_5e9){
this.positionControlBars();
},fullscreenOnEscKey:function(_5ea){
if(_5ea.keyCode==27){
this.exitFullScreen();
}
}});
_57f.player.newBehavior("bigPlayButton",function(_5eb){
if(!this.elements.bigPlayButtons){
this.elements.bigPlayButtons=[];
this.onPlay(this.bigPlayButtonsOnPlay);
this.onEnded(this.bigPlayButtonsOnEnded);
}
this.elements.bigPlayButtons.push(_5eb);
this.activateElement(_5eb,"playButton");
},{bigPlayButtonsOnPlay:function(_5ec){
this.hideBigPlayButtons();
},bigPlayButtonsOnEnded:function(_5ed){
this.showBigPlayButtons();
},showBigPlayButtons:function(){
this.each(this.elements.bigPlayButtons,function(_5ee){
_5ee.style.display="block";
});
},hideBigPlayButtons:function(){
this.each(this.elements.bigPlayButtons,function(_5ef){
_5ef.style.display="none";
});
}});
_57f.player.newBehavior("spinner",function(_5f0){
if(!this.spinners){
this.spinners=[];
_V_.addListener(this.video,"loadeddata",this.spinnersOnVideoLoadedData.context(this));
_V_.addListener(this.video,"seeking",this.spinnersOnVideoSeeking.context(this));
_V_.addListener(this.video,"seeked",this.spinnersOnVideoSeeked.context(this));
_V_.addListener(this.video,"canplay",this.spinnersOnVideoCanPlay.context(this));
_V_.addListener(this.video,"canplaythrough",this.spinnersOnVideoCanPlayThrough.context(this));
_V_.addListener(this.video,"waiting",this.spinnersOnVideoWaiting.context(this));
_V_.addListener(this.video,"stalled",this.spinnersOnVideoStalled.context(this));
_V_.addListener(this.video,"suspend",this.spinnersOnVideoSuspend.context(this));
_V_.addListener(this.video,"playing",this.spinnersOnVideoPlaying.context(this));
_V_.addListener(this.video,"timeupdate",this.spinnersOnVideoTimeUpdate.context(this));
}
this.spinners.push(_5f0);
},{showSpinners:function(){
this.each(this.spinners,function(_5f1){
_5f1.style.display="block";
});
clearInterval(this.spinnerInterval);
this.spinnerInterval=setInterval(this.rotateSpinners.context(this),100);
},hideSpinners:function(){
this.each(this.spinners,function(_5f2){
_5f2.style.display="none";
});
clearInterval(this.spinnerInterval);
},spinnersRotated:0,rotateSpinners:function(){
this.each(this.spinners,function(_5f3){
_5f3.style.WebkitTransform="scale(0.5) rotate("+this.spinnersRotated+"deg)";
_5f3.style.MozTransform="scale(0.5) rotate("+this.spinnersRotated+"deg)";
});
if(this.spinnersRotated==360){
this.spinnersRotated=0;
}
this.spinnersRotated+=45;
},spinnersOnVideoLoadedData:function(_5f4){
this.hideSpinners();
},spinnersOnVideoLoadStart:function(_5f5){
this.showSpinners();
},spinnersOnVideoSeeking:function(_5f6){
},spinnersOnVideoSeeked:function(_5f7){
},spinnersOnVideoCanPlay:function(_5f8){
},spinnersOnVideoCanPlayThrough:function(_5f9){
this.hideSpinners();
},spinnersOnVideoWaiting:function(_5fa){
this.showSpinners();
},spinnersOnVideoStalled:function(_5fb){
},spinnersOnVideoSuspend:function(_5fc){
},spinnersOnVideoPlaying:function(_5fd){
this.hideSpinners();
},spinnersOnVideoTimeUpdate:function(_5fe){
if(this.spinner.style.display=="block"){
this.hideSpinners();
}
}});
_57f.player.newBehavior("subtitlesDisplay",function(_5ff){
if(!this.subtitleDisplays){
this.subtitleDisplays=[];
this.onCurrentTimeUpdate(this.subtitleDisplaysOnVideoTimeUpdate);
this.onEnded(function(){
this.lastSubtitleIndex=0;
}.context(this));
}
this.subtitleDisplays.push(_5ff);
},{subtitleDisplaysOnVideoTimeUpdate:function(time){
if(this.subtitles){
if(!this.currentSubtitle||this.currentSubtitle.start>=time||this.currentSubtitle.end<time){
var _600=false,_601=(this.subtitles[this.lastSubtitleIndex].start>time),i=this.lastSubtitleIndex-(_601)?1:0;
while(true){
if(_601){
if(i<0||this.subtitles[i].end<time){
break;
}
if(this.subtitles[i].start<time){
_600=i;
break;
}
i--;
}else{
if(i>=this.subtitles.length||this.subtitles[i].start>time){
break;
}
if(this.subtitles[i].end>time){
_600=i;
break;
}
i++;
}
}
if(_600!==false){
this.currentSubtitle=this.subtitles[_600];
this.lastSubtitleIndex=_600;
this.updateSubtitleDisplays(this.currentSubtitle.text);
}else{
if(this.currentSubtitle){
this.currentSubtitle=false;
this.updateSubtitleDisplays("");
}
}
}
}
},updateSubtitleDisplays:function(val){
this.each(this.subtitleDisplays,function(disp){
disp.innerHTML=val;
});
}});
_57f.extend({addClass:function(_602,_603){
if((" "+_602.className+" ").indexOf(" "+_603+" ")==-1){
_602.className=_602.className===""?_603:_602.className+" "+_603;
}
},removeClass:function(_604,_605){
if(_604.className.indexOf(_605)==-1){
return;
}
var _606=_604.className.split(/\s+/);
_606.splice(_606.lastIndexOf(_605),1);
_604.className=_606.join(" ");
},createElement:function(_607,_608){
return this.merge(_579.createElement(_607),_608);
},blockTextSelection:function(){
_579.body.focus();
_579.onselectstart=function(){
return false;
};
},unblockTextSelection:function(){
_579.onselectstart=function(){
return true;
};
},formatTime:function(secs){
var _609=Math.round(secs);
var _60a=Math.floor(_609/60);
_60a=(_60a>=10)?_60a:"0"+_60a;
_609=Math.floor(_609%60);
_609=(_609>=10)?_609:"0"+_609;
return _60a+":"+_609;
},getRelativePosition:function(x,_60b){
return Math.max(0,Math.min(1,(x-this.findPosX(_60b))/_60b.offsetWidth));
},findPosX:function(obj){
var _60c=obj.offsetLeft;
while(obj=obj.offsetParent){
_60c+=obj.offsetLeft;
}
return _60c;
},getComputedStyleValue:function(_60d,_60e){
return _577.getComputedStyle(_60d,null).getPropertyValue(_60e);
},round:function(num,dec){
if(!dec){
dec=0;
}
return Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
},addListener:function(_60f,type,_610){
if(_60f.addEventListener){
_60f.addEventListener(type,_610,false);
}else{
if(_60f.attachEvent){
_60f.attachEvent("on"+type,_610);
}
}
},removeListener:function(_611,type,_612){
if(_611.removeEventListener){
_611.removeEventListener(type,_612,false);
}else{
if(_611.attachEvent){
_611.detachEvent("on"+type,_612);
}
}
},get:function(url,_613){
if(typeof XMLHttpRequest=="undefined"){
XMLHttpRequest=function(){
try{
return new ActiveXObject("Msxml2.XMLHTTP.6.0");
}
catch(e){
}
try{
return new ActiveXObject("Msxml2.XMLHTTP.3.0");
}
catch(f){
}
try{
return new ActiveXObject("Msxml2.XMLHTTP");
}
catch(g){
}
throw new Error("This browser does not support XMLHttpRequest.");
};
}
var _614=new XMLHttpRequest();
_614.open("GET",url);
_614.onreadystatechange=function(){
if(_614.readyState==4&&_614.status==200){
_613(_614.responseText);
}
}.context(this);
_614.send();
},trim:function(_615){
return _615.toString().replace(/^\s+/,"").replace(/\s+$/,"");
},bindDOMReady:function(){
if(_579.readyState==="complete"){
return _57f.onDOMReady();
}
if(_579.addEventListener){
_579.addEventListener("DOMContentLoaded",_57f.DOMContentLoaded,false);
_577.addEventListener("load",_57f.onDOMReady,false);
}else{
if(_579.attachEvent){
_579.attachEvent("onreadystatechange",_57f.DOMContentLoaded);
_577.attachEvent("onload",_57f.onDOMReady);
}
}
},DOMContentLoaded:function(){
if(_579.addEventListener){
_579.removeEventListener("DOMContentLoaded",_57f.DOMContentLoaded,false);
_57f.onDOMReady();
}else{
if(_579.attachEvent){
if(_579.readyState==="complete"){
_579.detachEvent("onreadystatechange",_57f.DOMContentLoaded);
_57f.onDOMReady();
}
}
}
},DOMReadyList:[],addToDOMReady:function(fn){
if(_57f.DOMIsReady){
fn.call(_579);
}else{
_57f.DOMReadyList.push(fn);
}
},DOMIsReady:false,onDOMReady:function(){
if(_57f.DOMIsReady){
return;
}
if(!_579.body){
return setTimeout(_57f.onDOMReady,13);
}
_57f.DOMIsReady=true;
if(_57f.DOMReadyList){
for(var i=0;i<_57f.DOMReadyList.length;i++){
_57f.DOMReadyList[i].call(_579);
}
_57f.DOMReadyList=null;
}
}});
_57f.bindDOMReady();
Function.prototype.context=function(obj){
var _616=this,temp=function(){
return _616.apply(obj,arguments);
};
return temp;
};
Function.prototype.evtContext=function(obj){
var _617=this,temp=function(){
var _618=this;
return _617.call(obj,arguments[0],_618);
};
return temp;
};
Function.prototype.rEvtContext=function(obj,_619){
if(this.hasContext===true){
return this;
}
if(!_619){
_619=obj;
}
for(var _61a in _619){
if(_619[_61a]==this){
_619[_61a]=this.evtContext(obj);
_619[_61a].hasContext=true;
return _619[_61a];
}
}
return this.evtContext(obj);
};
if(_577.jQuery){
(function($){
$.fn.VideoJS=function(_61b){
this.each(function(){
_57f.setup(this,_61b);
});
return this;
};
$.fn.player=function(){
return this[0].player;
};
})(jQuery);
}
_577.VideoJS=_577._V_=_57f;
})(window);
jq.extend(VideoJS.prototype,{getSize:function(){
if(jq(".video_row").size()>0||jq(this.box).parents(".insert_row").size()>0){
return "small";
}else{
return "big";
}
},trackUsage:function(_61c){
var _61d=((_61c/15)|0)*15;
if(this.lastLoggedOffset!=_61d&&!this.paused()){
var _61e=this.video.id.replace("hp_video_","");
var ajax=new Ajax.Request("/xml/videoWatch.php",{method:"get",parameters:"offset="+_61d+"&videoId="+_61e+"&rf="+escape(document.referrer)});
this.lastLoggedOffset=_61d;
}
},buildAndActivateControlBar:function(){
this.onCurrentTimeUpdate(this.trackUsage);
if(this.getSize()=="big"){
this.buildBigController();
}else{
if(this.getSize()=="small"){
this.buildSmallController();
}else{
alert("unknown size for video controls");
}
}
},buildSmallController:function(){
this.controls=_V_.createElement("div",{className:"vjs-controls"});
this.box.appendChild(this.controls);
this.activateElement(this.controls,"controlBar");
this.activateElement(this.controls,"mouseOverVideoReporter");
this.playControl=_V_.createElement("div",{className:"vjs-play-control",innerHTML:"<span></span>"});
this.controls.appendChild(this.playControl);
this.activateElement(this.playControl,"playToggle");
this.progressControl=_V_.createElement("div",{className:"vjs-progress-control"});
this.progressHolder=_V_.createElement("div",{className:"vjs-progress-holder"});
this.progressControl.appendChild(this.progressHolder);
this.activateElement(this.progressHolder,"currentTimeScrubber");
this.loadProgressBar=_V_.createElement("div",{className:"vjs-load-progress"});
this.progressHolder.appendChild(this.loadProgressBar);
this.activateElement(this.loadProgressBar,"loadProgressBar");
this.playProgressBar=_V_.createElement("div",{className:"vjs-play-progress"});
this.progressHolder.appendChild(this.playProgressBar);
this.activateElement(this.playProgressBar,"playProgressBar");
this.timeControl=_V_.createElement("div",{className:"vjs-time-control"});
this.currentTimeDisplay=_V_.createElement("span",{className:"vjs-current-time-display",innerHTML:"00:00"});
this.timeControl.appendChild(this.currentTimeDisplay);
this.activateElement(this.currentTimeDisplay,"currentTimeDisplay");
this.timeSeparator=_V_.createElement("span",{innerHTML:" / "});
this.timeControl.appendChild(this.timeSeparator);
this.durationDisplay=_V_.createElement("span",{className:"vjs-duration-display",innerHTML:"00:00"});
this.timeControl.appendChild(this.durationDisplay);
this.activateElement(this.durationDisplay,"durationDisplay");
this.volumeControl=_V_.createElement("div",{className:"vjs-volume-control",innerHTML:"<div><span></span><span></span><span></span><span></span><span></span><span></span></div>"});
this.activateElement(this.volumeControl,"volumeScrubber");
this.volumeDisplay=this.volumeControl.children[0];
this.activateElement(this.volumeDisplay,"volumeDisplay");
this.fullscreenControl=_V_.createElement("div",{className:"vjs-fullscreen-control",innerHTML:"<div><span></span><span></span><span></span><span></span></div>"});
this.activateElement(this.fullscreenControl,"fullscreenToggle");
},buildBigController:function(){
this.controls=_V_.createElement("div",{className:"vjs-controls"});
this.box.appendChild(this.controls);
this.activateElement(this.controls,"controlBar");
this.activateElement(this.controls,"mouseOverVideoReporter");
this.playControl=_V_.createElement("div",{className:"vjs-play-control",innerHTML:"<span></span>"});
this.controls.appendChild(this.playControl);
this.activateElement(this.playControl,"playToggle");
this.progressControl=_V_.createElement("div",{className:"vjs-progress-control"});
this.controls.appendChild(this.progressControl);
this.progressHolder=_V_.createElement("div",{className:"vjs-progress-holder"});
this.progressControl.appendChild(this.progressHolder);
this.activateElement(this.progressHolder,"currentTimeScrubber");
this.loadProgressBar=_V_.createElement("div",{className:"vjs-load-progress"});
this.progressHolder.appendChild(this.loadProgressBar);
this.activateElement(this.loadProgressBar,"loadProgressBar");
this.playProgressBar=_V_.createElement("div",{className:"vjs-play-progress"});
this.progressHolder.appendChild(this.playProgressBar);
this.activateElement(this.playProgressBar,"playProgressBar");
this.timeControl=_V_.createElement("div",{className:"vjs-time-control"});
this.controls.appendChild(this.timeControl);
this.currentTimeDisplay=_V_.createElement("span",{className:"vjs-current-time-display",innerHTML:"00:00"});
this.timeControl.appendChild(this.currentTimeDisplay);
this.activateElement(this.currentTimeDisplay,"currentTimeDisplay");
this.timeSeparator=_V_.createElement("span",{innerHTML:" / "});
this.timeControl.appendChild(this.timeSeparator);
this.durationDisplay=_V_.createElement("span",{className:"vjs-duration-display",innerHTML:"00:00"});
this.timeControl.appendChild(this.durationDisplay);
this.activateElement(this.durationDisplay,"durationDisplay");
this.volumeControl=_V_.createElement("div",{className:"vjs-volume-control",innerHTML:"<div><span></span><span></span><span></span><span></span><span></span><span></span></div>"});
this.controls.appendChild(this.volumeControl);
this.activateElement(this.volumeControl,"volumeScrubber");
this.volumeDisplay=this.volumeControl.children[0];
this.activateElement(this.volumeDisplay,"volumeDisplay");
this.fullscreenControl=_V_.createElement("div",{className:"vjs-fullscreen-control",innerHTML:"<div><span></span><span></span><span></span><span></span></div>"});
this.controls.appendChild(this.fullscreenControl);
this.activateElement(this.fullscreenControl,"fullscreenToggle");
},buildBigPlayButton:function(){
this.bigPlayButton=_V_.createElement("div",{className:"vjs-"+this.getSize()+"-play-button",innerHTML:"<span></span>"});
this.box.appendChild(this.bigPlayButton);
this.activateElement(this.bigPlayButton,"bigPlayButton");
},fixAutoplay:function(){
if(this.options.autoplay&&this.paused){
this.play();
}
}});
eval(function(p,a,c,k,e,d){
e=function(c){
return (c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36));
};
if(!"".replace(/^/,String)){
while(c--){
d[e(c)]=k[c]||e(c);
}
k=[function(e){
return d[e];
}];
e=function(){
return "\\w+";
};
c=1;
}
while(c--){
if(k[c]){
p=p.replace(new RegExp("\\b"+e(c)+"\\b","g"),k[c]);
}
}
return p;
}("K M;I(M)1S 2U(\"2a't 4k M 4K 2g 3l 4G 4H\");(6(){6 r(f,e){I(!M.1R(f))1S 3m(\"3s 15 4R\");K a=f.1w;f=M(f.1m,t(f)+(e||\"\"));I(a)f.1w={1m:a.1m,19:a.19?a.19.1a(0):N};H f}6 t(f){H(f.1J?\"g\":\"\")+(f.4s?\"i\":\"\")+(f.4p?\"m\":\"\")+(f.4v?\"x\":\"\")+(f.3n?\"y\":\"\")}6 B(f,e,a,b){K c=u.L,d,h,g;v=R;5K{O(;c--;){g=u[c];I(a&g.3r&&(!g.2p||g.2p.W(b))){g.2q.12=e;I((h=g.2q.X(f))&&h.P===e){d={3k:g.2b.W(b,h,a),1C:h};1N}}}}5v(i){1S i}5q{v=11}H d}6 p(f,e,a){I(3b.Z.1i)H f.1i(e,a);O(a=a||0;a<f.L;a++)I(f[a]===e)H a;H-1}M=6(f,e){K a=[],b=M.1B,c=0,d,h;I(M.1R(f)){I(e!==1d)1S 3m(\"2a't 5r 5I 5F 5B 5C 15 5E 5p\");H r(f)}I(v)1S 2U(\"2a't W 3l M 59 5m 5g 5x 5i\");e=e||\"\";O(d={2N:11,19:[],2K:6(g){H e.1i(g)>-1},3d:6(g){e+=g}};c<f.L;)I(h=B(f,c,b,d)){a.U(h.3k);c+=h.1C[0].L||1}Y I(h=n.X.W(z[b],f.1a(c))){a.U(h[0]);c+=h[0].L}Y{h=f.3a(c);I(h===\"[\")b=M.2I;Y I(h===\"]\")b=M.1B;a.U(h);c++}a=15(a.1K(\"\"),n.Q.W(e,w,\"\"));a.1w={1m:f,19:d.2N?d.19:N};H a};M.3v=\"1.5.0\";M.2I=1;M.1B=2;K C=/\\$(?:(\\d\\d?|[$&`'])|{([$\\w]+)})/g,w=/[^5h]+|([\\s\\S])(?=[\\s\\S]*\\1)/g,A=/^(?:[?*+]|{\\d+(?:,\\d*)?})\\??/,v=11,u=[],n={X:15.Z.X,1A:15.Z.1A,1C:1r.Z.1C,Q:1r.Z.Q,1e:1r.Z.1e},x=n.X.W(/()??/,\"\")[1]===1d,D=6(){K f=/^/g;n.1A.W(f,\"\");H!f.12}(),y=6(){K f=/x/g;n.Q.W(\"x\",f,\"\");H!f.12}(),E=15.Z.3n!==1d,z={};z[M.2I]=/^(?:\\\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\\29-26-f]{2}|u[\\29-26-f]{4}|c[A-3o-z]|[\\s\\S]))/;z[M.1B]=/^(?:\\\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\\d*|x[\\29-26-f]{2}|u[\\29-26-f]{4}|c[A-3o-z]|[\\s\\S])|\\(\\?[:=!]|[?*+]\\?|{\\d+(?:,\\d*)?}\\??)/;M.1h=6(f,e,a,b){u.U({2q:r(f,\"g\"+(E?\"y\":\"\")),2b:e,3r:a||M.1B,2p:b||N})};M.2n=6(f,e){K a=f+\"/\"+(e||\"\");H M.2n[a]||(M.2n[a]=M(f,e))};M.3c=6(f){H r(f,\"g\")};M.5l=6(f){H f.Q(/[-[\\]{}()*+?.,\\\\^$|#\\s]/g,\"\\\\$&\")};M.5e=6(f,e,a,b){e=r(e,\"g\"+(b&&E?\"y\":\"\"));e.12=a=a||0;f=e.X(f);H b?f&&f.P===a?f:N:f};M.3q=6(){M.1h=6(){1S 2U(\"2a't 55 1h 54 3q\")}};M.1R=6(f){H 53.Z.1q.W(f)===\"[2m 15]\"};M.3p=6(f,e,a,b){O(K c=r(e,\"g\"),d=-1,h;h=c.X(f);){a.W(b,h,++d,f,c);c.12===h.P&&c.12++}I(e.1J)e.12=0};M.57=6(f,e){H 6 a(b,c){K d=e[c].1I?e[c]:{1I:e[c]},h=r(d.1I,\"g\"),g=[],i;O(i=0;i<b.L;i++)M.3p(b[i],h,6(k){g.U(d.3j?k[d.3j]||\"\":k[0])});H c===e.L-1||!g.L?g:a(g,c+1)}([f],0)};15.Z.1p=6(f,e){H J.X(e[0])};15.Z.W=6(f,e){H J.X(e)};15.Z.X=6(f){K e=n.X.1p(J,14),a;I(e){I(!x&&e.L>1&&p(e,\"\")>-1){a=15(J.1m,n.Q.W(t(J),\"g\",\"\"));n.Q.W(f.1a(e.P),a,6(){O(K c=1;c<14.L-2;c++)I(14[c]===1d)e[c]=1d})}I(J.1w&&J.1w.19)O(K b=1;b<e.L;b++)I(a=J.1w.19[b-1])e[a]=e[b];!D&&J.1J&&!e[0].L&&J.12>e.P&&J.12--}H e};I(!D)15.Z.1A=6(f){(f=n.X.W(J,f))&&J.1J&&!f[0].L&&J.12>f.P&&J.12--;H!!f};1r.Z.1C=6(f){M.1R(f)||(f=15(f));I(f.1J){K e=n.1C.1p(J,14);f.12=0;H e}H f.X(J)};1r.Z.Q=6(f,e){K a=M.1R(f),b,c;I(a&&1j e.58()===\"3f\"&&e.1i(\"${\")===-1&&y)H n.Q.1p(J,14);I(a){I(f.1w)b=f.1w.19}Y f+=\"\";I(1j e===\"6\")c=n.Q.W(J,f,6(){I(b){14[0]=1f 1r(14[0]);O(K d=0;d<b.L;d++)I(b[d])14[0][b[d]]=14[d+1]}I(a&&f.1J)f.12=14[14.L-2]+14[0].L;H e.1p(N,14)});Y{c=J+\"\";c=n.Q.W(c,f,6(){K d=14;H n.Q.W(e,C,6(h,g,i){I(g)5b(g){24\"$\":H\"$\";24\"&\":H d[0];24\"`\":H d[d.L-1].1a(0,d[d.L-2]);24\"'\":H d[d.L-1].1a(d[d.L-2]+d[0].L);5a:i=\"\";g=+g;I(!g)H h;O(;g>d.L-3;){i=1r.Z.1a.W(g,-1)+i;g=1Q.3i(g/10)}H(g?d[g]||\"\":\"$\")+i}Y{g=+i;I(g<=d.L-3)H d[g];g=b?p(b,i):-1;H g>-1?d[g+1]:h}})})}I(a&&f.1J)f.12=0;H c};1r.Z.1e=6(f,e){I(!M.1R(f))H n.1e.1p(J,14);K a=J+\"\",b=[],c=0,d,h;I(e===1d||+e<0)e=5D;Y{e=1Q.3i(+e);I(!e)H[]}O(f=M.3c(f);d=f.X(a);){I(f.12>c){b.U(a.1a(c,d.P));d.L>1&&d.P<a.L&&3b.Z.U.1p(b,d.1a(1));h=d[0].L;c=f.12;I(b.L>=e)1N}f.12===d.P&&f.12++}I(c===a.L){I(!n.1A.W(f,\"\")||h)b.U(\"\")}Y b.U(a.1a(c));H b.L>e?b.1a(0,e):b};M.1h(/\\(\\?#[^)]*\\)/,6(f){H n.1A.W(A,f.2S.1a(f.P+f[0].L))?\"\":\"(?:)\"});M.1h(/\\((?!\\?)/,6(){J.19.U(N);H\"(\"});M.1h(/\\(\\?<([$\\w]+)>/,6(f){J.19.U(f[1]);J.2N=R;H\"(\"});M.1h(/\\\\k<([\\w$]+)>/,6(f){K e=p(J.19,f[1]);H e>-1?\"\\\\\"+(e+1)+(3R(f.2S.3a(f.P+f[0].L))?\"\":\"(?:)\"):f[0]});M.1h(/\\[\\^?]/,6(f){H f[0]===\"[]\"?\"\\\\b\\\\B\":\"[\\\\s\\\\S]\"});M.1h(/^\\(\\?([5A]+)\\)/,6(f){J.3d(f[1]);H\"\"});M.1h(/(?:\\s+|#.*)+/,6(f){H n.1A.W(A,f.2S.1a(f.P+f[0].L))?\"\":\"(?:)\"},M.1B,6(){H J.2K(\"x\")});M.1h(/\\./,6(){H\"[\\\\s\\\\S]\"},M.1B,6(){H J.2K(\"s\")})})();1j 2e!=\"1d\"&&(2e.M=M);K 1v=6(){6 r(a,b){a.1l.1i(b)!=-1||(a.1l+=\" \"+b)}6 t(a){H a.1i(\"3e\")==0?a:\"3e\"+a}6 B(a){H e.1Y.2A[t(a)]}6 p(a,b,c){I(a==N)H N;K d=c!=R?a.3G:[a.2G],h={\"#\":\"1c\",\".\":\"1l\"}[b.1o(0,1)]||\"3h\",g,i;g=h!=\"3h\"?b.1o(1):b.5u();I((a[h]||\"\").1i(g)!=-1)H a;O(a=0;d&&a<d.L&&i==N;a++)i=p(d[a],b,c);H i}6 C(a,b){K c={},d;O(d 2g a)c[d]=a[d];O(d 2g b)c[d]=b[d];H c}6 w(a,b,c,d){6 h(g){g=g||1P.5y;I(!g.1F){g.1F=g.52;g.3N=6(){J.5w=11}}c.W(d||1P,g)}a.3g?a.3g(\"4U\"+b,h):a.4y(b,h,11)}6 A(a,b){K c=e.1Y.2j,d=N;I(c==N){c={};O(K h 2g e.1U){K g=e.1U[h];d=g.4x;I(d!=N){g.1V=h.4w();O(g=0;g<d.L;g++)c[d[g]]=h}}e.1Y.2j=c}d=e.1U[c[a]];d==N&&b!=11&&1P.1X(e.13.1x.1X+(e.13.1x.3E+a));H d}6 v(a,b){O(K c=a.1e(\"\\n\"),d=0;d<c.L;d++)c[d]=b(c[d],d);H c.1K(\"\\n\")}6 u(a,b){I(a==N||a.L==0||a==\"\\n\")H a;a=a.Q(/</g,\"&1y;\");a=a.Q(/ {2,}/g,6(c){O(K d=\"\",h=0;h<c.L-1;h++)d+=e.13.1W;H d+\" \"});I(b!=N)a=v(a,6(c){I(c.L==0)H\"\";K d=\"\";c=c.Q(/^(&2s;| )+/,6(h){d=h;H\"\"});I(c.L==0)H d;H d+'<17 1g=\"'+b+'\">'+c+\"</17>\"});H a}6 n(a,b){a.1e(\"\\n\");O(K c=\"\",d=0;d<50;d++)c+=\"                    \";H a=v(a,6(h){I(h.1i(\"\\t\")==-1)H h;O(K g=0;(g=h.1i(\"\\t\"))!=-1;)h=h.1o(0,g)+c.1o(0,b-g%b)+h.1o(g+1,h.L);H h})}6 x(a){H a.Q(/^\\s+|\\s+$/g,\"\")}6 D(a,b){I(a.P<b.P)H-1;Y I(a.P>b.P)H 1;Y I(a.L<b.L)H-1;Y I(a.L>b.L)H 1;H 0}6 y(a,b){6 c(k){H k[0]}O(K d=N,h=[],g=b.2D?b.2D:c;(d=b.1I.X(a))!=N;){K i=g(d,b);I(1j i==\"3f\")i=[1f e.2L(i,d.P,b.23)];h=h.1O(i)}H h}6 E(a){K b=/(.*)((&1G;|&1y;).*)/;H a.Q(e.3A.3M,6(c){K d=\"\",h=N;I(h=b.X(c)){c=h[1];d=h[2]}H'<a 2h=\"'+c+'\">'+c+\"</a>\"+d})}6 z(){O(K a=1E.36(\"1k\"),b=[],c=0;c<a.L;c++)a[c].3s==\"20\"&&b.U(a[c]);H b}6 f(a){a=a.1F;K b=p(a,\".20\",R);a=p(a,\".3O\",R);K c=1E.4i(\"3t\");I(!(!a||!b||p(a,\"3t\"))){B(b.1c);r(b,\"1m\");O(K d=a.3G,h=[],g=0;g<d.L;g++)h.U(d[g].4z||d[g].4A);h=h.1K(\"\\r\");c.39(1E.4D(h));a.39(c);c.2C();c.4C();w(c,\"4u\",6(){c.2G.4E(c);b.1l=b.1l.Q(\"1m\",\"\")})}}I(1j 3F!=\"1d\"&&1j M==\"1d\")M=3F(\"M\").M;K e={2v:{\"1g-27\":\"\",\"2i-1s\":1,\"2z-1s-2t\":11,1M:N,1t:N,\"42-45\":R,\"43-22\":4,1u:R,16:R,\"3V-17\":R,2l:11,\"41-40\":R,2k:11,\"1z-1k\":11},13:{1W:\"&2s;\",2M:R,46:11,44:11,34:\"4n\",1x:{21:\"4o 1m\",2P:\"?\",1X:\"1v\\n\\n\",3E:\"4r't 4t 1D O: \",4g:\"4m 4B't 51 O 1z-1k 4F: \",37:'<!4T 1z 4S \"-//4V//3H 4W 1.0 4Z//4Y\" \"1Z://2y.3L.3K/4X/3I/3H/3I-4P.4J\"><1z 4I=\"1Z://2y.3L.3K/4L/5L\"><3J><4N 1Z-4M=\"5G-5M\" 6K=\"2O/1z; 6J=6I-8\" /><1t>6L 1v</1t></3J><3B 1L=\"25-6M:6Q,6P,6O,6N-6F;6y-2f:#6x;2f:#6w;25-22:6v;2O-3D:3C;\"><T 1L=\"2O-3D:3C;3w-32:1.6z;\"><T 1L=\"25-22:6A-6E;\">1v</T><T 1L=\"25-22:.6C;3w-6B:6R;\"><T>3v 3.0.76 (72 73 3x)</T><T><a 2h=\"1Z://3u.2w/1v\" 1F=\"38\" 1L=\"2f:#3y\">1Z://3u.2w/1v</a></T><T>70 17 6U 71.</T><T>6T 6X-3x 6Y 6D.</T></T><T>6t 61 60 J 1k, 5Z <a 2h=\"6u://2y.62.2w/63-66/65?64=5X-5W&5P=5O\" 1L=\"2f:#3y\">5R</a> 5V <2R/>5U 5T 5S!</T></T></3B></1z>'}},1Y:{2j:N,2A:{}},1U:{},3A:{6n:/\\/\\*[\\s\\S]*?\\*\\//2c,6m:/\\/\\/.*$/2c,6l:/#.*$/2c,6k:/\"([^\\\\\"\\n]|\\\\.)*\"/g,6o:/'([^\\\\'\\n]|\\\\.)*'/g,6p:1f M('\"([^\\\\\\\\\"]|\\\\\\\\.)*\"',\"3z\"),6s:1f M(\"'([^\\\\\\\\']|\\\\\\\\.)*'\",\"3z\"),6q:/(&1y;|<)!--[\\s\\S]*?--(&1G;|>)/2c,3M:/\\w+:\\/\\/[\\w-.\\/?%&=:@;]*/g,6a:{18:/(&1y;|<)\\?=?/g,1b:/\\?(&1G;|>)/g},69:{18:/(&1y;|<)%=?/g,1b:/%(&1G;|>)/g},6d:{18:/(&1y;|<)\\s*1k.*?(&1G;|>)/2T,1b:/(&1y;|<)\\/\\s*1k\\s*(&1G;|>)/2T}},16:{1H:6(a){6 b(i,k){H e.16.2o(i,k,e.13.1x[k])}O(K c='<T 1g=\"16\">',d=e.16.2x,h=d.2X,g=0;g<h.L;g++)c+=(d[h[g]].1H||b)(a,h[g]);c+=\"</T>\";H c},2o:6(a,b,c){H'<2W><a 2h=\"#\" 1g=\"6e 6h'+b+\" \"+b+'\">'+c+\"</a></2W>\"},2b:6(a){K b=a.1F,c=b.1l||\"\";b=B(p(b,\".20\",R).1c);K d=6(h){H(h=15(h+\"6f(\\\\w+)\").X(c))?h[1]:N}(\"6g\");b&&d&&e.16.2x[d].2B(b);a.3N()},2x:{2X:[\"21\",\"2P\"],21:{1H:6(a){I(a.V(\"2l\")!=R)H\"\";K b=a.V(\"1t\");H e.16.2o(a,\"21\",b?b:e.13.1x.21)},2B:6(a){a=1E.6j(t(a.1c));a.1l=a.1l.Q(\"47\",\"\")}},2P:{2B:6(){K a=\"68=0\";a+=\", 18=\"+(31.30-33)/2+\", 32=\"+(31.2Z-2Y)/2+\", 30=33, 2Z=2Y\";a=a.Q(/^,/,\"\");a=1P.6Z(\"\",\"38\",a);a.2C();K b=a.1E;b.6W(e.13.1x.37);b.6V();a.2C()}}}},35:6(a,b){K c;I(b)c=[b];Y{c=1E.36(e.13.34);O(K d=[],h=0;h<c.L;h++)d.U(c[h]);c=d}c=c;d=[];I(e.13.2M)c=c.1O(z());I(c.L===0)H d;O(h=0;h<c.L;h++){O(K g=c[h],i=a,k=c[h].1l,j=3W 0,l={},m=1f M(\"^\\\\[(?<2V>(.*?))\\\\]$\"),s=1f M(\"(?<27>[\\\\w-]+)\\\\s*:\\\\s*(?<1T>[\\\\w-%#]+|\\\\[.*?\\\\]|\\\".*?\\\"|'.*?')\\\\s*;?\",\"g\");(j=s.X(k))!=N;){K o=j.1T.Q(/^['\"]|['\"]$/g,\"\");I(o!=N&&m.1A(o)){o=m.X(o);o=o.2V.L>0?o.2V.1e(/\\s*,\\s*/):[]}l[j.27]=o}g={1F:g,1n:C(i,l)};g.1n.1D!=N&&d.U(g)}H d},1M:6(a,b){K c=J.35(a,b),d=N,h=e.13;I(c.L!==0)O(K g=0;g<c.L;g++){b=c[g];K i=b.1F,k=b.1n,j=k.1D,l;I(j!=N){I(k[\"1z-1k\"]==\"R\"||e.2v[\"1z-1k\"]==R){d=1f e.4l(j);j=\"4O\"}Y I(d=A(j))d=1f d;Y 6H;l=i.3X;I(h.2M){l=l;K m=x(l),s=11;I(m.1i(\"<![6G[\")==0){m=m.4h(9);s=R}K o=m.L;I(m.1i(\"]]\\>\")==o-3){m=m.4h(0,o-3);s=R}l=s?m:l}I((i.1t||\"\")!=\"\")k.1t=i.1t;k.1D=j;d.2Q(k);b=d.2F(l);I((i.1c||\"\")!=\"\")b.1c=i.1c;i.2G.74(b,i)}}},2E:6(a){w(1P,\"4k\",6(){e.1M(a)})}};e.2E=e.2E;e.1M=e.1M;e.2L=6(a,b,c){J.1T=a;J.P=b;J.L=a.L;J.23=c;J.1V=N};e.2L.Z.1q=6(){H J.1T};e.4l=6(a){6 b(j,l){O(K m=0;m<j.L;m++)j[m].P+=l}K c=A(a),d,h=1f e.1U.5Y,g=J,i=\"2F 1H 2Q\".1e(\" \");I(c!=N){d=1f c;O(K k=0;k<i.L;k++)(6(){K j=i[k];g[j]=6(){H h[j].1p(h,14)}})();d.28==N?1P.1X(e.13.1x.1X+(e.13.1x.4g+a)):h.2J.U({1I:d.28.17,2D:6(j){O(K l=j.17,m=[],s=d.2J,o=j.P+j.18.L,F=d.28,q,G=0;G<s.L;G++){q=y(l,s[G]);b(q,o);m=m.1O(q)}I(F.18!=N&&j.18!=N){q=y(j.18,F.18);b(q,j.P);m=m.1O(q)}I(F.1b!=N&&j.1b!=N){q=y(j.1b,F.1b);b(q,j.P+j[0].5Q(j.1b));m=m.1O(q)}O(j=0;j<m.L;j++)m[j].1V=c.1V;H m}})}};e.4j=6(){};e.4j.Z={V:6(a,b){K c=J.1n[a];c=c==N?b:c;K d={\"R\":R,\"11\":11}[c];H d==N?c:d},3Y:6(a){H 1E.4i(a)},4c:6(a,b){K c=[];I(a!=N)O(K d=0;d<a.L;d++)I(1j a[d]==\"2m\")c=c.1O(y(b,a[d]));H J.4e(c.6b(D))},4e:6(a){O(K b=0;b<a.L;b++)I(a[b]!==N)O(K c=a[b],d=c.P+c.L,h=b+1;h<a.L&&a[b]!==N;h++){K g=a[h];I(g!==N)I(g.P>d)1N;Y I(g.P==c.P&&g.L>c.L)a[b]=N;Y I(g.P>=c.P&&g.P<d)a[h]=N}H a},4d:6(a){K b=[],c=2u(J.V(\"2i-1s\"));v(a,6(d,h){b.U(h+c)});H b},3U:6(a){K b=J.V(\"1M\",[]);I(1j b!=\"2m\"&&b.U==N)b=[b];a:{a=a.1q();K c=3W 0;O(c=c=1Q.6c(c||0,0);c<b.L;c++)I(b[c]==a){b=c;1N a}b=-1}H b!=-1},2r:6(a,b,c){a=[\"1s\",\"6i\"+b,\"P\"+a,\"6r\"+(b%2==0?1:2).1q()];J.3U(b)&&a.U(\"67\");b==0&&a.U(\"1N\");H'<T 1g=\"'+a.1K(\" \")+'\">'+c+\"</T>\"},3Q:6(a,b){K c=\"\",d=a.1e(\"\\n\").L,h=2u(J.V(\"2i-1s\")),g=J.V(\"2z-1s-2t\");I(g==R)g=(h+d-1).1q().L;Y I(3R(g)==R)g=0;O(K i=0;i<d;i++){K k=b?b[i]:h+i,j;I(k==0)j=e.13.1W;Y{j=g;O(K l=k.1q();l.L<j;)l=\"0\"+l;j=l}a=j;c+=J.2r(i,k,a)}H c},49:6(a,b){a=x(a);K c=a.1e(\"\\n\");J.V(\"2z-1s-2t\");K d=2u(J.V(\"2i-1s\"));a=\"\";O(K h=J.V(\"1D\"),g=0;g<c.L;g++){K i=c[g],k=/^(&2s;|\\s)+/.X(i),j=N,l=b?b[g]:d+g;I(k!=N){j=k[0].1q();i=i.1o(j.L);j=j.Q(\" \",e.13.1W)}i=x(i);I(i.L==0)i=e.13.1W;a+=J.2r(g,l,(j!=N?'<17 1g=\"'+h+' 5N\">'+j+\"</17>\":\"\")+i)}H a},4f:6(a){H a?\"<4a>\"+a+\"</4a>\":\"\"},4b:6(a,b){6 c(l){H(l=l?l.1V||g:g)?l+\" \":\"\"}O(K d=0,h=\"\",g=J.V(\"1D\",\"\"),i=0;i<b.L;i++){K k=b[i],j;I(!(k===N||k.L===0)){j=c(k);h+=u(a.1o(d,k.P-d),j+\"48\")+u(k.1T,j+k.23);d=k.P+k.L+(k.75||0)}}h+=u(a.1o(d),c()+\"48\");H h},1H:6(a){K b=\"\",c=[\"20\"],d;I(J.V(\"2k\")==R)J.1n.16=J.1n.1u=11;1l=\"20\";J.V(\"2l\")==R&&c.U(\"47\");I((1u=J.V(\"1u\"))==11)c.U(\"6S\");c.U(J.V(\"1g-27\"));c.U(J.V(\"1D\"));a=a.Q(/^[ ]*[\\n]+|[\\n]*[ ]*$/g,\"\").Q(/\\r/g,\" \");b=J.V(\"43-22\");I(J.V(\"42-45\")==R)a=n(a,b);Y{O(K h=\"\",g=0;g<b;g++)h+=\" \";a=a.Q(/\\t/g,h)}a=a;a:{b=a=a;h=/<2R\\s*\\/?>|&1y;2R\\s*\\/?&1G;/2T;I(e.13.46==R)b=b.Q(h,\"\\n\");I(e.13.44==R)b=b.Q(h,\"\");b=b.1e(\"\\n\");h=/^\\s*/;g=4Q;O(K i=0;i<b.L&&g>0;i++){K k=b[i];I(x(k).L!=0){k=h.X(k);I(k==N){a=a;1N a}g=1Q.4q(k[0].L,g)}}I(g>0)O(i=0;i<b.L;i++)b[i]=b[i].1o(g);a=b.1K(\"\\n\")}I(1u)d=J.4d(a);b=J.4c(J.2J,a);b=J.4b(a,b);b=J.49(b,d);I(J.V(\"41-40\"))b=E(b);1j 2H!=\"1d\"&&2H.3S&&2H.3S.1C(/5s/)&&c.U(\"5t\");H b='<T 1c=\"'+t(J.1c)+'\" 1g=\"'+c.1K(\" \")+'\">'+(J.V(\"16\")?e.16.1H(J):\"\")+'<3Z 5z=\"0\" 5H=\"0\" 5J=\"0\">'+J.4f(J.V(\"1t\"))+\"<3T><3P>\"+(1u?'<2d 1g=\"1u\">'+J.3Q(a)+\"</2d>\":\"\")+'<2d 1g=\"17\"><T 1g=\"3O\">'+b+\"</T></2d></3P></3T></3Z></T>\"},2F:6(a){I(a===N)a=\"\";J.17=a;K b=J.3Y(\"T\");b.3X=J.1H(a);J.V(\"16\")&&w(p(b,\".16\"),\"5c\",e.16.2b);J.V(\"3V-17\")&&w(p(b,\".17\"),\"56\",f);H b},2Q:6(a){J.1c=\"\"+1Q.5d(1Q.5n()*5k).1q();e.1Y.2A[t(J.1c)]=J;J.1n=C(e.2v,a||{});I(J.V(\"2k\")==R)J.1n.16=J.1n.1u=11},5j:6(a){a=a.Q(/^\\s+|\\s+$/g,\"\").Q(/\\s+/g,\"|\");H\"\\\\b(?:\"+a+\")\\\\b\"},5f:6(a){J.28={18:{1I:a.18,23:\"1k\"},1b:{1I:a.1b,23:\"1k\"},17:1f M(\"(?<18>\"+a.18.1m+\")(?<17>.*?)(?<1b>\"+a.1b.1m+\")\",\"5o\")}}};H e}();1j 2e!=\"1d\"&&(2e.1v=1v);",62,441,"||||||function|||||||||||||||||||||||||||||||||||||return|if|this|var|length|XRegExp|null|for|index|replace|true||div|push|getParam|call|exec|else|prototype||false|lastIndex|config|arguments|RegExp|toolbar|code|left|captureNames|slice|right|id|undefined|split|new|class|addToken|indexOf|typeof|script|className|source|params|substr|apply|toString|String|line|title|gutter|SyntaxHighlighter|_xregexp|strings|lt|html|test|OUTSIDE_CLASS|match|brush|document|target|gt|getHtml|regex|global|join|style|highlight|break|concat|window|Math|isRegExp|throw|value|brushes|brushName|space|alert|vars|http|syntaxhighlighter|expandSource|size|css|case|font|Fa|name|htmlScript|dA|can|handler|gm|td|exports|color|in|href|first|discoveredBrushes|light|collapse|object|cache|getButtonHtml|trigger|pattern|getLineHtml|nbsp|numbers|parseInt|defaults|com|items|www|pad|highlighters|execute|focus|func|all|getDiv|parentNode|navigator|INSIDE_CLASS|regexList|hasFlag|Match|useScriptTags|hasNamedCapture|text|help|init|br|input|gi|Error|values|span|list|250|height|width|screen|top|500|tagName|findElements|getElementsByTagName|aboutDialog|_blank|appendChild|charAt|Array|copyAsGlobal|setFlag|highlighter_|string|attachEvent|nodeName|floor|backref|output|the|TypeError|sticky|Za|iterate|freezeTokens|scope|type|textarea|alexgorbatchev|version|margin|2010|005896|gs|regexLib|body|center|align|noBrush|require|childNodes|DTD|xhtml1|head|org|w3|url|preventDefault|container|tr|getLineNumbersHtml|isNaN|userAgent|tbody|isLineHighlighted|quick|void|innerHTML|create|table|links|auto|smart|tab|stripBrs|tabs|bloggerMode|collapsed|plain|getCodeLinesHtml|caption|getMatchesHtml|findMatches|figureOutLineNumbers|removeNestedMatches|getTitleHtml|brushNotHtmlScript|substring|createElement|Highlighter|load|HtmlScript|Brush|pre|expand|multiline|min|Can|ignoreCase|find|blur|extended|toLowerCase|aliases|addEventListener|innerText|textContent|wasn|select|createTextNode|removeChild|option|same|frame|xmlns|dtd|twice|1999|equiv|meta|htmlscript|transitional|1E3|expected|PUBLIC|DOCTYPE|on|W3C|XHTML|TR|EN|Transitional||configured|srcElement|Object|after|run|dblclick|matchChain|valueOf|constructor|default|switch|click|round|execAt|forHtmlScript|token|gimy|functions|getKeywords|1E6|escape|within|random|sgi|another|finally|supply|MSIE|ie|toUpperCase|catch|returnValue|definition|event|border|imsx|constructing|one|Infinity|from|when|Content|cellpadding|flags|cellspacing|try|xhtml|Type|spaces|2930402|hosted_button_id|lastIndexOf|donate|active|development|keep|to|xclick|_s|Xml|please|like|you|paypal|cgi|cmd|webscr|bin|highlighted|scrollbars|aspScriptTags|phpScriptTags|sort|max|scriptScriptTags|toolbar_item|_|command|command_|number|getElementById|doubleQuotedString|singleLinePerlComments|singleLineCComments|multiLineCComments|singleQuotedString|multiLineDoubleQuotedString|xmlComments|alt|multiLineSingleQuotedString|If|https|1em|000|fff|background|5em|xx|bottom|75em|Gorbatchev|large|serif|CDATA|continue|utf|charset|content|About|family|sans|Helvetica|Arial|Geneva|3em|nogutter|Copyright|syntax|close|write|2004|Alex|open|JavaScript|highlighter|July|02|replaceChild|offset|83".split("|"),0,{}));
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _61f(){
var _620="ATOM BOOL BOOLEAN BYTE CHAR COLORREF DWORD DWORDLONG DWORD_PTR "+"DWORD32 DWORD64 FLOAT HACCEL HALF_PTR HANDLE HBITMAP HBRUSH "+"HCOLORSPACE HCONV HCONVLIST HCURSOR HDC HDDEDATA HDESK HDROP HDWP "+"HENHMETAFILE HFILE HFONT HGDIOBJ HGLOBAL HHOOK HICON HINSTANCE HKEY "+"HKL HLOCAL HMENU HMETAFILE HMODULE HMONITOR HPALETTE HPEN HRESULT "+"HRGN HRSRC HSZ HWINSTA HWND INT INT_PTR INT32 INT64 LANGID LCID LCTYPE "+"LGRPID LONG LONGLONG LONG_PTR LONG32 LONG64 LPARAM LPBOOL LPBYTE LPCOLORREF "+"LPCSTR LPCTSTR LPCVOID LPCWSTR LPDWORD LPHANDLE LPINT LPLONG LPSTR LPTSTR "+"LPVOID LPWORD LPWSTR LRESULT PBOOL PBOOLEAN PBYTE PCHAR PCSTR PCTSTR PCWSTR "+"PDWORDLONG PDWORD_PTR PDWORD32 PDWORD64 PFLOAT PHALF_PTR PHANDLE PHKEY PINT "+"PINT_PTR PINT32 PINT64 PLCID PLONG PLONGLONG PLONG_PTR PLONG32 PLONG64 POINTER_32 "+"POINTER_64 PSHORT PSIZE_T PSSIZE_T PSTR PTBYTE PTCHAR PTSTR PUCHAR PUHALF_PTR "+"PUINT PUINT_PTR PUINT32 PUINT64 PULONG PULONGLONG PULONG_PTR PULONG32 PULONG64 "+"PUSHORT PVOID PWCHAR PWORD PWSTR SC_HANDLE SC_LOCK SERVICE_STATUS_HANDLE SHORT "+"SIZE_T SSIZE_T TBYTE TCHAR UCHAR UHALF_PTR UINT UINT_PTR UINT32 UINT64 ULONG "+"ULONGLONG ULONG_PTR ULONG32 ULONG64 USHORT USN VOID WCHAR WORD WPARAM WPARAM WPARAM "+"char bool short int __int32 __int64 __int8 __int16 long float double __wchar_t "+"clock_t _complex _dev_t _diskfree_t div_t ldiv_t _exception _EXCEPTION_POINTERS "+"FILE _finddata_t _finddatai64_t _wfinddata_t _wfinddatai64_t __finddata64_t "+"__wfinddata64_t _FPIEEE_RECORD fpos_t _HEAPINFO _HFILE lconv intptr_t "+"jmp_buf mbstate_t _off_t _onexit_t _PNH ptrdiff_t _purecall_handler "+"sig_atomic_t size_t _stat __stat64 _stati64 terminate_function "+"time_t __time64_t _timeb __timeb64 tm uintptr_t _utimbuf "+"va_list wchar_t wctrans_t wctype_t wint_t signed";
var _621="break case catch class const __finally __exception __try "+"const_cast continue private public protected __declspec "+"default delete deprecated dllexport dllimport do dynamic_cast "+"else enum explicit extern if for friend goto inline "+"mutable naked namespace new noinline noreturn nothrow "+"register reinterpret_cast return selectany "+"sizeof static static_cast struct switch template this "+"thread throw true false try typedef typeid typename union "+"using uuid virtual void volatile whcar_t while";
var _622="assert isalnum isalpha iscntrl isdigit isgraph islower isprint"+"ispunct isspace isupper isxdigit tolower toupper errno localeconv "+"setlocale acos asin atan atan2 ceil cos cosh exp fabs floor fmod "+"frexp ldexp log log10 modf pow sin sinh sqrt tan tanh jmp_buf "+"longjmp setjmp raise signal sig_atomic_t va_arg va_end va_start "+"clearerr fclose feof ferror fflush fgetc fgetpos fgets fopen "+"fprintf fputc fputs fread freopen fscanf fseek fsetpos ftell "+"fwrite getc getchar gets perror printf putc putchar puts remove "+"rename rewind scanf setbuf setvbuf sprintf sscanf tmpfile tmpnam "+"ungetc vfprintf vprintf vsprintf abort abs atexit atof atoi atol "+"bsearch calloc div exit free getenv labs ldiv malloc mblen mbstowcs "+"mbtowc qsort rand realloc srand strtod strtol strtoul system "+"wcstombs wctomb memchr memcmp memcpy memmove memset strcat strchr "+"strcmp strcoll strcpy strcspn strerror strlen strncat strncmp "+"strncpy strpbrk strrchr strspn strstr strtok strxfrm asctime "+"clock ctime difftime gmtime localtime mktime strftime time";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/^ *#.*/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords(_620),"gm"),css:"color1 bold"},{regex:new RegExp(this.getKeywords(_622),"gm"),css:"functions bold"},{regex:new RegExp(this.getKeywords(_621),"gm"),css:"keyword bold"}];
};
_61f.prototype=new SyntaxHighlighter.Highlighter();
_61f.aliases=["cpp","c"];
SyntaxHighlighter.brushes.Cpp=_61f;
typeof (exports)!="undefined"?exports.Brush=_61f:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _623(){
var _624="abstract as base bool break byte case catch char checked class const "+"continue decimal default delegate do double else enum event explicit "+"extern false finally fixed float for foreach get goto if implicit in int "+"interface internal is lock long namespace new null object operator out "+"override params private protected public readonly ref return sbyte sealed set "+"short sizeof stackalloc static string struct switch this throw true try "+"typeof uint ulong unchecked unsafe ushort using virtual void while";
function _625(_626,_627){
var css=(_626[0].indexOf("///")==0)?"color1":"comments";
return [new SyntaxHighlighter.Match(_626[0],_626.index,css)];
};
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,func:_625},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:/@"(?:[^"]|"")*"/g,css:"string"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/^\s*#.*/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords(_624),"gm"),css:"keyword"},{regex:/\bpartial(?=\s+(?:class|interface|struct)\b)/g,css:"keyword"},{regex:/\byield(?=\s+(?:return|break)\b)/g,css:"keyword"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_623.prototype=new SyntaxHighlighter.Highlighter();
_623.aliases=["c#","c-sharp","csharp"];
SyntaxHighlighter.brushes.CSharp=_623;
typeof (exports)!="undefined"?exports.Brush=_623:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _628(){
function _629(str){
return "\\b([a-z_]|)"+str.replace(/ /g,"(?=:)\\b|\\b([a-z_\\*]|\\*|)")+"(?=:)\\b";
};
function _62a(str){
return "\\b"+str.replace(/ /g,"(?!-)(?!:)\\b|\\b()")+":\\b";
};
var _62b="ascent azimuth background-attachment background-color background-image background-position "+"background-repeat background baseline bbox border-collapse border-color border-spacing border-style border-top "+"border-right border-bottom border-left border-top-color border-right-color border-bottom-color border-left-color "+"border-top-style border-right-style border-bottom-style border-left-style border-top-width border-right-width "+"border-bottom-width border-left-width border-width border bottom cap-height caption-side centerline clear clip color "+"content counter-increment counter-reset cue-after cue-before cue cursor definition-src descent direction display "+"elevation empty-cells float font-size-adjust font-family font-size font-stretch font-style font-variant font-weight font "+"height left letter-spacing line-height list-style-image list-style-position list-style-type list-style margin-top "+"margin-right margin-bottom margin-left margin marker-offset marks mathline max-height max-width min-height min-width orphans "+"outline-color outline-style outline-width outline overflow padding-top padding-right padding-bottom padding-left padding page "+"page-break-after page-break-before page-break-inside pause pause-after pause-before pitch pitch-range play-during position "+"quotes right richness size slope src speak-header speak-numeral speak-punctuation speak speech-rate stemh stemv stress "+"table-layout text-align top text-decoration text-indent text-shadow text-transform unicode-bidi unicode-range units-per-em "+"vertical-align visibility voice-family volume white-space widows width widths word-spacing x-height z-index";
var _62c="above absolute all always aqua armenian attr aural auto avoid baseline behind below bidi-override black blink block blue bold bolder "+"both bottom braille capitalize caption center center-left center-right circle close-quote code collapse compact condensed "+"continuous counter counters crop cross crosshair cursive dashed decimal decimal-leading-zero default digits disc dotted double "+"embed embossed e-resize expanded extra-condensed extra-expanded fantasy far-left far-right fast faster fixed format fuchsia "+"gray green groove handheld hebrew help hidden hide high higher icon inline-table inline inset inside invert italic "+"justify landscape large larger left-side left leftwards level lighter lime line-through list-item local loud lower-alpha "+"lowercase lower-greek lower-latin lower-roman lower low ltr marker maroon medium message-box middle mix move narrower "+"navy ne-resize no-close-quote none no-open-quote no-repeat normal nowrap n-resize nw-resize oblique olive once open-quote outset "+"outside overline pointer portrait pre print projection purple red relative repeat repeat-x repeat-y rgb ridge right right-side "+"rightwards rtl run-in screen scroll semi-condensed semi-expanded separate se-resize show silent silver slower slow "+"small small-caps small-caption smaller soft solid speech spell-out square s-resize static status-bar sub super sw-resize "+"table-caption table-cell table-column table-column-group table-footer-group table-header-group table-row table-row-group teal "+"text-bottom text-top thick thin top transparent tty tv ultra-condensed ultra-expanded underline upper-alpha uppercase upper-latin "+"upper-roman url visible wait white wider w-resize x-fast x-high x-large x-loud x-low x-slow x-small x-soft xx-large xx-small yellow";
var _62d="[mM]onospace [tT]ahoma [vV]erdana [aA]rial [hH]elvetica [sS]ans-serif [sS]erif [cC]ourier mono sans serif";
this.regexList=[{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\#[a-fA-F0-9]{3,6}/g,css:"value"},{regex:/(-?\d+)(\.\d+)?(px|em|pt|\:|\%|)/g,css:"value"},{regex:/!important/g,css:"color3"},{regex:new RegExp(_629(_62b),"gm"),css:"keyword"},{regex:new RegExp(_62a(_62c),"g"),css:"value"},{regex:new RegExp(this.getKeywords(_62d),"g"),css:"color1"}];
this.forHtmlScript({left:/(&lt;|<)\s*style.*?(&gt;|>)/gi,right:/(&lt;|<)\/\s*style\s*(&gt;|>)/gi});
};
_628.prototype=new SyntaxHighlighter.Highlighter();
_628.aliases=["css"];
SyntaxHighlighter.brushes.CSS=_628;
typeof (exports)!="undefined"?exports.Brush=_628:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _62e(){
var _62f="abs addr and ansichar ansistring array as asm begin boolean byte cardinal "+"case char class comp const constructor currency destructor div do double "+"downto else end except exports extended false file finalization finally "+"for function goto if implementation in inherited int64 initialization "+"integer interface is label library longint longword mod nil not object "+"of on or packed pansichar pansistring pchar pcurrency pdatetime pextended "+"pint64 pointer private procedure program property pshortstring pstring "+"pvariant pwidechar pwidestring protected public published raise real real48 "+"record repeat set shl shortint shortstring shr single smallint string then "+"threadvar to true try type unit until uses val var varirnt while widechar "+"widestring with word write writeln xor";
this.regexList=[{regex:/\(\*[\s\S]*?\*\)/gm,css:"comments"},{regex:/{(?!\$)[\s\S]*?}/gm,css:"comments"},{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\{\$[a-zA-Z]+ .+\}/g,css:"color1"},{regex:/\b[\d\.]+\b/g,css:"value"},{regex:/\$[a-zA-Z0-9]+\b/g,css:"value"},{regex:new RegExp(this.getKeywords(_62f),"gmi"),css:"keyword"}];
};
_62e.prototype=new SyntaxHighlighter.Highlighter();
_62e.aliases=["delphi","pascal","pas"];
SyntaxHighlighter.brushes.Delphi=_62e;
typeof (exports)!="undefined"?exports.Brush=_62e:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _630(){
function _631(_632,_633){
var _634=SyntaxHighlighter.Match,code=_632[0],tag=new XRegExp("(&lt;|<)[\\s\\/\\?]*(?<name>[:\\w-\\.]+)","xg").exec(code),_635=[];
if(_632.attributes!=null){
var _636,_637=new XRegExp("(?<name> [\\w:\\-\\.]+)"+"\\s*=\\s*"+"(?<value> \".*?\"|'.*?'|\\w+)","xg");
while((_636=_637.exec(code))!=null){
_635.push(new _634(_636.name,_632.index+_636.index,"color1"));
_635.push(new _634(_636.value,_632.index+_636.index+_636[0].indexOf(_636.value),"string"));
}
}
if(tag!=null){
_635.push(new _634(tag.name,_632.index+tag[0].indexOf(tag.name),"keyword"));
}
return _635;
};
this.regexList=[{regex:new XRegExp("(\\&lt;|<)\\!\\[[\\w\\s]*?\\[(.|\\s)*?\\]\\](\\&gt;|>)","gm"),css:"color2"},{regex:SyntaxHighlighter.regexLib.xmlComments,css:"comments"},{regex:new XRegExp("(&lt;|<)[\\s\\/\\?]*(\\w+)(?<attributes>.*?)[\\s\\/\\?]*(&gt;|>)","sg"),func:_631}];
};
_630.prototype=new SyntaxHighlighter.Highlighter();
_630.aliases=["xml","xhtml","xslt","html"];
SyntaxHighlighter.brushes.Xml=_630;
typeof (exports)!="undefined"?exports.Brush=_630:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _638(){
var _639="abstract assert boolean break byte case catch char class const "+"continue default do double else enum extends "+"false final finally float for goto if implements import "+"instanceof int interface long native new null "+"package private protected public return "+"short static strictfp super switch synchronized this throw throws true "+"transient try void volatile while";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:/\/\*([^\*][\s\S]*)?\*\//gm,css:"comments"},{regex:/\/\*(?!\*\/)\*[\s\S]*?\*\//gm,css:"preprocessor"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\b([\d]+(\.[\d]+)?|0x[a-f0-9]+)\b/gi,css:"value"},{regex:/(?!\@interface\b)\@[\$\w]+\b/g,css:"color1"},{regex:/\@interface\b/g,css:"color2"},{regex:new RegExp(this.getKeywords(_639),"gm"),css:"keyword"}];
this.forHtmlScript({left:/(&lt;|<)%[@!=]?/g,right:/%(&gt;|>)/g});
};
_638.prototype=new SyntaxHighlighter.Highlighter();
_638.aliases=["java"];
SyntaxHighlighter.brushes.Java=_638;
typeof (exports)!="undefined"?exports.Brush=_638:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _63a(){
var _63b="break case catch continue "+"default delete do else false  "+"for function if in instanceof "+"new null return super switch "+"this throw true try typeof var while with";
var r=SyntaxHighlighter.regexLib;
this.regexList=[{regex:r.multiLineDoubleQuotedString,css:"string"},{regex:r.multiLineSingleQuotedString,css:"string"},{regex:r.singleLineCComments,css:"comments"},{regex:r.multiLineCComments,css:"comments"},{regex:/\s*#.*/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords(_63b),"gm"),css:"keyword"}];
this.forHtmlScript(r.scriptScriptTags);
};
_63a.prototype=new SyntaxHighlighter.Highlighter();
_63a.aliases=["js","jscript","javascript"];
SyntaxHighlighter.brushes.JScript=_63a;
typeof (exports)!="undefined"?exports.Brush=_63a:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _63c(){
var _63d="abs acos acosh addcslashes addslashes "+"array_change_key_case array_chunk array_combine array_count_values array_diff "+"array_diff_assoc array_diff_key array_diff_uassoc array_diff_ukey array_fill "+"array_filter array_flip array_intersect array_intersect_assoc array_intersect_key "+"array_intersect_uassoc array_intersect_ukey array_key_exists array_keys array_map "+"array_merge array_merge_recursive array_multisort array_pad array_pop array_product "+"array_push array_rand array_reduce array_reverse array_search array_shift "+"array_slice array_splice array_sum array_udiff array_udiff_assoc "+"array_udiff_uassoc array_uintersect array_uintersect_assoc "+"array_uintersect_uassoc array_unique array_unshift array_values array_walk "+"array_walk_recursive atan atan2 atanh base64_decode base64_encode base_convert "+"basename bcadd bccomp bcdiv bcmod bcmul bindec bindtextdomain bzclose bzcompress "+"bzdecompress bzerrno bzerror bzerrstr bzflush bzopen bzread bzwrite ceil chdir "+"checkdate checkdnsrr chgrp chmod chop chown chr chroot chunk_split class_exists "+"closedir closelog copy cos cosh count count_chars date decbin dechex decoct "+"deg2rad delete ebcdic2ascii echo empty end ereg ereg_replace eregi eregi_replace error_log "+"error_reporting escapeshellarg escapeshellcmd eval exec exit exp explode extension_loaded "+"feof fflush fgetc fgetcsv fgets fgetss file_exists file_get_contents file_put_contents "+"fileatime filectime filegroup fileinode filemtime fileowner fileperms filesize filetype "+"floatval flock floor flush fmod fnmatch fopen fpassthru fprintf fputcsv fputs fread fscanf "+"fseek fsockopen fstat ftell ftok getallheaders getcwd getdate getenv gethostbyaddr gethostbyname "+"gethostbynamel getimagesize getlastmod getmxrr getmygid getmyinode getmypid getmyuid getopt "+"getprotobyname getprotobynumber getrandmax getrusage getservbyname getservbyport gettext "+"gettimeofday gettype glob gmdate gmmktime ini_alter ini_get ini_get_all ini_restore ini_set "+"interface_exists intval ip2long is_a is_array is_bool is_callable is_dir is_double "+"is_executable is_file is_finite is_float is_infinite is_int is_integer is_link is_long "+"is_nan is_null is_numeric is_object is_readable is_real is_resource is_scalar is_soap_fault "+"is_string is_subclass_of is_uploaded_file is_writable is_writeable mkdir mktime nl2br "+"parse_ini_file parse_str parse_url passthru pathinfo print readlink realpath rewind rewinddir rmdir "+"round str_ireplace str_pad str_repeat str_replace str_rot13 str_shuffle str_split "+"str_word_count strcasecmp strchr strcmp strcoll strcspn strftime strip_tags stripcslashes "+"stripos stripslashes stristr strlen strnatcasecmp strnatcmp strncasecmp strncmp strpbrk "+"strpos strptime strrchr strrev strripos strrpos strspn strstr strtok strtolower strtotime "+"strtoupper strtr strval substr substr_compare";
var _63e="abstract and array as break case catch cfunction class clone const continue declare default die do "+"else elseif enddeclare endfor endforeach endif endswitch endwhile extends final for foreach "+"function include include_once global goto if implements interface instanceof namespace new "+"old_function or private protected public return require require_once static switch "+"throw try use var while xor ";
var _63f="__FILE__ __LINE__ __METHOD__ __FUNCTION__ __CLASS__";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\$\w+/g,css:"variable"},{regex:new RegExp(this.getKeywords(_63d),"gmi"),css:"functions"},{regex:new RegExp(this.getKeywords(_63f),"gmi"),css:"constants"},{regex:new RegExp(this.getKeywords(_63e),"gm"),css:"keyword"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.phpScriptTags);
};
_63c.prototype=new SyntaxHighlighter.Highlighter();
_63c.aliases=["php"];
SyntaxHighlighter.brushes.Php=_63c;
typeof (exports)!="undefined"?exports.Brush=_63c:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _640(){
var _641="and assert break class continue def del elif else "+"except exec finally for from global if import in is "+"lambda not or pass print raise return try yield while";
var _642="__import__ abs all any apply basestring bin bool buffer callable "+"chr classmethod cmp coerce compile complex delattr dict dir "+"divmod enumerate eval execfile file filter float format frozenset "+"getattr globals hasattr hash help hex id input int intern "+"isinstance issubclass iter len list locals long map max min next "+"object oct open ord pow print property range raw_input reduce "+"reload repr reversed round set setattr slice sorted staticmethod "+"str sum super tuple type type unichr unicode vars xrange zip";
var _643="None True False self cls class_";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLinePerlComments,css:"comments"},{regex:/^\s*@\w+/gm,css:"decorator"},{regex:/(['\"]{3})([^\1])*?\1/gm,css:"comments"},{regex:/"(?!")(?:\.|\\\"|[^\""\n])*"/gm,css:"string"},{regex:/'(?!')(?:\.|(\\\')|[^\''\n])*'/gm,css:"string"},{regex:/\+|\-|\*|\/|\%|=|==/gm,css:"keyword"},{regex:/\b\d+\.?\w*/g,css:"value"},{regex:new RegExp(this.getKeywords(_642),"gmi"),css:"functions"},{regex:new RegExp(this.getKeywords(_641),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords(_643),"gm"),css:"color1"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_640.prototype=new SyntaxHighlighter.Highlighter();
_640.aliases=["py","python"];
SyntaxHighlighter.brushes.Python=_640;
typeof (exports)!="undefined"?exports.Brush=_640:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _644(){
var _645="alias and BEGIN begin break case class def define_method defined do each else elsif "+"END end ensure false for if in module new next nil not or raise redo rescue retry return "+"self super then throw true undef unless until when while yield";
var _646="Array Bignum Binding Class Continuation Dir Exception FalseClass File::Stat File Fixnum Fload "+"Hash Integer IO MatchData Method Module NilClass Numeric Object Proc Range Regexp String Struct::TMS Symbol "+"ThreadGroup Thread Time TrueClass";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLinePerlComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\b[A-Z0-9_]+\b/g,css:"constants"},{regex:/:[a-z][A-Za-z0-9_]*/g,css:"color2"},{regex:/(\$|@@|@)\w+/g,css:"variable bold"},{regex:new RegExp(this.getKeywords(_645),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords(_646),"gm"),css:"color1"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_644.prototype=new SyntaxHighlighter.Highlighter();
_644.aliases=["ruby","rails","ror","rb"];
SyntaxHighlighter.brushes.Ruby=_644;
typeof (exports)!="undefined"?exports.Brush=_644:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _647(){
var _648="abs avg case cast coalesce convert count current_timestamp "+"current_user day isnull left lower month nullif replace right "+"session_user space substring sum system_user upper user year";
var _649="absolute action add after alter as asc at authorization begin bigint "+"binary bit by cascade char character check checkpoint close collate "+"column commit committed connect connection constraint contains continue "+"create cube current current_date current_time cursor database date "+"deallocate dec decimal declare default delete desc distinct double drop "+"dynamic else end end-exec escape except exec execute false fetch first "+"float for force foreign forward free from full function global goto grant "+"group grouping having hour ignore index inner insensitive insert instead "+"int integer intersect into is isolation key last level load local max min "+"minute modify move name national nchar next no numeric of off on only "+"open option order out output partial password precision prepare primary "+"prior privileges procedure public read real references relative repeatable "+"restrict return returns revoke rollback rollup rows rule schema scroll "+"second section select sequence serializable set size smallint static "+"statistics table temp temporary then time timestamp to top transaction "+"translation trigger true truncate uncommitted union unique update values "+"varchar varying view when where with work";
var _64a="all and any between cross in join like not null or outer some";
this.regexList=[{regex:/--(.*)$/gm,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineDoubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.multiLineSingleQuotedString,css:"string"},{regex:new RegExp(this.getKeywords(_648),"gmi"),css:"color2"},{regex:new RegExp(this.getKeywords(_64a),"gmi"),css:"color1"},{regex:new RegExp(this.getKeywords(_649),"gmi"),css:"keyword"}];
};
_647.prototype=new SyntaxHighlighter.Highlighter();
_647.aliases=["sql"];
SyntaxHighlighter.brushes.Sql=_647;
typeof (exports)!="undefined"?exports.Brush=_647:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _64b(){
var _64c="AddHandler AddressOf AndAlso Alias And Ansi As Assembly Auto "+"Boolean ByRef Byte ByVal Call Case Catch CBool CByte CChar CDate "+"CDec CDbl Char CInt Class CLng CObj Const CShort CSng CStr CType "+"Date Decimal Declare Default Delegate Dim DirectCast Do Double Each "+"Else ElseIf End Enum Erase Error Event Exit False Finally For Friend "+"Function Get GetType GoSub GoTo Handles If Implements Imports In "+"Inherits Integer Interface Is Let Lib Like Long Loop Me Mod Module "+"MustInherit MustOverride MyBase MyClass Namespace New Next Not Nothing "+"NotInheritable NotOverridable Object On Option Optional Or OrElse "+"Overloads Overridable Overrides ParamArray Preserve Private Property "+"Protected Public RaiseEvent ReadOnly ReDim REM RemoveHandler Resume "+"Return Select Set Shadows Shared Short Single Static Step Stop String "+"Structure Sub SyncLock Then Throw To True Try TypeOf Unicode Until "+"Variant When While With WithEvents WriteOnly Xor";
this.regexList=[{regex:/'.*$/gm,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:/^\s*#.*$/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords(_64c),"gm"),css:"keyword"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_64b.prototype=new SyntaxHighlighter.Highlighter();
_64b.aliases=["vb","vbnet"];
SyntaxHighlighter.brushes.Vb=_64b;
typeof (exports)!="undefined"?exports.Brush=_64b:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _64d(){
function _64e(_64f,_650){
var _651=SyntaxHighlighter.Match,code=_64f[0],tag=new XRegExp("(&lt;|<)[\\s\\/\\?]*(?<name>[:\\w-\\.]+)","xg").exec(code),_652=[];
if(_64f.attributes!=null){
var _653,_654=new XRegExp("(?<name> [\\w:\\-\\.]+)"+"\\s*=\\s*"+"(?<value> \".*?\"|'.*?'|\\w+)","xg");
while((_653=_654.exec(code))!=null){
_652.push(new _651(_653.name,_64f.index+_653.index,"color1"));
_652.push(new _651(_653.value,_64f.index+_653.index+_653[0].indexOf(_653.value),"string"));
}
}
if(tag!=null){
_652.push(new _651(tag.name,_64f.index+tag[0].indexOf(tag.name),"keyword"));
}
return _652;
};
this.regexList=[{regex:new XRegExp("(\\&lt;|<)\\!\\[[\\w\\s]*?\\[(.|\\s)*?\\]\\](\\&gt;|>)","gm"),css:"color2"},{regex:SyntaxHighlighter.regexLib.xmlComments,css:"comments"},{regex:new XRegExp("(&lt;|<)[\\s\\/\\?]*(\\w+)(?<attributes>.*?)[\\s\\/\\?]*(&gt;|>)","sg"),func:_64e}];
};
_64d.prototype=new SyntaxHighlighter.Highlighter();
_64d.aliases=["xml","xhtml","xslt","html"];
SyntaxHighlighter.brushes.Xml=_64d;
typeof (exports)!="undefined"?exports.Brush=_64d:null;
})();
function ClojureRegExp(_655){
_655=_655+"(?=[[\\]{}(),\\s])";
this.regex=new RegExp(_655,"g");
this.lookBehind=/[\[\]{}(),\s]$/;
};
ClojureRegExp.prototype.exec=function(str){
var _656,_657;
while(_656=this.regex.exec(str)){
_657=str.substring(0,_656.index);
if(this.lookBehind.test(_657)){
return _656;
}else{
this.regex.lastIndex=_656.index+1;
}
}
return null;
};
SyntaxHighlighter.brushes.Clojure=function(){
var _658=". def do fn if let loop monitor-enter monitor-exit new quote recur set! "+"throw try var",_659="* *1 *2 *3 *agent* *allow-unresolved-vars* *assert* *clojure-version* "+"*command-line-args* *compile-files* *compile-path* *e *err* *file* "+"*flush-on-newline* *in* *macro-meta* *math-context* *ns* *out* "+"*print-dup* *print-length* *print-level* *print-meta* *print-readably* "+"*read-eval* *source-path* *use-context-classloader* "+"*warn-on-reflection* + - -> -&gt; ->> -&gt;&gt; .. / < &lt; <= &lt;= = "+"== > &gt; >= &gt;= accessor aclone "+"add-classpath add-watch agent agent-errors aget alength alias all-ns "+"alter alter-meta! alter-var-root amap ancestors and apply areduce "+"array-map aset aset-boolean aset-byte aset-char aset-double aset-float "+"aset-int aset-long aset-short assert assoc assoc! assoc-in associative? "+"atom await await-for await1 bases bean bigdec bigint binding bit-and "+"bit-and-not bit-clear bit-flip bit-not bit-or bit-set bit-shift-left "+"bit-shift-right bit-test bit-xor boolean boolean-array booleans "+"bound-fn bound-fn* butlast byte byte-array bytes cast char char-array "+"char-escape-string char-name-string char? chars chunk chunk-append "+"chunk-buffer chunk-cons chunk-first chunk-next chunk-rest chunked-seq? "+"class class? clear-agent-errors clojure-version coll? comment commute "+"comp comparator compare compare-and-set! compile complement concat cond "+"condp conj conj! cons constantly construct-proxy contains? count "+"counted? create-ns create-struct cycle dec decimal? declare definline "+"defmacro defmethod defmulti defn defn- defonce defstruct delay delay? "+"deliver deref derive descendants destructure disj disj! dissoc dissoc! "+"distinct distinct? doall doc dorun doseq dosync dotimes doto double "+"double-array doubles drop drop-last drop-while empty empty? ensure "+"enumeration-seq eval even? every? false? ffirst file-seq filter find "+"find-doc find-ns find-var first float float-array float? floats flush "+"fn fn? fnext for force format future future-call future-cancel "+"future-cancelled? future-done? future? gen-class gen-interface gensym "+"get get-in get-method get-proxy-class get-thread-bindings get-validator "+"hash hash-map hash-set identical? identity if-let if-not ifn? import "+"in-ns inc init-proxy instance? int int-array integer? interleave intern "+"interpose into into-array ints io! isa? iterate iterator-seq juxt key "+"keys keyword keyword? last lazy-cat lazy-seq let letfn line-seq list "+"list* list? load load-file load-reader load-string loaded-libs locking "+"long long-array longs loop macroexpand macroexpand-1 make-array "+"make-hierarchy map map? mapcat max max-key memfn memoize merge "+"merge-with meta method-sig methods min min-key mod name namespace neg? "+"newline next nfirst nil? nnext not not-any? not-empty not-every? not= "+"\tns ns-aliases ns-imports ns-interns ns-map ns-name ns-publics "+"ns-refers ns-resolve ns-unalias ns-unmap nth nthnext num number? odd? "+"or parents partial partition pcalls peek persistent! pmap pop pop! "+"pop-thread-bindings pos? pr pr-str prefer-method prefers "+"primitives-classnames print print-ctor print-doc print-dup print-method "+"print-namespace-doc print-simple print-special-doc print-str printf "+"println println-str prn prn-str promise proxy proxy-call-with-super "+"proxy-mappings proxy-name proxy-super push-thread-bindings pvalues quot "+"rand rand-int range ratio? rational? rationalize re-find re-groups "+"re-matcher re-matches re-pattern re-seq read read-line read-string "+"reduce ref ref-history-count ref-max-history ref-min-history ref-set "+"refer refer-clojure release-pending-sends rem remove remove-method "+"remove-ns remove-watch repeat repeatedly replace replicate require "+"reset! reset-meta! resolve rest resultset-seq reverse reversible? rseq "+"rsubseq second select-keys send send-off seq seq? seque sequence "+"sequential? set set-validator! set? short short-array shorts "+"shutdown-agents slurp some sort sort-by sorted-map sorted-map-by "+"sorted-set sorted-set-by sorted? special-form-anchor special-symbol? "+"split-at split-with str stream? string? struct struct-map subs subseq "+"subvec supers swap! symbol symbol? sync syntax-symbol-anchor take "+"take-last take-nth take-while test the-ns time to-array to-array-2d "+"trampoline transient tree-seq true? type unchecked-add unchecked-dec "+"unchecked-divide unchecked-inc unchecked-multiply unchecked-negate "+"unchecked-remainder unchecked-subtract underive unquote "+"unquote-splicing update-in update-proxy use val vals var-get var-set "+"var? vary-meta vec vector vector? when when-first when-let when-not "+"while with-bindings with-bindings* with-in-str with-loading-context "+"with-local-vars with-meta with-open with-out-str with-precision xml-seq "+"zero? zipmap ";
this.getKeywords=function(_65a){
_65a=_65a.replace(/[\-\[\]{}()*+?.\\\^$|,#]/g,"\\$&");
_65a=_65a.replace(/^\s+|\s+$/g,"").replace(/\s+/g,"|");
return "(?:"+_65a+")";
};
this.regexList=[{regex:new RegExp("\\W;.*$","gm"),css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineDoubleQuotedString,css:"string"},{regex:/#"(?:\.|(\\\")|[^\""\n])*"/g,css:"string"},{regex:/\[|\]/g,css:"keyword"},{regex:/\s+&(amp;)?\s+/g,css:"keyword"},{regex:/#?\{|\}/g,css:"keyword"},{regex:/#\^\{/g,css:"keyword"},{regex:/#\(|%/g,css:"keyword"},{regex:/@/g,css:"keyword"},{regex:/(['`]|~@?)[\[({]/g,css:"keyword"},{regex:/\(|\)/g,css:"keyword"},{regex:/\\.\b/g,css:"value"},{regex:/[+\-]?\b0x[0-9A-F]+\b/gi,css:"value"},{regex:new ClojureRegExp("[+-]?\\b\\d+(\\.\\d*)?([eE][+-]?\\d+|M)?\\b"),css:"value"},{regex:/^[+\-]?\b\d+(\.\d*)?([eE][+\-]?\d+|M)?\b/g,css:"value"},{regex:/\b(true|false|nil)\b/g,css:"value"},{regex:/(`|#?'|~@?)[\w-.\/]+/g,css:"color1"},{regex:/:[A-Za-z0-9_\-]+/g,css:"constants"},{regex:new ClojureRegExp(this.getKeywords(_658)),css:"preprocessor"},{regex:/\#\^[A-Za-z]\w*/g,css:"preprocessor"},{regex:new ClojureRegExp(this.getKeywords(_659)),css:"functions"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.scriptScriptTags);
};
SyntaxHighlighter.brushes.Clojure.prototype=new SyntaxHighlighter.Highlighter();
SyntaxHighlighter.brushes.Clojure.aliases=["clojure","Clojure","clj"];
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _65b(){
var _65c="abs accept alarm atan2 bind binmode chdir chmod chomp chop chown chr "+"chroot close closedir connect cos crypt defined delete each endgrent "+"endhostent endnetent endprotoent endpwent endservent eof exec exists "+"exp fcntl fileno flock fork format formline getc getgrent getgrgid "+"getgrnam gethostbyaddr gethostbyname gethostent getlogin getnetbyaddr "+"getnetbyname getnetent getpeername getpgrp getppid getpriority "+"getprotobyname getprotobynumber getprotoent getpwent getpwnam getpwuid "+"getservbyname getservbyport getservent getsockname getsockopt glob "+"gmtime grep hex index int ioctl join keys kill lc lcfirst length link "+"listen localtime lock log lstat map mkdir msgctl msgget msgrcv msgsnd "+"oct open opendir ord pack pipe pop pos print printf prototype push "+"quotemeta rand read readdir readline readlink readpipe recv rename "+"reset reverse rewinddir rindex rmdir scalar seek seekdir select semctl "+"semget semop send setgrent sethostent setnetent setpgrp setpriority "+"setprotoent setpwent setservent setsockopt shift shmctl shmget shmread "+"shmwrite shutdown sin sleep socket socketpair sort splice split sprintf "+"sqrt srand stat study substr symlink syscall sysopen sysread sysseek "+"system syswrite tell telldir time times tr truncate uc ucfirst umask "+"undef unlink unpack unshift utime values vec wait waitpid warn write";
var _65d="bless caller continue dbmclose dbmopen die do dump else elsif eval exit "+"for foreach goto if import last local my next no our package redo ref "+"require return sub tie tied unless untie until use wantarray while";
this.regexList=[{regex:new RegExp("#[^!].*$","gm"),css:"comments"},{regex:new RegExp("^\\s*#!.*$","gm"),css:"preprocessor"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:new RegExp("(\\$|@|%)\\w+","g"),css:"variable"},{regex:new RegExp(this.getKeywords(_65c),"gmi"),css:"functions"},{regex:new RegExp(this.getKeywords(_65d),"gm"),css:"keyword"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.phpScriptTags);
};
_65b.prototype=new SyntaxHighlighter.Highlighter();
_65b.aliases=["perl","Perl","pl"];
SyntaxHighlighter.brushes.Perl=_65b;
typeof (exports)!="undefined"?exports.Brush=_65b:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _65e(){
var _65f="if fi then elif else for do done until while break continue case function return in eq ne ge le";
var _660="alias apropos awk basename bash bc bg builtin bzip2 cal cat cd cfdisk chgrp chmod chown chroot"+"cksum clear cmp comm command cp cron crontab csplit cut date dc dd ddrescue declare df "+"diff diff3 dig dir dircolors dirname dirs du echo egrep eject enable env ethtool eval "+"exec exit expand export expr false fdformat fdisk fg fgrep file find fmt fold format "+"free fsck ftp gawk getopts grep groups gzip hash head history hostname id ifconfig "+"import install join kill less let ln local locate logname logout look lpc lpr lprint "+"lprintd lprintq lprm ls lsof make man mkdir mkfifo mkisofs mknod more mount mtools "+"mv netstat nice nl nohup nslookup open op passwd paste pathchk ping popd pr printcap "+"printenv printf ps pushd pwd quota quotacheck quotactl ram rcp read readonly renice "+"remsync rm rmdir rsync screen scp sdiff sed select seq set sftp shift shopt shutdown "+"sleep sort source split ssh strace su sudo sum symlink sync tail tar tee test time "+"times touch top traceroute trap tr true tsort tty type ulimit umask umount unalias "+"uname unexpand uniq units unset unshar useradd usermod users uuencode uudecode v vdir "+"vi watch wc whereis which who whoami Wget xargs yes";
this.regexList=[{regex:/^#!.*$/gm,css:"preprocessor bold"},{regex:/\/[\w-\/]+/gm,css:"plain"},{regex:SyntaxHighlighter.regexLib.singleLinePerlComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:new RegExp(this.getKeywords(_65f),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords(_660),"gm"),css:"functions"}];
};
_65e.prototype=new SyntaxHighlighter.Highlighter();
_65e.aliases=["bash","shell"];
SyntaxHighlighter.brushes.Bash=_65e;
typeof (exports)!="undefined"?exports.Brush=_65e:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _661(){
var _662="after and andalso band begin bnot bor bsl bsr bxor "+"case catch cond div end fun if let not of or orelse "+"query receive rem try when xor"+" module export import define";
this.regexList=[{regex:new RegExp("[A-Z][A-Za-z0-9_]+","g"),css:"constants"},{regex:new RegExp("\\%.+","gm"),css:"comments"},{regex:new RegExp("\\?[A-Za-z0-9_]+","g"),css:"preprocessor"},{regex:new RegExp("[a-z0-9_]+:[a-z0-9_]+","g"),css:"functions"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:new RegExp(this.getKeywords(_662),"gm"),css:"keyword"}];
};
_661.prototype=new SyntaxHighlighter.Highlighter();
_661.aliases=["erl","erlang"];
SyntaxHighlighter.brushes.Erland=_661;
typeof (exports)!="undefined"?exports.Brush=_661:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _663(){
var _664="as assert break case catch class continue def default do else extends finally "+"if in implements import instanceof interface new package property return switch "+"throw throws try while public protected private static";
var _665="void boolean byte char short int long float double";
var _666="null";
var _667="allProperties count get size "+"collect each eachProperty eachPropertyName eachWithIndex find findAll "+"findIndexOf grep inject max min reverseEach sort "+"asImmutable asSynchronized flatten intersect join pop reverse subMap toList "+"padRight padLeft contains eachMatch toCharacter toLong toUrl tokenize "+"eachFile eachFileRecurse eachB yte eachLine readBytes readLine getText "+"splitEachLine withReader append encodeBase64 decodeBase64 filterLine "+"transformChar transformLine withOutputStream withPrintWriter withStream "+"withStreams withWriter withWriterAppend write writeLine "+"dump inspect invokeMethod print println step times upto use waitForOrKill "+"getText";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/""".*"""/g,css:"string"},{regex:new RegExp("\\b([\\d]+(\\.[\\d]+)?|0x[a-f0-9]+)\\b","gi"),css:"value"},{regex:new RegExp(this.getKeywords(_664),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords(_665),"gm"),css:"color1"},{regex:new RegExp(this.getKeywords(_666),"gm"),css:"constants"},{regex:new RegExp(this.getKeywords(_667),"gm"),css:"functions"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_663.prototype=new SyntaxHighlighter.Highlighter();
_663.aliases=["groovy"];
SyntaxHighlighter.brushes.Groovy=_663;
typeof (exports)!="undefined"?exports.Brush=_663:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _668(){
var _669="val sealed case def true trait implicit forSome import match object null finally super "+"override try lazy for var catch throw type extends class while with new final yield abstract "+"else do if return protected private this package false";
var _66a="[_:=><%#@]+";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineSingleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.multiLineDoubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/0x[a-f0-9]+|\d+(\.\d+)?/gi,css:"value"},{regex:new RegExp(this.getKeywords(_669),"gm"),css:"keyword"},{regex:new RegExp(_66a,"gm"),css:"keyword"}];
};
_668.prototype=new SyntaxHighlighter.Highlighter();
_668.aliases=["scala"];
SyntaxHighlighter.brushes.Scala=_668;
typeof (exports)!="undefined"?exports.Brush=_668:null;
})();

