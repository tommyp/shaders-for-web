const frag = `
  ${includes}

  uniform float time;
  uniform sampler2D cat;

  varying vec3 v_position;
  varying vec3 v_normal;
  varying vec2 v_uv;

  void main() {
    vec3 objectColor = vec3(0.9, 0.4, 0.4);
    vec3 lightColor = vec3(1.0, 1.0, 1.0);
    vec3 lightPosition = vec3(50.0 * cos(time), 0.0, 30.0);

    // ambient color
    float ambientStrength = 0.5;
    vec3 ambientColor = ambientStrength * lightColor;

    // diffuse color - matte color
    vec3 lightDirection = normalize(lightPosition - v_position);
    float diffuseStrength = 1.0;
    float diffuseScore = max(dot(lightDirection, v_normal), 0.0);
    vec3 diffuseColor = diffuseStrength * diffuseScore * lightColor;


    // final color
    vec4 color = vec4((ambientColor + diffuseColor) * objectColor, 1.0);

    gl_FragColor = color;
  }
`;
