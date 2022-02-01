const vert = `
  varying vec3 v_position;
  varying vec2 v_uv;

  uniform float time;

  ${includes}

  void main () {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    v_uv = uv;
    v_position = position;
  }
`;
