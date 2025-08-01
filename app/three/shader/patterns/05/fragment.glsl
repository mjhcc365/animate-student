precision mediump float;
varying vec2 vUv;

void main()
{

    float N = 8.0; // 8x8格子

    // 计算当前像素属于第几行第几列
    float x = floor(vUv.x * N);
    float y = floor(vUv.y * N);

    // 用格子的横纵坐标决定灰度值，左下最暗，右上最亮
    float strength = (x + y) / (2.0 * (N - 1.0));

    // 输出灰度色
    gl_FragColor = vec4(vec3(strength), 1.0);
} 