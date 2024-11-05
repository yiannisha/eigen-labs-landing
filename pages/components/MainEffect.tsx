import Script from "next/script"

export default function MainEffect(props: React.HTMLProps<HTMLCanvasElement>) {
  return (
    <>
        <canvas className={props.className} id="canvas" width="800" height="800" style={{ marginLeft: '-5px'}}></canvas>
        <Script id="canvas-effect">
            {`
            let resizeReset = function() {
                w = canvasBody.width = window.outerWidth;
                h = canvasBody.height = window.innerHeight;
            }

            const canvasBody = document.getElementById("canvas"),
            drawArea = canvasBody.getContext("2d");

            // draw sine wave
            let w, h, tid, delay = 200;
            let no_of_lines = 3;
            let amplitudes = Array.from({length: no_of_lines}, () => 100 + Math.random() * 100);
            let frequency = 0.001;
            let phases = Array.from({length: no_of_lines}, () => Math.random() * 360);
            let speed = 0.02;

            function setup(){ 
                resizeReset();
                window.requestAnimationFrame(loop);
            }
            
            function loop(){
                window.requestAnimationFrame(loop);
                drawArea.clearRect(0,0,w,h);
                drawArea.beginPath();
                drawArea.moveTo(0, h/2);
                for (const [index, phase] of phases.entries()) {
                for (let i = 0; i < w; i++) {
                    y = h/2 + amplitudes[index] * Math.sin(frequency * i + phase);
                    drawArea.lineTo(i, y);
                }
                drawArea.strokeStyle = "rgb(210, 210, 210)";
                drawArea.lineWidth = 3;
                drawArea.stroke();
                drawArea.closePath();
                }
                
                phases = phases.map(phase => phase + speed);
            }

            setup();

            window.addEventListener("resize", resizeReset);
            `}
        </Script>
    </>
  )
}
