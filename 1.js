/**
 * robMoney.js
 * @author  : shang.yantao@topka.cn
 * @version : 0.1
 * @date    : 2015-08-21
 * copyright (c) 2011-2015, Topka.cn v0.0.1
 */
;
if (typeof Zepto === 'undefined') {
    throw new Error('RobMoney.js\'s script requires Zepto')
}

var libFest = [
    { 
        name: "flexible", 
        src: "\/assets\/js\/apps\/wap\/lib\/flexible\/flexible.js" 
    },
    { 
        name: "imgLoding",
        src: "\/assets\/js\/apps\/wap\/lib\/imgLoding\/imgLoding.js"
    },
    { 
        name: "modal", 
        src: "\/assets\/js\/apps\/wap\/lib\/zepto-modal\/modal.js"
    }
];
var USERAGENT                   = window.navigator.userAgent.toLowerCase();
// USERAGENT = ('Mozilla/5.0 (Linux; U; Android 4.3; zh-cn; M811 Build/JLS36C) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30 tk-topsales/2.0.1(f7426ddaf8aa9f7b61f7933887eb1b96667e5523d379a9f92b1b30040ce7dc6507a52b902e03c880e4ceda15571f43e5dec20caf7525726086bc1bd8f9d156c2)').toLowerCase();

// 弹窗模板
var TEMPLATE = {
    'tpl1': '<div class="alert1"><img class="modal-top-img" src="/assets/images/apps/wap/turntable/turntable_sorry.png" alt="对不起" /><p class="title">离中奖就差一步了！</p><button class="btn j_btn_alert1">现在去砍价买车吧</button></div>',
    'tpl2': '<div class="alert2"><p class="title">中奖了！</br><span class="prize-name"><span></p><img class="prize-img" src="" alt="" /><form class="modal-form" action=""><p>请填写以下信息</p><p><label for="">姓&nbsp;&nbsp;&nbsp;名：</label><input id="name" type="text" /></p><p><label for="">手&nbsp;机&nbsp;号：</label><input id="tel" type="text" maxlength="11" /></p><p><label for="">收货地址：</label><input id="address" type="text" /></p></form><button id="sub-btn" class="btn">点击提交</button></div>',
    'tpl3': '<div class="alert3"><p class="title">您的信息提交成功！</p><p class="desc">请耐心等待，奖品会以邮寄方式派送，我们也会在7个工作日内与您再次联系。</p><button class="btn j_btn_alert1">现在去砍价买车吧</button></div>',
    'tpl4': '<div class="alert4"><p class="title">您今天已经参与过抽奖！</p><p class="desc">您目前的中奖结果为：</p><img class="prize-img" src="" alt="" /><button class="btn j_btn_alert1">现在去砍价买车吧</button></div>',
    'tpl5': '<div class="alert5"><p class="title">您今天已经参与过抽奖！</p><p class="desc">请明天再来！</p><button class="btn j_btn_alert1">现在去砍价买车吧</button></div>'
};
function tpl(depth) {
    var depths = {
        2: {name: '行车记录仪',img: 'turntable_08.png'},
        3: {name: '车载空气净化器',img: 'turntable_07.png'},
        4: {name: '手机充值卡(100元)',img: 'turntable_09.png'}
    }
    var imgpath = '/assets/images/apps/wap/turntable/';
    $.each(depths,function(index,item){
        if(depth == index){
            TEMPLATE.tpl2 = '<div class="alert2"><p class="title">中奖了！</br><span class="prize-name">'+item.name+'<span></p><img class="prize-img" src="'+imgpath+item.img+'" alt="" /><form class="modal-form" action=""><p>请填写以下信息</p><p><label for="">姓&nbsp;&nbsp;&nbsp;名：</label><input id="name" type="text" /></p><p><label for="">手&nbsp;机&nbsp;号：</label><input id="tel" type="text" maxlength="11" /></p><p><label for="">收货地址：</label><input id="address" type="text" /></p></form><button id="sub-btn" class="btn">点击提交</button></div>';
            TEMPLATE.tpl4 = '<div class="alert4"><p class="title">您今天已经参与过抽奖！</p><p class="desc">您目前的中奖结果为：</p><img class="prize-img" src="'+imgpath+item.img+'" alt="" /><button class="btn j_btn_alert1">现在去砍价买车吧</button></div>';
        }
    })
}
var AutoRun = {
    init: function () {
        return this._flexibleTimer() + ' ' + this._imgLodingTimer();
    },
    _init: function () {
        var winHeigt = $(window).height();
        var mainHeight = $('.submit-wrap').height();

        // 插入插件
        for (var i = 0; i < libFest.length; i++) {
            document.write('<script src="'+ libFest[i].src +'?_cache=' + new Date().getTime() + '"><\/script>');
        };

        // 全局进度条
        $(document).on('ajaxBeforeSend', function(e, xhr, options){
            NProgress.start();
        })
        $(document).on('ajaxSend', function(e, xhr, options){
            NProgress.set(0.4);
        })
        $(document).on('ajaxComplete', function(e, xhr, options){
            NProgress.done();
        })


    },
    _flexibleTimer: function () {
        var timer = setInterval(function () {
            if(typeof flexible == 'function'){
                flexible();
                clearInterval(timer);
            }
        },1);
    },
    _imgLodingTimer: function () {
        var timerJquery = setInterval(function () {
            if (typeof Zepto != 'undefined' && typeof imgLoding == 'function') {
                imgLoding('f-hide');
                clearInterval(timerJquery);
            }
        },1);
    }
};

AutoRun._init();

// Zepto Tabs
;(function($) {
    $.fn.tabs = function(){  
        var _self = this;

        _self.click(function() {
            var _this = $(this);
            var _dataTab = _this.data('tab');
            var _parents = _this.parents('.tab');
            var _parentsSiblings = _parents.siblings();

            _this.addClass('active').siblings().removeClass('active');

            _parentsSiblings.each(function(index, el) {
                if($(el).data('tab') != undefined && $(el).data('tab') != null){

                    if($(el).data('tab') == _dataTab){
                        $(el).addClass('active').siblings().removeClass('active');
                    }
                }
            });
        });

        return this;
    };
})(Zepto);

function checkNewAppVersion () {
    var ua = USERAGENT;

    console.log(ua)
    var matches = ua.match(/.*tk-([a-z]+)\/([\.0-9]+)\(([0-9a-f]+)\).*/i);
    var isNew = true;
    var thisVersion = '';
    
    if(ua.match(/Android/i) == 'android'){
        if(matches && matches.length >= 4 
            && matches[1] 
            && matches[2] 
            && (matches[1] == 'topdeals' || matches[1] == 'topsales')
        ){
            var versions = [];
            if(matches[1] == 'topsales'){
                versions = ["2.0","2.0.1","2.2","2.3","2.3.1","2.4","2.5"];
            }
            
            for(var i = 0; i < versions.length; i++){
                if(versions[i] == matches[2]){
                    isNew = false;
                    thisVersion = matches[2]
                }
            }
        }
    }
    return {
        'result': isNew,
        'versions': thisVersion
    };
};
// console.log(checkNewAppVersion());
var  timers = setInterval(function () {
    if(typeof Modal == 'function'){
        window.alert = function(message, url){
            var msg = message || "";
            var modals =  new Modal({
                'hasBg': true,
                'hideHeaderClose': true,
                'template': '<div class="window-alert"><p class="window-alert-desc"></p><button class="btn btn-default btn-block j_window_alert">确定</button></div>',
                'callback': function(){
                    var _self = this;

                    $('.md-modal').find('.md-modal-wrap .window-alert .window-alert-desc').html(msg);
                    if(url != "" && typeof url != 'undefined'){
                        console.log(1);
                        $('.md-modal').on('click', '.j_window_alert', function(event) {
                            event.preventDefault();
                            /* Act on the event */
                            $(this).prop("disabled", true);
                            _self.hide();
                            window.location.href = url;
                        });
                    }else{
                        console.log(2);
                        $('.md-modal').on('click', '.j_window_alert', function(event) {
                            event.preventDefault();
                            /* Act on the event */
                            $(this).prop("disabled", true);
                            _self.hide();
                        });
                    }
                }
            }).show()

            return modals;
        }
        clearInterval(timers);
    }
},1);
(function(){
    AutoRun.init();
    var checkNewAppVersionData = checkNewAppVersion();
    var upgradeTips = '升级至最新版本才可参加活动';

    if(USERAGENT.match(/Android/i) == 'android'){
        if(!checkNewAppVersionData.result){
            $('.tkFilePicker-btn').each(function(index, el) {
                $(el).after('<p style="color: #f00">'+ upgradeTips +'</>');
            });
        }
    }else if(/iPhone|iPod|iPad/i.test(USERAGENT)){
        $('.order-tips').after('<p class="order-tips" style="margin-top: 1rem;">本活动与设备生产商苹果公司无关</p>');
    }

    //转盘旋转
    $(document).ready(function(){
        //旋转角度
        var angles;
        //旋转次数
        var rotNum = 0;
        //中奖公告
        var notice = null;

        var depth = 0;

        var num = 1;

        var prize = {};

        var id = 0;

        var checkLottery = {};

        var click = 1;

        function check(){
            $.post('/topdeals/activity-xiaomi/lottery', {}, function(data) {
                if(data.result){
                    checkLottery = data.data;
                }
            }, 'json');
        }

        check();

        if(click == 1 && checkLottery.length != 0){
            click = 0;
            $('.lottery-btn').bind('click',function(){
               if(checkLottery.num == -1){
                    if(checkLottery.depth > 0){
                       tpl(checkLottery.depth);
                       showmodal(TEMPLATE.tpl4);
                    }else{
                       showmodal(TEMPLATE.tpl5);
                    }
                    click = 1;
               }else{
                    num = checkLottery.num;
                    if (checkLottery.depth > 0){
                       tpl(checkLottery.depth);
                    }
                    lottery();
                    click = 1;
               }
            });
        }

        //抽奖
        function lottery() {
            //转盘旋转
            runCup();
            //转盘旋转过程“开始抽奖”按钮无法点击
            $('.lottery-btn').attr("disabled", true);
            //旋转次数加一
            rotNum = rotNum + 1;
            //“开始抽奖”按钮无法点击恢复点击
            setTimeout(function(){
                $.post('/topdeals/activity-xiaomi', checkLottery, function(data) {
                    if(data.result){
                        id = data.data.id;
                        var modal = showmodal($tpl);
                        //表单验证
                        $(document).on('click','#sub-btn',function(){
                            var phone  = /^1[0-9]{10}$/;  
                            if($('#name').val() == ''){
                                alert('请输入姓名');
                                lastZindex();
                                return;
                            }else if(!phone.test($('#tel').val())){
                                alert('请输入正确手机号');
                                lastZindex();
                                return;
                            }else if($('#address').val() == ''){
                                alert('请输入收货地址');
                                lastZindex();
                                return;
                            }

                            var params = {
                                'id' : id ,
                                'name' : $('#name').val() ,
                                'phone' : $('#tel').val() ,
                                'address' : $('#address').val() ,
                            };
                            
                            modal.hide();

                            $.post('/topdeals/activity-xiaomi/address', params, function(data) {
                                if(data.result){
                                    showmodal(TEMPLATE.tpl3);
                                }else{
                                    alert(data.message);
                                }
                            }, 'json');
                        });

                        check();

                    }else{
                       alert(data.message); 
                    }
                }, 'json');
                $('.lottery-btn').removeAttr("disabled", true);
            },6000);
        }
        //z-index
        function lastZindex(){
            $('.md-overlay').last().css('z-index','2001');
            $('.md-modal').last().css('z-index','2002')
        }
        //弹窗弹起，页面不滚动
        function overHidden(flag){
            if (flag) {
                $('html').css('overflow','hidden');
            }else{
                $('html').css('overflow','');
            }
        }
        //弹窗
        function showmodal(tpl){
            var modal =  new Modal({
                'hasBg': true,
                'hideHeaderClose': false,
                'template': tpl,
                'callback': function(){
                    $('.j_btn_alert1').on('click',function () {
                        // 去砍价买车 
                        modal.hide();
                        overHidden(false);
                    })
                    $('.md-modal-close').on('click',function(){
                        overHidden(false);
                    })
                }
            });
            modal.show();
            if ($('div').hasClass('alert2')) {
                $('.md-modal-top').first().html('<img class="modal-top-img" src="/assets/images/apps/wap/turntable/turntable_success.png" alt="恭喜你" />')
            }else{
                $('.md-modal-top').first().html('')
            }
            overHidden(true);
            return modal;
        }

        //转盘旋转
        function runCup(){
            probability();
            var degValue = 'rotate('+angles+'deg'+')';
            $('.lottery-img').css('-o-transform',degValue);           //Opera
            $('.lottery-img').css('-ms-transform',degValue);          //IE浏览器
            $('.lottery-img').css('-moz-transform',degValue);         //Firefox
            $('.lottery-img').css('-webkit-transform',degValue);      //Chrome和Safari
            $('.lottery-img').css('transform',degValue);
        }

        //各奖项对应的旋转角度及中奖公告内容
        function probability(){
            //获取随机数
            if ( num == 0 ) {
                //红米note
                angles = 2160 * rotNum + 1822;
                $tpl = TEMPLATE.tpl2;
            }
            else if ( num == 1 ) {
                angles = 2160 * rotNum + 1867;
                //谢谢参与
                $tpl = TEMPLATE.tpl1;
            }
            else if ( num == 2 ) {
                angles = 2160 * rotNum + 1912;
                //行车记录仪
                $tpl = TEMPLATE.tpl2;
            }
            else if ( num == 3 ) {
                angles = 2160 * rotNum + 1957;
                //谢谢参与
                $tpl = TEMPLATE.tpl1;
            }
            else if ( num == 4 ) {
                angles = 2160 * rotNum + 2002;
                //空气净化器
                $tpl = TEMPLATE.tpl2;
            }
            else if ( num == 5 ) {
                angles = 2160 * rotNum + 2047;
                //谢谢参与
                $tpl = TEMPLATE.tpl1;
            }
            else if ( num == 6 ) {
                angles = 2160 * rotNum + 2092;
                // 手机充值卡
                $tpl = TEMPLATE.tpl2;
            }
            else if ( num == 7 ) {
                angles = 2160 * rotNum + 2137;
                //谢谢参与
                $tpl = TEMPLATE.tpl1;
            }
        }
    });
})()
