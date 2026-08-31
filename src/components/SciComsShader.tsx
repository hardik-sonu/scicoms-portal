'use client';

import React, { useEffect, useRef } from 'react';

export default function SciComsShader({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) return;

    let animationFrameId: number;
    const startTime = Date.now();

    function resize() {
      if (!canvas) return;
      const displayWidth = canvas.clientWidth || 1280;
      const displayHeight = canvas.clientHeight || 720;
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl?.viewport(0, 0, canvas.width, canvas.height);
      }
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;

      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }

      void main() {
        vec2 uv = v_texCoord;
        vec2 p = (uv - 0.5) * 2.0;
        p.x *= u_resolution.x / max(u_resolution.y, 1.0);

        vec3 color = mix(vec3(0.97, 0.98, 1.0), vec3(0.93, 0.96, 1.0), length(p) * 0.4);

        vec2 g = uv * 14.0;
        vec2 id = floor(g);
        vec2 f = fract(g) - 0.5;

        float nodes = 0.0;
        for(float y = -1.0; y <= 1.0; y++) {
          for(float x = -1.0; x <= 1.0; x++) {
            vec2 offset = vec2(x, y);
            float h = hash(id + offset);
            vec2 p_node = offset + vec2(sin(u_time * 0.4 + h * 6.28), cos(u_time * 0.3 + h * 6.28)) * 0.32;
            float d = length(f - p_node);
            float size = 0.012 + h * 0.016;
            nodes += smoothstep(size, size * 0.4, d) * (0.3 + 0.7 * sin(u_time * 0.8 + h * 10.0));
            if(h > 0.78) {
              float dist_to_center = length(f);
              nodes += smoothstep(0.42, 0.0, dist_to_center) * 0.04;
            }
          }
        }

        vec3 nodeColor = mix(vec3(0.0, 0.067, 0.23), vec3(0.98, 0.82, 0.0), step(0.92, hash(id)));
        color = mix(color, nodeColor, nodes * 0.16);

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    function createShader(type: number, src: string) {
      if (!gl) return null;
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      return shader;
    }

    const vs = createShader(gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');

    function render() {
      if (!gl || !canvas) return;
      resize();
      const elapsed = (Date.now() - startTime) * 0.001;
      gl.uniform1f(uTime, elapsed);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className={`relative overflow-hidden pointer-events-none ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
