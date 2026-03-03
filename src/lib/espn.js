// endpoints internos de HA expuestos por la REST API
const HA_BASE = 'http://homeassistant:8123'; // o relativo si embebes
const TOKEN = 'LONG_LIVED_ACCESS_TOKEN';

async function fetchHa(path) {
  const res = await fetch(`${HA_BASE}/api/${path}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  if (!res.ok) throw new Error('HA API error');
  return res.json();
}

export async function fetchCeltaFromHa() {
  const entity = await fetchHa('states/sensor.celta_de_vigo');
  return entity.attributes; // aquí tienes próximo partido, live, etc.
}

export async function fetchStandingsFromHa() {
  const entity = await fetchHa('states/sensor.laliga_standings');
  return entity.attributes.entries; // array de equipos
}
