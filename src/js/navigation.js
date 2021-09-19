/* Controls the Sidebar navigation menus.
*/
const navigationList = document.getElementById("internal-links").getElementsByTagName("a");

const pageScroll = [
	1600,
	800,
	0
];

var menuOpened = false;

// --- OnClick Event Callbacks ---

navigationList[0].onclick = function navigate()
{
	window.scrollTo(0, pageScroll[0]);
}

navigationList[1].onclick = function navigate()
{
	window.scrollTo(0, pageScroll[1]);
}

navigationList[2].onclick = function navigate()
{
	window.scrollTo(0, pageScroll[2]);
}

function openMobileNavigationMenu(button)
{
	button.classList.toggle("menu-opened");
	menuOpened = !menuOpened;

	if(menuOpened)
	{
		document.getElementById("mobile-nav").style.width = "100%";
	}
	else
	{
		document.getElementById("mobile-nav").style.width = "0%";
	}
}
