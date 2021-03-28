import { BitstreamElement, BitstreamReader } from "@astronautlabs/bitstream";

export function checksum(packet : BitstreamElement) {
    let length = packet.measure('$checksumStart', '$checksumEnd');
    let wordCount = length / 10;
    let data = packet.serialize('$checksumStart', '$checksumEnd', true);
    let reader = new BitstreamReader();
    reader.addBuffer(data);
    let sum = 0;

    for (let i = 0; i < wordCount; ++i) {
        reader.skip(1);
        sum = (sum + reader.readSync(9)) & 0x1ff;
    }

    return (sum & 0x100) !== 0 ? sum : (0x200 | sum);
}