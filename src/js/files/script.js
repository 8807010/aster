// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";


// Header
const userHeader = document.querySelector('.user-header');
if (userHeader) {
  document.addEventListener("click", function (e) {
    const targetElement = e.target;
    if (targetElement.closest('.user-header__arrow')) {
      userHeader.classList.toggle('user-header_open');
    } else if (!targetElement.closest('.user-header')) {
      userHeader.classList.remove('user-header_open');
    }
  });
}

const search = document.querySelector('.search');
if (search) {
  document.addEventListener("click", function (e) {
    const targetElement = e.target;
    if (targetElement.closest('.search__icon')) {
      search.classList.add('search__open');
    } else if (!targetElement.closest('.search')) {
      search.classList.remove('search__open');
    }
  });
}
