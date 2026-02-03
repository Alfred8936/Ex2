// 应用主逻辑
let world;
let parser;
let currentUI = 'ui1'; // ui1, ui2, or fixed

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    world = new BlocksWorld('blocksCanvas');
    parser = new Parser();

    // UI切换按钮
    document.getElementById('ui1-btn').addEventListener('click', () => switchUI('ui1'));
    document.getElementById('ui2-btn').addEventListener('click', () => switchUI('ui2'));
    document.getElementById('ui-fixed-btn').addEventListener('click', () => switchUI('fixed'));

    // 执行按钮
    document.getElementById('submitBtn').addEventListener('click', executeCommand);
    
    // 回车键执行
    document.getElementById('commandInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            executeCommand();
        }
    });

    // 示例命令点击
    document.querySelectorAll('.examples li').forEach(li => {
        li.addEventListener('click', () => {
            document.getElementById('commandInput').value = li.textContent;
        });
    });

    // 初始化UI1
    switchUI('ui1');
});

function switchUI(uiType) {
    currentUI = uiType;
    
    // 更新按钮状态
    document.querySelectorAll('.ui-btn').forEach(btn => btn.classList.remove('active'));
    
    if (uiType === 'ui1') {
        document.getElementById('ui1-btn').classList.add('active');
        document.getElementById('panel-title').textContent = 'UI界面1 - 对象解析器（修改前）';
        showInfo('当前使用UI界面1：只能识别对象（颜色、形状），但无法识别动作，导致"Parser failed to identify objects."错误。', 'info');
    } else if (uiType === 'ui2') {
        document.getElementById('ui2-btn').classList.add('active');
        document.getElementById('panel-title').textContent = 'UI界面2 - 命令解析器（修改前）';
        showInfo('当前使用UI界面2：只能识别动作，但无法识别对象，导致"I don\'t understand that command."错误。', 'info');
    } else {
        document.getElementById('ui-fixed-btn').classList.add('active');
        document.getElementById('panel-title').textContent = '修复后的UI - 完整解析器';
        showInfo('当前使用修复后的UI：整合了对象识别和命令识别，可以正确解析完整的指令。', 'info');
    }
    
    // 清空输入和日志
    document.getElementById('commandInput').value = '';
}

function executeCommand() {
    const command = document.getElementById('commandInput').value.trim();
    
    if (!command) {
        showInfo('请输入命令', 'error');
        return;
    }

    let parseResult;
    
    // 根据当前UI选择不同的解析器
    if (currentUI === 'ui1') {
        parseResult = parser.parseObjectsOnly(command);
    } else if (currentUI === 'ui2') {
        parseResult = parser.parseCommandOnly(command);
    } else {
        parseResult = parser.parseComplete(command);
    }

    // 显示解析结果
    if (parseResult.success) {
        // 执行命令
        const executed = executeAction(parseResult);
        if (executed) {
            showInfo(parseResult.message + '\n命令执行成功！', 'success');
            addLog(command, '成功');
        } else {
            showInfo(parseResult.message + '\n但未找到匹配的积木。', 'error');
            addLog(command, '失败 - 未找到对象');
        }
    } else {
        showInfo(parseResult.message, 'error');
        addLog(command, '解析失败');
    }
}

function executeAction(parseResult) {
    const { action, color, shape } = parseResult;
    
    switch (action) {
        case 'pick':
            const blockToPick = world.findBlock(color, shape);
            if (blockToPick) {
                return world.pickUp(blockToPick);
            }
            return false;
            
        case 'put':
            return world.putDown();
            
        case 'move':
            const blockToMove = world.findBlock(color, shape);
            if (blockToMove) {
                return world.move(blockToMove);
            }
            return false;
            
        default:
            return false;
    }
}

function showInfo(message, type) {
    const feedback = document.getElementById('feedback');
    feedback.textContent = message;
    feedback.className = 'feedback ' + type;
}

function addLog(command, result) {
    const logArea = document.getElementById('logArea');
    const timestamp = new Date().toLocaleTimeString('zh-CN');
    
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    logEntry.innerHTML = `
        <span class="log-timestamp">[${timestamp}]</span>
        <span class="log-command">${command}</span>
        <div class="log-result">→ ${result}</div>
    `;
    
    logArea.insertBefore(logEntry, logArea.firstChild);
    
    // 限制日志数量
    while (logArea.children.length > 10) {
        logArea.removeChild(logArea.lastChild);
    }
}
