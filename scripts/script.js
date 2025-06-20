'use strict'

document.addEventListener("DOMContentLoaded", () => {
    // * 1. Начало.
    // * 2. Получаем все элементы изображений с описанием.   
    // * 3. Для каждого изображения (проверяем есть ли такие изображения):
    // *   3.1. Добавляем обработчик наведения курсора на изображение:
    // *       3.1.1. Да:
    // *             3.1.1.1. показываем текст при наведении.
    // *             3.1.2. Нет, ну что поделать: продолжаем
    // *   3.2. Добавляем обработчик курсор уходит с изображения:
    // *       3.3.1. Да:
    // *             3.3.1.1. Скрываем элемент с описанием.
    // *       3.3.2. Нет, ну что поделать: продолжаем.
    // * 4. Конец.
    console.log('Скрипт отработал корректно')

    const header = document.querySelector('.header');

    if (header) {
        console.log('Константа header существует');
        const heightHeader = header.offsetHeight;

        document.addEventListener('scroll', () => {

            console.log('Страница скролится');

            let scrollPageY = this.scrollY;
            {
                if (scrollPageY > heightHeader) {
                    header.classList.add('header--background');

                } else {
                    header.classList.remove('header--background');
                }
            }
        });
    }

    //модальное окно для войти
    const welcоmeButtonModal = document.querySelector(".header__login");
    const modalApplication = document.querySelector(".window");
    const modalLogin = document.querySelector(".popup__login");

    if (welcоmeButtonModal && modalApplication && modalLogin) {
        welcоmeButtonModal.addEventListener("click", () => {
            modalApplication.removeAttribute("hidden");
        });

        const closeModalButton = document.querySelector(".popup__end");
        closeModalButton.addEventListener("click", () => {
            modalApplication.setAttribute("hidden", true);
        });
        window.addEventListener("click", (event) => {
            if (event.target === modalApplication) {
                modalApplication.setAttribute("hidden", true);
            }
        });
    };
    const modalButtonReg = document.querySelector(".header__reg");
    const modalApplicationReg = document.querySelector(".dialog");
    const modalReg = document.querySelector(".popup__reg");
    if (modalButtonReg && modalApplicationReg && modalReg) {
        modalButtonReg.addEventListener("click", () => {
            modalApplicationReg.removeAttribute("hidden");
        });

        const closeModalButtonReg = document.querySelector(".popup__close");
        closeModalButtonReg.addEventListener("click", () => {
            modalApplicationReg.setAttribute("hidden", true);
        });
        window.addEventListener("click", (event) => {
            if (event.target === modalApplicationReg) {
                modalApplicationReg.setAttribute("hidden", true);
            }
        });
    };
    // 3.4.формирование массива
    const reviewsContainer = document.querySelector(".reviews");
    if (reviewsContainer) {
        const dataTitleReviews = [
            "Ибрагим Афганович",
            "Прасковья Подмосковьева",
            "Глафира Лежнина",
        ];
        const titleReviews =
        reviewsContainer.querySelectorAll(".reviews__subtitle");
        titleReviews.forEach((item, index) => {
            item.textContent = dataTitleReviews[index];
           });
    }

//3.5
const headerMenu = document.querySelector('.header__menu');
if (headerMenu){
    const headerList = headerMenu.querySelector('.header__list');
    const menuData = {
        link1: {
            link: '#',
            title: 'ТОП КАРртин',
        },
        link2: {
            link: '#',
            title: 'Покупка билетов',
        }
    }
    const createLink = (UrlLink, title) =>{
        const link = `
        <li class="header__item"><a href="${UrlLink}" class="header__item-link">${title}</a></li>
        `;
        return link;
    }
    for (const linkItem in menuData) {
        const link = menuData[linkItem];
        const linkIndex = createLink(link.link, link.title);
        headerList.insertAdjacentHTML('beforeend', linkIndex);

    }
    
let currentIndex = 0; //индекс карточек
const slider = document.querySelectorAll(".images__card");
const prevButton = document.querySelector(".pictures__left");
const nextButton = document.querySelector(".pictures__right");
const visibleCards = 3; //количество отображаемых карточек
updateSlider();

prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
    }else {
       currentIndex = slider.length - visibleCards; // Переxод к последним карточкам 
    }
    updateSlider();
});

nextButton.addEventListener("click", () => {
    if (currentIndex < slider.length - visibleCards) { 
        currentIndex++;
    }else {
        currentIndex = 0; // Переход к началу карточек
    }
    updateSlider();
});

function updateSlider() {
    slider.forEach((item, index) => {
       // Проверяем, нужно ли показывать карточку
       if (index >= currentIndex && index < currentIndex + visibleCards) {
        item.style.display="block"; // Показываем карточку
       } else {
        item.style.display="none"; // Скрываем карточку 
       }
    });
}
};
const cardsImages = document.querySelector(".images");
if (cardsImages) {
    const cardListImages = cardsImages.querySelector(".images__list");
    // Функция для создания карточки
    const createCard = (imageUrl, imageAlt, imageWidth, Subtitle, Author) => {
    // Шаблонные строки и подстановки
    const image = `
        <li class="images__item">
            <img class="pictures__image" src="${imageUrl[0]}" alt="${imageAlt}" width="${imageWidth}">
            <img class="pictures__image" src="${imageUrl[1]}" alt="${imageAlt}" width="${imageWidth}" style="display: none;">
            <h3 class="pictures__subtitle">${Subtitle} </h3>
            <p class="pictures__author">${Author}</p>
            <button class="pictures__link" type="button">Подробнее</button>
        </li>`;
        return image;
    };
    const apiUrl = "images.json";
    // Запрос к серверу с помощью метода fetch
    fetch(apiUrl)
    // После того как запрос выполнен, возвращается объект Response, где вызывается метод json(), который преобразует ответ в формат JSON
    .then((response) => response.json())
    //получение данных 
    .then((images) => {
        console.log(images); // Вывод данных в консоль
        console.log(typeof images); // Вывод в консоль Типа полученных данных

        images.forEach((item) => {
// создается переменная cardElement, где для каждого элемента массива вызывается функция createCard и передаются параметры
            const cardElement = createCard(
                item.imageUrl,
                item.imageAlt,
                item.imageWidth,
                item.Subtitle,
                item.Author
            );
// Добавление карточки на страницу в список cardListImages  с помощью метода insertAdjacentHTML beforeend указывает, что карточка должна быть добавлена в конец списка
            cardListImages.insertAdjacentHTML("beforeend", cardElement);
        });
        const pictures = document.querySelectorAll(".pictures__image");
        if (pictures) {
            // Перебираем каждое изображение
            pictures.forEach((picture) => {
                picture.addEventListener("click", () => {
                    // Получаем родительский элемент (li)
                    const parentItem = picture.parentElement;
        
                    // Получаем все изображения в родительском элементе
                    const parentPictures =
                        parentItem.querySelectorAll(".pictures__image");
        
                    // Переключаем видимость изображений
                    parentPictures.forEach((parentPictures) => {
                        if (parentPictures !== picture) {
                            parentPictures.style.display = "block"; // Показываем другое изображение
                        } else {
                            parentPictures.style.display = "none"; // Скрываем текущее изображение
                        }
                    });
                });
            });
        }              
    });        
}

    const preloader = document.querySelector(".preloader");
    const content = document.querySelector(".content");
    if (preloader && content) {
        setTimeout(() => {
            // Скрываем прелоадер
            preloader.style.opacity = "0";
            preloader.style.visibility = "hidden";

            // Показываем контент
            content.style.display = "block";

            // Удаляем элемент из DOM
            preloader.remove();
          }, 1000); // Задержка 3 секунды
    }
    
    var swiper = new Swiper(".mySwiper", {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
   });
});

