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
		closeMobileMenu();
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
	// -80% 1 copy
	// -60% 4
	// -40% 3
	// -20% 2
	// 0% 1
	let sliderPosition=0;
	let isSliding=false;

	var timer=setInterval(sliding, 5000);
	function sliding(){
		isSliding=true;
		if(sliderPosition==-60){
			//第4枚
			sliderPosition=-80;
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
			sliderPosition-=20;
			sliderWrapper.style.transform="translateX("+sliderPosition+"%)";
		}
	}

	sliderWrapper.addEventListener('transitionend', function(){
		var nowActived=document.querySelector('.dot.active');
		nowActived.classList.remove('active');
		if(sliderPosition==0 || sliderPosition==-80){
			dot1.classList.add('active');
		}else if(sliderPosition==-20){
			dot2.classList.add('active');
		}else if(sliderPosition==-40){
			dot3.classList.add('active');
		}else{
			dot4.classList.add('active');
		}

		isSliding=false;
	});


	dot1.addEventListener('click', function(){
		if(isSliding==false){
			sliderPosition=0;
			sliderWrapper.style.transform="translateX("+sliderPosition+"%)";
			clearInterval(timer);
			timer=setInterval(sliding, 5000);
		}
	});

	dot2.addEventListener('click', function(){
		if(isSliding==false){
			sliderPosition=-20;
			sliderWrapper.style.transform="translateX("+sliderPosition+"%)";
			clearInterval(timer);
			timer=setInterval(sliding, 5000);
		}
	});

	dot3.addEventListener('click', function(){
		if(isSliding==false){
			sliderPosition=-40;
			sliderWrapper.style.transform="translateX("+sliderPosition+"%)";
			clearInterval(timer);
			timer=setInterval(sliding, 5000);
		}
	});

	dot4.addEventListener('click', function(){
		if(isSliding==false){
			sliderPosition=-60;
			sliderWrapper.style.transform="translateX("+sliderPosition+"%)";
			clearInterval(timer);
			timer=setInterval(sliding, 5000);
		}
	});

}

if(nowPath=='' || nowPath=='index.html'){
	sliderShow();
}

var sections=document.querySelectorAll('section');
var lastY;
function sectionShowUp(e){
	if(lastY-pageYOffset<0){
		for(each in sections){
			if(sections[each].offsetTop-innerHeight<pageYOffset && !sections[each].classList.contains('uping')){
				sections[each].classList.add('uping');
			}
		}
	}
	lastY=pageYOffset;
}

//for only loading in the middle of the page
function middleLoad(){
	for(each in sections){
		if(sections[each].offsetTop-innerHeight<pageYOffset && !sections[each].classList.contains('uping')){
			sections[each].classList.add('uping');
		}
	}
}

window.addEventListener('scroll', sectionShowUp);

function choose(content){
	choosedText.textContent=content;
	dropdownInput.value=content;
	choosedText.classList.add('active');
	dropdownWrapper.classList.remove('show');

}

function jsonp(url){
    var mailXhr=new XMLHttpRequest();
	mailXhr.open('POST', 'https://work-capital-server.com/postcode/index.php', true);
	mailXhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	mailXhr.onreadystatechange=function(){
		if(mailXhr.readyState==4 && mailXhr.status==200){
			var json=JSON.parse(mailXhr.responseText);
			// console.log(json.city);
			// console.log(json.address);
			// 都道府県
			choosedText.textContent=json.city;
			choosedText.classList.add('active');
			dropdownInput.value=json.city;
			// 市区町村
			address2.value=json.address;
		}
	};
	mailXhr.send("code="+url);
}

function openMobileMenu(){
	document.body.classList.add('mobile-menu-opened');
	mobileMenu.classList.add('opened');
}

// menu dropdown
function closeMobileMenu(){
	//mobile menu dropdown
	document.body.addEventListener('touchstart', function(event){

		if(event.target.tagName=='BODY' && mobileMenu.classList.contains('opened')){
			document.body.classList.remove('mobile-menu-opened');
			mobileMenu.classList.remove('opened');
		}
	})

}

function saveValue2(th, e, name){
	e.preventDefault();
	localStorage['inquiry002']=name;
	location.href=th.href;
}

function saveValue4(th, e, name){
	e.preventDefault();
	localStorage['inquiry004']=name;
	location.href=th.href;
}

function includeName2(){
	if(window['inquiry002']){
		inquiry002.value=localStorage['inquiry002'];
	}else{
		localStorage['inquiry002']='';
	}
}

function includeName4(){
	if(window['inquiry004']){
		inquiry004.value=localStorage['inquiry004'];
	}else{
		localStorage['inquiry004']='';
	}
}