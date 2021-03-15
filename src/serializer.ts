import { BitstreamReader, BitstreamElement, FieldDefinition, BitstreamWriter, resolveLength } from "@astronautlabs/bitstream";
import { Serializer as ISerializer } from "@astronautlabs/bitstream";

export class Serializer implements ISerializer {
    async read(reader: BitstreamReader, type: any, parent: BitstreamElement, field: FieldDefinition): Promise<any> {
        let length = resolveLength(field.length, parent, field);

        // Interpret length as number of 10-bit words, with 8-bit data and 2-bit parity

        let buffer = Buffer.alloc(length);

        for (let i = 0; i < length; ++i) {
            buffer[i] = await reader.read(8);
            let parity = reader.read(2);

            // TODO: handle parity
        }

        return buffer;
    }

    write(writer: BitstreamWriter, type: any, parent: BitstreamElement, field: FieldDefinition, buffer: any) {
        if (!(buffer instanceof Buffer))
            throw new Error(`Value must be Buffer`);
        
        for (let i = 0; i < length; ++i) {
            writer.write(8, buffer[i]);
            writer.write(2, 0); // TODO: generate parity
        }
    }
}