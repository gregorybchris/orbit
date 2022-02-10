import Vector from "./vector.js";

// meanAnomaly - angle of body for a circular orbit
// eccentricAnomaly - angle of body for an elliptical orbit
// eccentricity - eccentricity of orbit
const kepler = (meanAnomaly, eccentricAnomaly, eccentricity) => {
  return meanAnomaly - eccentricAnomaly + eccentricity * Math.sin(eccentricAnomaly);
};

// func - function that should be optimized to have an output y = 0
// initial - initial input x to func
// stepSize -
// epsilon - the output value at which to stop optimizing
// iterations - maximum number of iterations to optimize
const newtonRhapson = (func, initial, stepSize = 0.0001, epsilon = 0.00000001, iterations = 100) => {
  let guess = initial;
  for (let i = 0; i < iterations; i++) {
    const y = func(guess);
    if (Math.abs(y) < epsilon) break;
    const slope = (func(guess + stepSize) - y) / stepSize;
    guess -= y / slope;
  }
  return guess;
};

const updateLocation = (location, focus, a, b, c, theta, t) => {
  const e = c / a; // Eccentricity

  const meanAnomaly = t * Math.PI * 2;
  const func = (x) => kepler(meanAnomaly, x, e);
  const eccentricAnomaly = newtonRhapson(func, meanAnomaly);

  const u = Math.cos(eccentricAnomaly + Math.PI) * a + c;
  const v = Math.sin(eccentricAnomaly + Math.PI) * b;

  location.x = focus.x + u * Math.cos(theta) - v * Math.sin(theta);
  location.y = focus.y + u * Math.sin(theta) + v * Math.cos(theta);

  return location;
};

// location - location vector to modify
// focus - focus around which the body orbits
// periapsis - smallest distance between body and focus
// apoapsis - largest distance between body and focus
// t - time parameterization
// const updateLocation = (location, focus, periapsis, apoapsis, t) => {
//   const a = (periapsis + apoapsis) / 2; // Semi-major axis length
//   const c = a - periapsis; // Linear eccentricity
//   const e = c / a; // Eccentricity
//   const b = Math.sqrt(Math.pow(a, 2) - Math.pow(c, 2)); // Semi-minor axis length
//   const centerX = focus.x - c;
//   const centerY = focus.y;

//   const meanAnomaly = t * Math.PI * 2;
//   const func = (x) => kepler(meanAnomaly, x, e);
//   const eccentricAnomaly = newtonRhapson(func, meanAnomaly);

//   location.x = Math.cos(eccentricAnomaly) * a + centerX;
//   location.y = Math.sin(eccentricAnomaly) * b + centerY;

//   return location;
// };

export { kepler, newtonRhapson, updateLocation };
