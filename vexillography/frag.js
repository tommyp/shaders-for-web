const frag = `
  varying vec3 v_position;
  varying vec2 v_uv;

  ${includes}
  
  void main() {
    gl_FragColor = vec4(v_uv.x, 0.5, v_uv.y, 1.0);
  }
`;
