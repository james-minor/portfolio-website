const navigationList = document.getElementById("internal-links").getElementsByTagName("a");

const pageScroll = [
	500,
	100,
	0
];

navigationList[0].onclick = function navigate()
{
	window.scrollTo(0, pageScroll[0]);
	console.log("Scrolled to: " + pageScroll[0]);
}

navigationList[1].onclick = function navigate()
{
	window.scrollTo(0, pageScroll[1]);
	console.log("Scrolled to: " + pageScroll[1]);
}

navigationList[2].onclick = function navigate()
{
	window.scrollTo(0, pageScroll[2]);
}
