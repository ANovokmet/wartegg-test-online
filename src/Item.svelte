<script>
	import { getContext, onMount, createEventDispatcher } from 'svelte';
    import { throttle } from './util';
	
    const strokeStyle = "black";
    const lineWidth = 2;

    let canvas;
    let mounted = false;

    export let dataInit = null;
    export let dataUrl = null;


    export let render = false;
    export let edit = false;

    onMount(() => {
        canvas.width = 200;
        canvas.height = 200;

        mounted = true;
    });

    let unsubscribeEventHandlers;
    $: {
        if(mounted) {
            initCanvas(canvas);
            if(render) {
                const ctx = canvas.getContext("2d");
                const img = new Image();
                img.onload = () => ctx.drawImage(img,0,0);
                img.src = dataUrl;
            }
        }
        if(mounted && render) {
            initCanvas(canvas);
        }
    }

    $: {
        if(mounted && edit) {
            onCanvasEditable(canvas);
        }
        
        if(mounted && !edit) {
            onCanvasUneditable();
        }
    }

    $: {
        if(mounted && render) {
            console.log(dataUrl);
            const ctx = canvas.getContext("2d");
            const img = new Image();
            img.onload = () => ctx.drawImage(img,0,0);
            img.src = dataUrl;
        }
    }

    function onCanvasUneditable() {
        if(unsubscribeEventHandlers) {
            unsubscribeEventHandlers();
        }
    }

    function initCanvas(canvas) {
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if(dataInit) {
            dataInit(ctx);
        }
    }


    const test = window['test'] = [];
    function save({prevX, prevY, currX, currY}) {
        prevX = Math.floor(prevX);
        prevY = Math.floor(prevY);
        currX = Math.floor(currX);
        currY = Math.floor(currY);

        if(!prevX && !prevY) {
            test.push([currX, currY]);
            return;
        }

        const last = test[test.length - 1];
        if(last) {
            const lastX = last[last.length - 2];
            const lastY = last[last.length - 1];
            if(lastX == prevX && lastY == prevY) {
                last.push(currX, currY);
                return;
            }
        }
        test.push([prevX, prevY, currX, currY]);
    }

    let startedDrawing = false;

    function onCanvasEditable(canvas) {
        let drawing = false,
            prevX = 0,
            currX = 0,
            prevY = 0,
            currY = 0,
            drawing_dot = false;

        const ctx = canvas.getContext("2d");
        const findxyThrottled = throttle(findxy, 25);

        function onMouseMove(e) {
            findxyThrottled('move', e);
        }

        function onMouseDown(e) {
            findxy('down', e);
        }

        function onMouseUp(e) {
            findxy('up', e);
        }

        onCanvasUneditable();

        document.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mousedown", onMouseDown);
        document.addEventListener("mouseup", onMouseUp);

        window['a'] = 0;

        function draw() {

            if(!startedDrawing) {
                dispatch('startDrawing');
                startedDrawing = true;
            }

            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(currX, currY);
            ctx.strokeStyle = strokeStyle;
            ctx.lineWidth = lineWidth;
            ctx.stroke();
            ctx.closePath();

            save({prevX, prevY, currX, currY});
        }

        function drawDot() {
            ctx.beginPath();
            ctx.fillStyle = strokeStyle;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();

            save({currX, currY});
        }

        function findxy(res, e) {
            prevX = currX;
            prevY = currY;
            const { x, y } = canvas.getBoundingClientRect();
            currX = e.clientX - x;
            currY = e.clientY - y;

            if (res == 'down') {
                drawing = true;
                drawing_dot = true;
                if (drawing_dot) {
                    drawDot();
                    drawing_dot = false;
                }
            }
            if (res == 'up' || res == "out") {
                drawing = false;
            }
            if (res == 'move') {
                if (drawing) {
                    draw();
                }
            }
        }

        unsubscribeEventHandlers = () => {
            document.removeEventListener("mousemove", onMouseMove);
            canvas.removeEventListener("mousedown", onMouseDown);
            document.removeEventListener("mouseup", onMouseUp);
        }
    }

	const { events } = getContext('events');
    $: {
        if($events.type == 'save') {
            dataUrl = canvas.toDataURL();
        }
    }

    const dispatch = createEventDispatcher();

</script>

<div class="element">
    <canvas bind:this="{canvas}"></canvas>
</div>

<style>
	canvas {
		background-color: white;
	}
</style>