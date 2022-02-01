const vert = `
  varying vec3 v_position;
  varying vec2 v_uv;
  
  uniform float time;

  ${includes}

  void main () {
    
    vec3 wind = vec3(
      mix(-1.0, 1.0, fbm(position * 0.1) + sin(time)),
      mix(-1.0, 1.0, fbm(position * 0.2) - sin(time)),
      mix(-1.0, 1.0, fbm(position * 0.3) - cos(time))
    );

    vec3 newPosition = position;
    
    newPosition.z += mix(-2.0, 2.0, fbm(wind)) * uv.x;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

    v_uv = uv;
    v_position = newPosition;
  }
`;
