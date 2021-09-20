/* Controls the Sidebar navigation menus.
*/
const sections = document.getElementsByTagName("section");
var scrollBreakPoints = [0];

for(var i = 1; i < sections.length; i++)
{
	scrollBreakPoints.push(sections[i].offsetTop + 15);
}

window.addEventListener("resize", function(event)
{
	scrollBreakPoints = [0];

	for(var i = 1; i < sections.length; i++)
	{
		scrollBreakPoints.push(sections[i].offsetTop);
	}
}, true);

const navigationList = document.getElementById("scroll-selectors").getElementsByTagName("a");

// --- OnClick Event Callbacks ---

navigationList[0].onclick = function navigate()
{
	window.scrollTo(0, scrollBreakPoints[2] + 85);
}

navigationList[1].onclick = function navigate()
{
	window.scrollTo(0, scrollBreakPoints[1] + 85);
}

navigationList[2].onclick = function navigate()
{
	window.scrollTo(0, scrollBreakPoints[0]);
}

// --- Opening the mobile navigation menu ---
var menuOpened = false;
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
