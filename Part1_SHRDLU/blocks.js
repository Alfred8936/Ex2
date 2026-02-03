// 积木世界的数据结构
class Block {
    constructor(id, color, shape, x, y, size) {
        this.id = id;
        this.color = color;
        this.shape = shape; // 'cube', 'sphere', 'pyramid'
        this.x = x;
        this.y = y;
        this.size = size;
        this.isHeld = false;
    }
}

class BlocksWorld {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.blocks = [];
        this.heldBlock = null;
        this.initializeBlocks();
    }

    initializeBlocks() {
        // 创建初始积木
        this.blocks.push(new Block(1, 'red', 'cube', 100, 300, 60));
        this.blocks.push(new Block(2, 'blue', 'sphere', 250, 310, 50));
        this.blocks.push(new Block(3, 'green', 'cube', 400, 300, 60));
        this.blocks.push(new Block(4, 'yellow', 'pyramid', 150, 220, 60));
        this.render();
    }

    render() {
        // 清空画布
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 绘制地面
        this.ctx.fillStyle = '#e0e0e0';
        this.ctx.fillRect(0, 360, this.canvas.width, 40);

        // 绘制每个积木
        this.blocks.forEach(block => {
            this.drawBlock(block);
        });

        // 如果有被抓住的积木，绘制在顶部
        if (this.heldBlock) {
            this.drawBlock(this.heldBlock, true);
        }
    }

    drawBlock(block, isHeld = false) {
        this.ctx.save();

        if (isHeld) {
            this.ctx.globalAlpha = 0.8;
            this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            this.ctx.shadowBlur = 15;
        }

        this.ctx.fillStyle = block.color;
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 2;

        switch (block.shape) {
            case 'cube':
                this.drawCube(block.x, block.y, block.size);
                break;
            case 'sphere':
                this.drawSphere(block.x, block.y, block.size);
                break;
            case 'pyramid':
                this.drawPyramid(block.x, block.y, block.size);
                break;
        }

        this.ctx.restore();

        // 绘制标签
        this.ctx.fillStyle = '#333';
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`${block.color} ${block.shape}`, block.x + block.size/2, block.y - 10);
    }

    drawCube(x, y, size) {
        // 绘制立方体（3D效果）
        this.ctx.fillRect(x, y, size, size);
        this.ctx.strokeRect(x, y, size, size);

        // 顶面
        this.ctx.fillStyle = this.lightenColor(this.ctx.fillStyle, 20);
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + size * 0.3, y - size * 0.3);
        this.ctx.lineTo(x + size + size * 0.3, y - size * 0.3);
        this.ctx.lineTo(x + size, y);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();

        // 右侧面
        this.ctx.fillStyle = this.darkenColor(this.ctx.fillStyle, 20);
        this.ctx.beginPath();
        this.ctx.moveTo(x + size, y);
        this.ctx.lineTo(x + size + size * 0.3, y - size * 0.3);
        this.ctx.lineTo(x + size + size * 0.3, y + size - size * 0.3);
        this.ctx.lineTo(x + size, y + size);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
    }

    drawSphere(x, y, size) {
        const centerX = x + size / 2;
        const centerY = y + size / 2;
        const radius = size / 2;

        const gradient = this.ctx.createRadialGradient(
            centerX - radius * 0.3, centerY - radius * 0.3, radius * 0.1,
            centerX, centerY, radius
        );
        gradient.addColorStop(0, this.lightenColor(this.ctx.fillStyle, 40));
        gradient.addColorStop(1, this.ctx.fillStyle);

        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
    }

    drawPyramid(x, y, size) {
        // 绘制金字塔
        this.ctx.beginPath();
        this.ctx.moveTo(x + size / 2, y);
        this.ctx.lineTo(x, y + size);
        this.ctx.lineTo(x + size, y + size);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();

        // 右侧面
        this.ctx.fillStyle = this.darkenColor(this.ctx.fillStyle, 20);
        this.ctx.beginPath();
        this.ctx.moveTo(x + size / 2, y);
        this.ctx.lineTo(x + size, y + size);
        this.ctx.lineTo(x + size + size * 0.3, y + size - size * 0.3);
        this.ctx.lineTo(x + size / 2 + size * 0.3, y - size * 0.3);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
    }

    lightenColor(color) {
        // 简单的颜色变亮函数
        const colors = {
            'red': '#ff6b6b',
            'blue': '#6ba3ff',
            'green': '#6bff6b',
            'yellow': '#ffff6b'
        };
        return colors[color] || color;
    }

    darkenColor(color) {
        // 简单的颜色变暗函数
        const colors = {
            'red': '#cc0000',
            'blue': '#0000cc',
            'green': '#00cc00',
            'yellow': '#cccc00'
        };
        return colors[color] || color;
    }

    findBlock(color, shape) {
        return this.blocks.find(b => 
            (!color || b.color === color) && 
            (!shape || b.shape === shape)
        );
    }

    pickUp(block) {
        if (block && !this.heldBlock) {
            this.heldBlock = block;
            const index = this.blocks.indexOf(block);
            if (index > -1) {
                this.blocks.splice(index, 1);
            }
            // 移动到画布中心上方
            this.heldBlock.x = this.canvas.width / 2 - this.heldBlock.size / 2;
            this.heldBlock.y = 50;
            this.render();
            return true;
        }
        return false;
    }

    putDown() {
        if (this.heldBlock) {
            // 将积木放回到随机位置
            this.heldBlock.x = Math.random() * (this.canvas.width - 100) + 50;
            this.heldBlock.y = 280;
            this.blocks.push(this.heldBlock);
            this.heldBlock = null;
            this.render();
            return true;
        }
        return false;
    }

    move(block) {
        if (block) {
            // 简单的移动效果
            block.x = Math.random() * (this.canvas.width - 100) + 50;
            this.render();
            return true;
        }
        return false;
    }
}
