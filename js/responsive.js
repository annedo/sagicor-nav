var viewWidth = window.innerWidth;
    mainMenuControl = getID("mainMenu_control");
    mainMenu = getID("mainMenu");
    menuUp = getID("menu--up");

    smallSubMenuControl = document.querySelectorAll(".nav--smallscreens .nav__item");
    smallCareersLi = getID("careers-li");
    smallCareersLink = getID("careers-link");

    smallSubMenus = document.querySelectorAll(".nav--smallscreens .nav__sublist");
    smallSubLinks = document.querySelectorAll(".nav--smallscreens .nav__sublink");
    smallSubSubLinks = document.querySelectorAll(".nav--smallscreens .nav__subsublink");
    
    wideSubMenuControl = document.querySelectorAll(".nav--widescreens .nav__item");
    wideSubMenus = document.querySelectorAll(".nav--widescreens .nav__sublist");
    menuLines = document.querySelectorAll(".menu--line");
    
addEvent(window, "load", createNavKeys);
addEvent(menuUp, "click", scrollUp);
addEvent(mainMenuControl, "click", mainMenuExpand);
addEvent(mainMenuControl, "keydown", mainMenuKey);

function createNavKeys() {
    for ( i = 0; i < smallSubMenuControl.length; i++ ) {
        addEvent(smallSubMenuControl[i], "click", menuExpand);
        addEvent(smallSubMenuControl[i], "keydown", menuExpandKey);
        addEvent(wideSubMenuControl[i], "mouseenter", menuExpand);
        addEvent(wideSubMenuControl[i], "mouseleave", menuExpand);
        addEvent(wideSubMenuControl[i], "focusin", menuExpand);
        addEvent(wideSubMenuControl[i], "focusout", menuExpand);
    }
}

function mainMenuKey(e) {
    var code = e.which;
    if (code == 13 || code == 32) {
        mainMenuExpand.call(this);
    }
}

function mainMenuExpand() {
    if (hasClassName(mainMenu, "toggle-hide") == true) {
        replaceClassName(mainMenu, "toggle-hide", "toggle-show-main");
        var menuLinesClassArr = ["menu--line1--open", "menu--line2--open", "menu--line3--open"];
        for (i = 0; i < menuLinesClassArr.length; i++) {
            addClassName(menuLines[i], menuLinesClassArr[i]);
        }
        for (i = 0; i < smallSubMenuControl.length; i++) {
            smallSubMenuControl[i].tabIndex = 0;
        }
        smallCareersLi.tabIndex = -1;
        smallCareersLink.tabIndex = 0;
    }
    else {
        replaceClassName(mainMenu, "toggle-show-main", "toggle-hide");
        for (i = 0; i < menuLines.length; i++) {
            menuLines[i].className = "menu--line";
        }
        for (i = 0; i < smallSubMenuControl.length; i++) {
            smallSubMenuControl[i].tabIndex = -1;
        }
        smallCareersLi.tabIndex = -1;
        smallCareersLink.tabIndex = -1;
    }
}

function menuExpandKey(e) {
    var code = e.which;
    if (code == 13 || code == 32) {
        menuExpand.call(this);
    }

}

function menuExpand() {
    var menuIndex;
    var menuSize;
    var menuToggled;
    for ( i = 0; i < smallSubMenuControl.length; i++) {
        if (smallSubMenuControl[i] == this) {
            menuIndex = i;
            menuSize = 0;
        }
        else if (wideSubMenuControl[i] == this) {
            menuIndex = i;
            menuSize = 1;
        }
    }
    if (menuSize == 0) {
        menuToggled = smallSubMenus[menuIndex];
    }
    else {
        menuToggled = wideSubMenus[menuIndex];
    }

    if (hasClassName(menuToggled, "toggle-hide") == true) {
        replaceClassName(menuToggled, "toggle-hide", "toggle-show-sub");
        for (i = 0; i < smallSubLinks.length; i++) {
            smallSubLinks[i].tabIndex = 0;
        }
    }
    else {
        replaceClassName(menuToggled, "toggle-show-sub", "toggle-hide");
        for (i = 0; i < smallSubLinks.length; i++) {
            smallSubLinks[i].tabIndex = -1;
        }
    }
}

function scrollUp() {
    if (document.body.scrollTop == 0) {
        scrollTo(document.documentElement, 0, 300);
    }
	else {
        scrollTo(document.body, 0, 300);
    }
}

function scrollTo(element, to, duration) {
        difference = 0 - window.scrollY;
        perTick = difference / duration *10;
    if (duration <= 0) return;
        difference = to - element.scrollTop;
        perTick = difference / duration * 10;

    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
    }, 10);
}