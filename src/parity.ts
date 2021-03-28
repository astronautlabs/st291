export function parity(byte : number) {
    let count = byte & 0x1;
    for (let i = 0; i < 8; ++i)
        count += ((byte >>= 1) & 0x1) ? 1 : 0;

    if (count % 2 === 0)
        return 0b10;
    else
        return 0b01;
}