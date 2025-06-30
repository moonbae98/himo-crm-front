/*********************************************************************
 *   socket_frame.js
 *********************************************************************/
var event_num = 0;
var socket = null;
var B_MEMBER_STATUS = "0";
var C_MEMBER_STATUS = "0";
var version = 1;
var company_id = "";
var userid = "";

$(document).ready(function () {
  //비우기버튼
  $("#remove_btn").click(function () {
    remove_box();
  });
});

function remove_box() {
  event_num = 0;
  $("#snd_text").val("");
}
function setLogout() {
  event_num = 0;
  //socket = null;
  B_MEMBER_STATUS = "0";
  C_MEMBER_STATUS = "0";
}

//------------서버연동 ------------
function ConnectServer(
  nodejs_connector_url,
  l_company_id,
  l_userid,
  exten,
  passwd,
  first_status,
  from_ui
) {
  userid = l_userid;
  company_id = l_company_id;

  displayText("I", "NODEJS_URL(" + nodejs_connector_url + ")");
  displayText(
    "S",
    "로긴정보보내기(" + company_id + "," + userid + "," + passwd + ")"
  );
  try {
    if (nodejs_connector_url.indexOf("https") > -1) {
      socket = io.connect(nodejs_connector_url, {
        secure: true,
        reconnect: true,
        resource: "socket.io",
      });
    } else {
      socket = io.connect(nodejs_connector_url, {
        reconnect: true,
        resource: "socket.io",
      });
    }

    socket.on("connect", function () {
      //multi_yn 은 설정에 따름으로 변경되서 삭제조치됨
      parseMessage("NODEJS|KIND:CONNECT_OK");
      if (socket != null) {
        socket.emit("climsg_login", {
          company_id: company_id,
          userid: userid,
          exten: exten,
          passwd: passwd,
          first_status: first_status,
          from_ui: from_ui,
          version: version,
        });
      } else {
        parseMessage("NODEJS|KIND:CONNECT_OK_LOGOUT");
      }
    });
    //20210826-추가
    socket.on("svcmsg_login", function (data) {
      //version=1
      var l_company_id = data.company_id;
      var l_userid = data.userid;
      var l_group_join_id = data.group_join_id;
      var l_my_join_id = data.my_join_id;
      var login_result = data.login_result;
      parseMessage(login_result);
    });
    socket.on("svcmsg_logout", function () {
      //alert("[socket_frame.js][ConnectServer][svcmsg_logout]");
      alert("로그아웃되었습니다.");
      parent.logoutfromserver();
      socket.disconnect();
    });
    socket.on("svcstt", function (data) {
      parseStt(data);
    });
    socket.on("svcloginerror", function (data) {
      //only version=0
      var l_company_id = data.company_id;
      var l_userid = data.userid;
      var error = data.error;
      alert("[socket_frame.js][ConnectServer][svcloginerror]" + error);
    });
    socket.on("svcmsg", function (data) {
      parseMessage(data);
    });
    socket.on("svcmsg_ping", function () {
      socket.emit("climsg_pong");
    });
    socket.on("svcmsg_relogin", function () {
      //재로긴을 하라고하거나 자동으로 재로긴한다
      alert("재로그인하겠습니다.");
      ConnectServer(
        nodejs_connector_url,
        company_id,
        userid,
        exten,
        passwd,
        first_status,
        from_ui
      );
    });

    // socket.on('svcmsg_monit_start', function(data) {
    //         console.log(data);
    //         var jsonstr = JSON.stringify(data);
    //         displayText("C","\n\tsocket.on['svcmsg_monit_start']\n\t"+jsonstr);
    // });
    // socket.on('svcmsg_monit_stop', function(data) {
    //         console.log(data);
    //         var jsonstr = JSON.stringify(data);
    //         displayText("C","\n\tsocket.on['svcmsg_monit_start']\n\t"+jsonstr);
    // });
    // socket.on('svcmsg_stt', function(data) {
    //         console.log(data);
    //         var jsonstr = JSON.stringify(data);
    //         displayText("C","\n\tsocket.on['svcmsg_stt']\n\t"+jsonstr);
    // });
    // socket.on('svcmsg_keyword', function(data) {
    //         console.log(data);
    //         var jsonstr = JSON.stringify(data);
    //         displayText("C","\n\tsocket.on['svcmsg_keyword']\n\t"+jsonstr);
    // });
    // socket.on('svcmsg_message', function(data) {
    //         console.log(data);
    //         var jsonstr = JSON.stringify(data);
    //         displayText("C","\n\tsocket.on['svcmsg_message']\n\t"+jsonstr);
    // });
    // //어드민으로서 모니터링용
    // socket.on('admmonit_login', function(data) {
    //         console.log(data);
    //         var jsonstr = JSON.stringify(data);
    //         displayText("C","\n\tsocket.on['admmonit_login']\n\t"+jsonstr);
    //
    // });
    // socket.on('admmonit_logout', function(data) {
    //         console.log(data);
    //         var jsonstr = JSON.stringify(data);
    //         displayText("C","\n\tsocket.on['admmonit_logout']\n\t"+jsonstr);
    // });
    // socket.on('admmonit_call_start', function(data) {
    //         console.log(data);
    //         var jsonstr = JSON.stringify(data);
    //         displayText("C","\n\tsocket.on['admmonit_call_start']\n\t"+jsonstr);
    // });
    // socket.on('admmonit_call_end', function(data) {
    //         console.log(data);
    //         var jsonstr = JSON.stringify(data);
    //         displayText("C","\n\tsocket.on['admmonit_call_end']\n\t"+jsonstr);
    // });
    // socket.on('admmonit_stt', function(data) {
    //         console.log(data);
    //         var jsonstr = JSON.stringify(data);
    //         displayText("C","\n\tsocket.on['admmonit_stt']\n\t"+jsonstr);
    // });
    // socket.on('admmonit_keyword', function(data) {
    //         console.log(data);
    //         var jsonstr = JSON.stringify(data);
    //         displayText("C","\n\tsocket.on['admmonit_keyword']\n\t"+jsonstr);
    // });

    socket.on("disconnect", function () {
      //socket = null;
      //socket = null;
      // parseMessage("NODESVC_STATUS|KIND:DISCONNECT");
    });
    socket.on("error", function () {
      //parseMessage("NODESVC_STATUS|KIND:ERROR");
    });
    socket.on("end", function () {
      //parseMessage("NODESVC_STATUS|KIND:END");
    });
    socket.on("close", function () {
      //parseMessage("NODESVC_STATUS|KIND:CLOSE");
    });
  } catch (error) {
    alert(
      "[socket_frame.js][ConnectServer][catch]서버가 정상인지 확인후 사용해주세요"
    );
  }
}

// function AssistSendCommand2Socket(strCommand, param, param2) {
//     if(socket != null) {
//         displayText("S", strCommand);
//         var json_data = null;
//         if(strCommand == "MONIT_START" || strCommand == "MONIT_STOP") {
//             json_data = {
//                     company_id : company_id,
//                     userid : userid,
//                     target_userid : param,
//                     command : strCommand
//             };
//         } else if(strCommand == "SEND_MSG") {
//             json_data = {
//                     company_id : company_id,
//                     userid : userid,
//                     target_userid : param,
//                     message : param2,
//                     command : strCommand
//             };
//         } else {
//             json_data = {
//                     company_id : company_id,
//                     userid : userid,
//                     command : strCommand
//             };
//         }
//
//         socket.emit('climsg_command', json_data);
//         console.log(json_data);
//         var jsonstr = JSON.stringify(json_data);
//         displayText("S","\n\tsocket.emit['climsg_command']\n\t"+jsonstr);
//     } else {
//     }
//     return false;
// }

//------------서버로 명령어보내기 ------------
function SendCommand2Socket(strCommand) {
  if (socket != null) {
    displayText("S", strCommand);
    //socket.emit('climsg_command',strCommand);
    socket.emit("climsg_command", {
      company_id: company_id,
      userid: userid,
      command: strCommand,
    });
  } else {
    //parseMessage("NODESVC_STATUS|KIND:RELOADED");
  }
  return false;
}

function parseNodeSvc(kind) {
  alert("[socket_frame.js][parseNodeSvc]Nodejs 서버 장애[" + kind + "]");
  parent.logoutfromserver();
}
function parseLogout(kind) {
  parent.logoutfromserver();
}
function parseBye(kind, uid, name) {
  alert("[socket_frame.js][parseBye][" + kind + "]" + name + "(" + uid + ")");
  parent.logoutfromserver();
}
function parseStt(data) {
  parent.parseSttData(data);
}
function parseMessage(msg) {
  displayText("R", msg);
  var msgs = msg.split("|");
  if (msgs == null || msgs.length < 2) {
    return;
  }

  var Insp = new Object();
  var event = msgs[0];
  for (i = 1; i < msgs.length; i++) {
    var keyval = msgs[i].split(":");
    var tmp_val = "";
    for (j = 1; j < keyval.length; j++) {
      if (keyval[j] != null) {
        if (j > 1) {
          tmp_val = tmp_val + ":" + keyval[j];
        } else {
          tmp_val = tmp_val + keyval[j];
        }
      }
    }

    Insp[keyval[0]] = tmp_val;
  }

  var kind = Insp["KIND"];
  var peer = Insp["PEER"];
  var data0 = Insp["DATA0"];
  var data1 = Insp["DATA1"];
  var data2 = Insp["DATA2"];
  var data3 = Insp["DATA3"];
  var data4 = Insp["DATA4"];
  var data5 = Insp["DATA5"];
  var data6 = Insp["DATA6"];
  var data7 = Insp["DATA7"];
  var data8 = Insp["DATA8"];
  var data9 = Insp["DATA9"];
  var data10 = Insp["DATA10"];
  var data11 = Insp["DATA11"];
  var data12 = Insp["DATA12"];

  if (event == "LOGIN") {
    if (kind == "LOGIN_OK" || kind == "LOGIN_ALREADY") {
      SendCommand2Socket("CMD|LOGIN_ACK");
    }

    parent.parseLogin(
      kind,
      data1,
      data2,
      data3,
      data4,
      data5,
      data6,
      data7,
      data8,
      data9
    );
    return;
  } else if (event == "PEER") {
    parent.parsePhoneStatus(data2);
    return;
  } else if (event == "MEMBERSTATUS") {
    if (C_MEMBER_STATUS != "1") {
      B_MEMBER_STATUS = C_MEMBER_STATUS;
    }

    C_MEMBER_STATUS = kind;
    parent.parseMemberStatus(kind);
  } else if (event == "CALLEVENT") {
    //내선일때 팝업을 막고 싶다면
    if (
      (data1.length == 3 && data2.length == 3) ||
      (data1.length == 4 && data2.length == 4)
    ) {
      return;
    }
    parent.parseCallEvent(
      kind,
      data1,
      data2,
      data3,
      data4,
      data5,
      data6,
      data7,
      data8,
      data9,
      data10,
      data11,
      data12
    );
    return;
  } else if (event == "HANGUPEVENT") {
    if (data8 == "" && data1.length == 3 && data2.length == 3) {
      data8 = B_MEMBER_STATUS;
    } else if (data8 == "") {
      data8 = "NORMAL";
    }
    SendCommand2Socket("CMD|HANGUP_ACK|" + data5 + "," + data8);
    parent.parseHangupEvent(
      kind,
      data1,
      data2,
      data3,
      data4,
      data7,
      data8,
      data9,
      data10,
      data11
    );
    return;
  } else if (event == "SAME_USERID") {
    parent.parseSameUserId(kind, data1, data2);
  } else if (event == "RECORDSTATUS") {
    parent.parsePartRecord(kind, data1, data2);
  } else if (event == "CALLBACKEVENT") {
    //parent.parseCallbackCnt(data1,'evet');
    return;
  } else if (event == "MULTICHANNEL") {
    parent.parseMultiCnt(data1, "event");
    return;
  } else if (event == "FORWARDING") {
    if (kind == "OK") {
      //parseForwarding(data1,data2);
    }
    return;
  } else if (event == "CALLSTATUS") {
    parent.parseCallStatus(kind, data1, data2);
    return;
  } else if (event == "DTMFREADEVENT") {
    parent.parseDTMFRead(kind);
  } else if (event == "PDSMEMBERSTATUS") {
    parent.parsePDSMemberStatus(kind);
  } else if (event == "PDS_READY") {
    //parent.parsePDSReady(kind,data1,data2,data3,data4,data5,data6,data7);
    return;
  } else if (event == "PDS_STOP") {
    //parent.parsePDSStop(kind,data1,data2);
    return;
  } else if (event == "PDS_START") {
    //parent.parsePDSStart(kind,data1,data2);
    return;
  } else if (event == "PDS_DELETE") {
    //parent.parsePDSDelete(kind,data1,data2);
    return;
  } else if (event == "PDS_STAT") {
    //parent.parsePDSStat(kind,data1,data2,data3,data4);
    return;
  } else if (event == "PDS_STATUS") {
    //parent.parsePDSStatus(kind,data1,data2,data3);
    return;
  } else if (event == "SERVER_STATUS") {
    //parseLogout(kind);
  } else if (event == "NODESVC_STATUS") {
    parseNodeSvc(kind);
  } else if (event == "BYE") {
    if (kind == "SAME_UID") {
      //alert("[socket_frame.js][parseMessage]다른 컴퓨터에서 같은 아이디로 로긴되어서 서버와 끊김");
      alert("다른 PC에서 로그인되어 있어, 현재 접속을 종료합니다.");
      parent.logoutfromserver();
      socket.disconnect();
    } else if (kind == "SAME_PID") {
      alert("다른 PC에서 내선번호를 등록하여, 현재 접속을 종료합니다.");
      parent.logoutfromserver();
      socket.disconnect();
    }
    //parseBye(kind,data1,data3);
  } else if (event == "HOLD_START") {
    if (kind == "OK") {
      alert("보류 시작");
    }
  } else if (event == "HOLD_STOP") {
    if (kind == "OK") {
      alert("보류끝");
    }
  } else {
    //alert("ELSE:"+msg);
  }
  return;
}

function displayText(fsend, text) {
  event_num = event_num + 1;
  if (fsend == "S") {
    $("#snd_text").val(
      $("#snd_text").val() + "\nC->S[" + event_num + "] " + text
    );
  } else {
    $("#snd_text").val(
      $("#snd_text").val() + "\nS->C[" + event_num + "] " + text
    );
  }
}
