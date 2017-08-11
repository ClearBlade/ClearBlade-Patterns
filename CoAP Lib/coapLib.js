
/******************************************************************************
 *                                                                            *
 *   /$$$$$$             /$$$$$$  /$$$$$$$        /$$       /$$ /$$           *
 *  /$$__  $$           /$$__  $$| $$__  $$      | $$      |__/| $$           *
 * | $$  \__/  /$$$$$$ | $$  \ $$| $$  \ $$      | $$       /$$| $$$$$$$      *
 * | $$       /$$__  $$| $$$$$$$$| $$$$$$$/      | $$      | $$| $$__  $$     *
 * | $$      | $$  \ $$| $$__  $$| $$____/       | $$      | $$| $$  \ $$     *
 * | $$    $$| $$  | $$| $$  | $$| $$            | $$      | $$| $$  | $$     *
 * |  $$$$$$/|  $$$$$$/| $$  | $$| $$            | $$$$$$$$| $$| $$$$$$$/     *
 *  \______/  \______/ |__/  |__/|__/            |________/|__/|_______/      *
 *                                                                            *
 *                                                                            *
 *  Written in accordance to https://tools.ietf.org/html/rfc7252              *
 *                                                                            *
 ******************************************************************************/

function CoAP(){

    // PARSING HELPER FUNCTIONS

    function intArrToHexString(arr){
        return (arr.map(function(x){var y=x.toString(16);return x<16?'0'+y:y})).join('');
    }

    function intArrToAsciiString(arr){
        return arr.map(function(x){return String.fromCharCode(x)}).join("");
    }

    function intArrToInt(arr){
        return parseInt(intArrToHexString(arr),16);
    }
    
    function splitByte(toSplit){
        var byte = toSplit;
        var ret = [];
        ret = ret.concat((byte&0xF0)>>4);
        ret = ret.concat(byte&0x0F);
        return ret;
    }

    function splitHalfByte(toSplit){
        var halfByte = toSplit;
        var ret = [];
        ret = ret.concat((halfByte&0xC)>>2);
        ret = ret.concat(halfByte&0x3);
        return ret;
    }
    
    function mapRequest(reqType){
        ret = "Invalid request type";
        switch(reqType){
            case 0:
                ret = "Confirmable";
                break;
            case 1:
                ret = "Non-confirmable";
                break;
            case 2:
                ret = "Acknowledgement";
                break;
            case 3:
                ret = "Reset";
                break;
        }
        return ret;
    }

    function mapFormat(formatNum){
        switch(formatNum){
            case 0:
                return "text/plain;charset=utf-8";
            case 40:
                return "application/link-format";
            case 41:
                return "application/xml";
            case 42:
                return "application/octet-stream";
            case 47:
                return "application/exi";
            case 50:
                return "application/json";
            default:
                return "invalid format";
        }
    }
    
    function mapCommand(command){
        ret = [];
        if(command<32){
            ret = ret.concat(["Request"]);
        }else{
            ret = ret.concat(["Response"]);
        }
        switch(command){
            case 0:
                return ret.concat(["0.00", "Empty message"]); 
            case 1:
                return ret.concat(["0.01", "GET"]);
            case 2:
                return ret.concat(["0.02", "POST"]);
            case 3:
                return ret.concat(["0.03", "PUT"]);
            case 4:
                return ret.concat(["0.04", "DELETE"]);
        }
        return ["Invalid command", null, null];
    }
    
    function mapOptions(optionNum, optionVal){
        var ret = ["invalid option", optionVal];
        switch(optionNum){
            case 1:
                ret[0] = "If-Match";
                // ret[1] is opaque
                break;
            case 3:
                ret[0] = "Uri-Host";
                ret[1] = intArrToAsciiString(ret[1]);
                break;
            case 4:
                ret[0] = "ETag";
                // ret[1] is opaque
                break;
            case 5:
                ret[0] = "If-None-Match";
                // ret[1] is empty
                break;
            case 7:
                ret[0] = "Uri-Port";
                ret[1] = intArrToInt(ret[1]);
                break;
            case 8:
                ret[0] = "Location-Path";
                ret[1] = intArrToAsciiString(ret[1]);
                break;
            case 11:
                ret[0] = "Uri-Path";
                ret[1] = intArrToAsciiString(ret[1]);
                break;
            case 12:
                ret[0] = "Content-Format";
                ret[1] = mapFormat(intArrToInt(ret[1]));
                break;
            case 14:
                ret[0] = "Max-Age";
                ret[1] = intArrToInt(ret[1]);
                break;
            case 15:
                ret[0] = "Uri-Query";
                ret[1] = intArrToAsciiString(ret[1]);
                break;
            case 17:
                ret[0] = "Accept";
                ret[1] = mapFormat(intArrToInt(ret[1]));
                break;
            case 20:
                ret[0] = "Location-Query";
                ret[1] = intArrToAsciiString(ret[1]);
                break;
            case 35:
                ret[0] = "Proxy-Uri";
                ret[1] = intArrToAsciiString(ret[1]);
                break;
            case 39:
                ret[0] = "Proxy-Scheme";
                ret[1] = intArrToAsciiString(ret[1]);
                break;
            case 60:
                ret[0] = "Size1";
                ret[1] = intArrToInt(ret[1]);
                break;
        }
        return ret;
    }

    // BUILDING HELPER FUNCTIONS
    
    function mapBackCommand(command){
        switch(command){
            case "0.00":
            case "EMPTY":
            case "EMPTY MESSAGE":
                return 0;
            case "0.01":
            case "GET":
                return 1;
            case "0.02":
            case "POST":
                return 2;
            case "0.03":
            case "PUT":
                return 1;
            case "0.04":
            case "DELETE":
                return 2;
        }
    }


    // ACCESSIBLE FUNCTIONS
    
    function parseCoAP(buffer){
        var buf = buffer.slice();
        var packet = {}
        var firstByte = splitByte(buf.shift());
        var firstHalfByte = splitHalfByte(firstByte[0]);
        packet["CoAP Version"] = firstHalfByte[0];
        packet["Request Type"] = mapRequest(firstHalfByte[1]);
        var tokenLength = firstByte[1];
        var command = mapCommand(buf.shift());
        packet["Command"] = {
            Type: command[0],
            Code: command[1],
            Name: command[2]
        };
        packet["Message ID"] = intArrToHexString([].concat(buf.splice(0,2)));
        packet["Token"] = intArrToHexString([].concat(buf.splice(0,tokenLength)));
        var options = {};
        var prevOptions = 0;
        while(buf.length>0){
            var option = buf.shift();
            var optionSplit = splitByte(option);
            var delta;
            var len = optionSplit[1];
            if(option===0xFF){
                options.Payload = buf.slice();
                buf = [];
            }else{
                switch(optionSplit[0]){
                    case 0xF:
                        if(optionSplit[1]!==0xF){
                            return{
                                "Error": "Message format error",
                                "Details": "Encountered an option delta of 15 and it's not the payload marker"
                            };
                        }
                        break;
                    case 0xE:
                        delta = parseInt(intArrToHexString([].concat(buf.splice(0,2))),16)-269;
                        break;
                    case 0xD:
                        delta = buf.shift()-13;
                        break;
                    default:
                        delta = optionSplit[0];
                        break;
                }
                option = prevOptions+delta;
                prevOptions += option;
                switch(len){
                    case 0xF:
                        return{
                            "Error": "Message format error",
                            "Details": "Encountered an option length of 15"
                        };
                    case 0xE:
                        len = parseInt(intArrToHexString([].concat(buf.splice(0,2))),16)-269;
                        break;
                    case 0xD:
                        len = buf.shift()-13;
                        break;
                    default:
                        break;
                }
                option = mapOptions(option, [].concat(buf.splice(0,len)));
                options[option[0]] = option[1];
            }
        }
        if(Object.keys(options).length){
            packet["Options"] = options;
        }
        return packet;
    }

    /*
        {
          "CoAP Version": 1,
          "Request Type": "Confirmable",
          "Command": {
            "Code": "0.02",
            "Name": "POST",
            "Type": "Request"
          },
          "Message ID": "0001",
          "Token": "00",
          "Options": {
            "Content-Format": "application/octet-stream",
            "Payload": [
              0,
              255,
              0,
              0,
              0
            ],
            "Uri-Path": "rgbclick"
          }
        }
     */

    function buildCoAP(options){
        var reqType = options["Request Type"].toUpperCase();
        var command = options["Command"].toUpperCase();
        var messageID = parseInt(options["Message ID"]);
        var token = parseInt(options["Token"]);
        log(reqType)
        log(command+"::"+mapBackCommand(command))
        log(messageID)
        log(token)
    }
    
    return {
        parse: parseCoAP,
        build: buildCoAP
    }
}    
