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

  struct Hue {
    float s;
    float e;
    float speed;
  };

  vec3 addLight(Light l) {
    // get the surface direction
    vec3 dx = dFdx(v_position);
    vec3 dy = dFdy(v_position);
    
    // get a new arrow pointing away from the surface
    vec3 newNormal = normalize(cross(dx, dy));

    vec3 N = mix(v_normal, newNormal, 0.1);

    //ambient color
    float ambientStrength = 0.7;
    vec3 ambientColor = ambientStrength * l.color;

    // diffuse color
    vec3 L = normalize(l.position - v_position);
    float diffuseScore = max(dot(L, N), 0.0);
    vec3 diffuseColor = diffuseScore * l.color;

    return ambientColor + diffuseColor;
  } 

  float createNoise(float level) {
    vec3 wind = vec3(
      fbm(v_position + time * 0.1),
      fbm(v_position - time * 0.2),
      fbm(v_position + time * 0.3)
    );
    return fbm(v_position + wind * level);
  }

  vec3 createColor(Hue h) {
    vec3 hsv1 = vec3(h.s + h.speed * time, 1.0, 1.0);
    vec3 hsv2 = vec3(h.e + h.speed * time, 1.0, 1.0);
    vec3 rgb1 = hsv2rgb(hsv1);
    vec3 rgb2 = hsv2rgb(hsv2);

    float n = createNoise(2.2);

    return mix(rgb1, rgb2, n);
  }

  void main() {
    Light l = Light(
      vec3(0.0, 0.0, 5.0),
      vec3(lightStrength)
    );

    Hue h1 = Hue(0.0, 0.3, 0.1);
    Hue h2 = Hue(0.3, 0.6, 0.02);
    Hue h3 = Hue(0.7, 0.9, 0.03);

    vec3 color1 = createColor(h1);
    vec3 color2 = createColor(h2);
    vec3 color3 = createColor(h3);

    float n = createNoise(1.1);

    vec3 objectColor = mix(color1, color2, n);
    objectColor = mix(objectColor, color3, n);

    vec3 rgb = addLight(l) * objectColor;
    gl_FragColor = vec4(rgb, 1.0);
  }
`;
