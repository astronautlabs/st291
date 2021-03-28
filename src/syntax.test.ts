import { describe } from "razmin";
import { expect } from "chai";
import { Packet, UnknownPacket } from "./syntax";

describe("Packet", it => {
    it('can parse a simple example', async () => {
        let buf = Buffer.from([
        0xff, 0x20, 0xc8, 0x8a, 
        0x07, 0x80, 0x20, 0x14, 
        0x09, 0x03, 0x41, 0x10, 
        0x58, 0x18, 0x00
        ]);

        let packet = await Packet.deserialize(buf);

        expect(packet).to.be.instanceOf(UnknownPacket);

        if (packet instanceof UnknownPacket) {
            expect(packet.did).to.equal(12);
            expect(packet.sdid).to.equal(34);
            expect(packet.userDataCount).to.equal(7);
            expect(packet.userDataWords.length).to.equal(7);
            expect(packet.userDataWords[0]).to.equal(0);
            expect(packet.userDataWords[1]).to.equal(1);
            expect(packet.userDataWords[2]).to.equal(2);
            expect(packet.userDataWords[3]).to.equal(3);
            expect(packet.userDataWords[4]).to.equal(4);
            expect(packet.userDataWords[5]).to.equal(5);
            expect(packet.userDataWords[6]).to.equal(6);
        }
    });  
});