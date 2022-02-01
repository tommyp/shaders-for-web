const frag = `
  varying vec3 v_position;
  varying vec2 v_uv;

  uniform float time;

  ${includes}
  
  void main() {
    gl_FragColor = vec4(v_uv.x + sin(time), 0.5, v_uv.y + cos(time), 1.0);
  }
`;
