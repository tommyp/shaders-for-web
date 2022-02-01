const frag = `
  varying vec3 v_position;
  varying vec3 v_wind;
  varying vec3 v_normal;
  varying vec2 v_uv;

  uniform sampler2D image;
  uniform float time;
  uniform vec2 mouse;
  uniform vec2 touchUv;

  ${includes}

  struct Light {
    vec3 position;
    vec3 color;
  };

  vec3 addLight(Light l) {
    // calculate the new normals
    vec3 dx = dFdx(v_position);
    vec3 dy = dFdy(v_position);
    vec3 newNormal = normalize(cross(dx, dy));

    // light direction
    vec3 L = normalize(l.position - v_position);
    
    // surface direction
    vec3 N = mix(v_normal, newNormal, 0.25);

    // ambient light
    float ambientScore = 0.1;
    vec3 ambientColor = ambientScore * l.color;

    // diffuse lighting
    float diffuseScore = max(0.0, dot(L, N));
    vec3 diffuseColor = diffuseScore * l.color;
    
    return ambientColor + diffuseColor;
  }

  void main() {
    vec4 objectColor = texture2D(image, v_uv);

    Light l = Light(
      vec3(0.0, 0.0, 10.0),
      vec3(1.0, 1.0, 1.0)
    );

    vec3 rgb = addLight(l) * objectColor.rgb;
    vec4 finalColor = vec4(rgb, 1.0);

    
    
    gl_FragColor = finalColor;
  }
`;
