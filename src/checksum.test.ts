import { describe } from "razmin";
import { expect } from "chai";
import { checksum } from "./checksum";
import { BitstreamElement, Field, Marker } from "@astronautlabs/bitstream";

describe("checksum", it => {
    it('produces the correct value (1)', async () => {
        class Sample extends BitstreamElement {
            @Marker() $checksumStart;
            @Field(1) p1 : number = 1; @Field(9) f1 : number = 123;
            @Field(1) p2 : number = 0; @Field(9) f2 : number = 456;
            @Field(1) p3 : number = 1; @Field(9) f3 : number = 789;
            @Field(1) p4 : number = 1; @Field(9) f4 : number = 101;
            @Field(1) p5 : number = 0; @Field(9) f5 : number = 112;
            @Marker() $checksumEnd;
        }

        expect(await checksum(new Sample())).to.equal(557);
    });  
    it('produces the correct value (2)', async () => {
        class Sample extends BitstreamElement {
            @Marker() $checksumStart;
            @Field(1) p1 : number = 1; @Field(9) f1 : number = 0;
            @Field(1) p2 : number = 0; @Field(9) f2 : number = 0;
            @Field(1) p3 : number = 1; @Field(9) f3 : number = 0;
            @Field(1) p4 : number = 1; @Field(9) f4 : number = 0;
            @Field(1) p5 : number = 0; @Field(9) f5 : number = 0;
            @Marker() $checksumEnd;
        }

        expect(await checksum(new Sample())).to.equal(512);
    });  
});