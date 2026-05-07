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
    private static ANIMATION_DURATION = 800;
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
let IS_COLLAPSING = false;
let SAND_LAST_TIME = 0;

function SandAsciiAnimation(
    x: number,
    y: number,
    time: number,
    opacity: number,
    ctx: AsciiAnimationManagerContext,
    fadingOut: boolean
) {
    const ASCII_STRING = "dGFpLnNhbmgubmdAZ21haWwuY29t";

    if (x === 0 && y === 0 && ctx) {
        let pileTop = ctx.rows;
        const cx = Math.floor(ctx.cols / 2);
        for (let checkY = ctx.rows - 1; checkY >= 0; checkY--) {
            if (SAND_AT_XY.has(`${cx},${checkY}`)) {
                pileTop = checkY;
            } else {
                break;
            }
        }
        if (pileTop < ctx.rows - 22) IS_COLLAPSING = true;
        if (pileTop >= ctx.rows - 10) IS_COLLAPSING = false;
    }

    if (x === 0 && y === 0 && time - SAND_LAST_TIME > 0.2 && ctx && !fadingOut) {
        SANDS.push({
            x: ctx.cols / 2,
            y: Math.random() * 10 - 20,
            char: ASCII_STRING[Math.floor(Math.random() * ASCII_STRING.length)],
            timeSpawned: time
        });
        SAND_LAST_TIME = time;
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
            sand.y += 0.6;

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
                } else if (IS_COLLAPSING && sand.y < ctx.rows - 5) {
                    const dir = sand.x < ctx.cols / 2 ? -1 : 1;
                    if (
                        !SAND_AT_XY.has(`${Math.floor(sand.x) + dir},${Math.floor(sand.y) - 1}`) &&
                        sand.x + dir > 0 &&
                        sand.x + dir < ctx.cols - 1
                    ) {
                        sand.x += dir;
                        sand.y -= 1;
                    } else {
                        sand.y -= 1;
                    }
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

// Define what a cell looks like now
type CellState = {
    alive: boolean;
    neighbors: number;
};

let gridState: CellState[][] = [];
let isInitialized = false;
let lastTickTime = 0;
const TICK_RATE_MS = 0.6;

function ConwayAsciiAnimation(
    x: number,
    y: number,
    time: number,
    opacity: number,
    ctx: AsciiAnimationManagerContext,
    fadingOut: boolean
) {
    if (!isInitialized && ctx.cols > 0 && ctx.rows > 0) {
        gridState = Array.from({ length: ctx.rows }, () =>
            Array.from({ length: ctx.cols }, () => ({ alive: false, neighbors: 0 }))
        );

        const centerX = ctx.cols / 2;
        const centerY = ctx.rows / 2;
        const maxDist = Math.min(centerX, centerY);

        for (let r = 0; r < ctx.rows; r++) {
            for (let c = 0; c < ctx.cols; c++) {
                const dist = Math.sqrt(Math.pow(c - centerX, 2) + Math.pow(r - centerY, 2));
                const probability = Math.max(0, 1 - dist / maxDist) * 0.42;
                gridState[r][c].alive = Math.random() < probability;
            }
        }

        for (let r = 0; r < ctx.rows; r++) {
            for (let c = 0; c < ctx.cols; c++) {
                let aliveNeighbors = 0;
                for (let dr = -1; dr <= 1; dr++) {
                    for (let dc = -1; dc <= 1; dc++) {
                        if (dr === 0 && dc === 0) continue;
                        const nr = r + dr,
                            nc = c + dc;
                        if (nr >= 0 && nr < ctx.rows && nc >= 0 && nc < ctx.cols) {
                            if (gridState[nr][nc].alive) aliveNeighbors++;
                        }
                    }
                }
                gridState[r][c].neighbors = aliveNeighbors;
            }
        }

        isInitialized = true;
    }

    if (x === 0 && y === 0 && isInitialized) {
        if (gridState.length !== ctx.rows || (gridState[0] && gridState[0].length !== ctx.cols)) {
            const resizedGrid = Array.from({ length: ctx.rows }, () =>
                Array.from({ length: ctx.cols }, () => ({ alive: false, neighbors: 0 }))
            );

            for (let r = 0; r < Math.min(gridState.length, ctx.rows); r++) {
                for (let c = 0; c < Math.min(gridState[0].length, ctx.cols); c++) {
                    resizedGrid[r][c].alive = gridState[r][c].alive;
                    resizedGrid[r][c].neighbors = gridState[r][c].neighbors;
                }
            }
            gridState = resizedGrid;
        }

        if (time - lastTickTime > TICK_RATE_MS) {
            const nextState = Array.from({ length: ctx.rows }, () =>
                Array.from({ length: ctx.cols }, () => ({ alive: false, neighbors: 0 }))
            );

            for (let r = 0; r < ctx.rows; r++) {
                for (let c = 0; c < ctx.cols; c++) {
                    let aliveNeighbors = 0;
                    for (let dr = -1; dr <= 1; dr++) {
                        for (let dc = -1; dc <= 1; dc++) {
                            if (dr === 0 && dc === 0) continue;

                            const nr = r + dr;
                            const nc = c + dc;

                            if (nr >= 0 && nr < ctx.rows && nc >= 0 && nc < ctx.cols) {
                                if (gridState[nr][nc].alive) aliveNeighbors++;
                            }
                        }
                    }

                    nextState[r][c].neighbors = aliveNeighbors;

                    const isAlive = gridState[r][c].alive;
                    if (isAlive && (aliveNeighbors === 2 || aliveNeighbors === 3)) {
                        nextState[r][c].alive = true;
                    } else if (!isAlive && aliveNeighbors === 3) {
                        nextState[r][c].alive = true;
                    } else {
                        nextState[r][c].alive = false;
                    }
                }
            }

            gridState = nextState;
            lastTickTime = time;
        }
    }

    if (isInitialized && gridState[y] !== undefined && gridState[y][x]?.alive) {
        return gridState[y][x].neighbors.toString();
    }

    return " ";
}

export {
    AsciiAnimationManager,
    NumberAsciiAnimation,
    SinAsciiAnimation,
    BoidsAsciiAnimation,
    GravityAsciiAnimation,
    TextScrollAsciiAnimation,
    SandAsciiAnimation,
    ConwayAsciiAnimation
};

export type { AsciiAnimation };
