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

const moreNews = document.querySelector('.news-module__buttton');
moreNews.addEventListener("click", loadNews);

async function loadNews(e) {
  const server = 'files/data/news.json';
  const response = await fetch(server, {
    method: 'GET',
  });
  if (response.ok) {
    const responseResult = await response.json();
    newsBuild(responseResult);
  } else {
    alert("Error");
  }
  e.preventDefault();
}

const template =
  `<article class="news-module__item item %noimage%">
		<div class="item__body">
			<h4 class="item__title">
				<a href="#" class="item__link-title">%title%</a>
			</h4>
			<div class="item__text">%text%</div>
		</div>
		%imagePlace%
		<div class="item__footer">
			<div class="item__info info-item">
				<a href="" class="info-item__category">%category%</a>
				<div class="info-item__time">%publish%</div>
			</div>
			<div class="item__actions actions-item">
				<a href="%share%" class="actions-item__link _icon-share">Share</a>
				<a href="%read%" class="actions-item__link _icon-read">Read Later</a>
			</div>
		</div>
	</article>`;

const templateImage = `
	<a href="#" class="item__image-ibg">
		<img src="img/%image%" alt="">
	</a>`;

function newsBuild(data) {
  const news = data.news;
  if (news.length) {
    const blockItems = document.querySelector('.news-module__items');
    news.forEach(newsItem => {
      let templateItem = template;
      let templateImageItem = templateImage;
      for (const key in newsItem) {
        templateItem = templateItem.replace(`%${key}%`, newsItem[key]);
      }
      if (!newsItem.image) {
        templateItem = templateItem.replace(`%noimage%`, 'item_noimage');
        templateItem = templateItem.replace(`%imagePlace%`, '');
      } else {
        templateItem = templateItem.replace(`%noimage%`, '');
        templateImageItem = templateImageItem.replace(`%image%`, newsItem.image);
        templateItem = templateItem.replace(`%imagePlace%`, templateImageItem);
      }
      blockItems.insertAdjacentHTML('beforeend', templateItem);
    });
  } else {
    console.log("No data");
  }
}
