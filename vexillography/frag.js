const frag = `
  varying vec3 v_position;
  varying vec2 v_uv;

  uniform float time;
  uniform sampler2D flag;

  ${includes}
  
  void main() {
    vec4 color = texture(flag, v_uv);
    gl_FragColor = color;
  }
`;
