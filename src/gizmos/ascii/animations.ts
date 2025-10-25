import { xyHash, charsPerLine, linesPerColumn } from "./utils";
import { GLOBAL_PAUSE_ASCII_ANIMATIONS } from "../../components/Layout/Layout";

function _opacityAdjust(char: string, x: number, y: number, opacity: number) {
    if (opacity >= 1) return char;
    if (opacity <= 0) return " ";
    const threshold = opacity;
    const h = xyHash(x, y);
    return h < threshold ? char : " ";
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

interface AsciiAnimation {
    (
        x: number,
        y: number,
        time: number,
        opacity: number,
        ctx: AsciiAnimationManagerContext,
        fadingOut: boolean
    ): string;
}

interface AsciiAnimationData {
    opacity: number;
    elapsed: number;
    asciiAnimation: AsciiAnimation;
}

interface AsciiAnimationManagerContext {
    rows: number;
    cols: number;
}

class AsciiAnimationManager {
    private static FREQUENCY = 62;
    private static OPACITY_DECREASE_RATE = 0.005;
    private static ANIMATION_DURATION = 500;
    private static FADE_IN_BEGIN = 0.5;

    private _asciiGizmoDOM: HTMLElement;
    private _animations: AsciiAnimationData[];
    private _time = Math.random() * 240;
    private _mainInterval: NodeJS.Timeout | null = null;
    private _view_data: string[][] = [];
    private _currentAnimationIndex = 0;
    private _nextAnimationIndex = 0;
    private _rows = 0;
    private _cols = 0;

    constructor(asciiGizmoDOM: HTMLElement, asciiAnimations: AsciiAnimation[]) {
        this._asciiGizmoDOM = asciiGizmoDOM;
        this._animations = asciiAnimations.map((animation) => ({
            opacity: 0,
            elapsed: 0,
            asciiAnimation: animation
        }));
        this._animations[0].opacity = 1;
        this._nextAnimationIndex =
            (this._currentAnimationIndex + Math.floor(Math.random() * (this._animations.length - 1) + 1)) %
            this._animations.length;

        this.updateRowCols();
    }

    start() {
        if (this._mainInterval) clearInterval(this._mainInterval);
        this._mainInterval = setInterval(() => {
            if (GLOBAL_PAUSE_ASCII_ANIMATIONS.value) return;

            const currentAnimation = this._animations[this._currentAnimationIndex];
            const nextAnimation = this._animations[this._nextAnimationIndex];

            for (let y = 0; y < this._view_data.length; y++) {
                for (let x = 0; x < this._view_data[y].length; x++) {
                    if (this._animations.length === 0) continue;
                    if (this._animations.length === 1) {
                        this._view_data[y][x] = this._animations[0].asciiAnimation(
                            x,
                            y,
                            this._time,
                            1,
                            this.getContext(),
                            false
                        );
                        continue;
                    }

                    let charToRender = _opacityAdjust(
                        currentAnimation.asciiAnimation(
                            x,
                            y,
                            this._time,
                            currentAnimation.opacity,
                            this.getContext(),
                            currentAnimation.elapsed >= AsciiAnimationManager.ANIMATION_DURATION ? true : false
                        ),
                        x,
                        y,
                        currentAnimation.opacity
                    );

                    if (currentAnimation.opacity < AsciiAnimationManager.FADE_IN_BEGIN) {
                        // fade in next animation
                        const nextAnimationChar = _opacityAdjust(
                            nextAnimation.asciiAnimation(
                                x,
                                y,
                                this._time,
                                nextAnimation.opacity,
                                this.getContext(),
                                false
                            ),
                            x + 100, // offset x and y to change hashes
                            y + 100,
                            nextAnimation.opacity
                        );
                        if (charToRender === " ") charToRender = nextAnimationChar;
                    }

                    this._view_data[y][x] = charToRender;
                }
            }

            currentAnimation.elapsed += 1;

            if (currentAnimation.opacity < AsciiAnimationManager.FADE_IN_BEGIN && this._animations.length > 1) {
                nextAnimation.opacity +=
                    1.0 / Math.ceil(AsciiAnimationManager.FADE_IN_BEGIN / AsciiAnimationManager.OPACITY_DECREASE_RATE);
            }

            if (currentAnimation.elapsed >= AsciiAnimationManager.ANIMATION_DURATION) {
                currentAnimation.opacity -= AsciiAnimationManager.OPACITY_DECREASE_RATE;
            }

            if (currentAnimation.opacity <= 0) {
                currentAnimation.opacity = 0;
                currentAnimation.elapsed = 0;
                // this._currentAnimationIndex = (this._currentAnimationIndex + 1) % this._animations.length;
                this._currentAnimationIndex = this._nextAnimationIndex;
                this._nextAnimationIndex =
                    (this._nextAnimationIndex + Math.floor(Math.random() * (this._animations.length - 1) + 1)) %
                    this._animations.length;
                this._animations[this._currentAnimationIndex].opacity = 1;
            }

            this._time += 0.103;
            this._asciiGizmoDOM.textContent = this._view_data.map((row) => row.join("")).join("\n");
        }, 1000 / AsciiAnimationManager.FREQUENCY);
    }

    stop() {
        if (this._mainInterval) {
            clearInterval(this._mainInterval);
            this._mainInterval = null;
        }
    }

    updateRowCols() {
        this._rows = linesPerColumn(this._asciiGizmoDOM);
        this._cols = charsPerLine(this._asciiGizmoDOM);

        this._view_data = [];
        for (let i = 0; i < this._rows; i++) {
            this._view_data.push(new Array(this._cols).fill(" "));
        }
    }

    getContext(): AsciiAnimationManagerContext {
        return {
            rows: this._rows,
            cols: this._cols
        };
    }

    // queue(animation: AsciiAnimation) {
    // this._animations.push({ opacity: 1, asciiAnimation: animation });
    // }
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
// Animations

function NumberAsciiAnimation(x: number, y: number, time: number, opacity: number) {
    const ASCII_STRING = "0123456789";
    if ((x + y) % 2 === 0) return " ";
    return ASCII_STRING[Math.floor((time / 10) % ASCII_STRING.length)];
}

function SinAsciiAnimation(x: number, y: number, time: number, opacity: number) {
    const ASCII_STRING = "0101010010101       ";
    const o = Math.sin(y * Math.sin(time / 80) * 0.2 + x * 0.04 + time / 80) * 20;
    const i = Math.round(Math.abs(x + y + o)) % ASCII_STRING.length;
    return ASCII_STRING[i];
}

//
//
//

interface Boid {
    x: number;
    y: number;
    vx: number;
    vy: number;
}

const BOIDS: Boid[] = [];
const SPEED_DAMPENER = 10000;

// Initialize boids

function BoidsAsciiAnimation(x: number, y: number, time: number, opacity: number, ctx: AsciiAnimationManagerContext) {
    const ASCII_STRING = "oO0@*";
    let boidIndex = -1;

    if (BOIDS.length === 0 && ctx) {
        const numBoids = Math.floor((ctx.rows * ctx.cols) / 100);
        for (let i = 0; i < numBoids; i++) {
            BOIDS.push({
                x: Math.random() * ctx.cols,
                y: Math.random() * ctx.rows,
                vx: (Math.random() - 0.08) * 0.08,
                vy: (Math.random() - 0.08) * 0.08
            });
        }
    }

    for (let i = 0; i < BOIDS.length; i++) {
        const boid = BOIDS[i];
        const nearbyBoids = BOIDS.filter((otherBoid) => {
            const dx = otherBoid.x - boid.x;
            const dy = otherBoid.y - boid.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance > 5) return false;
            const angle = Math.atan2(dy, dx);
            if (angle < -Math.PI / 6 || angle > Math.PI / 6) return false;
            return true;
        });

        // compute center of nearby boids
        let centerX = 0;
        let centerY = 0;
        for (const otherBoid of nearbyBoids) {
            centerX += otherBoid.x;
            centerY += otherBoid.y;
        }
        centerX /= nearbyBoids.length || 1;
        centerY /= nearbyBoids.length || 1;

        // Adjust velocity towards center
        boid.vx += (centerX - boid.x) * 0.0000001;
        boid.vy += (centerY - boid.y) * 0.0000001;

        // Update boid position
        boid.x += boid.vx / SPEED_DAMPENER;
        boid.y += boid.vy / SPEED_DAMPENER;

        // Wrap around edges
        if (boid.x < 0) boid.x += ctx.cols;
        if (boid.x >= ctx.cols) boid.x -= ctx.cols;
        if (boid.y < 0) boid.y += ctx.rows;
        if (boid.y >= ctx.rows) boid.y -= ctx.rows;

        // Check if boid is at (x, y)
        if (Math.floor(boid.x) === x && Math.floor(boid.y) === y) {
            boidIndex = i;
        }
    }

    if (boidIndex !== -1) {
        // return ASCII_STRING[boidIndex % ASCII_STRING.length];
        // Vary character based on speed
        const boid = BOIDS[boidIndex];
        const speed = Math.sqrt(boid.vx * boid.vx + boid.vy * boid.vy) / SPEED_DAMPENER;
        const charIndex = Math.min(Math.floor(speed * 10), ASCII_STRING.length - 1);
        return ASCII_STRING[charIndex];
    }

    return " ";
}

//
//
//

interface CelestialBody {
    x: number;
    y: number;
    vx: number;
    vy: number;
    mass: number;
}

const BODIES: CelestialBody[] = [];
const BODY_AT_XY = new Map<string, CelestialBody>();

function GravityAsciiAnimation(x: number, y: number, time: number, opacity: number, ctx: AsciiAnimationManagerContext) {
    // this will run rows*col times, so normalize
    // let closestCenterY = ctx.rows / 2;

    const ASCII_STRING = ".oOX";
    // const ASCII_PATTERN_STRING = "     ";
    const G = 2e-9;
    if (BODIES.length === 0 && ctx) {
        const numBodies = Math.floor((ctx.rows * ctx.cols) / 50);
        for (let i = 0; i < numBodies; i++) {
            BODIES.push({
                x: Math.random() * ctx.cols,
                y: Math.random() * ctx.rows,
                vx: Math.random() * 0.004 - 0.002,
                vy: Math.random() * 0.004 - 0.002,
                mass: Math.random() * 34 + 1
            });
        }

        // pick a single body that is nearest to the center and make it have a large mass
        const centerY = ctx.rows / 2;
        const centerX = ctx.cols / 2;
        let nearestIndex = -1;
        let nearestDistSq = Infinity;
        for (let i = 0; i < BODIES.length; i++) {
            const body = BODIES[i];
            const dx = body.x - centerX;
            const dy = body.y - centerY;
            const distSq = dx * dx + dy * dy;
            if (distSq < nearestDistSq) {
                nearestDistSq = distSq;
                nearestIndex = i;
            }
        }
        if (nearestIndex !== -1) {
            BODIES[nearestIndex].mass = 100000;
            BODIES[nearestIndex].vx = 0;
            BODIES[nearestIndex].vy = 0;
        }

        BODIES[(nearestIndex + 1) % BODIES.length].mass = 66 + Math.random() * 20;

        // sort ascending by mass, so larger bodies are rendered on top
        BODIES.sort((a, b) => a.mass - b.mass);
    }

    // only update 9 times per iteration
    if (x <= 2 && y <= 2) {
        BODY_AT_XY.clear();
        for (let i = 0; i < BODIES.length; i++) {
            const body = BODIES[i];
            let ax = 0;
            let ay = 0;
            for (let j = 0; j < BODIES.length; j++) {
                if (i === j) continue;
                const otherBody = BODIES[j];
                const dx = otherBody.x - body.x;
                const dy = otherBody.y - body.y;
                const distanceSq = dx * dx + dy * dy + 0.01;
                const force = (G * body.mass * otherBody.mass) / distanceSq;
                const distance = Math.sqrt(distanceSq);
                ax += (force / body.mass) * (dx / distance);
                ay += (force / body.mass) * (dy / distance);
            }
            body.vx += ax;
            body.vy += ay;
            body.x += body.vx;
            body.y += body.vy;

            if (body.x < 0) body.x += ctx.cols;
            if (body.x >= ctx.cols) body.x -= ctx.cols;
            if (body.y < 0) body.y += ctx.rows;
            if (body.y >= ctx.rows) body.y -= ctx.rows;

            BODY_AT_XY.set(`${Math.floor(body.x)},${Math.floor(body.y)}`, body);
        }
    }

    if (BODY_AT_XY.has(`${x},${y}`)) {
        // Vary character based on mass
        const body = BODY_AT_XY.get(`${x},${y}`)!;
        const massIndex = Math.min(Math.floor(body.mass / 33), ASCII_STRING.length - 1);
        return ASCII_STRING[massIndex];
    }

    // if planet not at (x, y), have a moving background of clustered patterns
    // if (bodyIndex === -1) {
    //     const patternIndex = Math.min(
    //         Math.floor(Math.abs((closestCenterY - y + Math.cos((time + x) / 4) * 1) / (ctx.rows / 14))),
    //         ASCII_PATTERN_STRING.length - 1
    //     );
    //     return ASCII_PATTERN_STRING[patternIndex];
    // }

    const t = time * 0.04;
    const nx = x / Math.max(1, ctx.cols);
    const ny = y / Math.max(1, ctx.rows);
    const centerX = BODIES[BODIES.length - 1].x;
    const centerY = BODIES[BODIES.length - 1].y;

    const layerA = Math.sin((nx + t * 0.5) * 6.0) * Math.cos((ny - t * 0.3) * 4.0);
    const layerB = Math.sin((nx * 2.0 - t * 0.2) * 8.0) * 0.6 + Math.cos((ny * 1.5 + t * 0.4) * 5.0) * 0.4;

    const hash = xyHash(Math.floor(x + t * 3), Math.floor(y - t * 2)) - 0.5;

    const density =
        layerA * 0.6 +
        layerB * 0.3 +
        hash * 1.2 -
        1.2 / (Math.abs(x - centerX) / (ctx.cols / 20)) -
        1.2 / Math.abs(y - centerY) / (ctx.rows / 20);

    if (density > 0.48) return "#";
    if (density > 0.12) return "+";
    return " ";
}

//
//
//

function TextScrollAsciiAnimation(
    x: number,
    y: number,
    time: number,
    opacity: number,
    ctx: AsciiAnimationManagerContext
) {
    const ASCII_STRING = "00011110111111110111111011";
    return y % 2
        ? ASCII_STRING[(y + x + Math.floor(time)) % ASCII_STRING.length]
        : ASCII_STRING[(y + ctx.cols - x + Math.floor(time)) % ASCII_STRING.length];
}

//
//
//

interface Sand {
    x: number;
    y: number;
    char: string;
    timeSpawned: number;
}

const SANDS: Sand[] = [];
const SAND_AT_XY = new Map<string, string>();

function SandAsciiAnimation(
    x: number,
    y: number,
    time: number,
    opacity: number,
    ctx: AsciiAnimationManagerContext,
    fadingOut: boolean
) {
    const ASCII_STRING = "42";

    if (x === 0 && y === 0 && Math.floor(time) % 2 === 0 && ctx && !fadingOut) {
        SANDS.push({
            x: Math.random() * ctx.cols,
            y: Math.random() * 10 - 20,
            char: ASCII_STRING[Math.floor(Math.random() * ASCII_STRING.length)],
            timeSpawned: time
        });
    }

    // // update only once per iteration
    if (x === 0 && y === 0) {
        SAND_AT_XY.clear();
        for (let i = 0; i < SANDS.length; i++) {
            const sand = SANDS[i];

            // delete if time - timeSpawned > 50:
            if (time - sand.timeSpawned > 400) {
                SANDS.splice(i, 1);
                i--;
                continue;
            }

            // Update sand position
            sand.y += 0.8;
            // stop at bottom
            if (sand.y >= ctx.rows) sand.y = ctx.rows - 1;

            // Case 1: if space below is occupied, and bottom-left is free, move bottom-left
            // Case 2: if space below is occupied, and bottom-right is free, move bottom-right
            if (SAND_AT_XY.has(`${Math.floor(sand.x)},${Math.floor(sand.y)}`)) {
                if (!SAND_AT_XY.has(`${Math.floor(sand.x) - 1},${Math.floor(sand.y)}`) && sand.x > 0) {
                    sand.x -= 1;
                } else if (
                    !SAND_AT_XY.has(`${Math.floor(sand.x) + 1},${Math.floor(sand.y)}`) &&
                    sand.x < ctx.cols - 1
                ) {
                    sand.x += 1;
                } else {
                    sand.y -= 1; // move back up a bit
                }
            }

            // have sand block other sand from occupying same space
            for (let j = 0; j < SANDS.length; j++) {
                if (i === j) continue;
                const otherSand = SANDS[j];
                if (Math.floor(otherSand.x) === Math.floor(sand.x) && Math.floor(otherSand.y) === Math.floor(sand.y)) {
                    sand.y -= 1; // move back up a bit
                }
            }

            // Check if sand is at (x, y)
            SAND_AT_XY.set(`${Math.floor(sand.x)},${Math.floor(sand.y)}`, sand.char);
        }
    }

    if (SAND_AT_XY.has(`${x},${y}`)) return SAND_AT_XY.get(`${x},${y}`)!;

    return " ";
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

const FISH_SPRITES_RIGHT: string[] = [">--))))*>", "><((((>", ":=:[>", "><>", ">))>", "><))>", ">=>", "><((((", ">>="];

const MIRROR: Record<string, string> = {
    "<": ">",
    ">": "<",
    "(": ")",
    ")": "(",
    "[": "]",
    "]": "[",
    "{": "}",
    "}": "{",
    "/": "\\",
    "\\": "/",
    ":": ":",
    "=": "=",
    "*": "*",
    "-": "-"
};
function mirrorLeft(s: string): string {
    let out = "";
    for (let i = s.length - 1; i >= 0; i--) {
        const c = s[i];
        out += MIRROR[c] ?? c;
    }
    return out;
}

type Fish = {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    dir: 1 | -1;
    spriteR: string;
    spriteL: string;
    wobble: number;
    changeT: number;
};

type Bubble = { x: number; y: number; life: number; ch: string };

type Cell = { ch: string; layer: number };

type Ocean = {
    w: number;
    h: number;
    tick: number;
    rng: () => number;
    fish: Fish[];
    bubbles: Bubble[];
    grid: Map<string, Cell>;
};

let __OCEAN: Ocean | null = null;

function makeRng(seed: number) {
    let t = (seed >>> 0) + 0x6d2b79f5;
    return function rng() {
        t |= 0;
        t = (t + 0x6d2b79f5) | 0;
        let r = Math.imul(t ^ (t >>> 15), 1 | t);
        r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
        return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
}
const irand = (rng: () => number, n: number) => (rng() * n) | 0;
const key = (x: number, y: number) => `${x},${y}`;

const RATE = 1;
const MAX_STEPS_PER_CALL = 2000;
const BUBBLE_SPAWN_P = 0.08;
const TURN_P = 0.02;
const SURGE_P = 0.1;
const WOBBLE_AMP = 0.25;
const WOBBLE_SPEED = 0.22;

function ensureOcean(ctx: AsciiAnimationManagerContext) {
    const w = Math.max(8, (ctx?.cols ?? 120) | 0);
    const h = Math.max(8, (ctx?.rows ?? 40) | 0);

    if (!__OCEAN) {
        const seed = 0xf15f ^ (w << 11) ^ (h << 3);
        const rng = makeRng(seed);
        __OCEAN = { w, h, tick: 0, rng, fish: [], bubbles: [], grid: new Map() };
    } else {
        __OCEAN.w = w;
        __OCEAN.h = h;
    }
    return __OCEAN;
}

function spawnFish(O: Ocean, ensureVisible: boolean) {
    const spriteR = FISH_SPRITES_RIGHT[irand(Math.random, FISH_SPRITES_RIGHT.length)];
    const spriteL = mirrorLeft(spriteR);
    const dir: 1 | -1 = Math.random() < 0.5 ? 1 : -1;
    const speed = 0.25 + Math.random() * 0.9; // 0.25..1.15 cells/tick
    const y = ensureVisible ? O.h / 2 + irand(Math.random, 5) : 2 + Math.random() * Math.max(1, O.h - 4);
    const x = ensureVisible
        ? dir === 1
            ? -irand(Math.random, O.w / 8)
            : O.w + irand(Math.random, O.w / 8)
        : dir === 1
        ? -irand(Math.random, O.w / 4)
        : O.w + irand(Math.random, O.w / 4);
    O.fish.push({
        id: irand(Math.random, 1 << 30),
        x,
        y,
        vx: dir * speed,
        vy: (Math.random() - 0.5) * 0.15,
        dir,
        spriteR,
        spriteL,
        wobble: Math.random() * Math.PI * 2,
        changeT: 30 + irand(Math.random, 180)
    });
}

function step(O: Ocean) {
    const { w, h, rng } = O;

    O.grid = new Map();

    for (const f of O.fish) {
        if (--f.changeT <= 0) {
            f.changeT = 30 + irand(rng, 180);
            if (rng() < TURN_P) {
                f.dir *= -1 as 1 | -1;
                f.vx = -f.vx;
            }
            if (rng() < SURGE_P) {
                const mult = 1.2 + rng() * 0.8;
                f.vx = Math.sign(f.vx) * Math.min(1.8, Math.abs(f.vx) * mult);
            }
            f.vy = (rng() - 0.5) * 0.2;
        }

        f.wobble += WOBBLE_SPEED;
        const wob = Math.sin(f.wobble) * WOBBLE_AMP;

        f.x += f.vx;
        f.y += f.vy + wob * 0.02 * (1 + Math.min(1, Math.abs(f.vx)));

        const spriteLen = f.dir === 1 ? f.spriteR.length : f.spriteL.length;
        if (f.dir === 1 && f.x > w + spriteLen) f.x = -spriteLen;
        if (f.dir === -1 && f.x < -spriteLen) f.x = w + spriteLen;

        if (f.y < 1) {
            f.y = 1;
            f.vy = Math.abs(f.vy);
        }
        if (f.y > h - 2) {
            f.y = h - 2;
            f.vy = -Math.abs(f.vy);
        }

        if (rng() < BUBBLE_SPAWN_P) {
            const sx = Math.round(f.x);
            const sy = Math.round(f.y);
            const mouthX = f.dir === 1 ? sx - 1 : sx + spriteLen + 1;
            const mouthY = sy + (rng() < 0.5 ? 0 : -1);
            O.bubbles.push({ x: mouthX, y: mouthY, life: 14 + irand(rng, 10), ch: rng() < 0.5 ? "." : "o" });
        }

        const row = Math.round(f.y);
        const col = Math.round(f.x);
        const sprite = f.dir === 1 ? f.spriteR : f.spriteL;
        for (let i = 0; i < sprite.length; i++) {
            const cx = f.dir === 1 ? col + i : col - i;
            const cy = row;
            if (cx >= 0 && cx < w && cy >= 0 && cy < h) {
                O.grid.set(key(cx, cy), { ch: sprite[i], layer: 10 });
            }
        }
    }

    const nextB: Bubble[] = [];
    for (const b of O.bubbles) {
        b.life--;
        if (b.life <= 0) continue;
        if (O.rng() < 0.6) b.y -= 1;
        if (O.rng() < 0.3) b.x += O.rng() < 0.5 ? -1 : 1;
        if (b.x < 0 || b.x >= w || b.y < 0) continue;
        const k = key(b.x | 0, b.y | 0);
        const prev = O.grid.get(k);
        if (!prev || prev.layer < 5) O.grid.set(k, { ch: b.ch, layer: 5 });
        nextB.push(b);
    }
    O.bubbles = nextB;
    O.tick++;
}

let numFish = 0;
let fishTimeElapsed = 0;

function SwimFishAsciiAnimation(
    x: number,
    y: number,
    time: number,
    _opacity: number,
    ctx: AsciiAnimationManagerContext
): string {
    const O = ensureOcean(ctx);

    // one step per iteration
    if (x === 0 && y === 0) {
        fishTimeElapsed += 1;
        if (fishTimeElapsed % Math.floor(1 + 150 * numFish * 3 ** numFish) === 0 && numFish < 8) {
            spawnFish(O, numFish === 0 ? true : false);
            numFish += 1;
        }

        const target = Math.max(0, Math.floor(time * RATE));
        const need = target - O.tick;
        if (need > 0) {
            const steps = Math.min(need, MAX_STEPS_PER_CALL);
            for (let i = 0; i < steps; i++) step(O);
        }
    }

    const c = O.grid.get(key(x, y));
    return c ? c.ch : " ";
}

export {
    AsciiAnimationManager,
    NumberAsciiAnimation,
    SinAsciiAnimation,
    BoidsAsciiAnimation,
    GravityAsciiAnimation,
    TextScrollAsciiAnimation,
    SandAsciiAnimation,
    SwimFishAsciiAnimation
};

export type { AsciiAnimation };
