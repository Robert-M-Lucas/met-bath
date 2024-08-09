export type Color = {r: number, g: number, b: number};

export function CodeToColor(code: string): Color | undefined {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(code);

    return result ? {
        r: parseInt(result[1],  16),
        g: parseInt(result[2],  16),
        b: parseInt(result[3],  16),
    } : undefined;
}

export function ColorToCode(color: Color) {
    return "#" + ((1 << 24) + (color.r << 16) + (color.g << 8) + color.b).toString(16).slice(1);
}

export function HSVtoRGB(h: number, s: number, v: number): Color {
    let r, g, b;

    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r! * 255),
        g: Math.round(g! * 255),
        b: Math.round(b! * 255)
    };
}

export const IS_DEV = import.meta.env.DEV;