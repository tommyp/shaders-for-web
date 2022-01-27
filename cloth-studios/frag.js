const frag = `
  varying vec3 v_position;
  varying vec3 v_normal;
  varying vec2 v_uv;
  
  uniform sampler2D image;

  ${includes}

  void main() {
    gl_FragColor = texture2D(image, v_uv);
  }
`;
