precision mediump float;
varying vec2 vUv;

void main()
{
    vec2 uv = vUv;
    
    // 创建径向渐变
    float dist = length(uv - vec2(0.5));
    float circle = smoothstep(0.5, 0.0, dist);
    
    // 创建条纹效果
    float stripes = sin(uv.x * 20.0) * 0.5 + 0.5;
    
    // 混合效果
    vec3 color = vec3(circle * stripes, circle * (1.0 - stripes), circle);
    
    gl_FragColor = vec4(color, 1.0);
} 