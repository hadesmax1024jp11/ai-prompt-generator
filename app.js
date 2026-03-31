// App State
const AppState = {
    mode: 'clean',
    isDark: true
};

const UI = {
    toast: (msg, iconUrl = '') => {
        const container = document.getElementById('toast-container');
        const t = document.createElement('div');
        t.className = 'toast';
        t.innerHTML = `<span>${msg}</span>`;
        if (iconUrl) t.innerHTML = `<img src="${iconUrl}" width="20">` + t.innerHTML;
        container.appendChild(t);
        setTimeout(() => t.classList.add('show'), 10);
        setTimeout(() => {
            t.classList.remove('show');
            setTimeout(() => t.remove(), 400);
        }, 3000);
    },
    updateVisuals: () => {
        document.querySelectorAll('select, input[type="text"]').forEach(el => {
            if(el.value.trim() !== "") {
                el.classList.add('has-value');
            } else {
                el.classList.remove('has-value');
            }
        });
    }
};

const layoutConfig = [
    {
        id: 'tab-identity', title: '人物設定',
        sections: [
            {
                title: '基本資訊', icon: '📝',
                fields: [
                    { id: 'gender', label: '性別 (Gender)', source: 'gender', placeholder: '-- 選擇 --' },
                    { id: 'race', label: '種族與國籍 (Race)', source: 'race' },
                    { id: 'char-age', label: '年齡 (Age)', source: 'charAge' },
                    { id: 'char-profession', label: '職業 (Profession)', source: 'charProfession', custom: true }
                ]
            },
            {
                title: '體態與身型', icon: '📏',
                fields: [
                    { id: 'body-height', label: '身高 (Height)', source: 'bodyHeight' },
                    { id: 'body-type', label: '體態 (Type)', source: 'bodyType' },
                    { id: 'body-bust', label: '胸圍 (Bust) - 性感解鎖', source: 'bodyBust', tags: ['sexy', 'nsfw'] },
                    { id: 'body-waist', label: '腰圍 (Waist)', source: 'bodyWaist' },
                    { id: 'body-hip', label: '臀圍 (Hip)', source: 'bodyHip' }
                ]
            },
            {
                title: '五官與特徵', icon: '✨',
                fields: [
                    { id: 'hair-style', label: '髮型 (Hairstyle)', source: 'hairStyle', custom: true },
                    { id: 'hair-color', label: '髮色 (Hair Color)', source: 'hairColor', custom: true },
                    { id: 'eye-color', label: '眼睛與瞳色 (Eye Color)', source: 'eyeColor', custom: true },
                    { id: 'eye-shape', label: '眼型 (Eye Shape)', source: 'eyeShape' },
                    { id: 'face-shape', label: '臉型 (Face Shape)', source: 'faceShape' },
                    { id: 'skin-type', label: '膚色與膚質 (Skin)', source: 'skinType', custom: true },
                    { id: 'body-tattoo', label: '紋身與印記 (Tattoo)', source: 'bodyTattoo', custom: true }
                ]
            },
            {
                title: '妝容與臉部', icon: '💄',
                fields: [
                    { id: 'makeup-base', label: '底妝 (Base)', source: 'makeupBase' },
                    { id: 'makeup-eyebrow', label: '眉毛 (Eyebrows)', source: 'makeupEyebrow' },
                    { id: 'makeup-detail-1', label: '細節妝容 (Detail)', source: 'makeupDetail' }
                ]
            }
        ]
    },
    {
        id: 'tab-outfit', title: '服裝穿搭',
        sections: [
            {
                title: '套裝與物理效果', icon: '👗',
                fields: [
                    { id: 'outfit-theme', label: '服裝套裝 (Costume Preset)', source: 'outfitTheme', custom: true },
                    { id: 'outfit-fit-physics', label: '穿著效果 (Physics)', source: 'outfitFitPhysics', custom: true }
                ]
            },
            {
                title: '混搭單品', icon: '👕',
                fields: [
                    { id: 'outfit-outer', label: '外套 (Outerwear)', source: 'outfitOuter' },
                    { id: 'outfit-top', label: '上衣 (Top)', source: 'outfitTop', custom: true },
                    { id: 'outfit-bottom', label: '下著 (Bottom)', source: 'outfitBottom', custom: true },
                    { id: 'outfit-sock', label: '襪子 (Socks)', source: 'outfitSock' },
                    { id: 'outfit-shoe', label: '鞋子 (Shoes)', source: 'outfitShoe' }
                ]
            },
            {
                title: '飾品配件', icon: '💍',
                fields: [
                    { id: 'outfit-head', label: '頭飾與面具 (Headwear)', source: 'outfitHead' },
                    { id: 'outfit-acc', label: '飾品 (Jewelry)', source: 'outfitAcc' },
                    { id: 'outfit-hands', label: '手部配件 (Hands)', source: 'outfitHands' },
                    { id: 'outfit-bag', label: '包包 (Bag)', source: 'outfitBag' }
                ]
            }
        ]
    },
    {
        id: 'tab-action', title: '動作與表情',
        sections: [
            {
                title: '基礎動作', icon: '🏃',
                fields: [
                    { id: 'action-pose', label: '姿勢 (Pose)', source: 'actionPose', custom: true },
                    { id: 'action-activity', label: '互動行為 (Activity)', source: 'actionActivity', custom: true },
                    { id: 'action-expression', label: '表情 (Expression)', source: 'actionExpression', custom: true }
                ]
            }
        ]
    },
    {
        id: 'tab-scene', title: '場景與特效',
        sections: [
            {
                title: '環境設定', icon: '🏞️',
                fields: [
                    { id: 'scene-loc', label: '場景 (Location)', source: 'sceneLoc', custom: true },
                    { id: 'scene-time', label: '時間 (Time)', source: 'sceneTime' },
                    { id: 'scene-weather', label: '天氣 (Weather)', source: 'sceneWeather' },
                    { id: 'scene-lighting', label: '光影 (Lighting)', source: 'sceneLighting' }
                ]
            },
            {
                title: '物件庫', icon: '🛋️',
                fields: [
                    { id: 'scene-props', label: '環境裝飾 (Props)', source: 'sceneProps', custom: true },
                    { id: 'scene-props-detail', label: '裝飾細節 (Detail)', source: 'scenePropsDetail' }
                ]
            }
        ]
    },
    {
        id: 'tab-camera', title: '鏡頭與風格',
        sections: [
            {
                title: '攝影參數', icon: '📷',
                fields: [
                    { id: 'cam-lens', label: '焦段 (Lens)', source: 'camLens' },
                    { id: 'cam-aperture', label: '光圈 (Aperture)', source: 'camAperture' },
                    { id: 'cam-shot', label: '景別 (Shot)', source: 'camShot' },
                    { id: 'cam-angle', label: '視角 (Angle)', source: 'camAngle' },
                    { id: 'scene-composition', label: '構圖 (Composition)', source: 'sceneComposition' }
                ]
            },
            {
                title: '風格疊加', icon: '🎨',
                fields: [
                    { id: 'scene-style-realistic', label: '基礎風格 (Style)', source: 'sceneStyleRealistic', custom: true },
                    { id: 'scene-style-special', label: '特殊藝術濾鏡 (Special)', source: 'sceneStyleSpecial' }
                ]
            }
        ]
    }
];

// Initialize UI layout
function buildLayout() {
    const tabsContainer = document.getElementById('tabs-container');
    const contentContainer = document.getElementById('content-container');
    
    layoutConfig.forEach((tabObj, index) => {
        // Tab Button
        const btn = document.createElement('button');
        btn.className = `tab-btn ${index === 0 ? 'active' : ''}`;
        btn.innerHTML = tabObj.title;
        btn.onclick = () => switchTab(tabObj.id, btn);
        tabsContainer.appendChild(btn);
        
        // Tab Content
        const content = document.createElement('div');
        content.id = tabObj.id;
        content.className = `tab-content ${index === 0 ? 'active' : ''}`;
        
        tabObj.sections.forEach(sec => {
            const secHtml = document.createElement('div');
            secHtml.innerHTML = `<h3 class="section-title"><span>${sec.icon}</span> ${sec.title}</h3>`;
            const grid = document.createElement('div');
            grid.className = 'grid-container';
            
            sec.fields.forEach(f => {
                const group = document.createElement('div');
                group.className = 'field-group';
                
                let selectHtml = `<label class="field-label">${f.label}</label>
                                  <select id="${f.id}" class="input-control" data-source="${f.source}" data-tags="${(f.tags||[]).join(',')}">
                                      <option value="">${f.placeholder || '-- 無 --'}</option>
                                  </select>`;
                if (f.custom) {
                    selectHtml += `<input type="text" id="${f.id}-custom" class="input-control custom-input" placeholder="自訂...">`;
                }
                group.innerHTML = selectHtml;
                grid.appendChild(group);
            });
            
            secHtml.appendChild(grid);
            content.appendChild(secHtml);
        });
        contentContainer.appendChild(content);
    });

    // Handle initial Data Population
    populateSelects();
    
    // Bind global change events
    document.querySelector('.editor-section').addEventListener('change', () => {
        UI.updateVisuals();
        PromptEngine.build();
    });
    document.querySelector('.editor-section').addEventListener('keyup', (e) => {
        if(e.target.tagName === 'INPUT') {
            UI.updateVisuals();
            PromptEngine.build();
        }
    });
}

function switchTab(tabId, btnElement) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btnElement.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

function setMode(mode) {
    AppState.mode = mode;
    document.body.className = `dark-theme mode-${mode}`;
    
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    
    populateSelects();
    PromptEngine.build();
}

function isAllowed(itemTags) {
    if (!itemTags || itemTags.length === 0) return true;
    return itemTags.includes(AppState.mode);
}

function populateSelects() {
    if (!window.dbData) {
        console.error("No dbData found.");
        return;
    }
    
    document.querySelectorAll('select.input-control').forEach(select => {
        const sourceKey = select.getAttribute('data-source');
        const fieldTagsAttr = select.getAttribute('data-tags');
        
        // Ensure field itself is allowed in current mode
        if (fieldTagsAttr) {
            const fieldTags = fieldTagsAttr.split(',').filter(Boolean);
            if (fieldTags.length > 0 && !fieldTags.includes(AppState.mode)) {
                select.parentElement.style.display = 'none';
                select.value = "";
                return;
            } else {
                select.parentElement.style.display = 'flex';
            }
        }

        const data = dbData[sourceKey] || [];
        const currentVal = select.value;
        const defaultText = select.options[0].text;
        
        select.innerHTML = `<option value="">${defaultText}</option>`;
        
        data.forEach(item => {
            if (item.group) {
                const group = document.createElement('optgroup');
                group.label = item.group;
                item.options.forEach(subItem => {
                    if (isAllowed(subItem.tags)) {
                        const opt = document.createElement('option');
                        opt.value = subItem.value;
                        opt.innerText = subItem.label;
                        group.appendChild(opt);
                    }
                });
                if (group.children.length > 0) select.appendChild(group);
            } else {
                if (isAllowed(item.tags)) {
                    const opt = document.createElement('option');
                    opt.value = item.value;
                    opt.innerText = item.label;
                    select.appendChild(opt);
                }
            }
        });
        
        // Restore value if available
        let exists = Array.from(select.options).some(o => o.value === currentVal);
        if (exists) select.value = currentVal;
    });

    UI.updateVisuals();
}

const PromptEngine = {
    v: (id) => document.getElementById(id)?.value || "",
    getText: (id) => {
        const el = document.getElementById(id);
        if(el && el.selectedIndex > 0) return el.options[el.selectedIndex].text.split('(')[0].trim().replace(/\/.*/,'').trim();
        return "";
    },
    build: () => {
        // Build English
        let enParts = [];
        
        // Core Identity
        let gender = PromptEngine.v('gender') || 'female';
        let dna = `Analog photograph`;
        let traits = [PromptEngine.v('char-age'), PromptEngine.v('race'), gender].filter(Boolean).join(" ");
        if(traits) dna += `, a ${traits}`;
        
        let prof = [PromptEngine.v('char-profession'), PromptEngine.v('char-profession-custom')].filter(Boolean).join(", ");
        if(prof) dna += `, ${prof}`;
        enParts.push(dna);
        
        // Features
        let features = [
            [PromptEngine.v('hair-color'), PromptEngine.v('hair-style')].filter(Boolean).join(" ") + (PromptEngine.v('hair-color') && !PromptEngine.v('hair-style') ? " hair" : ""),
            [PromptEngine.v('eye-color'), PromptEngine.v('eye-shape')].filter(Boolean).join(", "),
            PromptEngine.v('skin-type'),
            PromptEngine.v('body-height'),
            PromptEngine.v('body-type'),
            PromptEngine.v('body-bust'),
            PromptEngine.v('body-waist'),
            PromptEngine.v('body-hip'),
            PromptEngine.v('body-tattoo')
        ].filter(s => s && s.trim().length > 0);
        
        if (features.length) enParts.push(features.join(", "));
        
        // Makeup
        let makeup = [PromptEngine.v('makeup-base'), PromptEngine.v('makeup-eyebrow'), PromptEngine.v('makeup-detail-1')].filter(Boolean);
        if(makeup.length) enParts.push(makeup.join(", "));
        
        // Outfits
        let outfits = [
            PromptEngine.v('outfit-theme'),
            PromptEngine.v('outfit-outer'),
            PromptEngine.v('outfit-top'),
            PromptEngine.v('outfit-bottom'),
            PromptEngine.v('outfit-sock'),
            PromptEngine.v('outfit-shoe'),
            PromptEngine.v('outfit-head'),
            PromptEngine.v('outfit-acc'),
            PromptEngine.v('outfit-bag')
        ].filter(Boolean);
        
        if(outfits.length) {
            enParts.push("wearing " + outfits.join(", "));
        }
        
        // Action
        let action = [PromptEngine.v('action-pose'), PromptEngine.v('action-activity')].filter(Boolean).join(" while ");
        if (action) enParts.push(`She is ${action}`);
        if (PromptEngine.v('action-expression')) enParts.push(PromptEngine.v('action-expression'));
        
        // Scene & Enviroment
        let env = [
            PromptEngine.v('scene-time'), PromptEngine.v('scene-weather'),
            PromptEngine.v('scene-loc'), PromptEngine.v('scene-lighting'),
            PromptEngine.v('scene-props'), PromptEngine.v('scene-props-detail')
        ].filter(Boolean);
        if (env.length) enParts.push(env.join(", "));
        
        // Camera & Style
        let cam = [
            PromptEngine.v('cam-lens'), PromptEngine.v('cam-aperture'), PromptEngine.v('cam-shot'), 
            PromptEngine.v('cam-angle'), PromptEngine.v('scene-composition'),
            PromptEngine.v('scene-style-realistic'), PromptEngine.v('scene-style-special')
        ].filter(Boolean);
        if(cam.length) enParts.push(cam.join(", "));
        
        const finalEn = enParts.join(". ");
        document.getElementById('prompt-en').value = finalEn;
        
        // == Build Chinese ==
        let zhParts = [];
        
        // Identity
        let genderZh = PromptEngine.getText('gender');
        let dnaZh = `人物照片`;
        let traitsZh = [PromptEngine.getText('char-age'), PromptEngine.getText('race'), genderZh].filter(Boolean).join("");
        if(traitsZh) dnaZh += `，一位${traitsZh}`;
        let profZh = [PromptEngine.getText('char-profession'), PromptEngine.v('char-profession-custom')].filter(Boolean).join("、");
        if(profZh) dnaZh += `，職業是${profZh}`;
        zhParts.push(dnaZh);
        
        let hcZh = [PromptEngine.getText('hair-color'), PromptEngine.v('hair-color-custom')].filter(Boolean).join(" ");
        let hsZh = [PromptEngine.getText('hair-style'), PromptEngine.v('hair-style-custom')].filter(Boolean).join(" ");
        let hairCombZh = [hcZh, hsZh].join("");
        if (hcZh && !hsZh && !hcZh.includes('髮')) hairCombZh += '頭髮';
        
        let featuresZh = [
            hairCombZh,
            PromptEngine.getText('eye-color') ? PromptEngine.getText('eye-color') + '的眼睛' : '',
            PromptEngine.getText('skin-type'),
            PromptEngine.getText('body-height'),
            PromptEngine.getText('body-type'),
            PromptEngine.getText('body-bust'),
            PromptEngine.getText('body-tattoo')
        ].filter(s => s && s.trim().length > 0);
        
        if (featuresZh.length) zhParts.push(`外貌特徵：${featuresZh.join("，")}`);
        
        let outfitsZh = [
            [PromptEngine.getText('outfit-theme'), PromptEngine.v('outfit-theme-custom')].filter(Boolean).join(""),
            PromptEngine.getText('outfit-outer'),
            [PromptEngine.getText('outfit-top'), PromptEngine.v('outfit-top-custom')].filter(Boolean).join(""),
            [PromptEngine.getText('outfit-bottom'), PromptEngine.v('outfit-bottom-custom')].filter(Boolean).join(""),
            PromptEngine.getText('outfit-sock'),
            PromptEngine.getText('outfit-shoe')
        ].filter(Boolean);
        
        if (outfitsZh.length) zhParts.push(`穿著：${outfitsZh.join("、")}`);
        
        let actZh = [
            [PromptEngine.getText('action-pose'), PromptEngine.v('action-pose-custom')].filter(Boolean).join(""),
            [PromptEngine.getText('action-activity'), PromptEngine.v('action-activity-custom')].filter(Boolean).join("")
        ].filter(Boolean).join("同時");
        if (actZh) zhParts.push(`動作：正在${actZh}`);
        
        let envZh = [
            PromptEngine.getText('scene-loc') ? `在${PromptEngine.getText('scene-loc')}` : '',
            PromptEngine.getText('scene-time'),
            PromptEngine.getText('scene-weather'),
            PromptEngine.getText('scene-lighting'),
            [PromptEngine.getText('scene-props'), PromptEngine.v('scene-props-custom')].filter(Boolean).join("的")
        ].filter(Boolean);
        
        if (envZh.length) zhParts.push(`場景氛圍：${envZh.join("，")}`);
        
        let camZh = [
            PromptEngine.getText('cam-lens'), PromptEngine.getText('scene-composition'),
            PromptEngine.getText('scene-style-realistic')
        ].filter(Boolean);
        if (camZh.length) zhParts.push(`鏡頭風格：${camZh.join("、")}`);
        
        document.getElementById('prompt-zh').value = zhParts.join("。\n");
    },
    randomize: () => {
        document.querySelectorAll('select.input-control').forEach(s => {
            if (s.options.length > 2 && s.parentElement.style.display !== 'none') {
                // 30% chance to pick something, keep it sparse
                if (Math.random() > 0.6) {
                    s.selectedIndex = Math.floor(Math.random() * (s.options.length - 1)) + 1;
                } else {
                    s.selectedIndex = 0;
                }
            }
        });
        document.getElementById('gender').value = "female"; // base constraint
        PromptEngine.build();
        UI.updateVisuals();
        UI.toast('🪄 已隨機組合參數', '');
    },
    clear: () => {
        document.querySelectorAll('.input-control').forEach(el => el.value = "");
        document.getElementById('gender').value = "female";
        PromptEngine.build();
        UI.updateVisuals();
        UI.toast('🧹 所有選擇已清除', '');
    },
    copy: (lang) => {
        const p = document.getElementById(lang === 'en' ? 'prompt-en' : 'prompt-zh');
        p.select();
        document.execCommand('copy');
        UI.toast('📋 已複製至剪貼簿', '');
    }
}

// initialization
window.onload = () => {
    buildLayout();
    setMode('clean');
};
