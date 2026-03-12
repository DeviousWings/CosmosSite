// Fetches orbital + discovery data for Comet C/2026 A1 from JPL Small Body Database
export async function fetchCometData() {
  const res = await fetch(
    "https://ssd.jpl.nasa.gov/api/sbdb.api?sstr=C%2F2026%20A1&cov=0&phys-par=0&full-prec=0"
  );
  if (!res.ok) throw new Error(`JPL SBDB error: ${res.status}`);
  const data = await res.json();

  const orb = data.orbit?.elements ?? [];
  const getEl = (label) => orb.find((e) => e.label === label)?.value ?? null;

  const perihelionAU = getEl("q");
  const eccentricity = getEl("e");
  const inclination  = getEl("i");
  const orbitalPeriod = getEl("P");

  // Perihelion time — stored as JD in orbit.tp
  const tpJD = data.orbit?.tp ?? null;
  let perihelionDate = null;
  if (tpJD) {
    // Convert Julian Date to calendar date
    const jd = parseFloat(tpJD);
    const unixMs = (jd - 2440587.5) * 86400000;
    perihelionDate = new Date(unixMs).toISOString().split("T")[0];
  }

  return {
    fullName:      data.object?.fullname ?? "C/2026 A1 (ATLAS)",
    perihelionDate,
    perihelionAU:  perihelionAU  ? parseFloat(perihelionAU).toFixed(3)  : null,
    eccentricity:  eccentricity  ? parseFloat(eccentricity).toFixed(4)  : null,
    inclination:   inclination   ? parseFloat(inclination).toFixed(2)   : null,
    orbitalPeriod: orbitalPeriod ? Math.round(parseFloat(orbitalPeriod)).toLocaleString() : null,
    firstObs:      data.orbit?.first_obs ?? null,
    lastObs:       data.orbit?.last_obs  ?? null,
  };
}
