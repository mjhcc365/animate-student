precision mediump float;
varying vec2 vUv;

void main()
{
    vec2 uv = vUv;
    
    // 创建彩虹渐变
    float hue = uv.x;
    float saturation = 1.0;
    float value = 1.0;
    
    // 简化的HSV到RGB转换
    float h = hue * 6.0;
    float c = value * saturation;
    float x = c * (1.0 - abs(mod(h, 2.0) - 1.0));
    float m = value - c;
    
    vec3 color;
    if (h < 1.0) {
        color = vec3(c, x, 0.0);
    } else if (h < 2.0) {
        color = vec3(x, c, 0.0);
    } else if (h < 3.0) {
        color = vec3(0.0, c, x);
    } else if (h < 4.0) {
        color = vec3(0.0, x, c);
    } else if (h < 5.0) {
        color = vec3(x, 0.0, c);
    } else {
        color = vec3(c, 0.0, x);
    }
    
    color += m;
    
    gl_FragColor = vec4(color, 1.0);
} 