const menuBtn = document.querySelector(".menu__btn");
const menuList = document.querySelector(".menu__list");
const portfolioBtn = document.querySelector(".button-59");
const portfolioList = document.querySelector(".portfolio_info")
function toggleMenuVisibility() {
menuList.classList.toggle("hide");
}
menuBtn.addEventListener("click", toggleMenuVisibility);
function togglePortfolioVisibility() {
portfolioList.classList.toggle("hide");
}
portfolioBtn.addEventListener("click", togglePortfolioVisibility);