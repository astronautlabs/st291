# @/st291

[![npm](https://img.shields.io/npm/v/@astronautlabs/st291)](https://npmjs.com/package/@astronautlabs/st291)
[![CircleCI](https://circleci.com/gh/astronautlabs/st291.svg?style=svg)](https://circleci.com/gh/astronautlabs/st291)

> **[📜 ST 291-1:2011](https://ieeexplore.ieee.org/document/7291794)**  
> Ancillary Data Packet and Space Formatting

> 📺 Part of the **Astronaut Labs Broadcast Suite**  
> [@/rfc8331](https://github.com/astronautlabs/rfc8331) |
> [@/scte104](https://github.com/astronautlabs/scte104) | 
> [@/scte35](https://github.com/astronautlabs/scte35) | 
> [@/st2010](https://github.com/astronautlabs/st2010) | 
> [@/st291](https://github.com/astronautlabs/st291)

> ✅ **Release Quality**  
> This library is ready for production

---

Implementation of ST 291 in Typescript using [@astronautlabs/bitstream](https://github.com/astronautlabs/bitstream)

## Summary 

This library provides the ability to read and write SMPTE ST 291 ancillary messages as they appear within the Vertical Ancillary space or other appropriate carriers. It implements 10-bit data words, parity and checksumming to ease implementations. ST 291 packets are used to send various types of data alongside video essence, notably captions, digital cue points, and AFD information.
## Installation

```
npm install @astronautlabs/st291
```

## Usage

This library exposes an element class called Packet that implements the syntax for ST291 packets. You can use `BitstreamReader` and `BitstreamWriter` from that package along with this class in order to read and write the packets. For quick usage, you can use serialize/deserialize:

```typescript
import * as ST291 from '@astronautlabs/st291';

// read
let packet = await ST291.Packet.deserialize(buffer);

// write
buffer = packet.serialize();
```

The package also exposes `parity()` for computing 2-bit parity on an 8-bit data byte and `checksum()` for computing the 9-bit checksum on a set of 10-bit user data words.