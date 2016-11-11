
var allWay = function(){};

allWay.prototype.getCheckCode = function(sVIN) {
    var Arr = new Array();
    var Brr = new Array();
    Arr['A'] = 1;
    Arr['B'] = 2;
    Arr['C'] = 3;
    Arr['D'] = 4;
    Arr['E'] = 5;
    Arr['F'] = 6;
    Arr['G'] = 7;
    Arr['H'] = 8;
    Arr['J'] = 1;
    Arr['K'] = 2;
    Arr['L'] = 3;
    Arr['M'] = 4;
    Arr['N'] = 5;
    Arr['P'] = 7;
    Arr['R'] = 9;
    Arr['S'] = 2;
    Arr['T'] = 3;
    Arr['U'] = 4;
    Arr['V'] = 5;
    Arr['W'] = 6;
    Arr['X'] = 7;
    Arr['Y'] = 8;
    Arr['Z'] = 9;
    Arr['1'] = 1;
    Arr['2'] = 2;
    Arr['3'] = 3;
    Arr['4'] = 4;
    Arr['5'] = 5;
    Arr['6'] = 6;
    Arr['7'] = 7;
    Arr['8'] = 8;
    Arr['9'] = 9;
    Arr['0'] = 0;
    Brr[1]=8;
    Brr[2]=7;
    Brr[3]=6;
    Brr[4]=5;
    Brr[5]=4;
    Brr[6]=3;
    Brr[7]=2;
    Brr[8]=10;
    Brr[9]=0;
    Brr[10]=9;
    Brr[11]=8;
    Brr[12]=7;
    Brr[13]=6;
    Brr[14]=5;
    Brr[15]=4;
    Brr[16]=3;
    Brr[17]=2;
    var ht,htZM;
    var sKYZF="ABCDEFGHJKLMNPRSTUVWXYZ1234567890";
    var sJYW ='';
    var bl = false;
    var blKYZF = false;
    if (sVIN.length == 17)
    {
        var iJQS=0,intTemp=0;
        ht = Arr;
        htZM = Brr;
        try
        {
            for (var i = 0; i <sVIN.length; i++)
            {
                if (sKYZF.indexOf(sVIN.substr(i, 1)) != -1)
                {
                    blKYZF = true;
                    iJQS = iJQS + parseInt(ht[sVIN.substr(i, 1)]) * parseInt(htZM[(i + 1)]);
                }
                else
                {
                    blKYZF = false;
                    break;
                }
            }
            if (blKYZF)
            {
                intTemp = iJQS%11;
                if (intTemp == 10)
                {
                    sJYW = "X";
                }
                else
                {
                    sJYW = intTemp.toString();
                }
                if (sJYW == sVIN.substr(8, 1)) bl = true;
            }
            else
            {
                bl = false;
            }
        }
        catch(err)
        {
            bl = false;
        }
    }
    return bl;
}//车架号正则检验
allWay.prototype.isPhone = function (phone) {
   return /^1(3|4|5|7|8)\d{9}$/.test(phone)
}
//手机号判断对错
allWay.prototype.cidInfo = function (sId) {
    var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}
    var iSum=0;
    var info="";
    if(!/^\d{17}(\d|x)$/i.test(sId))return false;
    sId=sId.replace(/x$/i,"a");
    if(aCity[parseInt(sId.substr(0,2))]==null)return "Error:非法地区";
    sBirthday=sId.substr(6,4)+"-"+Number(sId.substr(10,2))+"-"+Number(sId.substr(12,2));
    var d=new Date(sBirthday.replace(/-/g,"/"))
    if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))return "Error:非法生日";
    for(var i = 17;i>=0;i --) iSum += (Math.pow(2,i) % 11) * parseInt(sId.charAt(17 - i),11)
    if(iSum%11!=1)return "Error:非法证号";
    return aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女")
}//根据省份证查询信息
allWay.prototype.validateIdCard = function (idCard) {
    //15位和18位身份证号码的正则表达式
    var regIdCard=/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

    //如果通过该验证，说明身份证格式正确，但准确性还需计算
    if(regIdCard.test(idCard)){
        if(idCard.length==18){
            var idCardWi=new Array( 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ); //将前17位加权因子保存在数组里
            var idCardY=new Array( 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
            var idCardWiSum=0; //用来保存前17位各自乖以加权因子后的总和
            for(var i=0;i<17;i++){
                idCardWiSum+=idCard.substring(i,i+1)*idCardWi[i];
            }

            var idCardMod=idCardWiSum%11;//计算出校验码所在数组的位置
            var idCardLast=idCard.substring(17);//得到最后一位身份证号码

            //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
            if(idCardMod==2){
                if(idCardLast=="X"||idCardLast=="x"){
                    return true
                }else{
                    return false
                }
            }else{
                //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                if(idCardLast==idCardY[idCardMod]){
                    return true
                }else{
                    return false
                }
            }
        }
    }else{
        return false
    }
}//身份证号码判断对错
allWay.prototype.isLicenseNo=function(str) {
    var express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[警京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]{0,1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
    return express.test(str);}//判断车牌号正确与否
allWay.prototype.isEngine = function(value){
    if((value.length>0&&value.length<4) || value.length==4){
        return false;
    }
    var reg =  /^[0-9a-zA-Z-*\s]+$/;
    return reg.test(value);
}//发动机号
allWay.prototype.id = function(id){
    return document.getElementById(id);
}//取id
allWay.prototype.cookie = function(name, value, options) {
    // 如果第二个参数存在
    if (typeof value != 'undefined') {
        options = options || {};
        if (value === null) {
            // 设置失效时间
            options.expires = -1;
        }
        var expires = '';
        // 如果存在事件参数项，并且类型为 number，或者具体的时间，那么分别设置事件
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString();
        }
        var path = options.path ? '; path=' + options.path : '', // 设置路径
            domain = options.domain ? '; domain=' + options.domain : '', // 设置域
            secure = options.secure ? '; secure' : ''; // 设置安全措施，为 true 则直接设置，否则为空

        // 把所有字符串信息都存入数组，然后调用 join() 方法转换为字符串，并写入 Cookie 信息
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // 如果第二个参数不存在
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookie = document.cookie.split(';');
            for (var i = 0; i < cookie.length; i++) {
                var cookie = (cookie[i] || "").replace( /^\s+|\s+$/g, "");
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};//cookie
allWay.prototype.getCookie = function(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

    if(arr=document.cookie.match(reg))

        return (arr[2]);
    else
        return null;
}//cookie
allWay.prototype.delCookie = function(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}//cookie
allWay.prototype.chNa = function(str){
    if(str == ""){
        return false;
    }
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？0123456789]");
    return !pattern.test(str);
}//验证姓名
allWay.prototype.getQueryString = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}//url取值
allWay.prototype.bankCheck = function(bankno){
    var lastNum=bankno.substr(bankno.length-1,1);//取出最后一位（与luhn进行比较）

    var first15Num=bankno.substr(0,bankno.length-1);//前15或18位
    var newArr=new Array();
    for(var i=first15Num.length-1;i>-1;i--){    //前15或18位倒序存进数组
        newArr.push(first15Num.substr(i,1));
    }
    var arrJiShu=new Array();  //奇数位*2的积 <9
    var arrJiShu2=new Array(); //奇数位*2的积 >9

    var arrOuShu=new Array();  //偶数位数组
    for(var j=0;j<newArr.length;j++){
        if((j+1)%2==1){//奇数位
            if(parseInt(newArr[j])*2<9)
                arrJiShu.push(parseInt(newArr[j])*2);
            else
                arrJiShu2.push(parseInt(newArr[j])*2);
        }
        else //偶数位
            arrOuShu.push(newArr[j]);
    }

    var jishu_child1=new Array();//奇数位*2 >9 的分割之后的数组个位数
    var jishu_child2=new Array();//奇数位*2 >9 的分割之后的数组十位数
    for(var h=0;h<arrJiShu2.length;h++){
        jishu_child1.push(parseInt(arrJiShu2[h])%10);
        jishu_child2.push(parseInt(arrJiShu2[h])/10);
    }

    var sumJiShu=0; //奇数位*2 < 9 的数组之和
    var sumOuShu=0; //偶数位数组之和
    var sumJiShuChild1=0; //奇数位*2 >9 的分割之后的数组个位数之和
    var sumJiShuChild2=0; //奇数位*2 >9 的分割之后的数组十位数之和
    var sumTotal=0;
    for(var m=0;m<arrJiShu.length;m++){
        sumJiShu=sumJiShu+parseInt(arrJiShu[m]);
    }

    for(var n=0;n<arrOuShu.length;n++){
        sumOuShu=sumOuShu+parseInt(arrOuShu[n]);
    }

    for(var p=0;p<jishu_child1.length;p++){
        sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p]);
        sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p]);
    }
    //计算总和
    sumTotal=parseInt(sumJiShu)+parseInt(sumOuShu)+parseInt(sumJiShuChild1)+parseInt(sumJiShuChild2);

    //计算luhn值
    var k= parseInt(sumTotal)%10==0?10:parseInt(sumTotal)%10;
    var luhn= 10-k;

    if(lastNum==luhn){

        return true;
    }
    else{

        return false;
    }
}
var wait=120;
allWay.prototype.time=function (o) {
    if (wait == 0) {
        o.setAttribute("disabled","");
        o.value = '发送验证码';
        wait = 120;
    } else {
        o.setAttribute("disabled", true);
        o.value =  wait + "s"
        wait--;
        setTimeout(function() {
                allWay.prototype.time(o)
            },
            1000)
    }
}

module.exports = allWay;