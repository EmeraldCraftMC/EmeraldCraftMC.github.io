var slide
function main(){
	var slider = document.getElementById("slider-list"),
		children = slider.getElementsByTagName("li"),
		image = document.getElementById("image"),
		intro = document.getElementById("intro"),
		cell = document.getElementById("intro-table-image-cell"),
		description = $("#slider-description"),
		button = $("#slider-description-button"),
		buttonText = $("#slider-description-button-text"),
		descriptionTexts = [
			description.html(),
			"Vote for daily rewards!",
			"I can't put this into words. This server is just. Amazing. Incredible and just amazing..",
			"Join us noob",
			"Shh, Rob smells. :)",
			"Owner is EmeraldDudeMC (ROB)"
		],
		buttonTexts = [
			buttonText.html(),
			"Vote",
			"Join Us",
			"EmeraldCraftMC>DDNS.US",
			"He does. :3",
			"I love you!"
		],
		x = 0, startX = 0,
		delay = 5000,
		before, after, speed, timeout, classList, $circle, circles = [];

	$("#slider-list").children().each(
		function(index){
			classList = 'slider-circle clickable';
			if(index === 0)classList = 'slider-circle selected';
			$circle = $("<li class='"+classList+"'></li>");
			circles.push($circle);
			$("#slider-circles").append($circle)
		}
	);

	$(".slider-circle").click(
		function(e){
			slide($(this).index(), "absolute");
		}
	);

	$("#slider").mouseover(
		function(){
			$(".slider-button.left").css("left", 0);
			$(".slider-button.right").css("right", 0);
		}
	);

	$("#slider").mouseleave(
		function(){
			$(".slider-button.left").css("left", "-192px");
			$(".slider-button.right").css("right", "-192px");
		}
	);
	button.css("width", buttonText.css("width"));

	slide = function(change, type){
		startX = x;
		if(change === undefined)change = 1;
		type = type || "relative";
		circles[x].attr("class", "slider-circle clickable");
		if(type === "relative")x += change;
		else if(type === "absolute")x = change;
		if(x < 0)x = children.length-1;
		if(x >= children.length)x = 0;
		circles[x].attr("class", "slider-circle selected");
		slider.style.transform = "translateX(-"+x*100+"vw)";
		if(startX !== x){
			buttonText.animate({opacity: 0}, 500, function(){
				button.css("width", "");
				buttonText.html(buttonTexts[x]);
				button.css("width", buttonText.css("width"));
				buttonText.animate({opacity: 1}, 1000);
			});
			description.animate({opacity: 0}, 500, function(){
				description.html(descriptionTexts[x]);
				description.animate({opacity: 1}, 1000);
			});
		}
		clearTimeout(timeout);
		timeout = setTimeout(slide, delay);
	}
	timeout = setTimeout(slide, delay);

	onresize = resize = function(){
		image.style.width = 0;
		image.style.width = getComputedStyle(intro).getPropertyValue("height");
	}

	cell.className += " with-javascript";

	resize();
}

$(main);
