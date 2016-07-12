$(function(){
	/*$('.animation')
	.delay(2000)
	.animate({width:400},1000)
	.delay(1000)
	.queue(function(){
      $(this).css({'backgroundColor':'green'}).dequeue();
	})
	.delay(1000)
	.animate({height:500},2000)

for (var i = 0; i < 100; i++) {
var b=Math.floor(Math.random()*20+100);
var w=Math.floor(Math.random()*3+5);
var left=Math.floor(Math.random()*$(document).width());
var top=Math.floor(Math.random()*$(document).height());
$('<div>')
.addClass('zidan')
.width(w)
.height(w)
.css({'backgroundColor':'rgba(50,255,'+b+',0.4)'})
.appendTo('body')
.delay(i*20)
.animate({left:left,top:top});	
};*/
var poker=[];
var biao={};
while (poker.length<52) {
	var color=['c','h','d','s'];
	/*var number=['A','2','3','4','5','6','7','8','9','T','J','Q','K'];*/
	var	c=color[Math.floor(Math.random()*4)];
	var n=Math.ceil(Math.random()*13);
	var item={color:c,number:n};
	if (!biao[c+'-'+n]) {
	poker.push({color:c,number:n});
	biao[c+'-'+n]=true;
	};
};

console.table(poker);
var dict={
	1:'A',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',10:'T',11:'J',12:'Q',13:'K'
};
for (var i = 0,index=0; i < 7; i++) {
	for (var j = 0; j <i+1 ; j++) {
		
	$('<div>')
    .addClass('pai shang')
    .delay(index*100)
    .css({backgroundImage:'url(img/'+dict[poker[index].number]+poker[index].color+'.jpg)'})
    .attr('id',i+'-'+j)
    .data('number',poker[index].number)
    .animate({
    	top:50*i,
    	left:(6-i)*50+j*100,
    	opacity:1
    })
    .appendTo('.zhuozi')
    index+=1;
	};	
};

for (; index < poker.length; index++) {
	$('<div>')
    .addClass('pai zuo')
    .data('number',poker[index].number)
    .delay(index*100)
    .css({backgroundImage:'url(img/'+dict[poker[index].number]+poker[index].color+'.jpg)'})
    .animate({
    	top:460,
    	left:150,
    	opacity:1
    })
    .appendTo('.zhuozi')

};

var meiyoubeiyazhu=function(e){
  var x=Number($(e).attr('id').split('-')[0]);
  var y=Number($(e).attr('id').split('-')[1]);
  return $('#'+(x+1)+'-'+y).length||$('#'+(x+1)+'-'+(y+1)).length;

}

var shangyizhang=null;
$('.zhuozi .pai').on('click',function(){
	// $(this).css({
	// 	border:'3px solid blue',
	// }).animate({
	// 	top:'-=30',
	// })
// var id=$(this).attr('id');
// console.log(id);
	if($(this).hasClass('shang')&&meiyoubeiyazhu(this)){
		return;
	}

	if($(this).data('number')===13){
		$(this).animate({top:0,left:600,opacity:0}).queue(function(){
				$(this).remove();
			})
		return;
	}


	$(this).toggleClass('chulie');
	if($(this).hasClass('chulie')){
		$(this).animate({top:'-=30'})
	}else{
		$(this).animate({top:'+=30'})
	}
	//diyicidianji
	if(!shangyizhang){
			shangyizhang=$(this);
		}else {
			//diercidianji
			if(shangyizhang.data('number')+$(this).data('number')===13){
			$('.zhuozi .chulie').delay(400).animate({
				top:0,
				left:600,
				opacity:0,
			}).queue(function(){
				$(this).remove();
			})
		}else{
			$('.zhuozi .chulie').removeClass('chulie').animate({top:'+=30'})
		}

			shangyizhang=null;
		}
})
   var zIndex=1;
   $('.zhuozi .move-right').on('click',function(){
       zIndex+=1;
      $('.zhuozi .pai.zuo').eq(-1).removeClass('zuo').addClass('you').animate({top:460,left:520}).css({zIndex:zIndex})

   })


// 向左
 var cishu=0;
 $('.zhuozi .move-left').on('click',function(){
 	if($('.zhuozi .zuo').length){
 		return;
 	}
 	if(cishu>3){
 		return;
 	}

   $('.zhuozi .you').each(function(i,el){

  	$(this).delay(i*30).animate({top:460,left:150}).css({zIndex:0}).removeClass('you').addClass('zuo')
   })
 })

})