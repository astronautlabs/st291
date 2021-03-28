import { BitstreamElement, BitstreamReader } from "@astronautlabs/bitstream";

export async function checksum(packet : BitstreamElement) {
    let length = packet.measure();
    let wordCount = length / 10;
    let data = packet.serialize('$checksumStart', '$checksumEnd', true);
    let reader = new BitstreamReader();
    reader.addBuffer(data);
    let sum = 0;

    for (let i = 0; i < wordCount; ++i) {
        reader.skip(1);
        sum = (sum + await reader.read(9)) & 0x1ff;
    }

    return (sum & 0x100) !== 0 ? sum : (0x200 | sum);
}