# @/st291

[![npm](https://img.shields.io/npm/v/@astronautlabs/st291)](https://npmjs.com/package/@astronautlabs/st291)

Implementation of ST 291 ancillary packets

# Installation

```
npm install @astronautlabs/st291
```

# Usage

This library exposes a `@astronautlabs/bitstream` class called Packet that implements the syntax for ST291 packets. You can use `BitstreamReader` and `BitstreamWriter` from that package along with this class in order to read and write the packets. For quick usage, you can use serialize/deserialize:

```typescript
import * as ST291 from '@astronautlabs/st291';

// read
let packet = await ST291.Packet.deserialize(buffer);

// write
buffer = packet.serialize();
```

The package also exposes `parity()` for computing 2-bit parity on an 8-bit data byte and `checksum()` for computing the 9-bit checksum on a set of 10-bit user data words.