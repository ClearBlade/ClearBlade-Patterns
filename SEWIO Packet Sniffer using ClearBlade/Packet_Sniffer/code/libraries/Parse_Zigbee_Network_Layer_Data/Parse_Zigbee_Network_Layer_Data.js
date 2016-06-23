function Parse_Zigbee_Network_Layer_Data(raw_packet, index, length) {
    var parsed_znld = null;
    index = index + 2;
    length = length - 2;
    if(length <= 0) {
        log("Error parsing Zigbee Network Layer Data, length is <= 0");
        return null;
    }
    
    var destination_msb = raw_packet[index];
    index++;
    length--;
    if(length === 0) {
        log("Length became 0: ZNLD");
        return null;
    }
    var destination_lsb = raw_packet[index];
    index++;
    length--;
    if(length === 0) {
        log("Length became 0: ZNLD");
        return null;
    }
    var destination = Get_16Bit_Value(destination_lsb, destination_msb);
    zigbee_network_layer.Destination = "0x" + destination.toString(16);
    
    var source_msb = raw_packet[index];
    index++;
    length--;
    if(length === 0) {
        log("Length became 0: ZNLD");
        return null;
    }
    var source_lsb = raw_packet[index];
    index++;
    length--;
    if(length === 0) {
        log("Length became 0: ZNLD");
        return null;
    }
    var source = Get_16Bit_Value(source_lsb, source_msb);
    if(source === 0x0000) {
        zigbee_network_layer.Source = "0x0000"
    } else {
        zigbee_network_layer.Source = "0x" + source.toString(16);
    }
    
    zigbee_network_layer.Radius = raw_packet[index];
    index++;
    length--;
    if(length === 0) {
        log("Length became 0: ZNLD");
        return null;
    }
    
    zigbee_network_layer["Sequence Number"] = raw_packet[index];
    index = index + 9;
    length = length - 9;
    if(length === 0) {
        log("Length became 0: ZNLD");
        return null;
    }
    
    var security_control_field = raw_packet[index];
    index++;
    length--;
    if(length === 0) {
        log("Length became 0: ZNLD");
        return null;
    }
    
    if(((security_control_field & 1<<3) !== 0) && ((security_control_field & 1<<4) === 0)) {
        zigbee_network_layer["Zigbee Security Header"]["Security Control Field"]["Key Id"] = "Network Key";
    }
    
    if((security_control_field & 1<<5) !== 0) {
        zigbee_network_layer["Zigbee Security Header"]["Security Control Field"]["Extended Nonce"] = true;
    } else {
        zigbee_network_layer["Zigbee Security Header"]["Security Control Field"]["Extended Nonce"] = false;
    }
    
    var frame_counter_msb1 = raw_packet[index];
    index++;
    length--;
    if(length === 0) {
        log("Length became 0: ZNLD");
        return null;
    }
    var frame_counter_msb = raw_packet[index];
    index++;
    length--;
    if(length === 0) {
        log("Length became 0: ZNLD");
        return null;
    }
    var frame_counter_lsb1 = raw_packet[index];
    index++;
    length--;
    if(length === 0) {
        log("Length became 0: ZNLD");
        return null;
    }
    var frame_counter_lsb = raw_packet[index];
    index = index + 9;
    length = length - 9;
    if(length === 0) {
        log("Length became 0: ZNLD");
        return null;
    }
            
    zigbee_network_layer["Zigbee Security Header"]["Frame Counter"] = Get_32Bit_Value(frame_counter_msb1, frame_counter_msb, frame_counter_lsb1, frame_counter_lsb);
    
    zigbee_network_layer["Zigbee Security Header"]["Key Sequence Number"] = raw_packet[index];
    index++;
    length--;
    if(length === 0) {
        log("Length became 0: ZNLD");
        return null;
    }
    
    var data = {};
    data.Data = "";
    while(length > 6) {
        data.Data = data.Data + raw_packet[index].toString(16);
        index++;
        length--;
        if(length === 0) {
            log("Length became 0: ZNLD");
            return null;
        }
    }
    
    zigbee_network_layer["Zigbee Security Header"]["Message Integrity Code"] = "";
    while(length > 2) {
        zigbee_network_layer["Zigbee Security Header"]["Message Integrity Code"] = zigbee_network_layer["Zigbee Security Header"]["Message Integrity Code"] + raw_packet[index].toString(16);
        index++;
        length--;
        if(length === 0) {
            log("Length became 0: ZNLD");
            return null;
        }
    }
    
    index++;
    length--;
    var fcs = null;
    var frame_check_sequence = raw_packet[index];
    if(frame_check_sequence === 0x80) {
        fcs = "FCS OK";
    } else {
        fcs = "FCS NOT OK";
    }
    
    parsed_znld = {"znld": zigbee_network_layer, "data": data, "fcs": fcs};
    
    return parsed_znld;
}