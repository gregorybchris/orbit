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

// location - location vector to modify
// focus1 - primary focus around which the body orbits
// focus2 - secondary focus around which the body orbits
// t - time parameterization
const updateLocation = (location, focus1, focus2, t) => {
  const center = Vector.average(focus1, focus2); // Center of elliptical orbit
  const theta = Math.atan2(focus2.y - focus1.y, focus2.x - focus1.x); // angle from focus 1 to focus 2
  const a = (Vector.dist(location, focus1) + Vector.dist(location, focus2)) / 2; // Semi-major axis length
  const c = Vector.dist(focus1, center); // Linear eccentricity
  const b = Math.sqrt(Math.pow(a, 2) - Math.pow(c, 2)); // Semi-maminorjor axis length
  const e = c / a; // Eccentricity

  const meanAnomaly = t * Math.PI * 2; // Angle assuming a circular orbit
  const func = (x) => kepler(meanAnomaly, x, e);
  const eccentricAnomaly = newtonRhapson(func, meanAnomaly); // Angle of the elliptical orbit

  // Compute rectangular coordinates around the origin
  const u = Math.cos(eccentricAnomaly + Math.PI) * a + c;
  const v = Math.sin(eccentricAnomaly + Math.PI) * b;

  // Update location with a translation and rotation to the correct elliptical orientation
  location.x = focus1.x + u * Math.cos(theta) - v * Math.sin(theta);
  location.y = focus1.y + u * Math.sin(theta) + v * Math.cos(theta);

  return location;
};

export { kepler, newtonRhapson, updateLocation };
