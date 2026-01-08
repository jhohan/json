const openBtn = document.getElementById('openBtn');
const pasteBtn = document.getElementById('pasteBtn');
const formatBtn = document.getElementById('formatBtn');
const editor = document.getElementById('editor');
const treeRoot = document.getElementById('tree');
const searchInput = document.getElementById('search');

openBtn.addEventListener('click', async () => {
  const content = await window.electronAPI.openFile();
  if (content !== null) {
    editor.value = content;
    renderFromEditor();
  }
});

pasteBtn.addEventListener('click', async () => {
  try {
    const text = await navigator.clipboard.readText();
    editor.value = text;
    renderFromEditor();
  } catch (e) {
    alert('클립보드에서 읽을 수 없습니다.');
  }
});

formatBtn.addEventListener('click', () => {
  try {
    const obj = JSON.parse(editor.value);
    editor.value = JSON.stringify(obj, null, 2);
    renderFromEditor();
  } catch (e) {
    alert('유효한 JSON이 아닙니다: ' + e.message);
  }
});

editor.addEventListener('input', () => {
  // don't parse on every keystroke aggressively; small debounce
  debounceRender();
});

searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  if (!q) {
    Array.from(treeRoot.querySelectorAll('.node')).forEach(n => n.style.display = 'block');
    return;
  }
  Array.from(treeRoot.querySelectorAll('.node')).forEach(n => {
    const text = n.textContent.toLowerCase();
    n.style.display = text.includes(q) ? 'block' : 'none';
  });
});

let renderTimer = null;
function debounceRender(){
  clearTimeout(renderTimer);
  renderTimer = setTimeout(renderFromEditor, 400);
}

function renderFromEditor(){
  const txt = editor.value.trim();
  if (!txt) { treeRoot.innerHTML = ''; return; }
  try {
    const data = JSON.parse(txt);
    treeRoot.innerHTML = '';
    treeRoot.appendChild(renderNode('root', data));
  } catch (e) {
    treeRoot.innerHTML = '<span style="color:#b00020">파싱 오류: ' + e.message + '</span>';
  }
}

function renderNode(key, value) {
  const container = document.createElement('div');
  container.className = 'node';

  const header = document.createElement('div');
  const collapser = document.createElement('span');
  collapser.className = 'collapser';

  const keySpan = document.createElement('span');
  keySpan.className = 'key';
  keySpan.textContent = key === 'root' ? '' : key + ': ';

  header.appendChild(collapser);
  header.appendChild(keySpan);

  if (value === null) {
    const v = document.createElement('span'); v.textContent = 'null'; header.appendChild(v);
  } else if (Array.isArray(value)) {
    collapser.textContent = '▾';
    header.appendChild(document.createTextNode('Array[' + value.length + ']'));
    container.appendChild(header);
    const children = document.createElement('div');
    children.style.marginLeft = '12px';
    value.forEach((item, idx) => children.appendChild(renderNode(idx, item)));
    container.appendChild(children);
    setupCollapser(collapser, children);
  } else if (typeof value === 'object') {
    collapser.textContent = '▾';
    header.appendChild(document.createTextNode('Object'));
    container.appendChild(header);
    const children = document.createElement('div');
    children.style.marginLeft = '12px';
    Object.keys(value).forEach(k => children.appendChild(renderNode(k, value[k])));
    container.appendChild(children);
    setupCollapser(collapser, children);
  } else {
    // primitive
    const v = document.createElement('span');
    v.className = 'value';
    v.textContent = JSON.stringify(value);
    header.appendChild(v);
    container.appendChild(header);
  }

  return container;
}

function setupCollapser(collapser, children){
  let open = true;
  collapser.addEventListener('click', () => {
    open = !open;
    children.style.display = open ? 'block' : 'none';
    collapser.textContent = open ? '▾' : '▸';
  });
}

// initial hint
treeRoot.innerHTML = '';
