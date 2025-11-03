// precision mediump float;
// uniform vec3 uDepthColor;
// uniform vec3 uSurfaceColor;
// uniform float uColorOffset;
// uniform float uColorMultiplier;


// varying vec2 vUv;
// varying float vElevation;

// void main()
// {
//      float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
//     vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);
//      gl_FragColor = vec4(color, 1.0);
// } 

void main()
{
    // Final color
    gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}