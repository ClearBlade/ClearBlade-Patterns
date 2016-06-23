function ParsePacket(req, resp){
    //var raw_packet = "455803010e8ad000ff000004682dd0e97b0000015d0400000000000000000033418895ad8fffff00000912fcff00001e9e43b5090000a322002871500d0043b5090000a32200009c203b9b6d9640b6eb90e780";
    var raw_packet = req.params.packet;
    raw_packet = Get_Hex_Array(raw_packet);
    parsed_zep_header = Parse_ZEP_Header(raw_packet);
    var parsed_packet;
 
    if(parsed_zep_header === null) {
        resp.success("Error parsing ZEP header");
    } else {
        parsed_IEEE_frame = Parse_IEEE_Frame(raw_packet, parsed_zep_header.index, parsed_zep_header.header["Length"]);
        if(parsed_IEEE_frame === null) {
            resp.success({"Zigbee Encapsulation Protocol Header": parsed_zep_header.header, "IEEE 802.15.4 Frame": "Error parsing IEEE frame"});
            log('{"Zigbee Encapsulation Protocol Header": parsed_zep_header.header, "IEEE 802.15.4 Frame": "Error parsing IEEE frame"}');
        } else {
            if(parsed_IEEE_frame.packet_end === true) {
                parsed_packet = {"Zigbee Encapsulation Protocol Header": parsed_zep_header.header, "IEEE 802.15.4 Frame": parsed_IEEE_frame.ieee_frame, "Frame Check Sequence": parsed_IEEE_frame.fcs};
                log(JSON.stringify(parsed_packet));
                resp.success(parsed_packet);
            } else {
                parsed_zigbee_network_layer = Parse_Zigbee_Network_Layer_Data(raw_packet, parsed_IEEE_frame.index, parsed_IEEE_frame.length);
                if(parsed_zigbee_network_layer === null) {
                    parsed_packet = {"Zigbee Encapsulation Protocol Header": parsed_zep_header.header, "IEEE 802.15.4 Frame": parsed_IEEE_frame.ieee_frame, "Zigbee Network Layer Data": "Error parsing Zigbee Network Layer Data"};
                    log(JSON.stringify(parsed_packet));
                    resp.success(parsed_packet);
                } else {
                    parsed_packet = {"Zigbee Encapsulation Protocol Header": parsed_zep_header.header, "IEEE 802.15.4 Frame": parsed_IEEE_frame.ieee_frame, "Zigbee Network Layer Data": parsed_zigbee_network_layer.znld, "Data": parsed_zigbee_network_layer.data, "Frame Check Sequence": parsed_zigbee_network_layer.fcs};
                    log(JSON.stringify(parsed_packet));
                }
            }
            
            resp.success(parsed_packet);
        }
    }
}