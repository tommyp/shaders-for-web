const frag = `
  ${includes}

  uniform float time;
  uniform float lightStrength;

  varying vec3 v_position;
  varying vec3 v_normal;
  varying vec2 v_uv;
  varying float v_radius;

  struct Light {
    vec3 position;
    vec3 color;
  };

  vec3 addLight(Light l) {
    // get the surface direction
    vec3 dx = dFdx(v_position);
    vec3 dy = dFdy(v_position);
    
    // get a new arrow pointing away from the surface
    vec3 newNormal = normalize(cross(dx, dy));

    //ambient color
    float ambientStrength = 0.7;
    vec3 ambientColor = ambientStrength * l.color;

    // diffuse color
    vec3 L = normalize(l.position - v_position);
    float diffuseScore = max(dot(L, newNormal), 0.0);
    vec3 diffuseColor = diffuseScore * l.color;

    return ambientColor + diffuseColor;
  } 

  void main() {
    Light l = Light(
      vec3(-10.0 * sin(time), 0.0, 5.0),
      vec3(lightStrength)
    );

    vec4 color1 = vec4(0.0, 1.0, 0.0, 1.0);
    vec4 color2 = vec4(0.0, 0.0, 1.0, 1.0);
    vec4 color = mix(color2, color1, step(1.0, v_radius));    
    vec3 objectColor = color.rgb;

    vec3 rgb = addLight(l) * objectColor;
    gl_FragColor = vec4(rgb, 1.0);
  }
`;
