# Draco 3D 数据压缩

Draco 是一个开源库，用于压缩和解压缩 3D 几何网格和点云数据。它旨在改进 3D 图形的存储和传输。

[官方网站](https://google.github.io/draco/) | [GitHub 仓库](https://github.com/google/draco)

## 内容

此文件夹包含三个实用工具：

* `draco_decoder.js` — 使用 Emscripten 编译的解码器，兼容任何现代浏览器。
* `draco_decoder.wasm` — WebAssembly 解码器，兼容更新的浏览器和设备。
* `draco_wasm_wrapper.js` — WASM 解码器的 JavaScript 包装器。

每个文件都提供两种变体：

* **默认版**：最新稳定版本，跟随项目的 [master 分支](https://github.com/google/draco)。
* **glTF 版**：由 [glTF 网格压缩扩展](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_draco_mesh_compression) 针对的版本，跟随 [对应的 Draco 分支](https://github.com/google/draco/tree/gltf_2.0_draco_extension)。

两种变体都可以与 `DRACOLoader` 一起使用：

```js
var dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('path/to/decoders/');
dracoLoader.setDecoderConfig({type: 'js'}); // (可选) 覆盖 WASM 支持的自动检测。
```

更多文档请查看 [GitHub](https://github.com/google/draco/tree/master/javascript/example#static-loading-javascript-decoder)。

## 许可证

[Apache License 2.0](https://github.com/google/draco/blob/master/LICENSE)
