function Get_Hex_Array(raw_packet) {
    raw_packet = raw_packet.match(/.{1,2}/g);
    
    for(var i = 0; i < raw_packet.length; i++) {
        raw_packet[i] = "0x" + raw_packet[i];
        raw_packet[i] = parseInt(raw_packet[i]);
    }
    
    return raw_packet;
}