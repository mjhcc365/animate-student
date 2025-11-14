
uniform float uTime;
varying vec2 vUv;
void main()
{
    // 计算模型位置
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    // 旗帜上下飘动效果优化
    // 降低频率使波浪更自然，适合旗帜效果
    float waveIntensity = 0.15; // 增加振幅使波动更明显
    float waveFrequency = 3.0;   // 降低频率使波浪更宽更自然
    float waveSpeed = 1.2;       // 略微增加速度
    
    // 主要上下波动效果 - 在z轴方向创建波浪
    // 使用x坐标和时间创建波浪，模拟旗帜被风吹动的效果
    modelPosition.z += sin(modelPosition.x * waveFrequency + uTime * waveSpeed) * waveIntensity;
    
    // 添加沿y轴的次要波动，使旗帜看起来更柔软
    // 频率减半，速度略慢，振幅更小
    modelPosition.z += cos(modelPosition.y * waveFrequency * 0.5 + uTime * waveSpeed * 0.7) * waveIntensity * 0.3;
    
    // 添加沿x轴的轻微扭曲，增强自然感
    modelPosition.x += sin(modelPosition.y * 2.0 + uTime * 0.8) * 0.02;
    
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    vUv = uv;
}