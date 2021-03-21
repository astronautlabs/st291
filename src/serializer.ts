import { BitstreamReader, BitstreamElement, FieldDefinition, BitstreamWriter, resolveLength } from "@astronautlabs/bitstream";
import { Serializer as ISerializer } from "@astronautlabs/bitstream";
import { parity } from "./parity";

export class Serializer implements ISerializer {
    async read(reader: BitstreamReader, type: any, parent: BitstreamElement, field: FieldDefinition): Promise<any> {
        let length = resolveLength(field.length, parent, field);

        // Interpret length as number of 10-bit words, with 8-bit data and 2-bit parity

        let buffer = Buffer.alloc(length);

        for (let i = 0; i < length; ++i) {
            let wireParity = await reader.read(2);
            buffer[i] = await reader.read(8);
            let expectedParity = parity(buffer[i]);
            if (expectedParity !== wireParity) {
                console.error(
                    `Error: Detected incorrect parity for word ${i} ` 
                    + `[value 0x${buffer[i].toString(16)}]: ` 
                    + `0b${wireParity.toString(2)} ` 
                    + `vs expected 0b${expectedParity.toString(2)}`
                );
            }
        }

        return buffer;
    }

    write(writer: BitstreamWriter, type: any, parent: BitstreamElement, field: FieldDefinition, buffer: any) {
        let length = resolveLength(field.length, parent, field);

        if (!(buffer instanceof Buffer))
            throw new Error(`Value must be Buffer`);
        
        for (let i = 0; i < length; ++i) {
            writer.write(2, parity(buffer[i]));
            writer.write(8, buffer[i]);
        }
    }
}