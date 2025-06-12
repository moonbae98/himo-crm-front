/*********************************************************************
*   화일명:main.js
*   EICN 에서 제공하는 전화 이벤트 연동 javascript
*********************************************************************/
var PhoneNum="";
var PhonePeer="";
var UserName="";
var PhoneStatus = "";
var FORWARD_WHEN = "";
var FORWARD_NUM = "";
var MemberStatus = "";
var socket_frame_obj = null;
var MULTIYN = "";

//UI 연동
$(document).ready(function() {

	//socket_frame 에 socket_frame.html 수행시킴
	socket_frame_obj = $('#socket_frame');
	if (socket_frame_obj != null && socket_frame_obj.length > 0) {
		  socket_frame_obj.attr("src","socket_frame.html");
	}

  //-------------로그인/로그아웃 시작--------------
  //로긴버튼
  $("#login_btn").click(function(){
    login();
  });

  //로그아웃버튼
  $("#logout_btn").click(function(){
    logout("LOGOUT");
  });

  //전체로그아웃버튼
  $("#logoutall_btn").click(function(){
    logout("LOGOUTALL");
  });
  //-------------로그인/로그아웃 종료--------------

  //-------------상담원상태변경 시작--------------
  $("#memberstatus0").click(function(){
    command_memberstatus('0');
  });

  $("#memberstatus1").click(function(){
    alert("상담중 상태는 콘트롤할수 없음");
		//command_memberstatus('1');
  });

  $("#memberstatus2").click(function(){
    command_memberstatus('2');
  });

  $("#memberstatus3").click(function(){
		command_memberstatus('3');
  });

  $("#memberstatus4").click(function(){
		command_memberstatus('4');
  });

  $("#memberstatus5").click(function(){
		command_memberstatus('5');
  });

  $("#memberstatus6").click(function(){
	  command_memberstatus('6');
  });

  $("#memberstatus7").click(function(){
		command_memberstatus('7');
  });

  $("#memberstatus8").click(function(){
		command_memberstatus('8');
  });
  //-------------상담원상태변경 종료--------------

  //-------------전화콘트롤 시작--------------
	//전화걸기버튼
  $("#dial_btn").click(function(){
		command_click2call();
  });

  //전화받기버튼
  $("#receive_btn").click(function(){
		command_receive();
  });

  //전화끊기버튼
  $("#hangup_btn").click(function(){
		command_hangup();
  });

  //당겨받기버튼
  $("#pickup_btn").click(function(){
		command_pickup();
  });

  //돌려주기버튼-어텐디드
  $("#attended_btn").click(function(){
		command_attended();
  });

  //돌려주기버튼-블라인드
  $("#redirect_btn").click(function(){
		command_redirect();
  });

  //돌려주기 전화끊기버튼
  $("#attended_hangup_btn").click(function(){
		command_attended_hangup();
  });

  //돌려주기버튼-외부어텐디드
  $("#attendedout_btn").click(function(){
		command_attended_out();
  });

  //돌려주기버튼-외부어텐디드
  $("#redirectout_btn").click(function(){
		command_redirect_out();
  });

  //돌려주기버튼-블라인드
  $("#redirecthunt_btn").click(function(){
		command_redirecthunt();
  });

  //착신전환버튼
  $("#forward_btn").click(function(){
		command_forwarding();
  });

  //메세지보내기
  $("#lastevent_btn").click(function(){
		command_lastevent();
  });

  //메세지보내기
  $("#msg_btn").click(function(){
		command_msg();
  });

  //엿듣기버튼
  $("#spy_btn").click(function(){
		command_spy();
  });

  //카드번호시작
  $("#ydtmf_btn").click(function(){
    command_dtmf('Y');
  });

  //카드번호종료
  $("#ndtmf_btn").click(function(){
    command_dtmf('N');
  });

  //부분녹취시작
  $("#ars_btn").click(function(){
    command_ars();
  });

  //부분녹취시작
  $("#ars_conn").click(function(){
    SendCommand("MENT_PLAY|1");
  });

	//부분녹취시작
  $("#srec_btn").click(function(){
		command_rec('start');
  });

  //부분녹취종료
  $("#erec_btn").click(function(){
	  command_rec('stop');
  });

  //보류시작
  $("#shold_btn").click(function(){
	  command_hold('start');
  });

  //보류종료
  $("#ehold_btn").click(function(){
		command_hold('stop');
  });

  //다자간통화
  $("#multi_start_btn").click(function(){
	  command_multi_start();
  });

  //다자간통화
  $("#multi_end_btn").click(function(){
    command_multi_end();
  });

  //고객과녹취듣기
  $("#recplay_start_btn").click(function(){
		command_recplay_start();
  });

  //다자간통화
  $("#recplay_end_btn").click(function(){
		command_recplay_end();
  });
  //-------------전화콘트롤 종료--------------
});

//-------------로그인/로그아웃 함수 시작--------------
function login() {
    var userid=$("#userid").val();
    var exten=$("#exten").val();
    var passwd=$("#passwd").val();
    var company_id=$("#company_id").val();
    var first_status=$("#first_status").val();
    //var multi_yn=$("#multi_yn").val();
    var nodejs_connector_url=$("#nodejs_connector_url").val();
    if(company_id == "" || userid == "" || passwd == "" || nodejs_connector_url=="") {
        alert("로긴 정보를 모두 입력하세요");
        return;
    }

    //패스워드암호화
    var passwd_sha=hex_sha512(passwd);

    //화면에서 가져오는걸로 수정됨
    //소켓프레임으로 IPCC서버 로긴을 요청함
    var from_ui = "API";
    socket_frame_obj = $('#socket_frame');
    if(socket_frame_obj != null && socket_frame_obj.length > 0) {
        socket_frame_obj[0].contentWindow.ConnectServer(nodejs_connector_url,company_id,userid,exten,passwd_sha,first_status,from_ui);
    }
}

//------------서버로 명령어 보내기 ------------
function SendCommand(strCommand) {
    if((PhoneNum == null || PhoneNum == "") && strCommand != "LOGOUT") {
        alert("로긴후 사용해주세요");
        return false;
    }

    var cmd = "CMD|"+strCommand;
    //소켓프레임으로 명령어 전달
    if(socket_frame_obj != null && socket_frame_obj.length > 0) {
		    socket_frame_obj[0].contentWindow.SendCommand2Socket(cmd);
	  }

    return false;
}
 
//-------------클릭투콜----------
function command_click2call() {
    var number = $("#number");
    var cid_num = $("#cid");
    if(number.length == 0 || number.val() == "") {
        alert("전화번호를 입력하세요");
        return;
    }

    alert(number.val()+"로 전화걸기");
    num = number.val();
    cid = cid_num.val();
	  SendCommand("CLICKDIAL|" + cid + "," + num);
    return false;
}

//----------버튼 콘트롤------------
function changeLogout() {
    //로긴버튼은 감추고 로그아웃버튼을 보여줌

    $("#LOGIN_DIV").hide();
    $("#login_btn").hide();

    $("#LOGIN_INFO_DIV").show();
    $("#logout_btn").show();
    $("#logoutall_btn").show();

    $("#LOGIN_INFO_DIV").html( "<img src='left_dot01.gif'> <b>[상담원:" + UserName + "/" + PhoneNum + "/" + PhonePeer + "]</b>");

    $("#STATUS_DIV").show();

    parseForwarding(FORWARD_NUM,FORWARD_WHEN);
    parsePhoneStatus(PhoneStatus);
    parseMemberStatus(MemberStatus);
    parsePDSMemberStatus('3');
    parseRecordType(RECORD_TYPE);
    parseMultiYN(MULTIYN);
}

//------------ 메세지 파서 함수 시작------------
//로긴
function parseLogin(kind,data1,data2,data3,data4, data5,data6,data7,data8, data9) {
    //LOGIN|KIND:LOGIN_OK|DATA1:300|DATA2:상담원1|DATA3:0|DATA4:OK|DATA5:11110002
    if(kind == "LOGIN_OK" || kind == "LOGIN_ALREADY") {
        PhoneNum=data1;
        UserName=data2;
        MemberStatus = data3;
        PhoneStatus = data4;
        PhonePeer=data5;
        FORWARD_WHEN = data6;
        FORWARD_NUM = data7;
        RECORD_TYPE = data8;
        MULTIYN = data9;

        //setTimeout("changeLogout()",1000);
        changeLogout();
    } else if(kind == "LOGOUT"){
        alert("로그아웃");
    } else {
        alert("로긴 실패(" + data1 + ")");
    }
    return;
}
function parseSameUserId(kind,data1,data2) {
    if(kind == "LOGIN") {
      //같은아이디로 로그인

    } else {
      //같은아이디에서 로그아웃
    }
}

function parseSttData(data) {
    //var datastr = JSON.stringify(data);
    if (data == null) {
        return;
    }
    var extension = data.extension;
    var text = data.data.text;
    displayText("I", "[" + extension + "]" + text);
}

function parseCallStatus(kind,data1,data2) {
    if(kind == "REDIRECT") {
        if(data2 == "NOCHAN") {
            //alert("돌려주기할 채널이 없음");
            return;
        } else if(data2 == "BUSY") {
            //alert(data1+"이 통화중");
            return;
        }
    }
}

function parseCallEvent(kind,data1,data2,data3,data4,data5,data6) {
    if(kind == "IR") {
        displayText("I", PhoneNum+" 인바운드 전화가 ["+data1+"]에서 왔음");
    } else if(kind == "ID") {
        displayText("I", PhoneNum+" 인바운드 전화 ["+data1+"]와 통화중");
    } else if(kind == "OR") {
        displayText("I", PhoneNum+" 아웃바운드 전화 ["+data1+"]와 시도중");
    } else if(kind == "OD") {
        displayText("I", PhoneNum+" 아웃바운드 전화 ["+data1+"]와 통화중");
    } else if(kind == "PICKUP") {
        displayText("I", PhoneNum+" 당겨받기 전화 ["+data1+"]와 통화중");
    }

    return;
}
 
function parseHangupEvent(kind,data1,data2,data3,data4) {
    displayText("I", "**" + PhoneNum + " 전화끊음 [" + data1 + "," + data2 + "]");
}
function parseDTMFRead(kind) {
    $("#dtmf_num").val($("#dtmf_num").val()+kind);
}
function parsePDSMemberStatus(kind) {
    var pdsstatus0 = $("#pdsstatus0");
    var pdsstatus1 = $("#pdsstatus1");
    var pdsstatus2 = $("#pdsstatus2");
    var pdsstatus3 = $("#pdsstatus3");

    if(kind == '0') {
        if(pdsstatus0.length > 0) {
            pdsstatus0.css("backgroundColor","yellow")
        };
        if(pdsstatus1.length > 0) {
            pdsstatus1.css("backgroundColor","white")
        };
        if(pdsstatus2.length > 0) {
           pdsstatus2.css("backgroundColor","white")
        };
        if(pdsstatus3.length > 0) {
            pdsstatus3.css("backgroundColor","white")
        };
    } else if(kind == '1') {
        if(pdsstatus0.length > 0) {
            pdsstatus0.css("backgroundColor","white")
        };
        if(pdsstatus1.length > 0) {
            pdsstatus1.css("backgroundColor","yellow")
        };
        if(pdsstatus2.length > 0) {
            pdsstatus2.css("backgroundColor","white")
        };
        if(pdsstatus3.length > 0) {
            pdsstatus3.css("backgroundColor","white")
        };
    } else if(kind == '2') {
        if(pdsstatus0.length > 0) {
            pdsstatus0.css("backgroundColor","white")
        };
        if(pdsstatus1.length > 0) {
           pdsstatus1.css("backgroundColor","white")
        };
        if(pdsstatus2.length > 0) {
            pdsstatus2.css("backgroundColor","yellow")
        };
        if(pdsstatus3.length > 0) {
            pdsstatus3.css("backgroundColor","white")
        };
    } else if(kind == '3') {
        if(pdsstatus0.length > 0) {
           pdsstatus0.css("backgroundColor","white")
        };
        if(pdsstatus1.length > 0) {
            pdsstatus1.css("backgroundColor","white")
        };
        if(pdsstatus2.length > 0) {
           pdsstatus2.css("backgroundColor","white")
        };
        if(pdsstatus3.length > 0) {
            pdsstatus3.css("backgroundColor","yellow")
        };
    } else {
        if(pdsstatus0.length > 0) {
            pdsstatus0.css("backgroundColor","white")
        };
        if(pdsstatus1.length > 0) {
            pdsstatus1.css("backgroundColor","white")
        };
        if(pdsstatus2.length > 0) {
            pdsstatus2.css("backgroundColor","white")
        };
        if(pdsstatus3.length > 0) {
            pdsstatus3.css("backgroundColor","white")
        };
    }
}
function parsePDSReady(kind,data1,data2,data3,data4,data5,data6,data7) {
}
function parseMemberStatus(kind) {
    MemberStatus = kind;
    var memberstatus0 = $("#memberstatus0");
    var memberstatus1 = $("#memberstatus1");
    var memberstatus2 = $("#memberstatus2");
    var memberstatus3 = $("#memberstatus3");
    var memberstatus4 = $("#memberstatus4");
    var memberstatus5 = $("#memberstatus5");
    var memberstatus6 = $("#memberstatus6");
    var memberstatus7 = $("#memberstatus7");
    var memberstatus8 = $("#memberstatus8");

    if(kind == '0') {
        if(memberstatus0.length > 0) {
          memberstatus0.css("backgroundColor","red")
        };
        if(memberstatus1.length > 0) {
          memberstatus1.css("backgroundColor","white")
        };
        if(memberstatus2.length > 0) {
          memberstatus2.css("backgroundColor","white")
        };
        if(memberstatus3.length > 0) {
          memberstatus3.css("backgroundColor","white")
        };
        if(memberstatus4.length > 0) {
          memberstatus4.css("backgroundColor","white")
        };
        if(memberstatus5.length > 0) {
          memberstatus5.css("backgroundColor","white")
        };
        if(memberstatus6.length > 0) {
          memberstatus6.css("backgroundColor","white")
        };
        if(memberstatus7.length > 0) {
          memberstatus7.css("backgroundColor","white")
        };
        if(memberstatus8.length > 0) {
          memberstatus8.css("backgroundColor","white")
        };
    } else if(kind == '1') {
        if(memberstatus0.length > 0) {
          memberstatus0.css("backgroundColor","white")
        };
        if(memberstatus1.length > 0) {
          memberstatus1.css("backgroundColor","red")
        };
        if(memberstatus2.length > 0) {
          memberstatus2.css("backgroundColor","white")
        };
        if(memberstatus3.length > 0) {
          memberstatus3.css("backgroundColor","white")
        };
        if(memberstatus4.length > 0) {
          memberstatus4.css("backgroundColor","white")
        };
        if(memberstatus5.length > 0) {
          memberstatus5.css("backgroundColor","white")
        };
        if(memberstatus6.length > 0) {
          memberstatus6.css("backgroundColor","white")
        };
        if(memberstatus7.length > 0) {
          memberstatus7.css("backgroundColor","white")
        };
        if(memberstatus8.length > 0) {
          memberstatus8.css("backgroundColor","white")
        };
    } else if(kind == '2') {
        if(memberstatus0.length > 0) {
          memberstatus0.css("backgroundColor","white")
        };
        if(memberstatus1.length > 0) {
          memberstatus1.css("backgroundColor","white")
        };
        if(memberstatus2.length > 0) {
          memberstatus2.css("backgroundColor","red")
        };
        if(memberstatus3.length > 0) {
          memberstatus3.css("backgroundColor","white")
        };
        if(memberstatus4.length > 0) {
          memberstatus4.css("backgroundColor","white")
        };
        if(memberstatus5.length > 0) {
          memberstatus5.css("backgroundColor","white")
        };
        if(memberstatus6.length > 0) {
          memberstatus6.css("backgroundColor","white")
        };
        if(memberstatus7.length > 0) {
          memberstatus7.css("backgroundColor","white")
        };
        if(memberstatus8.length > 0) {
          memberstatus8.css("backgroundColor","white")
        };
    } else if(kind == '3') {
        if(memberstatus0.length > 0) {
          memberstatus0.css("backgroundColor","white")
        };
        if(memberstatus1.length > 0) {
          memberstatus1.css("backgroundColor","white")
        };
        if(memberstatus2.length > 0) {
          memberstatus2.css("backgroundColor","white")
        };
        if(memberstatus3.length > 0) {
          memberstatus3.css("backgroundColor","red")
        };
        if(memberstatus4.length > 0) {
          memberstatus4.css("backgroundColor","white")
        };
        if(memberstatus5.length > 0) {
          memberstatus5.css("backgroundColor","white")
        };
        if(memberstatus6.length > 0) {
          memberstatus6.css("backgroundColor","white")
        };
        if(memberstatus7.length > 0) {
          memberstatus7.css("backgroundColor","white")
        };
        if(memberstatus8.length > 0) {
          memberstatus8.css("backgroundColor","white")
        };
    } else if(kind == '4') {
        if(memberstatus0.length > 0) {
          memberstatus0.css("backgroundColor","white")
        };
        if(memberstatus1.length > 0) {
          memberstatus1.css("backgroundColor","white")
        };
        if(memberstatus2.length > 0) {
          memberstatus2.css("backgroundColor","white")
        };
        if(memberstatus3.length > 0) {
          memberstatus3.css("backgroundColor","white")
        };
        if(memberstatus4.length > 0) {
          memberstatus4.css("backgroundColor","red")
        };
        if(memberstatus5.length > 0) {
          memberstatus5.css("backgroundColor","white")
        };
        if(memberstatus6.length > 0) {
          memberstatus6.css("backgroundColor","white")
        };
        if(memberstatus7.length > 0) {
          memberstatus7.css("backgroundColor","white")
        };
        if(memberstatus8.length > 0) {
          memberstatus8.css("backgroundColor","white")
        };
    } else if(kind == '5') {
        if(memberstatus0.length > 0) {
          memberstatus0.css("backgroundColor","white")
        };
        if(memberstatus1.length > 0) {
          memberstatus1.css("backgroundColor","white")
        };
        if(memberstatus2.length > 0) {
          memberstatus2.css("backgroundColor","white")
        };
        if(memberstatus3.length > 0) {
          memberstatus3.css("backgroundColor","white")
        };
        if(memberstatus4.length > 0) {
          memberstatus4.css("backgroundColor","white")
        };
        if(memberstatus5.length > 0) {
          memberstatus5.css("backgroundColor","red")
        };
        if(memberstatus6.length > 0) {
          memberstatus6.css("backgroundColor","white")
        };
        if(memberstatus7.length > 0) {
          memberstatus7.css("backgroundColor","white")
        };
        if(memberstatus8.length > 0) {
          memberstatus8.css("backgroundColor","white")
        };
    } else if(kind == '6') {
        if(memberstatus0.length > 0) {
          memberstatus0.css("backgroundColor","white")
        };
        if(memberstatus1.length > 0) {
          memberstatus1.css("backgroundColor","white")
        };
        if(memberstatus2.length > 0) {
          memberstatus2.css("backgroundColor","white")
        };
        if(memberstatus3.length > 0) {
          memberstatus3.css("backgroundColor","white")
        };
        if(memberstatus4.length > 0) {
          memberstatus4.css("backgroundColor","white")
        };
        if(memberstatus5.length > 0) {
          memberstatus5.css("backgroundColor","white")
        };
        if(memberstatus6.length > 0) {
          memberstatus6.css("backgroundColor","red")
        };
        if(memberstatus7.length > 0) {
          memberstatus7.css("backgroundColor","white")
        };
        if(memberstatus8.length > 0) {
          memberstatus8.css("backgroundColor","white")
        };
    } else if(kind == '7') {
        if(memberstatus0.length > 0) {
          memberstatus0.css("backgroundColor","white")
        };
        if(memberstatus1.length > 0) {
          memberstatus1.css("backgroundColor","white")
        };
        if(memberstatus2.length > 0) {
          memberstatus2.css("backgroundColor","white")
        };
        if(memberstatus3.length > 0) {
          memberstatus3.css("backgroundColor","white")
        };
        if(memberstatus4.length > 0) {
          memberstatus4.css("backgroundColor","white")
        };
        if(memberstatus5.length > 0) {
          memberstatus5.css("backgroundColor","white")
        };
        if(memberstatus6.length > 0) {
          memberstatus6.css("backgroundColor","white")
        };
        if(memberstatus7.length > 0) {
          memberstatus7.css("backgroundColor","red")
        };
        if(memberstatus8.length > 0) {
          memberstatus8.css("backgroundColor","white")
        };
    } else if(kind == '8') {
        if(memberstatus0.length > 0) {
          memberstatus0.css("backgroundColor","white")
        };
        if(memberstatus1.length > 0) {
          memberstatus1.css("backgroundColor","white")
        };
        if(memberstatus2.length > 0) {
          memberstatus2.css("backgroundColor","white")
        };
        if(memberstatus3.length > 0) {
          memberstatus3.css("backgroundColor","white")
        };
        if(memberstatus4.length > 0) {
          memberstatus4.css("backgroundColor","white")
        };
        if(memberstatus5.length > 0) {
          memberstatus5.css("backgroundColor","white")
        };
        if(memberstatus6.length > 0) {
          memberstatus6.css("backgroundColor","white")
        };
        if(memberstatus7.length > 0) {
          memberstatus7.css("backgroundColor","white")
        };
        if(memberstatus8.length > 0) {
          memberstatus8.css("backgroundColor","red")
        };
    } else {
        if(memberstatus0.length > 0) {
          memberstatus0.css("backgroundColor","white")
        };
        if(memberstatus1.length > 0) {
          memberstatus1.css("backgroundColor","white")
        };
        if(memberstatus2.length > 0) {
          memberstatus2.css("backgroundColor","white")
        };
        if(memberstatus3.length > 0) {
          memberstatus3.css("backgroundColor","white")
        };
        if(memberstatus4.length > 0) {
          memberstatus4.css("backgroundColor","white")
        };
        if(memberstatus5.length > 0) {
          memberstatus5.css("backgroundColor","white")
        };
        if(memberstatus6.length > 0) {
          memberstatus6.css("backgroundColor","white")
        };
        if(memberstatus7.length > 0) {
          memberstatus7.css("backgroundColor","white")
        };
        if(memberstatus8.length > 0) {
          memberstatus8.css("backgroundColor","white")
        };
    }
}
function parseRecordType(type) {
    var label = "녹취형태:";
    if(type == '') {
        return;
    }

    var rec = $("#record_type");
    if(rec.length > 0) {
        if(type == 'M') {
          rec.html(label + "전수녹취");
        } else if(type == 'P') {
          rec.html(label + "부분녹취");
        }
    }
}
function parseMultiYN(multi_yn) {
    var multi_div_obj = $("#multi_div");
    if(multi_div_obj.length > 0) {
        if(multi_yn == 'Y') {
            multi_div_obj.html("로긴형태:멀티로긴");
            $("#logoutall_btn").show();
        } else if(multi_yn == 'N') {
            multi_div_obj.html("로긴형태:싱글로긴");
            $("#logoutall_btn").hide();
        } else {
            multi_div_obj.html("로긴형태:?");
        }
    }
}
function parseForwarding(num, when) {
    var label = "착신전환상태:";
    if(when == '') {
        when="N";
    }
    var forwarding = $("#forwarding");
    if(forwarding.length>0) {
        forwarding.val(num);
    }
    var forward_when = $('#forward_when');
    if(forward_when.length > 0) {
        $("input[name=forward_when]").each(function(){
            if($(this).val() == when) {
                $(this).attr("checked", true);
            }
        });
    }
    if(when == 'A') {
        label = label + "항상[" + num + "]";
        $("#forwardstatus").css("background","yellow");
    } else if(when == 'B') {
        label = label + "통화중[" + num + "]";
        $("#forwardstatus").css("background","yellow");
    } else if(when == 'C') {
        label = label + "부재중[" + num + "]";
        $("#forwardstatus").css("background","yellow");
    } else if(when == 'T') {
        label = label + "부재중+통화중[" + num + "]";
        $("#forwardstatus").css("background","yellow");
    } else {
        label = label + "안함";
        $("#forwardstatus").css("background","white");
    }

    var forwardstatus = $("#forwardstatus");
    if(forwardstatus.length > 0) {
        forwardstatus.html(label);
    }
}
function parsePhoneStatus(kind) {
	var phonestatus = $("#phonestatus");
	if(phonestatus.length ==0) {
		return;
	}

  if(kind =='OK' || kind == 'REGISTERED' || kind == 'REACHABLE' ) {
      phonestatus.css("background","lightgreen");
  } else if(kind =='NOK' || kind=='UNREACHABLE' || kind=='UNREGISTERED') {
      phonestatus.css("background","gray");
  } else {
      phonestatus.css("background","white");
  }
}

//로그아웃 후 화면 전환
function logoutUI() {
    //로긴버튼은 감추고 로그아웃버튼을 보여줌
    $("#LOGIN_INFO_DIV").html("");
    $("#LOGIN_INFO_DIV").hide();
    $("#logout_btn").hide();
    $("#logoutall_btn").hide();

    $("#LOGIN_DIV").show();
    $("#login_btn").show();

    $("#STATUS_DIV").hide();

    parseMemberStatus('9');
    parsePDSMemberStatus('4');

    PhoneNum="";
    PhonePeer="";
    UserName="";
    PhoneStatus = "";
    FORWARD_WHEN = "";
    FORWARD_NUM = "";
    MemberStatus = "";
}
function logout(cmd) {
    var rtn = confirm("22로그아웃하시겠습니까?");

    if(rtn == true) {
        SendCommand(cmd);
  /*
      if(socket_frame_obj != null && socket_frame_obj.length>0)
      {
        socket_frame_obj[0].contentWindow.setLogout();
      }
      logoutUI();
  */
    }
    return false;
}
function logoutfromserver() {
	  logoutUI();
}

//내선-어텐디드 
function command_attended() {
    if($("#transfer_num").val() == "") {
        alert("돌려줄 상담원의 내선을 입력하세요");
        return;
    } else {
        var rtn = confirm("["+$("#transfer_num").val()+"] 로 전화를 돌리시겠습니까?");

        if(rtn == false) {
            return;
        }
    }
    SendCommand("ATTENDED|"+$("#transfer_num").val());
    return false;
}

//내선-블라인드 
function command_redirect() {
    if($("#transfer_num").val()=="") {
        alert("돌려줄 상담원의 내선을 입력하세요");
        return;
    } else {
        var rtn = confirm("[" + $("#transfer_num").val() + "] 로 전화를 돌리시겠습니까?");

        if(rtn == false) {
            return;
        }
    }
    SendCommand("REDIRECT|" + $("#transfer_num").val());
    return false;
}

//내선-블라인드 
function command_redirecthunt() {
    if($("#redirecthunt_num").val()=="") {
        alert("돌려줄 번호(헌트,대표)를 입력하세요");
        return;
    } else {
        var rtn = confirm("["+$("#redirecthunt_num").val()+"] 로 전화를 돌리시겠습니까?");

        if(rtn == false) {
            return;
        }
    }
    SendCommand("REDIRECT_HUNT|"+$("#redirecthunt_num").val());
    return false;
}

//외부-어텐디드 
function command_attended_out() {
    if($("#transferout_num").val() == "") {
        alert("돌려줄 번호를 입력하세요");
        return;
    } else {
        var rtn = confirm("["+$("#transferout_num").val()+"] 로 전화를 돌리시겠습니까?");

        if(rtn == false) {
            return;
        }
    }
    SendCommand("ATTENDED_OUT|"+$("#transferout_num").val());
    return false;
}

//외부-블라인드 
function command_redirect_out() {
    if($("#transferout_num").val() == "") {
        alert("돌려줄 번호를 입력하세요");
        return;
    } else {
        var rtn = confirm("["+$("#transferout_num").val()+"] 로 전화를 돌리시겠습니까?");

        if(rtn == false) {
            return;
        }
    }
    SendCommand("REDIRECT_OUT|"+$("#transferout_num").val());
    return false;
}
function command_lastevent() {
    SendCommand("GET_LASTEVENT|callevent");
    return false;
}
function command_msg() {
    if($("#msg_exten").val() == "") {
        alert("메세지보낼 상담원의 내선을 입력하세요");
        return;
    }
    if($("#msg").val() == "") {
        alert("메세지를 입력하세요");
        return;
    }
    SendCommand("MSG|" + $("#msg_exten").val() + "|" + $("#msg").val());
    return false;
}
function command_spy() {
    if($("#spy_exten").val()=="") {
        alert("엿듣기할 상담원의 내선을 입력하세요");
        return;
    }
    SendCommand("SPY|" + PhonePeer + "," + $("#spy_exten").val());
    return false;
}
/*function command_ars() {
    var ars_number = $("#ars_number").val();
    if(ars_number=="") {
        alert("연결할 번호를 입력하세요");
        return;
    }
    SendCommand("ARS_CONNECT|"+ ars_number);
    return false;
}*/
function command_dtmf(mode) {
    SendCommand("DTMFREAD|"+mode);
    return false;
}
function command_rec(mode) {
    if(mode == 'start') {
        SendCommand("REC_START|"+PhonePeer);
    } else {
        SendCommand("REC_STOP|"+PhonePeer);
    }
    return false;
}
function command_hold(mode) {
    if(mode == 'start') {
        SendCommand("HOLD_START|"+PhonePeer);
    } else {
        SendCommand("HOLD_STOP|"+PhonePeer);
    }
    return false;
}
function command_memberstatus(s) {
/*
        if(MemberStatus == '5')
        {
                alert("전화기가 수신거부상태입니다.전화기에서 풀어주세요");
                return;
        }
*/
    SendCommand("MEMBERSTATUS|"+s+","+PhoneNum+","+MemberStatus);
}
function command_pds_memberstatus(s) {
    SendCommand("PDSMEMBERSTATUS|"+s+","+PhoneNum);
}
function command_hangup() {
    SendCommand("HANGUP|"+PhonePeer);
}
function command_attended_hangup(){
	  SendCommand( "ATTENDEDHANGUP|"+PhonePeer );
}
function command_receive() {
    SendCommand("RECEIVE|"+PhonePeer);
}
function command_reject() {
    SendCommand("REJECT|"+PhonePeer);
}
function command_pickup() {
    SendCommand("PICKUP|"+PhonePeer);
}
function selectForward(value) {
	FORWARD_WHEN = value;
}
function command_forwarding() {
	if(FORWARD_WHEN != 'N' && $("#forwarding").val()=='') {
		alert("착신전환할 번호를 입력해주세요");
		return;
	}
  SendCommand("FORWARDING|"+PhoneNum+","+$("#forwarding").val()+","+FORWARD_WHEN);
}
function command_multi_start() {
	if($("#clickmulti_num1").val()=='' && $("#clickmulti_num2").val()=='') {
		alert("삼자통화할 내선 번호를 입력해주세요");
		return;
	}
  SendCommand("MULTIDIAL_START|"+PhoneNum+","+$("#clickmulti_rid").val()+","+$("#clickmulti_num1").val()+","+$("#clickmulti_num2").val()+","+$("#clickmulti_ismonit").val());
}
function command_multi_end() {
	if($("#clickmulti_num1").val()=='' && $("#clickmulti_num2").val()=='') {
		alert("삼자통화할 내선 번호를 입력해주세요");
		return;
	}
  SendCommand("MULTIDIAL_END|"+PhoneNum);
}
function command_recplay_start() {
	if($("#recplay_file").val()=='') {
		alert("함께 들을 녹취파일명을 입력해주세요");
		return;
	}
  SendCommand("RECORD_PLAY_START|"+$("#recplay_file").val()+","+$("#recplay_ismonit").val());
}
function command_recplay_end() {
    SendCommand("RECORD_PLAY_END|"+PhoneNum);
}

function command_protect(mode) {
    SendCommand("PROTECT_ARS|"+mode);
    return false;
}
function displayText(fsend, text) {
    if(socket_frame_obj != null && socket_frame_obj.length > 0) {
        socket_frame_obj[0].contentWindow.displayText(fsend, text);
    }
}
