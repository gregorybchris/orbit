const [WIDTH, HEIGHT] = [1000, 600];

const getUpdate = (onUpdate) => {
  let lastTime = 0;
  const update = (currentTime) => {
    currentTime = currentTime || 0;
    const deltaTime = currentTime - (lastTime || 0);
    lastTime = currentTime;
    onUpdate(currentTime, deltaTime);
    requestAnimationFrame(update);
  };
  return update;
};

const onPlanetMove = (planet) => {
  const planetCircle = d3.select(`#planet-${planet.id}`);
  planetCircle.attr("cx", planet.location.x);
  planetCircle.attr("cy", planet.location.y);
};

const initGraphics = (space, onUpdate) => {
  const canvas = d3
    .select("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", `0 0 ${WIDTH} ${HEIGHT}`);

  // Planets

  const planetsGroup = canvas.append("g").attr("id", "planets-group");
  const planetCircles = planetsGroup
    .selectAll("circle")
    .data(space.planets)
    .enter()
    .append("circle")
    .attr("cx", (planet) => planet.location.x)
    .attr("cy", (planet) => planet.location.y)
    .attr("r", 8)
    .attr("fill", (planet) => planet.color)
    .attr("id", (planet) => `planet-${planet.id}`)
    .on("click", (mouseEvent, planet) => {
      console.log("Clicked planet", planet.id);
    });
  planetCircles.append("title").text((planet) => `planet ${planet.id}`);

  space.planets.forEach((planet) => {
    planet.onMove(onPlanetMove);
  });

  // Sun

  const sunGroup = canvas.append("g").attr("id", "sun-group");
  const sunCircles = sunGroup
    .selectAll("circle")
    .data([space.sun])
    .enter()
    .append("circle")
    .attr("cx", (sun) => sun.location.x)
    .attr("cy", (sun) => sun.location.y)
    .attr("r", 20)
    .attr("fill", (sun) => sun.color)
    .attr("id", `sun-circle`)
    .on("click", (mouseEvent, sun) => {
      console.log("Clicked sun", sun.id);
    })
    .style("filter", "url(#sun-glow)");
  sunCircles.append("title").text((planet) => `planet ${planet.id}`);

  const defs = canvas.append("defs");
  appendSunGlow(defs, 10);

  getUpdate(onUpdate)();
};

const appendSunGlow = (defs, spread) => {
  const f = defs.append("svg:filter").attr("id", "sun-glow").attr("filterUnits", "userSpaceOnUse");
  f.append("svg:feGaussianBlur").attr("stdDeviation", spread);
  f.append("svg:feBlend").attr("in", "SourceGraphic");
};

export { initGraphics };
