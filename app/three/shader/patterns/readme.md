## glsl 函数总结

### `mod` 取余

```C
mod(vUv.y * 10.0, 1.0);
```

### `step` 两级分化的硬边界

```C
// uv 0,1, 乘以10，分10份，再取模，所以限制在[0,1]之间
float strength = mod(vUv.y * 10.0, 1.0);
// 小于0.5，返回0 ，大于0.5，返回1
strength = step(0.5, strength);
```

### `+=` 叉乘 取并集

### `*=` 叉乘 取交集

```C
float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
strength += step(0.8, mod(vUv.y * 10.0, 1.0));

float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
strength *= step(0.8, mod(vUv.y * 10.0, 1.0));
```

### `abs()` 取绝对值

```C
float strength = abs(vUv.x - 0.5);
```
