function Get_16Bit_Value(msb, lsb) {
    var MSB = msb << 8;
    var LSB = lsb & 0x00FF
    var whole = MSB | LSB;
    
    return whole;
}

function Get_32Bit_Value(msb1, msb, lsb1, lsb) {
    var MSB1 = msb1 << 32;
    var MSB = msb << 16;
    var LSB1 = lsb1 << 8;
    var LSB = lsb & 0x000000FF;
    var whole = MSB1 | MSB | LSB1 | LSB;
    
    return whole;
}