precision mediump float;
varying vec2 vUv;

void main()
{
    vec2 uv = vUv;
    
    // 创建棋盘格效果
    vec2 grid = floor(uv * 10.0);
    float checker = mod(grid.x + grid.y, 2.0);
    
    // 创建波浪效果
    float wave = sin(uv.x * 10.0 + uv.y * 5.0) * 0.5 + 0.5;
    
    // 混合棋盘格和波浪
    float pattern = checker * wave;
    
    vec3 color = vec3(pattern, pattern * 0.5, pattern * 0.8);
    
    gl_FragColor = vec4(color, 1.0);
} 