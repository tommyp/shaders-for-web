const vert = `
  varying vec3 v_position;
  varying vec3 v_normal;
  varying vec2 v_uv;

  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    v_position = position;
    v_normal = normal;
    v_uv = uv;
  }
`;
