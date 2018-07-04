var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var SettingPageIO = (function () {
    function SettingPageIO() {
    }
    SettingPageIO.OnModifyQueue = function (queueid) {
    };
    SettingPageIO.OnMoifyPVE = function (pveid) {
    };
    return SettingPageIO;
}());
$(function () {
    var SettingPage = (function () {
        function SettingPage() {
        }
        SettingPage.OnLoad = function () {
            this.InitPage();
            this.InitCheckBox();
            this.InitAutoDismantle();
            this.InitAutoStrengthen();
            this.InitAutoRepair();
            this.InitNotification();
            MapSetting.Init();
            QueueSetting.Init();
        };
        SettingPage.InitPage = function () {
            $("#PartialSetting .context").contents().filter(function () {
                return this.nodeType === 3;
            }).remove();
            $("#PartialSetting .swapChildPageNav li").click(function () {
                return __awaiter(this, void 0, void 0, function () {
                    var panelid, currentIndex, startIndex;
                    return __generator(this, function (_a) {
                        panelid = $(this).attr("data-panel");
                        currentIndex = $("#PartialSetting .swapChildPageNav li").index($(this));
                        startIndex = $("#PartialSetting .swapChildPageNav li").index($("#PartialSetting .swapChildPageNav li.active"));
                        $("#PartialSetting .swapChildPageNav .splitLine").css({ "transform": "translate3d(" + (currentIndex * 3) + "rem,0,0)" });
                        $("#PartialSetting .context").css({ "transform": "translate3d(-" + (currentIndex * 10) + "rem,0,0)" });
                        return [2];
                    });
                });
            });
        };
        SettingPage.InitCheckBox = function () {
            $("#PartialSetting .ini_checklist .sayTip").click(function () {
                MessageBox.Show($(this).attr("title"));
            });
            $("#PartialSetting #ckBox_SkipFight").attr({ "checked": Config.PlayerConfig.SkipFight }).click(function () {
                Config.PlayerConfig.SkipFight = $(this).is(":checked");
                if (Config.PlayerConfig.SkipFight == false) {
                    Config.PlayerConfig.SkipFightSeconds = 30;
                }
                $("#PartialSetting #SkipFightSeconds_Panel").fadeToggle(300);
            });
            $("#PartialSetting [name='SkipFightSeconds'][value=" + Config.PlayerConfig.SkipFightSeconds + "]").attr("checked", "ture");
            $("#PartialSetting [name='SkipFightSeconds']").change(function () {
                Config.PlayerConfig.SkipFightSeconds = parseInt($(this).val());
                if (Config.PlayerConfig.SkipFightSeconds < 15 && List.From(["胡德", "萨拉托加", "俾斯麦", "列克星敦"]).Contains(Config.LoginUser.ServerName)) {
                    MessageBox.Show(Config.LoginUser.ServerName + " \u670D\u82E5\u51FA\u73B0\u4EFB\u52A1\u5931\u8D25\u6216\u635E\u4E0D\u5230\u8D44\u6E90\uFF0C\u8BF7\u5C06\u52A0\u901F\u5207\u6362\u5230\u201C\u4E2D\u201D\u6216\u201C\u6162\u201D");
                    return;
                }
                if (Config.PlayerConfig.SkipFightSeconds < 10) {
                    MessageBox.Show("请注意加速过快可能会偷不到资源或战斗失败");
                    return;
                }
            });
            if (Config.PlayerConfig.SkipFight) {
                $("#PartialSetting #SkipFightSeconds_Panel").show();
            }
            $("#PartialSetting #ckBox_MissionWorkSpeed").attr({ "checked": Config.MoreSetting.MissionWorkSpeed }).click(function () {
                Config.MoreSetting.MissionWorkSpeed = $(this).is(":checked");
                console.log(Config.MoreSetting.MissionWorkSpeed);
            });
            $("#PartialSetting #ckBox_AutoRelink").attr({ "checked": Config.PlayerConfig.AutoRelink }).click(function () {
                Config.PlayerConfig.AutoRelink = $(this).is(":checked");
                $("#PartialSetting #AutoRelinkSecound_Panel").fadeToggle(300);
            });
            $("#PartialSetting [name='AutoRelinkSecound'][value=" + (Config.PlayerConfig.AutoRelinkSecound ? Config.PlayerConfig.AutoRelinkSecound : 900) + "]").attr("checked", "true");
            $("#PartialSetting [name='AutoRelinkSecound']").change(function () {
                Config.PlayerConfig.AutoRelinkSecound = parseInt($(this).val());
            });
            if (Config.PlayerConfig.AutoRelink) {
                $("#PartialSetting #AutoRelinkSecound_Panel").show();
            }
            $("#PartialSetting #ckBox_RandomDealy").attr({ "checked": Config.PlayerConfig.RandomDealy }).click(function () {
                Config.PlayerConfig.RandomDealy = $(this).is(":checked");
            });
            $("#PartialSetting #ckBox_AutoRepair").attr({ "checked": Config.MoreSetting.AutoRepair }).click(function () {
                Config.MoreSetting.AutoRepair = $(this).is(":checked");
            });
            $("#PartialSetting #ckBox_AutoDismantleShip").attr({ "checked": Config.PlayerConfig.AutoDismantleShip }).click(function () {
                Config.PlayerConfig.AutoDismantleShip = $(this).is(":checked");
            });
            $("#PartialSetting #ckBox_AutoStrengthen").attr({ "checked": Config.PlayerConfig.AutoStrengthen }).click(function () {
                Config.PlayerConfig.AutoStrengthen = $(this).is(":checked");
            });
            $("#PartialSetting #ckBox_AutoExplore").attr({ "checked": Config.PlayerConfig.AutoExplore }).click(function () {
                Config.PlayerConfig.AutoExplore = $(this).is(":checked");
            });
            $("#PartialSetting #ckBox_AutoLockShip").attr({ "checked": Config.PlayerConfig.AutoLockShip }).click(function () {
                Config.PlayerConfig.AutoLockShip = $(this).is(":checked");
            });
            $("#PartialSetting #ckBox_AutoAward").attr({ "checked": Config.PlayerConfig.AutoAward }).click(function () {
                Config.PlayerConfig.AutoAward = $(this).is(":checked");
            });
            $("#PartialSetting #ckBox_KeepMustShip").attr({ "checked": Config.MoreSetting.KeepMustShip }).click(function () {
                Config.MoreSetting.KeepMustShip = $(this).is(":checked");
            });
            $("#PartialSetting #ckBox_StopOnGetNewShip").attr({ "checked": Config.MoreSetting.StopOnGetNewShip }).click(function () {
                Config.MoreSetting.StopOnGetNewShip = $(this).is(":checked");
            });
            $("#PartialSetting #ckBox_StopOnGetForceShip").attr({ "checked": Config.MoreSetting.StopOnGetForceShip == true }).click(function () {
                Config.MoreSetting.StopOnGetForceShip = $(this).is(":checked");
            });
            $("#PartialSetting #ckBox_RepairRubDown").attr({ "checked": Config.MoreSetting.RepairRubDown == true }).click(function () {
                Config.MoreSetting.RepairRubDown = $(this).is(":checked");
            });
            $("#PartialSetting #ckBox_AutoLiaoLi").attr({ "checked": Config.MoreSetting.AutoLiaoLi == true }).click(function () {
                Config.MoreSetting.AutoLiaoLi = $(this).is(":checked");
            });
            $("#PartialSetting #ckBox_StopOnDayGetShipLimit").attr({ "checked": Config.MoreSetting.StopOnDayGetShipLimit }).click(function () {
                Config.MoreSetting.StopOnDayGetShipLimit = $(this).is(":checked");
            });
            $("#PartialSetting #ckBox_StopOnLowQuickRepair").attr({ "checked": Config.MoreSetting.StopOnLowQuickRepair }).click(function () {
                Config.MoreSetting.StopOnLowQuickRepair = $(this).is(":checked");
            });
            $("#PartialSetting #ckBox_StopOnMaxLevel").attr({ "checked": Config.MoreSetting.StopOnMaxLevel }).click(function () {
                Config.MoreSetting.StopOnMaxLevel = $(this).is(":checked");
            });
            $("#PartialSetting #ckBox_QianTingDanHeng").attr({ "checked": Config.MoreSetting.QianTingDanHeng }).click(function () {
                Config.MoreSetting.QianTingDanHeng = $(this).is(":checked");
            });
            $("#PartialSetting #StopOnLowQuickRepairNumber").html(Config.MoreSetting.StopOnLowQuickRepairNumber.toString()).click(function () {
                Dailog.CreatDialog({
                    Title: "修改快修限制值", FormNodes: List.From([{
                            Name: "Value",
                            Type: Dailog.FormNodeType.text,
                            Text: "",
                            Value: Config.MoreSetting.StopOnLowQuickRepairNumber.toString(),
                            Validates: List.From([{ Key: "required", Value: true, Message: "请输入数量" }, { Key: "digits", Value: true, Message: "请输入正确的数量" }])
                        }]), OnSubmit: function (fromJsonObj, $modal) {
                        $modal.find("[data-check=save]").attr("disabled", "disabled");
                        $modal.find("[data-dismiss=modal]").triggerHandler("click");
                        var Value = fromJsonObj.Value.ToNumber();
                        if (Value >= 0 && Value <= 100000) {
                            Config.MoreSetting.StopOnLowQuickRepairNumber = Value;
                            $("#PartialSetting #StopOnLowQuickRepairNumber").html(Value.toString());
                        }
                    }
                });
            });
            $("#PartialSetting #StopOnLowQuickRepairNumber").prev(".fa").click(function () {
                if (Config.MoreSetting.StopOnLowQuickRepairNumber > 0) {
                    Config.MoreSetting.StopOnLowQuickRepairNumber--;
                    $("#PartialSetting #StopOnLowQuickRepairNumber").html(Config.MoreSetting.StopOnLowQuickRepairNumber.toString());
                }
            });
            $("#PartialSetting #StopOnLowQuickRepairNumber").next(".fa").click(function () {
                Config.MoreSetting.StopOnLowQuickRepairNumber++;
                $("#PartialSetting #StopOnLowQuickRepairNumber").html(Config.MoreSetting.StopOnLowQuickRepairNumber.toString());
            });
            $("#PartialSetting #ckBox_DarkSteel").attr({ "checked": Config.MoreSetting.DarkSteel }).click(function () {
                Config.MoreSetting.DarkSteel = $(this).is(":checked");
            });
            $("#PartialSetting #ckBox_InitTodayReflash").attr({ "checked": Config.MoreSetting.InitTodayReflash }).click(function () {
                Config.MoreSetting.InitTodayReflash = $(this).is(":checked");
            });
            $("[data-action=ToPageTuJian]").click(function () {
                $("#PartialViewFooter").find("[data-partialid=PartialAreas]").triggerHandler("click");
                $("#PartialAreas .faces-cell[data-faceaction='slidePage|shiptujian'] ").triggerHandler("click");
            });
            var appaliveTypes = ["BGM.mp3", "silent.mp3", "Location", "Service", "ServiceAndMusic"];
            var IsUseApplive = function () {
                return appaliveTypes.indexOf(SysLocalStorage.Get("APPAlive")) >= 0;
            };
            $("#PartialSetting #ckBox_APPAlive").attr({ "checked": IsUseApplive() }).click(function (event) {
                var $this = $(this);
                var newValue = $this.is(":checked") ? (api.systemType == "android" ? "Service" : "Location") : "";
                SysLocalStorage.Set("APPAlive", newValue);
                console.log(SysLocalStorage.Get("APPAlive"));
                $("#PartialSetting #APPAlive_Type_Panel").fadeToggle(300);
                if ($this.is(":checked")) {
                    $("#PartialSetting [name='ckBox_APPAlive_Type'][value='" + SysLocalStorage.Get("APPAlive") + "']").click();
                }
                MessageBox.Show("更改成功，重启后生效.<br />" + (api.systemType.toLowerCase() == "android" ? "" : ""));
            });
            if (api.systemType == "android") {
                $("#ckBox_APPAlive").parent().siblings(".sayTip").attr("title", "勾选后可实现后台运行\\n无声需配合群文件后台设置方法但不会亮屏\\n图省事建议用模式二\\n模式二无效的用模式三");
                $("#PartialSetting [name='ckBox_APPAlive_Type'][value=Location]").parent().hide();
                $("#PartialSetting [name='ckBox_APPAlive_Type'][value='BGM.mp3']").parent().hide();
            }
            else {
                $("#ckBox_APPAlive").parent().siblings(".sayTip").attr("title", "勾选后可实现后台运行\\nIOS建议用定位\\n重启后要给始终权限");
                $("#PartialSetting [name='ckBox_APPAlive_Type'][value=Service]").parent().hide();
                $("#PartialSetting [name='ckBox_APPAlive_Type'][value=ServiceAndMusic]").parent().hide();
            }
            if (IsUseApplive()) {
                $("#PartialSetting #APPAlive_Type_Panel").show();
                $("#PartialSetting [name='ckBox_APPAlive_Type'][value='" + (IsUseApplive() ? SysLocalStorage.Get("APPAlive") : "silent.mp3") + "']").click();
            }
            $("#PartialSetting [name='ckBox_APPAlive_Type']").change(function () {
                var value = $(this).val();
                var old = SysLocalStorage.Get("APPAlive");
                SysLocalStorage.Set("APPAlive", value);
                if (old && old != value) {
                    MessageBox.Show("更改成功，重启后生效.");
                }
            });
            $("#PartialSetting #ckBox_Notification").attr({ "checked": SysLocalStorage.Get("APPNotification") == 1 }).click(function (event) {
                SysLocalStorage.Set("APPNotification", SysLocalStorage.Get("APPNotification") == 1 ? 0 : 1);
            });
            $("#PartialSetting #ckBox_LowEffect").attr({ "checked": SysLocalStorage.Get("LowEffect") == 1 }).click(function (event) {
                SysLocalStorage.Set("LowEffect", SysLocalStorage.Get("LowEffect") == 1 ? 0 : 1);
            });
        };
        SettingPage.InitAutoDismantle = function () {
            $("[data-action=SettingAutoDismantle]").click(function () {
                Dailog.CreatDialog({
                    Title: "自动分解设定",
                    FormNodes: List.From([]),
                    AnimateIn: "zoomIn",
                    AnimateOut: "zoomOut",
                    OnBuild: function ($modal) {
                        $modal.find(".modal-title").append(" <i class=\"fa fa-yelp\"></i>");
                        $modal.find(".modal-footer").remove();
                        $modal.find(".modal-dialog").css("animation-duration", "0.6s");
                        $modal.addClass("modal_missionPanel_setAutoDismantle");
                        var $Detail = $(doT.template($("#PartialSetting [data-tempid='setAutoDismantleTemp']").html())());
                        $modal.find(".modal-body").html("").append($Detail);
                        var height = $modal.find(".modal-content").outerHeight();
                        var wHeigt = $(window).height();
                        $modal.find(".modal-dialog").css("margin-top", (wHeigt - height) / 2);
                        Config.PlayerConfig.AutoDismantleSetting.AllowTypes = Config.PlayerConfig.AutoDismantleSetting.AllowTypes.Distinct();
                        $modal.find(".disNumber .number").html(Config.PlayerConfig.AutoDismantleSetting.DisNumber.toString());
                        $modal.find(".disNumber .fa").click(function () {
                            var isPlus = $(this).hasClass("fa-arrow-right");
                            var $number = $(this).parent().children(".number");
                            var currentValue = $number.html().ToNumber();
                            if (currentValue < 40 && isPlus == true) {
                                $number.html((currentValue + 1).toString());
                                Config.PlayerConfig.AutoDismantleSetting.DisNumber = currentValue + 1;
                            }
                            if (currentValue > 5 && isPlus == false) {
                                $number.html((currentValue - 1).toString());
                                Config.PlayerConfig.AutoDismantleSetting.DisNumber = currentValue - 1;
                            }
                        });
                        $modal.find("#ckBox_UnloadEquip").attr({ "checked": Config.PlayerConfig.AutoDismantleSetting.UnloadEquip }).click(function () {
                            Config.PlayerConfig.AutoDismantleSetting.UnloadEquip = $(this).is(":checked");
                        });
                        Config.PlayerConfig.AutoDismantleSetting.AllowTypes.ForEach(function (typeid) {
                            $modal.find(".checkPanel.allow dl").append("<dd data-id=" + typeid + ">" + DBEnum.ENUM_ShipType[typeid] + "</dd>");
                        });
                        for (var tp in DBEnum.ENUM_ShipType) {
                            if (isNaN(parseInt(tp)) == false && tp != "0") {
                                var typeid = parseInt(tp);
                                if (Config.PlayerConfig.AutoDismantleSetting.AllowTypes.Contains(typeid) == false) {
                                    $modal.find(".checkPanel.disallow dl").append("<dd data-id=" + typeid + ">" + DBEnum.ENUM_ShipType[typeid] + "</dd>");
                                }
                            }
                        }
                        ;
                        var vw = $(window).width() / 100;
                        var resetPostion = function () {
                            $modal.find(".checkPanel.allow dl").css("height", (Math.floor($modal.find(".checkPanel.allow dd").length / 8) + ($modal.find(".checkPanel.allow dd").length % 8 == 0 ? 0 : 1)) * 10.5 * vw + "px");
                            $modal.find(".checkPanel.allow dd").each(function (index, elem) {
                                var $elem = $(elem);
                                var xPostion = (index % 8);
                                var yPostion = Math.floor(index / 8);
                                $elem.css({ "left": (xPostion * vw * 10.5) + "px", "top": (yPostion * vw * 10.5) + "px" });
                            });
                            $modal.find(".checkPanel.disallow dl").css("height", (Math.floor($modal.find(".checkPanel.disallow dd").length / 8) + ($modal.find(".checkPanel.disallow dd").length % 8 == 0 ? 0 : 1)) * 10.5 * vw + "px");
                            $modal.find(".checkPanel.disallow dd").each(function (index, elem) {
                                var $elem = $(elem);
                                var xPostion = (index % 8);
                                var yPostion = Math.floor(index / 8);
                                $elem.css({ "left": (xPostion * vw * 10.5) + "px", "top": (yPostion * vw * 10.5) + "px" });
                            });
                        };
                        resetPostion();
                        var bindSetAutoDismantleDD = function ($d) {
                            $d.click(function () {
                                var $removeDom = $(this);
                                if ($removeDom.hasClass("removeing")) {
                                    return;
                                }
                                var FromPostion = $removeDom.parents(".checkPanel").hasClass("allow") ? "allow" : "disallow";
                                var ToPostion = $removeDom.parents(".checkPanel").hasClass("allow") ? "disallow" : "allow";
                                var tpid = $removeDom.attr("data-id").ToNumber();
                                $removeDom.addClass("removeing").addClass("animated").addClass("zoomOut");
                                setTimeout(function () {
                                    $removeDom.remove();
                                    resetPostion();
                                }, 400);
                                var $newDOM = $("<dd data-id=" + tpid + ">" + $removeDom.html() + "</dd>");
                                $modal.find(" .checkPanel." + ToPostion + " dl").append($newDOM);
                                resetPostion();
                                $newDOM.addClass("animated").addClass("zoomIn");
                                bindSetAutoDismantleDD($newDOM);
                                if (ToPostion == "allow") {
                                    Config.PlayerConfig.AutoDismantleSetting.AllowTypes.Add(tpid);
                                }
                                else {
                                    Config.PlayerConfig.AutoDismantleSetting.AllowTypes.Remove(tpid);
                                }
                            });
                        };
                        $modal.find(".checkPanel dd").each(function (index, elem) {
                            bindSetAutoDismantleDD($(elem));
                        });
                    },
                    OnSubmit: function (fromJsonObj, $modal) { }
                });
            });
        };
        SettingPage.InitAutoStrengthen = function () {
            $("[data-action=SettingAutoStrengthen]").click(function () {
                Dailog.CreatDialog({
                    Title: "自动强化设定",
                    FormNodes: List.From([]),
                    AnimateIn: "zoomIn",
                    AnimateOut: "zoomOut",
                    OnBuild: function ($modal) {
                        $modal.find(".modal-title").append(" <i class=\"fa fa-yelp\"></i>");
                        $modal.find(".modal-footer").remove();
                        $modal.find(".modal-dialog").css("animation-duration", "0.6s");
                        $modal.addClass("modal_missionPanel_setAutoStrengthen");
                        var $Detail = $(doT.template($("#PartialSetting [data-tempid='setAutoStrengthenTemp']").html())());
                        $modal.find(".modal-body").html("").append($Detail);
                        $modal.find("[data-action=ToPageAutoStrengthen]").click(function () {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            $modal.find("[data-dismiss]").triggerHandler("click");
                                            $("#PartialViewFooter").find("[data-partialid=PartialAreas]").triggerHandler("click");
                                            return [4, Sleep(200)];
                                        case 1:
                                            _a.sent();
                                            $("#PartialAreas .faces-cell[data-faceaction='slidePage|autoqianghua'] ").triggerHandler("click");
                                            return [2];
                                    }
                                });
                            });
                        });
                        $modal.find("[data-allowatt]").toArray().forEach(function (dom) {
                            var $dl = $(dom).find("dl");
                            var hasAtts = Config.MoreSetting.AutoStrengthenSetting[$(dom).attr("data-allowatt")];
                            hasAtts.ForEach(function (c) {
                                $dl.append("<dd data-id=\"" + c + "\" class=\"active\">" + DBEnum.ENUM_ShipType[c] + "</dd>");
                            });
                            [12, 10, 7, 2, 6, 4].forEach(function (c) {
                                if (hasAtts.IndexOf(c) == -1) {
                                    $dl.append("<dd data-id=\"" + c + "\" class=\"disabled\">" + DBEnum.ENUM_ShipType[c] + "</dd>");
                                }
                            });
                        });
                        $modal.find("[data-allowatt]").find("dd").click(function () {
                            var $dd = $(this);
                            var $dl = $dd.parent();
                            var id = $dd.attr("data-id").ToNumber();
                            var Att = Config.MoreSetting.AutoStrengthenSetting[$dl.parents(".checkPanel").eq(0).attr("data-allowatt")];
                            if ($dd.hasClass("disabled")) {
                                if ($dl.children(".active").length == 0) {
                                    $dl.prepend($dd);
                                }
                                else {
                                    $dl.children(".active").last().after($dd);
                                }
                                $dd.removeClass("disabled").addClass("active");
                                Att.Add(id);
                            }
                            else {
                                $dl.append($dd);
                                $dd.addClass("disabled").removeClass("active");
                                Att.Remove(id);
                            }
                        });
                        $modal.find(".disNumber .number[data-att=OverAtk]").html(Config.MoreSetting.AutoStrengthenSetting.OverAtk.toString());
                        $modal.find(".disNumber .number[data-att=OverTorpedo]").html(Config.MoreSetting.AutoStrengthenSetting.OverTorpedo.toString());
                        $modal.find(".disNumber .number[data-att=OverDef]").html(Config.MoreSetting.AutoStrengthenSetting.OverDef.toString());
                        $modal.find(".disNumber .number[data-att=OverAirDef]").html(Config.MoreSetting.AutoStrengthenSetting.OverAirDef.toString());
                        $modal.find(".disNumber .number[data-att=DockFreeNumber]").html(Config.MoreSetting.AutoStrengthenSetting.DockFreeNumber.toString());
                        $modal.find(".disNumber .fa").click(function () {
                            var isPlus = $(this).hasClass("fa-arrow-right");
                            var $number = $(this).parent().children(".number");
                            var att = $number.attr("data-att");
                            var currentValue = $number.html().ToNumber();
                            if (currentValue < 50 && isPlus == true) {
                                $number.html((currentValue + 1).toString());
                                if (att == "OverAtk") {
                                    Config.MoreSetting.AutoStrengthenSetting.OverAtk = currentValue + 1;
                                }
                                if (att == "OverTorpedo") {
                                    Config.MoreSetting.AutoStrengthenSetting.OverTorpedo = currentValue + 1;
                                }
                                if (att == "OverDef") {
                                    Config.MoreSetting.AutoStrengthenSetting.OverDef = currentValue + 1;
                                }
                                if (att == "OverAirDef") {
                                    Config.MoreSetting.AutoStrengthenSetting.OverAirDef = currentValue + 1;
                                }
                                if (att == "DockFreeNumber") {
                                    Config.MoreSetting.AutoStrengthenSetting.DockFreeNumber = currentValue + 1;
                                }
                            }
                            if (currentValue > 0 && isPlus == false) {
                                $number.html((currentValue - 1).toString());
                                if (att == "OverAtk") {
                                    Config.MoreSetting.AutoStrengthenSetting.OverAtk = currentValue - 1;
                                }
                                if (att == "OverTorpedo") {
                                    Config.MoreSetting.AutoStrengthenSetting.OverTorpedo = currentValue - 1;
                                }
                                if (att == "OverDef") {
                                    Config.MoreSetting.AutoStrengthenSetting.OverDef = currentValue - 1;
                                }
                                if (att == "OverAirDef") {
                                    Config.MoreSetting.AutoStrengthenSetting.OverAirDef = currentValue - 1;
                                }
                                if (att == "DockFreeNumber") {
                                    Config.MoreSetting.AutoStrengthenSetting.DockFreeNumber = currentValue - 1;
                                }
                            }
                        });
                        $modal.find("#ckBox_UseQinXunFirst").attr({ "checked": Config.MoreSetting.AutoStrengthenSetting.UseQinXunFirst }).click(function () {
                            Config.MoreSetting.AutoStrengthenSetting.UseQinXunFirst = $(this).is(":checked");
                        });
                        $modal.find("#ckBox_SkillLevelUp").attr({ "checked": Config.MoreSetting.AutoStrengthenSetting.SkillLevelUp }).click(function () {
                            Config.MoreSetting.AutoStrengthenSetting.SkillLevelUp = $(this).is(":checked");
                        });
                        $modal.find(".OrderByStrengthenShip").val(Config.MoreSetting.AutoStrengthenSetting.OrderByStrengthenShip).change(function () {
                            Config.MoreSetting.AutoStrengthenSetting.OrderByStrengthenShip = $(this).val().ToNumber();
                        });
                    },
                    OnSubmit: function (fromJsonObj, $modal) { }
                });
            });
        };
        SettingPage.InitAutoRepair = function () {
            $("[data-action=SettingAutoRepair]").click(function () {
                Dailog.CreatDialog({
                    Title: "自动泡澡设定",
                    FormNodes: List.From([]),
                    AnimateIn: "zoomIn",
                    AnimateOut: "zoomOut",
                    OnBuild: function ($modal) {
                        $modal.find(".modal-title").append(" <i class=\"fa fa-yelp\"></i>");
                        $modal.find(".modal-footer").remove();
                        $modal.find(".modal-dialog").css("animation-duration", "0.6s");
                        $modal.addClass("modal_missionPanel_setAutoRepair");
                        var $Detail = $(doT.template($("#PartialSetting [data-tempid='setAutoRepairTemp']").html())());
                        $modal.find(".modal-body").html("").append($Detail);
                        $modal.find("#ckBox_AutoRepair_Leisure").attr({ "checked": Config.MoreSetting.AutoRepair_Leisure }).click(function () {
                            Config.MoreSetting.AutoRepair_Leisure = $(this).is(":checked");
                        });
                        $modal.find(".autoRepair_Order").val(Config.MoreSetting.AutoRepair_Order).change(function () {
                            Config.MoreSetting.AutoRepair_Order = $(this).val();
                        });
                        $modal.find(".disNumber .number[data-att=AutoRepair_MinutesMin]").html(Config.MoreSetting.AutoRepair_MinutesMin.toString()).click(function () {
                            Dailog.CreatDialog({
                                Title: "修改阀值", FormNodes: List.From([{
                                        Name: "Value",
                                        Type: Dailog.FormNodeType.text,
                                        Text: "",
                                        Value: Config.MoreSetting.AutoRepair_MinutesMin.toString(),
                                        Validates: List.From([{ Key: "required", Value: true, Message: "请输入数量" }, { Key: "digits", Value: true, Message: "请输入正确的数量" }])
                                    }]), OnSubmit: function (fromJsonObj, $modal1) {
                                    $modal1.find("[data-check=save]").attr("disabled", "disabled");
                                    $modal1.find("[data-dismiss=modal]").triggerHandler("click");
                                    var Value = fromJsonObj.Value.ToNumber();
                                    if (Value >= 0 && Value <= 10000) {
                                        Config.MoreSetting.AutoRepair_MinutesMin = Value;
                                        $modal.find(".disNumber .number[data-att=AutoRepair_MinutesMin]").html(Value.toString());
                                    }
                                }
                            });
                        });
                        $modal.find(".disNumber .number[data-att=AutoRepair_MinutesMax]").html(Config.MoreSetting.AutoRepair_MinutesMax.toString()).click(function () {
                            Dailog.CreatDialog({
                                Title: "修改阀值", FormNodes: List.From([{
                                        Name: "Value",
                                        Type: Dailog.FormNodeType.text,
                                        Text: "",
                                        Value: Config.MoreSetting.AutoRepair_MinutesMax.toString(),
                                        Validates: List.From([{ Key: "required", Value: true, Message: "请输入数量" }, { Key: "digits", Value: true, Message: "请输入正确的数量" }])
                                    }]), OnSubmit: function (fromJsonObj, $modal1) {
                                    $modal1.find("[data-check=save]").attr("disabled", "disabled");
                                    $modal1.find("[data-dismiss=modal]").triggerHandler("click");
                                    var Value = fromJsonObj.Value.ToNumber();
                                    if (Value >= 0 && Value <= 10000) {
                                        Config.MoreSetting.AutoRepair_MinutesMax = Value;
                                        $modal.find(".disNumber .number[data-att=AutoRepair_MinutesMax]").html(Value.toString());
                                    }
                                }
                            });
                        });
                        $modal.find(".disNumber .number[data-att=AutoRepair_MinutesMin]").prev(".fa").click(function () {
                            $modal.find(".disNumber .number[data-att=AutoRepair_MinutesMin]").triggerHandler("click");
                        });
                        $modal.find(".disNumber .number[data-att=AutoRepair_MinutesMax]").next(".fa").click(function () {
                            $modal.find(".disNumber .number[data-att=AutoRepair_MinutesMax]").triggerHandler("click");
                        });
                    },
                    OnSubmit: function (fromJsonObj, $modal) { }
                });
            });
        };
        SettingPage.InitNotification = function () {
            $("[data-action=SettingNotification]").click(function () {
                Dailog.CreatDialog({
                    Title: "日志通知设定",
                    FormNodes: List.From([]),
                    AnimateIn: "zoomIn",
                    AnimateOut: "zoomOut",
                    OnBuild: function ($modal) {
                        $modal.find(".modal-title").append(" <i class=\"fa fa-yelp\"></i>");
                        $modal.find(".modal-footer").remove();
                        $modal.find(".modal-dialog").css("animation-duration", "0.6s");
                        $modal.addClass("modal_missionPanel_setNotification");
                        var listDic = [];
                        for (var i in DBEnum.ENUM_NotificationType) {
                            if (parseInt(i) > 0) {
                                listDic.push({ Name: DBEnum.ENUM_NotificationType[i], Value: i });
                            }
                        }
                        var $Detail = $(doT.template($("#PartialSetting [data-tempid='setNotificationTemp']").html())(listDic));
                        $modal.find(".modal-body").html("").append($Detail);
                        if (Config.MoreSetting.CustomNotification == undefined) {
                            Config.MoreSetting.CustomNotification = "";
                        }
                        Config.MoreSetting.CustomNotification.SplitOutEmpty(",").ForEach(function (c) {
                            var $ckBox = $Detail.find("#ckBox_Notification_" + c);
                            if ($ckBox.length > 0) {
                                $ckBox.attr({ "checked": true });
                            }
                        });
                        $Detail.find("[data-tid]").click(function () {
                            var tid = $(this).attr("data-tid").toString();
                            var rl = Config.MoreSetting.CustomNotification.SplitOutEmpty(",");
                            if (rl.Contains(tid) == false) {
                                rl.Add(tid);
                            }
                            else {
                                rl.Remove(tid);
                            }
                            Config.MoreSetting.CustomNotification = rl.JoinToString(",");
                        });
                    },
                    OnSubmit: function (fromJsonObj, $modal) { }
                });
            });
        };
        SettingPage.OpenExpertSetting = function (expertPVE, OnModify, FromCopy) {
            if (FromCopy === void 0) { FromCopy = false; }
            var $SlidePicker = $(doT.template($("#PartialSetting").find("[data-tempid='PVEExpertSettingTemp']").html())(NJson.ObjListToArray({})));
            if (FromCopy == true) {
                $SlidePicker.removeClass("slideInRight");
            }
            $("body").append($SlidePicker);
            $SlidePicker.find(".modelheader [data-dismiss]").click(function () {
                $SlidePicker.removeClass("slideInRight").addClass("slideOutRight");
                setTimeout(function () {
                    $SlidePicker.remove();
                }, 500);
            });
            PageScroll.BindScroll($("#modalPVEExpertSetting"), "滑动关闭高级设置窗体", function (ev) { }, function (ev) { return false; }, function (ev) { }, function (ev) {
                var windowWidth = $(window).width();
                if (ev.Start_X <= (windowWidth / 20) && ev.Move_X >= (windowWidth / 10)) {
                    $("#modalPVEExpertSetting").find(".modelheader [data-dismiss]").triggerHandler("click");
                }
            });
            var LocalSaveIni = NJson.DeepCopy(expertPVE);
            var ModifyINI = NJson.DeepCopy(expertPVE);
            ModifyINI = ModifyINI == undefined ? {
                CustiomPVEID: "",
                CanChangeShips: false,
                CanChangeEquip: false,
                CanChangeRepairLevel: false,
                AssignShips: List.From([List.From([]), List.From([]), List.From([]), List.From([]), List.From([]), List.From([])]),
                IsBathChange: true,
                IsLevelChange: false,
                IsUnloadEquip: false,
                AutoSetEquips: List.From([List.From([0, 0, 0, 0]), List.From([0, 0, 0, 0]), List.From([0, 0, 0, 0]), List.From([0, 0, 0, 0]), List.From([0, 0, 0, 0]), List.From([0, 0, 0, 0])]),
                RepairTypes: List.From([2, 2, 2, 2, 2, 2]),
            } : ModifyINI;
            var ReloadModal = function (expertPVE) {
                var TempExpertPVE = {
                    CanChangeShips: expertPVE.CanChangeShips,
                    CanChangeEquip: expertPVE.CanChangeEquip,
                    CanChangeRepairLevel: expertPVE.CanChangeRepairLevel,
                    IsBathChange: expertPVE.IsBathChange,
                    IsLevelChange: expertPVE.IsLevelChange,
                    IsUnloadEquip: expertPVE.IsUnloadEquip,
                    AssignShips: expertPVE.AssignShips.Select(function (shipids) { return shipids.Select(function (shipid) {
                        var ship = Player.GetShip(shipid);
                        ship = ship == null ? new Net.Result.Ship() : ship;
                        var ini = Player.GetIniShip(ship);
                        return {
                            ID: ship.id,
                            Level: ship.level,
                            Name: ini == null ? "" : ini.Name,
                            Star: ini == null ? 1 : ini.Star,
                            ShipImg: ModalShower.GetShipPic(ini, ship.skin_cid),
                            ShipBackImg: ModalShower.GetShipBackPic(ini),
                        };
                    }); }),
                    AutoSetEquips: expertPVE.AutoSetEquips.Select(function (cids) { return cids.Select(function (cid) {
                        var ini = Player.GetIniEquipment(cid);
                        return {
                            CID: ini == null ? 0 : ini.CID,
                            Name: ini == null ? "" : ini.Title,
                            Star: ini == null ? 1 : ini.Star,
                            EqipImg: ModalShower.GetEquipPic(ini),
                            EqipBackImg: ModalShower.GetEquipBackPic(ini),
                        };
                    }); }),
                };
                var $SlideBody = $(doT.template($("#PartialSetting").find("[data-tempid='PVEExpertSettingBodyTemp']").html())(NJson.ObjListToArray(TempExpertPVE)));
                $SlideBody.find(".rankbody .ships dl").each(function () {
                    var vw = $(window).width() / 100;
                    $(this).width($(this).children("dd").length * vw * 11);
                });
                $SlidePicker.find(".modalbody").html("").append($SlideBody);
                $SlideBody.find(".btnImportSetting").click(function () {
                    var listCopyedSettings = Config.MoreSetting.ExpertPVESettings.Where(function (c) { return c.CustiomPVEID != ModifyINI.CustiomPVEID && MissionWorker.Works.Select(function (d) { return d.CustiomPVEID; }).Contains(c.CustiomPVEID); });
                    if (listCopyedSettings.Count() == 0) {
                        MessageBox.Show("没有已经定义过的高级设置，无法复制");
                    }
                    else {
                        Dailog.CreatDialog({
                            Title: "选择复制那个任务的高级设置", FormNodes: List.From([{
                                    Name: "CustiomPVEID",
                                    Type: Dailog.FormNodeType.select,
                                    Text: "",
                                    Data: listCopyedSettings.Select(function (c) { return ({ Name: MissionWorker.Works.FirstOrDefault(function (d) { return c.CustiomPVEID == d.CustiomPVEID; }).WorkName, Value: c.CustiomPVEID }); }),
                                    Validates: List.From([{ Key: "required", Value: true, Message: "请选择配置" }])
                                }]), OnBuild: function ($modal) {
                                $modal.css("z-index", "1082");
                                $modal.next().css("z-index", "1081");
                            }, OnSubmit: function (fromJsonObj, $modal) {
                                $modal.find("[data-check=save]").attr("disabled", "disabled");
                                $modal.find("[data-dismiss=modal]").triggerHandler("click");
                                var CustiomPVEID = fromJsonObj.CustiomPVEID;
                                var newExpSetting = NJson.DeepCopy(Config.MoreSetting.ExpertPVESettings.FirstOrDefault(function (c) { return c.CustiomPVEID == CustiomPVEID; }));
                                newExpSetting.CustiomPVEID = "";
                                $SlidePicker.remove();
                                SettingPage.OpenExpertSetting(newExpSetting, OnModify, true);
                            }
                        });
                    }
                });
                $SlideBody.find(".rankbody [data-bimg]").each(function (index, elem) {
                    var $bdimg = $(elem);
                    var bimg = $bdimg.attr("data-bimg");
                    if (bimg) {
                        var imgPath = bimg.indexOf("http") >= 0 ? bimg : (api.wgtRootDir.replace("file:", "contents:") + bimg.substring(2, bimg.length));
                        $bdimg.css("background", "url(" + imgPath + ")").css("background-size", "100% 100%");
                    }
                });
                $SlideBody.find("[data-action=SwitchChangeShips]").click(function () {
                    if ($(this).hasClass("on")) {
                        ModifyINI.CanChangeShips = false;
                        $(this).removeClass("on");
                        $SlideBody.find("#ckBox_IsBathChange").parent().hide();
                        $SlideBody.find("#ckBox_IsLevelChange").parent().hide();
                        $(".fleetlist .rankheader .ships").addClass("disabled");
                        $(".fleetlist .rankbody .ships").addClass("disabled");
                    }
                    else {
                        ModifyINI.CanChangeShips = true;
                        $(this).addClass("on");
                        $SlideBody.find("#ckBox_IsBathChange").parent().show();
                        $SlideBody.find("#ckBox_IsLevelChange").parent().show();
                        $(".fleetlist .rankheader .ships").removeClass("disabled");
                        $(".fleetlist .rankbody .ships").removeClass("disabled");
                    }
                });
                if (!(ModifyINI && ModifyINI.CanChangeShips)) {
                    $SlideBody.find("[data-action=SwitchChangeShips]").triggerHandler("click");
                }
                $SlideBody.find("[data-action=SwitchChangeEquip]").click(function () {
                    if ($(this).hasClass("on")) {
                        ModifyINI.CanChangeEquip = false;
                        $(this).removeClass("on");
                        $SlideBody.find("#ckBox_IsUnloadEquip").parent().hide();
                        $(".fleetlist .rankheader .equips").addClass("disabled");
                        $(".fleetlist .rankbody .equips").addClass("disabled");
                    }
                    else {
                        ModifyINI.CanChangeEquip = true;
                        $(this).addClass("on");
                        $SlideBody.find("#ckBox_IsUnloadEquip").parent().show();
                        $(".fleetlist .rankheader .equips").removeClass("disabled");
                        $(".fleetlist .rankbody .equips").removeClass("disabled");
                    }
                });
                if (!(ModifyINI && ModifyINI.CanChangeEquip)) {
                    $SlideBody.find("[data-action=SwitchChangeEquip]").triggerHandler("click");
                }
                $SlideBody.find("[data-action=SwitchChangeRepair]").click(function () {
                    if ($(this).hasClass("on")) {
                        ModifyINI.CanChangeRepairLevel = false;
                        $(this).removeClass("on");
                        $(".fleetlist .rankheader .repair").addClass("disabled");
                        $(".fleetlist .rankbody .repair").addClass("disabled");
                    }
                    else {
                        ModifyINI.CanChangeRepairLevel = true;
                        $(this).addClass("on");
                        $(".fleetlist .rankheader .repair").removeClass("disabled");
                        $(".fleetlist .rankbody .repair").removeClass("disabled");
                    }
                });
                if (!(ModifyINI && ModifyINI.CanChangeRepairLevel)) {
                    $SlideBody.find("[data-action=SwitchChangeRepair]").triggerHandler("click");
                }
                $SlideBody.find("#ckBox_IsBathChange").attr({ "checked": TempExpertPVE.IsBathChange }).click(function () {
                    ModifyINI.IsBathChange = $(this).is(":checked");
                });
                $SlideBody.find("#ckBox_IsLevelChange").attr({ "checked": TempExpertPVE.IsLevelChange }).click(function () {
                    ModifyINI.IsLevelChange = $(this).is(":checked");
                });
                $SlideBody.find("#ckBox_IsUnloadEquip").attr({ "checked": TempExpertPVE.IsUnloadEquip }).click(function () {
                    ModifyINI.IsUnloadEquip = $(this).is(":checked");
                });
                $SlideBody.find(".fleetRanks").each(function (rindex, elem) {
                    var $fleetRanks = $(elem);
                    var $rankheader = $fleetRanks.find(".rankheader");
                    var $rankbody = $fleetRanks.find(".rankbody");
                    $rankheader.find(".ships .fa-question-circle").click(function () {
                        MessageBox.Show("任务中遇到要修理或满级 会依次向后替换到选择的舰队");
                    });
                    $rankheader.find(".equips").click(function () {
                        MessageBox.Show("每次替换舰船后都会按此装备安装，注意仓库里要有多余的装备且这个船能装，格子不足4个的按先后顺序换");
                    });
                    $rankheader.find(".repair").click(function () {
                        MessageBox.Show("单独设置每个位置的修理方式，会覆盖默认设置好的修理方式");
                    });
                    $rankheader.find("[data-action=ClearShips]").click(function () {
                        MessageBox.Confirm("确定清除？", function () {
                            ModifyINI.AssignShips[rindex] = new List();
                            ReloadModal(ModifyINI);
                        });
                    });
                    $rankbody.find(".ships .picker").click(function () {
                        if ($SlideBody.find("[data-action=SwitchChangeShips]").hasClass("on") == false) {
                            return MessageBox.Show("请先启用指定舰船");
                        }
                        ModalShower.SlideShipPickerQuick(function (c) { return Player.IsYuanZhangShip(c) == false && ModifyINI.AssignShips[rindex].Contains(c.id) == false; }, function (ships, isRange) {
                            return true;
                        }, function (ships, isRange) {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    if (isRange) {
                                        ModifyINI.AssignShips[rindex] = ships;
                                    }
                                    else {
                                        ModifyINI.AssignShips[rindex].Add(ships[0]);
                                    }
                                    ModifyINI.AssignShips[rindex] = ModifyINI.AssignShips[rindex].Distinct();
                                    setTimeout(function () {
                                        ReloadModal(ModifyINI);
                                    }, 500);
                                    return [2];
                                });
                            });
                        }, ModifyINI.AssignShips[rindex], 30, 1);
                    });
                    $rankbody.find(".ships [data-shipid]").click(function () {
                        if ($SlideBody.find("[data-action=SwitchChangeShips]").hasClass("on") == false) {
                            return MessageBox.Show("请先启用指定舰船");
                        }
                        var id = $(this).attr("data-shipid").ToNumber();
                        ModalShower.SlideShipPickerQuick(function (c) { return Player.IsYuanZhangShip(c) == false && ModifyINI.AssignShips[rindex].Contains(c.id) == false && c.id != id; }, function (ships, isRange) {
                            return true;
                        }, function (ships, isRange) {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    if (isRange) {
                                        ModifyINI.AssignShips[rindex] = ships;
                                    }
                                    else {
                                        ModifyINI.AssignShips[rindex].Replace(id, ships[0]);
                                    }
                                    ModifyINI.AssignShips[rindex] = ModifyINI.AssignShips[rindex].Distinct();
                                    setTimeout(function () {
                                        ReloadModal(ModifyINI);
                                    }, 500);
                                    return [2];
                                });
                            });
                        }, ModifyINI.AssignShips[rindex], 30, 1);
                    });
                    $rankbody.find(".repair select").val(ModifyINI.RepairTypes[rindex]).change(function () {
                        ModifyINI.RepairTypes[rindex] = $(this).val().toString().ToNumber();
                    });
                    $rankbody.find(".equips .picker").click(function () {
                        var index = $(this).attr("data-index").ToNumber();
                        var withOutEquipmentIds = Player.EquipmentVO.Where(function (c) {
                            if (c.num <= 0)
                                return true;
                            var ini = Player.GetIniEquipment(c.equipmentcid);
                            if (ini == null)
                                return true;
                            return false;
                        }).Select(function (c) { return c.equipmentcid; });
                        ModalShower.SlideEquipPicker(Player.EquipmentVO.Where(function (c) { return !(withOutEquipmentIds.Contains(c.equipmentcid)); }), function (equipcid) {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    ModifyINI.AutoSetEquips[rindex][index] = equipcid;
                                    setTimeout(function () {
                                        ReloadModal(ModifyINI);
                                    }, 500);
                                    return [2];
                                });
                            });
                        }, false);
                    });
                    $rankbody.find(".equips [data-eqcid]").click(function () {
                        var index = $(this).attr("data-index").ToNumber();
                        var OldEqCID = $(this).attr("data-eqcid").ToNumber();
                        var withOutEquipmentIds = Player.EquipmentVO.Where(function (c) {
                            if (c.num <= 0)
                                return true;
                            if (c.equipmentcid == OldEqCID)
                                return true;
                            var ini = Player.GetIniEquipment(c.equipmentcid);
                            if (ini == null)
                                return true;
                            return false;
                        }).Select(function (c) { return c.equipmentcid; });
                        ModalShower.SlideEquipPicker(Player.EquipmentVO.Where(function (c) { return !(withOutEquipmentIds.Contains(c.equipmentcid)); }), function (equipcid) {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    ModifyINI.AutoSetEquips[rindex][index] = equipcid;
                                    setTimeout(function () {
                                        ReloadModal(ModifyINI);
                                    }, 500);
                                    return [2];
                                });
                            });
                        }, true);
                    });
                });
            };
            ReloadModal(ModifyINI);
            $SlidePicker.find(".modalfoot .del").click(function () {
                MessageBox.Confirm("确定删除？", function () {
                    $SlidePicker.find(".modelheader [data-dismiss]").triggerHandler("click");
                    OnModify(null);
                });
            });
            $SlidePicker.find(".modalfoot .reset").click(function () {
                MessageBox.Confirm("确定重置？", function () {
                    ReloadModal(LocalSaveIni);
                });
            });
            $SlidePicker.find(".modalfoot .save").click(function () {
                if (ModifyINI.CanChangeShips) {
                    if (ModifyINI.AssignShips[0].Count() == 0) {
                        MessageBox.Show("旗舰不能为空");
                        return;
                    }
                    if (ModifyINI.AssignShips[1].Count() == 0 && ModifyINI.AssignShips[2].Count() > 0) {
                        MessageBox.Show("指定了3号舰未指定2号舰");
                        return;
                    }
                    if (ModifyINI.AssignShips[2].Count() == 0 && ModifyINI.AssignShips[3].Count() > 0) {
                        MessageBox.Show("指定了4号舰未指定3号舰");
                        return;
                    }
                    if (ModifyINI.AssignShips[3].Count() == 0 && ModifyINI.AssignShips[4].Count() > 0) {
                        MessageBox.Show("指定了5号舰未指定4号舰");
                        return;
                    }
                    if (ModifyINI.AssignShips[4].Count() == 0 && ModifyINI.AssignShips[5].Count() > 0) {
                        MessageBox.Show("指定了6号舰未指定5号舰");
                        return;
                    }
                    var firstShips = ModifyINI.AssignShips.Where(function (c) { return c.Count() > 0; }).Select(function (c) { return c[0]; });
                    if (firstShips.Distinct().Length != firstShips.Length || firstShips.Where(function (c) { return firstShips.Where(function (d) { return d != c && Player.IsSameShip(Player.GetShip(c), Player.GetShip(d)); }).Count() > 0; }).Count() > 0) {
                        MessageBox.Show("首发舰船不能重复");
                        return;
                    }
                }
                $SlidePicker.find(".modelheader [data-dismiss]").triggerHandler("click");
                OnModify(ModifyINI);
            });
        };
        SettingPage.DesShipDrap = NJson.Parse(AesSecret.DecryptByAES(ShipDrap)).Select(function (c) { return { CID: c.CID, Draps1: c.Draps1, Draps2: c.Draps2, Draps3: c.Draps3, Draps4: c.Draps4, CanBuild: c.CanBuild, Builds: c.Builds }; });
        return SettingPage;
    }());
    var MapSetting = (function () {
        function MapSetting() {
        }
        MapSetting.Init = function () {
            var _This = this;
            $("#PartialSetting #btnAddCustomSelecter").click(function () {
                Dailog.CreatDialog({
                    Title: "选择地图", FormNodes: List.From([{
                            Name: "MapChallengeID",
                            Type: Dailog.FormNodeType.select,
                            Text: "",
                            Data: PVEMap.Maps.MapDict.Select(function (c) { return ({ Name: c.MapName, Value: c.ChallengeID }); }),
                            Validates: List.From([{ Key: "required", Value: true, Message: "请选择地图" }])
                        }]), OnSubmit: function (fromJsonObj, $modal) {
                        $modal.find("[data-check=save]").attr("disabled", "disabled");
                        $modal.find("[data-dismiss=modal]").triggerHandler("click");
                        var MapChallengeID = fromJsonObj.MapChallengeID;
                        _This.CurrentMap = NJson.Parse(NJson.Stringify(PVEMap.Maps.MapDict.FirstOrDefault(function (c) { return c.ChallengeID == MapChallengeID; })));
                        _This.CurrentPVEExpert = null;
                        _This.CurrentPVEData = {
                            ChallengeID: MapChallengeID,
                            CustiomPVEID: "",
                            Remark: "",
                            RepairLevel: 2,
                            Paths: new List(),
                            WorkName: "",
                        };
                        _This.LoadPveDataToHTML();
                    }
                });
            });
            SettingPageIO.OnMoifyPVE = function (pveid) {
                var obj = MissionWorker.Works.FirstOrDefault(function (c) { return c.CustiomPVEID == pveid; });
                if (obj == null) {
                    MessageBox.Show("该任务已被删除！");
                }
                else {
                    _This.CurrentMap = NJson.Parse(NJson.Stringify(PVEMap.Maps.MapDict.FirstOrDefault(function (c) { return c.ChallengeID == obj.ChallengeID; })));
                    _This.CurrentPVEData = NJson.Parse(NJson.Stringify(obj));
                    Config.MoreSetting.ExpertPVESettings = Config.MoreSetting.ExpertPVESettings ? Config.MoreSetting.ExpertPVESettings : new List();
                    _This.CurrentPVEExpert = Config.MoreSetting.ExpertPVESettings.FirstOrDefault(function (c) { return c.CustiomPVEID == pveid; });
                    _This.LoadPveDataToHTML();
                }
            };
            $("#PartialSetting #btnSelectCustomSelecter").click(function () {
                Dailog.CreatDialog({
                    Title: "修改配置", FormNodes: List.From([{
                            Name: "CustiomPVEID",
                            Type: Dailog.FormNodeType.select,
                            Text: "",
                            Data: MissionWorker.Works.Where(function (c) { return c.CustiomPVEID != "99"; }).Select(function (c) { return ({ Name: c.WorkName, Value: c.CustiomPVEID }); }),
                            Validates: List.From([{ Key: "required", Value: true, Message: "请选择配置" }])
                        }]), OnSubmit: function (fromJsonObj, $modal) {
                        $modal.find("[data-check=save]").attr("disabled", "disabled");
                        $modal.find("[data-dismiss=modal]").triggerHandler("click");
                        var CustiomPVEID = fromJsonObj.CustiomPVEID;
                        var obj = MissionWorker.Works.FirstOrDefault(function (c) { return c.CustiomPVEID == CustiomPVEID; });
                        _This.CurrentMap = NJson.Parse(NJson.Stringify(PVEMap.Maps.MapDict.FirstOrDefault(function (c) { return c.ChallengeID == obj.ChallengeID; })));
                        _This.CurrentPVEData = NJson.Parse(NJson.Stringify(obj));
                        Config.MoreSetting.ExpertPVESettings = Config.MoreSetting.ExpertPVESettings ? Config.MoreSetting.ExpertPVESettings : new List();
                        _This.CurrentPVEExpert = Config.MoreSetting.ExpertPVESettings.FirstOrDefault(function (c) { return c.CustiomPVEID == CustiomPVEID; });
                        _This.LoadPveDataToHTML();
                    }
                });
            });
            var isOpenWebSelectering = false;
            $("#PartialSetting #btnOpenWebSelecter").click(function () {
                return __awaiter(this, void 0, void 0, function () {
                    var $CustompveWebSelecter, GetCouldResult, _a, _b, TempEntityData, $CustompveWebSelecterCustompvelistTemp;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                if (isOpenWebSelectering == true) {
                                    return [2, false];
                                }
                                $CustompveWebSelecter = $(doT.template($("#CustompveWebSelecterTemp").html())());
                                $("body").append($CustompveWebSelecter);
                                isOpenWebSelectering = true;
                                _b = (_a = NJson).DeserializeOfType;
                                return [4, NetHelper.HTTPTokenPost("https://crt.letgowin.com/IO/GetCloudPVEMaps", { LoginName: Config.LoginUser.LoginName })];
                            case 1:
                                GetCouldResult = _b.apply(_a, [(_c.sent()).ResponseString, {
                                        ErrorCode: -999,
                                        ErrorMessage: "连接服务器失败，请检查网络",
                                        Data: List.From([{
                                                ID: false,
                                                IsMy: false,
                                                Author: "",
                                                DownloadNumber: 0,
                                                HighNumber: 0,
                                                IsHigh: false,
                                                Name: "",
                                                ChallengeID: "",
                                                Remark: "",
                                            }])
                                    }]);
                                isOpenWebSelectering = false;
                                if (GetCouldResult.ErrorCode != 0) {
                                    MessageBox.Show(GetCouldResult.ErrorMessage);
                                    return [2];
                                }
                                TempEntityData = GetCouldResult.Data.Select(function (dt) {
                                    var mapName = PVEMap.Maps.MapDict.FirstOrDefault(function (c) { return c.ChallengeID == dt.ChallengeID; }) == null ? "" : PVEMap.Maps.MapDict.FirstOrDefault(function (c) { return c.ChallengeID == dt.ChallengeID; }).MapName;
                                    return {
                                        ID: dt.ID,
                                        IsMy: dt.IsMy,
                                        Author: dt.Author,
                                        DownloadNumber: dt.DownloadNumber,
                                        HighNumber: dt.HighNumber,
                                        IsHigh: dt.IsHigh,
                                        Name: dt.Name,
                                        ChallengeID: dt.ChallengeID,
                                        MapName: mapName,
                                        Remark: dt.Remark,
                                        SearchData: mapName + "|" + dt.Author + "|" + dt.Name,
                                    };
                                }).OrderByDescending(function (c) { return c.HighNumber; }).ThenByDescending(function (c) { return c.DownloadNumber; }).ThenBy(function (c) { return c.ChallengeID; });
                                $CustompveWebSelecterCustompvelistTemp = $(doT.template($("#CustompveWebSelecterCustompvelistTemp").html())(NJson.ObjListToArray(NJson.DeepCopy(TempEntityData))));
                                $CustompveWebSelecter.find(".custompvelist").append($CustompveWebSelecterCustompvelistTemp);
                                $CustompveWebSelecter.find(".modelheader [data-dismiss]").click(function () {
                                    $CustompveWebSelecter.removeClass("slideInRight").addClass("slideOutRight");
                                    setTimeout(function () {
                                        $CustompveWebSelecter.remove();
                                    }, 500);
                                });
                                $CustompveWebSelecter.find("#SerachText").keyup(function () {
                                    var value = $(this).val();
                                    if (value && !/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/.test(value)) {
                                        $CustompveWebSelecter.find(".custompve[data-searchdata*=" + value + "]").show();
                                        $CustompveWebSelecter.find(".custompve:not([data-searchdata*=" + value + "])").hide();
                                    }
                                    else if (!/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/.test(value)) {
                                        $CustompveWebSelecter.find(".custompve").show();
                                    }
                                });
                                $CustompveWebSelecter.find(".custompve [data-action=download]").click(function () {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var $custompve, id, downloadResult, _a, _b, datastring, obj;
                                        return __generator(this, function (_c) {
                                            switch (_c.label) {
                                                case 0:
                                                    $custompve = $(this).parents(".custompve");
                                                    id = $custompve.attr("data-id");
                                                    $CustompveWebSelecter.find(".modelheader [data-dismiss]").triggerHandler("click");
                                                    _b = (_a = NJson).DeserializeOfType;
                                                    return [4, NetHelper.HTTPTokenPost("https://crt.letgowin.com/IO/DownloadCloudPVEMaps", { LoginName: Config.LoginUser.LoginName, ID: id })];
                                                case 1:
                                                    downloadResult = _b.apply(_a, [(_c.sent()).ResponseString, { ErrorCode: -999, ErrorMessage: "连接服务器失败，请检查网络", Data: { Data: "" } }]);
                                                    if (downloadResult.ErrorCode != 0) {
                                                        MessageBox.Show(downloadResult.ErrorMessage);
                                                    }
                                                    else {
                                                        datastring = Encrypt.Base64Decrypt(downloadResult.Data.Data.ReplaceAll("%2B", "+").ReplaceAll("%3D", "="));
                                                        obj = NJson.Parse(datastring);
                                                        _This.CurrentMap = NJson.Parse(NJson.Stringify(PVEMap.Maps.MapDict.FirstOrDefault(function (c) { return c.ChallengeID == obj.ChallengeID; })));
                                                        _This.CurrentPVEData = {
                                                            ChallengeID: obj.ChallengeID,
                                                            CustiomPVEID: "",
                                                            Remark: obj.Remark,
                                                            RepairLevel: obj.RepairLevel,
                                                            Paths: obj.Paths,
                                                            WorkName: obj.WorkName,
                                                        };
                                                        _This.LoadPveDataToHTML();
                                                    }
                                                    return [2];
                                            }
                                        });
                                    });
                                });
                                $CustompveWebSelecter.find(".custompve .hd .up").click(function () {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var $custompve, $icon, id, highResult, _a, _b;
                                        return __generator(this, function (_c) {
                                            switch (_c.label) {
                                                case 0:
                                                    $custompve = $(this).parents(".custompve");
                                                    $icon = $(this).children(".fa");
                                                    id = $custompve.attr("data-id");
                                                    _b = (_a = NJson).DeserializeOfType;
                                                    return [4, NetHelper.HTTPTokenPost("https://crt.letgowin.com/IO/HighCloudPVEMaps", { LoginName: Config.LoginUser.LoginName, ID: id })];
                                                case 1:
                                                    highResult = _b.apply(_a, [(_c.sent()).ResponseString, { ErrorCode: -999, ErrorMessage: "连接服务器失败，请检查网络", Data: { HighNumber: 0 } }]);
                                                    if (highResult.ErrorCode == 0) {
                                                        if ($icon.hasClass("fa-thumbs-up")) {
                                                            $icon.removeClass("fa-thumbs-up").addClass("fa-thumbs-o-up");
                                                        }
                                                        else {
                                                            $icon.removeClass("fa-thumbs-o-up").addClass("fa-thumbs-up");
                                                        }
                                                        $icon.parent().children("span").html(highResult.Data.HighNumber.toString());
                                                    }
                                                    else {
                                                        MessageBox.Show(highResult.ErrorMessage);
                                                    }
                                                    return [2];
                                            }
                                        });
                                    });
                                });
                                $CustompveWebSelecter.find(".custompve [data-action=delete]").click(function () {
                                    var $custompve = $(this).parents(".custompve");
                                    var id = $custompve.attr("data-id");
                                    MessageBox.Confirm("确定删除此配置？", function () {
                                        return __awaiter(this, void 0, void 0, function () {
                                            var delResult, _a, _b;
                                            return __generator(this, function (_c) {
                                                switch (_c.label) {
                                                    case 0:
                                                        _b = (_a = NJson).DeserializeOfType;
                                                        return [4, NetHelper.HTTPTokenPost("https://crt.letgowin.com/IO/DeleteCloudPVEMap", { LoginName: Config.LoginUser.LoginName, ID: id })];
                                                    case 1:
                                                        delResult = _b.apply(_a, [(_c.sent()).ResponseString, { ErrorCode: -999, ErrorMessage: "连接服务器失败，请检查网络" }]);
                                                        if (delResult.ErrorCode == 0) {
                                                            MessageBox.Show("操作成功");
                                                            $custompve.fadeOut(300, function () {
                                                                $custompve.remove();
                                                            });
                                                        }
                                                        else {
                                                            MessageBox.Show(delResult.ErrorMessage);
                                                        }
                                                        return [2];
                                                }
                                            });
                                        });
                                    });
                                });
                                $CustompveWebSelecter.find("[data-action=upload]").click(function () {
                                    $CustompveWebSelecter.find(".modelheader [data-dismiss]").triggerHandler("click");
                                    Dailog.CreatDialog({
                                        Title: "上传自定义出征", FormNodes: List.From([{
                                                Name: "CustiomPVEID",
                                                Type: Dailog.FormNodeType.select,
                                                Text: "我的自定义",
                                                Data: Config.PlayerConfig.CustomPVEMaps.Select(function (c) { return ({ Name: c.WorkName, Value: c.CustiomPVEID }); }),
                                                Validates: List.From([{ Key: "required", Value: true, Message: "请选择配置" }])
                                            }, {
                                                Name: "Author",
                                                Type: Dailog.FormNodeType.text,
                                                Text: "昵称",
                                                Value: "",
                                                Placeholder: "输入您的昵称(注意长度)",
                                                Validates: List.From([{ Key: "required", Value: true, Message: "必须输入" }])
                                            }, {
                                                Name: "Remark",
                                                Type: Dailog.FormNodeType.textarea,
                                                Text: "备注",
                                                Value: "",
                                                Placeholder: "对该配置的详细说明",
                                                Validates: List.From([{ Key: "required", Value: true, Message: "必须输入" }])
                                            }]), OnBuild: function ($modal) {
                                            var $limit = $("<div></div>").css({ "font-size": "4vw" });
                                            $limit.append("<p><strong>注意：</strong></p>");
                                            $limit.append("<p>1.上传前请仔细核对该设置能正常使用</p>");
                                            $limit.append("<p>2.不要上传无实际用途的配置</p>");
                                            $limit.append("<p>3.不要上传与他人重复的条目</p>");
                                            $modal.find(".modal-body").prepend($limit);
                                            $modal.find("input").attr("maxlength", 25);
                                            $modal.find("textarea").addClass("form-control").attr("maxlength", 200).attr("Placeholder", "对该配置的详细说明");
                                        }, OnSubmit: function (fromJsonObj, $modal) {
                                            return __awaiter(this, void 0, void 0, function () {
                                                var CustiomPVEID, obj, Author, Name, ChallengeID, Remark, Data, uploadResult, _a, _b;
                                                return __generator(this, function (_c) {
                                                    switch (_c.label) {
                                                        case 0:
                                                            $modal.find("[data-check=save]").attr("disabled", "disabled");
                                                            $modal.find("[data-dismiss=modal]").triggerHandler("click");
                                                            CustiomPVEID = fromJsonObj.CustiomPVEID;
                                                            obj = Config.PlayerConfig.CustomPVEMaps.FirstOrDefault(function (c) { return c.CustiomPVEID == CustiomPVEID; });
                                                            Author = fromJsonObj.Author;
                                                            Name = obj.WorkName;
                                                            ChallengeID = obj.ChallengeID;
                                                            Remark = fromJsonObj.Remark;
                                                            Data = Encrypt.Base64Encrypt(NJson.Stringify(obj)).replace(/\+/g, '%2B').replace(/\=/g, '%3D');
                                                            _b = (_a = NJson).DeserializeOfType;
                                                            return [4, NetHelper.HTTPTokenPost("https://crt.letgowin.com/IO/UploadCloudPVEMap", { LoginName: Config.LoginUser.LoginName, Author: Author, Name: Name, ChallengeID: ChallengeID, Remark: Remark, Data: Data })];
                                                        case 1:
                                                            uploadResult = _b.apply(_a, [(_c.sent()).ResponseString, { ErrorCode: -999, ErrorMessage: "连接服务器失败，请检查网络" }]);
                                                            if (uploadResult.ErrorCode != 0) {
                                                                MessageBox.Show(uploadResult.ErrorMessage);
                                                            }
                                                            else {
                                                                MessageBox.Show("上传成功！");
                                                            }
                                                            return [2];
                                                    }
                                                });
                                            });
                                        }
                                    });
                                });
                                PageScroll.BindScroll($("#CustompveWebSelecter"), "滑动关闭自定义出征窗体", function (ev) {
                                }, function (ev) {
                                    return false;
                                }, function (ev) {
                                }, function (ev) {
                                    var windowWidth = $(window).width();
                                    if (ev.Start_X <= (windowWidth / 20) && ev.Move_X >= (windowWidth / 10)) {
                                        $("#CustompveWebSelecter").find(".modelheader [data-dismiss]").triggerHandler("click");
                                    }
                                });
                                return [2];
                        }
                    });
                });
            });
            $("#PartialSetting #btnCustomOrder").click(function () {
                Dailog.CreatDialog({
                    Title: "任务显示排序",
                    FormNodes: List.From([{
                            Name: "TT",
                            Type: Dailog.FormNodeType.text,
                            Text: "TT",
                            Value: "1",
                            Placeholder: "TT",
                            Validates: List.From([])
                        }]),
                    AnimateIn: "zoomIn",
                    AnimateOut: "zoomOut",
                    OnBuild: function ($modal) {
                        $modal.find(".modal-title").append(" <i class=\"fa fa-sort-alpha-asc\"></i>");
                        $modal.find(".modal-dialog").css("animation-duration", "0.6s");
                        $modal.find(".modal-footer [data-check]").html("保存修改");
                        $modal.addClass("modal_missionPanel_setCustomOrder");
                        var $Detail = $("<div class=\"gridly\"></div>");
                        Config.PlayerConfig.CustomPVEMaps.ForEach(function (c) {
                            $Detail.append("<div class=\"brick\" data-pveid=\"" + c.CustiomPVEID + "\">" + c.WorkName + "</div>");
                        });
                        $modal.find(".modal-body").html("").append($Detail);
                        $Detail.gridly({
                            base: $Detail.find(".brick").outerHeight(),
                            gutter: Math.ceil($Detail.find(".brick").height() / 3),
                            columns: 1,
                        });
                        $modal.find(".modal-footer [data-check]").click(function () {
                            var OrderPVEIds = List.From($modal.find(".brick").toArray()).OrderBy(function (c) { return parseFloat($(c).css("top").replace("px", "")); }).Select(function (c) { return $(c).attr("data-pveid"); });
                            Config.PlayerConfig.CustomPVEMaps = Config.PlayerConfig.CustomPVEMaps.OrderBy(function (c) { return OrderPVEIds.Contains(c.CustiomPVEID) ? OrderPVEIds.IndexOf(c.CustiomPVEID) : 9999; });
                            Config.PlayerConfig.CustomPVEMaps.Select(function (c) { return c.CustiomPVEID; }).ForEach(function (c) {
                                var $option = $("#PartialMission #MissionList").children("option[value='" + c + "']");
                                if ($option.length > 0) {
                                    $option.appendTo($option.parent());
                                }
                            });
                            MainTimer.CheckConfigUpdate_Local();
                            MainTimer.CheckConfigUpdate_Cloud();
                            $modal.find("[data-check=save]").attr("disabled", "disabled");
                            $modal.find("[data-dismiss=modal]").triggerHandler("click");
                        });
                    },
                    OnSubmit: function (fromJsonObj, $modal) { }
                });
            });
            $("#PartialSetting .customPve .map .reSetPath").click(function () {
                var $selectNodes = $("#PartialSetting .customPve .map .nodes .node.selected");
                if ($selectNodes.length == 0) {
                    MessageBox.Show("请在地图上点击需要出击的点");
                }
                else {
                    MessageBox.Confirm("确定更新地图到路径？", function () {
                        _This.ReloadMap();
                    });
                }
            });
            $("#PartialSetting .customPve #btnSaveSet").click(function () {
                if (_This.CurrentPVEData.Paths.Count() == 0 || (_This.CurrentPVEData.Paths.Count() == 1 && _This.CurrentPVEData.Paths[0].Nodes.Count() == 0)) {
                    MessageBox.Show("请在地图上点击节点并生成路径");
                    return;
                }
                var WorkName = $("#PartialSetting .customPve  #WorkName").val().trim();
                var Remark = $("#PartialSetting .customPve  #UserRemark").val().trim();
                var RepairLevel = parseInt($("#PartialSetting .customPve  #RepairLevel").val());
                if (WorkName == "") {
                    MessageBox.Show("请输入任务名称");
                    return;
                }
                if (_This.CurrentPVEData.CustiomPVEID == "") {
                    _This.CurrentPVEData.CustiomPVEID = NetDate.GetTimeSpan().toString();
                    _This.CurrentPVEData.WorkName = WorkName;
                    _This.CurrentPVEData.RepairLevel = RepairLevel;
                    _This.CurrentPVEData.Remark = Remark;
                    Config.PlayerConfig.CustomPVEMaps.Add(_This.CurrentPVEData);
                    $("#PartialMission #MissionList").append('<option value="' + _This.CurrentPVEData.CustiomPVEID + '">' + _This.CurrentPVEData.WorkName + '</option>');
                    MissionWorker.Works.Add(_This.CurrentPVEData);
                    if (_This.CurrentPVEExpert) {
                        _This.CurrentPVEExpert.CustiomPVEID = _This.CurrentPVEData.CustiomPVEID;
                        Config.MoreSetting.ExpertPVESettings.Add(_This.CurrentPVEExpert);
                    }
                    _This.CurrentPVEExpert = null;
                    _This.CurrentPVEData = null;
                    _This.CurrentMap = null;
                    $("#PartialSetting .customPve").hide();
                    $("#PartialSetting .customPve  #WorkName").val("");
                    $("#PartialSetting .customPve  #UserRemark").val("");
                    $("#PartialSetting .customPve  #RepairLevel").val("2");
                    $("#PartialSetting .customPve .map .nodes").html("");
                    $("#PartialSetting .customPve  .pathslist").html("");
                    MessageBox.Show("保存成功!</br>自定义设置已生效。");
                }
                else {
                    if (_This.CurrentPVEData.CustiomPVEID.ToNumber() < 100) {
                        MessageBox.Show("自带任务无法编辑，如不需要请删除");
                        return;
                    }
                    if (MissionWorker.State != DBEnum.WorkState.Ready && $("#PartialMission #MissionList").val() == _This.CurrentPVEData.CustiomPVEID) {
                        MessageBox.Show("无法保存执行中的任务");
                        return;
                    }
                    _This.CurrentPVEData.WorkName = WorkName;
                    _This.CurrentPVEData.RepairLevel = RepairLevel;
                    _This.CurrentPVEData.Remark = Remark;
                    Config.PlayerConfig.CustomPVEMaps.Replace(Config.PlayerConfig.CustomPVEMaps.FirstOrDefault(function (c) { return c.CustiomPVEID == _This.CurrentPVEData.CustiomPVEID; }), _This.CurrentPVEData);
                    MissionWorker.Works.Replace(MissionWorker.Works.FirstOrDefault(function (c) { return c.CustiomPVEID == _This.CurrentPVEData.CustiomPVEID; }), _This.CurrentPVEData);
                    Config.MoreSetting.ExpertPVESettings.RemoveAll(function (c) { return c.CustiomPVEID == _This.CurrentPVEData.CustiomPVEID; });
                    if (_This.CurrentPVEExpert) {
                        _This.CurrentPVEExpert.CustiomPVEID = _This.CurrentPVEData.CustiomPVEID;
                        Config.MoreSetting.ExpertPVESettings.Add(_This.CurrentPVEExpert);
                    }
                    _This.CurrentPVEExpert = null;
                    _This.CurrentPVEData = null;
                    _This.CurrentMap = null;
                    $("#PartialSetting .customPve").hide();
                    $("#PartialSetting .customPve  #WorkName").val("");
                    $("#PartialSetting .customPve  #UserRemark").val("");
                    $("#PartialSetting .customPve  #RepairLevel").val("2");
                    $("#PartialSetting .customPve .map .nodes").html("");
                    $("#PartialSetting .customPve  .pathslist").html("");
                    MessageBox.Show("保存成功!</br>自定义设置已生效。");
                }
            });
            $("#PartialSetting .customPve #btnDeleteSet").click(function () {
                if ($("#PartialMission #MissionList").val() == _This.CurrentPVEData.CustiomPVEID) {
                    return MessageBox.Show("操作失败\n不能删除选择的任务");
                }
                if (QueueWorker.CurrentQueue != null && QueueWorker.CurrentQueue.Nodes.Select(function (c) { return c.WorkID.SplitOutEmpty("_")[1]; }).Contains(_This.CurrentPVEData.CustiomPVEID)) {
                    return MessageBox.Show("操作失败\n该任务当前在进行中的队列");
                }
                MessageBox.Confirm("确定删除此配置？", function () {
                    if (_This.CurrentPVEData.CustiomPVEID.ToNumber() < 100) {
                        if (_This.CurrentPVEData.CustiomPVEID == "99") {
                            MessageBox.Show("黑钢任务不能删除");
                            return;
                        }
                        if (Config.MoreSetting.HideDefaultMissions.Contains(_This.CurrentPVEData.CustiomPVEID) === false) {
                            Config.MoreSetting.HideDefaultMissions.Add(_This.CurrentPVEData.CustiomPVEID);
                            MissionWorker.Works.RemoveAll(function (c) { return c.CustiomPVEID == _This.CurrentPVEData.CustiomPVEID; });
                            $("#PartialMission #MissionList option[value='" + _This.CurrentPVEData.CustiomPVEID + "']").remove();
                            _This.CurrentPVEData = null;
                            _This.CurrentMap = null;
                            $("#PartialSetting .customPve").hide();
                            $("#PartialSetting .customPve  #WorkName").val("");
                            $("#PartialSetting .customPve  #UserRemark").val("");
                            $("#PartialSetting .customPve  #RepairLevel").val("2");
                            $("#PartialSetting .customPve .map .nodes").html("");
                            $("#PartialSetting .customPve  .pathslist").html("");
                            MessageBox.Show("删除成功");
                        }
                    }
                    else {
                        Config.PlayerConfig.CustomPVEMaps.RemoveAll(function (c) { return c.CustiomPVEID == _This.CurrentPVEData.CustiomPVEID; });
                        MissionWorker.Works.RemoveAll(function (c) { return c.CustiomPVEID == _This.CurrentPVEData.CustiomPVEID; });
                        $("#PartialMission #MissionList option[value='" + _This.CurrentPVEData.CustiomPVEID + "']").remove();
                        _This.CurrentPVEData = null;
                        _This.CurrentMap = null;
                        $("#PartialSetting .customPve").hide();
                        $("#PartialSetting .customPve  #WorkName").val("");
                        $("#PartialSetting .customPve  #UserRemark").val("");
                        $("#PartialSetting .customPve  #RepairLevel").val("2");
                        $("#PartialSetting .customPve .map .nodes").html("");
                        $("#PartialSetting .customPve  .pathslist").html("");
                        MessageBox.Show("删除成功");
                    }
                });
            });
            $("#PartialSetting .listMapEnemy").click(function () {
                Dailog.CreatDialog({
                    Title: _This.CurrentMap.MapName,
                    FormNodes: List.From([]),
                    AnimateIn: "zoomIn",
                    AnimateOut: "zoomOut",
                    OnBuild: function ($modal) {
                        $modal.find(".modal-footer").remove();
                        var $Detail = $('<div class="modal_settingPanel_listMapEnemy"></div>');
                        _This.CurrentMap.Nodes.Where(function (c) { return c.Enemys && c.Enemys.Count() > 0; }).ForEach(function (node) {
                            var $node = $('<div class="nodeEnemy"><h2>' + node.Name + '</h2></div>').appendTo($Detail);
                            node.Enemys.ForEach(function (enemy) {
                                if (enemy) {
                                    $node.append('<div class="enemy">' + enemy + '</div>');
                                }
                            });
                        });
                        $modal.find(".modal-body").html("").append($Detail);
                        var height = $modal.find(".modal-content").outerHeight();
                        var wHeigt = $(window).height();
                        $modal.find(".modal-dialog").css("margin-top", (wHeigt - height) / 3);
                        var $silide = $('<i class="fa fa-arrow-down"></i>').css({ "margin-left": "2vw", "color": "#e86853" });
                        $modal.find(".modal-header .modal-title").append($silide);
                        $modal.find(".modal-title").click(function () {
                            if ($silide.is(":animated")) {
                                return;
                            }
                            if ($silide.hasClass("fa-arrow-down")) {
                                $silide.removeClass("fa-arrow-down").addClass("fa-arrow-up");
                                $modal.find(".modal-dialog").animate({ "margin-top": wHeigt - $(window).outerWidth() / 100 * 50 + "px" }, 500);
                                $modal.find(".modal-body").animate({ "max-height": $(window).outerWidth() / 100 * 50 - $modal.find(".modal-header").outerHeight() - 10 + "px" }, 500);
                            }
                            else {
                                $silide.removeClass("fa-arrow-up").addClass("fa-arrow-down");
                                $modal.find(".modal-dialog").animate({ "margin-top": (wHeigt - height) / 3 }, 500);
                                $modal.find(".modal-body").animate({ "max-height": $(window).height() - $(window).width() / 100 * 50 + "px" }, 500);
                            }
                        });
                    },
                    OnSubmit: function (fromJsonObj, $modal) { }
                });
            });
            $("#PartialSetting .listDraps").click(function () {
                Dailog.CreatDialog({
                    Title: _This.CurrentMap.MapName,
                    FormNodes: List.From([]),
                    AnimateIn: "zoomIn",
                    AnimateOut: "zoomOut",
                    OnBuild: function ($modal) {
                        $modal.find(".modal-title").append(" <i class=\"fa fa-lightbulb-o\"></i>");
                        $modal.find(".modal-footer").remove();
                        $modal.find(".modal-dialog").css("animation-duration", "0.6s");
                        $modal.addClass("modal_settingPanel_shipdrap");
                        var Reload = function (listStar) {
                            $modal.find(".modal-body").html("");
                            var $filterStar = $("<div class=\"starFilter\"></div>").appendTo($modal.find(".modal-body"));
                            [1, 2, 3, 4, 5, 6].forEach(function (star) {
                                var starName = ["一星", "二星", "三星", "四星", "五星", "六星"][star - 1];
                                var $label = $("<label data-star=\"" + star + "\" class=\"" + (listStar == star ? "active" : "") + "\">" + starName + "</label>").appendTo($filterStar);
                            });
                            var $labelAll = $("<label data-star=\"0\" class=\"" + (listStar == 0 ? "active" : "") + "\">\u5168\u90E8</label>").appendTo($filterStar);
                            $filterStar.find("label[data-star]").click(function () {
                                var star = $(this).attr("data-star").ToNumber();
                                Reload(star);
                            });
                            var $paths = $("<div class=\"path\"></div>").appendTo($modal.find(".modal-body"));
                            var names = ["-", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
                            var shipDraps = SettingPage.DesShipDrap;
                            if (listStar != 0) {
                                shipDraps = shipDraps.Where(function (drap) {
                                    var iniship = Config.IniShips.FirstOrDefault(function (c) { return c.CID == drap.CID; });
                                    return iniship != null && iniship.Star == listStar;
                                });
                            }
                            _This.CurrentMap.Nodes.ForEach(function (node) {
                                if (names[node.NodeNo.ToNumber() - 1] != "-") {
                                    var $node = $("<div class=\"node\"><h2>" + names[node.NodeNo.ToNumber() - 1] + "</h2></div>").appendTo($paths);
                                    var drap1 = shipDraps.Where(function (c) { return c.Draps1.Where(function (d) { return d.indexOf(_This.CurrentMap.ChallengeID.toString() + node.NodeNo.toString()) == 0; }).Count() > 0; }).Select(function (c) { return c.CID; }).Distinct().OrderBy(function (c) { return c; });
                                    var $shiplist = $("<div class=\"list\"></div>").appendTo($node);
                                    if (drap1.Count() == 0) {
                                        $node.remove();
                                    }
                                    ;
                                    drap1.ForEach(function (cid) {
                                        var ini = Config.IniShips.FirstOrDefault(function (c) { return c.CID == cid; });
                                        if (ini != null) {
                                            $shiplist.append("<label class=\"" + (Player.UnLockShip.Contains(cid) ? "" : "no") + "\">" + ini.Name + "</label>");
                                        }
                                    });
                                }
                            });
                            if ($modal.find(".path .no").length > 0) {
                                $modal.find(".modal-title .fa").css({ "color": "#ea646d", "font-weight": "bolder" });
                            }
                        };
                        Reload(0);
                    },
                    OnSubmit: function (fromJsonObj, $modal) { }
                });
            });
            $("#PartialSetting #btnOpenExpertSetting").click(function () {
                SettingPage.OpenExpertSetting(_This.CurrentPVEExpert, function (result) {
                    _This.CurrentPVEExpert = result;
                    MessageBox.Show("高级设置已修改</br>保存任务后生效");
                });
            });
        };
        ;
        MapSetting.LoadPveDataToHTML = function () {
            var _This = this;
            $("#PartialSetting .customPve  #WorkName").val(_This.CurrentPVEData.WorkName);
            $("#PartialSetting .customPve  #UserRemark").val(_This.CurrentPVEData.Remark);
            $("#PartialSetting .customPve  #RepairLevel").val(_This.CurrentPVEData.RepairLevel);
            $("#PartialSetting .customPve ").fadeIn(300);
            $("#PartialSetting .customPve .map .nodes").html("");
            $("#PartialSetting .customPve .pathslist").html("");
            var imgPath = _This.CurrentMap.Image.indexOf("http") >= 0 ? _This.CurrentMap.Image : (api.wgtRootDir.replace("file:", "contents:") + "/Content/PVEMaps/" + _This.CurrentMap.Image);
            $("#PartialSetting .customPve .mappanel .map").css("background", "url(" + imgPath + ")").css("background-size", "100% 100%");
            $("#PartialSetting #currentMapName").html(this.CurrentMap.MapName);
            _This.CurrentMap.Nodes.ForEach(function (c) {
                if (c.Postion) {
                    var $node = $('<a href="javascript:;" class="node" data-nodeno="' + c.NodeNo + '"></a>').css({ "left": (c.Postion.X / 530 * 100 - 3).toFixed(2) + "%", "top": (c.Postion.Y / 298 * 100 - 3).toFixed(2) + "%" });
                    $("#panel-custompve .customPve .map .nodes").append($node);
                }
            });
            if (_This.CurrentMap.ChallengeID == "604") {
                $("#PartialSetting .customPve a.reSetPath").css("margin-bottom", "18vw");
            }
            else {
                $("#PartialSetting .customPve a.reSetPath").css("margin-bottom", "0vw");
            }
            $("#PartialSetting .customPve .map .node").click(function () {
                var $this = $(this);
                if ($(this).hasClass("selected")) {
                    $this.removeClass("selected");
                }
                else {
                    $this.addClass("selected");
                }
            });
            this.CurrentPVEData.Paths.ForEach(function (path) {
                path.Nodes.ForEach(function (node) {
                    $("#PartialSetting .customPve .map .node[data-nodeno='" + node.NodeNo + "']").addClass("selected");
                });
            });
            if (_This.CurrentPVEData.Paths.Length > 0) {
                _This.ReloadMap();
            }
            if (_This.CurrentPVEExpert != null) {
                $("#PartialSetting .customPve  #btnOpenExpertSetting").addClass("active");
            }
            else {
                $("#PartialSetting .customPve  #btnOpenExpertSetting").removeClass("active");
            }
            if (_This.CurrentPVEData.CustiomPVEID == "99") {
                $("#PartialSetting .customPve .btnOpenExpertSetting").hide();
            }
            else {
                $("#PartialSetting .customPve .btnOpenExpertSetting").show();
            }
        };
        MapSetting.IsMatchedRule = function (target, rule) {
            var r1Rule = rule[1].SplitOutEmpty("或");
            if (r1Rule.Length > 0) {
                for (var i = 0; i < target.Length; i++) {
                    var ft = r1Rule.FirstOrDefault(function (d) { return target[i].indexOf(d) >= 0; });
                    if (ft != null) {
                        return false;
                    }
                }
            }
            var r0Rule = rule[0].SplitOutEmpty("或");
            if (r0Rule.Length > 0) {
                for (var i = 0; i < target.Length; i++) {
                    var ft = r0Rule.FirstOrDefault(function (d) { return target[i].indexOf(d) >= 0; });
                    if (ft != null) {
                        return true;
                    }
                }
                return false;
            }
            return true;
        };
        MapSetting.GetFilterMatchedRule = function (rivalConditions, selIndex) {
            var _This = this;
            var GetALLFeatureGroups = function (allFeatures) {
                var inputArray = allFeatures.ToArray();
                inputArray.unshift("nil");
                var GroupPairs = new List();
                var GetGroup = function (data, index, group) {
                    if (index === void 0) { index = 0; }
                    if (group === void 0) { group = []; }
                    var need_apply = new Array();
                    need_apply.push(data[index]);
                    for (var i = 0; i < group.length; i++) {
                        need_apply.push(group[i] + "或" + data[index]);
                    }
                    group.push.apply(group, need_apply);
                    if (index + 1 >= data.length)
                        return group;
                    else
                        return GetGroup(data, index + 1, group);
                };
                var SingleGroup = List.From(GetGroup(inputArray)).Select(function (c) { return c.replace("nil或", ""); }).Distinct().OrderBy(function (c) { return c.length; });
                SingleGroup.ForEach(function (sg) {
                    var r = Player.GetCombinationsString(List.From([List.From([sg]), SingleGroup.Where(function (c) { return sg.SplitOutEmpty("或").Where(function (d) { return c.SplitOutEmpty("或").Contains(d); }).Count() == 0; })]));
                    GroupPairs.AddRange(r.Select(function (c) { return [c[0] == "nil" ? "" : c[0], c[1] == "nil" ? "" : c[1]]; }));
                });
                return GroupPairs.OrderBy(function (c) { return c[0].length + c[1].length; });
            };
            var allFeatures = rivalConditions.Select(function (c) { return c.JoinToString("^"); }).JoinToString("^").SplitOutEmpty("^").Distinct().OrderBy(function (c) { return c; });
            var aLLFeatureGroups = GetALLFeatureGroups(allFeatures);
            var target = rivalConditions[selIndex];
            var unTarget = rivalConditions.Where(function (c, i) { return i != selIndex; });
            var MatchedRule = aLLFeatureGroups.FirstOrDefault(function (group) {
                return _This.IsMatchedRule(target, group) == true && unTarget.Where(function (c) { return _This.IsMatchedRule(c, group) == true; }).Count() == 0;
            });
            return MatchedRule == null ? ["", ""] : MatchedRule;
        };
        MapSetting.GetFilterUnMatchedRule = function (rivalConditions, selIndex) {
            var _This = this;
            var GetALLFeatureGroups = function (allFeatures) {
                var inputArray = allFeatures.ToArray();
                inputArray.unshift("nil");
                var GroupPairs = new List();
                var GetGroup = function (data, index, group) {
                    if (index === void 0) { index = 0; }
                    if (group === void 0) { group = []; }
                    var need_apply = new Array();
                    need_apply.push(data[index]);
                    for (var i = 0; i < group.length; i++) {
                        need_apply.push(group[i] + "或" + data[index]);
                    }
                    group.push.apply(group, need_apply);
                    if (index + 1 >= data.length)
                        return group;
                    else
                        return GetGroup(data, index + 1, group);
                };
                var SingleGroup = List.From(GetGroup(inputArray)).Select(function (c) { return c.replace("nil或", ""); }).Distinct().OrderBy(function (c) { return c.length; });
                SingleGroup.ForEach(function (sg) {
                    var r = Player.GetCombinationsString(List.From([List.From([sg]), SingleGroup.Where(function (c) { return sg.SplitOutEmpty("或").Where(function (d) { return c.SplitOutEmpty("或").Contains(d); }).Count() == 0; })]));
                    GroupPairs.AddRange(r.Select(function (c) { return [c[0] == "nil" ? "" : c[0], c[1] == "nil" ? "" : c[1]]; }));
                });
                return GroupPairs.OrderBy(function (c) { return c[0].length + c[1].length; });
            };
            var allFeatures = rivalConditions.Select(function (c) { return c.JoinToString("^"); }).JoinToString("^").SplitOutEmpty("^").Distinct().OrderBy(function (c) { return c; });
            var aLLFeatureGroups = GetALLFeatureGroups(allFeatures);
            var target = rivalConditions[selIndex];
            var unTarget = rivalConditions.Where(function (c, i) { return i != selIndex; });
            var MatchedRule = aLLFeatureGroups.FirstOrDefault(function (group) {
                return _This.IsMatchedRule(target, group) == false && unTarget.Where(function (c) { return _This.IsMatchedRule(c, group) == false; }).Count() == 0;
            });
            return MatchedRule == null ? ["", ""] : MatchedRule;
        };
        MapSetting.ReloadMap = function () {
            var _This = this;
            $("#PartialSetting .customPve  .pathslist").html("");
            var GetNodeFromNo = function (no) {
                return _This.CurrentMap.Nodes.FirstOrDefault(function (c) { return c.NodeNo == no; });
            };
            var selectNodes = List.From($("#PartialSetting .customPve .map .nodes .node.selected").toArray().map(function (dom) {
                return GetNodeFromNo($(dom).attr("data-nodeno"));
            }));
            selectNodes.Add(_This.CurrentMap.Nodes[0]);
            selectNodes = selectNodes.OrderBy(function (c) { return c.NodeNo; });
            var maplines = _This.FindLines(selectNodes);
            var datalines = NJson.Parse(NJson.Stringify(maplines)).Select(function (mapPath) {
                var newPath = { Nodes: new List() };
                var currentMapNodes = List.JoinChildren(_This.CurrentPVEData.Paths.Select(function (c) { return c.Nodes; }));
                mapPath.Nodes.ForEach(function (mapNode) {
                    var newNode = { Name: mapNode.Name, NodeNo: mapNode.NodeNo, Formation: 1, Action: -1, FightNight: 0, OnlyFight: new List(), SLFilter: new List() };
                    var enityNode = currentMapNodes.FirstOrDefault(function (enode) { return enode.NodeNo == mapNode.NodeNo; });
                    if (enityNode != null) {
                        newNode = NJson.Parse(NJson.Stringify(enityNode));
                    }
                    newPath.Nodes.Add(newNode);
                });
                return newPath;
            });
            _This.CurrentPVEData.Paths = datalines;
            datalines.ForEach(function (line) {
                line.Nodes.ForEach(function (node) {
                    var mapNode = _This.CurrentMap.Nodes.FirstOrDefault(function (c) { return c.NodeNo == node.NodeNo; });
                    if (node.Action == -1 && mapNode != null && mapNode.NodeType) {
                        if (mapNode.NodeType == "战斗") {
                            node.Action = 0;
                            node.Formation = 2;
                            return;
                        }
                        if (mapNode.NodeType == "迂回") {
                            node.Action = 2;
                            return;
                        }
                        if (mapNode.NodeType == "资源") {
                            node.Action = 1;
                            return;
                        }
                        if (mapNode.NodeType == "待机") {
                            node.Action = 4;
                            return;
                        }
                    }
                });
            });
            datalines.ForEach(function (line) {
                var TempLineData = NJson.Parse(NJson.Stringify(line));
                var $path = $(doT.template($("#PartialSetting #pathlisttmpl").html())(NJson.ObjListToArray(NJson.DeepCopy(TempLineData))));
                $("#PartialSetting .customPve .pathslist").append($path);
                $path.find(".node").click(function ($node) {
                    var obj = JSON.parse($(this).attr("data-obj"));
                    console.log(obj);
                    var emText = _This.CurrentMap.Nodes.Where(function (c) { return c.Name == obj.Name; }).FirstOrDefault().Enemys;
                    var enemyTeams = (emText ? emText : new List()).Select(function (enemy) {
                        var result = "";
                        enemy.SplitOutEmpty("").ForEach(function (c) {
                            if ("歼星舰补给舰航母轻母装母战列航战战巡重巡航巡雷巡轻巡重炮驱逐潜母潜艇炮潜补给要塞机场港口导驱旗舰|".SplitOutEmpty("").Contains(c)) {
                                result += c;
                            }
                        });
                        return result;
                    });
                    Dailog.CreatDialog({
                        Title: "更改节点", FormNodes: List.From([{
                                Name: "Action",
                                Type: Dailog.FormNodeType.select,
                                Text: "节点类型",
                                Data: List.From([{ "Name": "战斗点", "Value": "0" }, { "Name": "资源点", "Value": "1" }, { "Name": "待机点", "Value": "4" }, { "Name": "迂回点-失败战斗", "Value": "2" }, { "Name": "迂回点-失败SL", "Value": "3" }]),
                                Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                            }, {
                                Name: "Formation",
                                Type: Dailog.FormNodeType.select,
                                Text: "战斗阵型",
                                Data: List.From([{ "Name": "单纵阵", "Value": "1" }, { "Name": "复纵阵", "Value": "2" }, { "Name": "轮行阵", "Value": "3" }, { "Name": "梯形阵", "Value": "4" }, { "Name": "单横阵", "Value": "5" }]),
                                Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                            }, {
                                Name: "FightNight",
                                Type: Dailog.FormNodeType.select,
                                Text: "夜战",
                                Data: List.From([{ "Name": "不夜战", "Value": "0" }, { "Name": "夜战", "Value": "1" }]),
                                Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                            }, {
                                Name: "OnlyFightTeam",
                                Type: Dailog.FormNodeType.select,
                                Text: "只打阵容",
                                Data: List.From([{ "Name": "无", "Value": "0" }]).AddRange(enemyTeams.Select(function (c, i) { return ({ Name: c, Value: (i + 1).toString() }); })),
                                Validates: List.From([])
                            }, {
                                Name: "SLFilterTeam",
                                Type: Dailog.FormNodeType.select,
                                Text: "不打阵容",
                                Data: List.From([{ "Name": "无", "Value": "0" }]).AddRange(enemyTeams.Select(function (c, i) { return ({ Name: c, Value: (i + 1).toString() }); })),
                                Validates: List.From([])
                            }, {
                                Name: "OnlyFight",
                                Type: Dailog.FormNodeType.text,
                                Text: "只打",
                                Value: "",
                                Placeholder: "填写敌方名称（例：航母）",
                                Validates: List.From([])
                            }, {
                                Name: "SLFilter",
                                Type: Dailog.FormNodeType.text,
                                Text: "不打",
                                Value: "",
                                Placeholder: "用或字过滤多项（航母或雷巡）",
                                Validates: List.From([])
                            }]), OnBuild: function ($modal) {
                            $modal.find("[name='Action']").val(obj.Action);
                            $modal.find("[name='Formation']").val(obj.Formation);
                            $modal.find("[name='FightNight']").val(obj.FightNight);
                            $modal.find("[name='OnlyFight']").val(obj.OnlyFight.join("或"));
                            $modal.find("[name='SLFilter']").val(obj.SLFilter.join("或"));
                            var action = $modal.find("[name='Action']").val();
                            if (action == "1" || action == "4" || action == "3") {
                                $modal.find("[data-groupname=Formation],[data-groupname=FightNight],[data-groupname=OnlyFight],[data-groupname=SLFilter],[data-groupname=OnlyFightTeam],[data-groupname=SLFilterTeam]").hide();
                            }
                            $modal.find("[name='Action']").change(function () {
                                if ($(this).val() == "1" || $(this).val() == "4" || $(this).val() == "3") {
                                    $modal.find("[data-groupname=Formation],[data-groupname=FightNight],[data-groupname=OnlyFight],[data-groupname=SLFilter],[data-groupname=OnlyFightTeam],[data-groupname=SLFilterTeam]").slideUp(300);
                                }
                                else {
                                    $modal.find("[data-groupname=Formation],[data-groupname=FightNight],[data-groupname=OnlyFight],[data-groupname=SLFilter],[data-groupname=OnlyFightTeam],[data-groupname=SLFilterTeam]").slideDown(300);
                                }
                            });
                            $modal.find("[name='OnlyFightTeam']").change(function () {
                                var selectNumber = $(this).val().toString().ToNumber();
                                if (selectNumber == 0) {
                                    $modal.find("[name='OnlyFight']").val("");
                                    $modal.find("[name='SLFilter']").val("");
                                }
                                else {
                                    $modal.find("[name='SLFilterTeam']").val("0");
                                    var matchedResult = _This.GetFilterMatchedRule(enemyTeams.Select(function (c) { return c.SplitOutEmpty("|"); }), selectNumber - 1);
                                    $modal.find("[name='OnlyFight']").val(matchedResult[0]);
                                    $modal.find("[name='SLFilter']").val(matchedResult[1]);
                                    if (matchedResult[0] == "" && matchedResult[1] == "") {
                                        MessageBox.Show("无法推断出可用的过滤断言，此阵容可能无法筛选");
                                    }
                                }
                            });
                            $modal.find("[name='SLFilterTeam']").change(function () {
                                var selectNumber = $(this).val().toString().ToNumber();
                                if (selectNumber == 0) {
                                    $modal.find("[name='OnlyFight']").val("");
                                    $modal.find("[name='SLFilter']").val("");
                                }
                                else {
                                    $modal.find("[name='OnlyFightTeam']").val("0");
                                    var matchedResult = _This.GetFilterUnMatchedRule(enemyTeams.Select(function (c) { return c.SplitOutEmpty("|"); }), selectNumber - 1);
                                    $modal.find("[name='OnlyFight']").val(matchedResult[0]);
                                    $modal.find("[name='SLFilter']").val(matchedResult[1]);
                                    if (matchedResult[0] == "" && matchedResult[1] == "") {
                                        MessageBox.Show("无法推断出可用的过滤断言，此阵容可能无法筛选");
                                    }
                                }
                            });
                            var selectedRule = [obj.OnlyFight.join("或"), obj.SLFilter.join("或")];
                            if (selectedRule[0] != "" || selectedRule[1] != "") {
                                for (var i = 0; i < enemyTeams.Count(); i++) {
                                    var target = enemyTeams.Select(function (c) { return c.SplitOutEmpty("|"); })[i];
                                    var unTarget = enemyTeams.Select(function (c) { return c.SplitOutEmpty("|"); }).Where(function (v, i1) { return i1 != i; });
                                    if (_This.IsMatchedRule(target, selectedRule) == true && unTarget.Where(function (c) { return _This.IsMatchedRule(c, selectedRule) == true; }).Count() == 0) {
                                        $modal.find("[name='OnlyFightTeam']").val(i + 1);
                                        break;
                                    }
                                    if (_This.IsMatchedRule(target, selectedRule) == false && unTarget.Where(function (c) { return _This.IsMatchedRule(c, selectedRule) == false; }).Count() == 0) {
                                        $modal.find("[name='SLFilterTeam']").val(i + 1);
                                        break;
                                    }
                                }
                            }
                        }, OnSubmit: function (fromJsonObj, $modal) {
                            $modal.find("[data-check=save]").attr("disabled", "disabled");
                            $modal.find("[data-dismiss=modal]").triggerHandler("click");
                            var NodeNo = obj.NodeNo;
                            var Action = fromJsonObj.Action.ToNumber();
                            var Formation = fromJsonObj.Formation.ToNumber();
                            var FightNight = fromJsonObj.FightNight.ToNumber();
                            var OnlyFight = fromJsonObj.OnlyFight;
                            var SLFilter = fromJsonObj.SLFilter;
                            _This.CurrentPVEData.Paths.ForEach(function (path) {
                                var modifyNode = path.Nodes.FirstOrDefault(function (c) { return c.NodeNo == NodeNo; });
                                if (modifyNode != null) {
                                    modifyNode.Action = Action;
                                    modifyNode.Formation = Formation;
                                    modifyNode.FightNight = FightNight;
                                    modifyNode.OnlyFight = OnlyFight.SplitOutEmpty("或");
                                    modifyNode.SLFilter = SLFilter.SplitOutEmpty("或");
                                    _This.ReloadMap();
                                }
                            });
                        }
                    });
                });
            });
        };
        MapSetting.GetNodeIni = function (nodeNo) {
            return this.CurrentMap.Nodes.FirstOrDefault(function (c) { return c.NodeNo == nodeNo; });
        };
        MapSetting.FindLines = function (nodes) {
            var paths = new List().Add({ Num: 1, Nodes: new List() });
            this.FindNodeLine(nodes[0], paths[0], paths, nodes);
            paths = paths.Where(function (checkPath) {
                return paths.Where(function (c) {
                    var checkPathStr = NJson.Stringify(checkPath.Nodes).substring(1).substring(0, NJson.Stringify(checkPath.Nodes).length - 2);
                    var thisStr = NJson.Stringify(c.Nodes).substring(1).substring(0, NJson.Stringify(c.Nodes).length - 2);
                    return thisStr != checkPathStr && thisStr.indexOf(checkPathStr) == 0;
                }).Count() == 0;
            });
            return NJson.Parse(NJson.Stringify(paths));
        };
        MapSetting.FindNodeLine = function (thisNode, path, paths, nodes) {
            var _this = this;
            if (thisNode.NextNodes.Count() == 1) {
                var nextNode = nodes.FirstOrDefault(function (c) { return c.Name == thisNode.NextNodes[0]; });
                if (nextNode != null && path.Nodes.IndexOf(nextNode) == -1) {
                    path.Nodes.Add(nextNode);
                    this.FindNodeLine(nextNode, path, paths, nodes);
                }
            }
            if (thisNode.NextNodes.Count() > 1) {
                var nexts = new List();
                for (var i = 0; i < thisNode.NextNodes.Count(); i++) {
                    var nextNode = nodes.FirstOrDefault(function (c) { return c.Name == thisNode.NextNodes[i]; });
                    if (nextNode != null && path.Nodes.IndexOf(nextNode) == -1) {
                        var newPath = path;
                        if (i != 0) {
                            newPath = NJson.Parse(NJson.Stringify(path));
                            newPath.Num++;
                            paths.Add(newPath);
                        }
                        nexts.Add([nextNode, newPath]);
                    }
                }
                nexts.ForEach(function (next) {
                    next[1].Nodes.Add(next[0]);
                    _this.FindNodeLine(next[0], next[1], paths, nodes);
                });
            }
        };
        MapSetting.CurrentPVEData = null;
        MapSetting.CurrentPVEExpert = null;
        MapSetting.CurrentMap = null;
        return MapSetting;
    }());
    var SettingPath = (function () {
        function SettingPath() {
            this.Num = 0;
            this.Nodes = new List();
        }
        return SettingPath;
    }());
    var QueueSetting = (function () {
        function QueueSetting() {
        }
        QueueSetting.Init = function () {
            var _This = this;
            var $Area = _This.$Area;
            var $WorkName = $Area.find(".WorkName");
            var $queueNodelist = $Area.find(".queueNodelist");
            $Area.find(".pvequeue").hide();
            SettingPageIO.OnModifyQueue = function (queueid) {
                _This.CurrentQueueData = NJson.Parse(NJson.Stringify(Config.PlayerConfig.CustomPevQueues.FirstOrDefault(function (c) { return c.QueueID == queueid; })));
                _This.LoadQuerueDataToHTML();
                $Area.find(".pvequeue").fadeIn(300);
            };
            $Area.find(".btnSelectQueueSelecter").click(function () {
                Dailog.CreatDialog({
                    Title: "修改配置", FormNodes: List.From([{
                            Name: "QueueID",
                            Type: Dailog.FormNodeType.select,
                            Text: "",
                            Data: Config.PlayerConfig.CustomPevQueues.Select(function (c) { return ({ Name: c.QueueName, Value: c.QueueID }); }),
                            Validates: List.From([{ Key: "required", Value: true, Message: "请选择配置" }])
                        }]), OnSubmit: function (fromJsonObj, $modal) {
                        $modal.find("[data-check=save]").attr("disabled", "disabled");
                        $modal.find("[data-dismiss=modal]").triggerHandler("click");
                        var QueueID = fromJsonObj.QueueID;
                        var obj = Config.PlayerConfig.CustomPevQueues.FirstOrDefault(function (c) { return c.QueueID == QueueID; });
                        _This.CurrentQueueData = NJson.Parse(NJson.Stringify(obj));
                        _This.LoadQuerueDataToHTML();
                        $Area.find(".pvequeue").fadeIn(300);
                    }
                });
            });
            $Area.find(".btnAddQueueSelecter").click(function () {
                if (_This.CurrentQueueData) {
                    MessageBox.Confirm("确定放弃修改并新建任务?", function () {
                        _This.CurrentQueueData = { QueueID: "NEW", QueueName: "", Nodes: new List() };
                        _This.LoadQuerueDataToHTML();
                        $Area.find(".pvequeue").fadeIn(300);
                    });
                }
                else {
                    _This.CurrentQueueData = { QueueID: "NEW", QueueName: "", Nodes: new List() };
                    _This.LoadQuerueDataToHTML();
                    $Area.find(".pvequeue").fadeIn(300);
                }
            });
            $Area.find(".btnSaveSet").click(function () {
                if (_This.CurrentQueueData.Nodes.Count() == 0) {
                    MessageBox.Show("至少添加一个任务");
                    return;
                }
                _This.CurrentQueueData.Nodes.ForEach(function (node) {
                    var addNumber = Math.max(0, node.TotalWorkNumber) - node.TotalWorkNumber;
                    node.TotalWorkNumber = Math.max(0, node.TotalWorkNumber);
                    node.SurplusWorkNumber = node.TotalWorkNumber;
                });
                var WorkName = $Area.find(".WorkName").val().trim();
                if (WorkName == "") {
                    MessageBox.Show("请输入队列名称");
                    return;
                }
                _This.CurrentQueueData.QueueName = WorkName;
                if (_This.CurrentQueueData.QueueID == "NEW") {
                    _This.CurrentQueueData.QueueID = "QUEUE" + NetDate.GetTimeSpan().toString();
                    Config.PlayerConfig.CustomPevQueues.Add(_This.CurrentQueueData);
                    _This.CurrentQueueData = null;
                    $Area.find(".pvequeue").hide();
                    MessageBox.Show("保存成功!队列已生效。");
                }
                else {
                    if (QueueWorker.State != DBEnum.WorkState.Ready && QueueWorker.CurrentQueue.QueueID == _This.CurrentQueueData.QueueID) {
                        MessageBox.Show("请先停止队列");
                        return;
                    }
                    _This.CurrentQueueData.Nodes.ForEach(function (c) {
                        c.IsCurrent = false;
                        c.SurplusWorkNumber = c.TotalWorkNumber;
                    });
                    Config.PlayerConfig.CustomPevQueues.Replace(Config.PlayerConfig.CustomPevQueues.FirstOrDefault(function (c) { return c.QueueID == _This.CurrentQueueData.QueueID; }), _This.CurrentQueueData);
                    _This.CurrentQueueData = null;
                    $("#PartialSetting .pvequeue").hide();
                    MessageBox.Show("保存成功!队列已生效。");
                }
                console.log(Config.PlayerConfig.CustomPevQueues);
            });
            $Area.find(".btnDeleteSet").click(function () {
                if ($("#PartialMission #MissionList").val() == _This.CurrentQueueData.QueueID) {
                    return MessageBox.Show("操作失败\n不能删除选择的队列");
                }
                MessageBox.Confirm("确定删除此队列？", function () {
                    Config.PlayerConfig.CustomPevQueues.RemoveAll(function (c) { return c.QueueID == _This.CurrentQueueData.QueueID; });
                    _This.CurrentQueueData = null;
                    $Area.find(".pvequeue").hide();
                    MessageBox.Show("删除成功");
                });
            });
            $Area.find("[data-action='addNewNode']").click(function () {
                Dailog.CreatDialog({
                    Title: "选择一个任务", FormNodes: List.From([{
                            Name: "CustiomPVEID",
                            Type: Dailog.FormNodeType.select,
                            Text: "",
                            Data: MissionWorker.Works.Select(function (c) { return ({ Name: c.WorkName, Value: c.CustiomPVEID }); }),
                            Validates: List.From([{ Key: "required", Value: true, Message: "请选择配置" }])
                        }]), OnSubmit: function (fromJsonObj, $modal) {
                        $modal.find("[data-check=save]").attr("disabled", "disabled");
                        $modal.find("[data-dismiss=modal]").triggerHandler("click");
                        var CustiomPVEID = fromJsonObj.CustiomPVEID;
                        _This.CurrentQueueData.Nodes.Add({ WorkID: NetDate.GetTimeSpan().toString() + "_" + CustiomPVEID, FleetID: 1, IsAutoChangeShip: false, QianTingDanHeng: false, StopOnNewShip: false, IsForbidden: false, IsCurrent: false, SurplusWorkNumber: 1, TotalWorkNumber: 1 });
                        _This.LoadQuerueDataToHTML();
                        $Area.animate({ scrollTop: $Area[0].scrollHeight }, 500);
                    }
                });
            });
        };
        QueueSetting.LoadQuerueDataToHTML = function () {
            var _This = this;
            var $Area = _This.$Area;
            $Area.find(".WorkName").val(_This.CurrentQueueData.QueueName).change(function () {
                var $cbox = $(this);
                _This.CurrentQueueData.QueueName = $cbox.val();
            });
            $Area.find(".queueNodelist").html("");
            _This.CurrentQueueData.Nodes.ForEach(function (node) {
                var data = {
                    WorkID: node.WorkID,
                    WorkName: MissionWorker.Works.Where(function (c) { return c.CustiomPVEID == node.WorkID.SplitOutEmpty("_")[1]; }).Count() == 0 ? "【任务不存在】" : MissionWorker.Works.FirstOrDefault(function (c) { return c.CustiomPVEID == node.WorkID.SplitOutEmpty("_")[1]; }).WorkName,
                    FleetID: node.FleetID,
                    TotalWorkNumber: node.TotalWorkNumber,
                    StopOnNewShip: node.StopOnNewShip ? 1 : 0,
                    QianTingDanHeng: node.QianTingDanHeng ? 1 : 0,
                    IsAutoChangeShip: node.IsAutoChangeShip ? 1 : 0,
                    HasExpertSetting: Config.MoreSetting.ExpertPVESettings.Where(function (c) { return c.CustiomPVEID == node.WorkID.SplitOutEmpty("_")[1]; }).Count() == 0 ? false : true,
                };
                var $nodetmpl = $(doT.template($Area.find("[data-tempid=queueNodeTemp]").html())(NJson.ObjListToArray(NJson.DeepCopy(data))));
                $nodetmpl.find(".workFleet").val(data.FleetID);
                $Area.find(".queueNodelist").append($nodetmpl);
                $nodetmpl.find(".modifyPVE").click(function () {
                    $("#PartialViewFooter [data-partialid=PartialSetting]").triggerHandler("click");
                    $("#PartialSetting .swapChildPageNav [data-panel='panel-custompve']").triggerHandler("click");
                    SettingPageIO.OnMoifyPVE(node.WorkID.SplitOutEmpty("_")[1]);
                });
                $nodetmpl.find(".btnOpenExpertSetting").click(function () {
                    var CustiomPVEID = node.WorkID.SplitOutEmpty("_")[1];
                    if (MissionWorker.CurrentWork != null && MissionWorker.CurrentWork.CustiomPVEID == CustiomPVEID && MissionWorker.State != DBEnum.WorkState.Ready) {
                        MessageBox.Show("执行中的任务不能修改!");
                        return;
                    }
                    SettingPage.OpenExpertSetting(Config.MoreSetting.ExpertPVESettings.FirstOrDefault(function (c) { return c.CustiomPVEID == CustiomPVEID; }), function (result) {
                        if (MissionWorker.CurrentWork != null && MissionWorker.CurrentWork.CustiomPVEID == CustiomPVEID && MissionWorker.State != DBEnum.WorkState.Ready) {
                            MessageBox.Show("执行中的任务不能修改!");
                            return;
                        }
                        if (result == null) {
                            Config.MoreSetting.ExpertPVESettings.RemoveAll(function (c) { return c.CustiomPVEID == CustiomPVEID; });
                        }
                        else {
                            result.CustiomPVEID = CustiomPVEID;
                            var modifySetting = Config.MoreSetting.ExpertPVESettings.FirstOrDefault(function (c) { return c.CustiomPVEID == CustiomPVEID; });
                            if (modifySetting != null) {
                                Config.MoreSetting.ExpertPVESettings.Replace(modifySetting, result);
                            }
                            else {
                                Config.MoreSetting.ExpertPVESettings.Add(result);
                            }
                        }
                        _This.LoadQuerueDataToHTML();
                    });
                });
                $nodetmpl.find(".workNumber").change(function () {
                    var $cbox = $(this);
                    var workid = $cbox.parents(".queuenode").eq(0).attr("data-workid");
                    var nodeObj = _This.CurrentQueueData.Nodes.FirstOrDefault(function (c) { return c.WorkID == workid; });
                    var vl = parseInt($cbox.val());
                    nodeObj.TotalWorkNumber = isNaN(vl) ? 0 : vl;
                });
                $nodetmpl.find(".workFleet").change(function () {
                    var $cbox = $(this);
                    var workid = $cbox.parents(".queuenode").eq(0).attr("data-workid");
                    var nodeObj = _This.CurrentQueueData.Nodes.FirstOrDefault(function (c) { return c.WorkID == workid; });
                    var vl = parseInt($cbox.val());
                    nodeObj.FleetID = isNaN(vl) ? 1 : vl;
                });
                $nodetmpl.find(".btnChangeNode").click(function () {
                    var $btn = $(this);
                    var workid = $btn.parents(".queuenode").eq(0).attr("data-workid");
                    var nodeObj = _This.CurrentQueueData.Nodes.FirstOrDefault(function (c) { return c.WorkID == workid; });
                    Dailog.CreatDialog({
                        Title: "选择一个任务", FormNodes: List.From([{
                                Name: "CustiomPVEID",
                                Type: Dailog.FormNodeType.select,
                                Text: "",
                                Data: MissionWorker.Works.Select(function (c) { return ({ Name: c.WorkName, Value: c.CustiomPVEID }); }),
                                Validates: List.From([{ Key: "required", Value: true, Message: "请选择配置" }])
                            }]), OnSubmit: function (fromJsonObj, $modal) {
                            $modal.find("[data-check=save]").attr("disabled", "disabled");
                            $modal.find("[data-dismiss=modal]").triggerHandler("click");
                            var CustiomPVEID = fromJsonObj.CustiomPVEID;
                            nodeObj.WorkID = NetDate.GetTimeSpan().toString() + "_" + CustiomPVEID;
                            _This.LoadQuerueDataToHTML();
                        }
                    });
                });
                $nodetmpl.find(".btnDelNode").click(function () {
                    var $btn = $(this);
                    var workid = $btn.parents(".queuenode").eq(0).attr("data-workid");
                    var nodeObj = _This.CurrentQueueData.Nodes.FirstOrDefault(function (c) { return c.WorkID == workid; });
                    $btn.parents(".queuenode").slideUp(300, function () {
                        _This.CurrentQueueData.Nodes.Remove(nodeObj);
                        _This.LoadQuerueDataToHTML();
                    });
                });
                var reloadArrow = function () {
                    _This.$Area.find(".queueNodelist .queuenode .order .fa").show();
                    _This.$Area.find(".queueNodelist .queuenode").first().find(".order .fa-long-arrow-up").hide();
                    _This.$Area.find(".queueNodelist .queuenode").last().find(".order .fa-long-arrow-down").hide();
                };
                reloadArrow();
                $nodetmpl.find(".order .fa-long-arrow-up").click(function () {
                    var $btn = $(this);
                    var workid = $btn.parents(".queuenode").eq(0).attr("data-workid");
                    var nodeObj = _This.CurrentQueueData.Nodes.FirstOrDefault(function (c) { return c.WorkID == workid; });
                    var index = _This.CurrentQueueData.Nodes.IndexOf(nodeObj);
                    if (index > 0) {
                        var prveCopy = NJson.DeepCopy(_This.CurrentQueueData.Nodes[index - 1]);
                        var thisCopy = NJson.DeepCopy(_This.CurrentQueueData.Nodes[index]);
                        _This.CurrentQueueData.Nodes[index - 1] = thisCopy;
                        _This.CurrentQueueData.Nodes[index] = prveCopy;
                        var $queuenode = $btn.parents(".queuenode").eq(0).hide();
                        $queuenode.prev(".queuenode").before($queuenode.fadeIn(300));
                        reloadArrow();
                    }
                    ;
                });
                $nodetmpl.find(".order .fa-long-arrow-down").click(function () {
                    var $btn = $(this);
                    var workid = $btn.parents(".queuenode").eq(0).attr("data-workid");
                    var nodeObj = _This.CurrentQueueData.Nodes.FirstOrDefault(function (c) { return c.WorkID == workid; });
                    var index = _This.CurrentQueueData.Nodes.IndexOf(nodeObj);
                    if (index < (_This.CurrentQueueData.Nodes.Length - 1)) {
                        var nextCopy = NJson.DeepCopy(_This.CurrentQueueData.Nodes[index + 1]);
                        var thisCopy = NJson.DeepCopy(_This.CurrentQueueData.Nodes[index]);
                        _This.CurrentQueueData.Nodes[index + 1] = thisCopy;
                        _This.CurrentQueueData.Nodes[index] = nextCopy;
                        var $queuenode = $btn.parents(".queuenode").eq(0).hide();
                        $queuenode.next(".queuenode").after($queuenode.fadeIn(400));
                        reloadArrow();
                    }
                    ;
                });
            });
        };
        QueueSetting.CurrentQueueData = null;
        QueueSetting.$Area = $("#PartialSetting #panel-pvequeue");
        return QueueSetting;
    }());
    SettingPage.OnLoad();
});
//# sourceMappingURL=Setting.js.map