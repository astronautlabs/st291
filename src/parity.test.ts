import { describe } from "razmin";
import { expect } from "chai";
import { parity } from "./parity";

describe("parity", it => {
    it('produces the correct value', async () => {
        expect(parity(0b00000011)).to.equal(0b10);
        expect(parity(0b10001101)).to.equal(0b10);
        expect(parity(0b10100101)).to.equal(0b10);
        expect(parity(0b00101101)).to.equal(0b10);
        expect(parity(0b10000001)).to.equal(0b10);
        expect(parity(0b00000000)).to.equal(0b10);
        expect(parity(0b00011000)).to.equal(0b10);

        expect(parity(0b00000010)).to.equal(0b01);
        expect(parity(0b10101101)).to.equal(0b01);
        expect(parity(0b10000101)).to.equal(0b01);
        expect(parity(0b00001000)).to.equal(0b01);
        expect(parity(0b11000001)).to.equal(0b01);
        expect(parity(0b10101011)).to.equal(0b01);
        expect(parity(0b00111000)).to.equal(0b01);
    });  
});