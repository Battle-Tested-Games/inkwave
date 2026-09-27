// Registries for main-weapon and sub-weapon kinds that live in their own modules (src/game/kits/<kind>.js). Each kit
// module registers itself when imported (kits/index.js imports them all); the core systems look a kind up here after
// their built-in ones. Hooks are all optional unless marked.
//
// MAIN_KITS[kind] = {
//   update(runner, dt, inp, w)         REQUIRED — per-frame trigger handling (WeaponRunner.update's switch)
//   reset?(runner)                     runner state reset (spawn, death, loadout swap)
//   busy?(runner) / firingPose?(runner)  extend WeaponRunner.busy() / firingPose()
//   moveSpeed?(runner, w)              run speed override while using the weapon (0 / undefined = default)
//   spreadDeg?(runner, w)              current spread (feeds the reticle)
//   tick?(dt) / clear?()               module-owned world objects (projectiles, shields …): once per frame / on match reset
//   blockShot?(prev, pos, team, dmg) → bool   a shot segment prev→pos hits something this kit owns (e.g. a shield)
//   jump?(runner, intent) → bool       claim this frame's jump press (actor.js; e.g. the mitts' leap). runner.kit.hang
//                                      (set by the kit) holds the kid in place (wall cling)
//   bot?: { fight?(brain, ctx) → bool fire, paint?(brain, ctx) → bool fire, paintPitch?, melee?, charges?, long?, painter? }
//   shields?(out) → out                push a descriptor for every shield up this frame (bots.js flanks held ones and
//                                      steers round launched ones). Stable per shield; getters read live state:
//                                      { kind, held, team, owner, C (disc centre), N (facing / launched: travel dir), R,
//                                        hp, hpMax, live, blocksActors, left, and launched only: pos (foot), halfW (players
//                                        are held back over ±halfW along the wall), planeOff (the blocking plane sits
//                                        planeOff along N from pos), speed }
// }
// SUB_KITS[kind] = {
//   use(subs, actor, sub)              REQUIRED — the throw / placement on release (SubSystem.use)
//   hold?(runner, dt, inp, sub)        while the sub button is held (charge-up)
//   blocked?(actor, sub) → bool        refuse the throw ("Can't use" — e.g. one already out); emits 'sub:cantuse'
//   tick?(dt) / clear?()               module-owned objects
//   blockShot?(prev, pos, team, dmg) → bool   (shoot-able bombs)
//   blockRay?(from, dir, len, team, dmg) → dist   (charger beams vs shoot-able bombs)
//   damageArea?(c, radius, dmg, team)  a blast went off (G.subs.damageArea): kit objects of other teams caught in it
//   noArc?: true                       no bomb-arc preview while held (the kit draws its own aim guide)
//   bot?: { fight?(brain, dist) → bool throw now, paint?(brain) → bool }
//   threats?(out) → out                push a descriptor for every live object of this kind that hunts / hurts foes
//                                      (bots.js shoots them down or evades them). Stable per object; getters read live
//                                      state: { kind, obj, team, owner, pos (live: feet for walkers, centre for flyers),
//                                        aimY (hit centre above pos), vel, speed, radius (blast), trigger (contact reach),
//                                        ground (walks on the ground), live, state, hp, shootable, locked, target (the
//                                        actor it tracks, or null) } + kind extras (waddle: senseRadius, left;
//                                        torpedo: lockRange, hover)
// }
export const MAIN_KITS = {};
export const SUB_KITS = {};
