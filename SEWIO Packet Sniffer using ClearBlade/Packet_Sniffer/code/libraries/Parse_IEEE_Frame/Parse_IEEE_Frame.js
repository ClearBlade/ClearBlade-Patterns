function Parse_IEEE_Frame(raw_packet, index, length) {
    if(length < 5) { // IEEE frame minimum size is 5 bytes
        log("IEEE Frame size is less than 5 bytes. Invalid IEEE Frame");
        return null; 
    }
    
    var parsed_ieee_frame = null;
    var frame_type = null;
    var fcs = null;
    
    var frame_control_msb = raw_packet[index];
    index++;
    length--;
    var frame_control_lsb = raw_packet[index];
    index++;
    length--;
    var frame_control_field = Get_16Bit_Value(frame_control_lsb, frame_control_msb);
    if(((frame_control_field & 1<<0) === 0) && ((frame_control_field & 1<<1) === 0) && ((frame_control_field & 1<<2) === 0)) {
        log("Beacon Frame");
        ieee_frame["Frame Control Field"]["Frame Type"] = "Beacon";
        frame_type = "Beacon";
    } else if(((frame_control_field & 1<<0) !== 0) && ((frame_control_field & 1<<1) === 0) && ((frame_control_field & 1<<2) === 0)) {
        log("Data Frame");
        ieee_frame["Frame Control Field"]["Frame Type"] = "Data";
        frame_type = "Data";
    } else if(((frame_control_field & 1<<0) === 0) && ((frame_control_field & 1<<1) !== 0) && ((frame_control_field & 1<<2) === 0)) {
        log("Acknowledgement Frame");
        ieee_frame["Frame Control Field"]["Frame Type"] = "Ack";
        frame_type = "Ack";
    } else if(((frame_control_field & 1<<0) !== 0) && ((frame_control_field & 1<<1) !== 0) && ((frame_control_field & 1<<2) === 0)) {
        log("MAC Command Frame");
        ieee_frame["Frame Control Field"]["Frame Type"] = "MAC Command";
        frame_type = "MAC Command";
    } else {
        log("Reserved Frame bits used. Not allowed");
        return null;
    }
    
    if((frame_control_field & 1<<3) !== 0) {
        ieee_frame["Frame Control Field"]["Security Enabled"] = true;
    } else {
        ieee_frame["Frame Control Field"]["Security Enabled"] = false;
    }
    
    if((frame_control_field & 1<<4) !== 0) {
        ieee_frame["Frame Control Field"]["Frame Pending"] = true;
    } else {
        ieee_frame["Frame Control Field"]["Frame Pending"] = false;
    }    
    
    if((frame_control_field & 1<<5) !== 0) {
        ieee_frame["Frame Control Field"]["Acknowledge Request"] = true;
    } else {
        ieee_frame["Frame Control Field"]["Acknowledge Request"] = false;
    }     
    
    if((frame_control_field & 1<<6) !== 0) {
        ieee_frame["Frame Control Field"]["Intra-PAN"] = true;
    } else {
        ieee_frame["Frame Control Field"]["Intra-PAN"] = false;
    }   
    
    if(((frame_control_field & 1<<10) === 0) && ((frame_control_field & 1<<11) !== 0)) {
        ieee_frame["Frame Control Field"]["Destination Addressing Mode"] = "Short/16-bit";
    } else if(((frame_control_field & 1<<10) === 0) && ((frame_control_field & 1<<11) === 0)) {
        ieee_frame["Frame Control Field"]["Destination Addressing Mode"] = "None";
    }
    
    if(((frame_control_field & 1<<12) === 0) && ((frame_control_field & 1<<13) === 0)) {
        ieee_frame["Frame Control Field"]["Frame Version"] = 0;
    }
    
    if(((frame_control_field & 1<<14) === 0) && ((frame_control_field & 1<<15) !== 0)) {
        ieee_frame["Frame Control Field"]["Source Addressing Mode"] = "Short/16-bit";
    } else if(((frame_control_field & 1<<14) === 0) && ((frame_control_field & 1<<15) === 0)) {
        ieee_frame["Frame Control Field"]["Source Addressing Mode"] = "None";
    }
    
    
    if(frame_type === "Ack") {
        ieee_frame["Sequence Number"] = raw_packet[index];
        index++;
        index++;
        length--;
        length --;
        
        var frame_check_sequence = raw_packet[index];
        if(frame_check_sequence === 0x80) {
            fcs = "FCS OK";
        } else {
            fcs = "FCS NOT OK";
        }
        
        parsed_ieee_frame = {"index": index, "length": length, "ieee_frame": ieee_frame, "packet_end": true, "fcs": fcs};
    } else if(frame_type === "Data") {
        ieee_frame["Sequence Number"] = raw_packet[index];
        index++;
        length--;
        
        var destination_pan_msb = raw_packet[index];
        index++;
        length--;
        var destination_pan_lsb = raw_packet[index];
        index++;
        length--;
        var destination_pan = Get_16Bit_Value(destination_pan_lsb, destination_pan_msb);
        ieee_frame["Destination PAN"] = "0x" + destination_pan.toString(16);
        
        if(length === 0) {
            log("Length became 0");
            return null;
        }
        var destination_msb = raw_packet[index];
        index++;
        length--;
        if(length === 0) {
            log("Length became 0");
            return null;
        }
        var destination_lsb = raw_packet[index];
        index++;
        length--;
        if(length === 0) {
            log("Length became 0");
            return null;
        }
        var destination = Get_16Bit_Value(destination_lsb, destination_msb);
        ieee_frame.Destination = "0x" + destination.toString(16);
        
        var source_msb = raw_packet[index];
        index++;
        length--;
        if(length === 0) {
            log("Length became 0");
            return null;
        }
        var source_lsb = raw_packet[index];
        index++;
        length--;
        if(length === 0) {
            log("Length became 0");
            return null;
        }
        var source = Get_16Bit_Value(source_lsb, source_msb);
        if(source === 0x0000) {
            ieee_frame["Source"] = "0x0000"
        } else {
            ieee_frame["Source"] = "0x" + source.toString(16);
        }
        
        parsed_ieee_frame = {"index": index, "length": length, "ieee_frame": ieee_frame, "packet_end": false, "fcs": fcs};
    } else {
        log("Beacon and MAC command frames types parsing not yet supported");
    }

    
    return parsed_ieee_frame;
}