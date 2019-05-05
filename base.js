var nowPath=location.pathname.split('/').pop();

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