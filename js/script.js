function toggleExpand(button) {
    const configItem = button.closest('.config-item');
    const description = configItem.querySelector('.config-description');
    
    description.classList.toggle('expanded');
    
    if (description.classList.contains('expanded')) {
        button.innerHTML = '<i class="bx bx-chevron-up"></i>';
    } else {
        button.innerHTML = '<i class="bx bx-chevron-down"></i>';
    }
}

function show(list) {
    const html = list.map(c => {
        const name = c.name.replace('%', '');
        const check = c.name.endsWith('%') ? "<i class='bx bxs-badge-check checkmark-icon'></i>" : "";
        
        const crosshairHtml = c.crosshair ? `
            <div class="param-section">
                <div class="param-title">Прицел</div>
                <div class="param-list">
                    <div class="param-item">
                        <span class="param-label">Толщина</span>
                        <span class="param-value">${c.crosshair.thickness}</span>
                    </div>
                    <div class="param-item">
                        <span class="param-label">Длина</span>
                        <span class="param-value">${c.crosshair.length}</span>
                    </div>
                    <div class="param-item">
                        <span class="param-label">Дистанция</span>
                        <span class="param-value">${c.crosshair.distance}</span>
                    </div>
                    <div class="param-item">
                        <span class="param-label">Точка</span>
                        <span class="param-value">${c.crosshair.pointSize}</span>
                    </div>
                </div>
            </div>
        ` : '';

        const sensitivityHtml = c.sensitivity ? `
            <div class="param-section">
                <div class="param-title">Чувствительность</div>
                <div class="param-list">
                    <div class="param-item">
                        <span class="param-label">Общая</span>
                        <span class="param-value">${c.sensitivity.general}</span>
                    </div>
                    <div class="param-item">
                        <span class="param-label">Прицел</span>
                        <span class="param-value">${c.sensitivity.scope}</span>
                    </div>
                    <div class="param-item">
                        <span class="param-label">Ускорение</span>
                        <span class="param-value">${c.sensitivity.acceleration}</span>
                    </div>
                    <div class="param-item">
                        <span class="param-label">Сглаживание</span>
                        <span class="param-value">${c.sensitivity.smoothing}</span>
                    </div>
                </div>
            </div>
        ` : '';
        
        return `
        <div class="config-item">
            <div class="config-header-wrapper">
                <div class="config-name-wrapper">
                    <span class="config-name">${name}</span>
                    ${check}
                </div>
                <div class="config-update">${c.update}</div>
            </div>
            <div class="config-description">
                <div class="params-container">
                    ${crosshairHtml}
                    ${sensitivityHtml}
                </div>
            </div>
            <pre class="config-code">${c.code}</pre>
            <div class="button-container">
                <button onclick="copyConfig('${c.code.replace(/'/g, "\\'")}')" class="copy-button">
                    <i class='bx bx-copy'></i> Копировать
                </button>
                <button onclick="toggleExpand(this)" class="expand-button">
                    <i class='bx bx-chevron-down'></i>
                </button>
            </div>
        </div>
        `;
    }).join('');
    
    document.getElementById('results').innerHTML = html;
}

function copyConfig(text) {
    navigator.clipboard.writeText(text);
}

function searchConfigs() {
    const term = document.getElementById('search').value.toLowerCase();
    show(configs.filter(c => 
        c.name.toLowerCase().includes(term) || 
        (c.update && c.update.toLowerCase().includes(term))
    ));
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    show(configs);
});