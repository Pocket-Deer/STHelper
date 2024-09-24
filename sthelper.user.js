// ==UserScript==
// @name         STHelper
// @namespace    http://tampermonkey.net/
// @version      0.0.5
// @description  Testing
// @author       Pocket Deer
// @match        https://*steam-trader.com*
// @include      https://*steam-trader.com*
// @updateURL    https://raw.githubusercontent.com/Pocket-Deer/STHelper/dev/sthelper.user.js
// @downloadURL  https://raw.githubusercontent.com/Pocket-Deer/STHelper/dev/sthelper.user.js
// @grant        GM_getValue
// @grant        GM_setValue
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

    // Панель настроек (с кнопками)
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
    document.body.appendChild(settingsPanel);

    // Функция для создания кнопки с изменяемым фоном
    function createToggleButton(settingKey, buttonText) {
        const button = document.createElement('button');
        button.innerText = buttonText;
        button.style.margin = '5px';
        button.style.padding = '10px';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        button.style.color = 'white';

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

    // Добавляем кнопки для настроек
    const helloWorldButton = createToggleButton('helloWorldEnabled', 'Включить/Выключить "Привет мир"');
    const changeBgButton = createToggleButton('changeBackground', 'Изменить цвет фона');

    // Изменяем цвет фона страницы, если активна настройка
    function updateBackgroundColor() {
        if (GM_getValue('changeBackground', false)) {
            document.body.style.backgroundColor = 'lightblue'; // Фон изменен на голубой
        } else {
            document.body.style.backgroundColor = ''; // Возвращаем стандартный цвет
        }
    }

    // Добавляем кнопку на панель настроек
    settingsPanel.appendChild(helloWorldButton);
    settingsPanel.appendChild(changeBgButton);

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

    // Проверяем настройку изменения фона при загрузке страницы
    updateBackgroundColor();

    // Отслеживаем изменения настроек и обновляем цвет фона
    changeBgButton.addEventListener('click', updateBackgroundColor);
})();
