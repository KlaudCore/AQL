/* ============================================================
   HEADER
   ============================================================ */
const HEADER_HTML = `
    <header class="document-header">
        <div class="doc-header">
            <div class="logo-area">
                <img src="logo.png" alt="alan — Siempre Funciona">
            </div>
            <div class="title-area">
                <input type="text" class="title-input h1" value="QUALITY MANAGEMENT SYSTEM">
                <input type="text" class="title-input h2" value="ALAN DE AGUASCALIENTES, S.A. DE C.V.">
                <input type="text" class="title-input h3" value="SPECIFICATIONS AND INSPECTION SHEET">
            </div>
            <div class="meta-area">
                <div class="meta-row">
                    <span class="meta-label">ISSUE DATE:</span>
                    <input type="text" value="07/02/13" style="width:80px; text-align:right;">
                </div>
                <div class="meta-row">
                    <span class="meta-label">CODE:</span>
                    <input type="text" value="FT-SI-00" style="width:80px; text-align:right;">
                </div>
                <div class="meta-row">
                    <span class="meta-label">REVIEW:</span>
                    <input type="text" value="01" style="width:80px; text-align:right;">
                </div>
                <div class="meta-row">
                    <span class="meta-label">PAGES:</span>
                    <input type="text" value="1 of 1" style="width:80px; text-align:right;" class="pages-field">
                </div>
            </div>
        </div>

        <div class="supplier-area">
            <div class="supplier-grid">
                <div>
                    <span class="supplier-label">SUPPLIER</span>
                    <textarea rows="1">ZHEJIANG YALONG VALVES CO., LTD.</textarea>
                </div>
                <div>
                    <span class="supplier-label">ADDRESS</span>
                    <textarea rows="1">BINGANG INDUSTRIAL ZONE, SHAMEN TOWN, YUHUAN ZHEJIANG PROVINCE CHINA</textarea>
                </div>
                <div>
                    <span class="supplier-label">TEL</span>
                    <textarea rows="1">+86 (576) 87412288</textarea>
                </div>
                <div>
                    <span class="supplier-label">COUNTRY</span>
                    <input type="text" value="CHINA">
                </div>
                <div>
                    <span class="supplier-label">REVISION DATE</span>
                    <input type="text" value="DECEMBER 05TH 2016">
                </div>
                <div class="items-list-wrapper">
                    <span class="supplier-label">ITEMS</span>
                    <ul class="items-list">
                        <li>
                            <textarea rows="1">3900 ½”</textarea>
                            <button type="button" class="btn-icon" onclick="removeHeaderItem(this)">X</button>
                        </li>
                    </ul>
                    <button type="button" class="btn-add-sm" onclick="addHeaderItem(this)">+ Add</button>
                </div>
                <div class="span-2">
                    <span class="supplier-label">DESCRIPTION (FAMILY)</span>
                    <textarea rows="1">SWING CHECK VALVE, THREADED</textarea>
                </div>
            </div>

            <div class="product-image-section">
                <div class="product-image-uploader">
                    <button type="button" class="btn-img-lg" onclick="triggerProductImageUpload(this)">
                        📷 Upload Image
                    </button>
                    <input type="file" accept="image/*" class="product-image-file" style="display:none"
                           onchange="handleProductImageUpload(this)">
                    <div class="product-image-preview"></div>
                </div>
            </div>
        </div>

        <div class="tests-columns">
            <div class="test-column">
                <div class="column-header">TESTS</div>
                <div class="column-controls">
                    <select>
                        <option value="">-- Select --</option>
                        <option value="__ALL__">★ ALL</option>
                        <option value="DIMENSIONAL TEST">DIMENSIONAL TEST</option>
                        <option value="FUNCTIONAL TEST">FUNCTIONAL TEST</option>
                        <option value="MATERIAL TEST">MATERIAL TEST</option>
                        <option value="APPEARANCE TEST">APPEARANCE TEST</option>
                        <option value="ARTWORK AND PACKING TEST">ARTWORK AND PACKING</option>
                    </select>
                    <button class="btn-add" onclick="addTestItem(this)" title="Add Test">➕</button>
                </div>
                <ul class="test-list"></ul>
            </div>
            <div class="test-column">
                <div class="column-header">SAMPLING STANDARD</div>
                <div class="column-controls">
                    <input type="text" placeholder="New standard...">
                    <button class="btn-add" onclick="addSimpleItem(this)">➕</button>
                </div>
                <ul class="test-list">
                    <li>
                        <textarea rows="1">ISO 2859-1 (MIL STD 105E)</textarea>
                        <button type="button" class="btn-icon" onclick="this.parentElement.remove()">X</button>
                    </li>
                </ul>
            </div>
            <div class="test-column">
                <div class="column-header">SAMPLING LEVEL</div>
                <div class="column-controls">
                    <input type="text" placeholder="New level...">
                    <button class="btn-add" onclick="addSimpleItem(this)">➕</button>
                </div>
                <ul class="test-list">
                    <li>
                        <textarea rows="1">S-2 (SI) LEVEL I REDUCED INSPECTION</textarea>
                        <button type="button" class="btn-icon" onclick="this.parentElement.remove()">X</button>
                    </li>
                </ul>
            </div>
            <div class="test-column">
                <div class="column-header">AQL FOR CLASSIFICATION NONCONFORMITIES (TYPE)</div>
                <div class="column-controls">
                    <input type="text" placeholder="New classification...">
                    <button class="btn-add" onclick="addSimpleItem(this)">➕</button>
                </div>
                <ol class="test-list numbered">
                    <li>
                        <textarea rows="1">FOR CRITICAL DEFECTS AQL= NOT ALLOWED</textarea>
                        <button type="button" class="btn-icon" onclick="this.parentElement.remove()">X</button>
                    </li>
                </ol>
            </div>
        </div>
    </header>
`;

const FOOTER_HTML = `
    <footer class="doc-footer">
        TOTAL OR PARTIAL REPRODUCTION OF THIS DOCUMENT IS PROHIBITED WITHOUT PRIOR WRITTEN AUTHORIZATION (PROPERTY OF ALAN DE AGUASCALIENTES, S.A. DE C.V.)
    </footer>
`;

/* ============================================================
   AUTO-RESIZE
   ============================================================ */
function autoResize(el) {
    if (!el || el.tagName !== 'TEXTAREA') return;
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
}
function autoResizeAll(root) {
    (root || document).querySelectorAll('textarea').forEach(autoResize);
}

/* ============================================================
   CREATE SHEET
   ============================================================ */
function createPage() {
    const page = document.createElement('div');
    page.className = 'page is-blank';
    page.innerHTML = `
        <div class="page-actions">
            <span class="page-num-badge">Sheet</span>
            <button type="button" class="btn-delete-page" data-action="delete-page"
                    title="Delete this sheet">🗑️ Delete</button>
        </div>
        <div class="page-header-slot">${HEADER_HTML}</div>
        <div class="page-placeholder">
            <span class="icon">📋</span>
            <span class="text">Add a test sheet</span>
        </div>
        <div class="page-content"></div>
        ${FOOTER_HTML}
    `;
    return page;
}

/* ============================================================
   CAPTURE / APPLY HEADER
   ============================================================ */
function captureHeaderState(page) {
    const header = page.querySelector('.document-header');
    if (!header) return null;

    const titles = [...header.querySelectorAll('.title-input')].map(i => i.value);
    const meta = [...header.querySelectorAll('.meta-area .meta-row input')].map(inp => ({
        value: inp.value,
        isPages: inp.classList.contains('pages-field')
    }));
    const supplier = [...header.querySelectorAll('.supplier-grid input, .supplier-grid > div > textarea')]
        .map(el => el.value);

    const items = [...header.querySelectorAll('.items-list li textarea')].map(ta => ta.value);

    const lists = [...header.querySelectorAll('.tests-columns .test-list')].map(list =>
        [...list.querySelectorAll('li')].map(li => {
            const el = li.querySelector('input[type="text"], textarea');
            return el ? el.value : '';
        })
    );
    const productImg = page.querySelector('.product-image-preview img');
    const productImageSrc = productImg ? productImg.src : '';

    return { titles, meta, supplier, items, lists, productImageSrc };
}

function applyHeaderState(page, state) {
    if (!state) return;
    const header = page.querySelector('.document-header');
    if (!header) return;

    header.querySelectorAll('.title-input').forEach((inp, i) => {
        if (state.titles[i] !== undefined) inp.value = state.titles[i];
    });
    header.querySelectorAll('.meta-area .meta-row input').forEach((inp, i) => {
        const s = state.meta[i];
        if (!s) return;
        if (inp.classList.contains('pages-field')) return;
        inp.value = s.value;
    });
    const supplierEls = [...header.querySelectorAll('.supplier-grid input, .supplier-grid > div > textarea')];
    supplierEls.forEach((el, i) => {
        if (state.supplier[i] !== undefined) el.value = state.supplier[i];
    });

    const itemsList = header.querySelector('.items-list');
    if (itemsList && Array.isArray(state.items)) {
        itemsList.innerHTML = '';
        state.items.forEach(v => {
            const li = document.createElement('li');
            li.innerHTML = `
                <textarea rows="1">${escapeHtml(v)}</textarea>
                <button type="button" class="btn-icon" onclick="removeHeaderItem(this)">X</button>
            `;
            itemsList.appendChild(li);
        });
    }

    header.querySelectorAll('.tests-columns .test-list').forEach((list, li) => {
        const values = state.lists[li] || [];
        list.innerHTML = '';
        values.forEach(v => {
            const item = document.createElement('li');
            item.innerHTML = `
                <textarea rows="1">${escapeHtml(v)}</textarea>
                <button type="button" class="btn-icon" onclick="this.parentElement.remove()">X</button>
            `;
            list.appendChild(item);
        });
    });
    if (state.productImageSrc) {
        const preview = page.querySelector('.product-image-preview');
        const btnUpload = page.querySelector('.btn-img-lg');
        if (preview) {
            preview.innerHTML = `
                <img src="${state.productImageSrc}" alt="Product">
                <button type="button" class="img-remove" onclick="removeProductImage(this)" title="Remove image">×</button>
            `;
            if (btnUpload) btnUpload.style.display = 'none';
        }
    }
    autoResizeAll(page);
}

function escapeHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function findSourcePage(container, excludePage = null) {
    const pages = [...container.querySelectorAll('.page')];
    for (let i = pages.length - 1; i >= 0; i--) {
        if (pages[i] === excludePage) continue;
        if (pages[i].querySelector('.page-content').innerHTML.trim()) return pages[i];
    }
    for (let i = pages.length - 1; i >= 0; i--) {
        if (pages[i] !== excludePage) return pages[i];
    }
    return null;
}

function init() {
    const container = document.getElementById('pages-container');
    container.appendChild(createPage());
    updatePageNumbers();
    updateAllBlankStatus();
    autoResizeAll(container);

    container.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-action="delete-page"]');
        if (!btn || !container.contains(btn)) return;
        deletePage(btn.closest('.page'));
    });

    container.addEventListener('input', (e) => {
        if (e.target.tagName === 'TEXTAREA') autoResize(e.target);
    });

    document.addEventListener('input', (e) => {
        if (e.target.classList && e.target.classList.contains('dim-section-spec-name')) {
            const table = e.target.closest('.dimensional-table');
            const row   = e.target.closest('tr');
            if (table && row) {
                const idx = [...row.querySelectorAll('.dim-section-spec-name')].indexOf(e.target);
                table.querySelectorAll('tr').forEach(tr => {
                    const el = tr.querySelectorAll('.dim-section-spec-name')[idx];
                    if (el && el !== e.target) el.value = e.target.value;
                });
            }
        }
        if (e.target.classList && e.target.classList.contains('dim-weight-value')) {
            const table = e.target.closest('.dimensional-table');
            if (table) recalcTotalWeight(table);
        }
    });
}

/* ============================================================
   PRINT
   ============================================================ */
function printDocument() {
    const previewOverlay = document.getElementById('preview-overlay');
    const testModal = document.getElementById('test-modal');

    if (previewOverlay.classList.contains('active')) closePreview();
    if (testModal.classList.contains('active')) testModal.classList.remove('active');

    document.body.style.overflow = '';
    autoResizeAll(document.getElementById('pages-container'));

    setTimeout(() => { window.print(); }, 150);
}

/* ============================================================
   SAVE PDF
   ============================================================ */
function savePDF() {
    const previewOverlay = document.getElementById('preview-overlay');
    const testModal      = document.getElementById('test-modal');
    if (previewOverlay && previewOverlay.classList.contains('active')) closePreview();
    if (testModal && testModal.classList.contains('active')) testModal.classList.remove('active');

    document.body.style.overflow = '';
    autoResizeAll(document.getElementById('pages-container'));

    const originalTitle = document.title;
    const date = new Date().toISOString().slice(0, 10);
    document.title = `aql-sheet-${date}`;

    const restoreTitle = () => {
        document.title = originalTitle;
        window.removeEventListener('afterprint', restoreTitle);
    };
    window.addEventListener('afterprint', restoreTitle);

    let hint = document.getElementById('pdf-hint');
    if (!hint) {
        hint = document.createElement('div');
        hint.id = 'pdf-hint';
        hint.className = 'pdf-hint';
        hint.innerHTML = '💾 En el diálogo elige <b>"Save as PDF"</b> como destino';
        document.body.appendChild(hint);
    }
    requestAnimationFrame(() => hint.classList.add('show'));
    setTimeout(() => hint.classList.remove('show'), 5000);

    setTimeout(() => {
        window.print();
        setTimeout(restoreTitle, 3000);
    }, 200);
}

/* ============================================================
   SAVE / LOAD PROJECT
   ============================================================ */
function serializePage(page) {
    const clone = page.cloneNode(true);

    const liveEls = page.querySelectorAll('input, textarea, select');
    const cloneEls = clone.querySelectorAll('input, textarea, select');

    liveEls.forEach((live, i) => {
        const cl = cloneEls[i];
        if (!cl) return;

        if (live.tagName === 'INPUT') {
            if (live.type === 'checkbox' || live.type === 'radio') {
                if (live.checked) cl.setAttribute('checked', 'checked');
                else cl.removeAttribute('checked');
            } else if (live.type !== 'file') {
                cl.setAttribute('value', live.value);
            }
        } else if (live.tagName === 'TEXTAREA') {
            cl.textContent = live.value;
        } else if (live.tagName === 'SELECT') {
            [...cl.options].forEach(opt => {
                if (opt.value === live.value) opt.setAttribute('selected', 'selected');
                else opt.removeAttribute('selected');
            });
        }
    });

    return clone.outerHTML;
}

function saveProject() {
    const pages = [...document.querySelectorAll('#pages-container .page')];
    if (!pages.length) { alert('No sheets to save.'); return; }

    const data = {
        app: 'AQL Sheet Generator',
        version: 3,
        savedAt: new Date().toISOString(),
        pages: pages.map(serializePage)
    };

    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const date = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `aql-project-${date}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function loadProject(input) {
    if (!input.files || !input.files[0]) return;
    const file = input.files[0];

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            if (!data || !Array.isArray(data.pages)) {
                throw new Error('Invalid project file (missing "pages").');
            }

            const container = document.getElementById('pages-container');
            container.innerHTML = '';

            data.pages.forEach(html => {
                const tmp = document.createElement('div');
                tmp.innerHTML = html.trim();
                const page = tmp.firstElementChild;
                if (page) container.appendChild(page);
            });

            if (!container.querySelector('.page')) {
                container.appendChild(createPage());
            }

            container.querySelectorAll('.dim-spec-image-td').forEach(td => td.remove());
            container.querySelectorAll('.dim-extra-td').forEach(td => td.remove());

            /* Migrar APPENDIX antiguos (sin .appendix-section) al nuevo formato */
            container.querySelectorAll('.appendix-body').forEach(body => {
                if (body.querySelector('.appendix-section')) return;
                const heading = body.querySelector('.appendix-heading');
                const list = body.querySelector('.appendix-list');
                if (!heading || !list) return;

                const title = heading.value || 'PRODUCT';
                const items = [...list.querySelectorAll('li textarea')].map(t => t.value);

                const wrapper = document.createElement('div');
                wrapper.className = 'appendix-sections';
                wrapper.innerHTML = appendixSectionHtml(title, items).trim();

                const legendWrapper = body.querySelector('.appendix-legend-wrapper');
                const oldAddBtn = [...body.children].find(el =>
                    el.tagName === 'BUTTON' && el.textContent.trim().startsWith('+ Add')
                );
                heading.remove();
                list.remove();
                if (oldAddBtn) oldAddBtn.remove();

                body.insertBefore(wrapper, legendWrapper || body.firstChild);

                const newAddBtn = document.createElement('button');
                newAddBtn.type = 'button';
                newAddBtn.className = 'btn-add-sm appendix-add-section-btn';
                newAddBtn.textContent = '+ Add section';
                newAddBtn.setAttribute('onclick', 'addAppendixSection(this)');
                body.insertBefore(newAddBtn, legendWrapper || null);
            });

            updatePageNumbers();
            updateAllBlankStatus();

            container.querySelectorAll('.dimensional-table').forEach(t => {
                updateDimRowspans(t);
                recalcTotalWeight(t);
                refreshSpecRemoveButtons(t);
                refreshSpecColumnWidths(t);
            });

            autoResizeAll(container);
        } catch (err) {
            console.error(err);
            alert('Could not open the file:\n' + (err.message || err));
        } finally {
            input.value = '';
        }
    };
    reader.readAsText(file);
}

/* ============================================================
   PRODUCT IMAGE
   ============================================================ */
function triggerProductImageUpload(btn) {
    btn.closest('.product-image-uploader').querySelector('.product-image-file').click();
}
function handleProductImageUpload(input) {
    const section = input.closest('.product-image-uploader');
    const preview = section.querySelector('.product-image-preview');
    const btnUpload = section.querySelector('.btn-img-lg');
    if (input.files && input.files[0]) {
        const file = input.files[0];
        if (file.size > 5 * 1024 * 1024) {
            alert('The image is too large. Maximum 5MB.');
            input.value = '';
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.innerHTML = `
                <img src="${e.target.result}" alt="Product">
                <button type="button" class="img-remove" onclick="removeProductImage(this)" title="Remove image">×</button>
            `;
            if (btnUpload) btnUpload.style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
}
function removeProductImage(btn) {
    const section = btn.closest('.product-image-uploader');
    section.querySelector('.product-image-preview').innerHTML = '';
    const fileInput = section.querySelector('.product-image-file');
    if (fileInput) fileInput.value = '';
    const btnUpload = section.querySelector('.btn-img-lg');
    if (btnUpload) btnUpload.style.display = '';
}

/* ============================================================
   HEADER — ITEMS (listado vertical)
   ============================================================ */
function addHeaderItem(btn) {
    const wrapper = btn.closest('.items-list-wrapper');
    if (!wrapper) return;
    const list = wrapper.querySelector('.items-list');
    const li = document.createElement('li');
    li.innerHTML = `
        <textarea rows="1" placeholder="Item..."></textarea>
        <button type="button" class="btn-icon" onclick="removeHeaderItem(this)">X</button>
    `;
    list.appendChild(li);
    autoResizeAll(li);
    const ta = li.querySelector('textarea');
    if (ta) ta.focus();
}

function removeHeaderItem(btn) {
    const li = btn.closest('li');
    if (li) li.remove();
}

/* ============================================================
   HEADER LISTS
   ============================================================ */
function addTestItem(btn) {
    const select = btn.closest('.column-controls').querySelector('select');
    const value = select.value;
    if (!value) { select.focus(); return; }
    const list = btn.closest('.test-column').querySelector('.test-list');

    if (value === '__ALL__') {
        ['DIMENSIONAL TEST','FUNCTIONAL TEST','MATERIAL TEST','APPEARANCE TEST','ARTWORK AND PACKING TEST'].forEach(t => {
            const li = document.createElement('li');
            li.innerHTML = `<textarea rows="1">${escapeHtml(t)}</textarea>
                            <button type="button" class="btn-icon" onclick="this.parentElement.remove()">X</button>`;
            list.appendChild(li);
        });
        autoResizeAll(list);
        select.value = '';
        return;
    }
    const li = document.createElement('li');
    li.innerHTML = `<textarea rows="1">${escapeHtml(value)}</textarea>
                    <button type="button" class="btn-icon" onclick="this.parentElement.remove()">X</button>`;
    list.appendChild(li);
    autoResizeAll(list);
    select.value = '';
}

function addSimpleItem(btn) {
    const input = btn.closest('.column-controls').querySelector('input[type="text"]');
    const value = input.value.trim();
    if (!value) { input.focus(); return; }
    const list = btn.closest('.test-column').querySelector('.test-list');
    const li = document.createElement('li');
    li.innerHTML = `<textarea rows="1">${escapeHtml(value)}</textarea>
                    <button type="button" class="btn-icon" onclick="this.parentElement.remove()">X</button>`;
    list.appendChild(li);
    autoResizeAll(list);
    input.value = '';
}

/* ============================================================
   MODAL
   ============================================================ */
function openTestModal() { document.getElementById('test-modal').classList.add('active'); }
function closeTestModal() { document.getElementById('test-modal').classList.remove('active'); }
document.getElementById('test-modal').addEventListener('click', (e) => {
    if (e.target.id === 'test-modal') closeTestModal();
});

/* ============================================================
   PREVIEW
   ============================================================ */
function openPreview() {
    const overlay = document.getElementById('preview-overlay');
    const content = document.getElementById('preview-content');
    const info = document.getElementById('preview-info');

    const pages = document.querySelectorAll('#pages-container .page');
    content.innerHTML = '';

    pages.forEach((page) => {
        const clone = page.cloneNode(true);
        content.appendChild(clone);
    });

    const total = pages.length;
    info.textContent = `(${total} ${total === 1 ? 'sheet' : 'sheets'})`;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    setTimeout(() => autoResizeAll(content), 50);
}

function closePreview() {
    document.getElementById('preview-overlay').classList.remove('active');
    document.body.style.overflow = '';
    document.getElementById('preview-content').innerHTML = '';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (document.getElementById('preview-overlay').classList.contains('active')) closePreview();
        else if (document.getElementById('test-modal').classList.contains('active')) closeTestModal();
    }
});

document.addEventListener('keydown', (e) => {
    const el = e.target;
    if (el && el.classList && el.classList.contains('sheet-title-editable') && e.key === 'Enter') {
        e.preventDefault();
        el.blur();
    }
});

/* ============================================================
   ROMAN NUMERALS
   ============================================================ */
function romanToInt(s) {
    const map = { I:1, V:5, X:10, L:50, C:100, D:500, M:1000 };
    let n = 0;
    for (let i = 0; i < s.length; i++) {
        const cur = map[s[i]];
        const next = map[s[i + 1]];
        if (next && cur < next) n -= cur;
        else n += cur;
    }
    return n;
}
function intToRoman(num) {
    const vals = [
        [1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],
        [100,'C'],[90,'XC'],[50,'L'],[40,'XL'],
        [10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']
    ];
    let res = '';
    vals.forEach(([v, s]) => { while (num >= v) { res += s; num -= v; } });
    return res;
}

function nextAnnexLetter() {
    const pages = document.querySelectorAll('#pages-container .page');
    let maxIdx = 0;
    pages.forEach(p => {
        const t = p.querySelector('.sheet-title-bar h3');
        if (!t) return;
        const m = t.textContent.trim().match(/^ANNEX\s+([A-Z]+)/i);
        if (m) {
            const code = m[1].toUpperCase();
            let idx = 0;
            for (let i = 0; i < code.length; i++) {
                idx = idx * 26 + (code.charCodeAt(i) - 64);
            }
            if (idx > maxIdx) maxIdx = idx;
        }
    });
    let next = maxIdx + 1;
    let res = '';
    while (next > 0) {
        const rem = (next - 1) % 26;
        res = String.fromCharCode(65 + rem) + res;
        next = Math.floor((next - 1) / 26);
    }
    return res;
}

function nextAppendixRoman() {
    const pages = document.querySelectorAll('#pages-container .page');
    let maxVal = 0;
    pages.forEach(p => {
        const t = p.querySelector('.sheet-title-bar h3');
        if (!t) return;
        const m = t.textContent.trim().match(/^APPENDIX\s+([IVXLCDM]+)/i);
        if (m) {
            const v = romanToInt(m[1].toUpperCase());
            if (v > maxVal) maxVal = v;
        }
    });
    return intToRoman(maxVal + 1);
}

/* ============================================================
   ADD SHEET WITH TEST TYPE
   ============================================================ */
function selectTest(type) {
    const container = document.getElementById('pages-container');
    const allPages = [...container.querySelectorAll('.page')];
    let targetPage = allPages.find(p => !p.querySelector('.page-content').innerHTML.trim());

    if (!targetPage) {
        targetPage = createPage();
        container.appendChild(targetPage);
    }

    const sourcePage = findSourcePage(container, targetPage);
    if (sourcePage) applyHeaderState(targetPage, captureHeaderState(sourcePage));

    let customTitle = null;
    if (type === 'ANNEX') {
        customTitle = 'ANNEX ' + nextAnnexLetter() +
                      ': SINGLE SAMPLING PLANS FOR TIGHTENED (LEVEL III) INSPECTION';
    } else if (type === 'APPENDIX') {
        customTitle = 'APPENDIX ' + nextAppendixRoman();
    }

    targetPage.querySelector('.page-content').innerHTML = getTestContent(type, customTitle);

    targetPage.querySelectorAll('.dimensional-table').forEach(table => {
        updateDimRowspans(table);
        recalcTotalWeight(table);
        refreshSpecRemoveButtons(table);
        refreshSpecColumnWidths(table);
    });

    closeTestModal();
    updatePageNumbers();
    updateAllBlankStatus();
    autoResizeAll(targetPage);
}

function addBlankSheet() {
    const container = document.getElementById('pages-container');
    const targetPage = createPage();
    container.appendChild(targetPage);

    const sourcePage = findSourcePage(container, targetPage);
    if (sourcePage) applyHeaderState(targetPage, captureHeaderState(sourcePage));

    updatePageNumbers();
    updateAllBlankStatus();
    autoResizeAll(targetPage);
    targetPage.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ============================================================
   DELETE A SHEET
   ============================================================ */
function deletePage(page) {
    if (!page) return;
    const total = document.querySelectorAll('#pages-container .page').length;
    if (total <= 1) { alert('The document must contain at least one sheet.'); return; }

    const hasContent = page.querySelector('.page-content') &&
                       page.querySelector('.page-content').innerHTML.trim() !== '';
    if (hasContent) {
        if (!confirm('Delete this sheet and all its content?')) return;
    }
    page.remove();
    updatePageNumbers();
    updateAllBlankStatus();
}

/* ============================================================
   BLANK SHEETS
   ============================================================ */
function updateBlankStatus(page) {
    if (!page) return;
    const content = page.querySelector('.page-content');
    page.classList.toggle('is-blank', !content || !content.innerHTML.trim());
}
function updateAllBlankStatus() {
    document.querySelectorAll('#pages-container .page').forEach(updateBlankStatus);
}

/* ============================================================
   NUMBERING
   ============================================================ */
function updatePageNumbers() {
    const pages = document.querySelectorAll('#pages-container .page');
    const total = pages.length;
    pages.forEach((page, idx) => {
        const badge = page.querySelector('.page-num-badge');
        if (badge) badge.textContent = `Sheet ${idx + 1} / ${total}`;
        const pagesField = page.querySelector('.pages-field');
        if (pagesField) pagesField.value = `${idx + 1} of ${total}`;
        const deleteBtn = page.querySelector('.btn-delete-page');
        if (deleteBtn) deleteBtn.style.display = (idx === 0) ? 'none' : 'inline-flex';
    });
}

/* ============================================================
   CONTENT TEMPLATES
   ============================================================ */
function getTestContent(type, customTitle) {
    const wrap = (title, body, opts = {}) => `
        <div class="sheet-content">
            <div class="sheet-title-bar">
                <h3${opts.editableTitle
                    ? ' class="sheet-title-editable" contenteditable="true" spellcheck="false"'
                    : ''}>${escapeHtml(title)}</h3>
            </div>
            <div class="sheet-body">${body}</div>
        </div>
    `;
    switch (type) {
        case 'DIMENSIONAL TEST':
            return wrap(customTitle || 'Dimensional Test', dimensionalBody());
        case 'DIMENSIONAL TEST (TYPE B)':
            return wrap(customTitle || 'Dimensional Test', dimensionalBodyB());
        case 'FUNCTIONAL TEST':
            return wrap(customTitle || 'Functional Test', functionalBody());
        case 'MATERIAL TEST':
            return wrap(customTitle || 'Material Test', materialBody());
        case 'APPEARANCE TEST':
            return wrap(customTitle || 'Appearance Test', appearanceBody());
        case 'ARTWORK AND PACKING TEST':
            return wrap(customTitle || 'Artwork and Packing Test', artworkBody());
        case 'REVIEWS REGISTRIES':
            return wrap(customTitle || 'Reviews Registries', reviewsRegistriesBody());
        case 'ANNEX':
            return wrap(customTitle || 'ANNEX A: SINGLE SAMPLING PLANS FOR TIGHTENED (LEVEL III) INSPECTION',
                        annexBody(), { editableTitle: true });
        case 'APPENDIX':
            return wrap(customTitle || 'APPENDIX I', appendixBody(), { editableTitle: true });
        default:
            console.warn('getTestContent: tipo desconocido →', type);
            return '';
    }
}

/* ============================================================
   DIMENSIONAL TEST — TYPE A
   ============================================================ */
function escapeAttr(str) {
    return escapeHtml(str).replace(/"/g, '&quot;');
}

const DIM_DEFAULT_MODEL = 'R-39-15"';

function dimSpecNameCells(names) {
    return names.map(n => `
        <td class="dim-section-spec-td">
            <input type="text" class="dim-section-spec-name" value="${escapeAttr(n)}" placeholder="Model">
        </td>`).join('');
}

/* Fila de datos genérica (concepto + una celda por columna SPECIFICATIONS) */
function dimDataRowHtml(section, concept, specs, indexLetter) {
    const isWeights = section === 'weights';
    const indexCell = (indexLetter !== null && indexLetter !== undefined)
        ? `<input type="text" class="dim-index" value="${escapeAttr(indexLetter)}" maxlength="3">`
        : `<span class="dim-index-spacer"></span>`;
    const specCells = specs.map(v => `
            <td class="dim-spec-td">
                <textarea rows="1" class="dim-spec-input${isWeights ? ' dim-weight-value' : ''}">${escapeHtml(v)}</textarea>
            </td>`).join('');
    return `
        <tr class="dim-data-row" data-section="${section}" data-block="${section}">
            <td class="dim-concept-td">
                <div class="dim-row-content">
                    ${indexCell}
                    <textarea rows="1" class="dim-concept-input">${escapeHtml(concept)}</textarea>
                </div>
                <button type="button" class="btn-icon dim-row-remove" onclick="removeDimDataRow(this)" title="Delete row">X</button>
            </td>
            ${specCells}
        </tr>`;
}

/* Bloque removable: cabecera (título editable + nombres de modelo) + filas + "add row" */
function dimBlockHtml(id, title, names, rows) {
    return `
        <tr class="dim-section-row dim-block-header" data-block="${id}">
            <td class="dim-section-title">
                <div class="dim-block-title-wrap">
                    <input type="text" class="dim-section-name" value="${escapeAttr(title)}" placeholder="Section title">
                    <button type="button" class="btn-icon dim-block-remove" onclick="removeDimSection(this)" title="Remove this section">X</button>
                </div>
            </td>
            ${dimSpecNameCells(names)}
        </tr>
        ${rows.map(r => dimDataRowHtml(id, r[0], r.slice(1), null)).join('')}
        <tr class="dim-add-row" data-block="${id}">
            <td colspan="${1 + names.length}">
                <button type="button" class="btn-add-sm" onclick="addDimDataRow(this, '${id}')">+ Add row</button>
            </td>
        </tr>`;
}

function dimensionalBody() {
    const names = [DIM_DEFAULT_MODEL];
    return `
        <table class="dimensional-table dim-type-a-table" data-dim-table>
            <thead>
                <tr>
                    <th style="width:20%">CONCEPT</th>
                    <th class="dim-spec-th" style="width:10%">${specThInnerHtml()}</th>
                    <th style="width:13%">EQUIPMENT/INSTRUMENT</th>
                    <th style="width:30%">TEST METHOD</th>
                    <th style="width:20%">RESULTS</th>
                    <th style="width:5%">TYPE</th>
                </tr>
            </thead>
            <tbody class="dim-tbody">
                <tr class="dim-section-row dim-block-header" data-block="elementary">
                    <td class="dim-section-title">
                        <div class="dim-section-header">
                            <span>ELEMENTARY MEASURES</span>
                        </div>
                    </td>
                    ${dimSpecNameCells(names)}
                    <td rowspan="1" class="dim-vertical-td" data-col="equipment">
                        <div class="vertical-list">
                            <div class="vertical-item">
                                <textarea rows="1">CALIPER</textarea>
                                <button type="button" class="btn-icon" onclick="removeVerticalItem(this)">X</button>
                            </div>
                        </div>
                        <button type="button" class="btn-add-sm" onclick="addVerticalItem(this)">+ Add</button>
                        <div class="vertical-list method-list equipment-img-list"></div>
                        <button type="button" class="btn-add-sm" onclick="triggerMethodImageUpload(this)">📷 Add image</button>
                        <input type="file" accept="image/*" class="method-file" style="display:none" onchange="handleMethodImageUpload(this)">
                    </td>
                    <td rowspan="1" class="dim-vertical-td" data-col="method">
                        <div class="vertical-list method-list"></div>
                        <button type="button" class="btn-add-sm" onclick="triggerMethodImageUpload(this)">📷 Add image</button>
                        <input type="file" accept="image/*" class="method-file" style="display:none" onchange="handleMethodImageUpload(this)">
                    </td>
                    <td rowspan="1" class="dim-vertical-td" data-col="results">
                        <div class="vertical-list">
                            <div class="vertical-item">
                                <textarea rows="1">LENGTH, DIAMETERS AND HEIGHT: VALVES TOLERANCE= ± 2mm</textarea>
                                <button type="button" class="btn-icon" onclick="removeVerticalItem(this)">X</button>
                            </div>
                        </div>
                        <button type="button" class="btn-add-sm" onclick="addVerticalItem(this)">+ Add</button>
                        <div class="vertical-list method-list results-img-list"></div>
                        <button type="button" class="btn-add-sm" onclick="triggerMethodImageUpload(this)">📷 Add image</button>
                        <input type="file" accept="image/*" class="method-file" style="display:none" onchange="handleMethodImageUpload(this)">
                    </td>
                    <td rowspan="1" class="dim-vertical-td" data-col="type">
                        <div class="vertical-list">
                            <div class="vertical-item">
                                <textarea rows="1">1</textarea>
                                <button type="button" class="btn-icon" onclick="removeVerticalItem(this)">X</button>
                            </div>
                        </div>
                        <button type="button" class="btn-add-sm" onclick="addVerticalItem(this)">+ Add</button>
                    </td>
                </tr>
                ${renderElementaryRows()}
                <tr class="dim-add-row" data-block="elementary">
                    <td colspan="2">
                        <button type="button" class="btn-add-sm" onclick="addDimDataRow(this, 'elementary')">+ Add row</button>
                    </td>
                </tr>

                ${dimBlockHtml('weights', 'WEIGHTS (GRAMS)', names, [
                    ['SHOWER ARM', '205 (± 5%)'],
                ])}

                <tr class="dim-section-row">
                    <td colspan="2" class="dim-section-title">TOTAL WEIGHT (GRAMS)</td>
                </tr>
                <tr class="dim-data-row" data-section="total-weight">
                    <td class="dim-concept-td"></td>
                    <td class="dim-spec-td">
                        <textarea rows="1" class="dim-spec-input dim-total-weight" readonly>0.00 (± 5%)</textarea>
                    </td>
                </tr>

                <!-- 👇 Fila espaciadora en blanco (igual a + Add row pero sin botón) -->
                <tr class="dim-add-row dim-spacer-row">
                    <td colspan="2"></td>
                </tr>

                ${dimBlockHtml('threads', 'TYPE OF THREADS', names, [
                    ['END THREAD 1', '½-14-N.P.T'],
                ])}

                ${dimBlockHtml('thickness', 'THICKNESS', names, [
                    ['SHOWER ARM', '0.054" (± 0.000")'],
                ])}

                <tr class="dim-add-row dim-add-section-row">
                    <td colspan="2">
                        <button type="button" class="btn-add-sm" onclick="addDimSection(this)">+ Add section</button>
                    </td>
                </tr>
            </tbody>
        </table>
    `;
}

function renderElementaryRows() {
    const data = [
        ['A', 'SHOWER ARM LENGTH',    '4.250" (± 0.080")'],
    ];
    return data.map(r => dimDataRowHtml('elementary', r[1], [r[2]], r[0])).join('');
}

/* Quita un bloque completo (cabecera + filas + "add row") */
function removeDimSection(btn) {
    const header = btn.closest('tr');
    const table  = header.closest('.dimensional-table');
    const block  = header.dataset.block;
    if (!table || !block) return;
    table.querySelectorAll('tr[data-block]').forEach(tr => {
        if (tr.dataset.block === block) tr.remove();
    });
    updateDimRowspans(table);
    recalcTotalWeight(table);
}

/* Añade una sección nueva con título editable */
function addDimSection(btn) {
    const table  = btn.closest('.dimensional-table');
    const addRow = btn.closest('tr');
    const tbody  = table.querySelector('.dim-tbody');
    const specCount = table.querySelectorAll('.dim-spec-th').length || 1;

    const firstNames = [...table.querySelectorAll('.dim-block-header')[0]
        ?.querySelectorAll('.dim-section-spec-name') || []].map(i => i.value);
    const names = [];
    for (let i = 0; i < specCount; i++) names.push(firstNames[i] || '');

    const id = 'sec-' + Date.now().toString(36);
    const tmp = document.createElement('tbody');
    tmp.innerHTML = dimBlockHtml(id, 'NEW SECTION', names, []);
    [...tmp.children].forEach(tr => tbody.insertBefore(tr, addRow));

    const blockAddBtn = tbody.querySelector(`tr.dim-add-row[data-block="${id}"] .btn-add-sm`);
    if (blockAddBtn) addDimDataRow(blockAddBtn, id);
    updateDimRowspans(table);
    const title = tbody.querySelector(`tr[data-block="${id}"] .dim-section-name`);
    if (title) { title.focus(); title.select(); }
}

/* ============================================================
   DIMENSIONAL TEST — TYPE B
   ============================================================ */
function dimensionalBodyB() {
    return `
        <table class="dimensional-table dim-type-b-table" data-dim-table>
            <thead>
                <tr>
                    <th style="width:18%">CONCEPT</th>
                    <th class="dim-spec-th" style="width:14%">${specThInnerHtml()}</th>
                    <th style="width:13%">EQUIPMENT/INSTRUMENT</th>
                    <th style="width:27%">TEST METHOD</th>
                    <th style="width:23%">RESULTS</th>
                    <th style="width:5%">TYPE</th>
                </tr>
            </thead>
            <tbody class="dim-tbody">
                <tr class="dim-functional-row dim-type-b-row">
                    <td rowspan="1" class="dim-vertical-td" data-col="concept">
                        <div class="vertical-list">
                            <div class="vertical-item">
                                <textarea rows="1">VALVE BODY TOTAL HEIGHT</textarea>
                                <button type="button" class="btn-icon" onclick="removeVerticalItem(this)">X</button>
                            </div>
                        </div>
                        <button type="button" class="btn-add-sm" onclick="addVerticalItem(this)">+ Add</button>
                    </td>
                    <td rowspan="1" class="dim-vertical-td" data-col="spec">
                        <div class="vertical-list">
                            <div class="vertical-item">
                                <textarea rows="1">50.94 (± 2mm)</textarea>
                                <button type="button" class="btn-icon" onclick="removeVerticalItem(this)">X</button>
                            </div>
                        </div>
                        <button type="button" class="btn-add-sm" onclick="addVerticalItem(this)">+ Add</button>
                    </td>
                    <td rowspan="1" class="dim-vertical-td" data-col="equipment">
                        <div class="vertical-list">
                            <div class="vertical-item">
                                <textarea rows="1">CALIPER</textarea>
                                <button type="button" class="btn-icon" onclick="removeVerticalItem(this)">X</button>
                            </div>
    
                        </div>
                        <button type="button" class="btn-add-sm" onclick="addVerticalItem(this)">+ Add</button>
                    </td>
                    <td rowspan="1" class="dim-vertical-td" data-col="method">
                        <div class="vertical-list method-list"></div>
                        <button type="button" class="btn-add-sm" onclick="triggerMethodImageUpload(this)">📷 Add image</button>
                        <input type="file" accept="image/*" class="method-file" style="display:none" onchange="handleMethodImageUpload(this)">
                    </td>
                    <td rowspan="1" class="dim-vertical-td" data-col="results">
                        <div class="vertical-list">
                            <div class="vertical-item">
                                <textarea rows="1">LENGTH, DIAMETERS AND HEIGHT: VALVES TOLERANCE= ± 2mm</textarea>
                                <button type="button" class="btn-icon" onclick="removeVerticalItem(this)">X</button>
                            </div>
                        </div>
                        <button type="button" class="btn-add-sm" onclick="addVerticalItem(this)">+ Add</button>
                    </td>
                    <td rowspan="1" class="dim-vertical-td" data-col="type">
                        <div class="vertical-list">
                            <div class="vertical-item">
                                <textarea rows="1">1</textarea>
                                <button type="button" class="btn-icon" onclick="removeVerticalItem(this)">X</button>
                            </div>
                        </div>
                        <button type="button" class="btn-add-sm" onclick="addVerticalItem(this)">+ Add</button>
                    </td>
                </tr>
            </tbody>
        </table>
    `;
}

/* ============================================================
   FUNCTIONAL TEST
   ============================================================ */
/* Helper — construye una fila completa del Functional Test */
function functionalRowHtml(data = {}) {
    const concept   = data.concept   || '';
    const equipment = data.equipment || '';
    const type      = data.type      || '1';
    const specs     = data.specs     || [''];
    const methods   = data.methods   || [''];
    const results   = data.results   || [''];
    const methodImage = !!data.methodImage; // true → agrega 📷 Add image en TEST METHOD

    const specHtml = specs.map(v => `
        <div class="vertical-item">
            <textarea rows="1">${escapeHtml(v)}</textarea>
            <button type="button" class="btn-icon" onclick="removeVerticalItem(this)">X</button>
        </div>`).join('');

    const methodHtml = methods.map(v => `
        <div class="vertical-item method-item">
            <span class="method-num"></span>
            <textarea rows="1">${escapeHtml(v)}</textarea>
            <button type="button" class="btn-icon" onclick="removeVerticalItem(this)">X</button>
        </div>`).join('');

    const resultHtml = results.map(v => `
        <div class="vertical-item">
            <textarea rows="1">${escapeHtml(v)}</textarea>
            <button type="button" class="btn-icon" onclick="removeVerticalItem(this)">X</button>
        </div>`).join('');

    return `
        <tr class="dim-functional-row">
            <td rowspan="1" class="dim-vertical-td" data-col="concept">
                <!-- 👇 Delete row — esquina superior derecha, ARRIBA del delete del CONCEPT -->
                <button type="button" class="btn-icon dim-func-row-remove" onclick="removeFunctionalRow(this)" title="Delete row">X</button>

                <div class="vertical-list">
                    <div class="vertical-item">
                        <textarea rows="1">${escapeHtml(concept)}</textarea>
                        <button type="button" class="btn-icon" onclick="removeVerticalItem(this)">X</button>
                    </div>
                </div>
                <button type="button" class="btn-add-sm" onclick="addVerticalItem(this)">+ Add</button>
            </td>
            <td rowspan="1" class="dim-vertical-td" data-col="spec">
                <div class="vertical-list">${specHtml}</div>
                <button type="button" class="btn-add-sm" onclick="addVerticalItem(this)">+ Add</button>
                <div class="vertical-list method-list spec-img-list"></div>
                <button type="button" class="btn-add-sm" onclick="triggerMethodImageUpload(this)">📷 Add image</button>
                <input type="file" accept="image/*" class="method-file" style="display:none" onchange="handleMethodImageUpload(this)">
            </td>
            <td rowspan="1" class="dim-vertical-td" data-col="equipment">
                <div class="vertical-list">
                    <div class="vertical-item">
                        <textarea rows="1">${escapeHtml(equipment)}</textarea>
                        <button type="button" class="btn-icon" onclick="removeVerticalItem(this)">X</button>
                    </div>
                </div>
                <button type="button" class="btn-add-sm" onclick="addVerticalItem(this)">+ Add</button>
                <div class="vertical-list method-list equipment-img-list"></div>
                <button type="button" class="btn-add-sm" onclick="triggerMethodImageUpload(this)">📷 Add image</button>
                <input type="file" accept="image/*" class="method-file" style="display:none" onchange="handleMethodImageUpload(this)">
            </td>
            <td rowspan="1" class="dim-vertical-td" data-col="method">
                <div class="vertical-list method-numbered-list">${methodHtml}</div>
                <button type="button" class="btn-add-sm" onclick="addMethodItem(this)">+ Add</button>
                ${methodImage ? `
                <div class="vertical-list method-list method-img-list"></div>
                <button type="button" class="btn-add-sm" onclick="triggerMethodImageUpload(this)">📷 Add image</button>
                <input type="file" accept="image/*" class="method-file" style="display:none" onchange="handleMethodImageUpload(this)">` : ''}
            </td>
            <td rowspan="1" class="dim-vertical-td" data-col="results">
                <div class="vertical-list">${resultHtml}</div>
                <button type="button" class="btn-add-sm" onclick="addVerticalItem(this)">+ Add</button>
            </td>
            <td rowspan="1" class="dim-vertical-td" data-col="type">
                <div class="vertical-list">
                    <div class="vertical-item">
                        <textarea rows="1">${escapeHtml(type)}</textarea>
                        <button type="button" class="btn-icon" onclick="removeVerticalItem(this)">X</button>
                    </div>
                </div>
                <button type="button" class="btn-add-sm" onclick="addVerticalItem(this)">+ Add</button>
            </td>
        </tr>
    `;
}

function functionalBody() {
    return `
        <table class="dimensional-table functional-table" data-dim-table data-functional-table>
            <thead>
                <tr>
                    <th style="width:13%">CONCEPT</th>
                    <th class="dim-spec-th" style="width:18%">${specThInnerHtml()}</th>
                    <th style="width:13%">EQUIPMENT/INSTRUMENT</th>
                    <th style="width:20%">TEST METHOD</th>
                    <th style="width:21%">RESULTS</th>
                    <th style="width:5%">TYPE</th>
                </tr>
            </thead>
            <tbody class="dim-tbody">
                ${functionalRowHtml({
                    concept:   'ASSEMBLE',
                    specs:     ['ASSEMBLE: SHOWER ARM AN FLANGE'],
                    equipment: 'NONE',
                    methods: [
                        'THE SAMPLES MUST BE FREE OF BURRS.',
                    ],
                    results: [
                        'ALL THE COMPONENTS (SHOWER ARM AND FLANGE) MUST ASSEMBLE CORRECTLY.',
                    ],
                    type: '1'
                })}

                ${functionalRowHtml({
                    concept:   'TIGHTENING RESISTENCE IN THE CONNECTIONS (THREADS)',
                    specs:     ['TO APPLY: THREADS 5.0 N·m (0.5 kg·m)'],
                    equipment: 'TORQUE METER',
                    methods: [
                        'THE SAMPLES MUST BE FREE OF BURRS.',
                    ],
                    results: [
                        'THE SHOWER ARM MUST NOT HAVE CRACKS, FISSURES, LOW THREADS OR ANY OTHER DEFORMATION WHEN ARE SUBJECTED TO THIS TEST'
                    ],
                    type: '1'
                })}

                <tr class="dim-add-row">
                    <td colspan="6">
                        <button type="button" class="btn-add-sm" onclick="addFunctionalRow(this)">+ Add row</button>
                    </td>
                </tr>
            </tbody>
        </table>
    `;
}

function addFunctionalRow(btn) {
    const table  = btn.closest('.dimensional-table');
    const tbody  = table.querySelector('.dim-tbody');
    const addRow = btn.closest('tr');

    const tmp = document.createElement('tbody');
    tmp.innerHTML = functionalRowHtml({ methodImage: table.classList.contains('appearance-table') }).trim();
    const newRow = tmp.firstElementChild;
    tbody.insertBefore(newRow, addRow);

    autoResizeAll(newRow);
    const firstInput = newRow.querySelector('.dim-vertical-td[data-col="concept"] textarea');
    if (firstInput) firstInput.focus();
}

function removeFunctionalRow(btn) {
    const row = btn.closest('tr.dim-functional-row');
    if (!row) return;
    const tbody = row.closest('tbody');
    row.remove();
    if (tbody && !tbody.querySelector('.dim-functional-row')) {
        const addRow = tbody.querySelector('.dim-add-row');
        const tmp = document.createElement('tbody');
        const tbl = tbody.closest('table');
        tmp.innerHTML = functionalRowHtml({ methodImage: !!tbl && tbl.classList.contains('appearance-table') }).trim();
        tbody.insertBefore(tmp.firstElementChild, addRow);
    }
}

/* ============================================================
   MATERIAL TEST
   ============================================================ */
function materialBody() {
    return `
        <table class="dimensional-table material-table" data-dim-table data-material-table>
            <thead>
                <tr>
                    <th style="width:18%">CONCEPT</th>
                    <th class="dim-spec-th" style="width:15%">${specThInnerHtml()}</th>
                    <th style="width:15%">EQUIPMENT/INSTRUMENT</th>
                    <th style="width:22%">TEST METHOD</th>
                    <th style="width:25%">RESULTS</th>
                    <th style="width:5%">TYPE</th>
                </tr>
            </thead>
            <tbody class="dim-tbody material-tbody">
                ${renderMaterialRow({
                    concept: 'BODY',
                    spec: 'BRASS — ASTM B584',
                    equipment: 'SPECTROMETER',
                    results: 'MATERIAL CERTIFICATES REQUIRED',
                    type: '1'
                })}
                ${renderMaterialRow({
                    concept: 'CAP',
                    spec: 'BRASS — ASTM B584',
                    equipment: 'SPECTROMETER',
                    results: 'CHEMICAL COMPOSITION WITHIN SPEC',
                    type: '1'
                })}
                ${renderMaterialRow({
                    concept: 'PISTON',
                    spec: 'BRASS — ASTM B584',
                    equipment: 'HARDNESS TESTER',
                    results: 'NO CRACKS, POROSITY OR INCLUSIONS',
                    type: '1'
                })}
                ${renderMaterialRow({
                    concept: 'SEAL',
                    spec: 'NBR RUBBER',
                    equipment: 'VISUAL INSPECTION',
                    results: 'MATERIAL CERTIFICATES REQUIRED',
                    type: '1'
                })}
                <tr class="dim-add-row">
                    <td colspan="6">
                        <button type="button" class="btn-add-sm" onclick="addMaterialRow(this)">+ Add row</button>
                    </td>
                </tr>
            </tbody>
        </table>
    `;
}

function renderMaterialRow(data) {
    return `
        <tr class="material-row">
            <td class="material-concept-td dim-concept-td">
                <textarea rows="1" class="dim-concept-input material-text" placeholder="Concept...">${escapeHtml(data.concept || '')}</textarea>
                <button type="button" class="btn-icon dim-row-remove" onclick="removeMaterialRow(this)" title="Delete row">X</button>
            </td>
            <td class="material-text-td">
                <textarea rows="1" class="dim-spec-input material-text" placeholder="Specification...">${escapeHtml(data.spec || '')}</textarea>
            </td>
            <td class="material-text-td">
                <textarea rows="1" class="dim-spec-input material-text" placeholder="Equipment...">${escapeHtml(data.equipment || '')}</textarea>
            </td>
            <td class="material-text-td">
                <textarea rows="1" class="dim-spec-input material-text" placeholder="Test method...">${escapeHtml(data.testMethod || '')}</textarea>
            </td>
            <td class="material-text-td">
                <textarea rows="1" class="dim-spec-input material-text" placeholder="Results...">${escapeHtml(data.results || '')}</textarea>
            </td>
            <td class="material-text-td">
                <textarea rows="1" class="dim-spec-input material-text" placeholder="Type...">${escapeHtml(data.type || '1')}</textarea>
            </td>
        </tr>
    `;
}

function addMaterialRow(btn) {
    const table  = btn.closest('.dimensional-table');
    const tbody  = table.querySelector('.material-tbody');
    const addRow = btn.closest('tr');

    const specCount = table.querySelectorAll('.dim-spec-th').length || 1;

    const newRow = document.createElement('tr');
    newRow.className = 'material-row';

    const conceptCell = `
        <td class="material-concept-td dim-concept-td">
            <textarea rows="1" class="dim-concept-input material-text" placeholder="Concept..."></textarea>
            <button type="button" class="btn-icon dim-row-remove" onclick="removeMaterialRow(this)" title="Delete row">X</button>
        </td>`;

    let specCells = '';
    for (let i = 0; i < specCount; i++) {
        specCells += `<td class="material-text-td">
            <textarea rows="1" class="dim-spec-input material-text" placeholder="Specification..."></textarea>
        </td>`;
    }

    const restCells = `
        <td class="material-text-td"><textarea rows="1" class="dim-spec-input material-text" placeholder="Equipment..."></textarea></td>
        <td class="material-text-td"><textarea rows="1" class="dim-spec-input material-text" placeholder="Test method..."></textarea></td>
        <td class="material-text-td"><textarea rows="1" class="dim-spec-input material-text" placeholder="Results..."></textarea></td>
        <td class="material-text-td"><textarea rows="1" class="dim-spec-input material-text" placeholder="Type...">1</textarea></td>
    `;

    newRow.innerHTML = conceptCell + specCells + restCells;

    tbody.insertBefore(newRow, addRow);
    autoResizeAll(newRow);
    const firstInput = newRow.querySelector('.dim-concept-input');
    if (firstInput) firstInput.focus();
}

function removeMaterialRow(btn) {
    const row = btn.closest('tr');
    if (row) row.remove();
}

/* ============================================================
   APPEARANCE TEST
   ============================================================ */
function appearanceBody() {
    return `
        <table class="dimensional-table functional-table appearance-table" data-dim-table data-functional-table>
            <thead>
                <tr>
                    <th style="width:13%">CONCEPT</th>
                    <th class="dim-spec-th" style="width:18%">${specThInnerHtml()}</th>
                    <th style="width:13%">EQUIPMENT/INSTRUMENT</th>
                    <th style="width:20%">TEST METHOD</th>
                    <th style="width:21%">RESULTS</th>
                    <th style="width:5%">TYPE</th>
                </tr>
            </thead>
            <tbody class="dim-tbody">
                ${functionalRowHtml({
                    concept:   'SURFACE FINISH',
                    specs:     ['SURFACE MUST BE FREE OF DEFECTS'],
                    equipment: 'VISUAL INSPECTION',
                    methods: [
                        'VISUAL INSPECTION UNDER 500 LUX LIGHT.'
                    ],
                    results: [
                        'SURFACE FREE OF DEFECTS',
                        'NO SCRATCHES, DENTS OR DISCOLORATION'
                    ],
                    type: '1',
                    methodImage: true
                })}

                <tr class="dim-add-row">
                    <td colspan="6">
                        <button type="button" class="btn-add-sm" onclick="addFunctionalRow(this)">+ Add row</button>
                    </td>
                </tr>
            </tbody>
        </table>
    `;
}

/* Las filas del Appearance Test reutilizan functionalRowHtml(),
   addFunctionalRow() y removeFunctionalRow() del Functional Test.
   Los helpers addAppearanceMethodItem / removeAppearanceMethodItem /
   triggerAppearanceItemImg / handleAppearanceItemImg / removeAppearanceItemImg
   se conservan porque el módulo ARTWORK AND PACKING TEST los sigue usando. */

function addAppearanceMethodItem(btn) {
    const cell = btn.closest('td');
    const list = cell.querySelector('.appearance-method-list');
    const item = document.createElement('div');
    item.className = 'appearance-method-item';
    item.innerHTML = `
        <div class="appearance-method-text-row">
            <textarea rows="1" placeholder="Method description..."></textarea>
            <button type="button" class="btn-icon" onclick="removeAppearanceMethodItem(this)">X</button>
        </div>
        <div class="appearance-method-img-area">
            <div class="appearance-img-preview"></div>
            <button type="button" class="btn-add-sm" onclick="triggerAppearanceItemImg(this)">📷 Add image</button>
            <input type="file" accept="image/*" class="appearance-item-file" style="display:none" onchange="handleAppearanceItemImg(this)">
        </div>
    `;
    list.appendChild(item);
    autoResizeAll(item);
    const ta = item.querySelector('textarea');
    if (ta) ta.focus();
}

function removeAppearanceMethodItem(btn) {
    const item = btn.closest('.appearance-method-item');
    if (item) item.remove();
}

function triggerAppearanceItemImg(btn) {
    const item = btn.closest('.appearance-method-item');
    if (!item) return;
    const fileInput = item.querySelector('.appearance-item-file');
    if (fileInput) fileInput.click();
}

function handleAppearanceItemImg(input) {
    const item = input.closest('.appearance-method-item');
    if (!item) return;
    const preview = item.querySelector('.appearance-img-preview');
    if (!preview) return;

    if (input.files && input.files[0]) {
        const file = input.files[0];
        if (file.size > 3 * 1024 * 1024) {
            alert('The image is too large. Maximum 3MB.');
            input.value = '';
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'method-img-wrapper';
            wrapper.innerHTML = `
                <img src="${e.target.result}" alt="Method">
                <button type="button" class="img-remove" onclick="removeAppearanceItemImg(this)" title="Remove image">×</button>
            `;
            preview.appendChild(wrapper);
        };
        reader.readAsDataURL(file);
        input.value = '';
    }
}

function removeAppearanceItemImg(btn) {
    const wrapper = btn.closest('.method-img-wrapper');
    if (wrapper) wrapper.remove();
}

/* ============================================================
   ARTWORK AND PACKING TEST
   ============================================================ */
function artworkBody() {
    return `
        <table class="dimensional-table artwork-table" data-dim-table>
            <thead>
                <tr>
                    <th style="width:10%">CONCEPT</th>
                    <th class="dim-spec-th" style="width:30%">${specThInnerHtml()}</th>
                    <th style="width:30%">TEST METHOD</th>
                    <th style="width:30%">RESULTS</th>
                    <th style="width:5%">TYPE</th>
                </tr>
            </thead>
            <tbody class="dim-tbody">
                <tr class="dim-functional-row artwork-row">
                    <td rowspan="1" class="dim-vertical-td" data-col="concept">
                        <div class="vertical-list">
                            <div class="vertical-item">
                                <textarea rows="1">CARTON BOX</textarea>
                                <button type="button" class="btn-icon" onclick="removeVerticalItem(this)">X</button>
                            </div>
                            <div class="vertical-item">
                                <textarea rows="1">LABEL</textarea>
                                <button type="button" class="btn-icon" onclick="removeVerticalItem(this)">X</button>
                            </div>
                            <div class="vertical-item">
                                <textarea rows="1">INNER BAG</textarea>
                                <button type="button" class="btn-icon" onclick="removeVerticalItem(this)">X</button>
                            </div>
                            <div class="vertical-item">
                                <textarea rows="1">USER MANUAL</textarea>
                                <button type="button" class="btn-icon" onclick="removeVerticalItem(this)">X</button>
                            </div>
                        </div>
                        <button type="button" class="btn-add-sm" onclick="addVerticalItem(this)">+ Add</button>
                    </td>
                    <td rowspan="1" class="dim-vertical-td" data-col="spec">
                        <div class="vertical-list method-list"></div>
                        <button type="button" class="btn-add-sm" onclick="triggerMethodImageUpload(this)">📷 Add image</button>
                        <input type="file" accept="image/*" class="method-file" style="display:none" onchange="handleMethodImageUpload(this)">
                    </td>
                    <td rowspan="1" class="dim-vertical-td appearance-method-td" data-col="method">
                        <div class="vertical-list appearance-method-list">
                            <div class="appearance-method-item">
                                <div class="appearance-method-text-row">
                                    <textarea rows="1">VISUAL INSPECTION; LEGIBILITY AND PRINT QUALITY</textarea>
                                    <button type="button" class="btn-icon" onclick="removeAppearanceMethodItem(this)">X</button>
                                </div>
                                <div class="appearance-method-img-area">
                                    <div class="appearance-img-preview"></div>
                                    <button type="button" class="btn-add-sm" onclick="triggerAppearanceItemImg(this)">📷 Add image</button>
                                    <input type="file" accept="image/*" class="appearance-item-file" style="display:none" onchange="handleAppearanceItemImg(this)">
                                </div>
                            </div>
                        </div>
                        <button type="button" class="btn-add-sm" onclick="addAppearanceMethodItem(this)">+ Add</button>
                    </td>
                    <td rowspan="1" class="dim-vertical-td" data-col="results">
                        <div class="vertical-list">
                            <div class="vertical-item">
                                <textarea rows="1">PRINT QUALITY LEGIBLE AND CLEAR</textarea>
                                <button type="button" class="btn-icon" onclick="removeVerticalItem(this)">X</button>
                            </div>
                            <div class="vertical-item">
                                <textarea rows="1">BARCODE READABLE</textarea>
                                <button type="button" class="btn-icon" onclick="removeVerticalItem(this)">X</button>
                            </div>
                            <div class="vertical-item">
                                <textarea rows="1">PACKAGING INTACT AND COMPLETE</textarea>
                                <button type="button" class="btn-icon" onclick="removeVerticalItem(this)">X</button>
                            </div>
                        </div>
                        <button type="button" class="btn-add-sm" onclick="addVerticalItem(this)">+ Add</button>
                        <div class="vertical-list method-list results-img-list"></div>
                        <button type="button" class="btn-add-sm" onclick="triggerMethodImageUpload(this)">📷 Add image</button>
                        <input type="file" accept="image/*" class="method-file" style="display:none" onchange="handleMethodImageUpload(this)">
                    </td>
                    <td rowspan="1" class="dim-vertical-td" data-col="type">
                        <div class="vertical-list">
                            <div class="vertical-item">
                                <textarea rows="1">1</textarea>
                                <button type="button" class="btn-icon" onclick="removeVerticalItem(this)">X</button>
                            </div>
                        </div>
                        <button type="button" class="btn-add-sm" onclick="addVerticalItem(this)">+ Add</button>
                    </td>
                </tr>
            </tbody>
        </table>
    `;
}

/* ============================================================
   REVIEWS REGISTRIES
   ============================================================ */
function reviewsRegistriesBody() {
    return `
        <table class="dimensional-table reviews-table" data-dim-table data-reviews-table>
            <thead>
                <tr>
                    <th style="width:13%">REVIEW LEVEL</th>
                    <th style="width:20%">DESCRIPTION</th>
                    <th style="width:11%">DATE</th>
                    <th style="width:19%">PREPARED BY: QUALITY ASSURANCE</th>
                    <th style="width:19%">REVIEWED &amp; APPROVED BY: GENERAL MANAGER</th>
                    <th style="width:18%">OBSERVATIONS</th>
                </tr>
            </thead>
            <tbody class="reviews-tbody">
                ${renderReviewsRow({
                    level: 'DESIGN REVIEW',
                    description: 'APPROVED BY ENGINEERING',
                    date: '',
                    preparedBy: '',
                    approvedBy: '',
                    observations: ''
                })}
                ${renderReviewsRow({
                    level: 'PROCESS REVIEW',
                    description: 'APPROVED BY PRODUCTION',
                    date: '',
                    preparedBy: '',
                    approvedBy: '',
                    observations: ''
                })}
                ${renderReviewsRow({
                    level: 'QUALITY REVIEW',
                    description: 'APPROVED BY QA',
                    date: '',
                    preparedBy: '',
                    approvedBy: '',
                    observations: ''
                })}
                ${renderReviewsRow({
                    level: 'FINAL INSPECTION',
                    description: 'ALL CHECKS PASSED',
                    date: '',
                    preparedBy: '',
                    approvedBy: '',
                    observations: ''
                })}
                <tr class="dim-add-row">
                    <td colspan="6">
                        <button type="button" class="btn-add-sm" onclick="addReviewsRow(this)">+ Add row</button>
                    </td>
                </tr>
            </tbody>
        </table>
    `;
}

function renderReviewsRow(data) {
    return `
        <tr class="reviews-row">
            <td class="reviews-level-td dim-concept-td">
                <textarea rows="1" class="dim-concept-input reviews-cell" placeholder="Review level...">${escapeHtml(data.level || '')}</textarea>
                <button type="button" class="btn-icon dim-row-remove" onclick="removeReviewsRow(this)" title="Delete row">X</button>
            </td>
            <td class="reviews-text-td">
                <textarea rows="1" class="dim-spec-input reviews-cell" placeholder="Description...">${escapeHtml(data.description || '')}</textarea>
            </td>
            <td class="reviews-date-td">
                <input type="date" class="reviews-date" value="${escapeHtml(data.date || '')}">
            </td>
            <td class="reviews-text-td">
                <textarea rows="1" class="dim-spec-input reviews-cell" placeholder="Prepared by...">${escapeHtml(data.preparedBy || '')}</textarea>
            </td>
            <td class="reviews-text-td">
                <textarea rows="1" class="dim-spec-input reviews-cell" placeholder="Reviewed &amp; approved by...">${escapeHtml(data.approvedBy || '')}</textarea>
            </td>
            <td class="reviews-text-td">
                <textarea rows="1" class="dim-spec-input reviews-cell" placeholder="Observations...">${escapeHtml(data.observations || '')}</textarea>
            </td>
        </tr>
    `;
}

function addReviewsRow(btn) {
    const tbody = btn.closest('.reviews-tbody');
    const addRow = btn.closest('tr');
    const tpl = document.createElement('template');
    tpl.innerHTML = renderReviewsRow({}).trim();
    const newRow = tpl.content.firstElementChild;
    tbody.insertBefore(newRow, addRow);
    autoResizeAll(newRow);
    const firstInput = newRow.querySelector('.dim-concept-input');
    if (firstInput) firstInput.focus();
}

function removeReviewsRow(btn) {
    const row = btn.closest('tr');
    if (row) row.remove();
}

/* ============================================================
   ANNEX
   ============================================================ */
function annexBody() {
    return `
        <div class="annex-body">
            <div class="annex-image-area">
                <div class="annex-img-preview"></div>
                <button type="button" class="btn-add-sm" onclick="triggerAnnexImageUpload(this)">📷 Add image</button>
                <input type="file" accept="image/*" class="annex-file" style="display:none"
                       onchange="handleAnnexImageUpload(this)">
            </div>
        </div>
    `;
}

function triggerAnnexImageUpload(btn) {
    const area = btn.closest('.annex-image-area');
    if (area) area.querySelector('.annex-file').click();
}

function handleAnnexImageUpload(input) {
    const area = input.closest('.annex-image-area');
    if (!area) return;
    const preview = area.querySelector('.annex-img-preview');
    if (!preview) return;

    if (input.files && input.files[0]) {
        const file = input.files[0];
        if (file.size > 5 * 1024 * 1024) {
            alert('The image is too large. Maximum 5MB.');
            input.value = '';
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            const item = document.createElement('div');
            item.className = 'vertical-item method-item annex-img-item';
            item.innerHTML = `
                <div class="method-img-wrapper">
                    <img src="${e.target.result}" alt="Annex">
                    <button type="button" class="img-remove" onclick="removeAnnexImage(this)" title="Remove image">×</button>
                </div>
            `;
            preview.appendChild(item);
        };
        reader.readAsDataURL(file);
        input.value = '';
    }
}

function removeAnnexImage(btn) {
    const item = btn.closest('.annex-img-item');
    if (item) item.remove();
}

/* ============================================================
   APPENDIX
   ============================================================ */
function appendixBody() {
    return `
        <div class="appendix-body">
            <div class="appendix-sections">
                ${appendixSectionHtml('PRODUCT', appendixDefaultItems())}
            </div>
            <button type="button"
                    class="btn-add-sm appendix-add-section-btn"
                    onclick="addAppendixSection(this)">+ Add section</button>

            <div class="appendix-legend-wrapper">
                ${appendixLegendHtml()}
            </div>
            <button type="button"
                    class="btn-add-sm appendix-add-legend-btn"
                    style="display:none;"
                    onclick="addAppendixLegend(this)">+ Add IMPORTANT</button>
        </div>
    `;
}

/* Bloque de sección: título editable + lista de puntos + botón + Add */
function appendixSectionHtml(title, items) {
    const list = (items || []).map(t => `
        <li>
            <textarea rows="1">${escapeHtml(t)}</textarea>
            <button type="button" class="btn-icon" onclick="removeAppendixItem(this)">X</button>
        </li>
    `).join('');

    return `
        <div class="appendix-section">
            <button type="button"
                    class="btn-icon appendix-section-remove"
                    onclick="removeAppendixSection(this)"
                    title="Remove this section">X</button>
            <textarea rows="1" class="appendix-heading" placeholder="Section title...">${escapeHtml(title || '')}</textarea>
            <ul class="appendix-list">${list}</ul>
            <button type="button" class="btn-add-sm" onclick="addAppendixItem(this)">+ Add</button>
        </div>
    `;
}

function addAppendixSection(btn) {
    const body = btn.closest('.appendix-body');
    if (!body) return;
    const container = body.querySelector('.appendix-sections');
    if (!container) return;

    const tmp = document.createElement('div');
    tmp.innerHTML = appendixSectionHtml('PRODUCT', appendixDefaultItems()).trim();
    const section = tmp.firstElementChild;
    container.appendChild(section);

    autoResizeAll(section);
    const heading = section.querySelector('.appendix-heading');
    if (heading) { heading.focus(); heading.select(); }
}

function removeAppendixSection(btn) {
    const section = btn.closest('.appendix-section');
    if (!section) return;
    const container = section.closest('.appendix-sections');
    section.remove();

    /* Si se borró la última, recrear una vacía para no dejar el APPENDIX sin secciones */
    if (container && !container.querySelector('.appendix-section')) {
        const tmp = document.createElement('div');
        tmp.innerHTML = appendixSectionHtml('PRODUCT', appendixDefaultItems()).trim();
        container.appendChild(tmp.firstElementChild);
        autoResizeAll(container);
    }
}

/* "+ Add" dentro de una sección: agrega un punto a SU lista */
function addAppendixItem(btn) {
    const section = btn.closest('.appendix-section');
    if (!section) return;
    const list = section.querySelector('.appendix-list');
    if (!list) return;

    const li = document.createElement('li');
    li.innerHTML = `
        <textarea rows="1" placeholder="New requirement..."></textarea>
        <button type="button" class="btn-icon" onclick="removeAppendixItem(this)">X</button>
    `;
    list.appendChild(li);
    autoResizeAll(li);
    li.querySelector('textarea').focus();
}

function removeAppendixItem(btn) {
    const li = btn.closest('li');
    if (li) li.remove();
}

function appendixLegendHtml() {
    return `
        <div class="appendix-legend">
            <button type="button"
                    class="appendix-legend-remove"
                    onclick="removeAppendixLegend(this)"
                    title="Remove IMPORTANT block">×</button>
            <textarea rows="1" class="appendix-legend-title"
                      placeholder="Legend title...">¡¡IMPORTANT!!</textarea>
            <textarea rows="1" class="appendix-legend-text"
                      placeholder="Legend text...">This Inspection Report not relieve the supplier from their Internal Quality System and which must be applied during the Production Process and which is quite independent of the sampling plans provided by the client.</textarea>
        </div>
    `;
}

function removeAppendixLegend(btn) {
    const legend = btn.closest('.appendix-legend');
    if (!legend) return;
    const body = legend.closest('.appendix-body');
    legend.remove();
    if (body) {
        const addBtn = body.querySelector('.appendix-add-legend-btn');
        if (addBtn) addBtn.style.display = '';
    }
}

function addAppendixLegend(btn) {
    const body = btn.closest('.appendix-body');
    if (!body) return;
    const wrapper = body.querySelector('.appendix-legend-wrapper');
    if (!wrapper) return;
    wrapper.innerHTML = appendixLegendHtml();
    btn.style.display = 'none';
    autoResizeAll(wrapper);
}

function appendixDefaultItems() {
    return [
        'Must be without any unsafe defect;',
        'Should be free of Functional and Aesthetic defects such as: damaged, burrs, broken, scratches, cracks, rust, deformations, leaks, fails in the chromium plating, or any other deformation which are readily visible and this could affect its performance and its appearance aesthetic.',
        'The items should comply with client’s requirement or approved sample only on the changes authorized by ALAN DE AGUASCALIENTES, S.A. DE C.V. (in appearance and functional);',
        'Marking(s) and label(s) on the item should be clear and should comply with legal requirements.'
    ];
}

/* ============================================================
   SPECIFICATIONS — COLUMNAS DINÁMICAS (aplica a todos los test)
   ============================================================ */
function specThInnerHtml() {
    return `
        <div class="dim-th-content">
            <span>SPECIFICATIONS</span>
            <button type="button" class="btn-col-add"
                    onclick="addSpecColumn(this)"
                    title="Add specification column">＋</button>
            <button type="button" class="btn-col-remove"
                    onclick="removeSpecColumn(this)"
                    title="Remove this column">−</button>
        </div>`;
}

function verticalSpecCellHtml() {
    return `
        <div class="vertical-list"></div>
        <button type="button" class="btn-add-sm" onclick="addVerticalItem(this)">+ Add</button>
        <div class="vertical-list method-list spec-img-list"></div>
        <button type="button" class="btn-add-sm" onclick="triggerMethodImageUpload(this)">📷 Add image</button>
        <input type="file" accept="image/*" class="method-file" style="display:none" onchange="handleMethodImageUpload(this)">
    `;
}

function refreshSpecRemoveButtons(table) {
    if (!table) return;
    const headRow = table.querySelector('thead tr');
    if (!headRow) return;
    const specThs = [...headRow.querySelectorAll('.dim-spec-th')];
    table.classList.toggle('has-multi-spec', specThs.length > 1);
    specThs.forEach((th, i) => {
        const btn = th.querySelector('.btn-col-remove');
        if (!btn) return;
        btn.style.visibility = (i === 0) ? 'hidden' : 'visible';
    });
}

function refreshSpecColumnWidths(table) {
    if (!table) return;
    const headRow = table.querySelector('thead tr');
    if (!headRow) return;
    const ths = [...headRow.children];

    ths.forEach(th => {
        if (!th.dataset.baseWidth) {
            const w = parseFloat(th.style.width);
            th.dataset.baseWidth = (!isNaN(w) && w > 0) ? w : 10;
        }
    });

    const specThs = ths.filter(th => th.classList.contains('dim-spec-th'));
    const k = specThs.length;
    if (k === 0) return;

    let W = parseFloat(specThs[0].dataset.baseWidth) || 12;
    if (k * W > 60) W = 60 / k;

    const nonSpecTotalBase = ths
        .filter(th => !th.classList.contains('dim-spec-th'))
        .reduce((s, th) => s + parseFloat(th.dataset.baseWidth), 0);

    const remaining = 100 - k * W;
    const scale = nonSpecTotalBase > 0 ? remaining / nonSpecTotalBase : 1;

    ths.forEach(th => {
        if (th.classList.contains('dim-spec-th')) {
            th.style.width = W.toFixed(2) + '%';
        } else {
            const base = parseFloat(th.dataset.baseWidth);
            th.style.width = (base * scale).toFixed(2) + '%';
        }
    });
}

function addSpecColumn(btn) {
    const table = btn.closest('.dimensional-table');
    if (!table) return;
    const headRow = table.querySelector('thead tr');
    const specThs = [...headRow.querySelectorAll('.dim-spec-th')];
    if (!specThs.length) return;

    const lastSpecTh = specThs[specThs.length - 1];

    const th = document.createElement('th');
    th.className = 'dim-spec-th';
    th.style.width = lastSpecTh.style.width || '';
    th.innerHTML = specThInnerHtml();
    lastSpecTh.insertAdjacentElement('afterend', th);

    table.querySelectorAll('tbody tr').forEach(tr => {

        if (tr.classList.contains('dim-section-row')) {
            const nameTds = tr.querySelectorAll('.dim-section-spec-td');
            if (nameTds.length) {
                const newTd = document.createElement('td');
                newTd.className = 'dim-section-spec-td';
                newTd.innerHTML = '<input type="text" class="dim-section-spec-name" value="" placeholder="Model">';
                nameTds[nameTds.length - 1].insertAdjacentElement('afterend', newTd);
                return;
            }
            const td = tr.querySelector('.dim-section-title');
            if (td) td.colSpan = (parseInt(td.colSpan, 10) || 1) + 1;
            return;
        }
        if (tr.classList.contains('dim-add-row')) {
            const td = tr.querySelector('td[colspan]');
            if (td) td.colSpan = (parseInt(td.colSpan, 10) || 1) + 1;
            return;
        }

        const vertSpecTds = tr.querySelectorAll('.dim-vertical-td[data-col="spec"]');
        if (vertSpecTds.length > 0) {
            const lastTd = vertSpecTds[vertSpecTds.length - 1];
            const newTd = document.createElement('td');
            newTd.className = 'dim-vertical-td';
            newTd.setAttribute('data-col', 'spec');
            newTd.innerHTML = verticalSpecCellHtml();
            lastTd.insertAdjacentElement('afterend', newTd);
            return;
        }

        if (tr.classList.contains('material-row')) {
            const cells = [...tr.querySelectorAll('.material-text-td')];
            const specCellsCount = specThs.length;
            if (cells.length >= specCellsCount && specCellsCount >= 1) {
                const lastSpecCell = cells[specCellsCount - 1];
                const newTd = document.createElement('td');
                newTd.className = 'material-text-td';
                newTd.innerHTML = `<textarea rows="1" class="dim-spec-input material-text" placeholder="Specification..."></textarea>`;
                lastSpecCell.insertAdjacentElement('afterend', newTd);
            }
            return;
        }

        const specTds = tr.querySelectorAll('.dim-spec-td');
        if (specTds.length > 0) {
            const lastTd = specTds[specTds.length - 1];
            const newTd = document.createElement('td');
            newTd.className = 'dim-spec-td';
            const sec = tr.dataset.section;
            if (sec === 'total-weight') {
                newTd.innerHTML = `<textarea rows="1" class="dim-spec-input dim-total-weight" readonly>0.00 (± 5%)</textarea>`;
            } else {
                newTd.innerHTML = `<textarea rows="1" class="dim-spec-input${sec === 'weights' ? ' dim-weight-value' : ''}" placeholder="Specification..."></textarea>`;
            }
            lastTd.insertAdjacentElement('afterend', newTd);
        }
    });

    refreshSpecRemoveButtons(table);
    refreshSpecColumnWidths(table);
    updateDimRowspans(table);
    recalcTotalWeight(table);
    autoResizeAll(table);
}

function removeSpecColumn(btn) {
    const table = btn.closest('.dimensional-table');
    if (!table) return;
    const headRow = table.querySelector('thead tr');
    const specThs = [...headRow.querySelectorAll('.dim-spec-th')];
    if (specThs.length <= 1) return;

    const th = btn.closest('th');
    const idx = specThs.indexOf(th);
    if (idx <= 0) return;

    th.remove();

    table.querySelectorAll('tbody tr').forEach(tr => {

        if (tr.classList.contains('dim-section-row')) {
            const nameTds = tr.querySelectorAll('.dim-section-spec-td');
            if (nameTds.length) {
                if (nameTds.length > 1 && nameTds[idx]) nameTds[idx].remove();
                return;
            }
            const td = tr.querySelector('.dim-section-title');
            if (td) td.colSpan = Math.max(1, (parseInt(td.colSpan, 10) || 1) - 1);
            return;
        }
        if (tr.classList.contains('dim-add-row')) {
            const td = tr.querySelector('td[colspan]');
            if (td) td.colSpan = Math.max(1, (parseInt(td.colSpan, 10) || 1) - 1);
            return;
        }

        const vertSpecTds = tr.querySelectorAll('.dim-vertical-td[data-col="spec"]');
        if (vertSpecTds.length > 1) {
            const target = vertSpecTds[idx];
            if (target) target.remove();
            return;
        }

        if (tr.classList.contains('material-row')) {
            const cells = tr.querySelectorAll('.material-text-td');
            if (cells.length > 1 && cells[idx]) cells[idx].remove();
            return;
        }

        const specTds = tr.querySelectorAll('.dim-spec-td');
        if (specTds.length > 1) {
            const target = specTds[idx];
            if (target) target.remove();
        }
    });

    refreshSpecRemoveButtons(table);
    refreshSpecColumnWidths(table);
    updateDimRowspans(table);
    recalcTotalWeight(table);
    autoResizeAll(table);
}

/* ============================================================
   DIMENSIONAL TABLE HELPERS
   ============================================================ */
function updateDimRowspans(table) {
    if (table.hasAttribute('data-material-table')) return;
    if (table.hasAttribute('data-reviews-table')) return;
    if (table.hasAttribute('data-functional-table')) return;

    const tbody = table.querySelector('.dim-tbody');
    if (!tbody) return;
    const totalRows = tbody.querySelectorAll('tr').length;
    tbody.querySelectorAll('.dim-vertical-td').forEach(cell => {
        cell.rowSpan = totalRows;
    });
}

function parseFirstNumber(str) {
    const m = String(str).replace(',', '.').match(/-?\d+(\.\d+)?/);
    return m ? parseFloat(m[0]) : 0;
}

function recalcTotalWeight(table) {
    if (!table) return;
    const totalRows  = table.querySelectorAll('tr[data-section="total-weight"]');
    if (!totalRows.length) return;
    const weightRows = table.querySelectorAll('tr[data-section="weights"]');

    totalRows.forEach(tr => {
        tr.querySelectorAll('.dim-spec-td').forEach((td, i) => {
            const totalEl = td.querySelector('.dim-total-weight');
            if (!totalEl) return;
            let total = 0;
            weightRows.forEach(wr => {
                const cell = wr.querySelectorAll('.dim-spec-td')[i];
                const inp  = cell && cell.querySelector('.dim-weight-value');
                if (inp) total += parseFirstNumber(inp.value);
            });
            totalEl.value = total.toFixed(2) + ' (± 5%)';
            autoResize(totalEl);
        });
    });
}

function addDimDataRow(btn, section) {
    const table  = btn.closest('.dimensional-table');
    const addRow = btn.closest('tr');
    const tbody  = table.querySelector('.dim-tbody');

    const newRow = document.createElement('tr');
    newRow.className = 'dim-data-row';
    newRow.setAttribute('data-section', section);
    newRow.setAttribute('data-block', section);

    const indexedInput = tbody.querySelector(`tr[data-section="${section}"] .dim-index`);
    let indexCell = '';
    if (indexedInput) {
        let maxCode = 64;
        tbody.querySelectorAll(`tr[data-section="${section}"] .dim-index`).forEach(inp => {
            const v = inp.value.trim().toUpperCase();
            if (v.length === 1 && v >= 'A' && v <= 'Z') {
                maxCode = Math.max(maxCode, v.charCodeAt(0));
            }
        });
        const letter = maxCode < 90 ? String.fromCharCode(maxCode + 1) : '';
        indexCell = `<input type="text" class="dim-index" value="${letter}" maxlength="3">`;
    } else {
        indexCell = `<span class="dim-index-spacer"></span>`;
    }

    const specCount = table.querySelectorAll('.dim-spec-th').length || 1;
    let specCells = '';
    for (let i = 0; i < specCount; i++) {
        const cls = (section === 'weights') ? ' dim-weight-value' : '';
        specCells += `<td class="dim-spec-td">
            <textarea rows="1" class="dim-spec-input${cls}" placeholder="Specification..."></textarea>
        </td>`;
    }

    newRow.innerHTML = `
        <td class="dim-concept-td">
            <div class="dim-row-content">
                ${indexCell}
                <textarea rows="1" class="dim-concept-input" placeholder="Concept..."></textarea>
            </div>
            <button type="button" class="btn-icon dim-row-remove" onclick="removeDimDataRow(this)" title="Delete row">X</button>
        </td>
        ${specCells}
    `;

    tbody.insertBefore(newRow, addRow);
    autoResizeAll(newRow);
    updateDimRowspans(table);
    if (section === 'weights') recalcTotalWeight(table);
    newRow.querySelector('.dim-concept-input').focus();
}

function removeDimDataRow(btn) {
    const row = btn.closest('tr');
    const table = row.closest('.dimensional-table');
    if (!table) { row.remove(); return; }
    row.remove();
    updateDimRowspans(table);
    recalcTotalWeight(table);
}

function addVerticalItem(btn) {
    const cell = btn.closest('td');
    const list = cell.querySelector('.vertical-list');
    const item = document.createElement('div');
    item.className = 'vertical-item';
    item.innerHTML = `
        <textarea rows="1"></textarea>
        <button type="button" class="btn-icon" onclick="removeVerticalItem(this)">X</button>
    `;
    list.appendChild(item);
    autoResizeAll(item);
    item.querySelector('textarea').focus();
}

function addMethodItem(btn) {
    const cell = btn.closest('td');
    const list = cell.querySelector('.vertical-list');
    const item = document.createElement('div');
    item.className = 'vertical-item method-item';
    item.innerHTML = `
        <span class="method-num"></span>
        <textarea rows="1"></textarea>
        <button type="button" class="btn-icon" onclick="removeVerticalItem(this)">X</button>
    `;
    list.appendChild(item);
    autoResizeAll(item);
    item.querySelector('textarea').focus();
}

function removeVerticalItem(btn) {
    btn.closest('.vertical-item').remove();
}

function triggerMethodImageUpload(btn) {
    const td = btn.closest('td');
    if (!td) return;
    const fileInput = td.querySelector('.method-file');
    if (fileInput) fileInput.click();
}

function handleMethodImageUpload(input) {
    const td = input.closest('td');
    const list = td ? td.querySelector('.method-list') : null;
    if (!list) return;

    if (input.files && input.files[0]) {
        const file = input.files[0];
        if (file.size > 3 * 1024 * 1024) {
            alert('The image is too large. Maximum 3MB.');
            input.value = '';
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            const item = document.createElement('div');
            item.className = 'vertical-item method-item';
            item.innerHTML = `
                <div class="method-img-wrapper">
                    <img src="${e.target.result}" alt="Specification">
                    <button type="button" class="img-remove" onclick="removeMethodImage(this)" title="Remove image">×</button>
                </div>
            `;
            list.appendChild(item);
        };
        reader.readAsDataURL(file);
        input.value = '';
    }
}

function removeMethodImage(btn) {
    btn.closest('.vertical-item').remove();
}

/* ============================================================
   RESIZE / PRINT HOOKS
   ============================================================ */
let _resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(_resizeTimer);
    _resizeTimer = setTimeout(() => autoResizeAll(document), 120);
});
window.addEventListener('beforeprint', () => autoResizeAll(document));
window.addEventListener('afterprint', () => autoResizeAll(document));

init();