//取得第一个文本框
var num1Element = document.getElementById("prependedInput1");
//取得第二个文本框
var num2Element = document.getElementById("prependedInput2");
//取得单选框
var calTypeAll = document.getElementsByName("cal_type");
//取得结果所在元素
var resultElement = document.getElementById("result").children[1];
//取得提交和重置按钮
var submitBtn = document.getElementsByTagName("button")[0];
var resetBtn = document.getElementsByTagName("button")[1];


//跨浏览器事件处理程序
var EventUtil = {
    addHandler: function(element, type, handler){
        if(element.addEventListenter){
            element.addEventListenter(type, handler, false);
        } else if(element.attachEvent){
            element.attachEvent("on"+type, handler);
        } else{
            element["on"+type] = handler;
        }
    },
    
    getEvent: function(event){
        return event ? event : window.event;
    },
    
    getTarget: function(event){
        return event.target || event.srcElement;
    },
    
    preventDefault: function(event){
        if (event.preventDefault){
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    
    stopPropagation: function(event){
        if (event.stopPropagation){
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },
    
    removeHandler: function(element, type, handler){
        if (element.removeEventListener){
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent){
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    }

}
//递归式阶乘
function factorial(){
    var num = arguments[0];
    if(num <= 1){
        return 1;
    } else{
        return num * arguments.callee(num-1);
    }    
}
//非递归式阶乘
function factorial1(){
    var num = arguments[0];
    var temp = 1;
    for(var i = 2; i <= num; i++ ){
        temp = temp * i;
    }
    return temp;
}

//递归式菲波那契数列
function fibonacci(){
    var num = arguments[0];
    if(num <= 2){
        return 1;
    } else{
        return arguments.callee(num-1) + arguments.callee(num-2);
    }
}
//非递归式菲波那契数列
function fibonacci1(){
    var num = arguments[0];
    var temp1 =1, temp2=1;
    if(num <= 2){
        return 1;
    } else{
        for(var i = 3; i<= num; i++){
            temp = temp1 + temp2;
            temp2 = temp1;
            temp1 = temp;
        }
    }
    return temp;
}

EventUtil.addHandler(submitBtn, "click", function(event){
    EventUtil.preventDefault(event);
    
    var num1 = parseFloat(num1Element.value);
    var num2 = parseFloat(num2Element.value);
    if(isNaN(num1)){ //处理第一个数字转换错误结果
        resultElement.innerHTML = "Invalid Input a";
        num1Element.focus();
        num1Element.select();
        return;
    }
    for(var i=0; i < calTypeAll.length; i++){
        if(calTypeAll[i].checked){
            var calType =  calTypeAll[i].value;
        }
    }
    var result;
    if(calType == "mult"){
        if(isNaN(num2)){//处理第二个数字转换结果
            resultElement.innerHTML = "Invalid Input b";
            num2Element.focus();
            num2Element.select();
            
            return;
        }
        //结果计算完成后，更新文本框为合法数字
        num1Element.value = num1;
        num2Element.value = num2;
        result = num1+" mult "+num2+" is "+ num1 * num2;
    } else if(calType == "square"){
        num1Element.value = num1;
        num2Element.value = "";
        result =  num1+" square is "+ Math.pow(num1, 2);
        
    } else if(calType == "factorial"){ 
        num1 = Math.abs(parseInt(num1));
        num1Element.value = num1;
        num2Element.value = "";
        result = num1+" factorial is "+ factorial1(num1);//采用非递归

    } else if(calType == "fibonacci"){
        num1 = Math.abs(parseInt(num1));
        num1Element.value = num1;
        num2Element.value = "";
        result = num1+" fibonacci is "+ fibonacci1(num1);////采用非递归

    } 
    if(result.indexOf("Infinity") != -1){
        resultElement.innerHTML = "The result so HUGE, I can't display it !";
    } else{
        resultElement.innerHTML = "The result of " + result;
    }
    //为下次计算做准备
    num1Element.focus();
    num1Element.select();
});

EventUtil.addHandler(resetBtn, "click", function(event){
    EventUtil.preventDefault(event);
    
    num1Element.value = "";
    num2Element.value = "";
    calTypeAll[0].checked = true;
    resultElement.innerHTML = "Update the result here";
});
