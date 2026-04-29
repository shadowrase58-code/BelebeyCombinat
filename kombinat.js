// Получаем элемент хедера (фиксированную верхнюю панель)
const headerTop = document.querySelector('.header__top-inner');

// Функция, которая добавляет/удаляет класс при скролле
function handleScroll() {
    if (window.scrollY > 100) {  // Если прокрутили больше 50px
        headerTop.classList.add('scrolled');
    } else {
        headerTop.classList.remove('scrolled');
    }
}

// Слушаем событие прокрутки
window.addEventListener('scroll', handleScroll);
// Вызываем один раз при загрузке, чтобы установить начальное состояние
handleScroll();