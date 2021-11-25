import Vue from 'vue';

let oldMargin = '';

//  在一定范围内拖动 div
//  bar：点击bar元素时开始拖动target
function dragDiv(bar, target, forElementUI = false) {
    let barEle = typeof bar === 'string' ? document.querySelector(bar) : bar;
    let targetEle = typeof target === 'string' ? document.querySelector(target) : target;

    barEle = barEle ? barEle : targetEle;

    if (forElementUI && targetEle) {
        targetEle = targetEle.querySelector('.el-dialog');
    }

    if (!barEle || !targetEle) {
        return;
    }

    barEle.style.cursor = 'move';
    barEle.style.userSelect = 'none';

    oldMargin = window.getComputedStyle(targetEle).margin || '';

    let disX = 0;
    let disY = 0;

    barEle.onmousedown = event => {
        if (!targetEle) {
            return;
        }

        let viewPortWidth = document.body.clientWidth; // 浏览器窗口可视区域宽度
        let viewPortHeight = document.body.clientHeight; // 浏览器窗口可视区域高度

        let targetRect = targetEle.getBoundingClientRect();
        let targetWidth = targetRect.width;
        let targetHeight = targetRect.height;
        let targetLeft = targetRect.left + window.scrollX;
        let targetTop = targetRect.top + window.scrollY;

        // 获取鼠标到元素边界的距离，防止开始移动时出现跳动
        disX = event.clientX - targetLeft;
        disY = event.clientY - targetTop;

        document.onmousemove = e => {
            if (!targetEle) {
                return;
            }

            let x = e.clientX - disX;
            let y = e.clientY - disY;

            if (x < 0) {
                x = 0;
            }
            if (x > viewPortWidth - targetWidth) {
                x = viewPortWidth - targetWidth;
            }

            if (y < 0) {
                y = 0;
            }
            if (y > viewPortHeight - targetHeight) {
                y = viewPortHeight - targetHeight;
            }

            targetEle.style.margin = '0';
            targetEle.style.left = x + 'px';
            targetEle.style.top = y + 'px';
            for (const item of document.querySelectorAll('.video-popup')) {
                item.style.zIndex = '2000';
            }
            targetEle.style.zIndex = '2001';
        };

        document.onmouseup = e => {
            document.onmousemove = null;
            document.onmouseup = null;
            e.stopPropagation();
        };
    };
}

// robo-drag.js:40 1920 590 200 200 171 132.375

function resetDiv(target, forElementUI = false) {
    let targetEle = typeof target === 'string' ? document.querySelector(target) : target;

    if (forElementUI && targetEle) {
        targetEle = targetEle.querySelector('.el-dialog');
    }

    if (!targetEle) {
        return;
    }

    // targetEle.style.left = '0px';
    // targetEle.style.top = '0px';

    // target.removeAttribute('style');
    oldMargin;
    // if (oldMargin) {
    //     targetEle.style.margin = oldMargin;
    // }
}

Vue.directive('robo-drag', {
    inserted(el, binding) {
        dragDiv(binding.value, el, binding.modifiers.forEl);
    },
    componentUpdated(el, binding) {
        // if (binding.modifiers.forEl && el.style.display === '') {
        // setTimeout(() => {
        resetDiv(el, binding.modifiers.forEl);
        // }, 500);
        // }
    },
});
