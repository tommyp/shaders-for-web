const vert = `
  varying vec3 v_position;
  varying vec3 v_normal;
  varying vec2 v_uv;

  varying vec3 v_wind;

  uniform float time;
  uniform vec2 touchUv;
  uniform float touchStrength;

  ${includes}

  void main() {
    vec3 newPosition = position;
    vec3 wind = vec3(
      fbm(0.1 * position + 0.1 * time),
      fbm(0.2 * position + 0.2 * time),
      fbm(0.3 * position + 0.3 * time)
    );

    float wave = mix(-4.0, 4.0, fbm(0.1 * position + wind));

    // set 2 pegs
    vec2 peg1 = vec2(0.0, 1.0);
    vec2 peg2 = vec2(1.0, 1.0);

    float tension = distance(uv, peg1) * distance(uv, peg2); 
    float gravity = -0.2 * sin(uv.x * 3.14159);

    newPosition.y += gravity;
    newPosition.z += tension * wave;

    // how far away is the mouse
    float mouseDistance = distance(touchUv, uv);
    float mouseScore = smoothstep(0.5, 0.0, mouseDistance);

    // push backwards
    newPosition.z += mix(0.0, -6.0 * touchStrength, tension * mouseScore);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0 );

    v_position = newPosition;
    v_normal = normal;
    v_wind = wind;
    v_uv = uv;
  }
`;
