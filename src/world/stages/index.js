// Stage modules (src/world/stages/<id>/): each stage owns its folder — layout.js (LAYOUT), props.js (register,
// PLACEMENTS), surfaces.js (SURF, SURFACES) and murals.js (drawMurals). Loaded here one file at a time, each behind its
// own try/catch, so a stage whose files are broken only loses that stage (logged) instead of the whole game.
export const STAGE_IDS = ['tidewater', 'kelpline', 'saltpan', 'crossmarket', 'lockgate', 'terraces'];
const FILES = ['layout', 'props', 'surfaces', 'murals'];

async function load(id, file) {
  try { return await import(`./${id}/${file}.js`); } catch (e) { console.error(`[inkwave] stage module ${id}/${file}.js failed to load`, e); return {}; }
}
const mods = await Promise.all(STAGE_IDS.flatMap((id) => FILES.map((f) => load(id, f))));
// STAGES[id] = { LAYOUT, register, PLACEMENTS, SURF, SURFACES, drawMurals } (missing pieces are simply absent)
export const STAGES = {};
STAGE_IDS.forEach((id, i) => { STAGES[id] = Object.assign({}, ...mods.slice(i * FILES.length, (i + 1) * FILES.length)); });
