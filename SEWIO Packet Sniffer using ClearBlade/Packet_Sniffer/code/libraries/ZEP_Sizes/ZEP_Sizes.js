/*
 * This library contains the sizes of the different fields of the Zigbee Encapsulation Protocol (ZEP) Header. All the sizes are in bytes
 */

// All ZEP headers will have these two fields
var zep_general = {
    "preamble": 2,
    "version": 1
};

// ZEP version 1 sizes
var zep_v1_sizes = {
    "preamble": 2,
    "version": 1,
    "channel_id": 1,
    "device_id": 2,
    "crc_lqi_mode": 1,
    "lqi_value": 1,
    "reserved": 7,
    "length": 1
};

// ZEP version 2 sizes for type = 1/Data
var zep_v2_type1_sizes = {
  "preamble": 2,
  "version": 1,
  "type": 1,
  "channel_id": 1,
  "device_id": 2,
  "crc_lqi_mode": 1,
  "lqi_value": 1,
  "ntp_timestamp": 8,
  "sequence_number": 4,
  "reserved": 10,
  "length": 1
};

// ZEP version 2 sizes for type = 2/Ack
var zep_v2_type2_sizes = {
  "preamble": 2,
  "version": 1,
  "type": 1,
  "sequence_number": 4
};