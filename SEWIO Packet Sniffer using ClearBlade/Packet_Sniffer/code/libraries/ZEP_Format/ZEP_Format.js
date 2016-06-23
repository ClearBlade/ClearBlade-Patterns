/*
 * These JSON object will hold the ZEP header data upon parsing the packet.
 */

// ZEP version 1
var zep_v1 = {
    "Protocol ID String": undefined,
    "Protocol Version": undefined,
    "Channel ID": undefined,
    "Device ID": undefined,
    "LQI/CRC Mode": undefined,
    "Link Quality Indication": undefined,
    "Length": undefined
};

// ZEP version 2 for type = 1/Data
var zep_v2_type1 = {
  "Protocol ID String": undefined,
  "Protocol Version": undefined,
  "Type": undefined,
  "Channel ID": undefined,
  "Device ID": undefined,
  "LQI/CRC Mode": undefined,
  "Link Quality Indication": undefined,
  "Timestamp": undefined,
  "Sequence Number": undefined,
  "Length": undefined
};

// ZEP version 2 for type = 2/Ack
var zep_v2_type2 = {
  "Protocol ID String": undefined,
  "Protocol Version": undefined,
  "Type": undefined,
  "Sequence Number": undefined
};