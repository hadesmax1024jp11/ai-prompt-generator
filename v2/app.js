// App State
const AppState = {
    mode: 'clean',
    isDark: false
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
            if(el.value && el.value.trim() !== "") {
                el.classList.add('border-primary');
                el.classList.remove('border-outline-variant');
            } else {
                el.classList.remove('border-primary');
                el.classList.add('border-outline-variant');
            }
        });
    }
};

const layoutConfig = [
    {
        id: 'tab-identity', title: 'Character', icon: 'person', 
        sections: [
            {
                title: 'Essence', icon: 'face',
                fields: [
                    { id: 'gender', label: '性別 (Gender)', source: 'gender', placeholder: '-- 選擇 --' },
                    { id: 'race', label: '種族與國籍 (Race)', source: 'race' },
                    { id: 'char-age', label: '年齡 (Age)', source: 'charAge' },
                    { id: 'char-profession', label: '職業 (Profession)', source: 'charProfession', custom: true }
                ]
            },
            {
                title: 'Body Shape', icon: 'accessibility_new',
                fields: [
                    { id: 'body-height', label: '身高 (Height)', source: 'bodyHeight' },
                    { id: 'body-type', label: '體態 (Type)', source: 'bodyType' },
                    { id: 'body-bust', label: '胸圍 (Bust)', source: 'bodyBust', tags: ['sexy', 'nsfw'] },
                    { id: 'body-waist', label: '腰圍 (Waist)', source: 'bodyWaist' },
                    { id: 'body-hip', label: '臀圍 (Hip)', source: 'bodyHip' }
                ]
            },
            {
                title: 'Features', icon: 'auto_awesome',
                fields: [
                    { id: 'hair-style', label: '髮型 (Hairstyle)', source: 'hairStyle', custom: true },
                    { id: 'hair-color', label: '髮色 (Hair Color)', source: 'hairColor', custom: true },
                    { id: 'eye-color', label: '瞳色 (Eye Color)', source: 'eyeColor', custom: true },
                    { id: 'eye-shape', label: '眼型 (Eye Shape)', source: 'eyeShape' },
                    { id: 'face-shape', label: '臉型 (Face Shape)', source: 'faceShape' },
                    { id: 'skin-type', label: '膚色與膚質 (Skin)', source: 'skinType', custom: true },
                    { id: 'body-tattoo', label: '紋身 (Tattoo)', source: 'bodyTattoo', custom: true }
                ]
            },
            {
                title: 'Makeup', icon: 'brush',
                fields: [
                    { id: 'makeup-base', label: '底妝 (Base)', source: 'makeupBase' },
                    { id: 'makeup-eyebrow', label: '眉毛 (Eyebrows)', source: 'makeupEyebrow' },
                    { id: 'makeup-detail-1', label: '細節妝容 (Detail)', source: 'makeupDetail' }
                ]
            }
        ]
    },
    {
        id: 'tab-outfit', title: 'Clothing', icon: 'checkroom',
        sections: [
            {
                title: 'Flow & Presets', icon: 'layers',
                fields: [
                    { id: 'outfit-theme', label: '服裝套裝 (Preset)', source: 'outfitTheme', custom: true },
                    { id: 'outfit-fit-physics', label: '穿著效果 (Physics)', source: 'outfitFitPhysics', custom: true }
                ]
            },
            {
                title: 'Garments', icon: 'styler',
                fields: [
                    { id: 'outfit-outer', label: '外套 (Outerwear)', source: 'outfitOuter' },
                    { id: 'outfit-top', label: '上衣 (Top)', source: 'outfitTop', custom: true },
                    { id: 'outfit-bottom', label: '下著 (Bottom)', source: 'outfitBottom', custom: true },
                    { id: 'outfit-sock', label: '襪子 (Socks)', source: 'outfitSock' },
                    { id: 'outfit-shoe', label: '鞋子 (Shoes)', source: 'outfitShoe' }
                ]
            },
            {
                title: 'Jewelry', icon: 'diamond',
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
        id: 'tab-action', title: 'Action', icon: 'directions_run',
        sections: [
            {
                title: 'Pose & Feeling', icon: 'mood',
                fields: [
                    { id: 'action-pose', label: '姿勢 (Pose)', source: 'actionPose', custom: true },
                    { id: 'action-activity', label: '互動行為 (Activity)', source: 'actionActivity', custom: true },
                    { id: 'action-expression', label: '表情 (Expression)', source: 'actionExpression', custom: true }
                ]
            }
        ]
    },
    {
        id: 'tab-scene', title: 'Scene', icon: 'landscape',
        sections: [
            {
                title: 'Environment', icon: 'forest',
                fields: [
                    { id: 'scene-loc', label: '場景 (Location)', source: 'sceneLoc', custom: true },
                    { id: 'scene-time', label: '時間 (Time)', source: 'sceneTime' },
                    { id: 'scene-weather', label: '天氣 (Weather)', source: 'sceneWeather' },
                    { id: 'scene-lighting', label: '光影 (Lighting)', source: 'sceneLighting' }
                ]
            },
            {
                title: 'Props', icon: 'chair',
                fields: [
                    { id: 'scene-props', label: '環境裝飾 (Props)', source: 'sceneProps', custom: true },
                    { id: 'scene-props-detail', label: '裝飾細節 (Detail)', source: 'scenePropsDetail' }
                ]
            }
        ]
    },
    {
        id: 'tab-camera', title: 'Camera', icon: 'camera',
        sections: [
            {
                title: 'Lens & Angle', icon: 'lens',
                fields: [
                    { id: 'cam-lens', label: '焦段 (Lens)', source: 'camLens' },
                    { id: 'cam-aperture', label: '光圈 (Aperture)', source: 'camAperture' },
                    { id: 'cam-shot', label: '景別 (Shot)', source: 'camShot' },
                    { id: 'cam-angle', label: '視角 (Angle)', source: 'camAngle' },
                    { id: 'scene-composition', label: '構圖 (Composition)', source: 'sceneComposition' }
                ]
            },
            {
                title: 'Art Style', icon: 'palette',
                fields: [
                    { id: 'scene-style-realistic', label: '基礎風格 (Style)', source: 'sceneStyleRealistic', custom: true },
                    { id: 'scene-style-special', label: '特殊藝術濾鏡 (Special)', source: 'sceneStyleSpecial' }
                ]
            }
        ]
    }
];

function buildLayout() {
    const desktopTabs = document.getElementById('tabs-container-desktop');
    const mobileTabs = document.getElementById('tabs-container-mobile');
    const contentContainer = document.getElementById('content-container');
    
    layoutConfig.forEach((tabObj, index) => {
        const isActive = index === 0;

        // Desktop Nav Items
        const dBtn = document.createElement('a');
        dBtn.href = "#";
        dBtn.dataset.tab = tabObj.id;
        dBtn.className = `desktop-tab flex items-center gap-3 py-3 font-bold pl-4 transition-colors ${isActive ? 'text-[#334673] dark:text-blue-200 border-l-4 border-[#e07a5f] bg-surface-container-low dark:bg-stone-800' : 'text-[#1b1c17]/70 dark:text-stone-400 hover:bg-[#f5f4ec] border-l-4 border-transparent dark:hover:bg-stone-800'}`;
        dBtn.innerHTML = `
            <span class="material-symbols-outlined" data-icon="${tabObj.icon}">${tabObj.icon}</span>
            <span class="font-sans text-sm font-medium tracking-tight">${tabObj.title}</span>`;
        dBtn.onclick = (e) => { e.preventDefault(); switchTab(tabObj.id); };
        desktopTabs.appendChild(dBtn);

        // Mobile Nav Items
        const mBtn = document.createElement('a');
        mBtn.href = "#";
        mBtn.dataset.tab = tabObj.id;
        mBtn.className = `mobile-tab flex-1 flex flex-col items-center justify-center py-2 min-w-[70px] transition-colors ${isActive ? 'text-[#e07a5f] border-t-2 border-[#e07a5f] bg-[#e07a5f]/10' : 'text-[#1b1c17]/50 dark:text-stone-400 border-t-2 border-transparent hover:text-[#334673]'}`;
        mBtn.innerHTML = `
            <span class="material-symbols-outlined text-[20px]" data-icon="${tabObj.icon}">${tabObj.icon}</span>
            <span class="font-sans text-[10px] uppercase font-bold tracking-tight mt-1 truncate max-w-full">${tabObj.title}</span>`;
        mBtn.onclick = (e) => { e.preventDefault(); switchTab(tabObj.id); };
        mobileTabs.appendChild(mBtn);
        
        // Tab Content
        const content = document.createElement('div');
        content.id = tabObj.id;
        content.className = `tab-content ${isActive ? 'active' : ''}`;
        
        tabObj.sections.forEach(sec => {
            const secHtml = document.createElement('section');
            secHtml.className = "bg-surface-container-low dark:bg-stone-900 rounded-xl p-6 md:p-8 border border-outline-variant/10 relative overflow-hidden mb-8 transition-transform group hover:shadow-lg dark:hover:shadow-stone-950/50";
            
            // Decorative background drop
            const deco = document.createElement('div');
            deco.className = "absolute top-0 right-0 w-32 h-32 opacity-10 bg-tertiary-container dark:bg-stone-700 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110";
            secHtml.appendChild(deco);

            secHtml.innerHTML += `<h3 class="font-headline text-xl md:text-2xl text-primary dark:text-blue-200 mb-6 flex items-center gap-2">
                                     <span class="material-symbols-outlined">${sec.icon}</span> ${sec.title}
                                  </h3>`;
            
            const grid = document.createElement('div');
            grid.className = 'grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6';
            
            sec.fields.forEach(f => {
                const group = document.createElement('div');
                group.className = 'space-y-2';
                
                let selectHtml = `<label class="text-[10px] md:text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-stone-400">${f.label}</label>
                                  <select id="${f.id}" class="w-full bg-surface dark:bg-stone-950 dark:text-stone-200 border-b border-outline-variant focus:border-secondary transition-colors rounded-t-md px-3 py-2 font-body text-sm input-trigger" data-source="${f.source}" data-tags="${(f.tags||[]).join(',')}">
                                      <option value="">${f.placeholder || '-- 無 --'}</option>
                                  </select>`;
                if (f.custom) {
                    selectHtml += `<input type="text" id="${f.id}-custom" class="w-full bg-surface-container-highest/20 dark:bg-stone-900 dark:border-stone-800 dark:text-stone-300 border-b border-dashed border-outline-variant focus:border-secondary transition-colors rounded-none px-3 py-1.5 font-body text-xs mt-1 input-trigger" placeholder="自訂...">`;
                }
                group.innerHTML = selectHtml;
                grid.appendChild(group);
            });
            
            secHtml.appendChild(grid);
            content.appendChild(secHtml);
        });
        contentContainer.appendChild(content);
    });

    populateSelects();
    
    document.getElementById('content-container').addEventListener('change', () => {
        UI.updateVisuals();
        PromptEngine.build();
    });
    document.getElementById('content-container').addEventListener('keyup', (e) => {
        if(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            UI.updateVisuals();
            PromptEngine.build();
        }
    });
}

function switchTab(tabId) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');

    // Update Desktop navs
    document.querySelectorAll('.desktop-tab').forEach(btn => {
        if(btn.dataset.tab === tabId) {
            btn.className = `desktop-tab flex items-center gap-3 py-3 font-bold pl-4 transition-colors text-[#334673] dark:text-blue-200 border-l-4 border-[#e07a5f] bg-surface-container-low dark:bg-stone-800`;
        } else {
            btn.className = `desktop-tab flex items-center gap-3 py-3 font-bold pl-4 transition-colors text-[#1b1c17]/70 dark:text-stone-400 hover:bg-[#f5f4ec] border-l-4 border-transparent dark:hover:bg-stone-800`;
        }
    });

    // Update Mobile navs
    document.querySelectorAll('.mobile-tab').forEach(btn => {
         if(btn.dataset.tab === tabId) {
             btn.className = `mobile-tab flex-1 flex flex-col items-center justify-center py-2 min-w-[70px] transition-colors text-[#e07a5f] border-t-2 border-[#e07a5f] bg-[#e07a5f]/10`;
         } else {
             btn.className = `mobile-tab flex-1 flex flex-col items-center justify-center py-2 min-w-[70px] transition-colors text-[#1b1c17]/50 dark:text-stone-400 border-t-2 border-transparent hover:text-[#334673]`;
         }
    });
    
    // scroll back up
    document.getElementById('main-scroll').scrollTo({top: 0, behavior: 'smooth'});
}

function toggleDark() {
    AppState.isDark = !AppState.isDark;
    if (AppState.isDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
    } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
    }
}

function setMode(mode) {
    AppState.mode = mode;
    
    document.querySelectorAll('.mode-btn').forEach(btn => {
        if(btn.dataset.mode === mode) {
            btn.className = "mode-btn px-3 py-1.5 text-xs font-bold rounded bg-primary text-white shadow-sm";
        } else {
            btn.className = "mode-btn px-3 py-1.5 text-xs font-bold rounded text-on-surface-variant hover:text-primary dark:text-stone-400";
        }
    });
    
    populateSelects();
    PromptEngine.build();
}

function isAllowed(itemTags) {
    if (!itemTags || itemTags.length === 0) return true;
    return itemTags.includes(AppState.mode);
}

function populateSelects() {
    if (!window.dbData) return;
    
    document.querySelectorAll('select.input-trigger').forEach(select => {
        const sourceKey = select.getAttribute('data-source');
        const fieldTagsAttr = select.getAttribute('data-tags');
        
        if (fieldTagsAttr) {
            const fieldTags = fieldTagsAttr.split(',').filter(Boolean);
            if (fieldTags.length > 0 && !fieldTags.includes(AppState.mode)) {
                select.parentElement.style.display = 'none';
                select.value = "";
                return;
            } else {
                select.parentElement.style.display = 'block';
            }
        }

        const data = dbData[sourceKey] || [];
        const currentVal = select.value;
        const defaultText = select.options.length > 0 ? select.options[0].text : '-- 無 --';
        
        select.innerHTML = `<option value="">${defaultText}</option>`;
        
        data.forEach(item => {
            if (item.group) {
                const group = document.createElement('optgroup');
                group.label = item.group;
                group.className = "dark:bg-stone-800 dark:text-stone-200";
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
        let enParts = [];
        let gender = PromptEngine.v('gender') || 'female';
        let dna = `Analog photograph`;
        let traits = [PromptEngine.v('char-age'), PromptEngine.v('race'), gender].filter(Boolean).join(" ");
        if(traits) dna += `, a ${traits}`;
        
        let prof = [PromptEngine.v('char-profession'), PromptEngine.v('char-profession-custom')].filter(Boolean).join(", ");
        if(prof) dna += `, ${prof}`;
        enParts.push(dna);
        
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
        
        let makeup = [PromptEngine.v('makeup-base'), PromptEngine.v('makeup-eyebrow'), PromptEngine.v('makeup-detail-1')].filter(Boolean);
        if(makeup.length) enParts.push(makeup.join(", "));
        
        let outfits = [
            PromptEngine.v('outfit-theme'), PromptEngine.v('outfit-outer'), PromptEngine.v('outfit-top'),
            PromptEngine.v('outfit-bottom'), PromptEngine.v('outfit-sock'), PromptEngine.v('outfit-shoe'),
            PromptEngine.v('outfit-head'), PromptEngine.v('outfit-acc'), PromptEngine.v('outfit-bag')
        ].filter(Boolean);
        
        if(outfits.length) enParts.push("wearing " + outfits.join(", "));
        
        let action = [PromptEngine.v('action-pose'), PromptEngine.v('action-activity')].filter(Boolean).join(" while ");
        if (action) enParts.push(`She is ${action}`);
        if (PromptEngine.v('action-expression')) enParts.push(PromptEngine.v('action-expression'));
        
        let env = [
            PromptEngine.v('scene-time'), PromptEngine.v('scene-weather'),
            PromptEngine.v('scene-loc'), PromptEngine.v('scene-lighting'),
            PromptEngine.v('scene-props'), PromptEngine.v('scene-props-detail')
        ].filter(Boolean);
        if (env.length) enParts.push(env.join(", "));
        
        let cam = [
            PromptEngine.v('cam-lens'), PromptEngine.v('cam-aperture'), PromptEngine.v('cam-shot'), 
            PromptEngine.v('cam-angle'), PromptEngine.v('scene-composition'),
            PromptEngine.v('scene-style-realistic'), PromptEngine.v('scene-style-special')
        ].filter(Boolean);
        if(cam.length) enParts.push(cam.join(", "));
        
        document.getElementById('prompt-en').value = enParts.join(". ");
        
        let zhParts = [];
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
            PromptEngine.getText('skin-type'), PromptEngine.getText('body-height'), PromptEngine.getText('body-type'),
            PromptEngine.getText('body-bust'), PromptEngine.getText('body-tattoo')
        ].filter(s => s && s.trim().length > 0);
        
        if (featuresZh.length) zhParts.push(`外貌特徵：${featuresZh.join("，")}`);
        
        let outfitsZh = [
            [PromptEngine.getText('outfit-theme'), PromptEngine.v('outfit-theme-custom')].filter(Boolean).join(""),
            PromptEngine.getText('outfit-outer'), [PromptEngine.getText('outfit-top'), PromptEngine.v('outfit-top-custom')].filter(Boolean).join(""),
            [PromptEngine.getText('outfit-bottom'), PromptEngine.v('outfit-bottom-custom')].filter(Boolean).join(""),
            PromptEngine.getText('outfit-sock'), PromptEngine.getText('outfit-shoe')
        ].filter(Boolean);
        
        if (outfitsZh.length) zhParts.push(`穿著：${outfitsZh.join("、")}`);
        
        let actZh = [
            [PromptEngine.getText('action-pose'), PromptEngine.v('action-pose-custom')].filter(Boolean).join(""),
            [PromptEngine.getText('action-activity'), PromptEngine.v('action-activity-custom')].filter(Boolean).join("")
        ].filter(Boolean).join("同時");
        if (actZh) zhParts.push(`動作：正在${actZh}`);
        
        let envZh = [
            PromptEngine.getText('scene-loc') ? `在${PromptEngine.getText('scene-loc')}` : '',
            PromptEngine.getText('scene-time'), PromptEngine.getText('scene-weather'),
            PromptEngine.getText('scene-lighting'), [PromptEngine.getText('scene-props'), PromptEngine.v('scene-props-custom')].filter(Boolean).join("的")
        ].filter(Boolean);
        
        if (envZh.length) zhParts.push(`場景氛圍：${envZh.join("，")}`);
        
        let camZh = [
            PromptEngine.getText('cam-lens'), PromptEngine.getText('scene-composition'), PromptEngine.getText('scene-style-realistic')
        ].filter(Boolean);
        if (camZh.length) zhParts.push(`鏡頭風格：${camZh.join("、")}`);
        
        document.getElementById('prompt-zh').value = zhParts.join("。\n");
    },
    randomize: () => {
        document.querySelectorAll('select.input-trigger').forEach(s => {
            if (s.options.length > 2 && s.parentElement.style.display !== 'none' && Math.random() > 0.6) {
                s.selectedIndex = Math.floor(Math.random() * (s.options.length - 1)) + 1;
            } else {
                s.selectedIndex = 0;
            }
        });
        document.getElementById('gender').value = "female";
        PromptEngine.build();
        UI.updateVisuals();
        UI.toast('🪄 已隨機組合參數', '');
    },
    clear: () => {
        document.querySelectorAll('.input-trigger').forEach(el => el.value = "");
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
    
    // Check system preference dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        toggleDark();
    }
};
