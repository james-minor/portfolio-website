/* Controls the Sidebar navigation menus.
*/
const sections = document.getElementsByTagName("section");
var scrollBreakPoints = [];

for(var i = 0; i < sections.length; i++)
{
	scrollBreakPoints.push(sections[i].offsetTop);
}

window.addEventListener('resize', function(event)
{
	scrollBreakPoints = [];

	for(var i = 0; i < sections.length; i++)
	{
		scrollBreakPoints.push(sections[i].offsetTop);
	}
}, true);

const navigationList = document.getElementById("internal-links").getElementsByTagName("a");
var menuOpened = false;

// --- OnClick Event Callbacks ---

navigationList[0].onclick = function navigate()
{
	window.scrollTo(0, scrollBreakPoints[2] + 87);
}

navigationList[1].onclick = function navigate()
{
	window.scrollTo(0, scrollBreakPoints[1] + 80);
}

navigationList[2].onclick = function navigate()
{
	window.scrollTo(0, scrollBreakPoints[0]);
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
