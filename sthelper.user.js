// ==UserScript==
// @name         STHelper
// @namespace    http://tampermonkey.net/
// @version      0.0.4
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

    // Панель настроек (с флажками)
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

    // Создаем флажок для настройки
    const helloWorldCheckbox = document.createElement('input');
    helloWorldCheckbox.type = 'checkbox';
    helloWorldCheckbox.id = 'helloWorldCheckbox';
    helloWorldCheckbox.checked = GM_getValue('helloWorldEnabled', true); // Читаем состояние флажка из настроек
    const helloWorldLabel = document.createElement('label');
    helloWorldLabel.htmlFor = 'helloWorldCheckbox';
    helloWorldLabel.innerText = ' Включить "Привет мир"';

    // Добавляем флажок на панель настроек
    settingsPanel.appendChild(helloWorldCheckbox);
    settingsPanel.appendChild(helloWorldLabel);

    // Показать или скрыть панель настроек при нажатии на кнопку
    settingsButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Останавливаем всплытие события, чтобы не закрыть окно сразу
        settingsPanel.style.display = settingsPanel.style.display === 'none' ? 'block' : 'none';
    });

    // Закрытие панели настроек при клике вне её области
    document.addEventListener('click', (e) => {
        if (settingsPanel.style.display === 'block' && !settingsPanel.contains(e.target) && !settingsButton.contains(e.target)) {
            settingsPanel.style.display = 'none';
        }
    });

    // Сохраняем настройку при изменении флажка
    helloWorldCheckbox.addEventListener('change', () => {
        GM_setValue('helloWorldEnabled', helloWorldCheckbox.checked);
    });

    // Проверяем настройку и выводим сообщение в консоль
    if (GM_getValue('helloWorldEnabled', true)) {
        console.log('Привет мир');
    }
})();
