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
// Обработка формы обратной связи (демо-режим)
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    const successMessage = document.getElementById('formSuccessMessage');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const consent = document.getElementById('consent');
            if (!consent.checked) {
                alert('Пожалуйста, подтвердите согласие на обработку персональных данных');
                return;
            }

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const topic = document.getElementById('topic').value;
            const message = document.getElementById('message').value.trim();
            
            if (!name) {
                alert('Пожалуйста, заполните поле "Ваше имя"');
                return;
            }
            if (!email) {
                alert('Пожалуйста, заполните поле "Email"');
                return;
            }
            if (!topic) {
                alert('Пожалуйста, выберите тему обращения');
                return;
            }
            if (!message) {
                alert('Пожалуйста, напишите текст сообщения');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Пожалуйста, введите корректный email (например, name@domain.ru)');
                return;
            }

            console.log('=== ДЕМО-РЕЖИМ: данные формы ===');
            console.log('Имя:', name);
            console.log('Email:', email);
            console.log('Телефон:', document.getElementById('phone').value);
            console.log('Тема:', topic);
            console.log('Сообщение:', message);
            console.log('================================');

            form.style.display = 'none';
            successMessage.style.display = 'block';
        });
    }
});