function xyHash(x: number, y: number) {
    let h = 0x165667b1 | 0;
    h ^= Math.imul(x | 0, 0x85ebca6b);
    h = Math.imul(h, 0xc2b2ae35);
    h ^= Math.imul(y | 0, 0x27d4eb2d);
    h = Math.imul(h, 0x165667b1);
    h ^= h >>> 16;
    h = Math.imul(h, 0x85ebca6b);
    h ^= h >>> 13;
    h = Math.imul(h, 0xc2b2ae35);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
}

function charsPerLine(container: Element): number {
    const cs = getComputedStyle(container);
    const contentWidth = container.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);

    const PROBE_N = 100;

    const probe = document.createElement("span");
    probe.textContent = "0".repeat(PROBE_N);
    probe.style.visibility = "hidden";
    probe.style.whiteSpace = "nowrap";
    probe.style.font = cs.font;
    probe.style.letterSpacing = cs.letterSpacing;
    container.appendChild(probe);

    const total = probe.getBoundingClientRect().width;
    container.removeChild(probe);

    const advance = total / PROBE_N;
    return Math.floor(contentWidth / advance);
}

function lineHeightPx(el: Element) {
    const cs = getComputedStyle(el);
    if (cs.lineHeight !== "normal") return parseFloat(cs.lineHeight);

    const PROBE_N = 100;

    const probe = document.createElement("span");
    probe.textContent = "A\n".repeat(PROBE_N);
    probe.style.visibility = "hidden";
    probe.style.whiteSpace = "pre";
    probe.style.font = cs.font;
    probe.style.lineHeight = cs.lineHeight;
    el.appendChild(probe);
    const h = probe.getBoundingClientRect().height;
    el.removeChild(probe);
    return h / PROBE_N;
}

function linesPerColumn(container: Element) {
    const cs = getComputedStyle(container);
    const contentHeight = container.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);

    const lh = lineHeightPx(container);
    return Math.max(0, Math.floor(contentHeight / lh));
}

export { xyHash, charsPerLine, linesPerColumn };
