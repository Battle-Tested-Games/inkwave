// Registry of every stage's surface materials (src/world/stages/<id>/surfaces.js) for texlib.js + levelMaterial.js.
// PATTERN slots 0–27 are the shared kit (mapkit.js); each stage owns three slots from 28 up (STAGE_SLOTS below).
import { STAGES } from './index.js';

export const STAGE_SLOTS = { tidewater: [28, 29, 30], kelpline: [31, 32, 33], saltpan: [34, 35, 36], crossmarket: [37, 38, 39], lockgate: [40, 41, 42], terraces: [43, 44, 45] };
export const FIRST_STAGE_SLOT = 28, LAST_STAGE_SLOT = 45;
// flat list: { stage, slot, name (texlib layer name, '<stage>:<name>'), group (texlib uber-program), mat, onWall, onTop }
export const STAGE_SURFACES = [];
Object.keys(STAGE_SLOTS).forEach((stage, k) => {
  for (const s of (STAGES[stage] && STAGES[stage].SURFACES) || []) {
    if (!STAGE_SLOTS[stage].includes(s.slot)) { console.warn(`[inkwave] ${stage} surface '${s.name}' is not on one of its slots`, STAGE_SLOTS[stage]); continue; }
    STAGE_SURFACES.push({ stage, slot: s.slot, name: `${stage}:${s.name}`, group: 3 + k, mat: s.mat, onWall: s.onWall, onTop: s.onTop });
  }
});
