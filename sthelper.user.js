// ==UserScript==
// @name         STHelper
// @namespace    http://tampermonkey.net/
// @version      0.0.6
// @description  Testing
// @author       Pocket Deer
// @match        https://*steam-trader.com*
// @include      https://*steam-trader.com*
// @updateURL    https://raw.githubusercontent.com/Pocket-Deer/STHelper/dev/sthelper.user.js
// @downloadURL  https://raw.githubusercontent.com/Pocket-Deer/STHelper/dev/sthelper.user.js
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Добавляем кнопку-шестерёнку в левый верхний угол страницы
    const settingsButton = document.createElement('div');
    settingsButton.innerHTML = '⚙️';
    settingsButton.style.position = 'fixed';
    settingsButton.style.top = '10px';
    settingsButton.style.left = '10px';
    settingsButton.style.fontSize = '30px';
    settingsButton.style.cursor = 'pointer';
    settingsButton.style.zIndex = '9999';
    document.body.appendChild(settingsButton);

    // Панель настроек
    const settingsPanel = document.createElement('div');
    settingsPanel.style.position = 'fixed';
    settingsPanel.style.top = '50px';
    settingsPanel.style.left = '10px';
    settingsPanel.style.padding = '10px';
    settingsPanel.style.backgroundColor = '#333'; // Тёмный фон
    settingsPanel.style.color = 'white'; // Белый текст
    settingsPanel.style.border = '1px solid black';
    settingsPanel.style.borderRadius = '5px';
    settingsPanel.style.zIndex = '9999';
    settingsPanel.style.display = 'none'; // Скрыта по умолчанию
    settingsPanel.style.width = '200px'; // Задаём фиксированную ширину
    settingsPanel.style.display = 'none';
    document.body.appendChild(settingsPanel);

    // Создаем стили для плавной анимации и кнопок
    GM_addStyle(`
        .toggle-button {
            margin: 5px;
            padding: 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            color: white;
            width: 100%;
            transition: background-color 0.3s ease; /* Анимация плавного изменения цвета */
        }
        .settings-section {
            margin-bottom: 20px;
        }
        .settings-section-title {
            margin-bottom: 10px;
            font-size: 14px;
            font-weight: bold;
            text-transform: uppercase;
            color: lightgray;
        }
    `);

    // Функция для создания кнопки с изменяемым фоном
    function createToggleButton(settingKey, buttonText) {
        const button = document.createElement('button');
        button.className = 'toggle-button';
        button.innerText = buttonText;

        // Обновляем цвет кнопки в зависимости от состояния настройки
        function updateButtonColor() {
            if (GM_getValue(settingKey, false)) {
                button.style.backgroundColor = 'green'; // Включено
            } else {
                button.style.backgroundColor = 'red'; // Выключено
            }
        }

        // Изменяем состояние настройки при клике на кнопку
        button.addEventListener('click', () => {
            const newValue = !GM_getValue(settingKey, false);
            GM_setValue(settingKey, newValue);
            updateButtonColor();
            if (settingKey === 'helloWorldEnabled') {
                if (newValue) {
                    console.log('Привет мир');
                } else {
                    console.log('Привет мир отключён');
                }
            }
        });

        // Инициализируем цвет кнопки
        updateButtonColor();

        return button;
    }

    // Создаём разделы для группировки кнопок
    function createSettingsSection(title) {
        const section = document.createElement('div');
        section.className = 'settings-section';

        const sectionTitle = document.createElement('div');
        sectionTitle.className = 'settings-section-title';
        sectionTitle.innerText = title;

        section.appendChild(sectionTitle);

        return section;
    }

    // Разделы настроек
    const mainSettings = createSettingsSection('Основное');
    const testSettings = createSettingsSection('Тестовое');

    // Кнопки для разделов
    const helloWorldButton = createToggleButton('helloWorldEnabled', 'Включить/Выключить "Привет мир"');
    const changeBgButton = createToggleButton('changeBackground', 'Изменить цвет фона');

    // Добавляем кнопки в соответствующие разделы
    mainSettings.appendChild(helloWorldButton);
    testSettings.appendChild(changeBgButton);

    // Добавляем разделы на панель настроек
    settingsPanel.appendChild(mainSettings);
    settingsPanel.appendChild(testSettings);

    // Показать или скрыть панель настроек при нажатии на шестерёнку
    settingsButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Останавливаем всплытие события
        settingsPanel.style.display = settingsPanel.style.display === 'none' ? 'block' : 'none';
    });

    // Закрытие панели настроек при клике вне её области
    document.addEventListener('click', (e) => {
        if (settingsPanel.style.display === 'block' && !settingsPanel.contains(e.target) && !settingsButton.contains(e.target)) {
            settingsPanel.style.display = 'none';
        }
    });

    // Изменение фона страницы в зависимости от состояния настройки
    function updateBackgroundColor() {
        if (GM_getValue('changeBackground', false)) {
            //document.body.style.backgroundColor = 'lightblue'; // Голубой фон
        } else {
            //document.body.style.backgroundColor = ''; // Стандартный фон
        }
    }

    // Инициализация фона при загрузке страницы
    updateBackgroundColor();

    // Обновляем цвет фона при изменении состояния кнопки
    changeBgButton.addEventListener('click', updateBackgroundColor);
})();
