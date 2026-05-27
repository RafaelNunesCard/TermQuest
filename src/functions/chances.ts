function aleatorio(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function chance(probabilidade: number): boolean {
    return Math.random() * 100 < probabilidade;
}

export { aleatorio, chance };