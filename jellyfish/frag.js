const frag = `
  ${includes}

  uniform float time;
  uniform sampler2D cat;

  varying vec3 v_position;
  varying vec3 v_normal;
  varying vec2 v_uv;

  vec3 addLight(vec3 lightColor, vec3 lightPosition) {
    // ambient color
    float ambientStrength = 0.5;
    vec3 ambientColor = ambientStrength * lightColor;

    // diffuse color - matte color
    vec3 lightDirection = normalize(lightPosition - v_position);
    float diffuseStrength = 1.0;
    float diffuseScore = max(dot(lightDirection, v_normal), 0.0);
    vec3 diffuseColor = diffuseStrength * diffuseScore * lightColor;

    // specular color - gloss
    vec3 cameraDirection = normalize(cameraPosition - v_position);
    vec3 reflectionDirection = normalize(lightDirection + cameraDirection);
    float specularStrength = 0.4;
    float shininess = 128.0;
    float specularScore = pow(max(dot(reflectionDirection, v_normal), 0.0), shininess);
    vec3 specularColor = specularStrength * specularScore * lightColor;

    return (ambientColor + diffuseColor + specularColor);
  }

  void main() {
    vec3 objectColor = vec3(0.5, 0.5, 0.5);

    vec3 light1 = addLight(
      vec3(1.0, 1.0, 1.0),
      vec3(60.0 * cos(time), 60.0 * sin(time), 60.0)
    );

    
  
    // final color
    vec4 color = vec4(light1 * objectColor, 1.0);

    gl_FragColor = color;
  }
`;
