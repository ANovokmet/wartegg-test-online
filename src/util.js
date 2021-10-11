const strokeStyle = "black";
const lineWidth = 2;

export function line(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.closePath();
}

export function curve(ctx, x0, y0, x1, y1, x2, y2, x3, y3) {
    ctx.moveTo(x0, y0);
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.fillStyle = strokeStyle;
    ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3);
    // ctx.fillRect(x0, y0, 4, 4);
    // ctx.fillRect(x1, y1, 4, 4);
    // ctx.fillRect(x2, y2, 4, 4);
    // ctx.fillRect(x3, y3, 4, 4);
}


export function throttle(func, wait, options) {
    let context, args, result;
    let timeout = null;
    let previous = 0;
    if (!options) options = {};
    const later = function () {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };
    return function () {
        var now = Date.now();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
};

export function subject() {
    const subscriptions = [];
    return [
        {
            subscribe(subscription) {
                subscription({});
                subscriptions.push(subscription);
                return () => { 
                    const index = subscriptions.indexOf(subscription);
                    subscriptions.splice(index, 1);
                }
            }
        },
        (value) => {
            for (const fn of subscriptions) {
                fn(value);
            }
        }
    ];
}