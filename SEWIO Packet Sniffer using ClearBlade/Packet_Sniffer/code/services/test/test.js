function test(req, resp){
    var frame_control_field = 0x8841;
    if((frame_control_field & 1<<0) !== 0) {
        if((frame_control_field & 1<<1) !== 0) {
            if((frame_control_field & 1<<2) !== 0) {
                log("error mac");
            } else {
                log("MAC Command");
            }
        } else {
            if((frame_control_field & 1<<2) !== 0) {
                log("error data");
            } else {
                log("Data");
            }
        }
    } else {
        if((frame_control_field & 1<<1) !== 0) {
            if((frame_control_field & 1<<2) !== 0) {
                log("error ack");
            } else {
                log("Ack");
            }
        } else {
            if((frame_control_field & 1<<2) !== 0) {
                log("error beacon");
            } else {
                log("Beacon");
            }
        }
    }
    
    resp.success("OK");
}