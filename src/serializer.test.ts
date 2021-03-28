import { describe } from "razmin";
import { expect } from "chai";
import { parity } from "./parity";
import { Serializer } from "./serializer";
import { BitstreamElement, BitstreamMeasurer, BitstreamWriter } from "@astronautlabs/bitstream";
import { WritableStreamBuffer } from "stream-buffers";

describe("serializer", it => {
    it('turns bytes into the correct number of words', async () => {
        let serializer = new Serializer();
        let measurer = new BitstreamMeasurer();
        let element = new BitstreamElement();
        serializer.write(
            measurer, null, element, 
            <any>{ 
                length: 0, 
                options: { 
                    buffer: { 
                        truncate: false 
                    }
                }
            }, 
            Buffer.from([1,2,3,4,5,6,7,8])
        );
        expect(measurer.bitLength).to.equal(80);
    });
    it('turns bytes into the correct words', async () => {
        let serializer = new Serializer();
        let stream = new WritableStreamBuffer();
        let writer = new BitstreamWriter(stream);
        let element = new BitstreamElement();
        let data = [1,2,3,4,5,6,7,8];

        serializer.write(
            writer, null, element, 
            <any>{ 
                length: 0, 
                options: { 
                    buffer: { 
                        truncate: false 
                    }
                }
            }, 
            Buffer.from(data)
        );

        let buf = <Buffer>stream.getContents();

        expect(buf.length).to.equal(10);

        function leftPad(str : string, len : number) {
            while (str.length < len)
                str = `0${str}`;
            return str;
        }

        let binStr = data.map(x => leftPad(parity(x).toString(2), 2) + leftPad(x.toString(2), 8)).join('');
        for (let i = 0, max = 8; i < max; ++i) {
            let bin = binStr.slice(i*8, i*8+8);
            expect(buf[i]).to.equal(parseInt(bin, 2));
        }
    });
});