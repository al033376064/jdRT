

/// <reference path="layout/jquery-1.10.2.js" />
/// <reference path="layout/jquery.myPlugin.js" />
/*手机端模拟滚动*/
var PageScroll = {
    ScrollEvents: [],
    ScrollEvent: function (Name) {
        this.Name = Name;//事件名
        this.IsActive = false;//激活事件
        this.MoveTick = 0;//移动次数
        this.Start_X = 0;//手指开始位置X
        this.Start_Y = 0;//手指开始位置Y
        this.Move_X = 0;//手指移动到位置X
        this.Move_Y = 0;//手指移动到位置Y
        this.End_X = 0;//手指抬起位置X
        this.End_Y = 0;//手指抬起位置Y
        this.objextData = new Object();//额外参数
    },
    BindScroll: function ($Panel, EventName, touchstart, condition, touchmove, touchend) {

        //手指滑动
        if ("ontouchend" in document) {
            $Panel.unbind("touchstart").bind("touchstart", function (e) {
                var ev = new PageScroll.ScrollEvent(EventName);
                ev.objextData.IsScroll = false;
                ev.Start_X = ev.Move_X = ev.End_X = e.originalEvent.touches[0].pageX;
                ev.Start_Y = ev.Move_Y = ev.End_Y = e.originalEvent.touches[0].pageY;
                ev.objextData.TouchTime_Start = new Date().getTime();
                ev.objextData.ScrollNow = 0;
                PageScroll.ScrollEvents.push(ev);
                if (touchstart) {
                    touchstart(ev);
                }
                //if (ev.Targets && ev.Targets.indexOf($(e.target)) == -1) {
                //    e.preventDefault();
                //}
                //if ($(e.target).parent().parent().hasClass("md-checkbox")) {
                //    e.preventDefault();
                //    $(e.target).click();
                //};
                ///^(?:INPUT|TEXTAREA|SELECT|A)$/.test(e.target.tagName) || e.preventDefault();
            });
            $Panel.unbind("touchmove").bind("touchmove", function (e) {
                var ev = _.filter(PageScroll.ScrollEvents, function (o) { return o.Name == EventName })[0];
                ev.Move_X = e.originalEvent.touches[0].pageX;
                ev.Move_Y = e.originalEvent.touches[0].pageY;
                ev.MoveTick++;
                //负数上移 正数下移
                var touchScrollY = ev.Move_Y - ev.Start_Y;
                var touchScrollX = ev.Move_X - ev.Start_X;
                if (condition(ev)) {
                    ev.IsActive = true;
                }
                if (ev.IsActive) {
                    if (touchmove) {
                        touchmove(ev);
                    }
                    //预防其他事件冲突
                    e.preventDefault();
                }
                ////激活事件
                ////Y轴小于45度且定次完成一定距离
                //if (ev.MoveTick <= 4 && Math.abs(touchScrollY) >= 10 && (Math.abs(touchScrollY) / Math.abs(touchScrollX)) > 1) {
                //    ev.IsActive = true;
                //}
                //if (ev.IsActive) {
                //    //[-80,0]
                //    var moveScrollY = ev.objextData.ScrollStartY + touchScrollY;
                //    if (moveScrollY >= (-ev.objextData.ScrollHeight) && moveScrollY <= 0) {
                //        //console.log([$Content.css("transform"), "translate(0," + moveScrollY + "px)"]);
                //        $Panel.attr("scroll-top", moveScrollY);
                //        $Content.css("transform", "translate(0," + moveScrollY + "px)");
                //    }
                //    //预防其他事件冲突
                //    e.preventDefault();
                //}
            });
            $Panel.unbind("touchend").bind("touchend", function (e) {
                var ev = _.filter(PageScroll.ScrollEvents, function (o) { return o.Name == EventName })[0];
                ev.End_X = e.originalEvent.changedTouches[0].pageX;
                ev.End_Y = e.originalEvent.changedTouches[0].pageY;
                PageScroll.ScrollEvents = _.filter(PageScroll.ScrollEvents, function (o) { return o.Name != EventName });
                if (touchend) {
                    touchend(ev);
                }
                //$Content.css({ "transition-duration": "initial" });
            });
        }
    }
};

