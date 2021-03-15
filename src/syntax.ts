/**
 * © 2021 Astronaut Labs, LLC.
 */

import { BitstreamElement, Field, Marker, Variant, VariantMarker } from "@astronautlabs/bitstream";
import { Serializer as ST291Serializer } from "./serializer";

export class Packet extends BitstreamElement {

    @Field(10)
    ancillaryDataFlag : number = 0x03FC;

    @Field(8)
    did : number;
    
    @Field(2) 
    didParity : number;

    @Field(8, { presentWhen: i => (i.did & 0x80) === 0 })
    sdid : number;
    
    @Field(2, { presentWhen: i => (i.did & 0x80) === 0 })
    sdidParity : number;

    @Field(8, { presentWhen: i => (i.did & 0x80) !== 0 })
    dataBlockNumber : number;
    
    @Field(2, { presentWhen: i => (i.did & 0x80) !== 0 }) 
    dataBlockNumberParity : number;

    @Field(8)
    userDataCount : number;

    @Field(2)
    userDataParity : number;

    @Marker() $userDataStart;

    @VariantMarker() $variant;

    @Marker() $userDataEnd;

    @Field(9)
    checksum : number;

    @Field(1)
    checksumParity : number;
}

@Variant(i => true, { priority: -1 })
export class UnknownPacket extends Packet {
    @Field(i => i.userDataCount, { serializer: new ST291Serializer() })
    userDataWords : Buffer;
}