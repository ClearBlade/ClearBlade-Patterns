function Parse_ZEP_Header(raw_packet) {
    log("Starting to parse ZEP header");
    var zep_header = null;
    var index = 0;
    if(raw_packet.length < 16) { // ZEP header minimum size is 16 bytes
        log("Packet length is less than 16 bytes");
        return null;
    }
    
    if(raw_packet[index] !== 0x45) { // Preamble byte 1
        log("Incorrect preamble in ZEP header");
        return null;
    }
    
    index++;
    
    if(raw_packet[index] !== 0x58) { // Preamble byte 2
        log("Incorrect preamble in ZEP header");
        return null;
    }
    
    log("Preamble is correct");
    index++;
    
    var version = raw_packet[index];
    index++;
    if(version == 0x01) {
        log("Version 1 ZEP");
        zep_v1["Protocol ID String"] = "EX";
        zep_v1["Protocol Version"] = 1;
        
        zep_v1["Channel ID"] = raw_packet[index];
        index++;
        
        var deviceID_MSB = raw_packet[index];
        index++;
        var deviceID_LSB = raw_packet[index];
        index++;
        zep_v1["Device ID"] = Get_16Bit_Value(deviceID_MSB, deviceID_LSB);
        
        var lqi_crc_mode = raw_packet[index];
        index++;
        if(lqi_crc_mode === 0x00) {
            zep_v1["LQI/CRC Mode"] = "LQI";
        } else if(lqi_crc_mode === 0x01) {
            zep_v1["LQI/CRC Mode"] = "CRC";
        } else {
            return null;
        }
        
        zep_v1["Link Quality Indication"] = raw_packet[index];
        index = index + zep_v1_sizes.reserved + 1; // Reserved bytes + 1 for the length field
        
        zep_v1["Length"] = raw_packet[index];
        index++;
        
        zep_header = {"index": index, "header": zep_v1};
    } else if(version === 0x03) {
        log("Version 2 ZEP");
        var type = raw_packet[index];
        index++;
        if(type === 0x01) {
            log("Type 1 ZEP");
            zep_v2_type1["Protocol ID String"] = "EX";
            zep_v2_type1["Protocol Version"] = 3;
            zep_v2_type1["Type"] = "1 (Data)";
            
            zep_v2_type1["Channel ID"] = raw_packet[index];
            index++;
            
            var deviceID_v2_MSB = raw_packet[index];
            index++;
            var deviceID_v2_LSB = raw_packet[index];
            index++;
            zep_v2_type1["Device ID"] = Get_16Bit_Value(deviceID_v2_MSB, deviceID_v2_LSB);
            
            var lqi_crc_mode_v2 = raw_packet[index];
            index++;
            if(lqi_crc_mode_v2 === 0x00) {
                zep_v2_type1["LQI/CRC Mode"] = "LQI";
            } else if(lqi_crc_mode_v2 === 0x01) {
                zep_v2_type1["LQI/CRC Mode"] = "CRC";
            } else {
                return null;
            }
            
            zep_v2_type1["Link Quality Indication"] = raw_packet[index];
            index++;
            
            zep_v2_type1["Timestamp"] = new Date().getTime();
            index = index + zep_v2_type1_sizes.ntp_timestamp;
            
            var sequence_v2_msb1 = raw_packet[index];
            index++;
            var sequence_v2_msb = raw_packet[index];
            index++;
            var sequence_v2_lsb1 = raw_packet[index];
            index++;
            var sequence_v2_lsb = raw_packet[index];
            
            zep_v2_type1["Sequence Number"] = Get_32Bit_Value(sequence_v2_msb1, sequence_v2_msb, sequence_v2_lsb1, sequence_v2_lsb);
            index = index + zep_v2_type1_sizes.reserved + 1;
            
            zep_v2_type1["Length"] = raw_packet[index];
            index++;
            
            zep_header = {"index": index, "header": zep_v2_type1};
        } else if(type === 0x02) {
            log("Type 2 ZEP");
            zep_v2_type2["Protocol ID String"] = "EX";
            zep_v2_type2["Protocol Version"] = 3;
            zep_v2_type2["Type"] = "2 (Ack)";
            
            var sequence_msb1 = raw_packet[index];
            index++;
            var sequence_msb = raw_packet[index];
            index++;
            var sequence_lsb1 = raw_packet[index];
            index++;
            var sequence_lsb = raw_packet[index];
            
            zep_v2_type2["Sequence Number"] = Get_32Bit_Value(sequence_msb1, sequence_msb, sequence_lsb1, sequence_lsb);
            index++;
            
            zep_header = {"index": index, "header": zep_v2_type2};
        } else {
            log("Incorrect ZEP type");
            return null;
        }
        
    } else {
        log("Incorrect version");
        return null;
    }
    
    return zep_header;
}