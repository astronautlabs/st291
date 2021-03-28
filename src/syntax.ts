/**
 * © 2021 Astronaut Labs, LLC.
 */

import { BitstreamElement, DefaultVariant, Field, Marker, Variant, VariantMarker } from "@astronautlabs/bitstream";
import { checksum } from "./checksum";
import { parity } from "./parity";
import { Serializer as ST291Serializer } from "./serializer";

export class Packet extends BitstreamElement {

    @Field(10)
    ancillaryDataFlag : number = 0x03FC;

    @Marker() $checksumStart;

    @Field(2, { writtenValue: i => parity(i.did) })
    didParity : number;

    @Field(8)
    did : number;
    
    @Field(2, { presentWhen: i => (i.did & 0x80) === 0, writtenValue: i => parity(i.sdid) })
    sdidParity : number;

    @Field(8, { presentWhen: i => (i.did & 0x80) === 0 })
    sdid : number;
    
    @Field(2, { presentWhen: i => (i.did & 0x80) !== 0, writtenValue: i => parity(i.dataBlockNumber) }) 
    dataBlockNumberParity : number;
    
    @Field(8, { presentWhen: i => (i.did & 0x80) !== 0 })
    dataBlockNumber : number;

    @Field(2, { writtenValue: i => parity(i.userDataCount) })
    userDataCountParity : number;

    @Field(8, {
        writtenValue: i => i.measure(i => i.$userDataStart, i => i.$userDataEnd) / 10
    })
    userDataCount : number;

    @Marker() $userDataStart;

    @VariantMarker() $variant;

    @Marker() $userDataEnd;
    @Marker() $checksumEnd;
    
    @Field(10, { writtenValue: i => checksum(i) })
    checksum : number = 0;
}

@DefaultVariant()
export class UnknownPacket extends Packet {
    @Field(i => i.userDataWords?.length ?? i.userDataCount, { serializer: new ST291Serializer() })
    userDataWords : Buffer;
}