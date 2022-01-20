const vert = `
  ${includes}

  uniform float time;
  uniform float seed;
  uniform float roundness;
  uniform float roughness;

  void main() {
    vec3 newPosition = position;

    float radius = 1.0;

    float noise1 = fbm(0.6 * position + time * 0.1 + seed);
    float noise2 = fbm(2.0 * position + time * 0.5 + seed);

    radius *= mix(1.0 - roundness, 1.0 + roundness, noise1);
    radius *= mix(1.0 - roughness, 1.0 + roughness, noise2);

    newPosition *= radius;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0 );
  }
`;
