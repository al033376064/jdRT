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
$(function () {
    var Page = {
        InitEvent: function () {
            $("#PartialUser .userInfo [data-name=appversion]").html(api.appVersion + (SysLocalStorage.Get("smartupdate_vname") == undefined ? "" : (" " + SysLocalStorage.Get("smartupdate_vname"))) + " " + (api.systemType.toLowerCase() == "android" ? "<i class='fa fa-android'></i>" : "<i class='fa fa-apple'></i>"));
            $("#PartialUser .userInfo [data-name=loginName]").html(Config.LoginUser.LoginName);
            $("#PartialUser .userInfo [data-name=cardPastTime]").html(Config.CardPastTime.ToString("yyyy/MM/dd HH:mm:ss").ReplaceAll("/", "-"));
            $("#PartialUser .userInfo [data-name=zone_name]").html(Config.LoginUser.ServerName);
            $("#PartialUser .userInfo [data-name=username]").html(Player.User.username);
            $("#PartialUser .userInfo [data-name=uid]").html(Player.User.uid);
            $("#PartialUser .userInfo [data-name=level]").html(Player.User.level.toString());
            if (Config.LoginUser.LoginArea == "JP") {
                var IsCN = false;
                var ShipTitleSave_CN = new List();
                var ShipTitleSave_JP = new List();
                var EquipTitleSave_CN = new List();
                var EquipTitleSave_JP = new List();
                $("#PartialUser .userInfo [data-name=language]").html("日文");
                $("#PartialUser  [data-action='modifyLanguage']").click(function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var checkLoginResult_string, checkLoginResult, cloudData;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (IsCN == false) {
                                        $("#PartialUser .userInfo [data-name=language]").html("中文");
                                    }
                                    else {
                                        $("#PartialUser .userInfo [data-name=language]").html("日文");
                                    }
                                    IsCN = !IsCN;
                                    if (ShipTitleSave_JP == null || ShipTitleSave_JP.Count() == 0) {
                                        Config.IniShips.ForEach(function (shipini) {
                                            ShipTitleSave_JP.Add([shipini.CID, shipini.Name]);
                                        });
                                        Config.IniShipEquipments.ForEach(function (equipini) {
                                            EquipTitleSave_JP.Add([equipini.CID, equipini.Title]);
                                        });
                                    }
                                    if (!(ShipTitleSave_CN == null || ShipTitleSave_CN.Count() == 0)) return [3, 2];
                                    return [4, NetHelper.HTTPTokenPost("https://crt.letgowin.com/IO/CheckLogin", { LoginName: Config.LoginUser.LoginName })];
                                case 1:
                                    checkLoginResult_string = (_a.sent()).ResponseString;
                                    checkLoginResult = NJson.DeserializeOfType(checkLoginResult_string, { ErrorCode: 0, ErrorMessage: "" });
                                    if (checkLoginResult.ErrorCode == 0) {
                                        cloudData = NJson.DeserializeOfType(checkLoginResult_string, {
                                            UserData: {
                                                ships: new List(),
                                                ShipEquipment: new List(),
                                            }
                                        });
                                        cloudData.UserData.ships.ForEach(function (shipini) {
                                            ShipTitleSave_CN.Add([shipini.CID, shipini.Name]);
                                        });
                                        cloudData.UserData.ShipEquipment.ForEach(function (equipini) {
                                            EquipTitleSave_CN.Add([equipini.CID, equipini.Title]);
                                        });
                                    }
                                    _a.label = 2;
                                case 2:
                                    if (IsCN == true) {
                                        Config.IniShips.ForEach(function (shipini) {
                                            var tt = ShipTitleSave_CN.FirstOrDefault(function (c) { return c[0] == shipini.CID; });
                                            if (tt != null) {
                                                shipini.Name = tt[1];
                                            }
                                        });
                                        Config.IniShipEquipments.ForEach(function (equipini) {
                                            var tt = EquipTitleSave_CN.FirstOrDefault(function (c) { return c[0] == equipini.CID; });
                                            if (tt != null) {
                                                equipini.Title = tt[1];
                                            }
                                        });
                                    }
                                    else {
                                        Config.IniShips.ForEach(function (shipini) {
                                            var tt = ShipTitleSave_JP.FirstOrDefault(function (c) { return c[0] == shipini.CID; });
                                            if (tt != null) {
                                                shipini.Name = tt[1];
                                            }
                                        });
                                        Config.IniShipEquipments.ForEach(function (equipini) {
                                            var tt = EquipTitleSave_JP.FirstOrDefault(function (c) { return c[0] == equipini.CID; });
                                            if (tt != null) {
                                                equipini.Title = tt[1];
                                            }
                                        });
                                    }
                                    return [2];
                            }
                        });
                    });
                });
            }
            else {
                $("#PartialUser  [data-action='modifyLanguage']").click(function () {
                    if (LanguageControl.CurrentLanguage == WebLanguage.简体中文) {
                        $("#PartialUser .userInfo [data-name=language]").html("繁體中文");
                        LanguageControl.ChangeLanguage(WebLanguage.繁體中文);
                    }
                    else {
                        $("#PartialUser .userInfo [data-name=language]").html("简体中文");
                        LanguageControl.ChangeLanguage(WebLanguage.简体中文);
                    }
                });
            }
            var themes_title = List.From(["樱花粉", "天依蓝", "初音绿", "绅士红", "原谅绿", "伊藤橙"]);
            var themes_class = List.From(["yinghua", "tianyi", "miku", "hong", "green", "cheng"]);
            var ChangeThemes = function (theme) {
                if (theme) {
                    var title = themes_title[themes_class.IndexOf(theme)];
                    if (title) {
                        $("#PartialUser .userInfo [data-name=theme]").html(title);
                    }
                }
            };
            ChangeThemes(SysLocalStorage.Get("MyThemes"));
            $("#PartialUser .userInfo [data-action=modifyTheme]").click(function () {
                var currentTheme = SysLocalStorage.Get("MyThemes");
                if (currentTheme == undefined || currentTheme == "" || themes_class.IndexOf(currentTheme) == -1) {
                    currentTheme = "yinghua";
                }
                var currentIndex = themes_class.IndexOf(currentTheme);
                var nextIndex = currentIndex == (themes_class.Count() - 1) ? 0 : (currentIndex + 1);
                $("#PartialUser .userInfo [data-name=theme]").html(themes_title[nextIndex]);
                $("body").removeClass(themes_class[currentIndex]).addClass(themes_class[nextIndex]);
                SysLocalStorage.Set("MyThemes", themes_class[nextIndex]);
            });
            if (SysLocalStorage.Get("UseNight") == "1") {
                $("#PartialUser .userInfo [data-action=nightopen]").html("关闭");
            }
            $("#PartialUser .userInfo [data-action=nightopen]").click(function () {
                if ($("body").hasClass("night")) {
                    $("body").removeClass("night");
                    $("#PartialUser .userInfo [data-action=nightopen]").html("启用");
                    SysLocalStorage.Set("UseNight", "0");
                }
                else {
                    $("body").addClass("night");
                    $("#PartialUser .userInfo [data-action=nightopen]").html("关闭");
                    SysLocalStorage.Set("UseNight", "1");
                }
            });
            $("#PartialUser .userInfo [data-name=sysTime]").click(function () {
                Dailog.CreatDialog({
                    Title: "矫正时间(非海外党不要改)", FormNodes: List.From([{
                            Name: "AddMinutes",
                            Type: Dailog.FormNodeType.text,
                            Text: "输入矫正差（分钟）整数",
                            Value: SysLocalStorage.Get("AddMinutes") ? SysLocalStorage.Get("AddMinutes") : "",
                            Placeholder: "正数为加，负数为减",
                            Validates: List.From([{ Key: "required", Value: true, Message: "请输入次数" }, { Key: "number", Value: true, Message: "输入整数" }])
                        }]), OnBuild: function ($modal) {
                    }, OnSubmit: function (fromJsonObj, $modal) {
                        return __awaiter(this, void 0, void 0, function () {
                            var AddMinutes, nowTime, newTime;
                            return __generator(this, function (_a) {
                                $modal.find("[data-check=save]").attr("disabled", "disabled");
                                $modal.find("[data-dismiss=modal]").triggerHandler("click");
                                AddMinutes = Math.ceil(fromJsonObj.AddMinutes.ToNumber());
                                if (isNaN(AddMinutes))
                                    return [2];
                                console.log(AddMinutes);
                                if (AddMinutes >= 1440 || AddMinutes <= -1440) {
                                    MessageBox.Show("补正时间输入范围过大，请输入分钟数字");
                                    return [2];
                                }
                                nowTime = DateTime.ParseTime(NetDate.GetTimeSpan());
                                newTime = nowTime.AddMinutes(AddMinutes);
                                MessageBox.Confirm("矫正后的时间为\\n" + newTime.ToString("hh:mm:ss"), function () {
                                    SysLocalStorage.Set("AddMinutes", AddMinutes.toString());
                                    MessageBox.Show("操作成功，系统按新时间进行计算，重启后生效！");
                                });
                                return [2];
                            });
                        });
                    }
                });
            });
            setInterval(function () {
                $("#PartialUser .userInfo [data-name=sysTime]").html(DateTime.ParseTime(NetDate.GetTimeSpan()).ToString("hh:mm:ss"));
            }, 1000);
            $("#PartialUser [data-action='loginOut']").click(function () {
                MessageBox.Confirm("确定退出登陆？", function () {
                    api.closeWidget({ silent: true });
                });
            });
            $("#PartialUser [data-action='viewInstructions']").click(function () {
                var $APPInstructions = $(doT.template($("[data-tempid=APPInstructions]").html())());
                $("body").append($APPInstructions);
                $APPInstructions.find(".modelheader [data-dismiss]").click(function () {
                    $APPInstructions.removeClass("slideInRight").addClass("slideOutRight");
                    setTimeout(function () {
                        $APPInstructions.remove();
                    }, 500);
                });
                PageScroll.BindScroll($("#APPInstructions"), "滑动关闭使用手册", function (ev) {
                }, function (ev) {
                    return false;
                }, function (ev) {
                }, function (ev) {
                    var windowWidth = $(window).width();
                    if (ev.Start_X <= (windowWidth / 20) && ev.Move_X >= (windowWidth / 10)) {
                        $("#APPInstructions").find(".modelheader [data-dismiss]").triggerHandler("click");
                    }
                });
            });
            $("#PartialUser [data-action='bindCard']").click(function () {
                Dailog.CreatDialog({
                    Title: "续期",
                    FormNodes: List.From([{
                            Name: "CardNo",
                            Type: Dailog.FormNodeType.text,
                            Text: "激活码",
                            Placeholder: "请输入40位激活码",
                            Validates: List.From([{ Key: "required", Value: true, Message: "请输入激活码" }])
                        }]), OnSubmit: function (fromJsonObj, $modal) {
                        $modal.find("[data-check=save]").attr("disabled", "disabled");
                        $modal.find("[data-dismiss=modal]").triggerHandler("click");
                        MessageBox.Confirm("确定激活账号【" + Config.LoginUser.LoginName + "】", function () {
                            return __awaiter(this, void 0, void 0, function () {
                                var bindResult, _a, _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            _b = (_a = NJson).DeserializeOfType;
                                            return [4, NetHelper.HTTPTokenPost("https://crt.letgowin.com/IO/BindCard", { LoginName: Config.LoginUser.LoginName, CardNo: fromJsonObj.CardNo })];
                                        case 1:
                                            bindResult = _b.apply(_a, [(_c.sent()).ResponseString, { ErrorCode: 0, ErrorMessage: "" }]);
                                            if (bindResult.ErrorCode == 0) {
                                                MessageBox.Show("绑定成功！请重新登陆");
                                            }
                                            else {
                                                MessageBox.Show(bindResult.ErrorMessage);
                                            }
                                            return [2];
                                    }
                                });
                            });
                        });
                    }
                });
            });
            var isChanging = false;
            $("#PartialUser [data-action='oepnAccounts']").click(function () {
                Dailog.CreatDialog({
                    Title: "账号管理",
                    FormNodes: List.From([]),
                    AnimateIn: "zoomIn",
                    AnimateOut: "zoomOut",
                    OnBuild: function ($modal) {
                        $modal.find(".modal-title").append(" <i class=\"fa fa-ioxhost\"></i>");
                        $modal.find(".modal-footer").remove();
                        $modal.find(".modal-dialog").css("animation-duration", "0.6s");
                        $modal.addClass("modal_userPanel_accounts");
                        var localAccounts = (SysLocalStorage.Get("localAccounts") ? SysLocalStorage.Get("localAccounts") : "").SplitOutEmpty(",");
                        if (localAccounts.Where(function (c) { return c == Config.LoginUser.LoginName; }).Count() == 0) {
                            localAccounts.Add(Config.LoginUser.LoginName);
                        }
                        localAccounts = localAccounts.OrderByDescending(function (c) { return c == Config.LoginUser.LoginName; });
                        var ReloadAccount = function (accounts) {
                            var $Detail = $(doT.template($("#PartialUser [data-tempid='UserAccounts']").html())(NJson.ObjListToArray(NJson.DeepCopy(accounts))));
                            $modal.find(".modal-body").html("").append($Detail);
                            var height = $modal.find(".modal-content").outerHeight();
                            var wHeigt = $(window).height();
                            $modal.find(".modal-dialog").css("margin-top", (wHeigt - height) / 2);
                            $Detail.find(".fa-minus-circle").click(function () {
                                var account = $(this).parents(".account").eq(0).attr("data-account");
                                MessageBox.Confirm("确定移除该账号？", function () {
                                    localAccounts.RemoveAll(function (c) { return c == account; });
                                    SysLocalStorage.Set("localAccounts", localAccounts.JoinToString(","));
                                    ReloadAccount(localAccounts);
                                });
                            });
                            $Detail.find(".btnchange").click(function () {
                                if (isChanging == true) {
                                    MessageBox.Show("正在切换账号，请勿重复操作");
                                    return;
                                }
                                var account = $(this).parents(".account").eq(0).attr("data-account");
                                MessageBox.Confirm("确定将激活码换绑到该账号并重启应用？", function () {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var changeBindResult, _a, _b;
                                        return __generator(this, function (_c) {
                                            switch (_c.label) {
                                                case 0:
                                                    isChanging = true;
                                                    _b = (_a = NJson).DeserializeOfType;
                                                    return [4, NetHelper.HTTPTokenPost("https://crt.letgowin.com/IO/ChangeBind", { LoginName: account, CardNo: Config.CardNo })];
                                                case 1:
                                                    changeBindResult = _b.apply(_a, [(_c.sent()).ResponseString, { ErrorCode: -999, ErrorMessage: "连接服务器失败，请检查网络" }]);
                                                    isChanging = false;
                                                    if (changeBindResult.ErrorCode == 0) {
                                                        SysLocalStorage.Set("LoginName", account);
                                                        SysLocalStorage.Del("LoginPassword");
                                                        SysLocalStorage.Del("LoginArea");
                                                        api.rebootApp();
                                                    }
                                                    else {
                                                        MessageBox.Show(changeBindResult.ErrorMessage);
                                                    }
                                                    return [2];
                                            }
                                        });
                                    });
                                });
                            });
                            $Detail.find("[data-action=AddNewAccount]").click(function () {
                                var account = $(this).parents(".account").eq(0).attr("data-account");
                                Dailog.CreatDialog({
                                    Title: "新增账号",
                                    FormNodes: List.From([{
                                            Name: "AccountName",
                                            Type: Dailog.FormNodeType.text,
                                            Text: "账号",
                                            Placeholder: "请输入一个游戏账号",
                                            Validates: List.From([{ Key: "required", Value: true, Message: "请输入一个游戏账号" }])
                                        }]), OnSubmit: function (fromJsonObj, $modal) {
                                        $modal.find("[data-check=save]").attr("disabled", "disabled");
                                        $modal.find("[data-dismiss=modal]").triggerHandler("click");
                                        var AccountName = fromJsonObj.AccountName;
                                        if (localAccounts.Contains(AccountName)) {
                                            MessageBox.Show("不要重复添加");
                                        }
                                        else {
                                            localAccounts.Add(AccountName);
                                            SysLocalStorage.Set("localAccounts", localAccounts.JoinToString(","));
                                            ReloadAccount(localAccounts);
                                        }
                                    }
                                });
                            });
                        };
                        ReloadAccount(localAccounts);
                    },
                    OnSubmit: function (fromJsonObj, $modal) { }
                });
            });
        },
    };
    Page.InitEvent();
});
//# sourceMappingURL=User.js.map