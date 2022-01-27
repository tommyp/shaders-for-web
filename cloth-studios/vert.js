const vert = `
  varying vec3 v_position;
  varying vec3 v_normal;
  varying vec2 v_uv;

  varying vec3 v_wind;

  uniform float time;

  ${includes}

  void main() {
    vec3 wind = vec3(
      fbm(0.1 * position + 0.1 * time),
      fbm(0.2 * position + 0.2 * time),
      fbm(0.3 * position + 0.3 * time)
    );

    float wave = mix(-4.0, 4.0, fbm(0.1 * position + wind));

    vec3 newPosition = position;
    newPosition.z += wave;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0 );

    v_position = newPosition;
    v_normal = normal;
    v_wind = wind;
    v_uv = uv;
  }
`;
