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
    var LoginPage = (function () {
        function LoginPage() {
        }
        LoginPage.OnLoad = function () {
            try {
                if (api.deviceModel) {
                    if (api.deviceModel.indexOf("iPhone10") >= 0 || api.deviceModel.toLowerCase().indexOf("iphone x") >= 0 || api.deviceModel.toLowerCase().indexOf("iphonex") >= 0 || api.deviceModel.toLowerCase().indexOf("iphone10") >= 0) {
                        $("body").addClass("iosx");
                    }
                }
            }
            catch (_a) { }
            $("[data-action='viewInstructions']").click(function () {
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
            try {
                var systemVersion = api.systemVersion.SplitOutEmpty(".");
                if (api.systemType == "android" && systemVersion[0].ToNumber() <= 4 && systemVersion[1].ToNumber() <= 3) {
                    MessageBox.Show("您的设备系统版本过低，可能有兼容性问题，请升级至安卓4.4以上系统.");
                }
                if (api.systemType == "ios" && systemVersion[0].ToNumber() <= 8) {
                    MessageBox.Show("您的设备系统版本过低，可能有兼容性问题，请升级至IOS9及以上系统.");
                }
            }
            catch (ex) {
            }
            var themes_title = List.From(["樱花粉", "天依蓝", "初音绿", "绅士红", "原谅绿", "伊藤橙"]);
            var themes_class = List.From(["yinghua", "tianyi", "miku", "hong", "green", "cheng"]);
            var ChangeThemes = function (theme) {
                if (theme) {
                    var title = themes_title[themes_class.IndexOf(theme)];
                    if (title) {
                        $("body").addClass(theme);
                        $("#PartialUser .userInfo [data-name=theme]").html(title);
                    }
                }
            };
            ChangeThemes(SysLocalStorage.Get("MyThemes"));
            if (SysLocalStorage.Get("UseDarck") == "1") {
                $("body").addClass("dark");
            }
            if (SysLocalStorage.Get("UseNight") == "1") {
                var now = DateTime.ParseTime(NetDate.GetTimeSpan());
                if (now.BigThen(now.Date.AddMinutes(6 * 60)) && now.SmallThen(now.Date.AddMinutes(18 * 60))) {
                    SysLocalStorage.Set("UseNight", "0");
                }
                else {
                    $("body").addClass("night");
                    $("#PartialUser .userInfo [data-action=nightopen]").html("关闭");
                }
            }
            var ShowPassword = false;
            $("[data-action='showpwd']").click(function () {
                if ($(this).children().hasClass("fa-circle")) {
                    $(this).children().removeClass("fa-circle").addClass("fa-circle-thin");
                    ShowPassword = true;
                    $("#Password").hide();
                    $("#DiplayPassword").val($("#Password").val()).show();
                }
                else {
                    $(this).children().removeClass("fa-circle-thin").addClass("fa-circle");
                    ShowPassword = false;
                    $("#DiplayPassword").hide();
                    $("#Password").val($("#DiplayPassword").val()).show();
                }
            });
            if (SysLocalStorage.Get("SavePassword") == true) {
                $("#SavePassword").click();
            }
            $("#LoginName").val($("#LoginName").attr("data-default")).focusin(function () {
                if ($.trim($(this).val()) == $(this).attr("data-default")) {
                    $(this).val("");
                }
            }).focusout(function () {
                if ($.trim($(this).val()) == "") {
                    $(this).val($(this).attr("data-default"));
                }
            }).keyup(function () {
                var $password = ShowPassword ? $("#DiplayPassword") : $("#Password");
                var loginName = $.trim($("#LoginName").val());
                var password = $.trim($password.val());
                if (loginName && password && loginName != $("#LoginName").attr("data-default") && password != $password.attr("data-default")) {
                    $("#ActionLogin").removeClass("disable");
                }
                else {
                    $("#ActionLogin").addClass("disable");
                }
                ;
            });
            $("#Password").keyup(function () {
                var loginName = $.trim($("#LoginName").val());
                var $password = ShowPassword ? $("#DiplayPassword") : $("#Password");
                var password = $.trim($password.val());
                if (loginName && password && loginName != $("#LoginName").attr("data-default")) {
                    $("#ActionLogin").removeClass("disable");
                }
                else {
                    $("#ActionLogin").addClass("disable");
                }
                ;
            });
            $("#DiplayPassword").keyup(function () {
                var loginName = $.trim($("#LoginName").val());
                var $password = ShowPassword ? $("#DiplayPassword") : $("#Password");
                var password = $.trim($password.val());
                if (loginName && password && loginName != $("#LoginName").attr("data-default")) {
                    $("#ActionLogin").removeClass("disable");
                }
                else {
                    $("#ActionLogin").addClass("disable");
                }
                ;
            });
            try {
                if (SysLocalStorage.Get("LoginName")) {
                    $("#LoginName").val(SysLocalStorage.Get("LoginName"));
                }
                if (SysLocalStorage.Get("LoginPassword")) {
                    $("#Password").val(SysLocalStorage.Get("LoginPassword")).triggerHandler("keyup");
                }
                if (SysLocalStorage.Get("LoginArea")) {
                    $("#ServerArea").val(SysLocalStorage.Get("LoginArea"));
                }
                document.onkeydown = function (event) {
                    if (event.keyCode == 13 && $("#Password,#DiplayPassword").is(":focus")) {
                        $("#ActionLogin").triggerHandler("click");
                    }
                };
            }
            catch (_b) {
            }
            $("#ActionLogin").click(function () {
                return __awaiter(this, void 0, void 0, function () {
                    var $Action, loginArea, loginName, $password, loginPassword, checkLoginResult_string, checkLoginResult, QuDaoLoginResult, _a, _b, cloudData, serverData, checkVerResult, loginCookie, loginWapResult, _c, _d, defaultServer, loginWapResult, defaultServer;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0:
                                $Action = $("#ActionLogin");
                                loginArea = $("#ServerArea").val();
                                if ($Action.hasClass("disable") || $Action.hasClass("loading")) {
                                    return [2];
                                }
                                loginName = $.trim($("#LoginName").val());
                                $password = ShowPassword ? $("#DiplayPassword") : $("#Password");
                                loginPassword = $.trim($password.val());
                                $Action.addClass("loading").html('<i class="fa fa-spinner fa-pulse"></i>');
                                return [4, NetHelper.HTTPTokenPost("https://crt.letgowin.com/IO/CheckLogin" + (loginArea == "JP" ? "JP" : ""), { LoginName: loginName })];
                            case 1:
                                checkLoginResult_string = (_e.sent()).ResponseString;
                                checkLoginResult = NJson.DeserializeOfType(checkLoginResult_string, { ErrorCode: -999, ErrorMessage: "连接服务器失败，请检查网络" });
                                if (checkLoginResult.ErrorCode == -999) {
                                    MessageBox.Show(checkLoginResult.ErrorMessage, 5000, function () {
                                        api.ReadHTMLTemp("/home/login", function ($html) {
                                            $html.hide().fadeIn(300);
                                            $("#MainContent").html($html);
                                        });
                                    });
                                    return [2];
                                }
                                if (!(checkLoginResult.ErrorCode == 0)) return [3, 8];
                                if (!(loginArea == "QuDao")) return [3, 3];
                                _b = (_a = NJson).DeserializeOfType;
                                return [4, NetHelper.HTTPTokenPost("https://crt.letgowin.com/IO/QuDaoLogin", { LoginName: loginName })];
                            case 2:
                                QuDaoLoginResult = _b.apply(_a, [(_e.sent()).ResponseString, {
                                        ErrorCode: 0,
                                        ErrorMessage: "",
                                        LoginResult: new Net.LoginResult.PasswordLoginResult(),
                                        Channel: "",
                                        GameVersion: "",
                                        PassportLoginDomain: "",
                                        UserAgent: "",
                                        Market: "",
                                        LoginQuery: "",
                                        CheckVersionURL: ""
                                    }]);
                                if (QuDaoLoginResult.ErrorCode != 0) {
                                    MessageBox.Show(QuDaoLoginResult.ErrorMessage, 5000, function () {
                                        api.ReadHTMLTemp("/home/login", function ($html) {
                                            $html.hide().fadeIn(300);
                                            $("#MainContent").html($html);
                                        });
                                    });
                                    return [2];
                                }
                                if (QuDaoLoginResult.LoginResult.eid != 0) {
                                    MessageBox.Show("登陆验证失败，请刷新代理(同注册时的方法)", 5000, function () {
                                        api.ReadHTMLTemp("/home/login", function ($html) {
                                            $html.hide().fadeIn(300);
                                            $("#MainContent").html($html);
                                        });
                                    });
                                    return [2];
                                }
                                _e.label = 3;
                            case 3:
                                cloudData = NJson.DeserializeOfType(checkLoginResult_string, {
                                    UserData: {
                                        CardPastTime: "",
                                        CardNo: "",
                                        ships: new List(),
                                        EmemyCard: new List(),
                                        ShipEquipment: new List(),
                                        Cookbooks: new List(),
                                        ShipImg_Normal: new List(),
                                        ShipImg_Small: new List(),
                                        EquipImg_Large: new List(),
                                        ShipTactics: new List(),
                                        Android: {
                                            GameVersion: "",
                                            Channel: "",
                                            PassportLoginDomain: "",
                                            UserAgent: "",
                                            Market: "",
                                            LoginQuery: "",
                                            CheckVersionURL: "",
                                        },
                                        IOS: {
                                            GameVersion: "",
                                            Channel: "",
                                            PassportLoginDomain: "",
                                            UserAgent: "",
                                            Market: "",
                                            LoginQuery: "",
                                            CheckVersionURL: "",
                                        },
                                        JP: {
                                            GameVersion: "",
                                            Channel: "",
                                            PassportLoginDomain: "",
                                            UserAgent: "",
                                            Market: "",
                                            LoginQuery: "",
                                            CheckVersionURL: "",
                                        },
                                        OpenActions: "",
                                        DebugActions: "",
                                        AwardShipCID: "",
                                    }
                                });
                                Config.CardPastTime = DateTime.ParseTime(new Date(cloudData.UserData.CardPastTime.replace(" ", "T")).getTime());
                                Config.CardNo = cloudData.UserData.CardNo;
                                Config.LoginUser = new LoginUser();
                                Config.LoginUser.LoginArea = loginArea;
                                Config.LoginUser.LoginName = loginName;
                                Config.LoginUser.Password = loginPassword;
                                Config.OpenActions = cloudData.UserData.OpenActions;
                                Config.DebugActions = cloudData.UserData.DebugActions;
                                Config.AwardShipCID = cloudData.UserData.AwardShipCID;
                                Config.IniShips = cloudData.UserData.ships;
                                Config.IniEmemyCard = cloudData.UserData.EmemyCard;
                                Config.IniShipEquipments = cloudData.UserData.ShipEquipment;
                                Config.Cookbooks = cloudData.UserData.Cookbooks;
                                Config.ShipImg_Normal = cloudData.UserData.ShipImg_Normal;
                                Config.ShipImg_Small = cloudData.UserData.ShipImg_Small;
                                Config.EquipImg_Large = cloudData.UserData.EquipImg_Large;
                                Config.ShipTactics = cloudData.UserData.ShipTactics;
                                if (loginArea == "QuDao") {
                                    Config.Channel = QuDaoLoginResult.Channel;
                                    Config.GameVersion = QuDaoLoginResult.GameVersion;
                                    Config.PassportLoginDomain = QuDaoLoginResult.PassportLoginDomain;
                                    Config.UserAgent = QuDaoLoginResult.UserAgent;
                                    Config.Market = QuDaoLoginResult.Market;
                                    Config.LoginQuery = QuDaoLoginResult.LoginQuery;
                                    Config.CheckVersionURL = QuDaoLoginResult.CheckVersionURL;
                                }
                                else {
                                    serverData = loginArea == "Android" ? cloudData.UserData.Android : (loginArea == "IOS" ? cloudData.UserData.IOS : cloudData.UserData.JP);
                                    Config.Channel = serverData.Channel;
                                    Config.GameVersion = serverData.GameVersion;
                                    Config.PassportLoginDomain = serverData.PassportLoginDomain;
                                    Config.UserAgent = serverData.UserAgent;
                                    Config.Market = serverData.Market;
                                    Config.LoginQuery = serverData.LoginQuery;
                                    Config.CheckVersionURL = serverData.CheckVersionURL;
                                }
                                if (Config.OpenActions.SplitOutEmpty(",").Contains("IntervalSleep")) {
                                    TimeDealy.Start(Config.OpenActions.SplitOutEmpty(",").Contains("Timer"));
                                }
                                if (!(loginArea != "QuDao")) return [3, 6];
                                return [4, NetHelper.HttpGetUTF8(Config.CheckVersionURL + Config.GameVersion + "/" + Config.Channel + "/" + Config.Market + "&version=" + Config.GameVersion + "&channel=" + Config.Channel + "&market=" + Config.Market, "")];
                            case 4:
                                checkVerResult = _e.sent();
                                loginCookie = new List();
                                _d = (_c = NJson).DeserializeOfType_ThenLower;
                                return [4, NetHelper.HttpGZIPPost(Config.FormatURL("http://" + Config.PassportLoginDomain + "/index/passportLogin/?"), "username=" + Encrypt.Base64Encrypt(loginName) + "&pwd=" + Encrypt.Base64Encrypt(loginPassword), loginCookie)];
                            case 5:
                                loginWapResult = _d.apply(_c, [(_e.sent()).ResponseString, new Net.LoginResult.PasswordLoginResult()]);
                                if (loginWapResult.eid != 0) {
                                    MessageBox.Show(GameNetErrorCode.GetDictValue(loginWapResult.eid), 5000, function () {
                                        api.ReadHTMLTemp("/home/login", function ($html) {
                                            $html.hide().fadeIn(300);
                                            $("#MainContent").html($html);
                                        });
                                    });
                                }
                                else {
                                    if (Config.LoginCookie == null) {
                                        Config.LoginCookie = new List();
                                    }
                                    if (Config.LoginCookie.Where(function (c) { return c.Name == "hf_skey"; }).Count() == 0) {
                                        Config.LoginCookie.Add({ Name: "hf_skey", Value: loginWapResult.hf_skey, Path: "/", Domain: Config.HttpHeader + Config.PassportLoginDomain });
                                    }
                                    else {
                                        Config.LoginCookie.Replace(Config.LoginCookie.FirstOrDefault(function (c) { return c.Name == "hf_skey"; }), { Name: "hf_skey", Value: loginWapResult.hf_skey, Path: "/", Domain: Config.HttpHeader + Config.PassportLoginDomain });
                                    }
                                    $("#WapServers").html("");
                                    loginWapResult.serverlist.ForEach(function (c) {
                                        $("#WapServers").append("<option value='" + c.host + "'>" + c.name + "</option>");
                                    });
                                    defaultServer = loginWapResult.serverlist.FirstOrDefault(function (c) { return c.id == loginWapResult.defaultserver; });
                                    if (defaultServer) {
                                        $("#WapServers").val(defaultServer.host);
                                    }
                                    $(".loginPanel").hide().next(".serverPanel").show();
                                }
                                return [3, 7];
                            case 6:
                                loginWapResult = QuDaoLoginResult.LoginResult;
                                Config.LoginCookie = new List();
                                Config.LoginCookie.Add({ Name: "hf_skey", Value: loginWapResult.hf_skey, Path: "/", Domain: Config.HttpHeader + Config.PassportLoginDomain });
                                $("#WapServers").html("");
                                loginWapResult.serverlist.ForEach(function (c) {
                                    $("#WapServers").append("<option value='" + c.host + "'>" + c.name + "</option>");
                                });
                                defaultServer = loginWapResult.serverlist.FirstOrDefault(function (c) { return c.id == loginWapResult.defaultserver; });
                                if (defaultServer) {
                                    $("#WapServers").val(defaultServer.host);
                                }
                                $(".loginPanel").hide().next(".serverPanel").show();
                                _e.label = 7;
                            case 7: return [3, 9];
                            case 8:
                                if (checkLoginResult.ErrorCode == -10) {
                                    $Action.removeClass("loading").html('登陆');
                                    Dailog.CreatDialog({
                                        Title: "激活账号",
                                        FormNodes: List.From([{
                                                Name: "CardNo",
                                                Type: Dailog.FormNodeType.text,
                                                Text: "激活码",
                                                Placeholder: "请输入40位激活码",
                                                Validates: List.From([{ Key: "required", Value: true, Message: "请输入激活码" }])
                                            }]), OnBuild: function ($modal) {
                                            var $btnShiYong = $('<button type="button" class="btn" data-check="save">试用</button>').css({ "float": "left", "color": "#fff", "background-color": "#ef7094", "border-color": "#fb7299", "margin-left": "0" });
                                            $modal.find(".modal-footer").append($btnShiYong);
                                            $btnShiYong.click(function () {
                                                $modal.find("[data-check=save]").attr("disabled", "disabled");
                                                $modal.find("[data-dismiss=modal]").triggerHandler("click");
                                                MessageBox.Confirm("试用时间24小时</br>账号为【" + loginName + "】", function () {
                                                    return __awaiter(this, void 0, void 0, function () {
                                                        var bindResult, _a, _b;
                                                        return __generator(this, function (_c) {
                                                            switch (_c.label) {
                                                                case 0:
                                                                    _b = (_a = NJson).DeserializeOfType;
                                                                    return [4, NetHelper.HTTPTokenPost("https://crt.letgowin.com/IO/BindCard", { LoginName: loginName, CardNo: "Y5R1DLPSF9CECFF7C735409E9D90B5BB84051BCA" })];
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
                                            });
                                        }, OnSubmit: function (fromJsonObj, $modal) {
                                            $modal.find("[data-check=save]").attr("disabled", "disabled");
                                            $modal.find("[data-dismiss=modal]").triggerHandler("click");
                                            MessageBox.Confirm("确定激活账号【" + loginName + "】", function () {
                                                return __awaiter(this, void 0, void 0, function () {
                                                    var bindResult, _a, _b;
                                                    return __generator(this, function (_c) {
                                                        switch (_c.label) {
                                                            case 0:
                                                                _b = (_a = NJson).DeserializeOfType;
                                                                return [4, NetHelper.HTTPTokenPost("https://crt.letgowin.com/IO/BindCard", { LoginName: loginName, CardNo: fromJsonObj.CardNo })];
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
                                }
                                else {
                                    $Action.removeClass("loading").html('登陆');
                                    MessageBox.Show("账号验证失败！请稍后再试");
                                }
                                _e.label = 9;
                            case 9: return [2];
                        }
                    });
                });
            });
            $("#ActionSelectServer").click(function () {
                return __awaiter(this, void 0, void 0, function () {
                    var $Action, cloudData, _a, _b, loginProt, loginResult, _c, _d, fromTime;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0:
                                $Action = $(this);
                                if (!(!$Action.hasClass("disable") && (!$Action.hasClass("loading")))) return [3, 5];
                                $Action.addClass("loading").html('<i class="fa fa-spinner fa-pulse"></i>');
                                Config.ServerHost = $("#WapServers").val();
                                Config.LoginUser.ServerName = $("#WapServers option:selected").html();
                                _b = (_a = NJson).DeserializeOfType;
                                return [4, NetHelper.HTTPTokenPost("https://crt.letgowin.com/IO/GetPlayerConfig", { LoginName: Config.LoginUser.LoginName, ServerName: Config.LoginUser.ServerName })];
                            case 1:
                                cloudData = _b.apply(_a, [(_e.sent()).ResponseString, {
                                        ErrorCode: 0,
                                        ErrorMessage: "",
                                        PlayerConfig: new IniModal.PlayerConfig(),
                                        PlayerStatistics: new IniModal.PlayerStatistics(),
                                        MoreSetting: new IniModal.MoreSetting(),
                                    }]);
                                Config.PlayerConfig = cloudData.PlayerConfig;
                                Config.PlayerStatistics = cloudData.PlayerStatistics;
                                Config.MoreSetting = cloudData.MoreSetting;
                                Config.DataDomain = Config.ServerHost.substring(0, Config.ServerHost.length - 1);
                                Config.LoginCookie.ForEach(function (ck) {
                                    ck.Domain = Config.DataDomain.replace(Config.HttpHeader, "");
                                });
                                loginProt = Config.LoginCookie.FirstOrDefault(function (c) { return c.Name == "hf_skey"; }).Value.SplitOutEmpty(".")[0];
                                _d = (_c = NJson).DeserializeOfType_ThenLower;
                                return [4, NetHelper.HttpGZIPGet(Config.FormatURL(Config.DataDomain + "/index/login/" + loginProt + "?" + Config.LoginQuery), "", Config.LoginCookie, false)];
                            case 2:
                                loginResult = _d.apply(_c, [(_e.sent()).ResponseString, { loginstatus: -1, eid: 0 }]);
                                if (!(loginResult.loginstatus == 1)) return [3, 4];
                                $Action.html("初始化玩家数据中...");
                                fromTime = new Date().getTime();
                                setTimeout(function () {
                                    if ($("#WapServers").length > 0) {
                                        MessageBox.Show("初始化超时\n请尝试登陆一次游戏\n或重启手机");
                                    }
                                }, 60000);
                                $("#WapServers").attr("disabled", "disabled");
                                return [4, InitUser()];
                            case 3:
                                if (_e.sent()) {
                                    SysLocalStorage.Set("SavePassword", $("#SavePassword").is(":checked"));
                                    if ($("#SavePassword").is(":checked")) {
                                        SysLocalStorage.Set("LoginName", Config.LoginUser.LoginName);
                                        SysLocalStorage.Set("LoginPassword", Config.LoginUser.Password);
                                        SysLocalStorage.Set("LoginArea", Config.LoginUser.LoginArea);
                                    }
                                    else {
                                        SysLocalStorage.Set("LoginName", "");
                                        SysLocalStorage.Set("LoginPassword", "");
                                        SysLocalStorage.Set("LoginArea", "");
                                    }
                                    api.ReadHTMLTemp("/home/main", function ($html) {
                                        $html.hide().fadeIn(300);
                                        $("#MainContent").html($html);
                                    });
                                }
                                else {
                                    MessageBox.Show("初始化失败，请确认网络是否正常", 5000, function () {
                                        api.ReadHTMLTemp("/home/login", function ($html) {
                                            $html.hide().fadeIn(300);
                                            $("#MainContent").html($html);
                                        });
                                    });
                                }
                                return [3, 5];
                            case 4:
                                MessageBox.Show((loginResult.eid == -9998 || loginResult.eid == -9999) ? "本区维护中" : "服务器选择失败", 5000, function () {
                                    api.ReadHTMLTemp("/home/login", function ($html) {
                                        $html.hide().fadeIn(300);
                                        $("#MainContent").html($html);
                                    });
                                });
                                _e.label = 5;
                            case 5:
                                ;
                                return [2];
                        }
                    });
                });
            });
            var InitUser = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 10, , 11]);
                                return [4, Net.Login.InitUserInfo()];
                            case 1:
                                _b.sent();
                                return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/pve/getPveData/"), "", Config.LoginCookie)];
                            case 2:
                                _b.sent();
                                return [4, NetHelper.HttpGZIPGet(Config.FormatURL("DataDomain/pevent/getPveData/"), "", Config.LoginCookie)];
                            case 3:
                                _b.sent();
                                return [4, Net.Conditioning.GameReset()];
                            case 4:
                                _b.sent();
                                return [4, Net.Conditioning.GetSpoilsShopList()];
                            case 5:
                                _b.sent();
                                if (!Config.OpenActions.SplitOutEmpty(",").Contains("PVEEvent")) return [3, 9];
                                return [4, Net.Conditioning.GuardConfig()];
                            case 6:
                                _b.sent();
                                return [4, Net.Conditioning.GuardGetThreeUserData()];
                            case 7:
                                _b.sent();
                                return [4, Net.Conditioning.GetPeventTask()];
                            case 8:
                                _b.sent();
                                _b.label = 9;
                            case 9: return [2, true];
                            case 10:
                                _a = _b.sent();
                                return [2, false];
                            case 11: return [2];
                        }
                    });
                });
            };
        };
        return LoginPage;
    }());
    LoginPage.OnLoad();
});
//# sourceMappingURL=Login.js.map