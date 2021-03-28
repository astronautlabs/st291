/**
 * © 2021 Astronaut Labs, LLC.
 */

import { BitstreamElement, Field, Marker, Variant, VariantMarker } from "@astronautlabs/bitstream";
import { parity } from "./parity";
import { Serializer as ST291Serializer } from "./serializer";

export class Packet extends BitstreamElement {

    @Field(10)
    ancillaryDataFlag : number = 0x03FC;

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

    @Field(1)
    checksumParity : number = 0; // todo

    @Field(9)
    checksum : number = 0; // todo
}

@Variant(i => true, { priority: 'last' })
export class UnknownPacket extends Packet {
    @Field(i => i.userDataCount, { serializer: new ST291Serializer() })
    userDataWords : Buffer;
}