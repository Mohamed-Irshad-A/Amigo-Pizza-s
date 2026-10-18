const popUpContainer = document.getElementById("pop-up");

const pageNavigatorYes = document.getElementById("yes");
const pageNavigatorNo = document.getElementById("no");

// popUp page disappear
const popUpDisappear = () => {
    popUpContainer.style.display="none";
}

//popUp page appear
const popUpAppear = () => {
    popUpContainer.style.display="block";
}

// After loading the page
window.onload = popUpAppear;

// by clicking from nav

pageNavigatorYes.addEventListener("click", () => {
    window.open('../orders_page/index.html', '_blank');
    popUpDisappear();
});

pageNavigatorNo.addEventListener("click", () => {
    popUpDisappear();
})


