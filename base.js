var nowPath=location.pathname.split('/').pop();

var headerXhr=new XMLHttpRequest();

headerXhr.open('GET', 'header.html', true);
headerXhr.send();

headerXhr.onreadystatechange=function(){
	if(headerXhr.readyState==4 && headerXhr.status==200){

		header.innerHTML = headerXhr.responseText;


	}
};

// menu.html load
var menuXhr=new XMLHttpRequest();

menuXhr.open('GET', 'menu.html', true);
menuXhr.send();

menuXhr.onreadystatechange=function(){

	
	if(menuXhr.readyState==4 && menuXhr.status==200){

		menu.innerHTML = menuXhr.responseText;
		if(menuXhr.responseText){
			// menuHighlight();
		}

	}

};

//footer.html load
var footerXhr=new XMLHttpRequest();

footerXhr.open('GET', 'footer.html', true);
footerXhr.send();

footerXhr.onreadystatechange=function(){
	if(footerXhr.readyState==4 && footerXhr.status==200){

		footer.innerHTML = footerXhr.responseText;

	}
};

function sliderShow(){
	// -75% 1 copy
	// -50% 3
	// -25% 2
	// 0% 1
	let sliderPosition=0;
	let isSliding=false;

	setInterval(function(){
		isSliding=true;

		if(sliderPosition==-50){
			//第3枚
			sliderPosition-=25;
			sliderWrapper.style.transform="translateX("+sliderPosition+"%)";
			setTimeout(function(){
				sliderWrapper.style.transition="none";
				sliderPosition=0;
				sliderWrapper.style.transform="translateX("+sliderPosition+"%)";
			}, 500);

			setTimeout(function(){
				sliderWrapper.style.transition="";
			}, 900);


		}else{
			//第1枚、第2枚
			sliderPosition-=25;
			sliderWrapper.style.transform="translateX("+sliderPosition+"%)";
		}

	}, 5000);

	sliderWrapper.addEventListener('transitionend', function(){
		var nowActived=document.querySelector('.dot.active');
		nowActived.classList.remove('active');
		if(sliderPosition==0 || sliderPosition==-75){
			left.classList.add('active');
		}else if(sliderPosition==-25){
			center.classList.add('active');
		}else{
			right.classList.add('active');
		}

		isSliding=false;
	});


	left.addEventListener('click', function(){
		if(isSliding==false){
			sliderPosition=0;
			sliderWrapper.style.transform="translateX("+sliderPosition+"%)";
		}
	});

	center.addEventListener('click', function(){
		if(isSliding==false){
			sliderPosition=-25;
			sliderWrapper.style.transform="translateX("+sliderPosition+"%)";
		}
	});

	right.addEventListener('click', function(){
		if(isSliding==false){
			sliderPosition=-50;
			sliderWrapper.style.transform="translateX("+sliderPosition+"%)";
		}
	});

}

if(nowPath=='' || nowPath=='index.html'){
	sliderShow();
}

function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

var sections=document.querySelectorAll('section');
function sectionShowUp(e){
	if(e.deltaY>=1){
		for(each in sections){
			if(sections[each].offsetTop-innerHeight/2<scrollY && !sections[each].classList.contains('uping')){
				sections[each].classList.add('uping');
			}
		}
	}
}

window.addEventListener('wheel', debounce(sectionShowUp, 20));

