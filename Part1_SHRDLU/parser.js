// 解析器类
class Parser {
    constructor() {
        this.colors = ['红色', '蓝色', '绿色', '黄色', 'red', 'blue', 'green', 'yellow'];
        this.shapes = ['方块', '球', '立方体', '金字塔', 'cube', 'sphere', 'pyramid'];
        this.actions = ['拿起', '移动', '放下', '抓取', 'pick', 'move', 'put'];
    }

    // UI界面1 - 对象解析器（修改前：只能识别对象，不能识别动作）
    parseObjectsOnly(command) {
        const result = {
            success: false,
            color: null,
            shape: null,
            action: null,
            message: ''
        };

        // 只解析对象（颜色和形状），忽略动作
        let foundColor = false;
        let foundShape = false;

        for (let color of this.colors) {
            if (command.includes(color)) {
                if (color === '红色' || color === 'red') result.color = 'red';
                else if (color === '蓝色' || color === 'blue') result.color = 'blue';
                else if (color === '绿色' || color === 'green') result.color = 'green';
                else if (color === '黄色' || color === 'yellow') result.color = 'yellow';
                foundColor = true;
                break;
            }
        }

        for (let shape of this.shapes) {
            if (command.includes(shape)) {
                if (shape === '方块' || shape === '立方体' || shape === 'cube') result.shape = 'cube';
                else if (shape === '球' || shape === 'sphere') result.shape = 'sphere';
                else if (shape === '金字塔' || shape === 'pyramid') result.shape = 'pyramid';
                foundShape = true;
                break;
            }
        }

        // UI1的问题：即使找到了对象，但因为没有识别动作，所以报错
        if (!foundColor && !foundShape) {
            result.message = 'Parser failed to identify objects.';
            result.success = false;
        } else {
            // 找到了对象，但没有动作识别，仍然失败
            result.message = 'Parser failed to identify objects.';
            result.success = false;
        }

        return result;
    }

    // UI界面2 - 命令解析器（修改前：只能识别动作，不能识别对象）
    parseCommandOnly(command) {
        const result = {
            success: false,
            color: null,
            shape: null,
            action: null,
            message: ''
        };

        // 只解析动作，忽略对象
        let foundAction = false;

        for (let action of this.actions) {
            if (command.includes(action)) {
                if (action === '拿起' || action === '抓取' || action === 'pick') {
                    result.action = 'pick';
                } else if (action === '移动' || action === 'move') {
                    result.action = 'move';
                } else if (action === '放下' || action === 'put') {
                    result.action = 'put';
                }
                foundAction = true;
                break;
            }
        }

        // UI2的问题：即使找到了动作，但因为没有识别对象，所以报错
        if (!foundAction) {
            result.message = "I don't understand that command.";
            result.success = false;
        } else {
            // 找到了动作，但没有对象识别，仍然失败
            result.message = "I don't understand that command.";
            result.success = false;
        }

        return result;
    }

    // 修复后的解析器（整合对象和命令解析）
    parseComplete(command) {
        const result = {
            success: false,
            color: null,
            shape: null,
            action: null,
            message: ''
        };

        // 解析颜色
        for (let color of this.colors) {
            if (command.includes(color)) {
                if (color === '红色' || color === 'red') result.color = 'red';
                else if (color === '蓝色' || color === 'blue') result.color = 'blue';
                else if (color === '绿色' || color === 'green') result.color = 'green';
                else if (color === '黄色' || color === 'yellow') result.color = 'yellow';
                break;
            }
        }

        // 解析形状
        for (let shape of this.shapes) {
            if (command.includes(shape)) {
                if (shape === '方块' || shape === '立方体' || shape === 'cube') result.shape = 'cube';
                else if (shape === '球' || shape === 'sphere') result.shape = 'sphere';
                else if (shape === '金字塔' || shape === 'pyramid') result.shape = 'pyramid';
                break;
            }
        }

        // 解析动作
        for (let action of this.actions) {
            if (command.includes(action)) {
                if (action === '拿起' || action === '抓取' || action === 'pick') {
                    result.action = 'pick';
                } else if (action === '移动' || action === 'move') {
                    result.action = 'move';
                } else if (action === '放下' || action === 'put') {
                    result.action = 'put';
                }
                break;
            }
        }

        // 修复后：需要同时识别动作和至少一个对象属性
        if (result.action && (result.color || result.shape)) {
            result.success = true;
            result.message = `成功解析：动作=${result.action}, 颜色=${result.color || '未指定'}, 形状=${result.shape || '未指定'}`;
        } else if (!result.action) {
            result.message = '无法识别命令中的动作。请使用：拿起、移动、放下等动词。';
        } else if (!result.color && !result.shape) {
            result.message = '无法识别命令中的对象。请指定颜色或形状。';
        } else {
            result.message = '命令不完整。请同时指定动作和对象。';
        }

        return result;
    }
}
