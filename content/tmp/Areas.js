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
    var MainPage = (function () {
        function MainPage() {
        }
        MainPage.InitAreas = function () {
            this.Areas.Add(new Area_Bath());
            this.Areas.Add(new Area_ZhanYi());
            this.Areas.Add(new Area_YanXi());
            this.Areas.Add(new Area_Friends());
            this.Areas.Add(new Area_YuanZheng());
            this.Areas.Add(new Area_DayMission());
            this.Areas.Add(new Area_ZhanJi());
            this.Areas.Add(new Area_LiaoLi());
            this.Areas.Add(new Area_XueYuan());
            this.Areas.Add(new Area_Shipdocks());
            this.Areas.Add(new Area_Equipdocks());
            this.Areas.Add(new Area_ShipTuJian());
            this.Areas.Add(new Area_AutoQiangHua());
            this.Areas.Add(new Area_AutoChangeShip());
            this.Areas.Add(new Area_ShipBuilder());
            this.Areas.Add(new Area_EquipBuilder());
            this.Areas.Add(new Area_JiHuaRenWu());
            this.Areas.ForEach(function (c) {
                c.OnLoad();
            });
        };
        MainPage.OnLoad = function () {
            var _This = this;
            if (api.systemType.toLowerCase() != "android") {
                $("#PartialAreas .areaPanelFaces [data-faceaction=opengame]").hide();
            }
            this.InitAreas();
            $("#PartialAreas .areaPanelFaces [data-faceaction]").click(function () {
                var $faces = $("#PartialAreas .areaPanelFaces");
                if (!$faces.hasClass("actioning")) {
                    var faceaction = $(this).attr("data-faceaction");
                    if (faceaction.indexOf("slidePage") == 0) {
                        var panelName = faceaction.split('|')[1];
                        if (panelName && !$faces.hasClass("actioning")) {
                            var $panel_1 = $("#PartialAreas .areaPanel_" + panelName);
                            var controllerName_1 = $panel_1.attr("data-controller");
                            var CheckResult = true;
                            var nextPage_1 = _This.Areas.FirstOrDefault(function (c) { return c.Name == controllerName_1; });
                            if (nextPage_1.BeforeOpen()) {
                                _This.Areas.ForEach(function (c) { return c.IsCurrentPage = false; });
                                nextPage_1.IsCurrentPage = true;
                                nextPage_1.OnOpen();
                                $faces.addClass("actioning");
                                $panel_1.addClass("active");
                                nextPage_1.$Area.addClass("opening");
                                setTimeout(function () {
                                    $panel_1.css("transform", "translate3d(0,0,0)");
                                    $faces.css("transform", "translate3d(-20%,0,0)");
                                    setTimeout(function () {
                                        if (nextPage_1.$Area.hasClass("opening")) {
                                            nextPage_1.$Area.removeClass("opening");
                                            $faces.removeClass("actioning");
                                            nextPage_1.OnOpened();
                                            $panel_1.append("<p class='redraw'></p>");
                                        }
                                    }, 400);
                                }, 10);
                            }
                        }
                    }
                    if (faceaction == "opengame") {
                        api.appInstalled({
                            appBundle: "com.huanmeng.zhanjian2"
                        }, function (ret) {
                            if (ret.installed) {
                                MessageBox.Confirm("确定退出辅助并启动游戏？", function () {
                                    api.openApp({
                                        androidPkg: 'com.huanmeng.zhanjian2',
                                    });
                                    api.rebootApp();
                                });
                            }
                            else {
                                MessageBox.Show("游戏未安装");
                            }
                        });
                    }
                    if (faceaction.indexOf("openWin") == 0) {
                        var WinName = faceaction.split('|')[1];
                        api.openWin({
                            name: WinName,
                            url: WinName == "jianshaoziliao" ? "http://js.ntwikis.com/" : "https://www.zjsnrwiki.com/wiki/%E9%A6%96%E9%A1%B5",
                            animation: {
                                type: "push",
                                subType: "from_right",
                                duration: 300
                            },
                            progress: {
                                type: "default",
                                title: "Loading",
                                text: "加载中",
                                color: "#45C01A",
                            },
                            useWKWebView: true,
                            hidden: false,
                            reload: false,
                            bounces: false,
                            scaleEnabled: false,
                            bgColor: '#fff',
                            vScrollBarEnabled: false,
                            hScrollBarEnabled: false,
                        });
                    }
                    if (faceaction.indexOf("openFrame") == 0) {
                        var FrameName_1 = faceaction.split('|')[1];
                        var headerHeight_1 = $("#PartialAreas > .header").outerHeight();
                        var urlHeight = $("#PartialAreas  .urlBar").outerHeight();
                        var $panel_2 = $("#PartialAreas .areaPanel_" + FrameName_1);
                        $panel_2.addClass("active");
                        $panel_2.css("transform", "translate3d(0,0,0)");
                        if ($panel_2.hasClass("builded") == false) {
                            api.openFrame({
                                name: FrameName_1,
                                url: FrameName_1 == "jianshaoziliao" ? "http://js.ntwikis.com/" : (FrameName_1 == "wikibaike" ? "https://www.zjsnrwiki.com/wiki/%E9%A6%96%E9%A1%B5" : "https://www.baidu.com"),
                                useWKWebView: true,
                                scaleEnabled: true,
                                historyGestureEnabled: true,
                                rect: {
                                    x: 0,
                                    y: headerHeight_1,
                                    w: 'auto',
                                    h: 'auto'
                                },
                            });
                            $panel_2.addClass("builded").find(".areaheader [data-dismiss]").click(function () {
                                api.setFrameAttr({
                                    name: FrameName_1,
                                    hidden: true
                                });
                                $panel_2.removeClass("active");
                                $panel_2.css("transform", "translate3d(100%,0,0)");
                            });
                            $panel_2.find(".areaheader [data-action='toggleUrlBar']").click(function () {
                                $panel_2.find(".areaheader").addClass("show");
                            });
                            $panel_2.find(".areaheader [data-action='close']").click(function () {
                                $panel_2.find(".areaheader").removeClass("show");
                            });
                            $panel_2.find("[data-action='redirect']").click(function () {
                                if ($panel_2.find(".internetUrl").val()) {
                                    var url = $panel_2.find(".http").val() + $panel_2.find(".internetUrl").val();
                                    api.openFrame({
                                        name: FrameName_1,
                                        url: url,
                                        useWKWebView: true,
                                        rect: {
                                            x: 0,
                                            y: headerHeight_1,
                                            w: 'auto',
                                            h: 'auto'
                                        },
                                    });
                                }
                            });
                        }
                        else {
                            api.setFrameAttr({
                                name: FrameName_1,
                                hidden: false
                            });
                        }
                    }
                }
            });
            $("#PartialAreas .areaPanelLists .areaPanel[data-controller] .areaheader [data-dismiss]").click(function () {
                var $panel = $(this).parents(".areaPanel").eq(0);
                var controllerName = $panel.attr("data-controller");
                var CheckResult = true;
                var thisPage = _This.Areas.FirstOrDefault(function (c) { return c.Name == controllerName; });
                if (thisPage.BeforeClose()) {
                    thisPage.IsCurrentPage = false;
                    var $faces_1 = $("#PartialAreas .areaPanelFaces");
                    $faces_1.addClass("actioning");
                    thisPage.$Area.removeClass("opening");
                    $panel.css("transform", "translate3d(100%,0,0)");
                    $faces_1.css("transform", "translate3d(0%,0,0)");
                    setTimeout(function () {
                        $faces_1.removeClass("actioning");
                        $panel.removeClass("active");
                        $panel.children(".redraw").remove();
                        thisPage.OnClosed();
                    }, 300);
                }
            });
            $("#PartialAreas .areaPanelLists .areaPanel").each(function (index, dom) {
                var $panel = $(dom);
                PageScroll.BindScroll($panel, "滑动关闭分区窗体", function (ev) {
                }, function (ev) {
                    return false;
                }, function (ev) {
                }, function (ev) {
                    var windowWidth = $(window).width();
                    if (ev.Start_X <= (windowWidth / 20) && ev.Move_X >= (windowWidth / 10)) {
                        $panel.find(".areaheader [data-dismiss]").triggerHandler("click");
                    }
                });
            });
        };
        MainPage.Areas = new List();
        MainPage.DesShipDrap = NJson.Parse(AesSecret.DecryptByAES(ShipDrap)).Select(function (c) { return { CID: c.CID, Draps1: c.Draps1, Draps2: c.Draps2, Draps3: c.Draps3, Draps4: c.Draps4, CanBuild: c.CanBuild, Builds: c.Builds }; });
        return MainPage;
    }());
    var Area_Bath = (function () {
        function Area_Bath() {
            this.Name = "Area_Bath";
            this.$Area = $("#PartialAreas .areaPanel_bath");
            this.IsCurrentPage = false;
            this.UpdateTimer = null;
            this.LastDockListJsonString = "";
            this.LastShipListJsonString = "";
        }
        Area_Bath.prototype.OnLoad = function () {
            var _This = this;
            var $Area = _This.$Area;
        };
        ;
        Area_Bath.prototype.InitUpdateTimer = function () {
            var _this = this;
            this.UpdateTimer = new Timer();
            this.UpdateTimer.Interval = 1000;
            this.UpdateTimer.Elapsed = function () {
                _this.UpdateTimer.Stop();
                try {
                    _this.UpdateView();
                }
                catch (ex) {
                }
                finally {
                    _this.UpdateTimer.Start();
                }
            };
            this.UpdateView();
            this.UpdateTimer.Start();
        };
        Area_Bath.prototype.UpdateView = function () {
            if (this.IsCurrentPage) {
                this.CheckUpdateDocks();
                this.CheckUpdateShipList();
            }
        };
        Area_Bath.prototype.CheckUpdateDocks = function () {
            var TempEntityData = Player.RepairDockVo.Where(function (c) { return c.locked == 0; }).Select(function (dock) {
                var ship = Player.UserShipVo.FirstOrDefault(function (c) { return c.id == dock.shipid; });
                if (ship != null) {
                    var subSecound = Math.max(dock.endtime - NetDate.GetTimeSpanSecound(), 0);
                    var hour = Math.floor(subSecound / 3600);
                    var mini = Math.floor((subSecound - hour * 3600) / 60);
                    var secound = subSecound - hour * 3600 - mini * 60;
                    var result = {
                        id: dock.id,
                        shipid: dock.shipid,
                        endtime: dock.endtime,
                        hour: hour,
                        mini: mini,
                        secound: secound,
                        ship: {
                            level: ship.level,
                            name: Player.GetShipName(ship),
                            battleprops: ship.battleprops,
                            battlepropsmax: ship.battlepropsmax,
                        }
                    };
                    return result;
                }
                else {
                    var result = {
                        id: dock.id,
                        shipid: dock.shipid,
                        endtime: dock.endtime,
                        hour: 0,
                        mini: 0,
                        secound: 0,
                        ship: {
                            level: 0,
                            name: "",
                            battleprops: new Net.Result.ShipBattleProps(),
                            battlepropsmax: new Net.Result.ShipBattleProps(),
                        }
                    };
                    return result;
                }
            });
            if (this.LastDockListJsonString != NJson.Stringify(TempEntityData)) {
                this.LastDockListJsonString = NJson.Stringify(TempEntityData);
                var $dockListTemp = $(doT.template(this.$Area.find("[data-tempid='dockListTemp']").html())(NJson.ObjListToArray(NJson.DeepCopy(TempEntityData))));
                this.$Area.find(".docklists").html("").append($dockListTemp);
                $dockListTemp.find(".selectRepairShip").click(function () {
                    var $Action = $(this);
                    if (ZhanYiWorker.State != DBEnum.WorkState.Ready) {
                        MessageBox.Show("请先取消战役");
                        return;
                    }
                    if (MissionWorker.State != DBEnum.WorkState.Ready) {
                        MessageBox.Show("请先停止任务");
                        return;
                    }
                    if (YanXiWorker.State != DBEnum.WorkState.Ready) {
                        MessageBox.Show("请先停止演习");
                        return;
                    }
                    var dockid = $Action.parent().attr("data-dockid").ToNumber();
                    Dailog.CreatDialog({
                        Title: "选择船只", FormNodes: List.From([{
                                Name: "ShipID",
                                Type: Dailog.FormNodeType.select,
                                Text: "选择船只",
                                Data: Player.UserShipVo.Where(function (c) { return (Player.IsBusyShip(c) == false) && c.battlepropsmax.hp > c.battleprops.hp; }).OrderByDescending(function (c) { return c.level; })
                                    .Select(function (ship) { return ({ Name: "Lv." + ship.level + " - " + Player.GetShipName(ship) + " - " + ship.battleprops.hp + "/" + ship.battlepropsmax.hp, Value: ship.id.toString() }); }),
                                Validates: List.From([{ Key: "required", Value: true, Message: "请选择船只" }])
                            }]), OnBuild: function ($modal) {
                            $modal.find("[name='ShipID']").select2();
                        }, OnSubmit: function (fromJsonObj, $modal) {
                            return __awaiter(this, void 0, void 0, function () {
                                var shipid, netResult;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            $modal.find("[data-check=save]").attr("disabled", "disabled");
                                            $modal.find("[data-dismiss=modal]").triggerHandler("click");
                                            shipid = fromJsonObj.ShipID.ToNumber();
                                            return [4, Net.Conditioning.DockRepairShip(dockid, shipid)];
                                        case 1:
                                            netResult = _a.sent();
                                            if (!(netResult.ErrorCode != 0)) return [3, 2];
                                            MessageBox.Show(netResult.ErrorMessage);
                                            return [3, 5];
                                        case 2:
                                            if (!(Config.MoreSetting.RepairRubDown == true)) return [3, 4];
                                            return [4, Net.Conditioning.DockRubDown(shipid)];
                                        case 3:
                                            _a.sent();
                                            _a.label = 4;
                                        case 4:
                                            Logs.Print("\u6FA1\u5802 - " + Player.GetShipName(Player.GetShip(shipid)) + " \u6CE1\u6FA1");
                                            _a.label = 5;
                                        case 5: return [2];
                                    }
                                });
                            });
                        }
                    });
                });
                $dockListTemp.find(".quickRepair").click(function () {
                    var $Action = $(this);
                    var dockid = $Action.parent().attr("data-dockid").ToNumber();
                    var dock = Player.RepairDockVo.FirstOrDefault(function (c) { return c.id == dockid; });
                    if (dock.endtime - NetDate.GetTimeSpanSecound() > 0) {
                        var shipid_1 = dock.shipid;
                        MessageBox.Confirm("确定使用快修？", function () {
                            return __awaiter(this, void 0, void 0, function () {
                                var netResult;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4, Net.Conditioning.DockRepairQuick(dockid)];
                                        case 1:
                                            netResult = _a.sent();
                                            if (netResult.ErrorCode != 0) {
                                                MessageBox.Show(netResult.ErrorMessage);
                                            }
                                            else {
                                                Logs.Print("\u6FA1\u5802 - " + Player.GetShipName(Player.GetShip(shipid_1)) + " \u5FEB\u4FEE\u4F7F\u7528\u6210\u529F");
                                            }
                                            return [2];
                                    }
                                });
                            });
                        });
                    }
                });
            }
        };
        Area_Bath.prototype.CheckUpdateShipList = function () {
            var _This = this;
            var $Area = _This.$Area;
            var TempEntityData = Player.UserShipVo.Where(function (c) { return c.battlepropsmax.hp > c.battleprops.hp; }).Select(function (ship) {
                var iniShip = Player.GetIniShip(ship);
                var state = Player.GetShipStateContext(ship);
                var repairTime = Player.GetRepairTime(ship);
                var hour = Math.floor(repairTime / 3600);
                var mini = Math.floor((repairTime - hour * 3600) / 60);
                var secound = (repairTime - hour * 3600 - mini * 60);
                var Hour = (hour.toString().length == 1 ? "0" : "") + hour;
                var Mini = (mini.toString().length == 1 ? "0" : "") + mini;
                var Secound = (secound.toString().length == 1 ? "0" : "") + secound;
                return {
                    ID: ship.id,
                    Name: iniShip == null ? "未知" : iniShip.Name,
                    Level: ship.level,
                    Type: iniShip == null ? "未知" : DBEnum.ENUM_ShipType[iniShip.Type],
                    TypeNum: iniShip == null ? 0 : iniShip.Type,
                    HP: ship.battleprops.hp + "/" + ship.battlepropsmax.hp,
                    State: state != "" ? state : (Hour + ":" + Mini + ":" + Secound),
                    IsLocked: ship.islocked,
                    FleetID: ship.fleetid,
                    Create_Time: ship.create_time,
                    IsRepairing: Player.IsRepairShip(ship) == true ? 1 : 0,
                    Selected: AutoBath.RepairShips.Select(function (c) { return c.ShipID; }).Contains(ship.id) ? 1 : 0
                };
            }).OrderByDescending(function (c) { return c.IsRepairing; });
            if (this.LastShipListJsonString != NJson.Stringify(TempEntityData)) {
                this.LastShipListJsonString = NJson.Stringify(TempEntityData);
                var $Temp = $(doT.template($Area.find("[data-tempid='shipListTemp']").html())(NJson.ObjListToArray(TempEntityData)));
                $Temp.find(".check-cell .md-check").click(function () {
                    var shipid = $(this).parents(".shiprow").eq(0).attr("data-id").ToNumber();
                    var ship = Player.GetShip(shipid);
                    var isSelected = $(this).is(":checked");
                    if (isSelected == true && AutoBath.RepairShips.Select(function (c) { return c.ShipID; }).Contains(shipid) == false) {
                        AutoBath.RepairShips.Add({ ShipID: shipid, IsRepairing: Player.IsRepairShip(ship), OrderIndex: 0 });
                    }
                    if (isSelected == false && AutoBath.RepairShips.Select(function (c) { return c.ShipID; }).Contains(shipid) == true) {
                        AutoBath.RepairShips.RemoveAll(function (c) { return c.ShipID == shipid; });
                    }
                });
                $Area.find(".shiplist").html("").append($Temp);
            }
        };
        Area_Bath.prototype.BeforeOpen = function () { return true; };
        ;
        Area_Bath.prototype.OnOpen = function () {
            this.InitUpdateTimer();
        };
        ;
        Area_Bath.prototype.OnOpened = function () { };
        ;
        Area_Bath.prototype.BeforeClose = function () { return true; };
        ;
        Area_Bath.prototype.OnClosed = function () {
            this.UpdateTimer.Dispose();
        };
        ;
        return Area_Bath;
    }());
    var CampaignNode = (function () {
        function CampaignNode() {
            this.ID = 101;
            this.Name = "";
            this.ShipTypeLimit = new List();
        }
        return CampaignNode;
    }());
    var Area_ZhanYi = (function () {
        function Area_ZhanYi() {
            this.Name = "Area_ZhanYi";
            this.$Area = $("#PartialAreas .areaPanel_zhanyi");
            this.IsCurrentPage = false;
            this.UpdateTimer = null;
            this.Campaigns = List.From([
                { ID: 101, Name: "驱逐 - 简单", ShipTypeLimit: List.From(["", "", "", "", "", ""]) },
                { ID: 102, Name: "驱逐 - 困难", ShipTypeLimit: List.From(["12", "12", "12", "12", "12", "12"]) },
                { ID: 201, Name: "巡洋 - 简单", ShipTypeLimit: List.From(["", "", "", "", "", ""]) },
                { ID: 202, Name: "巡洋 - 困难", ShipTypeLimit: List.From(["4", "7", "7", "10", "10", "12"]) },
                { ID: 301, Name: "战列 - 简单", ShipTypeLimit: List.From(["", "", "", "", "", ""]) },
                { ID: 302, Name: "战列 - 困难", ShipTypeLimit: List.From(["6", "4", "7", "7", "12", "12"]) },
                { ID: 401, Name: "航母 - 简单", ShipTypeLimit: List.From(["", "", "", "", "", ""]) },
                { ID: 402, Name: "航母 - 困难", ShipTypeLimit: List.From(["1", "1", "12", "12", "12", "12"]) },
                { ID: 501, Name: "潜艇 - 简单", ShipTypeLimit: List.From(["", "", "", "", "", ""]) },
                { ID: 502, Name: "潜艇 - 困难", ShipTypeLimit: List.From(["14", "14", "14"]) },
            ]);
            this.CurrentFight_CampaignID = 101;
            this.CurrentFight_ShipIds = new List();
            this.LastShipListJsonString = "";
            this.LastResourceJsonString = "";
        }
        Area_ZhanYi.prototype.OnLoad = function () {
            var _This = this;
            var $Area = _This.$Area;
            $Area.find("#ZhanYiSelecter").change(function () {
                var campaignID = $Area.find("#ZhanYiSelecter").val();
                Net.Campaign.GetFleet(campaignID).then(function (netResult) {
                    _This.CurrentFight_CampaignID = campaignID;
                    _This.CurrentFight_ShipIds = netResult.campaignlevelfleet;
                    _This.UpdateFleetShips();
                });
            });
            $Area.find("[data-action='DoFight']").click(function () {
                var $Action = $Area.find("[data-action='DoFight']");
                if ($Action.hasClass("disabled"))
                    return;
                if (MissionWorker.State != DBEnum.WorkState.Ready) {
                    MessageBox.Show("请先停止任务");
                    return;
                }
                if (YanXiWorker.State != DBEnum.WorkState.Ready) {
                    MessageBox.Show("请先停止演习");
                    return;
                }
                if (ZhanYiWorker.State != DBEnum.WorkState.Ready) {
                    MessageBox.Show("请先停止战役");
                    return;
                }
                if (_This.CurrentFight_ShipIds.Where(function (c) { return c != 0 && Player.IsBusyShip(Player.GetShip(c)); }).Count() > 0) {
                    MessageBox.Show("部分船不能出征");
                    return;
                }
                var lastShipIndex = _This.CurrentFight_ShipIds.IndexOf(_This.CurrentFight_ShipIds.Where(function (c) { return c > 0; }).LastOrDefault());
                for (var i = 0; i < lastShipIndex; i++) {
                    if (_This.CurrentFight_ShipIds[i] == 0) {
                        MessageBox.Show("舰船位置错误");
                        return;
                    }
                }
                Dailog.CreatDialog({
                    Title: "打战役", FormNodes: List.From([{
                            Name: "Formation",
                            Type: Dailog.FormNodeType.select,
                            Text: "阵型",
                            Data: List.From([{ "Name": "单纵阵", "Value": "1" }, { "Name": "复纵阵", "Value": "2" }, { "Name": "轮行阵", "Value": "3" }, { "Name": "梯形阵", "Value": "4" }, { "Name": "单横阵", "Value": "5" }]),
                            Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                        }, {
                            Name: "FightNight",
                            Type: Dailog.FormNodeType.select,
                            Text: "夜战",
                            Data: List.From([{ "Name": "不夜战", "Value": "0" }, { "Name": "夜战", "Value": "1" }]),
                            Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                        }, {
                            Name: "RepairLevel",
                            Type: Dailog.FormNodeType.select,
                            Text: "修理",
                            Data: List.From([{ "Name": "修大中破", "Value": "2" }, { "Name": "只修大破", "Value": "1" }, { "Name": "不修理", "Value": "0" }]),
                            Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                        }, {
                            Name: "FightCount",
                            Type: Dailog.FormNodeType.text,
                            Text: "执行次数",
                            Value: Player.CampaignInfo.passinfo.remainnum.toString(),
                            Placeholder: "今日剩余 " + Player.CampaignInfo.passinfo.remainnum + " 次",
                            Validates: List.From([{ Key: "required", Value: true, Message: "请输入战役次数" }, { Key: "range", Value: [1, Player.CampaignInfo.passinfo.remainnum], Message: "战役次数不足" }])
                        }, {
                            Name: "WorkSL",
                            Type: Dailog.FormNodeType.select,
                            Text: "SL练技能",
                            Data: List.From([{ "Name": "否", "Value": "0" }, { "Name": "是", "Value": "1" }]),
                            Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                        }, {
                            Name: "StopOnLevel",
                            Type: Dailog.FormNodeType.select,
                            Text: "有技能升级到N级时停止",
                            Data: List.From([{ "Name": "升级到 3 级停止", "Value": "3" }, { "Name": "升级到 2 级停止", "Value": "1" }, { "Name": "升级到 1 级停止", "Value": "1" }, { "Name": "不使用此功能", "Value": "0" }]),
                            Validates: List.From([])
                        }]), OnBuild: function ($modal) {
                        var Habit_ZhanYi_Formation = Config.PlayerConfig.PlayerHabit.ZhanYi_Formation;
                        var Habit_ZhanYi_FightNight = Config.PlayerConfig.PlayerHabit.ZhanYi_FightNight;
                        var Habit_ZhanYi_RepairLevel = Config.PlayerConfig.PlayerHabit.ZhanYi_RepairLevel;
                        $modal.find("[name='Formation']").val((Habit_ZhanYi_Formation >= 1 && Habit_ZhanYi_Formation <= 5) ? Habit_ZhanYi_Formation.toString() : "2");
                        $modal.find("[name='FightNight']").val((Habit_ZhanYi_FightNight >= 0 && Habit_ZhanYi_FightNight <= 1) ? Habit_ZhanYi_FightNight.toString() : "1");
                        $modal.find("[name='RepairLevel']").val((Habit_ZhanYi_RepairLevel >= 0 && Habit_ZhanYi_RepairLevel <= 3) ? Habit_ZhanYi_RepairLevel.toString() : "2");
                        $modal.find("[name='StopOnLevel']").parents(".form-group").hide();
                        $modal.find("[name='WorkSL']").change(function () {
                            if ($modal.find("[name='WorkSL']").val() == 1) {
                                $modal.find("[name='FightCount']").parents(".form-group").hide();
                                $modal.find("[name='StopOnLevel']").parents(".form-group").show();
                            }
                            else {
                                $modal.find("[name='FightCount']").parents(".form-group").show();
                                $modal.find("[name='StopOnLevel']").parents(".form-group").hide();
                            }
                        });
                    }, OnSubmit: function (fromJsonObj, $modal) {
                        $modal.find("[data-check=save]").attr("disabled", "disabled");
                        $modal.find("[data-dismiss=modal]").triggerHandler("click");
                        var WorkSL = fromJsonObj.WorkSL == "1" ? true : false;
                        var FightCount = fromJsonObj.FightCount.ToNumber();
                        var Formation = fromJsonObj.Formation.ToNumber();
                        var FightNight = fromJsonObj.FightNight == "1" ? true : false;
                        var RepairLevel = fromJsonObj.RepairLevel.ToNumber();
                        var StopOnLevel = fromJsonObj.StopOnLevel.ToNumber();
                        if (WorkSL == true) {
                            if (_This.CurrentFight_ShipIds.Where(function (c) { return c != 0; }).Where(function (c) { return Player.Tactics.FirstOrDefault(function (d) { return d.status == 1 && d.boat_id == c; }) != null; }).Count() == 0) {
                                MessageBox.Show("没有一条船在学院中学习技能！");
                            }
                            else {
                                $Area.find("#ZhanYiSelecter").attr("disabled", "disabled");
                                $Area.find("[data-action='DoFight']").hide().addClass("disabled");
                                $Area.find("[data-action='CancelFight']").show().removeClass("disabled");
                                ZhanYiWorker.State = DBEnum.WorkState.Working;
                                _This.RunWork_SL(Formation, FightNight, RepairLevel, StopOnLevel);
                            }
                        }
                        else {
                            if (FightCount <= 0 || FightCount > Player.CampaignInfo.passinfo.remainnum) {
                                MessageBox.Show("输入次数有误");
                            }
                            $Area.find("#ZhanYiSelecter").attr("disabled", "disabled");
                            $Area.find("[data-action='DoFight']").hide();
                            $Area.find("[data-action='CancelFight']").show().removeClass("disabled");
                            ZhanYiWorker.State = DBEnum.WorkState.Working;
                            _This.RunWork(FightCount, Formation, FightNight, RepairLevel);
                        }
                    }
                });
            });
            $Area.find("[data-action='CancelFight']").click(function () {
                var $Action = $Area.find("[data-action='CancelFight']");
                if ($Action.hasClass("disabled"))
                    return;
                if (ZhanYiWorker.State == DBEnum.WorkState.Working) {
                    _This.WorkEnd();
                }
            });
            this.CurrentFight_CampaignID = (this.Campaigns.Select(function (c) { return c.ID; }).IndexOf(Config.PlayerConfig.PlayerHabit.ZhanYi_CampaignID) >= 0 ? Config.PlayerConfig.PlayerHabit.ZhanYi_CampaignID : this.CurrentFight_CampaignID);
            ZhanYiWorker.RunZhanYi = function (campaignID, FightCount, Formation, FightNight, RepairLevel) {
                _This.CurrentFight_CampaignID = campaignID;
                return _This.RunWork(FightCount, Formation, FightNight, RepairLevel);
            };
        };
        ;
        Area_ZhanYi.prototype.InitUpdateTimer = function () {
            var _this = this;
            this.UpdateTimer = new Timer();
            this.UpdateTimer.Interval = 1000;
            this.UpdateTimer.Elapsed = function () {
                _this.UpdateTimer.Stop();
                try {
                    _this.UpdateView();
                }
                catch (ex) {
                    console.log(ex);
                }
                finally {
                    _this.UpdateTimer.Start();
                }
            };
            this.UpdateView();
            this.UpdateTimer.Start();
        };
        Area_ZhanYi.prototype.UpdateView = function () {
            if (this.IsCurrentPage) {
                this.UpdateFleetShips();
                this.CheckUpdateResource();
            }
        };
        Area_ZhanYi.prototype.ChangeShip = function (index, shipid) {
            var _This = this;
            var $Area = _This.$Area;
            if (ZhanYiWorker.State != DBEnum.WorkState.Ready) {
                MessageBox.Show("请先取消战役");
                return;
            }
            if (MissionWorker.State != DBEnum.WorkState.Ready) {
                MessageBox.Show("请先停止任务");
                return;
            }
            if (YanXiWorker.State != DBEnum.WorkState.Ready) {
                MessageBox.Show("请先停止演习");
                return;
            }
            if (Player.GetFleetShips().Where(function (c) { return Player.IsZhuShouShip(c); }).Count() > 0) {
                return MessageBox.Show("驻守中不能更改");
            }
            var campaign = _This.Campaigns.FirstOrDefault(function (c) { return c.ID == _This.CurrentFight_CampaignID; });
            var limitType = campaign.ShipTypeLimit[index] == "" ? 0 : campaign.ShipTypeLimit[index].ToNumber();
            ModalShower.SlideShipPickerQuick(function (c) { return !(Player.IsBusyShip(c) == true || c.id == shipid || (limitType != 0 && limitType != Player.GetShipType(c))); }, function (ships, isRange) {
                return true;
            }, function (ships, isRange) {
                return __awaiter(this, void 0, void 0, function () {
                    var changeResult;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, Net.Campaign.ChangeFleet(_This.CurrentFight_CampaignID, ships[0], index)];
                            case 1:
                                changeResult = _a.sent();
                                if (changeResult.ErrorCode != 0) {
                                    MessageBox.Show(changeResult.ErrorMessage);
                                }
                                else {
                                    _This.CurrentFight_ShipIds = changeResult.campaignlevelfleet;
                                    _This.UpdateFleetShips();
                                }
                                return [2];
                        }
                    });
                });
            }, null, 1, 1);
        };
        Area_ZhanYi.prototype.UpdateFleetShips = function () {
            var _This = this;
            var $Area = _This.$Area;
            var CompareEntityData = _This.CurrentFight_ShipIds.Select(function (c) { return Player.GetShip(c); }).Select(function (ship, index) {
                var iniShip = Player.GetIniShip(ship);
                if (ship == null) {
                    return {
                        ID: 0,
                        Level: 0,
                        State: "",
                        HPNow: 0,
                        OilNow: 0,
                        AmmoNow: 0,
                        FeiJiNow: 0,
                        DaoDanNow: 0,
                        Equipment: new List()
                    };
                }
                else {
                    return {
                        ID: ship.id,
                        Level: ship.level,
                        State: Player.GetShipStateContext(ship),
                        HPNow: ship.battleprops.hp,
                        OilNow: ship.battleprops.oil,
                        AmmoNow: ship.battleprops.ammo,
                        FeiJiNow: ship.capacityslot.Select(function (c, i) { return ship.capacityslotexist[i] == 1 ? c : 0; }).Sum(function (c) { return c; }),
                        DaoDanNow: ship.missileslot.Select(function (c, i) { return ship.missileslotexist[i] == 1 ? c : 0; }).Sum(function (c) { return c; }),
                        Equipment: ship.equipmentarr
                    };
                }
            });
            if (this.LastShipListJsonString != NJson.Stringify(CompareEntityData)) {
                this.LastShipListJsonString = NJson.Stringify(CompareEntityData);
                var TempEntityData = _This.CurrentFight_ShipIds.Select(function (c) { return Player.GetShip(c); }).Select(function (ship, index) {
                    if (ship == null) {
                        return {
                            FleetIndex: index,
                            ID: 0,
                            Name: "",
                            Level: 0,
                            Type: "",
                            TypeImg: "",
                            CID: 0,
                            State: "",
                            Married: 0,
                            Remould: false,
                            HPNow: 0,
                            HPMax: 0,
                            HPPercent: 0,
                            OilNow: 0,
                            OilMax: 0,
                            OilPercent: 0,
                            AmmoNow: 0,
                            AmmoMax: 0,
                            AmmoPercent: 0,
                            FeiJiNow: 0,
                            FeiJiMax: 0,
                            DaoDanNow: 0,
                            DaoDanMax: 0,
                            Star: iniShip == null ? 0 : iniShip.Star,
                            ShipImg: "",
                            ShipBackImg: "",
                            Equipment: List.From([0]).Select(function (c) {
                                var eq = Player.GetIniEquipment(c);
                                return eq == null ? { CID: 0, Title: "", EquipImg: "", EquipBackImg: "" } : { CID: eq.CID, Title: eq.Title, EquipImg: ModalShower.GetEquipPic(eq), EquipBackImg: ModalShower.GetEquipBackPic(eq) };
                            }),
                        };
                    }
                    else {
                        var iniShip = Player.GetIniShip(ship);
                        return {
                            FleetIndex: index,
                            ID: ship.id,
                            Name: iniShip == null ? "未知" : iniShip.Name,
                            Level: ship.level,
                            Type: iniShip == null ? "未知" : DBEnum.ENUM_ShipType[iniShip.Type],
                            TypeImg: ModalShower.GetTypePic(iniShip),
                            CID: ship.shipcid,
                            State: Player.GetShipStateContext(ship),
                            Married: ship.married,
                            Remould: (iniShip == null ? "未知" : iniShip.Name).indexOf("改") > 0,
                            HPNow: ship.battleprops.hp,
                            HPMax: ship.battlepropsmax.hp,
                            HPPercent: Math.floor(ship.battleprops.hp * 100 / ship.battlepropsmax.hp),
                            OilNow: ship.battleprops.oil,
                            OilMax: ship.battlepropsmax.oil,
                            OilPercent: Math.round(ship.battleprops.oil * 10 / ship.battlepropsmax.oil) * 10,
                            AmmoNow: ship.battleprops.ammo,
                            AmmoMax: ship.battlepropsmax.ammo,
                            AmmoPercent: Math.round(ship.battleprops.ammo * 10 / ship.battlepropsmax.ammo) * 10,
                            FeiJiNow: ship.capacityslot.Select(function (c, i) { return ship.capacityslotexist[i] == 1 ? c : 0; }).Sum(function (c) { return c; }),
                            FeiJiMax: ship.capacityslotmax.Select(function (c, i) { return ship.capacityslotexist[i] == 1 ? c : 0; }).Sum(function (c) { return c; }),
                            DaoDanNow: ship.missileslot.Select(function (c, i) { return ship.missileslotexist[i] == 1 ? c : 0; }).Sum(function (c) { return c; }),
                            DaoDanMax: ship.missileslotmax.Select(function (c, i) { return ship.missileslotexist[i] == 1 ? c : 0; }).Sum(function (c) { return c; }),
                            Star: iniShip == null ? 0 : iniShip.Star,
                            ShipImg: ModalShower.GetShipPic(iniShip, ship.skin_cid),
                            ShipBackImg: ModalShower.GetShipBackPic(iniShip),
                            Equipment: ship.equipmentarr.Select(function (c) {
                                var eq = Player.GetIniEquipment(c);
                                return eq == null ? { CID: 0, Title: "", EquipImg: "", EquipBackImg: "" } : { CID: eq.CID, Title: eq.Title, EquipImg: ModalShower.GetEquipPic(eq), EquipBackImg: ModalShower.GetEquipBackPic(eq) };
                            }),
                        };
                    }
                });
                TempEntityData.ForEach(function (eData, eindex) {
                    var $oldCell = $Area.find(".currentFleet .fleetships .shipcell").eq(eindex);
                    if ($oldCell && $oldCell.length > 0 && $oldCell.attr("data-id") == eData.ID.toString()) {
                        if ($oldCell.find(".status").html() != eData.State) {
                            $oldCell.find(".status").html(eData.State);
                            eData.State == "" ? $oldCell.find(".status").addClass("hide") : $oldCell.find(".status").removeClass("hide");
                        }
                        if ($oldCell.find(".level").html() != ("Lv." + eData.Level)) {
                            $oldCell.find(".level").html("Lv." + eData.Level);
                        }
                        if ($oldCell.find(".feiji").html() != (eData.FeiJiNow + "/" + eData.FeiJiMax)) {
                            $oldCell.find(".feiji").html(eData.FeiJiNow + "/" + eData.FeiJiMax);
                            eData.FeiJiMax > 0 ? $oldCell.find(".feiji").removeClass("hide") : $oldCell.find(".status").addClass("hide");
                        }
                        if ($oldCell.find(".daodan").html() != (eData.DaoDanNow + "/" + eData.DaoDanMax)) {
                            $oldCell.find(".daodan").html(eData.DaoDanNow + "/" + eData.DaoDanMax);
                            eData.DaoDanMax > 0 ? $oldCell.find(".daodan").removeClass("hide") : $oldCell.find(".status").addClass("hide");
                        }
                        if ($oldCell.find(".hp").attr("data-hp") != eData.HPPercent.toString()) {
                            $oldCell.find(".hp").attr("data-hp", eData.HPPercent.toString());
                            $oldCell.find(".hp .progress-bar").css("width", eData.HPPercent.toString() + "%");
                            $oldCell.find(".hp .progress-bar").css("background-color", (eData.HPPercent < 25 ? "#f63a0f" : (eData.HPPercent < 50 ? "#ffd132" : "#3be136")));
                        }
                        if ($oldCell.find("[data-vmodal=Oil]").html() != (eData.OilNow + "/" + eData.OilMax)) {
                            $oldCell.find("[data-vmodal=Oil]").html(eData.OilNow + "/" + eData.OilMax);
                            var cls = eData.OilPercent <= 20 ? "danger" : (eData.OilPercent <= 50 ? "warning" : "");
                            $oldCell.find(".resource.oil .grid").removeClass("warning").removeClass("danger");
                            if (cls != "") {
                                $oldCell.find(".resource.oil .grid").addClass(cls);
                            }
                            for (var i = 0; i < 10; i++) {
                                if ((eData.OilPercent - 10) >= (i * 10)) {
                                    $oldCell.find(".resource.oil .grid dd").eq(i).addClass("have");
                                }
                                else {
                                    $oldCell.find(".resource.oil .grid dd").eq(i).removeClass("have");
                                }
                            }
                        }
                        if ($oldCell.find("[data-vmodal=Ammo]").html() != (eData.AmmoNow + "/" + eData.AmmoMax)) {
                            $oldCell.find("[data-vmodal=Ammo]").html(eData.AmmoNow + "/" + eData.AmmoMax);
                            var cls = eData.AmmoPercent <= 20 ? "danger" : (eData.AmmoPercent <= 50 ? "warning" : "");
                            $oldCell.find(".resource.ammo .grid").removeClass("warning").removeClass("danger");
                            if (cls != "") {
                                $oldCell.find(".resource.ammo .grid").addClass(cls);
                            }
                            for (var i = 0; i < 10; i++) {
                                if ((eData.AmmoPercent - 10) >= (i * 10)) {
                                    $oldCell.find(".resource.ammo .grid dd").eq(i).addClass("have");
                                }
                                else {
                                    $oldCell.find(".resource.ammo .grid dd").eq(i).removeClass("have");
                                }
                            }
                            ;
                        }
                        eData.Equipment.ForEach(function (neweq, eqindex) {
                            var $eqCell = $oldCell.find(".equipments dd").eq(eqindex);
                            if ($eqCell && $eqCell.attr("data-cid") != neweq.CID.toString()) {
                                $eqCell.attr("data-cid", neweq.CID.toString());
                                if (neweq.CID == 0) {
                                    $eqCell.removeClass("equipcell").addClass("null").html("<i class=\"fa fa-plus\"></i>");
                                    $eqCell.css("background", "none");
                                }
                                else {
                                    $eqCell.removeClass("null").addClass("equipcell").html("<img src=\"" + neweq.EquipImg + "\" />");
                                    $eqCell.css("background", "url(" + neweq.EquipBackImg + ")").css("background-size", "100% 100%");
                                }
                            }
                        });
                    }
                    else {
                        var $fleetshipliststmpl = $(doT.template(_This.$Area.find("[data-tampname=fleetshipliststmpl]").html())(NJson.ObjListToArray(NJson.DeepCopy([eData]))));
                        $fleetshipliststmpl.find("[data-bimg]").each(function (i, dom) {
                            var $bdimg = $(dom);
                            var bimg = $bdimg.attr("data-bimg");
                            if (bimg) {
                                var imgPath = bimg.indexOf("http") >= 0 ? bimg : (api.wgtRootDir.replace("file:", "contents:") + bimg.substring(2, bimg.length));
                                $bdimg.css("background", "url(" + imgPath + ")").css("background-size", "100% 100%");
                            }
                        });
                        if ($Area.find(".currentFleet .fleetships .shipcell").length > eindex) {
                            $Area.find(".currentFleet .fleetships .shipcell").eq(eindex).after($fleetshipliststmpl).remove();
                        }
                        else {
                            $Area.find(".currentFleet .fleetships").append($fleetshipliststmpl);
                        }
                        $fleetshipliststmpl.find(".bd").click(function () {
                            var index = $(this).parents(".shipcell").attr("data-index").ToNumber();
                            var shipid = $(this).parents(".shipcell").attr("data-id").ToNumber();
                            _This.ChangeShip(index, shipid);
                        });
                        $fleetshipliststmpl.children(".name,.hp,.resource").click(function () {
                            var shipid = $(this).parents(".shipcell").attr("data-id").ToNumber();
                            ModalShower.ShowShipDetail(shipid);
                        });
                        $fleetshipliststmpl.find(".actions .remove").click(function () {
                            return __awaiter(this, void 0, void 0, function () {
                                var index, shipid, changeResult;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (ZhanYiWorker.State != DBEnum.WorkState.Ready) {
                                                MessageBox.Show("请先取消战役");
                                                return [2];
                                            }
                                            if (MissionWorker.State != DBEnum.WorkState.Ready) {
                                                MessageBox.Show("请先停止任务");
                                                return [2];
                                            }
                                            if (YanXiWorker.State != DBEnum.WorkState.Ready) {
                                                MessageBox.Show("请先停止演习");
                                                return [2];
                                            }
                                            index = $(this).parents(".shipcell").attr("data-index").ToNumber();
                                            shipid = $(this).parents(".shipcell").attr("data-id").ToNumber();
                                            if (Player.IsZhuShouShip(Player.GetShip(shipid))) {
                                                return [2, MessageBox.Show("驻守中不能更改")];
                                            }
                                            return [4, Net.Campaign.RemoveBoat(_This.CurrentFight_CampaignID, index)];
                                        case 1:
                                            changeResult = _a.sent();
                                            if (changeResult.ErrorCode != 0) {
                                                MessageBox.Show(changeResult.ErrorMessage);
                                            }
                                            else {
                                                _This.CurrentFight_ShipIds = changeResult.campaignlevelfleet;
                                                _This.UpdateFleetShips();
                                            }
                                            return [2];
                                    }
                                });
                            });
                        });
                        $fleetshipliststmpl.find(".equipments dd").click(function () {
                            if (ZhanYiWorker.State != DBEnum.WorkState.Ready) {
                                MessageBox.Show("请先取消战役");
                                return;
                            }
                            if (MissionWorker.State != DBEnum.WorkState.Ready) {
                                MessageBox.Show("请先停止任务");
                                return;
                            }
                            if (YanXiWorker.State != DBEnum.WorkState.Ready) {
                                MessageBox.Show("请先停止演习");
                                return;
                            }
                            var $eqCell = $(this);
                            var ShipID = $(this).parents(".shipcell").eq(0).attr("data-id").ToNumber();
                            if (Player.IsZhuShouShip(Player.GetShip(ShipID))) {
                                return MessageBox.Show("驻守中不能更改");
                            }
                            var EqIndex = $(this).attr("data-index").ToNumber();
                            var OldEqCID = $(this).attr("data-cid").ToNumber();
                            var ship = Player.GetShip(ShipID);
                            if (Player.IsYuanZhangShip(ship) || Player.IsMissionShip(ship) || Player.IsZhuShouShip(ship)) {
                                MessageBox.Show("该舰船当前不能更改装备");
                                return;
                            }
                            var withOutEquipmentIds = Player.EquipmentVO.Where(function (c) {
                                if (c.num <= 0)
                                    return true;
                                if (c.equipmentcid == OldEqCID)
                                    return true;
                                var ini = Player.GetIniEquipment(c.equipmentcid);
                                if (ini == null)
                                    return true;
                                if (ini.ShipCID.Count() > 0 && !ini.ShipCID.Contains(ship.shipcid.toString()))
                                    return true;
                                return !ini.ShipType.Contains(Player.GetShipType(ship));
                            }).Select(function (c) { return c.equipmentcid; });
                            ModalShower.SlideEquipPicker(Player.EquipmentVO.Where(function (c) { return !(withOutEquipmentIds.Contains(c.equipmentcid)); }), function (equipcid) {
                                return __awaiter(this, void 0, void 0, function () {
                                    var changeResult, _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                if (!(equipcid == 0)) return [3, 2];
                                                return [4, Net.Conditioning.RemoveEquipment(ship.id, EqIndex)];
                                            case 1:
                                                _a = _b.sent();
                                                return [3, 4];
                                            case 2: return [4, Net.Conditioning.ChangeEquipment(ship.id, equipcid, EqIndex)];
                                            case 3:
                                                _a = _b.sent();
                                                _b.label = 4;
                                            case 4:
                                                changeResult = _a;
                                                if (changeResult.ErrorCode != 0) {
                                                    MessageBox.Show(changeResult.ErrorMessage);
                                                }
                                                else {
                                                    _This.UpdateFleetShips();
                                                }
                                                return [2];
                                        }
                                    });
                                });
                            }, OldEqCID != 0);
                        });
                        $fleetshipliststmpl.find(".picker").click(function () {
                            var index = $(this).parents(".shipcell").attr("data-index").ToNumber();
                            var shipid = $(this).parents(".shipcell").attr("data-id").ToNumber();
                            _This.ChangeShip(index, shipid);
                        });
                    }
                });
            }
        };
        Area_ZhanYi.prototype.CheckUpdateResource = function () {
            var _This = this;
            var TempEntityData = Player.PackageVo.Where(function (c) { return [10141, 10241, 10341, 10441, 10541].indexOf(c.itemcid) >= 0; }).Select(function (c) {
                var result = {
                    ItemCID: c.itemcid,
                    Num: c.num
                };
                return result;
            });
            if (this.LastResourceJsonString != NJson.Stringify(TempEntityData)) {
                this.LastResourceJsonString = NJson.Stringify(TempEntityData);
                TempEntityData.ForEach(function (c) {
                    _This.$Area.find("[data-resourecid='" + c.ItemCID + "']").html(c.Num.toString());
                });
            }
        };
        Area_ZhanYi.prototype.PrintLog = function (msg) {
            if (this.$Area.find(".messageBox p").length > 500) {
                this.$Area.find(".messageBox p").last().remove();
            }
            this.$Area.find(".messageBox").prepend("<p>" + DateTime.ParseTime(NetDate.GetTimeSpan()).ToString("HH:mm:ss") + " " + msg + "</p>");
        };
        Area_ZhanYi.prototype.RunWork = function (FightCount, Formation, FightNight, RepairLevel) {
            return __awaiter(this, void 0, void 0, function () {
                var _This, workIndex, teamShips, suplayResut, iniCampaign, getFleet, spyResult, challengeResult, getWarResult, resultlevel, resultText, ex_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _This = this;
                            console.log(_This.CurrentFight_CampaignID);
                            if (_This.$Area.find("#ZhanYiSelecter").val() != _This.CurrentFight_CampaignID) {
                                _This.$Area.find("#ZhanYiSelecter").val(_This.CurrentFight_CampaignID).triggerHandler("change");
                            }
                            ZhanYiWorker.State = DBEnum.WorkState.Working;
                            _This.$Area.find("#ZhanYiSelecter").attr("disabled", "disabled");
                            _This.$Area.find("[data-action='DoFight']").hide();
                            _This.$Area.find("[data-action='CancelFight']").show().removeClass("disabled");
                            ZhanYiWorker.ThreadSemaphore = 1;
                            _This.PrintLog("准备执行战役." + _This.Campaigns.FirstOrDefault(function (c) { return c.ID == _This.CurrentFight_CampaignID; }).Name);
                            _This.PrintLog("\u5171\u6267\u884C" + FightCount + "\u6B21.");
                            Config.PlayerConfig.PlayerHabit.ZhanYi_CampaignID = _This.CurrentFight_CampaignID;
                            Config.PlayerConfig.PlayerHabit.ZhanYi_FightNight = FightNight ? 1 : 0;
                            Config.PlayerConfig.PlayerHabit.ZhanYi_RepairLevel = RepairLevel;
                            Config.PlayerConfig.PlayerHabit.ZhanYi_Formation = Formation;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 17, 18, 22]);
                            return [4, Net.NetComm.DealyRandom(1500)];
                        case 2:
                            _a.sent();
                            workIndex = 1;
                            _a.label = 3;
                        case 3:
                            if (!(workIndex <= FightCount)) return [3, 16];
                            _This.PrintLog("\u6267\u884C\u7B2C" + workIndex + "\u6B21\u6218\u5F79.");
                            return [4, _This.CheckShipsRepair(Player.UserShipVo.Where(function (c) { return _This.CurrentFight_ShipIds.Contains(c.id); }), RepairLevel)];
                        case 4:
                            _a.sent();
                            if (Player.UserShipVo.Where(function (c) { return _This.CurrentFight_ShipIds.Contains(c.id); }).Where(function (c) { return (c.battlepropsmax.hp * 1 / c.battleprops.hp) > 4; }).Count() > 0) {
                                _This.PrintLog("大破无法出击");
                                _This.WorkEnd();
                                return [2];
                            }
                            teamShips = Player.UserShipVo.Where(function (c) { return _This.CurrentFight_ShipIds.Contains(c.id); });
                            if (!(teamShips.Where(function (c) { return c.battleprops.oil < c.battlepropsmax.oil || c.battleprops.ammo < c.battlepropsmax.ammo || c.battleprops.aluminium < c.battlepropsmax.aluminium; }).Count() > 0)) return [3, 8];
                            _This.PrintLog("补给");
                            return [4, Net.Conditioning.SupplyBoats(teamShips.Select(function (c) { return c.id; }), "0")];
                        case 5:
                            suplayResut = _a.sent();
                            if (!(suplayResut.ErrorCode != 0)) return [3, 8];
                            _This.PrintLog(suplayResut.ErrorMessage);
                            return [4, Sleep(5000)];
                        case 6:
                            _a.sent();
                            return [4, Net.Conditioning.SupplyBoats(teamShips.Select(function (c) { return c.id; }), "0")];
                        case 7:
                            suplayResut = _a.sent();
                            if (suplayResut.ErrorCode != 0) {
                                _This.PrintLog(suplayResut.ErrorMessage);
                                _This.WorkEnd();
                                return [2];
                            }
                            _a.label = 8;
                        case 8: return [4, Net.Campaign.Init()];
                        case 9:
                            iniCampaign = _a.sent();
                            if (iniCampaign.ErrorCode != 0) {
                                _This.PrintLog("获取战役信息失败");
                                _This.WorkEnd();
                                return [2];
                            }
                            return [4, Net.Campaign.GetFleet(_This.CurrentFight_CampaignID)];
                        case 10:
                            getFleet = _a.sent();
                            if (getFleet.ErrorCode != 0) {
                                _This.PrintLog(getFleet.ErrorMessage);
                                _This.WorkEnd();
                                return [2];
                            }
                            _This.PrintLog("索敌");
                            return [4, Net.Campaign.Spy(_This.CurrentFight_CampaignID)];
                        case 11:
                            spyResult = _a.sent();
                            if (spyResult.ErrorCode != 0) {
                                _This.PrintLog("索敌失败！");
                                _This.WorkEnd();
                                return [2];
                            }
                            _This.PrintLog("进入战斗...");
                            return [4, Net.Campaign.Challenge(_This.CurrentFight_CampaignID, Formation)];
                        case 12:
                            challengeResult = _a.sent();
                            if (challengeResult.ErrorCode != 0) {
                                _This.PrintLog(challengeResult.ErrorMessage);
                                _This.WorkEnd();
                                return [2];
                            }
                            return [4, Net.Campaign.GetWarResult(FightNight && challengeResult.warreport.candonightwar == 1)];
                        case 13:
                            getWarResult = _a.sent();
                            if (getWarResult.ErrorCode != 0) {
                                _This.PrintLog(getWarResult.ErrorMessage);
                                _This.WorkEnd();
                                return [2];
                            }
                            resultlevel = getWarResult.warresult.resultlevel;
                            resultText = (resultlevel == 0 ? "-" : (resultlevel == 1 ? "SS" : (resultlevel == 2 ? "S" : (resultlevel == 3 ? "A" : (resultlevel == 4 ? "B" : (resultlevel == 5 ? "C" : (resultlevel == 6 ? "D" : "未知")))))));
                            _This.PrintLog("战斗结束 " + resultText);
                            if (getWarResult.packagevo != null && getWarResult.packagevo.Count() > 0) {
                                _This.PrintLog("核心 +1");
                            }
                            return [4, Net.NetComm.DealyRandom(3000)];
                        case 14:
                            _a.sent();
                            _a.label = 15;
                        case 15:
                            workIndex++;
                            return [3, 3];
                        case 16: return [3, 22];
                        case 17:
                            ex_1 = _a.sent();
                            if (ex_1 == "WorkerAbort") {
                                _This.PrintLog("停止成功");
                            }
                            return [3, 22];
                        case 18:
                            MissionWorker.LastEndTimeSpan = NetDate.GetTimeSpan();
                            _This.$Area.find("#ZhanYiSelecter").attr("disabled", "disabled");
                            _This.$Area.find("[data-action='DoFight']").show();
                            _This.$Area.find("[data-action='CancelFight']").hide();
                            ZhanYiWorker.State = DBEnum.WorkState.Ready;
                            if (Player.CampaignInfo.passinfo.remainnum <= 0) {
                                _This.$Area.find("[data-action='DoFight']").addClass("disabled");
                            }
                            else {
                                _This.$Area.find("[data-action='DoFight']").removeClass("disabled");
                            }
                            _This.$Area.find("#ZhanYiSelecter").removeAttr("disabled");
                            return [4, Net.Conditioning.GameReset()];
                        case 19:
                            _a.sent();
                            _This.PrintLog("-----战役结束-----");
                            if (!(MainTimer.LostWork != null)) return [3, 21];
                            Logs.Print("计划任务 - 继续执行任务.");
                            if (MainTimer.LostWork.IsDoQueue == true) {
                                QueueWorker.State = DBEnum.WorkState.Working;
                            }
                            return [4, Sleep(1000)];
                        case 20:
                            _a.sent();
                            MissionWorker.Start({ MissionProgressNow: MainTimer.LostWork.MissionProgressNow, MissionProgressTotal: MainTimer.LostWork.MissionProgressTotal });
                            MainTimer.LostWork = null;
                            _a.label = 21;
                        case 21: return [7];
                        case 22: return [2];
                    }
                });
            });
        };
        Area_ZhanYi.prototype.RunWork_SL = function (Formation, FightNight, RepairLevel, StopOnLevel) {
            return __awaiter(this, void 0, void 0, function () {
                var _This, RealoadPrevTactics, PrevTactics, CheckTacticsLog, workIndex, teamShips, suplayResut, iniCampaign, getFleet, spyResult, challengeResult, ex_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _This = this;
                            ZhanYiWorker.ThreadSemaphore = 1;
                            _This.PrintLog("准备战役练技能.");
                            if (StopOnLevel > 0) {
                                _This.PrintLog("有舰船技能升级到 " + StopOnLevel + " 级时停止");
                            }
                            RealoadPrevTactics = function () {
                                var result = new List();
                                _This.CurrentFight_ShipIds.ForEach(function (shipid) {
                                    Player.Tactics.Where(function (t) { return shipid == t.boat_id; }).ForEach(function (c) {
                                        result.Add({ ShipID: shipid.toString().ToNumber(), TacticsID: c.tactics_id, TacticEXP: c.exp, TacticLevel: c.level, TacticName: Player.GetTacticName(c.tactics_id) });
                                    });
                                });
                                return result;
                            };
                            PrevTactics = RealoadPrevTactics();
                            CheckTacticsLog = function () {
                                var IsStop = false;
                                var newTactics = RealoadPrevTactics();
                                PrevTactics.ForEach(function (oldObj) {
                                    var newObj = newTactics.FirstOrDefault(function (c) { return c.ShipID == oldObj.ShipID && c.TacticsID == oldObj.TacticsID; });
                                    if (newObj != null && newObj.TacticLevel > oldObj.TacticLevel) {
                                        if (StopOnLevel > 0 && newObj.TacticLevel >= StopOnLevel) {
                                            IsStop = true;
                                        }
                                        _This.PrintLog(Player.GetShipName(Player.GetShip(oldObj.ShipID)) + " \u7684 " + Player.GetTacticName(oldObj.TacticsID) + " LvUp." + newObj.TacticLevel);
                                    }
                                    else if (newObj != null && newObj.TacticEXP > oldObj.TacticEXP) {
                                        _This.PrintLog(Player.GetShipName(Player.GetShip(oldObj.ShipID)) + " \u7684 " + Player.GetTacticName(oldObj.TacticsID) + " ExpUP." + newObj.TacticEXP);
                                    }
                                });
                                PrevTactics = newTactics;
                                return IsStop;
                            };
                            workIndex = 1;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 23, 24, 26]);
                            return [4, Net.NetComm.DealyRandom(1500)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            _This.PrintLog("\u6267\u884C\u7B2C" + workIndex++ + "\u6B21.");
                            return [4, Common.CheckYuanZheng()];
                        case 4:
                            _a.sent();
                            return [4, MainTimer.CheckRepairDock()];
                        case 5:
                            _a.sent();
                            return [4, AutoBath.CheckAutoInDock()];
                        case 6:
                            _a.sent();
                            return [4, Net.NetComm.DealyRandom(2000)];
                        case 7:
                            _a.sent();
                            return [4, _This.CheckShipsRepair(Player.UserShipVo.Where(function (c) { return _This.CurrentFight_ShipIds.Contains(c.id); }), RepairLevel)];
                        case 8:
                            _a.sent();
                            if (Player.UserShipVo.Where(function (c) { return _This.CurrentFight_ShipIds.Contains(c.id); }).Where(function (c) { return (c.battlepropsmax.hp * 1 / c.battleprops.hp) > 4; }).Count() > 0) {
                                _This.PrintLog("大破无法出击");
                                _This.WorkEnd();
                                return [2];
                            }
                            if (CheckTacticsLog() == true) {
                                _This.WorkEnd();
                                return [2];
                            }
                            teamShips = Player.UserShipVo.Where(function (c) { return _This.CurrentFight_ShipIds.Contains(c.id); });
                            if (!(teamShips.Where(function (c) { return c.battleprops.oil < c.battlepropsmax.oil || c.battleprops.ammo < c.battlepropsmax.ammo || c.battleprops.aluminium < c.battlepropsmax.aluminium; }).Count() > 0)) return [3, 12];
                            _This.PrintLog("补给");
                            return [4, Net.Conditioning.SupplyBoats(teamShips.Select(function (c) { return c.id; }), "0")];
                        case 9:
                            suplayResut = _a.sent();
                            if (!(suplayResut.ErrorCode != 0)) return [3, 12];
                            _This.PrintLog(suplayResut.ErrorMessage);
                            return [4, Sleep(5000)];
                        case 10:
                            _a.sent();
                            return [4, Net.Conditioning.SupplyBoats(teamShips.Select(function (c) { return c.id; }), "0")];
                        case 11:
                            suplayResut = _a.sent();
                            if (suplayResut.ErrorCode != 0) {
                                _This.PrintLog(suplayResut.ErrorMessage);
                                _This.WorkEnd();
                                return [2];
                            }
                            _a.label = 12;
                        case 12:
                            if (CheckTacticsLog() == true) {
                                _This.WorkEnd();
                                return [2];
                            }
                            return [4, Net.Campaign.Init()];
                        case 13:
                            iniCampaign = _a.sent();
                            if (iniCampaign.ErrorCode != 0) {
                                _This.PrintLog("获取战役信息失败");
                                _This.WorkEnd();
                                return [2];
                            }
                            return [4, Net.Campaign.GetFleet(_This.CurrentFight_CampaignID)];
                        case 14:
                            getFleet = _a.sent();
                            if (getFleet.ErrorCode != 0) {
                                _This.PrintLog(getFleet.ErrorMessage);
                                _This.WorkEnd();
                                return [2];
                            }
                            _This.PrintLog("索敌");
                            return [4, Net.Campaign.Spy(_This.CurrentFight_CampaignID)];
                        case 15:
                            spyResult = _a.sent();
                            if (spyResult.ErrorCode != 0) {
                                _This.PrintLog("索敌失败！");
                                _This.WorkEnd();
                                return [2];
                            }
                            return [4, Net.NetComm.DealyRandom(1000)];
                        case 16:
                            _a.sent();
                            _This.PrintLog("进入战斗...");
                            return [4, Net.Campaign.Challenge(_This.CurrentFight_CampaignID, _This.CurrentFight_ShipIds.Count() <= 3 ? 1 : Formation)];
                        case 17:
                            challengeResult = _a.sent();
                            if (challengeResult.ErrorCode != 0) {
                                _This.PrintLog(challengeResult.ErrorMessage);
                                _This.WorkEnd();
                                return [2];
                            }
                            return [4, Net.NetComm.DealyRandom(3000)];
                        case 18:
                            _a.sent();
                            _This.PrintLog("SL...");
                            return [4, Net.Login.InitUserInfo()];
                        case 19:
                            _a.sent();
                            return [4, Net.NetComm.DealyRandom(3000)];
                        case 20:
                            _a.sent();
                            _a.label = 21;
                        case 21:
                            if (true) return [3, 3];
                            _a.label = 22;
                        case 22: return [3, 26];
                        case 23:
                            ex_2 = _a.sent();
                            if (ex_2 == "WorkerAbort") {
                                _This.PrintLog("停止成功");
                            }
                            return [3, 26];
                        case 24:
                            MissionWorker.LastEndTimeSpan = NetDate.GetTimeSpan();
                            _This.$Area.find("#ZhanYiSelecter").attr("disabled", "disabled");
                            _This.$Area.find("[data-action='DoFight']").show();
                            _This.$Area.find("[data-action='CancelFight']").hide();
                            ZhanYiWorker.State = DBEnum.WorkState.Ready;
                            if (Player.CampaignInfo.passinfo.remainnum <= 0) {
                                _This.$Area.find("[data-action='DoFight']").addClass("disabled");
                            }
                            else {
                                _This.$Area.find("[data-action='DoFight']").removeClass("disabled");
                            }
                            _This.$Area.find("#ZhanYiSelecter").removeAttr("disabled");
                            return [4, Net.Conditioning.GameReset()];
                        case 25:
                            _a.sent();
                            _This.PrintLog("-----战役结束-----");
                            return [7];
                        case 26: return [2];
                    }
                });
            });
        };
        Area_ZhanYi.prototype.WorkEnd = function () {
            this.PrintLog("正在停止任务...");
            this.$Area.find("[data-action='CancelFight']").addClass("disabled");
            ;
            ZhanYiWorker.ThreadSemaphore = 0;
        };
        Area_ZhanYi.prototype.CheckShipsRepair = function (ships, repairLevel) {
            return __awaiter(this, void 0, void 0, function () {
                var _This, damageShips, repairResult, damageShips, repairResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _This = this;
                            if (!(repairLevel > 0)) return [3, 6];
                            if (!(repairLevel == 1)) return [3, 3];
                            damageShips = ships.Where(function (c) { return (c.battlepropsmax.hp / c.battleprops.hp) > 4; });
                            if (!(damageShips.Count() > 0)) return [3, 3];
                            if (!(damageShips.Count() > Player.PackageVo.Where(function (c) { return c.itemcid == DBEnum.PackageType.快速修理; }).FirstOrNew()["num"])) return [3, 1];
                            _This.PrintLog("快修不足！");
                            return [2, false];
                        case 1:
                            _This.PrintLog("修理大破->" + damageShips.Select(function (c) { return ships.IndexOf(c) + 1; }).JoinToString(",") + "号");
                            return [4, Net.Conditioning.QuickRepairShip(damageShips)];
                        case 2:
                            repairResult = _a.sent();
                            if (repairResult.ErrorCode != 0) {
                                _This.PrintLog("修理失败！");
                                return [2, false];
                            }
                            _a.label = 3;
                        case 3:
                            if (!(repairLevel == 2)) return [3, 6];
                            damageShips = ships.Where(function (c) { return (c.battlepropsmax.hp * 1 / c.battleprops.hp) > 2; });
                            if (!(damageShips.Count() > 0)) return [3, 6];
                            if (!(damageShips.Count() > Player.PackageVo.Where(function (c) { return c.itemcid == DBEnum.PackageType.快速修理; }).FirstOrNew()["num"])) return [3, 4];
                            _This.PrintLog("快修不足！");
                            return [2, false];
                        case 4:
                            _This.PrintLog("修理大中破->" + damageShips.Select(function (c) { return ships.IndexOf(c) + 1; }).JoinToString(",") + "号");
                            return [4, Net.Conditioning.QuickRepairShip(damageShips)];
                        case 5:
                            repairResult = _a.sent();
                            if (repairResult.ErrorCode != 0) {
                                _This.PrintLog("修理失败！");
                                return [2, false];
                            }
                            _a.label = 6;
                        case 6: return [2, true];
                    }
                });
            });
        };
        Area_ZhanYi.prototype.BeforeOpen = function () { return true; };
        ;
        Area_ZhanYi.prototype.OnOpen = function () {
            var _this = this;
            var _This = this;
            var $Area = _This.$Area;
            this.InitUpdateTimer();
            if (ZhanYiWorker.State == DBEnum.WorkState.Ready) {
                Net.Campaign.Init().then(function (initResult) {
                    if (initResult.ErrorCode != 0) {
                        MessageBox.Show(initResult.ErrorMessage);
                    }
                    else {
                        $Area.find("#ZhanYiSelecter").children().remove();
                        _This.Campaigns.ForEach(function (c) {
                            if (Player.CampaignInfo.cancampaignchallengelevel.Contains(c.ID)) {
                                $Area.find("#ZhanYiSelecter").append("<option value=\"" + c.ID + "\">" + c.Name + "</option>");
                            }
                        });
                        if (Player.CampaignInfo.passinfo.remainnum <= 0) {
                            $Area.find("[data-action='DoFight']").addClass("disabled");
                        }
                        else {
                            $Area.find("[data-action='DoFight']").removeClass("disabled");
                        }
                        $Area.find("#ZhanYiSelecter").val(_this.CurrentFight_CampaignID).triggerHandler("change");
                    }
                });
            }
        };
        ;
        Area_ZhanYi.prototype.OnOpened = function () { };
        ;
        Area_ZhanYi.prototype.BeforeClose = function () { return true; };
        ;
        Area_ZhanYi.prototype.OnClosed = function () {
            this.UpdateTimer.Dispose();
        };
        ;
        return Area_ZhanYi;
    }());
    var LearnTacticShip = (function () {
        function LearnTacticShip() {
            this.ShipID = 0;
            this.TacticsID = 0;
            this.TacticName = "";
            this.TacticEXP = 0;
            this.TacticLevel = 0;
        }
        return LearnTacticShip;
    }());
    var OppUser = (function () {
        function OppUser() {
            this.FleetName = "";
            this.UserName = "";
            this.Level = 0;
            this.UID = 0;
        }
        return OppUser;
    }());
    var Area_YanXi = (function () {
        function Area_YanXi() {
            this.Name = "Area_YanXi";
            this.$Area = $("#PartialAreas .areaPanel_yanxi");
            this.IsCurrentPage = false;
            this.UpdateTimer = null;
            this.RivalUsers = new List();
            this.LastShipListJsonString = "";
        }
        Area_YanXi.prototype.OnLoad = function () {
            var _This = this;
            var $Area = _This.$Area;
            $Area.find("[data-action='DoFight']").click(function () {
                var $Action = $Area.find("[data-action='DoFight']");
                if ($Action.hasClass("disabled"))
                    return;
                if (MissionWorker.State != DBEnum.WorkState.Ready) {
                    MessageBox.Show("请先停止任务");
                    return;
                }
                if (YanXiWorker.State != DBEnum.WorkState.Ready) {
                    MessageBox.Show("请先停止演习");
                    return;
                }
                if (ZhanYiWorker.State != DBEnum.WorkState.Ready) {
                    MessageBox.Show("请先停止战役");
                    return;
                }
                var SelectUsers = new List();
                $Area.find(".rivalRow .selectFight").each(function (index, dom) {
                    if ($(dom).is(":checked")) {
                        var uid_1 = $(dom).attr("data-uid");
                        var user = _This.RivalUsers.FirstOrDefault(function (c) { return c.UID == uid_1.ToNumber(); });
                        if (user != null) {
                            SelectUsers.Add(NJson.DeepCopy(user));
                        }
                    }
                });
                if (SelectUsers.Count() <= 0) {
                    MessageBox.Show("请选择演习对手!");
                    return;
                }
                Dailog.CreatDialog({
                    Title: "打战役", FormNodes: List.From([{
                            Name: "FleetID",
                            Type: Dailog.FormNodeType.select,
                            Text: "选择舰队",
                            Data: List.From([{ "Name": "第一舰队", "Value": "1" }, { "Name": "第二舰队", "Value": "2" }, { "Name": "第三舰队", "Value": "3" }, { "Name": "第四舰队", "Value": "4" }]),
                            Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                        }, {
                            Name: "Formation",
                            Type: Dailog.FormNodeType.select,
                            Text: "阵型",
                            Data: List.From([{ "Name": "单纵阵", "Value": "1" }, { "Name": "复纵阵", "Value": "2" }, { "Name": "轮行阵", "Value": "3" }, { "Name": "梯形阵", "Value": "4" }, { "Name": "单横阵", "Value": "5" }]),
                            Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                        }, {
                            Name: "FightNight",
                            Type: Dailog.FormNodeType.select,
                            Text: "夜战",
                            Data: List.From([{ "Name": "不夜战", "Value": "0" }, { "Name": "夜战", "Value": "1" }]),
                            Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                        }]), OnBuild: function ($modal) {
                        var Habit_YanXi_FleetID = Config.PlayerConfig.PlayerHabit.YanXi_FleetID;
                        var Habit_YanXi_FightNight = Config.PlayerConfig.PlayerHabit.YanXi_FightNight;
                        var Habit_YanXi_Formation = Config.PlayerConfig.PlayerHabit.YanXi_Formation;
                        $modal.find("[name='FleetID']").val((Habit_YanXi_FleetID >= 1 && Habit_YanXi_FleetID <= 4) ? Habit_YanXi_FleetID.toString() : "1");
                        $modal.find("[name='Formation']").val((Habit_YanXi_Formation >= 1 && Habit_YanXi_Formation <= 5) ? Habit_YanXi_Formation.toString() : "2");
                        $modal.find("[name='FightNight']").val((Habit_YanXi_FightNight >= 0 && Habit_YanXi_FightNight <= 1) ? Habit_YanXi_FightNight.toString() : "1");
                        $modal.find("[name='WorkSL']").change(function () {
                            if ($modal.find("[name='WorkSL']").val() == 1) {
                                $modal.find("[name='FightCount']").parents(".form-group").hide();
                            }
                            else {
                                $modal.find("[name='FightCount']").parents(".form-group").show();
                            }
                        });
                    }, OnSubmit: function (fromJsonObj, $modal) {
                        $modal.find("[data-check=save]").attr("disabled", "disabled");
                        $modal.find("[data-dismiss=modal]").triggerHandler("click");
                        var FleetID = fromJsonObj.FleetID.ToNumber();
                        var Formation = fromJsonObj.Formation.ToNumber();
                        var FightNight = fromJsonObj.FightNight == "1" ? true : false;
                        var fleetShips = Player.GetFleetShips(FleetID);
                        if (fleetShips.Count() == 0) {
                            MessageBox.Show("选择舰队为空！请先整备舰队");
                            return;
                        }
                        if (fleetShips.Where(function (c) { return (c.battlepropsmax.hp * 1 / c.battleprops.hp) > 4; }).Count() > 0) {
                            MessageBox.Show("请先整备舰队当前舰队有大破，无法出击！");
                            return;
                        }
                        if (fleetShips.Where(function (c) { return Player.IsBusyShip(c) == true; }).Count() > 0) {
                            MessageBox.Show("选择舰队部分船只无法出击！");
                            return;
                        }
                        $Area.find(".rivalRow .actions checkbox").attr("disabled", "disabled");
                        $Area.find("[data-action='DoFight']").hide();
                        $Area.find("[data-action='CancelFight']").show().removeClass("disabled");
                        Config.PlayerConfig.PlayerHabit.YanXi_FleetID = FleetID;
                        Config.PlayerConfig.PlayerHabit.YanXi_FightNight = FightNight ? 1 : 0;
                        Config.PlayerConfig.PlayerHabit.YanXi_Formation = Formation;
                        YanXiWorker.State = DBEnum.WorkState.Working;
                        _This.RunWork(FleetID, Formation, FightNight, SelectUsers);
                    }
                });
            });
            $Area.find("[data-action='CancelFight']").click(function () {
                var $Action = $Area.find("[data-action='CancelFight']");
                if ($Action.hasClass("disabled"))
                    return;
                if (YanXiWorker.State == DBEnum.WorkState.Working) {
                    _This.WorkEnd();
                }
            });
            YanXiWorker.RunPVPYanYi = function (FleetID, Formation, FightNight, SelectUsers) {
                return _This.RunWork(FleetID, Formation, FightNight, SelectUsers);
            };
        };
        Area_YanXi.prototype.PrintLog = function (msg) {
            if (this.$Area.find(".messageBox p").length > 500) {
                this.$Area.find(".messageBox p").last().remove();
            }
            this.$Area.find(".messageBox").prepend("<p>" + DateTime.ParseTime(NetDate.GetTimeSpan()).ToString("HH:mm:ss") + " " + msg + "</p>");
        };
        Area_YanXi.prototype.RunWork = function (FleetID, Formation, FightNight, SelectUsers) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var _This, teamShips, suplayResut, ex_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _This = this;
                            if (MissionWorker.State != DBEnum.WorkState.Ready) {
                                _This.PrintLog("【执行失败，当前任务执行中！】");
                                return [2];
                            }
                            if (ZhanYiWorker.State != DBEnum.WorkState.Ready) {
                                _This.PrintLog("【执行失败，当前战役执行中！】");
                                return [2];
                            }
                            YanXiWorker.State = DBEnum.WorkState.Working;
                            _This.$Area.find(".rivalRow .actions checkbox").attr("checked", "false");
                            SelectUsers.ForEach(function (v, i) {
                                _This.$Area.find(".rivalRow[data-id=" + v.UID + "] .actions .md-checkbox input").attr("checked", "ture");
                            });
                            _This.$Area.find(".rivalRow .actions checkbox").attr("disabled", "disabled");
                            _This.$Area.find("[data-action='DoFight']").hide();
                            _This.$Area.find("[data-action='CancelFight']").show().removeClass("disabled");
                            YanXiWorker.ThreadSemaphore = 1;
                            _This.PrintLog("准备执行演习.");
                            teamShips = Player.GetFleetShips(FleetID);
                            if (!(teamShips.Where(function (c) { return c.battleprops.oil < c.battlepropsmax.oil || c.battleprops.ammo < c.battlepropsmax.ammo || c.battleprops.aluminium < c.battlepropsmax.aluminium; }).Count() > 0)) return [3, 2];
                            _This.PrintLog("补给");
                            return [4, Net.Conditioning.SupplyBoats(teamShips.Select(function (c) { return c.id; }), "0")];
                        case 1:
                            suplayResut = _a.sent();
                            if (suplayResut.ErrorCode != 0) {
                                _This.PrintLog("补给失败");
                                _This.WorkEnd();
                                return [2];
                            }
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 5, 6, 10]);
                            return [4, Net.NetComm.DealyRandom(1500)];
                        case 3:
                            _a.sent();
                            return [4, SelectUsers.ForEachAsync(function (rivalUser) { return __awaiter(_this, void 0, void 0, function () {
                                    var spyResult, challengeResult, getWarResult, resultlevel, resultText;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                _This.PrintLog("对 " + rivalUser.UserName + " 的 " + rivalUser.FleetName);
                                                return [4, Net.NetComm.DealyRandom(1000)];
                                            case 1:
                                                _a.sent();
                                                _This.PrintLog("索敌");
                                                return [4, Net.PVP.Spy(rivalUser.UID, FleetID)];
                                            case 2:
                                                spyResult = _a.sent();
                                                if (spyResult.ErrorCode != 0) {
                                                    _This.PrintLog("索敌失败！");
                                                    _This.WorkEnd();
                                                    return [2];
                                                }
                                                _This.PrintLog("进入战斗...");
                                                return [4, Net.PVP.Challenge(rivalUser.UID, FleetID, Formation)];
                                            case 3:
                                                challengeResult = _a.sent();
                                                if (challengeResult.ErrorCode != 0) {
                                                    _This.PrintLog(challengeResult.ErrorMessage);
                                                    _This.WorkEnd();
                                                    return [2];
                                                }
                                                return [4, Net.PVP.GetWarResult(FightNight && challengeResult.warreport.candonightwar == 1)];
                                            case 4:
                                                getWarResult = _a.sent();
                                                if (getWarResult.ErrorCode != 0) {
                                                    _This.PrintLog(getWarResult.ErrorMessage);
                                                    _This.WorkEnd();
                                                    return [2];
                                                }
                                                resultlevel = getWarResult.warresult.resultlevel;
                                                resultText = (resultlevel == 0 ? "-" : (resultlevel == 1 ? "SS" : (resultlevel == 2 ? "S" : (resultlevel == 3 ? "A" : (resultlevel == 4 ? "B" : (resultlevel == 5 ? "C" : (resultlevel == 6 ? "D" : "未知")))))));
                                                _This.$Area.find(".rivalRow[data-id=" + rivalUser.UID + "]").addClass("disable");
                                                _This.$Area.find(".rivalRow[data-id=" + rivalUser.UID + "]").find(".actions .md-checkbox").remove();
                                                _This.$Area.find(".rivalRow[data-id=" + rivalUser.UID + "]").find(".actions").append("<div class=\"fightResult\">" + resultText + "</div>");
                                                _This.PrintLog("本次演习结束 " + resultText);
                                                return [4, Net.NetComm.DealyRandom(4000)];
                                            case 5:
                                                _a.sent();
                                                return [2];
                                        }
                                    });
                                }); })];
                        case 4:
                            _a.sent();
                            return [3, 10];
                        case 5:
                            ex_3 = _a.sent();
                            if (ex_3 == "WorkerAbort") {
                                _This.PrintLog("停止成功");
                            }
                            return [3, 10];
                        case 6:
                            _This.$Area.find(".rivalRow .actions checkbox").removeAttr("disabled");
                            _This.$Area.find("[data-action='DoFight']").show();
                            _This.$Area.find("[data-action='CancelFight']").hide();
                            YanXiWorker.State = DBEnum.WorkState.Ready;
                            return [4, Net.Conditioning.GameReset()];
                        case 7:
                            _a.sent();
                            _This.PrintLog("-----演习结束-----");
                            if (_This.$Area.find(".rivallist .actions .md-checkbox").length == 0) {
                                _This.$Area.find("[data-action='DoFight']").addClass("disabled");
                            }
                            else {
                                _This.$Area.find("[data-action='DoFight']").removeClass("disabled");
                            }
                            if (!(MainTimer.LostWork != null)) return [3, 9];
                            Logs.Print("计划任务 - 继续执行任务.");
                            if (MainTimer.LostWork.IsDoQueue == true) {
                                QueueWorker.State = DBEnum.WorkState.Working;
                            }
                            return [4, Sleep(1000)];
                        case 8:
                            _a.sent();
                            MissionWorker.Start({ MissionProgressNow: MainTimer.LostWork.MissionProgressNow, MissionProgressTotal: MainTimer.LostWork.MissionProgressTotal });
                            MainTimer.LostWork = null;
                            _a.label = 9;
                        case 9: return [7];
                        case 10: return [2];
                    }
                });
            });
        };
        Area_YanXi.prototype.WorkEnd = function () {
            this.PrintLog("正在停止任务...");
            this.$Area.find("[data-action='CancelFight']").addClass("disabled");
            ;
            YanXiWorker.ThreadSemaphore = 0;
        };
        Area_YanXi.prototype.BeforeOpen = function () { return true; };
        ;
        Area_YanXi.prototype.OnOpen = function () {
            var _This = this;
            var $Area = _This.$Area;
            if (YanXiWorker.State == DBEnum.WorkState.Ready) {
                Net.PVP.GetChallengeList().then(function (initResult) {
                    if (initResult.ErrorCode != 0) {
                        MessageBox.Show(initResult.ErrorMessage);
                    }
                    else {
                        _This.ReloadOpponentList(initResult.list);
                    }
                });
            }
        };
        ;
        Area_YanXi.prototype.OnOpened = function () { };
        ;
        Area_YanXi.prototype.ReloadOpponentList = function (list) {
            var _This = this;
            var $Area = this.$Area;
            var TempEntityData = list.Select(function (c) {
                var result = {
                    FleetName: c.fleetname,
                    UserName: (c.username ? c.username : "").ReplaceAll("<", "").ReplaceAll(">", ""),
                    Level: c.level,
                    UID: c.uid,
                    ResultLevel: c.resultlevel,
                    Ships: c.ships.Select(function (ship) {
                        return {
                            Level: ship.level,
                            Name: Player.GetShipName(ship),
                        };
                    }),
                };
                return result;
            });
            if (_This.LastShipListJsonString != NJson.Stringify(TempEntityData)) {
                _This.LastShipListJsonString = NJson.Stringify(TempEntityData);
                var $rivalListTemp = $(doT.template($Area.find("[data-tempid='rivalListTemp']").html())(NJson.ObjListToArray(NJson.DeepCopy(TempEntityData))));
                $Area.find(".rivallist").html("").append($rivalListTemp.hide());
                $rivalListTemp.fadeIn(300);
                _This.RivalUsers = new List();
                TempEntityData.ForEach(function (c) {
                    _This.RivalUsers.Add({ FleetName: c.FleetName, Level: c.Level, UID: c.UID, UserName: c.UserName });
                });
                if (_This.$Area.find(".rivallist .actions .md-checkbox").length == 0) {
                    _This.$Area.find("[data-action='DoFight']").addClass("disabled");
                }
                else {
                    _This.$Area.find("[data-action='DoFight']").removeClass("disabled");
                }
            }
        };
        Area_YanXi.prototype.BeforeClose = function () { return true; };
        ;
        Area_YanXi.prototype.OnClosed = function () { };
        ;
        return Area_YanXi;
    }());
    var Area_Friends = (function () {
        function Area_Friends() {
            this.Name = "Area_Friends";
            this.$Area = $("#PartialAreas .areaPanel_friends");
            this.IsCurrentPage = false;
            this.UpdateTimer = null;
            this.TodayFightNum = 0;
            this.RivalUsers = new List();
            this.LastShipListJsonString = "";
        }
        Area_Friends.prototype.OnLoad = function () {
            var _This = this;
            var $Area = _This.$Area;
            $Area.find("[data-action='DoFight']").click(function () {
                var $Action = $Area.find("[data-action='DoFight']");
                if ($Action.hasClass("disabled"))
                    return;
                if (MissionWorker.State != DBEnum.WorkState.Ready) {
                    MessageBox.Show("请先停止任务");
                    return;
                }
                if (YanXiWorker.State != DBEnum.WorkState.Ready) {
                    MessageBox.Show("请先停止演习");
                    return;
                }
                if (ZhanYiWorker.State != DBEnum.WorkState.Ready) {
                    MessageBox.Show("请先停止战役");
                    return;
                }
                var SelectUsers = new List();
                $Area.find(".rivalRow .selectFight").each(function (index, dom) {
                    if ($(dom).is(":checked")) {
                        var uid_2 = $(dom).attr("data-uid");
                        var user = _This.RivalUsers.FirstOrDefault(function (c) { return c.UID == uid_2.ToNumber(); });
                        if (user != null) {
                            SelectUsers.Add(NJson.DeepCopy(user));
                        }
                    }
                });
                if (SelectUsers.Count() <= 0) {
                    MessageBox.Show("请选择演习对手!");
                    return;
                }
                if (SelectUsers.Count() > (3 - _This.TodayFightNum)) {
                    MessageBox.Show("每日仅能选择三个好友");
                    return;
                }
                Dailog.CreatDialog({
                    Title: "打战役", FormNodes: List.From([{
                            Name: "FleetID",
                            Type: Dailog.FormNodeType.select,
                            Text: "选择舰队",
                            Data: List.From([{ "Name": "第一舰队", "Value": "1" }, { "Name": "第二舰队", "Value": "2" }, { "Name": "第三舰队", "Value": "3" }, { "Name": "第四舰队", "Value": "4" }]),
                            Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                        }, {
                            Name: "Formation",
                            Type: Dailog.FormNodeType.select,
                            Text: "阵型",
                            Data: List.From([{ "Name": "单纵阵", "Value": "1" }, { "Name": "复纵阵", "Value": "2" }, { "Name": "轮行阵", "Value": "3" }, { "Name": "梯形阵", "Value": "4" }, { "Name": "单横阵", "Value": "5" }]),
                            Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                        }, {
                            Name: "FightNight",
                            Type: Dailog.FormNodeType.select,
                            Text: "夜战",
                            Data: List.From([{ "Name": "不夜战", "Value": "0" }, { "Name": "夜战", "Value": "1" }]),
                            Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                        }]), OnBuild: function ($modal) {
                        var Habit_Friend_FleetID = Config.PlayerConfig.PlayerHabit.Friend_FleetID;
                        var Habit_Friend_FightNight = Config.PlayerConfig.PlayerHabit.Friend_FightNight;
                        var Habit_Friend_Formation = Config.PlayerConfig.PlayerHabit.Friend_Formation;
                        $modal.find("[name='FleetID']").val((Habit_Friend_FleetID >= 1 && Habit_Friend_FleetID <= 4) ? Habit_Friend_FleetID.toString() : "1");
                        $modal.find("[name='Formation']").val((Habit_Friend_Formation >= 1 && Habit_Friend_Formation <= 5) ? Habit_Friend_Formation.toString() : "2");
                        $modal.find("[name='FightNight']").val((Habit_Friend_FightNight >= 0 && Habit_Friend_FightNight <= 1) ? Habit_Friend_FightNight.toString() : "1");
                        $modal.find("[name='WorkSL']").change(function () {
                            if ($modal.find("[name='WorkSL']").val() == 1) {
                                $modal.find("[name='FightCount']").parents(".form-group").hide();
                            }
                            else {
                                $modal.find("[name='FightCount']").parents(".form-group").show();
                            }
                        });
                    }, OnSubmit: function (fromJsonObj, $modal) {
                        $modal.find("[data-check=save]").attr("disabled", "disabled");
                        $modal.find("[data-dismiss=modal]").triggerHandler("click");
                        var FleetID = fromJsonObj.FleetID.ToNumber();
                        var Formation = fromJsonObj.Formation.ToNumber();
                        var FightNight = fromJsonObj.FightNight == "1" ? true : false;
                        var fleetShips = Player.GetFleetShips(FleetID);
                        if (fleetShips.Count() == 0) {
                            MessageBox.Show("选择舰队为空！请先整备舰队");
                            return;
                        }
                        if (fleetShips.Where(function (c) { return (c.battlepropsmax.hp * 1 / c.battleprops.hp) > 4; }).Count() > 0) {
                            MessageBox.Show("请先整备舰队当前舰队有大破，无法出击！");
                            return;
                        }
                        if (fleetShips.Where(function (c) { return Player.IsBusyShip(c) == true; }).Count() > 0) {
                            MessageBox.Show("选择舰队部分船只无法出击！");
                            return;
                        }
                        $Area.find(".rivalRow .actions checkbox").attr("disabled", "disabled");
                        $Area.find("[data-action='DoFight']").hide();
                        $Area.find("[data-action='CancelFight']").show().removeClass("disabled");
                        Config.PlayerConfig.PlayerHabit.Friend_FleetID = FleetID;
                        Config.PlayerConfig.PlayerHabit.Friend_FightNight = FightNight ? 1 : 0;
                        Config.PlayerConfig.PlayerHabit.Friend_Formation = Formation;
                        YanXiWorker.State = DBEnum.WorkState.Working;
                        _This.RunWork(FleetID, Formation, FightNight, SelectUsers);
                    }
                });
            });
            $Area.find("[data-action='CancelFight']").click(function () {
                var $Action = $Area.find("[data-action='CancelFight']");
                if ($Action.hasClass("disabled"))
                    return;
                if (YanXiWorker.State == DBEnum.WorkState.Working) {
                    _This.WorkEnd();
                }
            });
        };
        Area_Friends.prototype.PrintLog = function (msg) {
            if (this.$Area.find(".messageBox p").length > 500) {
                this.$Area.find(".messageBox p").last().remove();
            }
            this.$Area.find(".messageBox").prepend("<p>" + DateTime.ParseTime(NetDate.GetTimeSpan()).ToString("HH:mm:ss") + " " + msg + "</p>");
        };
        Area_Friends.prototype.RunWork = function (FleetID, Formation, FightNight, SelectUsers) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var _This, teamShips, suplayResut, ex_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _This = this;
                            YanXiWorker.ThreadSemaphore = 1;
                            _This.PrintLog("准备执行演习.");
                            teamShips = Player.GetFleetShips(FleetID);
                            if (!(teamShips.Where(function (c) { return c.battleprops.oil < c.battlepropsmax.oil || c.battleprops.ammo < c.battlepropsmax.ammo || c.battleprops.aluminium < c.battlepropsmax.aluminium; }).Count() > 0)) return [3, 2];
                            _This.PrintLog("补给");
                            return [4, Net.Conditioning.SupplyBoats(teamShips.Select(function (c) { return c.id; }), "0")];
                        case 1:
                            suplayResut = _a.sent();
                            if (suplayResut.ErrorCode != 0) {
                                _This.PrintLog("补给失败");
                                _This.WorkEnd();
                                return [2];
                            }
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 5, 6, 8]);
                            return [4, Net.NetComm.DealyRandom(1500)];
                        case 3:
                            _a.sent();
                            return [4, SelectUsers.ForEachAsync(function (rivalUser) { return __awaiter(_this, void 0, void 0, function () {
                                    var spyResult, challengeResult, getWarResult, resultlevel, resultText;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                _This.PrintLog("对 " + rivalUser.UserName);
                                                return [4, Net.NetComm.DealyRandom(1000)];
                                            case 1:
                                                _a.sent();
                                                _This.PrintLog("索敌");
                                                return [4, Net.Friend.Spy(rivalUser.UID, FleetID)];
                                            case 2:
                                                spyResult = _a.sent();
                                                if (spyResult.ErrorCode != 0) {
                                                    _This.PrintLog("索敌失败！");
                                                    _This.WorkEnd();
                                                    return [2];
                                                }
                                                _This.PrintLog("进入战斗...");
                                                return [4, Net.Friend.Challenge(rivalUser.UID, FleetID, Formation)];
                                            case 3:
                                                challengeResult = _a.sent();
                                                if (challengeResult.ErrorCode != 0) {
                                                    _This.PrintLog(challengeResult.ErrorMessage);
                                                    _This.WorkEnd();
                                                    return [2];
                                                }
                                                return [4, Net.Friend.GetWarResult(FightNight && challengeResult.warreport.candonightwar == 1)];
                                            case 4:
                                                getWarResult = _a.sent();
                                                if (getWarResult.ErrorCode != 0) {
                                                    _This.PrintLog(getWarResult.ErrorMessage);
                                                    _This.WorkEnd();
                                                    return [2];
                                                }
                                                resultlevel = getWarResult.warresult.resultlevel;
                                                resultText = (resultlevel == 0 ? "-" : (resultlevel == 1 ? "SS" : (resultlevel == 2 ? "S" : (resultlevel == 3 ? "A" : (resultlevel == 4 ? "B" : (resultlevel == 5 ? "C" : (resultlevel == 6 ? "D" : "未知")))))));
                                                _This.$Area.find(".rivalRow[data-id=" + rivalUser.UID + "]").addClass("disable");
                                                _This.$Area.find(".rivalRow[data-id=" + rivalUser.UID + "]").find(".actions .md-checkbox").remove();
                                                _This.$Area.find(".rivalRow[data-id=" + rivalUser.UID + "]").find(".actions").append("<div class=\"fightResult\">" + resultText + "</div>");
                                                _This.PrintLog("本次演习结束 " + resultText);
                                                return [4, Net.NetComm.DealyRandom(4000)];
                                            case 5:
                                                _a.sent();
                                                return [2];
                                        }
                                    });
                                }); })];
                        case 4:
                            _a.sent();
                            return [3, 8];
                        case 5:
                            ex_4 = _a.sent();
                            if (ex_4 == "WorkerAbort") {
                                _This.PrintLog("停止成功");
                            }
                            return [3, 8];
                        case 6:
                            _This.$Area.find(".rivalRow .actions checkbox").removeAttr("disabled");
                            _This.$Area.find("[data-action='DoFight']").show();
                            _This.$Area.find("[data-action='CancelFight']").hide();
                            YanXiWorker.State = DBEnum.WorkState.Ready;
                            return [4, Net.Conditioning.GameReset()];
                        case 7:
                            _a.sent();
                            _This.PrintLog("-----演习结束-----");
                            if (_This.$Area.find(".rivallist .actions .md-checkbox").length == 0) {
                                _This.$Area.find("[data-action='DoFight']").addClass("disabled");
                            }
                            else {
                                _This.$Area.find("[data-action='DoFight']").removeClass("disabled");
                            }
                            return [7];
                        case 8: return [2];
                    }
                });
            });
        };
        Area_Friends.prototype.WorkEnd = function () {
            this.PrintLog("正在停止任务...");
            this.$Area.find("[data-action='CancelFight']").addClass("disabled");
            ;
            YanXiWorker.ThreadSemaphore = 0;
        };
        Area_Friends.prototype.BeforeOpen = function () { return true; };
        ;
        Area_Friends.prototype.OnOpen = function () {
            var _this = this;
            var _This = this;
            var $Area = _This.$Area;
            if (YanXiWorker.State == DBEnum.WorkState.Ready) {
                $Area.find(".rivalRow .selectFight").attr("disabled", "disabled");
                if (MissionWorker.State != DBEnum.WorkState.Ready) {
                    this.PrintLog("请先停止任务");
                    return;
                }
                if (YanXiWorker.State != DBEnum.WorkState.Ready) {
                    this.PrintLog("请先停止演习");
                    return;
                }
                if (ZhanYiWorker.State != DBEnum.WorkState.Ready) {
                    this.PrintLog("请先停止战役");
                    return;
                }
                Net.Friend.GetChallengeList().then(function (initResult) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    var FriendShipsList_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(initResult.ErrorCode != 0)) return [3, 1];
                                MessageBox.Show(initResult.ErrorMessage);
                                return [3, 3];
                            case 1:
                                this.PrintLog("加载中 请稍等...");
                                FriendShipsList_1 = new List();
                                _This.TodayFightNum = 0;
                                return [4, initResult.list.OrderByDescending(function (c) { return c.level; }).ForEachAsync(function (c) { return __awaiter(_this, void 0, void 0, function () {
                                        var r;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4, Net.Friend.VisitorFriend(c.uid)];
                                                case 1:
                                                    r = _a.sent();
                                                    if (r.ErrorCode == 0) {
                                                        FriendShipsList_1.Add(r);
                                                    }
                                                    if (r.challengescore > 0 || r.ErrorCode != 0) {
                                                        _This.TodayFightNum++;
                                                    }
                                                    return [2];
                                            }
                                        });
                                    }); })];
                            case 2:
                                _a.sent();
                                $Area.find(".rivalRow .selectFight").removeAttr("disabled");
                                this.PrintLog("加载完成");
                                _This.ReloadOpponentList(FriendShipsList_1);
                                _a.label = 3;
                            case 3: return [2];
                        }
                    });
                }); });
            }
        };
        ;
        Area_Friends.prototype.OnOpened = function () { };
        ;
        Area_Friends.prototype.ReloadOpponentList = function (list) {
            var _This = this;
            var $Area = this.$Area;
            var TempEntityData = list.Select(function (c) {
                var result = {
                    UserName: c.detailinfo.username,
                    Level: c.detailinfo.level,
                    UID: c.fuid,
                    ResultLevel: c.challengescore,
                    Ships: c.friendfleet.Select(function (ship) {
                        return {
                            Level: ship.level,
                            Name: Player.GetShipName(ship),
                        };
                    }),
                };
                return result;
            });
            if (_This.LastShipListJsonString != NJson.Stringify(TempEntityData)) {
                _This.LastShipListJsonString = NJson.Stringify(TempEntityData);
                var $rivalListTemp = $(doT.template($Area.find("[data-tempid='rivalListTemp']").html())(NJson.ObjListToArray(NJson.DeepCopy(TempEntityData))));
                $Area.find(".rivallist").html("").append($rivalListTemp.hide());
                $rivalListTemp.fadeIn(300);
                _This.RivalUsers = new List();
                TempEntityData.ForEach(function (c) {
                    _This.RivalUsers.Add({ Level: c.Level, UID: c.UID, UserName: c.UserName });
                });
                if (_This.$Area.find(".rivallist .actions .md-checkbox").length == 0) {
                    _This.$Area.find("[data-action='DoFight']").addClass("disabled");
                }
                else {
                    _This.$Area.find("[data-action='DoFight']").removeClass("disabled");
                }
            }
        };
        Area_Friends.prototype.BeforeClose = function () { return true; };
        ;
        Area_Friends.prototype.OnClosed = function () { };
        ;
        return Area_Friends;
    }());
    var YuanZhengMap = (function () {
        function YuanZhengMap() {
            this.ID = 0;
            this.Name = "";
            this.Resources = new List();
            this.Minute = 0;
            this.Limit = null;
        }
        return YuanZhengMap;
    }());
    var MapLimit = (function () {
        function MapLimit() {
            this.ShipCount = 0;
            this.LeaderLevel = 0;
            this.ShipTypes = null;
        }
        return MapLimit;
    }());
    var ShipTypeLimit = (function () {
        function ShipTypeLimit() {
            this.Type = "";
            this.Number = 0;
        }
        return ShipTypeLimit;
    }());
    var Area_YuanZheng = (function () {
        function Area_YuanZheng() {
            this.Name = "Area_YuanZheng";
            this.$Area = $("#PartialAreas .areaPanel_yuanzheng");
            this.IsCurrentPage = false;
            this.UpdateTimer = null;
            this.Maps = new List();
            this.LastDockListJsonString = "";
        }
        Area_YuanZheng.prototype.OnLoad = function () {
            var _This = this;
            var $Area = _This.$Area;
            _This.Maps.Add({ ID: 10001, Name: "舰炮演练", Resources: List.From(["油0", "弹30", "钢0", "铝0"]), Minute: 15, Limit: { ShipCount: 2, LeaderLevel: 1, ShipTypes: List.From([]) } });
            _This.Maps.Add({ ID: 10002, Name: "作战演练", Resources: List.From(["油0", "弹30", "钢30", "铝0", "快修"]), Minute: 30, Limit: { ShipCount: 3, LeaderLevel: 2, ShipTypes: List.From([{ Type: "12", Number: 1 }]) } });
            _This.Maps.Add({ ID: 10003, Name: "近海巡逻", Resources: List.From(["油30", "弹30", "钢30", "铝0"]), Minute: 30, Limit: { ShipCount: 4, LeaderLevel: 3, ShipTypes: List.From([{ Type: "12", Number: 2 }]) } });
            _This.Maps.Add({ ID: 10004, Name: "反潜演练", Resources: List.From(["油0", "弹100", "钢0", "铝0", "快建"]), Minute: 60, Limit: { ShipCount: 4, LeaderLevel: 5, ShipTypes: List.From([{ Type: "12", Number: 2 }]) } });
            _This.Maps.Add({ ID: 20001, Name: "护航任务", Resources: List.From(["油150", "弹175", "钢20", "铝20", "建造图纸"]), Minute: 120, Limit: { ShipCount: 5, LeaderLevel: 5, ShipTypes: List.From([{ Type: "12", Number: 2 }, { Type: "10", Number: 1 }]) } });
            _This.Maps.Add({ ID: 20002, Name: "远航训练", Resources: List.From(["油0", "弹0", "钢0", "铝75"]), Minute: 45, Limit: { ShipCount: 4, LeaderLevel: 10, ShipTypes: List.From([{ Type: "10", Number: 2 }]) } });
            _This.Maps.Add({ ID: 20003, Name: "编队演习", Resources: List.From(["油0", "弹0", "钢50", "铝30", "开发图纸"]), Minute: 60, Limit: { ShipCount: 6, LeaderLevel: 10, ShipTypes: List.From([]) } });
            _This.Maps.Add({ ID: 20004, Name: "大规模编队演习", Resources: List.From(["油50", "弹100", "钢50", "铝50", "快修"]), Minute: 180, Limit: { ShipCount: 6, LeaderLevel: 10, ShipTypes: List.From([]) } });
            _This.Maps.Add({ ID: 30001, Name: "远洋护航", Resources: List.From(["油350", "弹0", "钢0", "铝0", "开发图纸"]), Minute: 240, Limit: { ShipCount: 4, LeaderLevel: 15, ShipTypes: List.From([{ Type: "12", Number: 2 }]) } });
            _This.Maps.Add({ ID: 30002, Name: "舰队前哨侦查", Resources: List.From(["油50", "弹0", "钢50", "铝30", "快建"]), Minute: 90, Limit: { ShipCount: 4, LeaderLevel: 20, ShipTypes: List.From([{ Type: "12", Number: 1 }]) } });
            _This.Maps.Add({ ID: 30003, Name: "巡洋舰编队演习", Resources: List.From(["油0", "弹0", "钢0", "铝250"]), Minute: 300, Limit: { ShipCount: 4, LeaderLevel: 8, ShipTypes: List.From([{ Type: "7", Number: 1 }]) } });
            _This.Maps.Add({ ID: 30004, Name: "运输船队护航", Resources: List.From(["油50", "弹250", "钢200", "铝50", "建造图纸"]), Minute: 480, Limit: { ShipCount: 4, LeaderLevel: 12, ShipTypes: List.From([{ Type: "7", Number: 1 }]) } });
            _This.Maps.Add({ ID: 40001, Name: "突破封锁线", Resources: List.From(["油240", "弹300", "钢0", "铝0", "快修"]), Minute: 240, Limit: { ShipCount: 6, LeaderLevel: 20, ShipTypes: List.From([{ Type: "12", Number: 4 }]) } });
            _This.Maps.Add({ ID: 40002, Name: "火力支援", Resources: List.From(["油0", "弹240", "钢200", "铝0", "快建"]), Minute: 360, Limit: { ShipCount: 6, LeaderLevel: 30, ShipTypes: List.From([{ Type: "12", Number: 2 }, { Type: "10", Number: 2 }]) } });
            _This.Maps.Add({ ID: 40003, Name: "封锁航线", Resources: List.From(["油0", "弹0", "钢300", "铝400", "建造图纸"]), Minute: 720, Limit: { ShipCount: 6, LeaderLevel: 20, ShipTypes: List.From([{ Type: "10", Number: 2 }]) } });
            _This.Maps.Add({ ID: 40004, Name: "联合登陆行动", Resources: List.From(["油0", "弹200", "钢0", "铝90"]), Minute: 210, Limit: { ShipCount: 4, LeaderLevel: 30, ShipTypes: List.From([]) } });
            _This.Maps.Add({ ID: 50001, Name: "武装侦查", Resources: List.From(["油120", "弹0", "钢120", "铝0", "快建"]), Minute: 120, Limit: { ShipCount: 4, LeaderLevel: 25, ShipTypes: List.From([{ Type: "12", Number: 3 }]) } });
            _This.Maps.Add({ ID: 50002, Name: "主力舰出动", Resources: List.From(["油0", "弹0", "钢0", "铝180", "建造图纸"]), Minute: 300, Limit: { ShipCount: 6, LeaderLevel: 25, ShipTypes: List.From([{ Type: "12", Number: 2 }, { Type: "2", Number: 1 }]) } });
            _This.Maps.Add({ ID: 50003, Name: "航空援护", Resources: List.From(["油60", "弹80", "钢0", "铝0"]), Minute: 60, Limit: { ShipCount: 6, LeaderLevel: 40, ShipTypes: List.From([{ Type: "12", Number: 2 }, { Type: "4", Number: 1 }]) } });
            _This.Maps.Add({ ID: 50004, Name: "夜间强袭作战", Resources: List.From(["油0", "弹0", "钢200", "铝0", "快修"]), Minute: 120, Limit: { ShipCount: 6, LeaderLevel: 50, ShipTypes: List.From([{ Type: "12", Number: 6 }]) } });
            _This.Maps.Add({ ID: 60001, Name: "北冰洋护航", Resources: List.From(["油800", "弹0", "钢0", "铝0"]), Minute: 540, Limit: { ShipCount: 6, LeaderLevel: 45, ShipTypes: List.From([{ Type: "12", Number: 3 }, { Type: "10", Number: 1 }]) } });
            _This.Maps.Add({ ID: 60002, Name: "战列舰作战", Resources: List.From(["油0", "弹200", "钢200", "铝0", "建造图纸"]), Minute: 180, Limit: { ShipCount: 6, LeaderLevel: 50, ShipTypes: List.From([{ Type: "4", Number: 1 }]) } });
            _This.Maps.Add({ ID: 60003, Name: "航海强攻", Resources: List.From(["油200", "弹0", "钢0", "铝100", "建造图纸"]), Minute: 240, Limit: { ShipCount: 6, LeaderLevel: 50, ShipTypes: List.From([{ Type: "5", Number: 1 }]) } });
            _This.Maps.Add({ ID: 60004, Name: "莱茵演习", Resources: List.From(["油0", "弹1000", "钢0", "铝0", "开发图纸"]), Minute: 720, Limit: { ShipCount: 4, LeaderLevel: 50, ShipTypes: List.From([{ Type: "12", Number: 2 }, { Type: "7", Number: 2 }]) } });
            _This.Maps.Add({ ID: 70001, Name: "强击潜艇洞库", Resources: List.From(["油0", "弹0", "钢0", "铝600"]), Minute: 600, Limit: { ShipCount: 4, LeaderLevel: 40, ShipTypes: List.From([{ Type: "7", Number: 1 }, { Type: "1", Number: 1 }]) } });
            _This.Maps.Add({ ID: 70002, Name: "大西洋反潜护航", Resources: List.From(["油600", "弹600", "钢600", "铝0", "快建"]), Minute: 1200, Limit: { ShipCount: 6, LeaderLevel: 60, ShipTypes: List.From([{ Type: "12", Number: 2 }]) } });
            _This.Maps.Add({ ID: 70003, Name: "突袭军港", Resources: List.From(["油0", "弹0", "钢1200", "铝0", "建造图纸"]), Minute: 1440, Limit: { ShipCount: 6, LeaderLevel: 50, ShipTypes: List.From([{ Type: "12", Number: 2 }, { Type: "2", Number: 1 }]) } });
            _This.Maps.Add({ ID: 70004, Name: "航空封锁战", Resources: List.From(["油0", "弹1500", "钢0", "铝300", "快修"]), Minute: 2880, Limit: { ShipCount: 6, LeaderLevel: 12, ShipTypes: List.From([{ Type: "3", Number: 1 }]) } });
        };
        ;
        Area_YuanZheng.prototype.InitUpdateTimer = function () {
            var _this = this;
            this.UpdateTimer = new Timer();
            this.UpdateTimer.Interval = 1000;
            this.UpdateTimer.Elapsed = function () {
                _this.UpdateTimer.Stop();
                try {
                    _this.UpdateView();
                }
                catch (ex) {
                }
                finally {
                    _this.UpdateTimer.Start();
                }
            };
            this.UpdateView();
            this.UpdateTimer.Start();
        };
        Area_YuanZheng.prototype.UpdateView = function () {
            if (this.IsCurrentPage) {
                this.CheckUpdateDocks();
            }
        };
        Area_YuanZheng.prototype.CheckUpdateDocks = function () {
            var _This = this;
            var $Area = _This.$Area;
            var TempEntityData = List.From([5, 6, 7, 8]).Select(function (fleetID) {
                var dock = Player.PveExploreVo.levels.FirstOrDefault(function (c) { return c.fleetid == fleetID; });
                var map = dock == null ? new YuanZhengMap() : _This.Maps.Where(function (c) { return c.ID == dock.exploreid; }).FirstOrNew();
                var fleetShips = Player.GetFleetShips(fleetID);
                var subSecound = (dock != null && dock.exploreid > 0) ? Math.max(dock.endtime - NetDate.GetTimeSpanSecound(), 0) : 0;
                var hour = (dock != null && dock.exploreid > 0) ? Math.floor(subSecound / 3600) : 0;
                var mini = (dock != null && dock.exploreid > 0) ? Math.floor((subSecound - hour * 3600) / 60) : 0;
                var secound = (dock != null && dock.exploreid > 0) ? subSecound - hour * 3600 - mini * 60 : 0;
                var result = {
                    FleetID: fleetID,
                    MapID: map.ID,
                    Map: map,
                    Ships: fleetShips.Select(function (ship) {
                        return {
                            Index: fleetShips.IndexOf(ship),
                            ShipStatus: Player.GetShipStateContext(ship),
                            ID: ship.id,
                            Level: ship.level,
                            Name: Player.GetShipName(ship),
                            HP: ship.battleprops.hp + "/" + ship.battlepropsmax.hp,
                            Oil: ship.battleprops.oil + "/" + ship.battlepropsmax.oil,
                            Ammo: ship.battleprops.ammo + "/" + ship.battlepropsmax.ammo,
                            Aluminium: ship.battleprops.aluminium + "/" + ship.battlepropsmax.aluminium,
                        };
                    }),
                    ExploreId: dock == null ? 0 : dock.exploreid,
                    StartTime: dock == null ? 0 : dock.starttime,
                    EndTime: dock == null ? 0 : dock.endtime,
                    Hour: hour,
                    Minutes: mini,
                    Secound: secound,
                };
                return result;
            });
            if (_This.LastDockListJsonString != NJson.Stringify(TempEntityData)) {
                _This.LastDockListJsonString = NJson.Stringify(TempEntityData);
                var $dockListTemp = $(doT.template($Area.find("[data-tempid='dockListTemp']").html())(NJson.ObjListToArray(NJson.DeepCopy(TempEntityData))));
                $Area.find(".docklists").html("").append($dockListTemp);
                $dockListTemp.find(".modifyShips").click(function () {
                    var FleetID = $(this).parent().attr("data-fleetid").ToNumber();
                    ModalShower.SlideShipPickerQuick(function (c) { return !Player.IsBusyShip(c); }, function (ships, isRange) {
                        var fleetShips = NJson.DeepCopy(Player.GetFleetShips(FleetID).Select(function (c) { return c.id; })).ToArray();
                        fleetShips = ships.ToArray();
                        if (fleetShips.length < 6) {
                            MessageBox.Show("远征舰船请选择 6 艘");
                            return false;
                        }
                        var fleetShipsList = List.From(fleetShips);
                        var _loop_1 = function (i) {
                            if (fleetShipsList.Where(function (c) { return fleetShipsList.IndexOf(c) != i && Player.IsSameShip(Player.GetShip(fleetShipsList[i]), Player.GetShip(c)) == true; }).Count() > 0) {
                                MessageBox.Show("（*゜ー゜*）<br/>编队内有重复舰船");
                                return { value: false };
                            }
                        };
                        for (var i = 0; i < fleetShipsList.Count(); i++) {
                            var state_1 = _loop_1(i);
                            if (typeof state_1 === "object")
                                return state_1.value;
                        }
                        return true;
                    }, function (ships, isRange) {
                        return __awaiter(this, void 0, void 0, function () {
                            var changeFleetResult;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, Net.Conditioning.InstantFleet(FleetID, ships.Select(function (c) { return c; }))];
                                    case 1:
                                        changeFleetResult = _a.sent();
                                        if (changeFleetResult.ErrorCode != 0) {
                                            MessageBox.Show(changeFleetResult.ErrorMessage);
                                        }
                                        else {
                                            MessageBox.Show("更改成功");
                                        }
                                        return [2];
                                }
                            });
                        });
                    }, Player.GetFleetShips(FleetID).Select(function (c) { return c.id; }), 6, 6);
                });
                $dockListTemp.find(".goToExplore").click(function () {
                    if (ZhanYiWorker.State != DBEnum.WorkState.Ready) {
                        MessageBox.Show("请先取消战役");
                        return;
                    }
                    if (MissionWorker.State != DBEnum.WorkState.Ready) {
                        MessageBox.Show("请先停止任务");
                        return;
                    }
                    if (YanXiWorker.State != DBEnum.WorkState.Ready) {
                        MessageBox.Show("请先停止演习");
                        return;
                    }
                    var FleetID = $(this).parent().attr("data-fleetid").ToNumber();
                    var FleetShips = Player.GetFleetShips(FleetID);
                    if (FleetShips.Where(function (c) { return Player.IsBusyShip(c) == true; }).Count() > 0) {
                        MessageBox.Show("部分船不能出击");
                        return;
                    }
                    ;
                    Dailog.CreatDialog({
                        Title: "选择远征地图", FormNodes: List.From([{
                                Name: "selectedMapID",
                                Type: Dailog.FormNodeType.select,
                                Text: "",
                                Data: _This.Maps
                                    .Select(function (map) { return ({ Name: map.ID.toString().replace("000", "0") + " - " + map.Minute + " - " + map.Resources.JoinToString(" "), Value: map.ID.toString() }); }),
                                Validates: List.From([{ Key: "required", Value: true, Message: "请选择地图" }])
                            }]), OnBuild: function ($modal) {
                            $modal.find("[name='Explorid']").select2();
                        }, OnSubmit: function (fromJsonObj, $modal) {
                            return __awaiter(this, void 0, void 0, function () {
                                var selectedMapID, selectedMap, ships, shipTypes, _loop_2, i, state_2, yuanZhengResult;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            $modal.find("[data-check=save]").attr("disabled", "disabled");
                                            $modal.find("[data-dismiss=modal]").triggerHandler("click");
                                            selectedMapID = fromJsonObj["selectedMapID"].ToNumber();
                                            selectedMap = _This.Maps.FirstOrDefault(function (c) { return c.ID == selectedMapID; });
                                            ships = Player.GetFleetShips(FleetID);
                                            if (ships.Count() < selectedMap.Limit.ShipCount) {
                                                MessageBox.Show("舰船数量不能少于" + selectedMap.Limit.ShipCount + "艘");
                                                return [2];
                                            }
                                            if (ships[0].level < selectedMap.Limit.LeaderLevel) {
                                                MessageBox.Show("旗舰等级不足" + selectedMap.Limit.LeaderLevel + "级");
                                                return [2];
                                            }
                                            shipTypes = ships.Select(function (c) { return Player.GetShipType(c).toString(); });
                                            _loop_2 = function (i) {
                                                var typeLimit = selectedMap.Limit.ShipTypes[i];
                                                if (shipTypes.Where(function (c) { return c == typeLimit.Type; }).Count() < typeLimit.Number) {
                                                    MessageBox.Show("此远征需要" + DBEnum.ENUM_ShipType[typeLimit.Type.ToNumber()] + " " + typeLimit.Number + "艘");
                                                    return { value: void 0 };
                                                }
                                            };
                                            for (i = 0; i < selectedMap.Limit.ShipTypes.Count(); i++) {
                                                state_2 = _loop_2(i);
                                                if (typeof state_2 === "object")
                                                    return [2, state_2.value];
                                            }
                                            return [4, Net.Explore.Start(FleetID, selectedMap.ID)];
                                        case 1:
                                            yuanZhengResult = _a.sent();
                                            if (yuanZhengResult.ErrorCode != 0) {
                                                MessageBox.Show(yuanZhengResult.ErrorMessage);
                                            }
                                            return [2];
                                    }
                                });
                            });
                        }
                    });
                });
                $dockListTemp.find(".cancel ").click(function () {
                    var mapid = $(this).parent().attr("data-mapid").ToNumber();
                    MessageBox.Confirm("确定撤销此远征？", function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var changeResult;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, Net.Explore.Cancel(mapid)];
                                    case 1:
                                        changeResult = _a.sent();
                                        if (changeResult.ErrorCode == 0) {
                                            _This.UpdateView();
                                        }
                                        else {
                                            MessageBox.Show(changeResult.ErrorMessage);
                                        }
                                        return [2];
                                }
                            });
                        });
                    });
                });
            }
        };
        Area_YuanZheng.prototype.BeforeOpen = function () { return true; };
        ;
        Area_YuanZheng.prototype.OnOpen = function () { this.InitUpdateTimer(); };
        ;
        Area_YuanZheng.prototype.OnOpened = function () { };
        ;
        Area_YuanZheng.prototype.BeforeClose = function () { return true; };
        ;
        Area_YuanZheng.prototype.OnClosed = function () { this.UpdateTimer.Dispose(); };
        ;
        return Area_YuanZheng;
    }());
    var Area_DayMission = (function () {
        function Area_DayMission() {
            this.Name = "Area_DayMission";
            this.$Area = $("#PartialAreas .areaPanel_daymission");
            this.IsCurrentPage = false;
            this.UpdateTimer = null;
            this.LastTaskListJsonString = "";
        }
        Area_DayMission.prototype.OnLoad = function () { };
        ;
        Area_DayMission.prototype.InitUpdateTimer = function () {
            var _this = this;
            this.UpdateTimer = new Timer();
            this.UpdateTimer.Interval = 1000;
            this.UpdateTimer.Elapsed = function () {
                _this.UpdateTimer.Stop();
                try {
                    _this.UpdateView();
                }
                catch (ex) {
                }
                finally {
                    _this.UpdateTimer.Start();
                }
            };
            this.UpdateView();
            this.UpdateTimer.Start();
        };
        Area_DayMission.prototype.UpdateView = function () {
            if (this.IsCurrentPage) {
                this.CheckTaskDocks();
            }
        };
        Area_DayMission.prototype.CheckTaskDocks = function () {
            var _This = this;
            var $Area = _This.$Area;
            var TempEntityData = Player.TaskVo.Where(function (c) { return c.issuccess != true; }).Select(function (c) {
                return {
                    title: c.title,
                    desc: _This.GetTaskDesc(c),
                    taskcid: c.taskcid,
                    nextcid: c.nextcid,
                    condition: c.condition,
                    issuccess: c.issuccess,
                    getawardtime: c.getawardtime
                };
            });
            if (_This.LastTaskListJsonString != NJson.Stringify(TempEntityData)) {
                _This.LastTaskListJsonString = NJson.Stringify(TempEntityData);
                var $taskVoListTemp = $(doT.template($Area.find("[data-tempid='taskVoListTemp']").html())(NJson.ObjListToArray(NJson.DeepCopy(TempEntityData))));
                $Area.find(".taskvolists").html("").append($taskVoListTemp);
            }
            ;
        };
        Area_DayMission.prototype.GetTaskDesc = function (task) {
            var desc = task.desc;
            for (var i = 0; i < 10; i++) {
                if (desc.indexOf("^C") >= 0) {
                    desc = desc.replace(desc.substring(desc.indexOf("^C"), desc.indexOf("^C") + 18), "");
                }
            }
            for (var i = 0; i < 10; i++) {
                if (desc.indexOf("[#s") >= 0) {
                    desc = desc.SplitOutEmpty("[#s").Select(function (c) {
                        if (c.indexOf("#n]") > 0) {
                            var shipcid_1 = c.SplitOutEmpty("#n]")[0].ToNumber();
                            var estr = c.SplitOutEmpty("#n]").Count() > 1 ? c.SplitOutEmpty("#n]")[1] : "";
                            return "[" + Config.IniShips.Where(function (sp) { return sp.CID == shipcid_1; }).FirstOrNew().Name + "]" + estr;
                        }
                        else {
                            return c;
                        }
                    }).JoinToString("");
                }
            }
            return desc;
        };
        Area_DayMission.prototype.BeforeOpen = function () { return true; };
        ;
        Area_DayMission.prototype.OnOpen = function () { this.InitUpdateTimer(); };
        ;
        Area_DayMission.prototype.OnOpened = function () { };
        ;
        Area_DayMission.prototype.BeforeClose = function () { return true; };
        ;
        Area_DayMission.prototype.OnClosed = function () { this.UpdateTimer.Dispose(); };
        ;
        return Area_DayMission;
    }());
    var Area_ZhanJi = (function () {
        function Area_ZhanJi() {
            this.Name = "Area_ZhanJi";
            this.$Area = $("#PartialAreas .areaPanel_zhanji");
            this.IsCurrentPage = false;
            this.UpdateTimer = null;
        }
        Area_ZhanJi.prototype.OnLoad = function () {
            this.$Area.find(".lists .rows").html("");
        };
        ;
        Area_ZhanJi.prototype.InitUpdateTimer = function () {
            var _this = this;
            this.UpdateTimer = new Timer();
            this.UpdateTimer.Interval = 1000;
            this.UpdateTimer.Elapsed = function () {
                _this.UpdateTimer.Stop();
                try {
                    _this.UpdateView();
                }
                catch (ex) {
                }
                finally {
                    _this.UpdateTimer.Start();
                }
            };
            this.UpdateView();
            this.UpdateTimer.Start();
        };
        Area_ZhanJi.prototype.UpdateView = function () {
            if (this.IsCurrentPage) {
            }
        };
        Area_ZhanJi.prototype.BeforeOpen = function () { return true; };
        ;
        Area_ZhanJi.prototype.OnOpen = function () {
            var _This = this;
            this.InitUpdateTimer();
            Net.Conditioning.GetRankInfo().then(function (initResult) {
                if (initResult.ErrorCode != 0) {
                    MessageBox.Show(initResult.ErrorMessage);
                }
                else {
                    _This.$Area.find(".exploitRank").hide();
                    _This.BindDestroyRank(initResult.destroyrank);
                    _This.BindHandbookRank(initResult.handbookrank);
                    _This.BindFleetRank(initResult.fleetrank);
                }
            });
        };
        ;
        Area_ZhanJi.prototype.OnOpened = function () { };
        ;
        Area_ZhanJi.prototype.BindExploitRank = function (exploitRank) {
            var _This = this;
            _This.$Area.find(".exploitRank .my .myamount span").html(exploitRank.my.exploit);
            _This.$Area.find(".exploitRank .my .myrank span").html((exploitRank.my.rank == undefined || exploitRank.my.rank == 0) ? "无" : exploitRank.my.rank.toString());
            var rowshtml = "";
            exploitRank.list.ForEach(function (c) {
                rowshtml += "<dl class=\"row\"><dd class=\"w15\">" + c.rank + "</dd><dd class=\"w20\">" + c.exploit + "</dd><dd class=\"w30\">" + c.completetime.split(" ")[0] + "</dd><dd class=\"w35\">" + c.username + "</dd></dl>";
            });
            _This.$Area.find(".exploitRank .lists .rows").html(rowshtml);
        };
        Area_ZhanJi.prototype.BindDestroyRank = function (destroyRank) {
            var _This = this;
            _This.$Area.find(".destroyRank .my .myamount span").html(destroyRank.my.toString());
            var rowshtml = "";
            destroyRank.list.ForEach(function (c) {
                var iniShip = Config.IniShips.FirstOrDefault(function (d) { return d.CID == parseInt(c.shipcid); });
                rowshtml += "<dl class=\"row\"><dd class=\"w15\">" + c.rank + "</dd><dd class=\"w20\">" + c.num + "</dd><dd class=\"w30 lf\">Lv." + c.shiplevel + " " + (iniShip == null ? "" : iniShip.Name) + "</dd><dd class=\"w35\">" + c.username + "</dd > </dl>";
            });
            _This.$Area.find(".destroyRank .lists .rows").html(rowshtml);
        };
        Area_ZhanJi.prototype.BindFleetRank = function (fleetRank) {
            var _This = this;
            _This.$Area.find(".fleetRank .my .myamount span").html(fleetRank.my.num.toString());
            _This.$Area.find(".fleetRank .my .myrank span").html((fleetRank.my.rank == undefined || fleetRank.my.rank == 0) ? "无" : fleetRank.my.rank.toString());
            var rowshtml = "";
            fleetRank.list.ForEach(function (c) {
                rowshtml += "<dl class=\"row\"><dd class=\"w15\">" + c.rank + "</dd><dd class=\"w20\">" + c.num + "</dd><dd class=\"w30\">" + c.level + "</dd><dd class=\"w35\">" + c.username + "</dd></dl>";
            });
            _This.$Area.find(".fleetRank .lists .rows").html(rowshtml);
        };
        Area_ZhanJi.prototype.BindHandbookRank = function (handbookRank) {
            var _This = this;
            _This.$Area.find(".handbookRank .my .myamount span").html(handbookRank.my.num);
            _This.$Area.find(".handbookRank .my .myrank span").html((handbookRank.my.rank == undefined || handbookRank.my.rank == 0) ? "无" : handbookRank.my.rank.toString());
            var rowshtml = "";
            handbookRank.list.ForEach(function (c) {
                rowshtml += "<dl class=\"row\"><dd class=\"w15\">" + c.rank + "</dd><dd class=\"w20\">" + c.num + "</dd><dd class=\"w30\">" + c.completetime.split(" ")[0] + "</dd><dd class=\"w35\">" + c.username + "</dd></dl>";
            });
            _This.$Area.find(".handbookRank .lists .rows").html(rowshtml);
        };
        Area_ZhanJi.prototype.BeforeClose = function () { return true; };
        ;
        Area_ZhanJi.prototype.OnClosed = function () { this.UpdateTimer.Dispose(); };
        ;
        return Area_ZhanJi;
    }());
    var Area_LiaoLi = (function () {
        function Area_LiaoLi() {
            this.Name = "Area_LiaoLi";
            this.$Area = $("#PartialAreas .areaPanel_liaoli");
            this.IsCurrentPage = false;
            this.UpdateTimer = null;
            this.IsFristLoad = false;
            this.CurrentBuff = null;
        }
        Area_LiaoLi.prototype.OnLoad = function () { };
        ;
        Area_LiaoLi.prototype.InitUpdateTimer = function () {
            var _this = this;
            this.UpdateTimer = new Timer();
            this.UpdateTimer.Interval = 1000;
            this.UpdateTimer.Elapsed = function () {
                _this.UpdateTimer.Stop();
                try {
                    _this.UpdateView();
                }
                catch (ex) {
                }
                finally {
                    _this.UpdateTimer.Start();
                }
            };
            this.UpdateView();
            this.UpdateTimer.Start();
        };
        Area_LiaoLi.prototype.UpdateView = function () {
            if (this.IsCurrentPage) {
                this.UpdateProgress();
            }
        };
        Area_LiaoLi.prototype.UpdateProgress = function () {
            var _This = this;
            var nowTimeSpan = NetDate.GetTimeSpanSecound();
            if (_This.CurrentBuff != null && JSON.stringify(_This.CurrentBuff) != "" && _This.CurrentBuff.endtime > nowTimeSpan) {
                var cook = Config.Cookbooks.FirstOrDefault(function (c) { return c.CID == _This.CurrentBuff.cid; });
                if (cook == null) {
                    return;
                }
                else {
                    var sups = Math.ceil((_This.CurrentBuff.endtime - nowTimeSpan) * 100 / cook.EffectTime);
                    _This.$Area.find(".cookbooks .food[data-cid=" + cook.CID + "] .progress-bar").css("width", sups + "%");
                    _This.$Area.find(".cookbooks .food[data-cid!=" + cook.CID + "] .progress-bar").css("width", "0");
                }
            }
            else {
                _This.$Area.find(".cookbooks .food .progress-bar").css("width", "0");
            }
            _This.$Area.find(".cookbooks .food").each(function (findex, fdom) {
                var $food = $(fdom);
                var foodcid = $food.attr("data-cid");
            });
        };
        Area_LiaoLi.prototype.GetDesc = function (desc) {
            for (var i = 0; i < 10; i++) {
                if (desc.indexOf("^C") >= 0) {
                    desc = desc.replace(desc.substring(desc.indexOf("^C"), desc.indexOf("^C") + 18), "");
                }
            }
            for (var i = 0; i < 10; i++) {
                if (desc.indexOf("[#s") >= 0) {
                    desc = desc.SplitOutEmpty("[#s").Select(function (c) {
                        if (c.indexOf("#n]") > 0) {
                            var shipcid_2 = c.SplitOutEmpty("#n]")[0].ToNumber();
                            var estr = c.SplitOutEmpty("#n]").Count() > 1 ? c.SplitOutEmpty("#n]")[1] : "";
                            return "[" + Config.IniShips.Where(function (sp) { return sp.CID == shipcid_2; }).FirstOrNew().Name + "]" + estr;
                        }
                        else {
                            return c;
                        }
                    }).JoinToString("");
                }
            }
            return desc;
        };
        Area_LiaoLi.prototype.BeforeOpen = function () {
            if (this.IsFristLoad == true) {
                return true;
            }
            if (MissionWorker.State != DBEnum.WorkState.Ready) {
                MessageBox.Show("请先停止任务");
                return false;
            }
            if (YanXiWorker.State != DBEnum.WorkState.Ready) {
                MessageBox.Show("请先停止演习");
                return false;
            }
            if (ZhanYiWorker.State != DBEnum.WorkState.Ready) {
                MessageBox.Show("请先停止战役");
                return false;
            }
            if (QueueWorker.State != DBEnum.WorkState.Ready) {
                MessageBox.Show("请先停止队列");
                return false;
            }
            return true;
        };
        ;
        Area_LiaoLi.prototype.OnOpen = function () {
            var _This = this;
            var $Area = _This.$Area;
            this.InitUpdateTimer();
        };
        ;
        Area_LiaoLi.prototype.OnOpened = function () {
            var _This = this;
            var $Area = _This.$Area;
            if (MissionWorker.State == DBEnum.WorkState.Ready && YanXiWorker.State == DBEnum.WorkState.Ready && ZhanYiWorker.State == DBEnum.WorkState.Ready && QueueWorker.State == DBEnum.WorkState.Ready) {
                Net.Live.GetUserInfo().then(function (getInfoResult) {
                    if (getInfoResult.ErrorCode != 0) {
                        MessageBox.Show(getInfoResult.ErrorMessage);
                    }
                    else {
                        _This.CurrentBuff = getInfoResult.buff;
                        Net.Live.GetAddPopularity().then(function (initResult) {
                            if (initResult.ErrorCode != 0) {
                                MessageBox.Show(initResult.ErrorMessage);
                            }
                            else {
                                _This.IsFristLoad = true;
                                var TempEntityData = Config.Cookbooks.Select(function (ck) {
                                    return {
                                        CID: ck.CID,
                                        IsLocked: getInfoResult.cookbook.Contains(ck.CID) == false,
                                        Img: "../Content/Cookbook/cookbook_" + ck.Icon + ".png",
                                        Oil: ck.Oil,
                                        Ammo: ck.Ammo,
                                        Steel: ck.Steel,
                                        Aluminium: ck.Aluminium,
                                        Title: ck.Title,
                                        EffectDesc: _This.GetDesc(ck.EffectDesc),
                                        Desc: ck.Desc
                                    };
                                }).OrderBy(function (c) { return c.IsLocked; });
                                var $Temp = $(doT.template($Area.find("[data-tempid='cookbookListTemp']").html())(NJson.ObjListToArray(TempEntityData)));
                                $Temp.find("a.doliaoli").click(function () {
                                    if (getInfoResult.eattimes >= 3) {
                                        MessageBox.Show("今日次数已用完");
                                        return;
                                    }
                                    if (MissionWorker.State != DBEnum.WorkState.Ready) {
                                        return MessageBox.Show("请先停止任务");
                                    }
                                    if (YanXiWorker.State != DBEnum.WorkState.Ready) {
                                        return MessageBox.Show("请先停止演习");
                                    }
                                    if (ZhanYiWorker.State != DBEnum.WorkState.Ready) {
                                        return MessageBox.Show("请先停止战役");
                                    }
                                    if (QueueWorker.State != DBEnum.WorkState.Ready) {
                                        return MessageBox.Show("请先停止队列");
                                    }
                                    var cid = $(this).parents(".food").eq(0).attr("data-cid");
                                    var food = Config.Cookbooks.FirstOrDefault(function (c) { return c.CID == cid; });
                                    console.log(["food", food]);
                                    MessageBox.Confirm("确定制作料理?", function () {
                                        return __awaiter(this, void 0, void 0, function () {
                                            var CanCook, CanSetShief, CanCookShip, readyShips, chiefShip, changeChiefResult, setCookResult, eatResult;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        CanCook = function (shipid, foodcid) {
                                                            var ship = Player.UserShipVo.FirstOrDefault(function (c) { return c.id == shipid; });
                                                            var ini = Player.GetIniShip(ship);
                                                            var food = Config.Cookbooks.FirstOrDefault(function (c) { return c.CID == foodcid; });
                                                            if (ini == null || (food.Country != 99 && ini.Country != food.Country) || ship == null || ship.cookbook == undefined || ship.cookbook == null || ship.cookbook.Length == undefined || ship.cookbook[0] != foodcid) {
                                                                return false;
                                                            }
                                                            else {
                                                                return true;
                                                            }
                                                        };
                                                        CanSetShief = function (shipid, foodcid) {
                                                            var ship = Player.UserShipVo.FirstOrDefault(function (c) { return c.id == shipid; });
                                                            var ini = Player.GetIniShip(ship);
                                                            var food = Config.Cookbooks.FirstOrDefault(function (c) { return c.CID == foodcid; });
                                                            if (ini == null || (food.Country != 99 && ini.Country != food.Country) || ship == null || ship.cookbook == undefined || ship.cookbook == null || ship.cookbook.Length == undefined) {
                                                                return false;
                                                            }
                                                            else {
                                                                return true;
                                                            }
                                                        };
                                                        CanCookShip = function (ship, foodcid) {
                                                            return CanCook((ship == null || ship == undefined) ? -1 : ship.id, food.CID);
                                                        };
                                                        readyShips = Player.UserShipVo.Where(function (c) { return c.islocked == 1 && Player.GetIniShip(c) != null; });
                                                        chiefShip = readyShips.FirstOrDefault(function (c) { return c.id.toString() == getInfoResult.chief; });
                                                        if (!(CanCookShip(chiefShip, food.CID) == false)) return [3, 3];
                                                        chiefShip = null;
                                                        if (getInfoResult.cookbookproficiency && getInfoResult.cookbookproficiency.Where(function (c) { return c.cid == cid; }).Count() > 0) {
                                                            chiefShip = readyShips.Where(function (c) { return c.id.toString() == getInfoResult.cookbookproficiency.Where(function (c) { return c.cid == cid; }).OrderByDescending(function (c) { return c.cid; }).FirstOrDefault().boat_id.toString(); }).FirstOrDefault();
                                                        }
                                                        chiefShip = chiefShip == null ? readyShips.Where(function (c) { return CanSetShief(c.id, food.CID); }).OrderByDescending(function (c) { return c.level; }).FirstOrDefault() : chiefShip;
                                                        if (chiefShip == null) {
                                                            MessageBox.Show("没有能做该料理的厨师");
                                                            return [2];
                                                        }
                                                        console.log("chiefShip2", chiefShip);
                                                        return [4, Net.Live.SetChief(chiefShip.id)];
                                                    case 1:
                                                        changeChiefResult = _a.sent();
                                                        if (changeChiefResult.ErrorCode != 0 || changeChiefResult.status != 1) {
                                                            MessageBox.Show("设置厨师失败");
                                                            return [2];
                                                        }
                                                        getInfoResult.chief = chiefShip.id.toString();
                                                        if (!(CanCook(chiefShip.id, food.CID) == false)) return [3, 3];
                                                        return [4, Net.Live.SetCookbook(chiefShip.id, food.CID)];
                                                    case 2:
                                                        setCookResult = _a.sent();
                                                        console.log(["SetCookbook", setCookResult]);
                                                        if (setCookResult.ErrorCode != 0) {
                                                            MessageBox.Show("设置料理失败");
                                                            return [2];
                                                        }
                                                        _a.label = 3;
                                                    case 3: return [4, Net.Live.Eat(food.CID)];
                                                    case 4:
                                                        eatResult = _a.sent();
                                                        console.log(eatResult);
                                                        if (eatResult.ErrorCode == 0) {
                                                            _This.CurrentBuff = eatResult.buff;
                                                            getInfoResult.eattimes++;
                                                            MessageBox.Show("料理成功");
                                                            Logs.Print("料理成功 截止到 " + DateTime.ParseTime(eatResult.buff.endtime).ToString("HH:mm:ss").ReplaceAll("/", "-"));
                                                        }
                                                        else {
                                                            MessageBox.Show("料理失败 - " + eatResult.ErrorMessage);
                                                        }
                                                        return [2];
                                                }
                                            });
                                        });
                                    });
                                });
                                _This.$Area.find(".cookbooks").html("").append($Temp);
                            }
                        });
                    }
                });
            }
        };
        ;
        Area_LiaoLi.prototype.BeforeClose = function () {
            this.UpdateTimer.Dispose();
            return true;
        };
        ;
        Area_LiaoLi.prototype.OnClosed = function () {
            this.$Area.find(".cookbooks").html("");
        };
        ;
        return Area_LiaoLi;
    }());
    var Area_XueYuan = (function () {
        function Area_XueYuan() {
            this.Name = "Area_XueYuan";
            this.$Area = $("#PartialAreas .areaPanel_xueyuan");
            this.IsCurrentPage = false;
            this.UpdateTimer = null;
            this.IsFristLoad = false;
            this.ShipTeacher = List.From([{
                    cid: 10000173, title: "艾拉", tactics: List.From([100001740, 100002740, 100003740, 100004740, 100005740, 100006740, 100007740, 100008740])
                }, {
                    cid: 10000273, title: "胜利号", tactics: List.From([100009740, 100010740, 100011740, 100012740, 100013740, 100014740, 100015740, 100016740, 100017740])
                }, {
                    cid: 10000373, title: "阿芙乐尔", tactics: List.From([100018740, 100019740, 100020740, 100021740, 100022740, 100023740, 100024740, 100025740, 100026740])
                }]);
        }
        Area_XueYuan.prototype.OnLoad = function () {
            this.$Area.find(".xueyuandocklists").html("");
        };
        ;
        Area_XueYuan.prototype.BeforeOpen = function () {
            if (this.IsFristLoad == true) {
                return true;
            }
            if (MissionWorker.State != DBEnum.WorkState.Ready) {
                MessageBox.Show("请先停止任务");
                return false;
            }
            if (YanXiWorker.State != DBEnum.WorkState.Ready) {
                MessageBox.Show("请先停止演习");
                return false;
            }
            if (ZhanYiWorker.State != DBEnum.WorkState.Ready) {
                MessageBox.Show("请先停止战役");
                return false;
            }
            if (QueueWorker.State != DBEnum.WorkState.Ready) {
                MessageBox.Show("请先停止队列");
                return false;
            }
            return true;
        };
        Area_XueYuan.prototype.OnOpen = function () {
            var _This = this;
            var $Area = _This.$Area;
        };
        Area_XueYuan.prototype.GetListFromNumber = function (count) {
            var newList = new List();
            for (var i = 0; i < count; i++) {
                newList.Add(i);
            }
            return newList;
        };
        Area_XueYuan.prototype.ReloadTactics = function () {
            var _This = this;
            var $Area = _This.$Area;
            Net.Live.GetTactics().then(function (getTacticsResult) {
                if (getTacticsResult.ErrorCode != 0) {
                    MessageBox.Show(getTacticsResult.ErrorMessage);
                }
                else {
                    _This.IsFristLoad = true;
                    $Area.find(".xueyuandocklists").html("");
                    var teacherlist_1 = getTacticsResult.teacherlist;
                    var _loop_3 = function (roomIndex) {
                        var teacherid = getTacticsResult["teacher" + (roomIndex == 0 ? "" : (roomIndex + 1))].toString();
                        var roomEnityData = {
                            RoomIndex: roomIndex,
                            RoomName: roomIndex == 0 ? "第一教室" : (roomIndex == 1 ? "第二教室" : (roomIndex == 2 ? "第三教室" : (roomIndex == 3 ? "第四教室" : "未知教室"))),
                            TeacherID: teacherid,
                            TeacherName: teacherid == "10000173" ? "艾拉" : (teacherid == "10000273" ? "胜利号" : (teacherid == "10000373" ? "阿芙乐尔" : "未知教官")),
                            TacticsNum: getTacticsResult["tacticsnum" + (roomIndex == 0 ? "" : (roomIndex + 1))].toString().ToNumber(),
                            Seats: _This.GetListFromNumber(getTacticsResult["tacticsnum" + (roomIndex == 0 ? "" : (roomIndex + 1))].toString().ToNumber()).Select(function (seatindex) {
                                var tactic = Player.Tactics.FirstOrDefault(function (c) { return c.classid.toString() == (roomIndex + 1).toString() && c.position.toString() == (seatindex + 1).toString() && c.status.toString() == "1"; });
                                if (tactic == null) {
                                    return {
                                        SeatIndex: seatindex,
                                        ShipID: 0,
                                        Name: "",
                                        Level: 0,
                                        ShipImg: "",
                                        ShipBackImg: "",
                                        TacticsCID: "",
                                        TacticsTitle: "",
                                        TacticsExp: 0,
                                        TacticsMaxExp: "",
                                        TacticsLevel: 0,
                                    };
                                }
                                else {
                                    var ship = Player.GetShip(tactic.boat_id);
                                    var iniShip = Player.GetIniShip(ship);
                                    var iniTactic = Config.ShipTactics.FirstOrDefault(function (c) { return c.TacticsID == tactic.tactics_id; });
                                    return {
                                        SeatIndex: seatindex,
                                        ShipID: ship.id,
                                        Name: iniShip == null ? "未知" : iniShip.Name,
                                        Level: ship.level,
                                        ShipImg: ModalShower.GetShipPic(iniShip, ship.skin_cid),
                                        ShipBackImg: ModalShower.GetShipBackPic(iniShip),
                                        TacticsCID: tactic.cid,
                                        TacticsTitle: iniTactic.Title,
                                        TacticsExp: tactic.exp,
                                        TacticsMaxExp: iniTactic.LevelExp.Count() > tactic.level ? iniTactic.LevelExp[tactic.level] : "-",
                                        TacticsLevel: tactic.level,
                                    };
                                }
                            }),
                        };
                        var $Temp = $(doT.template($Area.find("[data-tempid='xueYuanDockListTemp']").html())(NJson.ObjListToArray([roomEnityData])));
                        $Temp.find(".bd .img").each(function (i, dom) {
                            var $bdimg = $(dom);
                            var bimg = $bdimg.attr("data-bimg");
                            if (bimg) {
                                var imgPath = bimg.indexOf("http") >= 0 ? bimg : (api.wgtRootDir.replace("file:", "contents:") + bimg.substring(2, bimg.length));
                                $bdimg.css("background", "url(" + imgPath + ")").css("background-size", "100% 100%");
                            }
                        });
                        $Area.find(".xueyuandocklists").append($Temp);
                        $Temp.find(".teacher .changeTeacher,.teacher [data-vmodal=teacherName]").click(function () {
                            var SupTeachers = teacherlist_1.Where(function (c) { return getTacticsResult.teacher.toString() != c.toString() && getTacticsResult.teacher2.toString() != c.toString(); });
                            if (SupTeachers.Count() == 0) {
                                MessageBox.Show("当前没有剩余可用的教官！");
                                return;
                            }
                            var rIndex = $(this).parents(".classroom").eq(0).attr("data-roomindex").ToNumber();
                            Dailog.CreatDialog({
                                Title: "选择教官", FormNodes: List.From([{
                                        Name: "TeacherID",
                                        Type: Dailog.FormNodeType.select,
                                        Text: "",
                                        Value: "",
                                        Data: SupTeachers.Select(function (c) { return ({ Name: c.toString() == "10000173" ? "艾拉" : (c.toString() == "10000273" ? "胜利号" : (c.toString() == "10000373" ? "阿芙乐尔" : "未知教官")), Value: c.toString() }); }),
                                        Validates: List.From([{ Key: "required", Value: true, Message: "请选择教官" }])
                                    }]), OnBuild: function ($modal) {
                                }, OnSubmit: function (fromJsonObj, $modal) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var TeacherID, setResult;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    $modal.find("[data-check=save]").attr("disabled", "disabled");
                                                    $modal.find("[data-dismiss=modal]").triggerHandler("click");
                                                    TeacherID = fromJsonObj.TeacherID.ToNumber();
                                                    return [4, Net.Live.SetTeacher(TeacherID, rIndex + 1)];
                                                case 1:
                                                    setResult = _a.sent();
                                                    if (setResult.ErrorCode == 0) {
                                                        _This.ReloadTactics();
                                                    }
                                                    else {
                                                        MessageBox.Show(setResult.ErrorMessage);
                                                    }
                                                    return [2];
                                            }
                                        });
                                    });
                                }
                            });
                        });
                        $Temp.find(".seat .cancel").click(function () {
                            if (MissionWorker.State != DBEnum.WorkState.Ready) {
                                MessageBox.Show("请先停止任务");
                                return false;
                            }
                            if (YanXiWorker.State != DBEnum.WorkState.Ready) {
                                MessageBox.Show("请先停止演习");
                                return false;
                            }
                            if (ZhanYiWorker.State != DBEnum.WorkState.Ready) {
                                MessageBox.Show("请先停止战役");
                                return false;
                            }
                            if (QueueWorker.State != DBEnum.WorkState.Ready) {
                                MessageBox.Show("请先停止队列");
                                return false;
                            }
                            var shipid = $(this).parents(".shipcell").attr("data-id").ToNumber();
                            var tacticscid = $(this).parents(".shipcell").attr("data-tacticscid").ToNumber();
                            var seatIndex = $(this).parents(".seat").attr("data-seatindex").ToNumber();
                            var rIndex = $(this).parents(".classroom").attr("data-roomindex").ToNumber();
                            MessageBox.Confirm("确定中断课程？核心不会反还！", function () {
                                return __awaiter(this, void 0, void 0, function () {
                                    var studyResult;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4, Net.Live.StudyTactics(shipid, tacticscid, seatIndex + 1, rIndex + 1)];
                                            case 1:
                                                studyResult = _a.sent();
                                                if (studyResult.ErrorCode == 0) {
                                                    _This.ReloadTactics();
                                                }
                                                else {
                                                    MessageBox.Show(studyResult.ErrorMessage);
                                                }
                                                return [2];
                                        }
                                    });
                                });
                            });
                        });
                        $Temp.find(".seat .picker").click(function () {
                            if (MissionWorker.State != DBEnum.WorkState.Ready) {
                                MessageBox.Show("请先停止任务");
                                return false;
                            }
                            if (YanXiWorker.State != DBEnum.WorkState.Ready) {
                                MessageBox.Show("请先停止演习");
                                return false;
                            }
                            if (ZhanYiWorker.State != DBEnum.WorkState.Ready) {
                                MessageBox.Show("请先停止战役");
                                return false;
                            }
                            if (QueueWorker.State != DBEnum.WorkState.Ready) {
                                MessageBox.Show("请先停止队列");
                                return false;
                            }
                            var teacherid = $(this).parents(".classroom").attr("data-teacherid").ToNumber();
                            var canLearn = _This.ShipTeacher.FirstOrDefault(function (c) { return c.cid == teacherid; }) == null ? new List() : _This.ShipTeacher.FirstOrDefault(function (c) { return c.cid == teacherid; }).tactics;
                            var seatIndex = $(this).parents(".seat").attr("data-seatindex").ToNumber();
                            var rIndex = $(this).parents(".classroom").attr("data-roomindex").ToNumber();
                            Dailog.CreatDialog({
                                Title: "选择技能", FormNodes: List.From([{
                                        Name: "TacticsID",
                                        Type: Dailog.FormNodeType.select,
                                        Text: "",
                                        Value: "",
                                        Data: canLearn.Select(function (c) { return ({ Name: Config.ShipTactics.FirstOrDefault(function (d) { return d.TacticsID == c.toString().substring(0, 8).ToNumber(); }) == null ? "未知" : Config.ShipTactics.FirstOrDefault(function (d) { return d.TacticsID == c.toString().substring(0, 8).ToNumber(); }).Title, Value: c.toString() }); }),
                                        Validates: List.From([{ Key: "required", Value: true, Message: "请选择技能" }])
                                    }]), OnBuild: function ($modal) {
                                }, OnSubmit: function (fromJsonObj, $modal) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var TacticsID, tactics, limitTypes, hasThisTacShipids;
                                        return __generator(this, function (_a) {
                                            $modal.find("[data-check=save]").attr("disabled", "disabled");
                                            $modal.find("[data-dismiss=modal]").triggerHandler("click");
                                            TacticsID = fromJsonObj.TacticsID.ToNumber();
                                            tactics = Config.ShipTactics.FirstOrDefault(function (d) { return d.TacticsID == TacticsID.toString().substring(0, 8).ToNumber(); });
                                            limitTypes = new List();
                                            if (tactics.ShipTon == 0) {
                                                limitTypes = List.From([DBEnum.ENUM_ShipType.航母, DBEnum.ENUM_ShipType.轻母, DBEnum.ENUM_ShipType.装母, DBEnum.ENUM_ShipType.战列, DBEnum.ENUM_ShipType.航战, DBEnum.ENUM_ShipType.战巡, DBEnum.ENUM_ShipType.重巡, DBEnum.ENUM_ShipType.航巡, DBEnum.ENUM_ShipType.雷巡, DBEnum.ENUM_ShipType.轻巡, DBEnum.ENUM_ShipType.重炮, DBEnum.ENUM_ShipType.驱逐, DBEnum.ENUM_ShipType.潜母, DBEnum.ENUM_ShipType.潜艇, DBEnum.ENUM_ShipType.炮潜, DBEnum.ENUM_ShipType.补给, DBEnum.ENUM_ShipType.导驱]);
                                            }
                                            if (tactics.ShipTon == 1) {
                                                limitTypes = List.From([DBEnum.ENUM_ShipType.驱逐, DBEnum.ENUM_ShipType.导驱, DBEnum.ENUM_ShipType.潜艇, DBEnum.ENUM_ShipType.炮潜, DBEnum.ENUM_ShipType.重炮, DBEnum.ENUM_ShipType.补给]);
                                            }
                                            if (tactics.ShipTon == 2) {
                                                limitTypes = List.From([DBEnum.ENUM_ShipType.轻巡, DBEnum.ENUM_ShipType.重巡, DBEnum.ENUM_ShipType.雷巡, DBEnum.ENUM_ShipType.航巡, DBEnum.ENUM_ShipType.轻母]);
                                            }
                                            if (tactics.ShipTon == 3) {
                                                limitTypes = List.From([DBEnum.ENUM_ShipType.战列, DBEnum.ENUM_ShipType.航战, DBEnum.ENUM_ShipType.战巡, DBEnum.ENUM_ShipType.航母, DBEnum.ENUM_ShipType.装母]);
                                            }
                                            hasThisTacShipids = new List();
                                            try {
                                                Player.UserShipVo.ForEach(function (ship) {
                                                    var shipTactics = List.From([ship.tactics[1].toString().ToNumber() > 0 ? ship.tactics[1].toString().ToNumber() : 0, ship.tactics[2].toString().ToNumber() > 0 ? ship.tactics[2].toString().ToNumber() : 0, ship.tactics[3].toString().ToNumber() > 0 ? ship.tactics[3].toString().ToNumber() : 0]);
                                                    if (shipTactics.Contains(tactics.TacticsID.toString().ToNumber())) {
                                                        hasThisTacShipids.Add(ship.id);
                                                    }
                                                });
                                            }
                                            catch (_b) { }
                                            ModalShower.SlideShipPickerQuick(function (c) { return Player.IsBusyShip(c) == false && c.level >= tactics.NeedLevel && limitTypes.Contains(Player.GetShipType(c)) && hasThisTacShipids.Contains(c.id) == false; }, function (ships, isRange) {
                                                return true;
                                            }, function (ships, isRange) {
                                                return __awaiter(this, void 0, void 0, function () {
                                                    var setResult;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0: return [4, Net.Live.StudyTactics(ships[0], TacticsID, seatIndex + 1, rIndex + 1)];
                                                            case 1:
                                                                setResult = _a.sent();
                                                                if (setResult.ErrorCode == 0) {
                                                                    _This.ReloadTactics();
                                                                }
                                                                else {
                                                                    MessageBox.Show(setResult.ErrorMessage);
                                                                }
                                                                return [2];
                                                        }
                                                    });
                                                });
                                            }, new List(), 1, 1);
                                            return [2];
                                        });
                                    });
                                }
                            });
                        });
                        $Temp.find(".seat .shipcell .name,.seat .shipcell .level").click(function () {
                            var shipid = $(this).parents(".shipcell").eq(0).attr("data-id").ToNumber();
                            ModalShower.ShowShipDetail(shipid);
                        });
                    };
                    for (var roomIndex = 0; roomIndex < getTacticsResult.classnum.toString().ToNumber(); roomIndex++) {
                        _loop_3(roomIndex);
                    }
                }
            });
        };
        Area_XueYuan.prototype.OnOpened = function () {
            var _This = this;
            var $Area = _This.$Area;
            if (!(MissionWorker.State == DBEnum.WorkState.Ready && YanXiWorker.State == DBEnum.WorkState.Ready && ZhanYiWorker.State == DBEnum.WorkState.Ready && QueueWorker.State == DBEnum.WorkState.Ready)) {
                return;
            }
            this.ReloadTactics();
        };
        Area_XueYuan.prototype.BeforeClose = function () {
            return true;
        };
        ;
        Area_XueYuan.prototype.OnClosed = function () {
        };
        ;
        return Area_XueYuan;
    }());
    var Area_Shipdocks = (function () {
        function Area_Shipdocks() {
            this.Name = "Area_Shipdocks";
            this.$Area = $("#PartialAreas .areaPanel_shipdocks");
            this.IsCurrentPage = false;
            this.UpdateTimer = null;
            this.PageIndex = 0;
            this.PageSize = 0;
            this.TotalCount = 0;
            this.PageCount = 0;
            this.FilterDicts = { SearchString: "", OrderByName: "", Desc: "", Filter_ShipType: "" };
            this.ListShips = new List();
        }
        Area_Shipdocks.prototype.OnLoad = function () {
            var _This = this;
            var $Area = _This.$Area;
            for (var i = 0; i < 30; i++) {
                if (DBEnum.ENUM_ShipType[i]) {
                    $Area.find(".filterBar .enumlist.shiptype dl").append('<dd data-value="' + i + '"> <span class="name">' + DBEnum.ENUM_ShipType[i] + '</span><i class="fa fa-check"></i></dd>');
                }
            }
            $Area.find("[data-action='search']").click(function () {
                var searchValue = $Area.find("#SerachText").val();
                _This.Reload({ SearchString: searchValue });
            });
            $Area.find(".filterBar > .filter[data-filter]").each(function () {
                var $Filter = $(this);
                $Filter.find(".enumlist dl dd").click(function () {
                    if ($(this).parent().attr("data-multiple") != "1") {
                        $Filter.find(".enumlist dl dd").removeClass("selected");
                    }
                    $(this).toggleClass("selected");
                });
                $Filter.find(".enumlist .actions .reset").click(function () {
                    $(this).parents(".filter").eq(0).find("dd.selected").removeClass("selected");
                });
                $Filter.children("label,.order").click(function () {
                    $Filter.children(".enumlist").toggle().parents(".filter").siblings(".filter[data-filter]").children(".enumlist").hide();
                    if ($Filter.find(".order .fa").hasClass("fa-caret-down")) {
                        $Filter.find(".order .fa").removeClass("fa-caret-down").addClass("fa-caret-up");
                    }
                    else {
                        $Filter.find(".order .fa").removeClass("fa-caret-up").addClass("fa-caret-down");
                    }
                    var filterName = $(this).attr("data-filter");
                });
                $Filter.find(".enumlist .actions .submit").click(function () {
                    var selectFilterName = $(this).parents(".filter").eq(0).attr("data-filter");
                    var selectedValues = List.From($(this).parents(".filter").eq(0).find("dd.selected").toArray()).Select(function (c) { return $(c).attr("data-value"); });
                    $Filter.children(".enumlist").hide();
                    var querystring = {};
                    querystring["Filter_" + selectFilterName] = selectedValues.JoinToString(",");
                    if (selectedValues.Count() == 0) {
                        $Filter.removeClass("active");
                        _This.Reload(querystring);
                    }
                    else {
                        $Filter.addClass("active");
                        _This.Reload(querystring);
                    }
                });
            });
            $Area.find(".filterBar > .filter[data-ordername]").click(function () {
                var OrderByName = $(this).attr("data-ordername");
                var currentOrder = $(this).hasClass("desc") ? "DESC" : "ASC";
                $Area.find(".filterBar .filter[data-ordername]").removeClass("active").removeClass("asc").removeClass("desc");
                $(this).addClass("active");
                $(this).removeClass("asc").removeClass("desc").addClass(currentOrder == "DESC" ? "asc" : "desc");
                _This.Reload({ OrderByName: OrderByName, Desc: currentOrder == "ASC" ? 1 : 0 });
            });
            var LoadMore = {};
            $Area.find(".shiplist").scroll(function (e) {
                LoadMore.Direction = LoadMore.PrevScrollTop < $(this).scrollTop() ? "Down" : "Up";
                LoadMore.PrevScrollTop = LoadMore.CurrentScrollTop = $(this).scrollTop();
                if (LoadMore.IsLoading == true) {
                    return false;
                }
                var viewH = $(this).height();
                var contextH = $(this).get(0).scrollHeight;
                if (contextH / (viewH + LoadMore.CurrentScrollTop) <= 1.3) {
                    LoadMore.IsLoading = true;
                    _This.LoadMore();
                    LoadMore.IsLoading = false;
                }
            });
        };
        ;
        Area_Shipdocks.prototype.InitUpdateTimer = function () {
            var _this = this;
            this.UpdateTimer = new Timer();
            this.UpdateTimer.Interval = 1000;
            this.UpdateTimer.Elapsed = function () {
                _this.UpdateTimer.Stop();
                try {
                    _this.UpdateView();
                }
                catch (ex) {
                }
                finally {
                    _this.UpdateTimer.Start();
                }
            };
            this.UpdateView();
            this.UpdateTimer.Start();
        };
        Area_Shipdocks.prototype.UpdateView = function () {
            if (this.IsCurrentPage) {
                this.CheckUpdateShips();
            }
        };
        Area_Shipdocks.prototype.CheckUpdateShips = function () {
            var _This = this;
            var $Area = _This.$Area;
            _This.ListShips.ForEach(function (c, index) {
                var ship = Player.GetShip(c[0]);
                var data = _This.GetShipCellEntity(ship);
                var newString = NJson.Stringify(data);
                if (newString != c[1]) {
                    c[1] = newString;
                    var $Temp = $(doT.template($Area.find("[data-tempid='shipListTemp']").html())({ LowEffect: SysLocalStorage.Get("LowEffect"), Ships: NJson.ObjListToArray([data]) }));
                    _This.BindTempEvent($Temp);
                    var $old = $Area.find(".shiplist .shipcell[data-id=" + c[0] + "]");
                    $old.after($Temp);
                    $old.remove();
                }
            });
        };
        Area_Shipdocks.prototype.BindTempEvent = function ($Temp) {
            var _This = this;
            var $Area = this.$Area;
            $Temp.find(".bd img").error(function () {
                $(this).remove();
            });
            $Temp.find(".bd .img").each(function (i, dom) {
                var $bdimg = $(dom);
                var bimg = $bdimg.attr("data-bimg");
                if (bimg) {
                    var imgPath = bimg.indexOf("http") >= 0 ? bimg : (api.wgtRootDir.replace("file:", "contents:") + bimg.substring(2, bimg.length));
                    $bdimg.css("background", "url(" + imgPath + ")").css("background-size", "100% 100%");
                }
            });
            $Temp.find(".equipments .equipcell").each(function (i, dom) {
                var $bdimg = $(dom);
                var bimg = $bdimg.attr("data-bimg");
                if (bimg) {
                    var imgPath = bimg.indexOf("http") >= 0 ? bimg : (api.wgtRootDir.replace("file:", "contents:") + bimg.substring(2, bimg.length));
                    $bdimg.css("background", "url(" + imgPath + ")").css("background-size", "100% 100%");
                }
            });
            $Temp.find(".bd img, .name, .level").click(function () {
                var shipid = $(this).parents(".shipcell").eq(0).attr("data-id").ToNumber();
                ModalShower.ShowShipDetail(shipid);
                $(".modal_areaPanel_shipdocks .equipments").remove();
            });
            $Temp.find(".equipments [data-action^=modifyEquipment]").click(function () {
                var ShipID = $(this).parents(".shipcell").eq(0).attr("data-id").ToNumber();
                var EqIndex = $(this).attr("data-action").split("|")[1].ToNumber();
                var OldEqCID = $(this).attr("data-action").split("|")[2].ToNumber();
                var ship = Player.GetShip(ShipID);
                if (Player.IsYuanZhangShip(ship) || Player.IsMissionShip(ship) || Player.IsZhuShouShip(ship)) {
                    MessageBox.Show("该舰船当前不能更改装备");
                    return;
                }
                var withOutEquipmentIds = Player.EquipmentVO.Where(function (c) {
                    if (c.num <= 0)
                        return true;
                    if (c.equipmentcid == OldEqCID)
                        return true;
                    var ini = Player.GetIniEquipment(c.equipmentcid);
                    if (ini == null)
                        return true;
                    if (ini.ShipCID.Count() > 0 && !ini.ShipCID.Contains(ship.shipcid.toString()))
                        return true;
                    return !ini.ShipType.Contains(Player.GetShipType(ship));
                }).Select(function (c) { return c.equipmentcid; });
                ModalShower.SlideEquipPicker(Player.EquipmentVO.Where(function (c) { return !(withOutEquipmentIds.Contains(c.equipmentcid)); }), function (equipcid) {
                    return __awaiter(this, void 0, void 0, function () {
                        var changeResult, _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!(equipcid == 0)) return [3, 2];
                                    return [4, Net.Conditioning.RemoveEquipment(ship.id, EqIndex)];
                                case 1:
                                    _a = _b.sent();
                                    return [3, 4];
                                case 2: return [4, Net.Conditioning.ChangeEquipment(ship.id, equipcid, EqIndex)];
                                case 3:
                                    _a = _b.sent();
                                    _b.label = 4;
                                case 4:
                                    changeResult = _a;
                                    if (changeResult.ErrorCode != 0) {
                                        MessageBox.Show(changeResult.ErrorMessage);
                                    }
                                    else {
                                        _This.CheckUpdateShips();
                                    }
                                    return [2];
                            }
                        });
                    });
                }, OldEqCID != 0);
            });
        };
        Area_Shipdocks.prototype.Reload = function (querystring) {
            var _This = this;
            querystring = querystring ? querystring : {};
            querystring.PageIndex = querystring.PageIndex ? querystring.PageIndex : 1;
            querystring.PageSize = querystring.PageSize ? querystring.PageSize : 12;
            _This.PageIndex = querystring.PageIndex;
            _This.PageSize = querystring.PageSize;
            for (var key in _This.FilterDicts) {
                if (querystring[key] != undefined) {
                    _This.FilterDicts[key] = querystring[key];
                }
                else {
                    querystring[key] = _This.FilterDicts[key];
                }
            }
            ;
            querystring.Skip = (querystring.PageIndex - 1) * querystring.PageSize;
            querystring.Take = querystring.PageSize;
            if (querystring.Action == "Reload") {
                querystring.Skip = 0;
                querystring.Take = querystring.PageIndex * querystring.PageSize;
            }
            var loadResult = _This.ReLoadTemp(querystring);
            var $Temp = loadResult[0].filter(".shipcell");
            var tempData = loadResult[1];
            if (querystring.Action == "LoadMore") {
                _This.ListShips.AddRange(List.From($Temp.toArray()).Select(function (c) {
                    var id = $(c).attr("data-id").ToNumber();
                    var data = tempData.FirstOrDefault(function (c) { return c.ID == id; });
                    return [id, NJson.Stringify(data)];
                }));
                _This.$Area.find(".shiplist").append($Temp);
            }
            else {
                _This.ListShips = new List();
                _This.ListShips.AddRange(List.From($Temp.toArray()).Select(function (c) {
                    var id = $(c).attr("data-id").ToNumber();
                    var data = tempData.FirstOrDefault(function (c) { return c.ID == id; });
                    return [id, NJson.Stringify(data)];
                }));
                _This.$Area.find(".shiplist").html("").append($Temp);
            }
        };
        Area_Shipdocks.prototype.LoadMore = function () {
            var _This = this;
            if (_This.PageIndex < _This.PageCount) {
                _This.Reload({ Action: "LoadMore", PageIndex: (_This.PageIndex + 1) });
            }
        };
        Area_Shipdocks.prototype.GetShipCellEntity = function (ship) {
            var _This = this;
            var iniShip = Player.GetIniShip(ship);
            return {
                ID: ship.id,
                Name: iniShip == null ? "未知" : iniShip.Name,
                Level: ship.level,
                Type: iniShip == null ? "未知" : DBEnum.ENUM_ShipType[iniShip.Type],
                TypeNum: iniShip == null ? 0 : iniShip.Type,
                CID: ship.shipcid,
                State: Player.GetShipStateContext(ship),
                IsLocked: ship.islocked,
                Married: ship.married,
                FleetID: ship.fleetid,
                Star: iniShip == null ? 0 : iniShip.Star,
                PicID: iniShip == null ? "" : iniShip.PicId,
                ShipImg: ModalShower.GetShipPic(iniShip, ship.skin_cid),
                ShipBackImg: ModalShower.GetShipBackPic(iniShip),
                Equipment: ship.equipmentarr.Select(function (c) {
                    var eq = Player.GetIniEquipment(c);
                    return eq == null ? { CID: 0, Title: "", EquipImg: "", EquipBackImg: "" } : { CID: eq.CID, Title: eq.Title, EquipImg: ModalShower.GetEquipPic(eq), EquipBackImg: ModalShower.GetEquipBackPic(eq) };
                }),
                Create_time: ship.create_time,
            };
        };
        Area_Shipdocks.prototype.ReLoadTemp = function (querystring) {
            var _This = this;
            var $Area = _This.$Area;
            var TempEntityData = Player.UserShipVo.Select(function (ship) { return _This.GetShipCellEntity(ship); }).OrderByDescending(function (c) { return c.Level; }).ThenBy(function (c) { return c.ID; });
            if (querystring.SearchString) {
                TempEntityData = TempEntityData.Where(function (c) { return c.Name.indexOf(querystring.SearchString) >= 0 || c.Equipment.Where(function (c) { return c.Title.indexOf(querystring.SearchString) >= 0; }).Count() > 0; });
            }
            if (querystring.Filter_ShipType) {
                var types_1 = querystring.Filter_ShipType.split(',');
                TempEntityData = TempEntityData.Where(function (c) { return types_1.indexOf(c.TypeNum.toString()) >= 0; });
            }
            if (querystring.OrderByName) {
                if (querystring.Desc == 1) {
                    TempEntityData = TempEntityData.OrderByDescending(function (c) { return c[querystring.OrderByName]; });
                }
                else {
                    TempEntityData = TempEntityData.OrderBy(function (c) { return c[querystring.OrderByName]; });
                }
            }
            else {
                TempEntityData = TempEntityData.OrderByDescending(function (c) { return c.Level; }).ThenBy(function (c) { return c.Create_time; });
            }
            var PageIndex = querystring.PageIndex ? querystring.PageIndex : 1;
            var PageSize = querystring.PageSize ? querystring.PageSize : 12;
            _This.PageIndex = PageIndex;
            _This.PageSize = PageSize;
            _This.TotalCount = TempEntityData.Count();
            _This.PageCount = Math.floor(_This.TotalCount / _This.PageSize) + (_This.TotalCount % PageSize > 0 ? 1 : 0);
            TempEntityData = TempEntityData.Skip(querystring.Skip).Take(querystring.Take);
            var $Temp = $(doT.template($Area.find("[data-tempid='shipListTemp']").html())({ LowEffect: SysLocalStorage.Get("LowEffect"), Ships: NJson.ObjListToArray(TempEntityData) }));
            _This.BindTempEvent($Temp);
            return [$Temp, TempEntityData];
        };
        Area_Shipdocks.prototype.BeforeOpen = function () { return true; };
        ;
        Area_Shipdocks.prototype.OnOpen = function () {
        };
        ;
        Area_Shipdocks.prototype.OnOpened = function () { this.Reload({}); this.InitUpdateTimer(); };
        ;
        Area_Shipdocks.prototype.BeforeClose = function () { return true; };
        ;
        Area_Shipdocks.prototype.OnClosed = function () {
            var _This = this;
            this.UpdateTimer.Dispose();
            setTimeout(function () {
                if (_This.IsCurrentPage == false) {
                    _This.$Area.find(".shiplist").html("");
                }
            }, 1000);
        };
        ;
        return Area_Shipdocks;
    }());
    var Area_ShipTuJian = (function () {
        function Area_ShipTuJian() {
            this.Name = "Area_ShipTuJian";
            this.$Area = $("#PartialAreas .areaPanel_shiptujian");
            this.IsCurrentPage = false;
            this.UpdateTimer = null;
        }
        Area_ShipTuJian.prototype.OnLoad = function () {
            var _This = this;
            var $Area = _This.$Area;
            $Area.find("#ckBox_OnlyShowOwn").click(function () {
                $Area.find(".shiplist").toggleClass("onlyShowOwn");
            });
            $Area.find("#ckBox_OnlyShowLocked").click(function () {
                $Area.find(".shiplist").toggleClass("onlyShowLocked");
            });
        };
        ;
        Area_ShipTuJian.prototype.BindTempEvent = function ($Temp) {
            var _This = this;
            var $Area = this.$Area;
            $Temp.find(".bd img").error(function () {
                $(this).remove();
            });
            $Temp.find("[data-action^='ToggleLock']").click(function () {
                var $Cell = $(this).parents(".shipcell").eq(0);
                var ForcelockCIDS = Config.PlayerConfig.ForcelockCIDS;
                var shipcid = $Cell.attr("data-cid").ToNumber();
                var isLocked = $Cell.attr("data-islock");
                if (isLocked == "1") {
                    $Cell.find(".forcelock .fa").removeClass("fa-lock").addClass("fa-unlock");
                    $Cell.find(".status").html("");
                    $Cell.attr("data-islock", "0");
                    $Cell.removeClass("locked");
                    ForcelockCIDS.Remove(shipcid);
                }
                else {
                    $Cell.find(".forcelock .fa").removeClass("fa-unlock").addClass("fa-lock");
                    $Cell.find(".status").html("已加锁");
                    $Cell.attr("data-islock", "1");
                    $Cell.addClass("locked");
                    ForcelockCIDS.Add(shipcid);
                }
            });
            $Temp.find(".img").click(function () {
                var $Cell = $(this).parents(".shipcell").eq(0);
                var shipcid = $Cell.attr("data-cid").ToNumber();
                Dailog.CreatDialog({
                    Title: Config.IniShips.FirstOrDefault(function (c) { return c.CID == shipcid; }).Name,
                    FormNodes: List.From([]),
                    AnimateIn: "zoomIn",
                    AnimateOut: "zoomOut",
                    OnBuild: function ($modal) {
                        $modal.find(".modal-title").append(" <i class=\"fa fa-lightbulb-o\"></i>");
                        $modal.find(".modal-footer").remove();
                        $modal.find(".modal-dialog").css("animation-duration", "0.6s");
                        $modal.find(".modal-body").css({ "margin-bottom": "2vw" });
                        $modal.addClass("modal_areaPanel_shipdrap");
                        var shipDrap = MainPage.DesShipDrap.FirstOrDefault(function (c) { return c.CID == shipcid; });
                        var $Buildlist = $("<div class=\"buildlist\"><h2>\u5EFA\u9020\u4FE1\u606F</h2></div>").appendTo($modal.find(".modal-body"));
                        if (shipDrap.CanBuild == 1) {
                            $Buildlist.append("<label class=\"canbuild\">\u53EF\u5EFA\u9020</label>");
                            if (shipDrap.Builds.Count() > 0) {
                                var dts = shipDrap.Builds[0].SplitOutEmpty("_");
                                $Buildlist.append("<div class=\"info\"><dl class=\"cost\"><span>\u6CB9 " + dts[0] + "</span><span>\u5F39 " + dts[1] + "</span><span>\u94A2 " + dts[2] + "</span><span>\u94DD " + dts[3] + "</span></dl><label class=\"percent\">" + Math.floor(dts[3].ToNumber() / 100 * 100) / 100 + "%</label></div>");
                            }
                        }
                        else {
                            $Buildlist.append("<label class=\"canbuild\">\u4E0D\u53EF\u5EFA\u9020</label>");
                        }
                        var $Draplist = $("<div class=\"draplist\"><h2>\u6389\u843D\u4FE1\u606F</h2></div>").appendTo($modal.find(".modal-body"));
                        shipDrap.Draps1.ForEach(function (c) {
                            var map = PVEMap.Maps.MapDict.FirstOrDefault(function (d) { return d.ChallengeID == c.SplitOutEmpty("_")[0].substring(0, 3); });
                            if (map == null)
                                return;
                            var nodeName = ["-", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"][c.SplitOutEmpty("_")[0].substring(3, c.SplitOutEmpty("_")[0].length).ToNumber() - 1];
                            $Draplist.append("<div class=\"drap\"><label class=\"map\">" + map.MapName + "</label><label class=\"node\"><span>" + nodeName + "</span>\u70B9</label><label class=\"resulttype\">SS \u80DC</label><label class=\"ratio\">" + c.SplitOutEmpty("_")[1] + "%</label></div>");
                        });
                        if (shipDrap.Draps2.Count() > 0) {
                            $Draplist.append("<div class='split'></div>");
                        }
                        shipDrap.Draps2.ForEach(function (c) {
                            var map = PVEMap.Maps.MapDict.FirstOrDefault(function (d) { return d.ChallengeID == c.SplitOutEmpty("_")[0].substring(0, 3); });
                            if (map == null)
                                return;
                            var nodeName = ["-", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"][c.SplitOutEmpty("_")[0].substring(3, c.SplitOutEmpty("_")[0].length).ToNumber() - 1];
                            $Draplist.append("<div class=\"drap\"><label class=\"map\">" + map.MapName + "</label><label class=\"node\"><span>" + nodeName + "</span>\u70B9</label><label class=\"resulttype\">S \u80DC</label><label class=\"ratio\">" + c.SplitOutEmpty("_")[1] + "%</label></div>");
                        });
                        if (shipDrap.Draps3.Count() > 0) {
                            $Draplist.append("<div class='split'></div>");
                        }
                        shipDrap.Draps3.ForEach(function (c) {
                            var map = PVEMap.Maps.MapDict.FirstOrDefault(function (d) { return d.ChallengeID == c.SplitOutEmpty("_")[0].substring(0, 3); });
                            if (map == null)
                                return;
                            var nodeName = ["-", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"][c.SplitOutEmpty("_")[0].substring(3, c.SplitOutEmpty("_")[0].length).ToNumber() - 1];
                            $Draplist.append("<div class=\"drap\"><label class=\"map\">" + map.MapName + "</label><label class=\"node\"><span>" + nodeName + "</span>\u70B9</label><label class=\"resulttype\">A \u80DC</label><label class=\"ratio\">" + c.SplitOutEmpty("_")[1] + "%</label></div>");
                        });
                        if (shipDrap.Draps4.Count() > 0) {
                            $Draplist.append("<div class='split'></div>");
                        }
                        shipDrap.Draps4.ForEach(function (c) {
                            var map = PVEMap.Maps.MapDict.FirstOrDefault(function (d) { return d.ChallengeID == c.SplitOutEmpty("_")[0].substring(0, 3); });
                            if (map == null)
                                return;
                            var nodeName = ["-", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"][c.SplitOutEmpty("_")[0].substring(3, c.SplitOutEmpty("_")[0].length).ToNumber() - 1];
                            $Draplist.append("<div class=\"drap\"><label class=\"map\">" + map.MapName + "</label><label class=\"node\"><span>" + nodeName + "</span>\u70B9</label><label class=\"resulttype\">B \u80DC</label><label class=\"ratio\">" + c.SplitOutEmpty("_")[1] + "%</label></div>");
                        });
                    },
                    OnSubmit: function (fromJsonObj, $modal) { }
                });
            });
        };
        Area_ShipTuJian.prototype.Reload = function (querystring) {
            return __awaiter(this, void 0, void 0, function () {
                var _This, loadResult, $Temp, totalCount, pagecount, $list, $firstGroup, $nextGroup;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _This = this;
                            loadResult = _This.ReLoadTemp(querystring);
                            $Temp = loadResult[0].filter(".shipcell");
                            $Temp.each(function (i, dom) {
                                var $bdimg = $(dom).find(".bd .img");
                                var bimg = $bdimg.attr("data-bimg");
                                if (bimg) {
                                    var imgPath = bimg.indexOf("http") >= 0 ? bimg : (api.wgtRootDir.replace("file:", "contents:") + bimg.substring(2, bimg.length));
                                    $bdimg.css("background", "url(" + imgPath + ")").css("background-size", "100% 100%");
                                }
                            });
                            totalCount = $Temp.length;
                            pagecount = Math.ceil(totalCount / 100);
                            $list = _This.$Area.find(".shiplist");
                            $list.html("").show();
                            $firstGroup = $Temp.slice(0, 30);
                            $nextGroup = $Temp.slice(30);
                            $list.append($firstGroup);
                            return [4, Sleep(500)];
                        case 1:
                            _a.sent();
                            $list.append($nextGroup);
                            return [2];
                    }
                });
            });
        };
        Area_ShipTuJian.prototype.GetShipCellEntity = function (iniShip) {
            var _This = this;
            return {
                CID: iniShip.CID,
                Name: iniShip.Name,
                Type: DBEnum.ENUM_ShipType[iniShip.Type],
                TypeNum: iniShip == null ? 0 : iniShip.Type,
                Star: iniShip.Star,
                No: iniShip.PicId,
                PicID: iniShip.PicId,
                ShipImg: ModalShower.GetShipPic(iniShip, 0),
                ShipBackImg: ModalShower.GetShipBackPic(iniShip),
                Forcelock: Config.PlayerConfig.ForcelockCIDS.IndexOf(iniShip.CID) >= 0 ? 1 : 0,
                State: Config.PlayerConfig.ForcelockCIDS.IndexOf(iniShip.CID) >= 0 ? "已锁定" : "",
                Count: (Player.UnLockShip.Where(function (d) { return d == iniShip.CID; }).Count() > 0 || Player.UserShipVo.Select(function (c) { return c.shipcid; }).Contains(iniShip.CID)) ? 1 : 0,
            };
        };
        Area_ShipTuJian.prototype.ReLoadTemp = function (querystring) {
            var _This = this;
            var $Area = _This.$Area;
            var TempEntityData = Config.IniShips.Where(function (c) { return [18001113, 18011113, 18003812, 18011613].indexOf(c.CID) == -1; }).OrderBy(function (c) { return c.CID; }).Select(function (ship) { return _This.GetShipCellEntity(ship); });
            var $Temp = $(doT.template($Area.find("[data-tempid='shipTuJianListTemp']").html())({ LowEffect: SysLocalStorage.Get("LowEffect"), Ships: NJson.ObjListToArray(TempEntityData) }));
            _This.BindTempEvent($Temp);
            return [$Temp, TempEntityData];
        };
        Area_ShipTuJian.prototype.BeforeOpen = function () { return true; };
        ;
        Area_ShipTuJian.prototype.OnOpen = function () {
        };
        ;
        Area_ShipTuJian.prototype.OnOpened = function () {
            this.Reload({});
        };
        ;
        Area_ShipTuJian.prototype.BeforeClose = function () {
            this.$Area.find(".shiplist").hide();
            return true;
        };
        ;
        Area_ShipTuJian.prototype.OnClosed = function () {
            var _This = this;
            setTimeout(function () {
                if (_This.IsCurrentPage == false) {
                    _This.$Area.find(".shiplist").html("").show();
                }
            }, 400);
        };
        ;
        return Area_ShipTuJian;
    }());
    var Area_Equipdocks = (function () {
        function Area_Equipdocks() {
            this.Name = "Area_Equipdocks";
            this.$Area = $("#PartialAreas .areaPanel_equipdocks");
            this.IsCurrentPage = false;
            this.UpdateTimer = null;
            this.PageIndex = 0;
            this.PageSize = 0;
            this.TotalCount = 0;
            this.PageCount = 0;
            this.FilterDicts = { SearchString: "", OrderByName: "", Desc: "", Filter_ShipType: "" };
            this.ListEquips = new List();
        }
        Area_Equipdocks.prototype.OnLoad = function () {
            var _This = this;
            var $Area = _This.$Area;
            $Area.find("[data-action='search']").click(function () {
                var searchValue = $Area.find("#SerachText").val();
                _This.Reload({ SearchString: searchValue });
            });
            var LoadMore = {};
            $Area.find(".equiplist").scroll(function (e) {
                LoadMore.Direction = LoadMore.PrevScrollTop < $(this).scrollTop() ? "Down" : "Up";
                LoadMore.PrevScrollTop = LoadMore.CurrentScrollTop = $(this).scrollTop();
                if (LoadMore.IsLoading == true) {
                    return false;
                }
                var viewH = $(this).height();
                var contextH = $(this).get(0).scrollHeight;
                if (contextH / (viewH + LoadMore.CurrentScrollTop) <= 1.3) {
                    LoadMore.IsLoading = true;
                    _This.LoadMore();
                    LoadMore.IsLoading = false;
                }
            });
            $Area.find("[data-action=DismantleEquipQuick]").click(function () {
                var _this = this;
                if ($Area.find("[data-action=DismantleEquipQuick]").hasClass("disable")) {
                    return;
                }
                if (ZhanYiWorker.State != DBEnum.WorkState.Ready) {
                    MessageBox.Show("请先取消战役");
                    return;
                }
                if (MissionWorker.State != DBEnum.WorkState.Ready) {
                    MessageBox.Show("请先停止任务");
                    return;
                }
                if (YanXiWorker.State != DBEnum.WorkState.Ready) {
                    MessageBox.Show("请先停止演习");
                    return;
                }
                var withOutCids = List.From([10000121, 10011721, 10009521, 10011521, 10029521]);
                var removeCids = Config.IniShipEquipments.Where(function (c) { return c.Star <= 3; }).Select(function (c) { return c.CID; });
                var equips = Player.EquipmentVO.Where(function (c) { return c.num > 0 && c.locked == 0 && removeCids.Contains(c.equipmentcid) && withOutCids.Contains(c.equipmentcid) == false; });
                if (equips.Count() == 0) {
                    MessageBox.Show("没有可拆解的装备");
                    return;
                }
                MessageBox.Confirm("确定拆除共计" + equips.Sum(function (c) { return c.num; }) + "件装备？", function () { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    var Exception_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, 3, 4]);
                                $Area.find("[data-action=DismantleEquipQuick]").addClass("disable");
                                return [4, equips.ForEachAsync(function (equip) { return __awaiter(_this, void 0, void 0, function () {
                                        var content;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    content = "{\"" + equip.equipmentcid + "\":" + equip.num + "}";
                                                    AutoKaiFa.PrintLog("拆解 - " + Player.GetEquipmentName(equip) + " " + equip.num + " 件");
                                                    return [4, Net.Dock.DismantleEquipment(content)];
                                                case 1:
                                                    _a.sent();
                                                    return [4, Sleep(1000)];
                                                case 2:
                                                    _a.sent();
                                                    return [2];
                                            }
                                        });
                                    }); })];
                            case 1:
                                _a.sent();
                                $Area.find("[data-action=DismantleEquipQuick]").removeClass("disable");
                                return [3, 4];
                            case 2:
                                Exception_1 = _a.sent();
                                $Area.find("[data-action=DismantleEquipQuick]").removeClass("disable");
                                return [3, 4];
                            case 3: return [7];
                            case 4: return [2];
                        }
                    });
                }); });
            });
        };
        ;
        Area_Equipdocks.prototype.InitUpdateTimer = function () {
            var _this = this;
            this.UpdateTimer = new Timer();
            this.UpdateTimer.Interval = 1000;
            this.UpdateTimer.Elapsed = function () {
                _this.UpdateTimer.Stop();
                try {
                    _this.UpdateView();
                }
                catch (ex) {
                }
                finally {
                    _this.UpdateTimer.Start();
                }
            };
            this.UpdateView();
            this.UpdateTimer.Start();
        };
        Area_Equipdocks.prototype.UpdateView = function () {
            if (this.IsCurrentPage) {
                this.CheckUpdateEquips();
                this.CheckUpdateResources();
            }
        };
        Area_Equipdocks.prototype.CheckUpdateResources = function () {
            var equipnumer = Player.EquipmentVO.Sum(function (c) { return c.num; }) + "/" + Player.User.equipmentnumtop;
            var $EquipNum = this.$Area.find("[data-vmodal=EquipNum]");
            if ($EquipNum.html() != equipnumer) {
                $EquipNum.html(equipnumer);
            }
        };
        Area_Equipdocks.prototype.CheckUpdateEquips = function () {
            var _This = this;
            var $Area = _This.$Area;
            _This.ListEquips.ForEach(function (c, index) {
                var equip = Player.GetEquipment(c[0]);
                var data = _This.GetEquipCellEntity(equip);
                var newString = NJson.Stringify(data);
                if (newString != c[1]) {
                    c[1] = newString;
                    var $Temp = $(doT.template($Area.find("[data-tempid='equipListTemp']").html())(NJson.ObjListToArray([data])));
                    _This.BindTempEvent($Temp);
                    var $old = $Area.find(".equiplist .equipcell[data-cid=" + c[0] + "]");
                    $old.after($Temp);
                    $old.remove();
                }
            });
        };
        Area_Equipdocks.prototype.BindTempEvent = function ($Temp) {
            var _This = this;
            var $Area = this.$Area;
            $Temp.find(".bd img").error(function () {
                $(this).remove();
            });
            $Temp.find(".bd .img").each(function (i, dom) {
                var $bdimg = $(dom);
                var bimg = $bdimg.attr("data-bimg");
                if (bimg) {
                    var imgPath = bimg.indexOf("http") >= 0 ? bimg : (api.wgtRootDir.replace("file:", "contents:") + bimg.substring(2, bimg.length));
                    $bdimg.css("background", "url(" + imgPath + ")").css("background-size", "100% 100%");
                }
            });
            $Temp.find(".actiondismantle").click(function () {
                var cid = $(this).parents(".equipcell").attr("data-cid").ToNumber();
                var equip = Player.GetEquipment(cid);
                if (equip.num > 0 && equip.locked == 0) {
                    Dailog.CreatDialog({
                        Title: "分解装备", FormNodes: List.From([{
                                Name: "DismantleNumber",
                                Type: Dailog.FormNodeType.text,
                                Text: "分解数量",
                                Value: "",
                                Placeholder: "当前剩余" + equip.num + "件",
                                Validates: List.From([{ Key: "required", Value: true, Message: "请输入次数" }, { Key: "digits", Value: true, Message: "输入整数" }])
                            }]), OnBuild: function ($modal) {
                        }, OnSubmit: function (fromJsonObj, $modal) {
                            return __awaiter(this, void 0, void 0, function () {
                                var DismantleNumber, content, netResult;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            $modal.find("[data-check=save]").attr("disabled", "disabled");
                                            $modal.find("[data-dismiss=modal]").triggerHandler("click");
                                            DismantleNumber = fromJsonObj.DismantleNumber.ToNumber();
                                            content = "{\"" + equip.equipmentcid + "\":" + DismantleNumber + "}";
                                            return [4, Net.Dock.DismantleEquipment(content)];
                                        case 1:
                                            netResult = _a.sent();
                                            if (netResult.ErrorCode != 0) {
                                                MessageBox.Show("拆解失败,请稍候再试");
                                            }
                                            else {
                                                Logs.Print("拆解 - " + Player.GetEquipmentName(equip) + " " + DismantleNumber + " 件");
                                            }
                                            return [2];
                                    }
                                });
                            });
                        }
                    });
                }
            });
            $Temp.find(".actionlock").click(function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _this = this;
                    var cid, equip, netResult;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (ZhanYiWorker.State != DBEnum.WorkState.Ready) {
                                    MessageBox.Show("请先取消战役");
                                    return [2];
                                }
                                if (MissionWorker.State != DBEnum.WorkState.Ready) {
                                    MessageBox.Show("请先停止任务");
                                    return [2];
                                }
                                if (YanXiWorker.State != DBEnum.WorkState.Ready) {
                                    MessageBox.Show("请先停止演习");
                                    return [2];
                                }
                                cid = $(this).parents(".equipcell").attr("data-cid").ToNumber();
                                equip = Player.GetEquipment(cid);
                                if (equip == null) {
                                    MessageBox.Show("装备不存在");
                                }
                                if (!(equip.locked == 1)) return [3, 1];
                                MessageBox.Confirm("确定解锁装备", function () { return __awaiter(_this, void 0, void 0, function () {
                                    var netResult;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4, Net.Dock.LockEquipment(equip.equipmentcid)];
                                            case 1:
                                                netResult = _a.sent();
                                                if (netResult.ErrorCode != 0) {
                                                    MessageBox.Show("操作失败,请稍候再试");
                                                }
                                                else {
                                                    MessageBox.Show("操作成功");
                                                }
                                                return [2];
                                        }
                                    });
                                }); });
                                return [3, 3];
                            case 1: return [4, Net.Dock.LockEquipment(equip.equipmentcid)];
                            case 2:
                                netResult = _a.sent();
                                if (netResult.ErrorCode != 0) {
                                    MessageBox.Show("操作失败,请稍候再试");
                                }
                                else {
                                    MessageBox.Show("操作成功");
                                }
                                _a.label = 3;
                            case 3: return [2];
                        }
                    });
                });
            });
            $Temp.find(".bd").click(function () {
                var cid = $(this).parents(".equipcell").attr("data-cid").ToNumber();
                var equip = Player.GetEquipment(cid);
                var equipini = Player.GetIniEquipment(cid);
                if (equipini == null) {
                    return;
                }
                Dailog.CreatDialog({
                    Title: Player.GetEquipmentName(equip),
                    FormNodes: List.From([]),
                    AnimateIn: "fadeIn",
                    AnimateOut: "fadeOut",
                    OnBuild: function ($modal) {
                        $modal.find(".modal-dialog").css("animation-duration", "0.4s");
                        $modal.find(".modal-footer").remove();
                        $modal.addClass("modal_areaPanel_equipdocks");
                        var detialDOTData = {
                            CID: equipini.CID,
                            HP: equipini.HP,
                            Atk: equipini.Atk,
                            Def: equipini.Def,
                            Torpedo: equipini.Torpedo,
                            Antisub: equipini.Antisub,
                            AirDef: equipini.AirDef,
                            AircraftAtk: equipini.AircraftAtk,
                            Radar: equipini.Radar,
                            Hit: equipini.Hit,
                            Miss: equipini.Miss,
                            Luck: equipini.Luck,
                            AluminiumUse: equipini.AluminiumUse,
                            Range: equipini.Range,
                        };
                        var $Detail = $(doT.template($Area.find("[data-tempid='equipDeitalTemp']").html())(detialDOTData));
                        $modal.find(".modal-body").html("").append($Detail);
                        var height = $modal.find(".modal-content").outerHeight();
                        var wHeigt = $(window).height();
                        $modal.find(".modal-dialog").css("margin-top", (wHeigt - height) / 2);
                    },
                    OnSubmit: function (fromJsonObj, $modal) {
                    }
                });
            });
        };
        Area_Equipdocks.prototype.GetEquipPic = function (ini) {
            if (ini == null)
                return "";
            var httpImg_ship = Config.EquipImg_Large.FirstOrDefault(function (c) { return c.Key == ini.CID.toString(); });
            if (httpImg_ship != null) {
                return httpImg_ship.Value;
            }
            return "../Content/EquipImg/equip_large_" + ini.PicId + ".png";
        };
        ;
        Area_Equipdocks.prototype.GetEquipBackPic = function (ini) {
            if (ini == null)
                return "";
            return "../Content/images/eq_star_bg" + ((ini.Star >= 1 && ini.Star <= 6) ? ini.Star : 1) + "_40x40.png";
        };
        ;
        Area_Equipdocks.prototype.Reload = function (querystring) {
            var _This = this;
            querystring = querystring ? querystring : {};
            querystring.PageIndex = querystring.PageIndex ? querystring.PageIndex : 1;
            querystring.PageSize = querystring.PageSize ? querystring.PageSize : 20;
            _This.PageIndex = querystring.PageIndex;
            _This.PageSize = querystring.PageSize;
            for (var key in _This.FilterDicts) {
                if (querystring[key] != undefined) {
                    _This.FilterDicts[key] = querystring[key];
                }
                else {
                    querystring[key] = _This.FilterDicts[key];
                }
            }
            ;
            querystring.Skip = (querystring.PageIndex - 1) * querystring.PageSize;
            querystring.Take = querystring.PageSize;
            if (querystring.Action == "Reload") {
                querystring.Skip = 0;
                querystring.Take = querystring.PageIndex * querystring.PageSize;
            }
            var loadResult = _This.ReLoadTemp(querystring);
            var $Temp = loadResult[0].filter(".equipcell");
            var tempData = loadResult[1];
            if (querystring.Action == "LoadMore") {
                _This.ListEquips.AddRange(List.From($Temp.toArray()).Select(function (c) {
                    var cid = $(c).attr("data-cid").ToNumber();
                    var data = tempData.FirstOrDefault(function (c) { return c.ID == cid; });
                    return [cid, NJson.Stringify(data)];
                }));
                _This.$Area.find(".equiplist").append($Temp);
            }
            else {
                _This.ListEquips = new List();
                _This.ListEquips.AddRange(List.From($Temp.toArray()).Select(function (c) {
                    var cid = $(c).attr("data-cid").ToNumber();
                    var data = tempData.FirstOrDefault(function (c) { return c.ID == cid; });
                    return [cid, NJson.Stringify(data)];
                }));
                _This.$Area.find(".equiplist").html("").append($Temp);
            }
        };
        Area_Equipdocks.prototype.LoadMore = function () {
            var _This = this;
            if (_This.PageIndex < _This.PageCount) {
                _This.Reload({ Action: "LoadMore", PageIndex: (_This.PageIndex + 1) });
            }
        };
        Area_Equipdocks.prototype.GetEquipCellEntity = function (equip) {
            var _This = this;
            var iniEquip = Player.GetIniEquipment(equip.equipmentcid);
            return {
                CID: equip.equipmentcid,
                Name: iniEquip == null ? "未知" : iniEquip.Title,
                Type: iniEquip == null ? "未知" : DBEnum.ENUM_EquipmentType[iniEquip.Type],
                TypeNum: iniEquip == null ? 0 : iniEquip.Type,
                IsLocked: equip.locked,
                Star: iniEquip == null ? 0 : iniEquip.Star,
                PicID: iniEquip == null ? "" : iniEquip.PicId,
                NowNumber: equip.num,
                TotalNumber: equip.num + Player.UserShipVo.Select(function (c) { return c.equipmentarr.Where(function (d) { return d == equip.equipmentcid; }).Count(); }).Sum(function (c) { return c; }),
                EquipImg: _This.GetEquipPic(iniEquip),
                EquipBackImg: _This.GetEquipBackPic(iniEquip),
            };
        };
        Area_Equipdocks.prototype.ReLoadTemp = function (querystring) {
            var _This = this;
            var $Area = _This.$Area;
            var TempEntityData = Player.EquipmentVO.Select(function (equip) { return _This.GetEquipCellEntity(equip); }).OrderByDescending(function (c) { return c.TypeNum; }).ThenBy(function (c) { return c.Star; }).ThenBy(function (c) { return c.CID; });
            if (querystring.SearchString) {
                TempEntityData = TempEntityData.Where(function (c) { return c.Name.indexOf(querystring.SearchString) >= 0 || c.Type.indexOf(querystring.SearchString) >= 0; });
            }
            var PageIndex = querystring.PageIndex ? querystring.PageIndex : 1;
            var PageSize = querystring.PageSize ? querystring.PageSize : 20;
            _This.PageIndex = PageIndex;
            _This.PageSize = PageSize;
            _This.TotalCount = TempEntityData.Count();
            _This.PageCount = Math.floor(_This.TotalCount / _This.PageSize) + (_This.TotalCount % PageSize > 0 ? 1 : 0);
            TempEntityData = TempEntityData.Skip(querystring.Skip).Take(querystring.Take);
            var $Temp = $(doT.template($Area.find("[data-tempid='equipListTemp']").html())(NJson.ObjListToArray(TempEntityData)));
            _This.BindTempEvent($Temp);
            return [$Temp, TempEntityData];
        };
        Area_Equipdocks.prototype.BeforeOpen = function () { return true; };
        ;
        Area_Equipdocks.prototype.OnOpen = function () {
            this.Reload({});
            this.InitUpdateTimer();
        };
        ;
        Area_Equipdocks.prototype.OnOpened = function () { };
        ;
        Area_Equipdocks.prototype.BeforeClose = function () { return true; };
        ;
        Area_Equipdocks.prototype.OnClosed = function () {
            var _This = this;
            this.UpdateTimer.Dispose();
            setTimeout(function () {
                if (_This.IsCurrentPage == false) {
                    _This.$Area.find(".equiplist").html("");
                }
            }, 1000);
        };
        ;
        return Area_Equipdocks;
    }());
    var Area_AutoQiangHua = (function () {
        function Area_AutoQiangHua() {
            this.Name = "Area_AutoQiangHua";
            this.$Area = $("#PartialAreas .areaPanel_autoqianghua");
            this.IsCurrentPage = false;
            this.UpdateTimer = null;
        }
        Area_AutoQiangHua.prototype.OnLoad = function () {
            var _This = this;
            _This.$Area.find("#SerachText").keyup(function () {
                var value = $(this).val();
                if (value && !/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/.test(value)) {
                    _This.$Area.find(".shiprow[data-searchdata*=" + value + "]").show();
                    _This.$Area.find(".shiprow:not([data-searchdata*=" + value + "])").hide();
                }
                else if (!/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/.test(value)) {
                    _This.$Area.find(".shiprow").show();
                }
            });
        };
        ;
        Area_AutoQiangHua.prototype.BeforeOpen = function () { return true; };
        ;
        Area_AutoQiangHua.prototype.OnOpen = function () {
            var _This = this;
            var $Area = _This.$Area;
            setTimeout(function () {
                var AutoStrengthenShipIDS = Config.PlayerConfig.AutoStrengthenShipIDS;
                var TempEntityData = Player.UserShipVo.Where(function (c) { return c.shipcid != 10030911; }).Select(function (ship) {
                    var iniShip = Player.GetIniShip(ship);
                    return {
                        ID: ship.id,
                        Name: iniShip == null ? "未知" : iniShip.Name,
                        Level: ship.level,
                        Type: iniShip == null ? "未知" : DBEnum.ENUM_ShipType[iniShip.Type],
                        TypeNum: iniShip == null ? 0 : iniShip.Type,
                        CanLevelUp: iniShip != null && (ship.nextskillid > 0 || (ship.strengthenattribute.air_def < iniShip.StrengthenTop.Air_Def || ship.strengthenattribute.atk < iniShip.StrengthenTop.ATK || ship.strengthenattribute.def < iniShip.StrengthenTop.Def || ship.strengthenattribute.torpedo < iniShip.StrengthenTop.Torpedo)),
                        SkillLevel: ship.skilllevel ? ship.skilllevel : "-",
                        Strengthen_ATK: ship.strengthenattribute.atk,
                        Strengthen_Def: ship.strengthenattribute.def,
                        Strengthen_Torpedo: ship.strengthenattribute.torpedo,
                        Strengthen_Air_Def: ship.strengthenattribute.atk,
                        Strengthen_ATK_Str: iniShip == null ? "" : (ship.strengthenattribute.atk + "/" + iniShip.StrengthenTop.ATK),
                        Strengthen_Def_Str: iniShip == null ? "" : (ship.strengthenattribute.def + "/" + iniShip.StrengthenTop.Def),
                        Strengthen_Torpedo_Str: iniShip == null ? "" : (ship.strengthenattribute.torpedo + "/" + iniShip.StrengthenTop.Torpedo),
                        Strengthen_Air_Def_Str: iniShip == null ? "" : (ship.strengthenattribute.air_def + "/" + iniShip.StrengthenTop.Air_Def),
                        State: Player.GetShipStateContext(ship),
                        IsLocked: ship.islocked,
                        Create_Time: ship.create_time,
                        Selected: AutoStrengthenShipIDS.Contains(ship.id) ? 1 : 0,
                        SearchData: (iniShip == null ? "未知" : DBEnum.ENUM_ShipType[iniShip.Type]) + "_" + (iniShip == null ? "未知" : iniShip.Name),
                    };
                }).Where(function (c) { return c.CanLevelUp == true; }).OrderByDescending(function (c) { return c.Selected == 1; }).ThenByDescending(function (c) { return c.Level; });
                var $Temp = $(doT.template($Area.find("[data-tempid='shipListTemp']").html())(NJson.ObjListToArray(TempEntityData)));
                $Temp.find(".check-cell .md-check").click(function () {
                    var shipid = $(this).parents(".shiprow").eq(0).attr("data-id").ToNumber();
                    var isLock = $(this).is(":checked");
                    var configServer = Config.PlayerConfig;
                    if (isLock == true && configServer.AutoStrengthenShipIDS.Contains(shipid) == false) {
                        configServer.AutoStrengthenShipIDS.Add(shipid);
                    }
                    if (isLock == false && configServer.AutoStrengthenShipIDS.Contains(shipid) == true) {
                        configServer.AutoStrengthenShipIDS.Remove(shipid);
                    }
                });
                _This.$Area.find(".shiplist").html("").append($Temp);
            }, 350);
        };
        ;
        Area_AutoQiangHua.prototype.OnOpened = function () { };
        ;
        Area_AutoQiangHua.prototype.BeforeClose = function () { this.$Area.find(".shiplist").html(""); return true; };
        ;
        Area_AutoQiangHua.prototype.OnClosed = function () { };
        ;
        return Area_AutoQiangHua;
    }());
    var Area_AutoChangeShip = (function () {
        function Area_AutoChangeShip() {
            this.Name = "Area_AutoChangeShip";
            this.$Area = $("#PartialAreas .areaPanel_autochangeship");
            this.IsCurrentPage = false;
            this.UpdateTimer = null;
        }
        Area_AutoChangeShip.prototype.OnLoad = function () {
            var _This = this;
            _This.$Area.find("#SerachText").keyup(function () {
                var value = $(this).val();
                if (value && !/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/.test(value)) {
                    _This.$Area.find(".shiprow[data-searchdata*=" + value + "]").show();
                    _This.$Area.find(".shiprow:not([data-searchdata*=" + value + "])").hide();
                }
                else if (!/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/.test(value)) {
                    _This.$Area.find(".shiprow").show();
                }
            });
        };
        ;
        Area_AutoChangeShip.prototype.BeforeOpen = function () { return true; };
        ;
        Area_AutoChangeShip.prototype.ReSetAutoChangeShip = function () {
            var _This = this;
            var $Area = _This.$Area;
        };
        Area_AutoChangeShip.prototype.OnOpen = function () {
            var _This = this;
            var $Area = _This.$Area;
            setTimeout(function () {
                var TempEntityData = Player.UserShipVo.Where(function (c) { return !(c.islocked != 1 || c.fleetid > 4); }).Select(function (ship) {
                    var iniShip = Player.GetIniShip(ship);
                    return {
                        ID: ship.id,
                        CID: ship.shipcid,
                        Name: iniShip == null ? "未知" : iniShip.Name,
                        Level: ship.level,
                        Type: iniShip == null ? "未知" : DBEnum.ENUM_ShipType[iniShip.Type],
                        TypeNum: iniShip == null ? 0 : iniShip.Type,
                        HP: ship.battleprops.hp + "/" + ship.battlepropsmax.hp,
                        State: Player.GetShipStateContext(ship),
                        IsLocked: ship.islocked,
                        FleetID: ship.fleetid,
                        Selected: Config.PlayerConfig.AutoChangeShips.Select(function (c) { return c.ShipID; }).Contains(ship.id) ? 1 : 0,
                        Editabled: (MissionWorker.State == DBEnum.WorkState.Ready && YanXiWorker.State == DBEnum.WorkState.Ready && ZhanYiWorker.State == DBEnum.WorkState.Ready) ? 1 : 0,
                        PostionIndexs: Config.PlayerConfig.AutoChangeShips.Select(function (c) { return c.ShipID; }).Contains(ship.id) ? Config.PlayerConfig.AutoChangeShips.FirstOrDefault(function (c) { return c.ShipID == ship.id; }).PostionIndexs : new List(),
                        SearchData: (iniShip == null ? "未知" : DBEnum.ENUM_ShipType[iniShip.Type]) + "_" + (iniShip == null ? "未知" : iniShip.Name),
                    };
                }).OrderByDescending(function (c) { return c.Selected == 1; }).ThenByDescending(function (c) { return c.Level; }).ThenBy(function (c) { return c.TypeNum; }).ThenBy(function (c) { return c.CID; });
                var $Temp = $(doT.template($Area.find("[data-tempid='shipListTemp']").html())(NJson.ObjListToArray(TempEntityData)));
                $Temp.find(".check-cell.ckBox_AutoChangeShip .md-check").click(function () {
                    var shipid = $(this).parents(".shiprow").eq(0).attr("data-id").ToNumber();
                    var isSelected = $(this).is(":checked");
                    if (isSelected == true && Config.PlayerConfig.AutoChangeShips.Select(function (c) { return c.ShipID; }).Contains(shipid) == false) {
                        Config.PlayerConfig.AutoChangeShips.Add({ ShipID: shipid, PostionIndexs: List.From([]) });
                        $(this).parents(".shiprow").eq(0).addClass("selected");
                    }
                    if (isSelected == false && Config.PlayerConfig.AutoChangeShips.Select(function (c) { return c.ShipID; }).Contains(shipid) == true) {
                        Config.PlayerConfig.AutoChangeShips.RemoveAll(function (c) { return c.ShipID == shipid; });
                        $(this).parents(".shiprow").eq(0).removeClass("selected");
                        $(this).parents(".shiprow").eq(0).find(".ck .md-check").attr({ "checked": false });
                    }
                });
                $Temp.find(".ship .ck .md-check").click(function () {
                    var shipid = $(this).parents(".shiprow").eq(0).attr("data-id").ToNumber();
                    var isSelected = $(this).is(":checked");
                    var index = $(this).attr("data-index").ToNumber();
                    var ini = Config.PlayerConfig.AutoChangeShips.FirstOrDefault(function (c) { return c.ShipID == shipid; });
                    if (ini && isSelected == true && !ini.PostionIndexs.Contains(index)) {
                        ini.PostionIndexs.Add(index);
                        ini.PostionIndexs = ini.PostionIndexs.OrderBy(function (c) { return c; });
                    }
                    if (ini && isSelected == false && ini.PostionIndexs.Contains(index)) {
                        ini.PostionIndexs.Remove(index);
                    }
                });
                _This.$Area.find(".shiplist").html("").append($Temp).fadeIn(400);
            }, 350);
        };
        ;
        Area_AutoChangeShip.prototype.OnOpened = function () { };
        ;
        Area_AutoChangeShip.prototype.BeforeClose = function () { this.$Area.find(".shiplist").html(""); return true; };
        ;
        Area_AutoChangeShip.prototype.OnClosed = function () { };
        ;
        return Area_AutoChangeShip;
    }());
    var Area_ShipBuilder = (function () {
        function Area_ShipBuilder() {
            this.Name = "Area_ShipBuilder";
            this.$Area = $("#PartialAreas .areaPanel_shipBuilder");
            this.IsCurrentPage = false;
            this.UpdateTimer = null;
            this.LastDockListJsonString = "";
        }
        Area_ShipBuilder.prototype.OnLoad = function () {
            var _This = this;
            var $Area = _This.$Area;
            $Area.find("[name=ShipGongShi]").change(function () {
                var values = $(this).val().SplitOutEmpty(",");
                $Area.find("[name=Oil]").val(values[0]);
                $Area.find("[name=Ammo]").val(values[1]);
                $Area.find("[name=Steel]").val(values[2]);
                $Area.find("[name=Aluminium]").val(values[3]);
            }).triggerHandler("change");
            AutoJianZao.OnStart.Add(function () {
                $Area.find("[name=ShipGongShi]").attr("disabled", "disabled");
                $Area.find("[name=Oil]").attr("disabled", "disabled");
                $Area.find("[name=Ammo]").attr("disabled", "disabled");
                $Area.find("[name=Steel]").attr("disabled", "disabled");
                $Area.find("[name=Aluminium]").attr("disabled", "disabled");
                $Area.find("[name=TotalNumber]").attr("disabled", "disabled");
                $Area.find("[name=KuanJianMinute]").attr("disabled", "disabled");
                $Area.find("[name=StopOnNames]").attr("disabled", "disabled");
                $Area.find(".actionBegin").hide();
                $Area.find(".actionCancel").show();
            });
            AutoJianZao.OnEnd.Add(function () {
                $Area.find("[name=ShipGongShi]").removeAttr("disabled");
                $Area.find("[name=Oil]").removeAttr("disabled");
                $Area.find("[name=Ammo]").removeAttr("disabled");
                $Area.find("[name=Steel]").removeAttr("disabled");
                $Area.find("[name=Aluminium]").removeAttr("disabled");
                $Area.find("[name=TotalNumber]").removeAttr("disabled");
                $Area.find("[name=KuanJianMinute]").removeAttr("disabled");
                $Area.find("[name=StopOnNames]").removeAttr("disabled");
                $Area.find(".actionBegin").show();
                $Area.find(".actionCancel").hide();
            });
            $Area.find(".actionBegin").click(function () {
                var Oil = $Area.find("[name=Oil]").val().ToNumber();
                var Ammo = $Area.find("[name=Ammo]").val().ToNumber();
                var Steel = $Area.find("[name=Steel]").val().ToNumber();
                var Aluminium = $Area.find("[name=Aluminium]").val().ToNumber();
                var TotalNumber = $Area.find("[name=TotalNumber]").val().ToNumber();
                var KuanJianMinute = $Area.find("[name=KuanJianMinute]").val().ToNumber();
                var StopOnNames = $Area.find("[name=StopOnNames]").val().SplitOutEmpty("或");
                if (TotalNumber <= 0) {
                    MessageBox.Show("建造次数输入有误");
                    return;
                }
                if (Oil < 30 || Oil > 999) {
                    MessageBox.Show("油输入有误");
                    return;
                }
                if (Ammo < 30 || Ammo > 999) {
                    MessageBox.Show("弹输入有误");
                    return;
                }
                if (Steel < 30 || Steel > 999) {
                    MessageBox.Show("钢输入有误");
                    return;
                }
                if (Aluminium < 30 || Aluminium > 999) {
                    MessageBox.Show("铝输入有误");
                    return;
                }
                KuanJianMinute = KuanJianMinute <= 0 ? 9999 : KuanJianMinute;
                if (StopOnNames.Count() > 0 && StopOnNames.Where(function (name) { return Config.IniShips.Where(function (c) { return c.Name.indexOf(name) >= 0; }).Count() > 0; }).Count() != StopOnNames.Count()) {
                    MessageBox.Show("目标不在图鉴中");
                    return;
                }
                AutoJianZao.Oil = Oil;
                AutoJianZao.Ammo = Ammo;
                AutoJianZao.Steel = Steel;
                AutoJianZao.Aluminium = Aluminium;
                AutoJianZao.KuanJianMinute = KuanJianMinute;
                AutoJianZao.StopOnNames = StopOnNames;
                AutoJianZao.TotalNumber = TotalNumber;
                AutoJianZao.NowNumber = 0;
                AutoJianZao.PrintLog("建造 - 执行 " + TotalNumber + "次");
                AutoJianZao.Start();
            });
            $Area.find(".actionCancel").click(function () {
                AutoJianZao.Stop();
            });
        };
        ;
        Area_ShipBuilder.prototype.InitUpdateTimer = function () {
            var _this = this;
            this.UpdateTimer = new Timer();
            this.UpdateTimer.Interval = 1000;
            this.UpdateTimer.Elapsed = function () {
                _this.UpdateTimer.Stop();
                try {
                    _this.UpdateView();
                }
                catch (ex) {
                }
                finally {
                    _this.UpdateTimer.Start();
                }
            };
            this.UpdateView();
            this.UpdateTimer.Start();
        };
        Area_ShipBuilder.prototype.UpdateView = function () {
            if (this.IsCurrentPage) {
                this.CheckUpdateDocks();
                this.CheckUpdateResouces();
            }
        };
        Area_ShipBuilder.prototype.CheckUpdateDocks = function () {
            var TempEntityData = Player.ShipBuildDockVo.Where(function (c) { return c.locked == 0; }).Select(function (dock) {
                if (dock.shiptype > 0) {
                    var subSecound = Math.max(dock.endtime - NetDate.GetTimeSpanSecound(), 0);
                    var hour = Math.floor(subSecound / 3600);
                    var mini = Math.floor((subSecound - hour * 3600) / 60);
                    var secound = subSecound - hour * 3600 - mini * 60;
                    var result = {
                        id: dock.id,
                        shiptype: dock.shiptype,
                        endtime: dock.endtime,
                        hour: hour,
                        mini: mini,
                        secound: secound,
                    };
                    return result;
                }
                else {
                    var result = {
                        id: dock.id,
                        shiptype: dock.shiptype,
                        endtime: dock.endtime,
                        hour: 0,
                        mini: 0,
                        secound: 0,
                    };
                    return result;
                }
            });
            if (this.LastDockListJsonString != NJson.Stringify(TempEntityData)) {
                this.LastDockListJsonString = NJson.Stringify(TempEntityData);
                var $dockListTemp = $(doT.template(this.$Area.find("[data-tempid='dockListTemp']").html())(NJson.ObjListToArray(NJson.DeepCopy(TempEntityData))));
                this.$Area.find(".docklists").html("").append($dockListTemp);
                $dockListTemp.find(".quickBuild").click(function () {
                    var $Action = $(this);
                    var packager = Player.PackageVo.FirstOrDefault(function (c) { return c.itemcid == DBEnum.PackageType.快速建造; });
                    var num = packager == null ? 0 : packager.num;
                    if (num <= 0) {
                        MessageBox.Show("快速建造数量不足");
                        return;
                    }
                    if (Player.UserShipVo.Count() >= Player.User.shipnumtop) {
                        MessageBox.Show("船坞已满");
                        return;
                    }
                    var dockid = $Action.parents(".dockCell").eq(0).attr("data-dockid").ToNumber();
                    var dock = Player.ShipBuildDockVo.FirstOrDefault(function (c) { return c.id == dockid; });
                    var subSecound = Math.max(dock.endtime - NetDate.GetTimeSpanSecound(), 0);
                    if (subSecound == 0) {
                        MessageBox.Show("建造已完成，等待系统回收");
                    }
                    else {
                        MessageBox.Confirm("确定使用快速建造？", function () {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    AutoJianZao.UseQuickBuild(dock.id);
                                    return [2];
                                });
                            });
                        });
                    }
                });
            }
        };
        Area_ShipBuilder.prototype.CheckUpdateResouces = function () {
            var _This = this;
            var QuickBuildNum = Player.GetPackageNumber(DBEnum.PackageType.快速建造);
            var $QuickBuildNum = _This.$Area.find(".resource [data-vmodal=QuickBuildNum]");
            if ($QuickBuildNum.html() != QuickBuildNum.toString()) {
                $QuickBuildNum.html(QuickBuildNum.toString());
            }
            var ShipTuZhiNum = Player.GetPackageNumber(DBEnum.PackageType.建造蓝图);
            var $ShipTuZhiNum = _This.$Area.find(".resource [data-vmodal=ShipTuZhiNum]");
            if ($ShipTuZhiNum.html() != ShipTuZhiNum.toString()) {
                $ShipTuZhiNum.html(ShipTuZhiNum.toString());
            }
        };
        Area_ShipBuilder.prototype.BeforeOpen = function () { return true; };
        ;
        Area_ShipBuilder.prototype.OnOpen = function () { this.InitUpdateTimer(); };
        ;
        Area_ShipBuilder.prototype.OnOpened = function () { };
        ;
        Area_ShipBuilder.prototype.BeforeClose = function () { return true; };
        ;
        Area_ShipBuilder.prototype.OnClosed = function () { this.UpdateTimer.Dispose(); };
        ;
        return Area_ShipBuilder;
    }());
    var Area_EquipBuilder = (function () {
        function Area_EquipBuilder() {
            this.Name = "Area_EquipBuilder";
            this.$Area = $("#PartialAreas .areaPanel_equipBuilder");
            this.IsCurrentPage = false;
            this.UpdateTimer = null;
            this.LastDockListJsonString = "";
        }
        Area_EquipBuilder.prototype.OnLoad = function () {
            var _This = this;
            var $Area = _This.$Area;
            $Area.find("[name=EquipGongShi]").change(function () {
                var values = $(this).val().SplitOutEmpty(",");
                $Area.find("[name=Oil]").val(values[0]);
                $Area.find("[name=Ammo]").val(values[1]);
                $Area.find("[name=Steel]").val(values[2]);
                $Area.find("[name=Aluminium]").val(values[3]);
            }).triggerHandler("change");
            AutoKaiFa.OnStart.Add(function () {
                $Area.find("[name=EquipGongShi]").attr("disabled", "disabled");
                $Area.find("[name=Oil]").attr("disabled", "disabled");
                $Area.find("[name=Ammo]").attr("disabled", "disabled");
                $Area.find("[name=Steel]").attr("disabled", "disabled");
                $Area.find("[name=Aluminium]").attr("disabled", "disabled");
                $Area.find("[name=TotalNumber]").attr("disabled", "disabled");
                $Area.find("[name=KuanJianMinute]").attr("disabled", "disabled");
                $Area.find("[name=StopOnNames]").attr("disabled", "disabled");
                $Area.find(".actionBegin").hide();
                $Area.find(".actionCancel").show();
            });
            AutoKaiFa.OnEnd.Add(function () {
                $Area.find("[name=EquipGongShi]").removeAttr("disabled");
                $Area.find("[name=Oil]").removeAttr("disabled");
                $Area.find("[name=Ammo]").removeAttr("disabled");
                $Area.find("[name=Steel]").removeAttr("disabled");
                $Area.find("[name=Aluminium]").removeAttr("disabled");
                $Area.find("[name=TotalNumber]").removeAttr("disabled");
                $Area.find("[name=KuanJianMinute]").removeAttr("disabled");
                $Area.find("[name=StopOnNames]").removeAttr("disabled");
                $Area.find(".actionBegin").show();
                $Area.find(".actionCancel").hide();
            });
            $Area.find(".actionBegin").click(function () {
                var Oil = $Area.find("[name=Oil]").val().ToNumber();
                var Ammo = $Area.find("[name=Ammo]").val().ToNumber();
                var Steel = $Area.find("[name=Steel]").val().ToNumber();
                var Aluminium = $Area.find("[name=Aluminium]").val().ToNumber();
                var TotalNumber = $Area.find("[name=TotalNumber]").val().ToNumber();
                var KuanJianMinute = $Area.find("[name=KuanJianMinute]").val().ToNumber();
                var StopOnNames = $Area.find("[name=StopOnNames]").val().SplitOutEmpty("或");
                if (TotalNumber <= 0) {
                    MessageBox.Show("建造次数输入有误");
                    return;
                }
                if (Oil < 10 || Oil > 999) {
                    MessageBox.Show("油输入有误");
                    return;
                }
                if (Ammo < 10 || Ammo > 999) {
                    MessageBox.Show("弹输入有误");
                    return;
                }
                if (Steel < 10 || Steel > 999) {
                    MessageBox.Show("钢输入有误");
                    return;
                }
                if (Aluminium < 10 || Aluminium > 999) {
                    MessageBox.Show("铝输入有误");
                    return;
                }
                KuanJianMinute = KuanJianMinute <= 0 ? 9999 : KuanJianMinute;
                if (StopOnNames.Count() > 0 && StopOnNames.Where(function (name) { return Config.IniShipEquipments.Where(function (c) { return c.Title.indexOf(name) >= 0; }).Count() > 0; }).Count() != StopOnNames.Count()) {
                    MessageBox.Show("目标不在图鉴中");
                    return;
                }
                AutoKaiFa.Oil = Oil;
                AutoKaiFa.Ammo = Ammo;
                AutoKaiFa.Steel = Steel;
                AutoKaiFa.Aluminium = Aluminium;
                AutoKaiFa.KuanJianMinute = KuanJianMinute;
                AutoKaiFa.StopOnNames = StopOnNames;
                AutoKaiFa.TotalNumber = TotalNumber;
                AutoKaiFa.NowNumber = 0;
                AutoKaiFa.PrintLog("开发 - 执行 " + TotalNumber + "次");
                AutoKaiFa.Start();
            });
            $Area.find(".actionCancel").click(function () {
                AutoKaiFa.Stop();
            });
        };
        ;
        Area_EquipBuilder.prototype.InitUpdateTimer = function () {
            var _this = this;
            this.UpdateTimer = new Timer();
            this.UpdateTimer.Interval = 1000;
            this.UpdateTimer.Elapsed = function () {
                _this.UpdateTimer.Stop();
                try {
                    _this.UpdateView();
                }
                catch (ex) {
                }
                finally {
                    _this.UpdateTimer.Start();
                }
            };
            this.UpdateView();
            this.UpdateTimer.Start();
        };
        Area_EquipBuilder.prototype.UpdateView = function () {
            if (this.IsCurrentPage) {
                this.CheckUpdateDocks();
                this.CheckUpdateResouces();
            }
        };
        Area_EquipBuilder.prototype.CheckUpdateDocks = function () {
            var TempEntityData = Player.EquipBuildDockVo.Where(function (c) { return c.locked == 0; }).Select(function (dock) {
                if (dock.equipmentcid > 0) {
                    var subSecound = Math.max(dock.endtime - NetDate.GetTimeSpanSecound(), 0);
                    var hour = Math.floor(subSecound / 3600);
                    var mini = Math.floor((subSecound - hour * 3600) / 60);
                    var secound = subSecound - hour * 3600 - mini * 60;
                    var result = {
                        id: dock.id,
                        equipmentcid: dock.equipmentcid,
                        endtime: dock.endtime,
                        hour: hour,
                        mini: mini,
                        secound: secound,
                    };
                    return result;
                }
                else {
                    var result = {
                        id: dock.id,
                        equipmentcid: dock.equipmentcid,
                        endtime: dock.endtime,
                        hour: 0,
                        mini: 0,
                        secound: 0,
                    };
                    return result;
                }
            });
            if (this.LastDockListJsonString != NJson.Stringify(TempEntityData)) {
                this.LastDockListJsonString = NJson.Stringify(TempEntityData);
                var $dockListTemp = $(doT.template(this.$Area.find("[data-tempid='dockListTemp']").html())(NJson.ObjListToArray(NJson.DeepCopy(TempEntityData))));
                this.$Area.find(".docklists").html("").append($dockListTemp);
                $dockListTemp.find(".quickBuild").click(function () {
                    var $Action = $(this);
                    var packager = Player.PackageVo.FirstOrDefault(function (c) { return c.itemcid == DBEnum.PackageType.快速建造; });
                    var num = packager == null ? 0 : packager.num;
                    if (num <= 0) {
                        MessageBox.Show("开发建造数量不足");
                        return;
                    }
                    if (Player.EquipmentVO.Sum(function (c) { return c.num; }) >= Player.User.equipmentnumtop) {
                        MessageBox.Show("装备已满");
                        return;
                    }
                    var dockid = $Action.parents(".dockCell").eq(0).attr("data-dockid").ToNumber();
                    var dock = Player.ShipBuildDockVo.FirstOrDefault(function (c) { return c.id == dockid; });
                    var subSecound = Math.max(dock.endtime - NetDate.GetTimeSpanSecound(), 0);
                    if (subSecound == 0) {
                        MessageBox.Show("开发已完成，等待系统回收");
                    }
                    else {
                        MessageBox.Confirm("确定使用快速建造？", function () {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    AutoKaiFa.UseQuickBuild(dock.id);
                                    return [2];
                                });
                            });
                        });
                    }
                });
            }
        };
        Area_EquipBuilder.prototype.CheckUpdateResouces = function () {
            var _This = this;
            var QuickBuildNum = Player.GetPackageNumber(DBEnum.PackageType.快速建造);
            var $QuickBuildNum = _This.$Area.find(".resource [data-vmodal=QuickBuildNum]");
            if ($QuickBuildNum.html() != QuickBuildNum.toString()) {
                $QuickBuildNum.html(QuickBuildNum.toString());
            }
            var EquipTuZhiNum = Player.GetPackageNumber(DBEnum.PackageType.装备蓝图);
            var $EquipTuZhiNum = _This.$Area.find(".resource [data-vmodal=EquipTuZhiNum]");
            if ($EquipTuZhiNum.html() != EquipTuZhiNum.toString()) {
                $EquipTuZhiNum.html(EquipTuZhiNum.toString());
            }
        };
        Area_EquipBuilder.prototype.BeforeOpen = function () { return true; };
        ;
        Area_EquipBuilder.prototype.OnOpen = function () { this.InitUpdateTimer(); };
        ;
        Area_EquipBuilder.prototype.OnOpened = function () { };
        ;
        Area_EquipBuilder.prototype.BeforeClose = function () { return true; };
        ;
        Area_EquipBuilder.prototype.OnClosed = function () { this.UpdateTimer.Dispose(); };
        ;
        return Area_EquipBuilder;
    }());
    var Area_JiHuaRenWu = (function () {
        function Area_JiHuaRenWu() {
            this.Name = "Area_JiHuaRenWu";
            this.$Area = $("#PartialAreas .areaPanel_jihuarenwu");
            this.IsCurrentPage = false;
            this.UpdateTimer = null;
            this.LastDockListJsonString = "";
        }
        Area_JiHuaRenWu.prototype.OnLoad = function () {
            var _This = this;
            var $Area = _This.$Area;
            $Area.find(".btnAddTask").click(function () {
                _This.OpenCreateTask();
            });
        };
        ;
        Area_JiHuaRenWu.prototype.OpenCreateTask = function () {
            var _This = this;
            var $Area = _This.$Area;
            Dailog.CreatDialog({
                Title: "新增计划", FormNodes: List.From([{
                        Name: "TaskType",
                        Type: Dailog.FormNodeType.select,
                        Text: "计划分类",
                        Data: List.From(["执行任务", "执行队列", "执行演习", "执行战役", "关闭应用"]).Select(function (c) { return ({ Name: c, Value: c }); }),
                        Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                    }, {
                        Name: "TntervalType",
                        Type: Dailog.FormNodeType.select,
                        Text: "执行间隔",
                        Data: List.From(["每天", "每周", "一次"]).Select(function (c) { return ({ Name: c, Value: c }); }),
                        Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                    }, {
                        Name: "TntervalWeek",
                        Type: Dailog.FormNodeType.select,
                        Text: "何时开始 - 星期",
                        Class: "data_week",
                        Data: List.From([{ Name: "星期一", Value: "1" }, { Name: "星期二", Value: "2" }, { Name: "星期三", Value: "3" }, { Name: "星期四", Value: "4" }, { Name: "星期五", Value: "5" }, { Name: "星期六", Value: "6" }, { Name: "星期日", Value: "0" }]),
                        Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                    }, {
                        Name: "TntervalDayHour",
                        Type: Dailog.FormNodeType.select,
                        Text: "何时开始 - 小时",
                        Class: "data_day",
                        Data: List.From(["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]).Select(function (c) { return ({ Name: c, Value: c }); }),
                        Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                    }, {
                        Name: "TntervalDayMinutes",
                        Type: Dailog.FormNodeType.select,
                        Text: "何时开始 - 分钟",
                        Class: "data_day",
                        Data: List.From(["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"]).Select(function (c) { return ({ Name: c, Value: c }); }),
                        Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                    }, {
                        Name: "Mission_FleetID",
                        Type: Dailog.FormNodeType.select,
                        Text: "选择舰队",
                        Class: "data_mission",
                        Data: List.From([{ "Name": "第一舰队", "Value": "1" }, { "Name": "第二舰队", "Value": "2" }, { "Name": "第三舰队", "Value": "3" }, { "Name": "第四舰队", "Value": "4" }]),
                        Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                    }, {
                        Name: "MissionID",
                        Type: Dailog.FormNodeType.select,
                        Text: "选择一个任务",
                        Class: "data_mission",
                        Data: MissionWorker.Works.Select(function (c) { return ({ Name: c.WorkName, Value: c.CustiomPVEID }); }),
                        Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                    }, {
                        Name: "Mission_TotalWorkNumber",
                        Type: Dailog.FormNodeType.text,
                        Text: "任务次数",
                        Value: "1",
                        Class: "data_mission",
                        Placeholder: "请输入执行次数",
                        Validates: List.From([{ Key: "required", Value: true, Message: "请输入次数" }, { Key: "digits", Value: true, Message: "输入整数" }])
                    }, {
                        Name: "QueueID",
                        Type: Dailog.FormNodeType.select,
                        Text: "选择一个队列",
                        Class: "data_queue",
                        Data: Config.PlayerConfig.CustomPevQueues.Select(function (c) { return ({ Name: c.QueueName, Value: c.QueueID }); }),
                        Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                    }, {
                        Name: "YanXi_FleetID",
                        Type: Dailog.FormNodeType.select,
                        Text: "选择舰队",
                        Class: "data_yanxi",
                        Data: List.From([{ "Name": "第一舰队", "Value": "1" }, { "Name": "第二舰队", "Value": "2" }, { "Name": "第三舰队", "Value": "3" }, { "Name": "第四舰队", "Value": "4" }]),
                        Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                    }, {
                        Name: "YanXi_Formation",
                        Type: Dailog.FormNodeType.select,
                        Text: "阵型",
                        Class: "data_yanxi",
                        Data: List.From([{ "Name": "单纵阵", "Value": "1" }, { "Name": "复纵阵", "Value": "2" }, { "Name": "轮行阵", "Value": "3" }, { "Name": "梯形阵", "Value": "4" }, { "Name": "单横阵", "Value": "5" }]),
                        Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                    }, {
                        Name: "YanXi_UnFightQianTing",
                        Type: Dailog.FormNodeType.select,
                        Text: "不打旗舰潜艇",
                        Class: "data_yanxi",
                        Data: List.From([{ "Name": "不使用", "Value": "0" }, { "Name": "启用", "Value": "1" }]),
                        Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                    }, {
                        Name: "YanXi_FightNight",
                        Type: Dailog.FormNodeType.select,
                        Text: "夜战",
                        Class: "data_yanxi",
                        Data: List.From([{ "Name": "不夜战", "Value": "0" }, { "Name": "夜战", "Value": "1" }]),
                        Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                    }, {
                        Name: "ZhanYi_CampaignID",
                        Type: Dailog.FormNodeType.select,
                        Text: "战役",
                        Class: "data_zhanyi",
                        Data: List.From([{ "Name": "驱逐简单", "Value": "101" }, { "Name": "驱逐困难", "Value": "102" }, { "Name": "巡洋简单", "Value": "201" }, { "Name": "巡洋困难", "Value": "202" }, { "Name": "战列简单", "Value": "301" }, { "Name": "战列困难", "Value": "302" }, { "Name": "航母简单", "Value": "401" }, { "Name": "航母困难", "Value": "402" }, { "Name": "潜艇简单", "Value": "501" }, { "Name": "潜艇困难", "Value": "502" }]),
                        Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                    }, {
                        Name: "ZhanYi_Formation",
                        Type: Dailog.FormNodeType.select,
                        Text: "阵型",
                        Class: "data_zhanyi",
                        Data: List.From([{ "Name": "单纵阵", "Value": "1" }, { "Name": "复纵阵", "Value": "2" }, { "Name": "轮行阵", "Value": "3" }, { "Name": "梯形阵", "Value": "4" }, { "Name": "单横阵", "Value": "5" }]),
                        Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                    }, {
                        Name: "ZhanYi_FightNight",
                        Type: Dailog.FormNodeType.select,
                        Text: "夜战",
                        Class: "data_zhanyi",
                        Data: List.From([{ "Name": "不夜战", "Value": "0" }, { "Name": "夜战", "Value": "1" }]),
                        Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                    }, {
                        Name: "ZhanYi_RepairLevel",
                        Type: Dailog.FormNodeType.select,
                        Text: "修理方式",
                        Class: "data_zhanyi",
                        Data: List.From([{ "Name": "修大中破", "Value": "2" }, { "Name": "只修大破", "Value": "1" }, { "Name": "不修理", "Value": "0" }]),
                        Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                    }]), OnBuild: function ($modal) {
                    var $split = $("<div></div>").css({ "height": "1vw", "border-top": "1vw dotted #b6b6b6", "margin-top": "2vw" });
                    $modal.find("[name=TntervalDayMinutes]").parents(".form-group").after($split);
                    $modal.find("[name=TntervalType]").change(function () {
                        var TntervalType = $modal.find("[name=TntervalType]").val();
                        if (TntervalType == "每周") {
                            $modal.find(".data_week").parents(".form-group").show();
                        }
                        else {
                            $modal.find(".data_week").parents(".form-group").hide();
                        }
                    }).triggerHandler("change");
                    $modal.find("[name=TaskType]").change(function () {
                        var TaskType = $modal.find("[name=TaskType]").val();
                        if (TaskType == "执行任务") {
                            $modal.find(".data_mission").parents(".form-group").show();
                            $modal.find(".data_queue").parents(".form-group").hide();
                            $modal.find(".data_yanxi").parents(".form-group").hide();
                            $modal.find(".data_zhanyi").parents(".form-group").hide();
                        }
                        else if (TaskType == "执行队列") {
                            $modal.find(".data_mission").parents(".form-group").hide();
                            $modal.find(".data_queue").parents(".form-group").show();
                            $modal.find(".data_yanxi").parents(".form-group").hide();
                            $modal.find(".data_zhanyi").parents(".form-group").hide();
                        }
                        else if (TaskType == "执行演习") {
                            $modal.find(".data_mission").parents(".form-group").hide();
                            $modal.find(".data_queue").parents(".form-group").hide();
                            $modal.find(".data_yanxi").parents(".form-group").show();
                            $modal.find(".data_zhanyi").parents(".form-group").hide();
                        }
                        else if (TaskType == "执行战役") {
                            $modal.find(".data_mission").parents(".form-group").hide();
                            $modal.find(".data_queue").parents(".form-group").hide();
                            $modal.find(".data_yanxi").parents(".form-group").hide();
                            $modal.find(".data_zhanyi").parents(".form-group").show();
                        }
                        else {
                            $modal.find(".data_mission").parents(".form-group").hide();
                            $modal.find(".data_queue").parents(".form-group").hide();
                            $modal.find(".data_yanxi").parents(".form-group").hide();
                            $modal.find(".data_zhanyi").parents(".form-group").hide();
                        }
                    }).triggerHandler("change");
                }, OnSubmit: function (fromJsonObj, $modal) {
                    return __awaiter(this, void 0, void 0, function () {
                        var TaskType, TntervalType, TntervalDayHour, TntervalDayMinutes, TntervalWeek, MissionID, Mission_FleetID, Mission_TotalWorkNumber, Mission_StopOnNewShip, Mission_QianTingDanHeng, Mission_IsAutoChangeShip, QueueID, YanXi_FleetID, YanXi_Formation, YanXi_FightNight, YanXi_UnFightQianTing, ZhanYi_CampaignID, ZhanYi_Formation, ZhanYi_FightNight, ZhanYi_RepairLevel, newScheduledTask;
                        return __generator(this, function (_a) {
                            $modal.find("[data-check=save]").attr("disabled", "disabled");
                            $modal.find("[data-dismiss=modal]").triggerHandler("click");
                            TaskType = fromJsonObj.TaskType;
                            TntervalType = fromJsonObj.TntervalType;
                            TntervalDayHour = (fromJsonObj.TntervalDayHour.indexOf("0") == 0 ? fromJsonObj.TntervalDayHour.substring(1, 2) : fromJsonObj.TntervalDayHour).ToNumber();
                            TntervalDayMinutes = (fromJsonObj.TntervalDayMinutes.indexOf("0") == 0 ? fromJsonObj.TntervalDayMinutes.substring(1, 2) : fromJsonObj.TntervalDayMinutes).ToNumber();
                            TntervalWeek = fromJsonObj.TntervalWeek.ToNumber();
                            MissionID = fromJsonObj.MissionID;
                            Mission_FleetID = fromJsonObj.Mission_FleetID.ToNumber();
                            Mission_TotalWorkNumber = fromJsonObj.Mission_TotalWorkNumber.ToNumber();
                            Mission_StopOnNewShip = false;
                            Mission_QianTingDanHeng = false;
                            Mission_IsAutoChangeShip = false;
                            QueueID = fromJsonObj.QueueID;
                            YanXi_FleetID = fromJsonObj.YanXi_FleetID.ToNumber();
                            YanXi_Formation = fromJsonObj.YanXi_Formation.ToNumber();
                            YanXi_FightNight = fromJsonObj.YanXi_FightNight.ToNumber();
                            YanXi_UnFightQianTing = fromJsonObj.YanXi_UnFightQianTing == "1";
                            ZhanYi_CampaignID = fromJsonObj.ZhanYi_CampaignID.ToNumber();
                            ZhanYi_Formation = fromJsonObj.ZhanYi_Formation.ToNumber();
                            ZhanYi_FightNight = fromJsonObj.ZhanYi_FightNight.ToNumber();
                            ZhanYi_RepairLevel = fromJsonObj.ZhanYi_RepairLevel.ToNumber();
                            newScheduledTask = {
                                TaskID: "T" + NetDate.GetTimeSpanSecound(),
                                TaskType: TaskType,
                                TntervalType: TntervalType,
                                TntervalDayHour: TntervalDayHour,
                                TntervalDayMinutes: TntervalDayMinutes,
                                TntervalWeek: TntervalWeek,
                                MissionID: MissionID,
                                Mission_FleetID: Mission_FleetID,
                                Mission_TotalWorkNumber: Mission_TotalWorkNumber,
                                Mission_StopOnNewShip: Mission_StopOnNewShip,
                                Mission_QianTingDanHeng: Mission_QianTingDanHeng,
                                Mission_IsAutoChangeShip: Mission_IsAutoChangeShip,
                                QueueID: QueueID,
                                YanXi_FleetID: YanXi_FleetID,
                                YanXi_Formation: YanXi_Formation,
                                YanXi_FightNight: YanXi_FightNight,
                                YanXi_UnFightQianTing: YanXi_UnFightQianTing,
                                ZhanYi_CampaignID: ZhanYi_CampaignID,
                                ZhanYi_Formation: ZhanYi_Formation,
                                ZhanYi_FightNight: ZhanYi_FightNight,
                                ZhanYi_RepairLevel: ZhanYi_RepairLevel,
                                LastRunTimeSpan: 0,
                                IsActive: false,
                            };
                            console.log(["newScheduledTask", newScheduledTask]);
                            Config.PlayerConfig.ScheduledTasks.Add(newScheduledTask);
                            _This.CheckUpdateDocks();
                            return [2];
                        });
                    });
                }
            });
        };
        Area_JiHuaRenWu.prototype.OpenModifyTask = function (taskid) {
            var _This = this;
            var $Area = _This.$Area;
            var modifyTask = Config.PlayerConfig.ScheduledTasks.FirstOrDefault(function (c) { return c.TaskID == taskid; });
            console.log(modifyTask);
            Dailog.CreatDialog({
                Title: "修改计划", FormNodes: List.From([{
                        Name: "TaskType",
                        Type: Dailog.FormNodeType.select,
                        Text: "计划分类",
                        Data: List.From(["执行任务", "执行队列", "执行演习", "执行战役", "关闭应用"]).Select(function (c) { return ({ Name: c, Value: c }); }),
                        Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                    }, {
                        Name: "TntervalType",
                        Type: Dailog.FormNodeType.select,
                        Text: "执行间隔",
                        Data: List.From(["每天", "每周", "一次"]).Select(function (c) { return ({ Name: c, Value: c }); }),
                        Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                    }, {
                        Name: "TntervalWeek",
                        Type: Dailog.FormNodeType.select,
                        Text: "何时开始 - 星期",
                        Class: "data_week",
                        Data: List.From([{ Name: "星期一", Value: "1" }, { Name: "星期二", Value: "2" }, { Name: "星期三", Value: "3" }, { Name: "星期四", Value: "4" }, { Name: "星期五", Value: "5" }, { Name: "星期六", Value: "6" }, { Name: "星期日", Value: "0" }]),
                        Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                    }, {
                        Name: "TntervalDayHour",
                        Type: Dailog.FormNodeType.select,
                        Text: "何时开始 - 小时",
                        Class: "data_day",
                        Data: List.From(["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]).Select(function (c) { return ({ Name: c, Value: c }); }),
                        Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                    }, {
                        Name: "TntervalDayMinutes",
                        Type: Dailog.FormNodeType.select,
                        Text: "何时开始 - 分钟",
                        Class: "data_day",
                        Data: List.From(["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"]).Select(function (c) { return ({ Name: c, Value: c }); }),
                        Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                    }, {
                        Name: "Mission_FleetID",
                        Type: Dailog.FormNodeType.select,
                        Text: "选择舰队",
                        Class: "data_mission",
                        Data: List.From([{ "Name": "第一舰队", "Value": "1" }, { "Name": "第二舰队", "Value": "2" }, { "Name": "第三舰队", "Value": "3" }, { "Name": "第四舰队", "Value": "4" }]),
                        Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                    }, {
                        Name: "MissionID",
                        Type: Dailog.FormNodeType.select,
                        Text: "选择一个任务",
                        Class: "data_mission",
                        Data: MissionWorker.Works.Select(function (c) { return ({ Name: c.WorkName, Value: c.CustiomPVEID }); }),
                        Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                    }, {
                        Name: "Mission_TotalWorkNumber",
                        Type: Dailog.FormNodeType.text,
                        Text: "任务次数",
                        Value: "1",
                        Class: "data_mission",
                        Placeholder: "请输入执行次数",
                        Validates: List.From([{ Key: "required", Value: true, Message: "请输入次数" }, { Key: "digits", Value: true, Message: "输入整数" }])
                    }, {
                        Name: "QueueID",
                        Type: Dailog.FormNodeType.select,
                        Text: "选择一个队列",
                        Class: "data_queue",
                        Data: Config.PlayerConfig.CustomPevQueues.Select(function (c) { return ({ Name: c.QueueName, Value: c.QueueID }); }),
                        Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                    }, {
                        Name: "YanXi_FleetID",
                        Type: Dailog.FormNodeType.select,
                        Text: "选择舰队",
                        Class: "data_yanxi",
                        Data: List.From([{ "Name": "第一舰队", "Value": "1" }, { "Name": "第二舰队", "Value": "2" }, { "Name": "第三舰队", "Value": "3" }, { "Name": "第四舰队", "Value": "4" }]),
                        Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                    }, {
                        Name: "YanXi_Formation",
                        Type: Dailog.FormNodeType.select,
                        Text: "阵型",
                        Class: "data_yanxi",
                        Data: List.From([{ "Name": "单纵阵", "Value": "1" }, { "Name": "复纵阵", "Value": "2" }, { "Name": "轮行阵", "Value": "3" }, { "Name": "梯形阵", "Value": "4" }, { "Name": "单横阵", "Value": "5" }]),
                        Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                    }, {
                        Name: "YanXi_UnFightQianTing",
                        Type: Dailog.FormNodeType.select,
                        Text: "不打旗舰潜艇",
                        Class: "data_yanxi",
                        Data: List.From([{ "Name": "不使用", "Value": "0" }, { "Name": "启用", "Value": "1" }]),
                        Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                    }, {
                        Name: "YanXi_FightNight",
                        Type: Dailog.FormNodeType.select,
                        Text: "夜战",
                        Class: "data_yanxi",
                        Data: List.From([{ "Name": "不夜战", "Value": "0" }, { "Name": "夜战", "Value": "1" }]),
                        Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                    }, {
                        Name: "ZhanYi_CampaignID",
                        Type: Dailog.FormNodeType.select,
                        Text: "战役",
                        Class: "data_zhanyi",
                        Data: List.From([{ "Name": "驱逐简单", "Value": "101" }, { "Name": "驱逐困难", "Value": "102" }, { "Name": "巡洋简单", "Value": "201" }, { "Name": "巡洋困难", "Value": "202" }, { "Name": "战列简单", "Value": "301" }, { "Name": "战列困难", "Value": "302" }, { "Name": "航母简单", "Value": "401" }, { "Name": "航母困难", "Value": "402" }, { "Name": "潜艇简单", "Value": "501" }, { "Name": "潜艇困难", "Value": "502" }]),
                        Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                    }, {
                        Name: "ZhanYi_Formation",
                        Type: Dailog.FormNodeType.select,
                        Text: "阵型",
                        Class: "data_zhanyi",
                        Data: List.From([{ "Name": "单纵阵", "Value": "1" }, { "Name": "复纵阵", "Value": "2" }, { "Name": "轮行阵", "Value": "3" }, { "Name": "梯形阵", "Value": "4" }, { "Name": "单横阵", "Value": "5" }]),
                        Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                    }, {
                        Name: "ZhanYi_FightNight",
                        Type: Dailog.FormNodeType.select,
                        Text: "夜战",
                        Class: "data_zhanyi",
                        Data: List.From([{ "Name": "不夜战", "Value": "0" }, { "Name": "夜战", "Value": "1" }]),
                        Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                    }, {
                        Name: "ZhanYi_RepairLevel",
                        Type: Dailog.FormNodeType.select,
                        Text: "修理方式",
                        Class: "data_zhanyi",
                        Data: List.From([{ "Name": "修大中破", "Value": "2" }, { "Name": "只修大破", "Value": "1" }, { "Name": "不修理", "Value": "0" }]),
                        Validates: List.From([{ Key: "required", Value: true, Message: "请选择选择框" }])
                    }]), OnBuild: function ($modal) {
                    $modal.find("[name='TaskType']").val(modifyTask.TaskType);
                    $modal.find("[name='TntervalDayHour']").val((modifyTask.TntervalDayHour.toString().length == 1 ? "0" : "") + modifyTask.TntervalDayHour);
                    $modal.find("[name='TntervalDayMinutes']").val((modifyTask.TntervalDayMinutes.toString().length == 1 ? "0" : "") + modifyTask.TntervalDayMinutes);
                    $modal.find("[name='TntervalType']").val(modifyTask.TntervalType);
                    $modal.find("[name='TntervalWeek']").val(modifyTask.TntervalWeek);
                    $modal.find("[name='MissionID']").val(modifyTask.MissionID);
                    $modal.find("[name='Mission_FleetID']").val(modifyTask.Mission_FleetID);
                    $modal.find("[name='Mission_TotalWorkNumber']").val(modifyTask.Mission_TotalWorkNumber);
                    $modal.find("[name='Mission_StopOnNewShip']").val(modifyTask.Mission_StopOnNewShip == true ? "1" : "0");
                    $modal.find("[name='Mission_QianTingDanHeng']").val(modifyTask.Mission_QianTingDanHeng == true ? "1" : "0");
                    $modal.find("[name='Mission_IsAutoChangeShip']").val(modifyTask.Mission_IsAutoChangeShip == true ? "1" : "0");
                    $modal.find("[name='QueueID']").val(modifyTask.QueueID);
                    $modal.find("[name='YanXi_FleetID']").val(modifyTask.YanXi_FleetID);
                    $modal.find("[name='YanXi_Formation']").val(modifyTask.YanXi_Formation);
                    $modal.find("[name='YanXi_FightNight']").val(modifyTask.YanXi_FightNight);
                    $modal.find("[name='YanXi_UnFightQianTing']").val(modifyTask.YanXi_UnFightQianTing == true ? "1" : "0");
                    $modal.find("[name='ZhanYi_CampaignID']").val(modifyTask.ZhanYi_CampaignID);
                    $modal.find("[name='ZhanYi_Formation']").val(modifyTask.ZhanYi_Formation);
                    $modal.find("[name='ZhanYi_FightNight']").val(modifyTask.ZhanYi_FightNight);
                    $modal.find("[name='ZhanYi_RepairLevel']").val(modifyTask.ZhanYi_RepairLevel);
                    var $split = $("<div></div>").css({ "height": "1vw", "border-top": "1vw dotted #b6b6b6", "margin-top": "2vw" });
                    $modal.find("[name=TntervalDayMinutes]").parents(".form-group").after($split);
                    $modal.find("[name=TntervalType]").change(function () {
                        var TntervalType = $modal.find("[name=TntervalType]").val();
                        if (TntervalType == "每周") {
                            $modal.find(".data_week").parents(".form-group").show();
                        }
                        else {
                            $modal.find(".data_week").parents(".form-group").hide();
                        }
                    }).triggerHandler("change");
                    $modal.find("[name=TaskType]").change(function () {
                        var TaskType = $modal.find("[name=TaskType]").val();
                        if (TaskType == "执行任务") {
                            $modal.find(".data_mission").parents(".form-group").show();
                            $modal.find(".data_queue").parents(".form-group").hide();
                            $modal.find(".data_yanxi").parents(".form-group").hide();
                            $modal.find(".data_zhanyi").parents(".form-group").hide();
                        }
                        else if (TaskType == "执行队列") {
                            $modal.find(".data_mission").parents(".form-group").hide();
                            $modal.find(".data_queue").parents(".form-group").show();
                            $modal.find(".data_yanxi").parents(".form-group").hide();
                            $modal.find(".data_zhanyi").parents(".form-group").hide();
                        }
                        else if (TaskType == "执行演习") {
                            $modal.find(".data_mission").parents(".form-group").hide();
                            $modal.find(".data_queue").parents(".form-group").hide();
                            $modal.find(".data_yanxi").parents(".form-group").show();
                            $modal.find(".data_zhanyi").parents(".form-group").hide();
                        }
                        else if (TaskType == "执行战役") {
                            $modal.find(".data_mission").parents(".form-group").hide();
                            $modal.find(".data_queue").parents(".form-group").hide();
                            $modal.find(".data_yanxi").parents(".form-group").hide();
                            $modal.find(".data_zhanyi").parents(".form-group").show();
                        }
                        else {
                            $modal.find(".data_mission").parents(".form-group").hide();
                            $modal.find(".data_queue").parents(".form-group").hide();
                            $modal.find(".data_yanxi").parents(".form-group").hide();
                            $modal.find(".data_zhanyi").parents(".form-group").hide();
                        }
                    }).triggerHandler("change");
                }, OnSubmit: function (fromJsonObj, $modal) {
                    return __awaiter(this, void 0, void 0, function () {
                        var TaskType, TntervalType, TntervalDayHour, TntervalDayMinutes, TntervalWeek, MissionID, Mission_FleetID, Mission_TotalWorkNumber, Mission_StopOnNewShip, Mission_QianTingDanHeng, Mission_IsAutoChangeShip, QueueID, YanXi_FleetID, YanXi_Formation, YanXi_FightNight, YanXi_UnFightQianTing, ZhanYi_CampaignID, ZhanYi_Formation, ZhanYi_FightNight, ZhanYi_RepairLevel;
                        return __generator(this, function (_a) {
                            $modal.find("[data-check=save]").attr("disabled", "disabled");
                            $modal.find("[data-dismiss=modal]").triggerHandler("click");
                            TaskType = fromJsonObj.TaskType;
                            TntervalType = fromJsonObj.TntervalType;
                            TntervalDayHour = (fromJsonObj.TntervalDayHour.indexOf("0") == 0 ? fromJsonObj.TntervalDayHour.substring(1, 2) : fromJsonObj.TntervalDayHour).ToNumber();
                            TntervalDayMinutes = (fromJsonObj.TntervalDayMinutes.indexOf("0") == 0 ? fromJsonObj.TntervalDayMinutes.substring(1, 2) : fromJsonObj.TntervalDayMinutes).ToNumber();
                            TntervalWeek = fromJsonObj.TntervalWeek.ToNumber();
                            MissionID = fromJsonObj.MissionID;
                            Mission_FleetID = fromJsonObj.Mission_FleetID.ToNumber();
                            Mission_TotalWorkNumber = fromJsonObj.Mission_TotalWorkNumber.ToNumber();
                            Mission_StopOnNewShip = false;
                            Mission_QianTingDanHeng = false;
                            Mission_IsAutoChangeShip = false;
                            QueueID = fromJsonObj.QueueID;
                            YanXi_FleetID = fromJsonObj.YanXi_FleetID.ToNumber();
                            YanXi_Formation = fromJsonObj.YanXi_Formation.ToNumber();
                            YanXi_FightNight = fromJsonObj.YanXi_FightNight.ToNumber();
                            YanXi_UnFightQianTing = fromJsonObj.YanXi_UnFightQianTing == "1";
                            ZhanYi_CampaignID = fromJsonObj.ZhanYi_CampaignID.ToNumber();
                            ZhanYi_Formation = fromJsonObj.ZhanYi_Formation.ToNumber();
                            ZhanYi_FightNight = fromJsonObj.ZhanYi_FightNight.ToNumber();
                            ZhanYi_RepairLevel = fromJsonObj.ZhanYi_RepairLevel.ToNumber();
                            modifyTask.TaskType = TaskType;
                            modifyTask.TntervalType = TntervalType;
                            modifyTask.TntervalDayHour = TntervalDayHour;
                            modifyTask.TntervalDayMinutes = TntervalDayMinutes;
                            modifyTask.TntervalWeek = TntervalWeek;
                            modifyTask.MissionID = MissionID;
                            modifyTask.Mission_FleetID = Mission_FleetID;
                            modifyTask.Mission_TotalWorkNumber = Mission_TotalWorkNumber;
                            modifyTask.Mission_StopOnNewShip = Mission_StopOnNewShip;
                            modifyTask.Mission_QianTingDanHeng = Mission_QianTingDanHeng;
                            modifyTask.Mission_IsAutoChangeShip = Mission_IsAutoChangeShip;
                            modifyTask.QueueID = QueueID;
                            modifyTask.YanXi_FleetID = YanXi_FleetID;
                            modifyTask.YanXi_Formation = YanXi_Formation;
                            modifyTask.YanXi_FightNight = YanXi_FightNight;
                            modifyTask.YanXi_UnFightQianTing = YanXi_UnFightQianTing;
                            modifyTask.ZhanYi_CampaignID = ZhanYi_CampaignID;
                            modifyTask.ZhanYi_Formation = ZhanYi_Formation;
                            modifyTask.ZhanYi_FightNight = ZhanYi_FightNight;
                            modifyTask.ZhanYi_RepairLevel = ZhanYi_RepairLevel;
                            modifyTask.LastRunTimeSpan = 0;
                            modifyTask.IsActive = false;
                            _This.CheckUpdateDocks();
                            return [2];
                        });
                    });
                }
            });
        };
        Area_JiHuaRenWu.prototype.InitUpdateTimer = function () {
            var _this = this;
            this.UpdateTimer = new Timer();
            this.UpdateTimer.Interval = 1000;
            this.UpdateTimer.Elapsed = function () {
                _this.UpdateTimer.Stop();
                try {
                    _this.UpdateView();
                }
                catch (ex) {
                }
                finally {
                    _this.UpdateTimer.Start();
                }
            };
            this.UpdateView();
            this.UpdateTimer.Start();
        };
        Area_JiHuaRenWu.prototype.UpdateView = function () {
            if (this.IsCurrentPage) {
                this.CheckUpdateDocks();
            }
        };
        Area_JiHuaRenWu.prototype.CheckUpdateDocks = function () {
            var _This = this;
            var TempEntityData = Config.PlayerConfig.ScheduledTasks.Select(function (c) {
                return {
                    TaskID: c.TaskID,
                    TaskType: c.TaskType,
                    MissionID: c.MissionID,
                    Mission_FleetID: c.Mission_FleetID,
                    Mission_TotalWorkNumber: c.Mission_TotalWorkNumber,
                    Mission_StopOnNewShip: c.Mission_StopOnNewShip,
                    Mission_QianTingDanHeng: c.Mission_QianTingDanHeng,
                    Mission_IsAutoChangeShip: c.Mission_IsAutoChangeShip,
                    YanXi_FleetID: c.YanXi_FleetID,
                    YanXi_Formation: c.YanXi_Formation,
                    YanXi_FightNight: c.YanXi_FightNight,
                    YanXi_UnFightQianTing: c.YanXi_UnFightQianTing,
                    ZhanYi_CampaignID: c.ZhanYi_CampaignID,
                    ZhanYi_Formation: c.ZhanYi_Formation,
                    ZhanYi_RepairLevel: c.ZhanYi_RepairLevel,
                    ZhanYi_FightNight: c.ZhanYi_FightNight,
                    QueueID: c.QueueID,
                    LastRunTimeSpan: c.LastRunTimeSpan,
                    TntervalType: c.TntervalType == "每周" ? (c.TntervalWeek == 0 ? "星期天" : (c.TntervalWeek == 1 ? "星期一" : (c.TntervalWeek == 2 ? "星期二" : (c.TntervalWeek == 3 ? "星期三" : (c.TntervalWeek == 4 ? "星期四" : (c.TntervalWeek == 5 ? "星期五" : (c.TntervalWeek == 6 ? "星期六" : ("星期X")))))))) : c.TntervalType,
                    TntervalDayHour: c.TntervalDayHour,
                    TntervalDayMinutes: c.TntervalDayMinutes,
                    TntervalWeek: c.TntervalWeek,
                    IsActive: c.IsActive,
                    MissionName: MissionWorker.Works.Where(function (d) { return d.CustiomPVEID == c.MissionID; }).Count() == 0 ? "任务不存在" : MissionWorker.Works.FirstOrDefault(function (d) { return d.CustiomPVEID == c.MissionID; }).WorkName,
                    QueueName: Config.PlayerConfig.CustomPevQueues.Where(function (d) { return d.QueueID == c.QueueID; }).Count() == 0 ? "队列不存在" : Config.PlayerConfig.CustomPevQueues.FirstOrDefault(function (d) { return d.QueueID == c.QueueID; }).QueueName,
                    LastRunTime: c.LastRunTimeSpan > 0 ? DateTime.ParseTime(c.LastRunTimeSpan).ToString("yyyy/MM/dd HH:mm:ss").ReplaceAll("/", "-") : "",
                };
            });
            if (this.LastDockListJsonString != NJson.Stringify(TempEntityData)) {
                this.LastDockListJsonString = NJson.Stringify(TempEntityData);
                var $taskListTemp = $(doT.template(_This.$Area.find("[data-tempid='taskListTemp']").html())(NJson.ObjListToArray(NJson.DeepCopy(TempEntityData))));
                _This.$Area.find(".tasklists").html("").append($taskListTemp);
                var $tasks = $taskListTemp.filter(".task");
                $tasks.each(function (index, element) {
                    var $task = $(element);
                    var taskid = $task.attr("data-taskid");
                    $task.find(".head .actions .actionActive").click(function () {
                        var task = Config.PlayerConfig.ScheduledTasks.FirstOrDefault(function (c) { return c.TaskID == taskid; });
                        task.IsActive = true;
                        _This.CheckUpdateDocks();
                    });
                    $task.find(".head .actions .actionClose").click(function () {
                        var task = Config.PlayerConfig.ScheduledTasks.FirstOrDefault(function (c) { return c.TaskID == taskid; });
                        task.IsActive = false;
                        _This.CheckUpdateDocks();
                    });
                    $task.find(".head .actions .actionRemove").click(function () {
                        MessageBox.Confirm("确定删除此计划？", function () {
                            Config.PlayerConfig.ScheduledTasks.RemoveAll(function (c) { return c.TaskID == taskid; });
                            _This.CheckUpdateDocks();
                        });
                    });
                    $task.find(".head .actions .actionModify").click(function () {
                        _This.OpenModifyTask(taskid);
                    });
                });
            }
        };
        Area_JiHuaRenWu.prototype.BeforeOpen = function () { return true; };
        ;
        Area_JiHuaRenWu.prototype.OnOpen = function () {
            var _This = this;
            var $Area = _This.$Area;
            _This.InitUpdateTimer();
        };
        ;
        Area_JiHuaRenWu.prototype.OnOpened = function () { };
        ;
        Area_JiHuaRenWu.prototype.BeforeClose = function () { return true; };
        ;
        Area_JiHuaRenWu.prototype.OnClosed = function () {
            this.UpdateTimer.Dispose();
        };
        ;
        return Area_JiHuaRenWu;
    }());
    MainPage.OnLoad();
});
//# sourceMappingURL=Areas.js.map