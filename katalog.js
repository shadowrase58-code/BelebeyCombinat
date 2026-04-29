document.addEventListener('DOMContentLoaded', function() {
            // Получаем все элементы навигации и карточки
            const categoryLinks = document.querySelectorAll('.category-link');
            const allCards = document.querySelectorAll('.card');
            
            // Функция для обновления активного состояния кнопок
            function setActiveCategory(categoryId) {
                // Убираем класс active у всех кнопок
                document.querySelectorAll('.navigation-item1, .navigation-item2, .navigation-item3, .navigation-item4').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Добавляем класс active нужной кнопке
                if (categoryId === 'all') {
                    document.getElementById('cat-all').classList.add('active');
                } else if (categoryId === 'oil') {
                    document.getElementById('cat-oil').classList.add('active');
                } else if (categoryId === 'hard-cheese') {
                    document.getElementById('cat-hard-cheese').classList.add('active');
                } else if (categoryId === 'soft-cheese') {
                    document.getElementById('cat-soft-cheese').classList.add('active');
                }
            }
            
            // Функция для фильтрации карточек
            function filterCards(category) {
                // Сначала показываем все карточки
                allCards.forEach(card => {
                    card.classList.remove('hidden');
                });

                // Затем скрываем ненужные
                if (category !== 'all') {
                    allCards.forEach(card => {
                        if (card.getAttribute('data-category') !== category) {
                            card.classList.add('hidden');
                        }
                    });
                }
            }
            
            // Добавляем обработчики событий на все категории
            categoryLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault(); // Отменяем переход по ссылке
                    
                    const category = this.getAttribute('data-category');
                    
                    // Обновляем активную кнопку
                    setActiveCategory(category);
                    
                    // Фильтруем карточки
                    filterCards(category);
                });
            });
            
            // Инициализация - показываем все товары
            filterCards('all');
        });

        // слайдер
        const sliderContainer = document.querySelector('.slider-container');
        const sliderWrapper = document.querySelector('.slider-wrapper');
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        let currentSlide = 0;
        const totalSlides = slides.length;
        
        // Переменные для перетаскивания
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        let startTransform = 0;
        let dragStartTime = 0;
        
        // Обновление позиции слайдера
        function updateSlider(animate = true) {
            const translateX = -currentSlide * 100;
            if (animate) {
                sliderWrapper.style.transition = 'transform 0.3s ease-out';
            } else {
                sliderWrapper.style.transition = 'none';
            }
            sliderWrapper.style.transform = `translateX(${translateX}%)`;
            
            // Обновляем активные точки
            dots.forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Переключение на следующий слайд
        function nextSlide() {
            if (currentSlide < totalSlides - 1) {
                currentSlide++;
            } else {
                currentSlide = 0;
            }
            updateSlider(true);
        }
        
        // Переключение на предыдущий слайд
        function prevSlide() {
            if (currentSlide > 0) {
                currentSlide--;
            } else {
                currentSlide = totalSlides - 1;
            }
            updateSlider(true);
        }
        
        // Переключение на конкретный слайд
        function goToSlide(index) {
            currentSlide = index;
            updateSlider(true);
        }
        
        // Обработчики перетаскивания мышкой
        function onDragStart(e) {
            isDragging = true;
            startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
            dragStartTime = Date.now();
            startTransform = -currentSlide * 100;
            
            sliderWrapper.style.transition = 'none';
            sliderContainer.classList.add('dragging');
            
            e.preventDefault();
        }
        
        function onDragMove(e) {
            if (!isDragging) return;
            
            const moveX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
            const deltaX = moveX - startX;
            const dragPercent = (deltaX / sliderContainer.offsetWidth) * 100;
            let newTransform = startTransform + dragPercent;
            
            // Ограничиваем перетаскивание
            if (newTransform > 0) {
                newTransform = newTransform * 0.3; // Сопротивление при перетягивании за первый слайд
            } else if (newTransform < -(totalSlides - 1) * 100) {
                const overscroll = newTransform + (totalSlides - 1) * 100;
                newTransform = -(totalSlides - 1) * 100 + overscroll * 0.3;
            }
            
            sliderWrapper.style.transform = `translateX(${newTransform}%)`;
        }
        
        function onDragEnd(e) {
            if (!isDragging) return;
            
            isDragging = false;
            sliderContainer.classList.remove('dragging');
            
            const endX = e.type === 'mouseup' ? e.clientX : (e.changedTouches ? e.changedTouches[0].clientX : startX);
            const deltaX = endX - startX;
            const dragDuration = Date.now() - dragStartTime;
            const dragPercent = (deltaX / sliderContainer.offsetWidth) * 100;
            
            // Определяем нужно ли переключить слайд
            let shouldChangeSlide = false;
            let direction = 0;
            
            // Быстрый свайп (по скорости)
            const isQuickSwipe = dragDuration < 200 && Math.abs(deltaX) > 50;
            
            // Медленное перетаскивание (по проценту)
            const isEnoughDrag = Math.abs(dragPercent) > 15;
            
            if (isQuickSwipe || isEnoughDrag) {
                if (deltaX > 0 && currentSlide > 0) {
                    // Тянем вправо - предыдущий слайд
                    currentSlide--;
                    shouldChangeSlide = true;
                } else if (deltaX < 0 && currentSlide < totalSlides - 1) {
                    // Тянем влево - следующий слайд
                    currentSlide++;
                    shouldChangeSlide = true;
                }
            }
            
            if (shouldChangeSlide) {
                updateSlider(true);
            } else {
                // Возвращаемся на текущий слайд
                updateSlider(true);
            }
        }
        
        // Добавляем обработчики событий для мыши
        sliderContainer.addEventListener('mousedown', onDragStart);
        window.addEventListener('mousemove', onDragMove);
        window.addEventListener('mouseup', onDragEnd);
        
        // Добавляем обработчики для touch-событий (мобильные устройства)
        sliderContainer.addEventListener('touchstart', onDragStart);
        window.addEventListener('touchmove', onDragMove);
        window.addEventListener('touchend', onDragEnd);
        
        // Кнопки навигации
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            prevSlide();
        });
        
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            nextSlide();
        });
        
        // Индикаторы
        dots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                goToSlide(index);
            });
        });
        
        // Запрещаем перетаскивание изображений
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('dragstart', (e) => e.preventDefault());
        });
        
        // Инициализация
        updateSlider(false);
        
        // Автоматическое переключение слайдов (останавливается при наведении)
        let autoSlide = setInterval(nextSlide, 5000);
        
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(autoSlide);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            autoSlide = setInterval(nextSlide, 5000);
        });