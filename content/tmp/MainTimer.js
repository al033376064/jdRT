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
var MainTimer = (function () {
    function MainTimer() {
    }
    MainTimer.Start = function () {
        var _this = this;
        this.LastUpdatePlayerConfig_String_Local = NJson.Stringify(Config.PlayerConfig);
        this.LastUpdatePlayerConfig_String_Cloud = this.LoadLocalPlayerConfig == true ? "" : this.LastUpdatePlayerConfig_String_Local;
        this.LastUpdatePlayerStatistics_String_Local = NJson.Stringify(Config.PlayerStatistics);
        this.LastUpdatePlayerStatistics_String_Cloud = this.LoadLocalPlayerStatistics == true ? "" : this.LastUpdatePlayerStatistics_String_Local;
        this.LastUpdateMoreSetting_String_Local = NJson.Stringify(Config.MoreSetting);
        this.LastUpdateMoreSetting_String_Cloud = this.LoadLocalMoreSetting == true ? "" : this.LastUpdateMoreSetting_String_Local;
        this.timer = new Timer();
        this.timer.Interval = 2000;
        this.timer.Elapsed = function () { return __awaiter(_this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timer.Stop();
                        this.TickNum = this.TickNum < 100000 ? (this.TickNum + 1) : 0;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 17, 18, 19]);
                        if (!(this.TickNum % 3 == 0)) return [3, 4];
                        this.CheckCardPast();
                        this.ResetTodayGet();
                        this.CheckConfigUpdate_Local();
                        if (!(Config.MoreSetting.InitTodayReflash == true)) return [3, 3];
                        return [4, this.CheckTodayInitReflash()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        this.CheckShipHeart();
                        _a.label = 4;
                    case 4:
                        if (this.TickNum % 60 == 0) {
                            this.CheckConfigUpdate_Cloud();
                        }
                        if (!(this.TickNum % 5 == 0)) return [3, 14];
                        if (!!(NetErrorRelinker.IsLostConnection == true || NetErrorRelinker.IsGameServerWeiHu == true)) return [3, 14];
                        return [4, this.CheckLoginAward()];
                    case 5:
                        _a.sent();
                        return [4, this.CheckRenWuAward()];
                    case 6:
                        _a.sent();
                        if (!(MissionWorker.State == DBEnum.WorkState.Ready && ZhanYiWorker.State == DBEnum.WorkState.Ready && YanXiWorker.State == DBEnum.WorkState.Ready)) return [3, 8];
                        return [4, this.CheckRepairDock()];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        if (!(MissionWorker.State == DBEnum.WorkState.Ready && ZhanYiWorker.State == DBEnum.WorkState.Ready && YanXiWorker.State == DBEnum.WorkState.Ready)) return [3, 12];
                        if (!(AutoJianZao.IsGeting == false)) return [3, 10];
                        return [4, AutoJianZao.CheckShipBuildDock()];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10:
                        if (!(AutoKaiFa.IsGeting == false)) return [3, 12];
                        return [4, AutoKaiFa.CheckEquipBuildDock()];
                    case 11:
                        _a.sent();
                        _a.label = 12;
                    case 12:
                        if (!(Config.PlayerConfig.AutoExplore && MissionWorker.State == DBEnum.WorkState.Ready)) return [3, 14];
                        return [4, Common.CheckYuanZheng()];
                    case 13:
                        _a.sent();
                        _a.label = 14;
                    case 14:
                        if (!(this.TickNum % 11 == 0)) return [3, 16];
                        return [4, this.CheckScheduledTask()];
                    case 15:
                        _a.sent();
                        _a.label = 16;
                    case 16: return [3, 19];
                    case 17:
                        ex_1 = _a.sent();
                        console.log(ex_1);
                        return [3, 19];
                    case 18:
                        this.timer.Start();
                        return [7];
                    case 19: return [2];
                }
            });
        }); };
        this.timer.Start();
    };
    MainTimer.CheckShipHeart = function () {
        var _This = this;
        try {
            var nowdict = new List();
            [1, 2, 3, 4].forEach(function (fi) {
                var fships = Player.GetFleetShips(fi);
                nowdict.AddRange(fships.Select(function (c) { return new KeyValue(c.id, c.love); }));
            });
            if (NJson.Stringify(nowdict.Select(function (c) { return c.Key; })) != NJson.Stringify(_This.HeartShipsData.Select(function (c) { return c.Key; }))) {
                _This.HeartShipsData = nowdict;
            }
            else {
                var currentFleet = Player.GetFleetShips();
                for (var i = 0; i < currentFleet.Length; i++) {
                    var ship = currentFleet[i];
                    var oldHart = _This.HeartShipsData.FirstOrDefault(function (c) { return c.Key == ship.id; }) == null ? ship.love : _This.HeartShipsData.FirstOrDefault(function (c) { return c.Key == ship.id; }).Value;
                    var newHart = ship.love;
                    if (newHart < oldHart) {
                        if (api.systemType.toLowerCase() == "web" || (api.systemType.toLowerCase() == "android" && Config.OpenActions.indexOf("AndroidPostWorkError") >= 0) || (api.systemType.toLowerCase() == "ios" && Config.OpenActions.indexOf("IOSPostWorkError") >= 0)) {
                            var logLength = $("#PartialMission .mainLog #LogsInfo p").length;
                            var context = List.From($("#PartialMission .mainLog #LogsInfo p:gt(" + Math.max(0, logLength - 20) + ")").toArray()).Select(function (c) { return $(c).html(); }).JoinToString("|");
                            context = Encrypt.Base64Encrypt(context).replace(/\+/g, '%2B').replace(/\=/g, '%3D');
                            var stack = Encrypt.Base64Encrypt(JSON.stringify({
                                CurrentFleet: NJson.ObjListToArray(NJson.DeepCopy(currentFleet)),
                                FleetVo: NJson.ObjListToArray(NJson.DeepCopy(Player.FleetVo)),
                                RepairDockVo: NJson.ObjListToArray(NJson.DeepCopy(Player.RepairDockVo)),
                                User: NJson.ObjListToArray(NJson.DeepCopy(Player.User)),
                                Mission: NJson.ObjListToArray(NJson.DeepCopy(MissionWorker.CurrentWork)),
                                MissionTotal: MissionWorker.MissionProgressTotal,
                                MissionNow: MissionWorker.MissionProgressNow,
                                LastHTTPRequest: Config.LastHTTPRequest.Select(function (c) { return Encrypt.Base64Encrypt(c).replace(/\+/g, '%2B').replace(/\=/g, '%3D'); }).ToArray()
                            })).replace(/\+/g, '%2B').replace(/\=/g, '%3D');
                            NetHelper.HTTPTokenPost("https://crt.letgowin.com/IO/PostClientError", {
                                Tag: "WorkError",
                                CodeNo: new Date().getTime(),
                                Drive: api.systemType.toLowerCase(),
                                AppVersion: api.appVersion + (SysLocalStorage.Get("smartupdate_vname") == undefined ? "" : SysLocalStorage.Get("smartupdate_vname")),
                                LoginArea: Config.LoginUser.LoginArea,
                                LoginName: Config.LoginUser.LoginName,
                                ServerName: Config.LoginUser.ServerName,
                                Message: "掉好感",
                                StackTrace: stack,
                                Context: context
                            });
                            setTimeout(function () {
                                _This.CheckConfigUpdate_Local();
                                _This.CheckConfigUpdate_Cloud();
                                api.rebootApp();
                            }, 500);
                        }
                        break;
                    }
                }
                _This.HeartShipsData = nowdict;
            }
        }
        catch (_a) {
        }
    };
    MainTimer.ResetTodayGet = function () {
        var lastUpdateDay = DateTime.ParseTime(Config.PlayerStatistics.LastUpdateTime * 1000).Date;
        var netTimeDay = DateTime.ParseTime(NetDate.GetTimeSpan()).Date;
        if (lastUpdateDay.SmallThen(netTimeDay)) {
            MissionWorker.IsStopOnDayGetShipLimit = false;
            Config.PlayerStatistics.LastUpdateTime = NetDate.GetTimeSpanSecound();
            Config.PlayerStatistics.DayGetShipCount = 0;
            Config.PlayerStatistics.DayGetSpoilsCount = 0;
            Config.PlayerStatistics.DayGetYuanZheng_Oil = 0;
            Config.PlayerStatistics.DayGetYuanZheng_Ammo = 0;
            Config.PlayerStatistics.DayGetYuanZheng_Steel = 0;
            Config.PlayerStatistics.DayGetYuanZheng_Aluminium = 0;
            Config.PlayerStatistics.DayGetYuanZheng_RepairNum = 0;
            Config.PlayerStatistics.DayGetYuanZheng_KuanJianNum = 0;
            Config.PlayerStatistics.DayGetYuanZheng_EquipTuZhiNum = 0;
            Config.PlayerStatistics.DayGetYuanZheng_ShipTuZhiNum = 0;
            MainTimer.CheckConfigUpdate_Local();
            MainTimer.CheckConfigUpdate_Cloud();
        }
    };
    MainTimer.CheckCardPast = function () {
        var cardaliveTime = Config.CardPastTime.GetTimeSpan() - NetDate.GetTimeSpan();
        if (cardaliveTime < -43200000) {
            NetErrorRelinker.IsGameServerWeiHu = true;
            Logs.Print("激活码已到期 - " + Config.CardPastTime.ToString("yyyy/MM/dd HH:mm:ss").ReplaceAll("/", "-"));
            if (MissionWorker.State != DBEnum.WorkState.Ready) {
                MissionWorker.Stop();
            }
        }
    };
    MainTimer.CheckConfigUpdate_Local = function () {
        var _This = this;
        if (Player.UserShipVo == null || Player.UserShipVo.Count() == 0 || NetErrorRelinker.IsLostConnection == true || NetErrorRelinker.IsGameServerWeiHu == true)
            return;
        var IsUpdatePlayerConfig = NJson.Stringify(Config.PlayerConfig) != _This.LastUpdatePlayerConfig_String_Local;
        var IsUpdateStatisticsData = NJson.Stringify(Config.PlayerStatistics) != _This.LastUpdatePlayerStatistics_String_Local;
        var IsUpdateMoreSetting = NJson.Stringify(Config.MoreSetting) != _This.LastUpdateMoreSetting_String_Local;
        if (IsUpdatePlayerConfig == true || IsUpdateStatisticsData == true || IsUpdateMoreSetting == true) {
            if (IsUpdatePlayerConfig == true) {
                console.log("配置文件已更新到本地");
                Config.PlayerConfig.LastUpdateTime = NetDate.GetTimeSpanSecound();
                _This.LastUpdatePlayerConfig_String_Local = NJson.Stringify(Config.PlayerConfig);
                SysLocalStorage.Set("PlayerConfig_" + Config.LoginUser.LoginName + "_" + Config.LoginUser.ServerName, NJson.ObjListToArray(NJson.DeepCopy(Config.PlayerConfig)));
            }
            if (IsUpdateStatisticsData == true) {
                console.log("数据统计已更新到本地");
                Config.PlayerStatistics.LastUpdateTime = NetDate.GetTimeSpanSecound();
                _This.LastUpdatePlayerStatistics_String_Local = NJson.Stringify(Config.PlayerStatistics);
                SysLocalStorage.Set("PlayerStatistics_" + Config.LoginUser.LoginName + "_" + Config.LoginUser.ServerName, NJson.ObjListToArray(NJson.DeepCopy(Config.PlayerStatistics)));
            }
            if (IsUpdateMoreSetting == true) {
                console.log("更多配置已更新到本地");
                Config.MoreSetting.LastUpdateTime = NetDate.GetTimeSpanSecound();
                _This.LastUpdateMoreSetting_String_Local = NJson.Stringify(Config.MoreSetting);
                SysLocalStorage.Set("MoreSetting_" + Config.LoginUser.LoginName + "_" + Config.LoginUser.ServerName, NJson.ObjListToArray(NJson.DeepCopy(Config.MoreSetting)));
            }
        }
    };
    MainTimer.CheckConfigUpdate_Cloud = function () {
        var _This = this;
        if (Player.UserShipVo == null || Player.UserShipVo.Count() == 0 || NetErrorRelinker.IsLostConnection == true || NetErrorRelinker.IsGameServerWeiHu == true)
            return;
        var IsUpdatePlayerConfig = _This.LastUpdatePlayerConfig_String_Local != _This.LastUpdatePlayerConfig_String_Cloud;
        var IsUpdateStatisticsData = _This.LastUpdatePlayerStatistics_String_Local != _This.LastUpdatePlayerStatistics_String_Cloud;
        var IsUpdateMoreSettingData = _This.LastUpdateMoreSetting_String_Local != _This.LastUpdateMoreSetting_String_Cloud;
        if (IsUpdatePlayerConfig == true || IsUpdateStatisticsData == true || IsUpdateMoreSettingData == true) {
            if (IsUpdatePlayerConfig == true) {
                console.log("配置文件有更新立即更新");
                _This.LastUpdatePlayerConfig_String_Cloud = _This.LastUpdatePlayerConfig_String_Local;
            }
            if (IsUpdateStatisticsData == true) {
                console.log("数据统计有更新立即更新");
                _This.LastUpdatePlayerStatistics_String_Cloud = _This.LastUpdatePlayerStatistics_String_Local;
            }
            if (IsUpdateMoreSettingData == true) {
                console.log("更多配置有更新立即更新");
                _This.LastUpdateMoreSetting_String_Cloud = _This.LastUpdateMoreSetting_String_Local;
            }
            NetHelper.HTTPTokenPost("https://crt.letgowin.com/IO/UpdateConfig", {
                LoginName: Config.LoginUser.LoginName,
                ServerName: Config.LoginUser.ServerName,
                Drive: api.systemType.toLowerCase(),
                AppVersion: api.appVersion,
                LoginArea: Config.LoginUser.LoginArea,
                ConfigData: IsUpdatePlayerConfig == true ? _This.LastUpdatePlayerConfig_String_Cloud : "",
                StatisticsData: IsUpdateStatisticsData == true ? _This.LastUpdatePlayerStatistics_String_Cloud : "",
                MoreSettingData: IsUpdateMoreSettingData == true ? _This.LastUpdateMoreSetting_String_Cloud : "",
            });
        }
    };
    MainTimer.CheckLoginAward = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (NetErrorRelinker.IsLostConnection == true || NetErrorRelinker.IsGameServerWeiHu == true)
                            return [2];
                        if (!(Player.CanGainDayReward > 0 && Config.PlayerConfig.AutoAward == true && MissionWorker.State == DBEnum.WorkState.Ready)) return [3, 2];
                        Logs.Print("领取登陆奖励 - 第 " + (Player.CanGainDayReward) + " 天");
                        Player.CanGainDayReward = -1;
                        return [4, Net.Award.LoginAward()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2];
                }
            });
        });
    };
    MainTimer.CheckRenWuAward = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var canGainAwards;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (NetErrorRelinker.IsLostConnection == true || NetErrorRelinker.IsGameServerWeiHu == true)
                            return [2];
                        if (!(Config.PlayerConfig.AutoAward == true && MissionWorker.State == DBEnum.WorkState.Ready && YanXiWorker.State == DBEnum.WorkState.Ready && ZhanYiWorker.State == DBEnum.WorkState.Ready)) return [3, 2];
                        canGainAwards = Player.TaskVo.Where(function (c) { return (c.issuccess != true) && c.condition.Count() > 0 && (c.condition.Where(function (d) { return d.finishedamount < d.totalamount; }).Count() == 0); });
                        return [4, canGainAwards.ForEachAsync(function (task) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            task.getawardtime = NetDate.GetTimeSpan();
                                            task.issuccess = true;
                                            Logs.Print("完成任务 - " + task.title);
                                            return [4, Net.Award.GetAward(task.taskcid)];
                                        case 1:
                                            _a.sent();
                                            return [2];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2];
                }
            });
        });
    };
    MainTimer.CheckRepairDock = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var pastTime, successDocks;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (NetErrorRelinker.IsLostConnection == true || NetErrorRelinker.IsGameServerWeiHu == true)
                            return [2];
                        if (this.CheckRepairDock_Locker == true) {
                            return [2];
                        }
                        this.CheckRepairDock_Locker = true;
                        pastTime = NetDate.GetTimeSpanSecound() - 30;
                        successDocks = Player.RepairDockVo.Select(function (c) { return ({ id: c.id, locked: c.locked, shipid: c.shipid, starttime: c.starttime, endtime: c.endtime }); }).Where(function (c) { return c.shipid > 0 && c.endtime < pastTime; });
                        return [4, successDocks.ForEachAsync(function (dock) { return __awaiter(_this, void 0, void 0, function () {
                                var repairResult;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4, Net.Conditioning.DockRepairComplete(dock.id, dock.shipid)];
                                        case 1:
                                            repairResult = _a.sent();
                                            return [4, Sleep(2000)];
                                        case 2:
                                            _a.sent();
                                            if (repairResult.ErrorCode == 0) {
                                                Logs.Print("澡堂 - " + Player.GetShipName(Player.UserShipVo.FirstOrDefault(function (c) { return c.id == dock.shipid; })) + " 修理完成", DBEnum.ENUM_NotificationType.修理完成);
                                            }
                                            else {
                                                Logs.Print("澡堂 - " + Player.GetShipName(Player.UserShipVo.FirstOrDefault(function (c) { return c.id == dock.shipid; })) + " 修理失败");
                                            }
                                            return [2];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        this.CheckRepairDock_Locker = false;
                        return [2];
                }
            });
        });
    };
    MainTimer.CheckTodayInitReflash = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (NetErrorRelinker.IsLostConnection == true || NetErrorRelinker.IsGameServerWeiHu == true)
                            return [2];
                        if (!(MissionWorker.State == DBEnum.WorkState.Ready && YanXiWorker.State == DBEnum.WorkState.Ready && ZhanYiWorker.State == DBEnum.WorkState.Ready)) return [3, 2];
                        return [4, Common.CheckTodayInitReflash()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2];
                }
            });
        });
    };
    MainTimer.CheckScheduledTask = function () {
        return __awaiter(this, void 0, void 0, function () {
            var nowTimeSpan, now, today, aliveTasks;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nowTimeSpan = NetDate.GetTimeSpanSecound();
                        now = DateTime.ParseTime(NetDate.GetTimeSpan());
                        today = now.Date;
                        aliveTasks = Config.PlayerConfig.ScheduledTasks.Where(function (c) {
                            if (c.IsActive == false) {
                                return false;
                            }
                            if (c.TntervalType == "每天" || c.TntervalType == "一次" || (c.TntervalType == "每周" && new Date(now.GetTimeSpan()).getDay() == c.TntervalWeek)) {
                                var pastTime = today.AddMinutes(c.TntervalDayHour * 60 + c.TntervalDayMinutes);
                                if (pastTime.SmallThen(now) && (now.GetTimeSpan() - pastTime.GetTimeSpan()) <= (1000 * 300) && DateTime.ParseTime(c.LastRunTimeSpan).Date.GetTimeSpan() != today.Date.GetTimeSpan()) {
                                    console.log(["pastTime", pastTime]);
                                    return true;
                                }
                                else {
                                    return false;
                                }
                            }
                            else {
                                return false;
                            }
                        });
                        if (!(aliveTasks.Count() > 0)) return [3, 2];
                        return [4, this.ExecuteTask(aliveTasks[0])];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2];
                }
            });
        });
    };
    MainTimer.ExecuteTask = function (task) {
        return __awaiter(this, void 0, void 0, function () {
            var _This, localLastRunTimeSpan, work, queue, YanXi_FightNight, YanXi_FleetID, YanXi_Formation, YanXi_UnFightQianTing, challengeList, opps, initResult, ZhanYi_Formation, ZhanYi_CampaignID, ZhanYi_RepairLevel, ZhanYi_FightNight;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _This = this;
                        localLastRunTimeSpan = task.LastRunTimeSpan;
                        task.LastRunTimeSpan = NetDate.GetTimeSpanSecound();
                        if (task.TntervalType == "一次") {
                            task.IsActive = false;
                        }
                        if (!(task.TaskType == "关闭应用")) return [3, 1];
                        MainTimer.CheckConfigUpdate_Local();
                        api.rebootApp();
                        return [3, 20];
                    case 1:
                        if (!(task.TaskType == "执行任务")) return [3, 2];
                        work = MissionWorker.Works.FirstOrDefault(function (c) { return c.CustiomPVEID == task.MissionID; });
                        console.log(["work", work]);
                        if (NetErrorRelinker.IsLostConnection == true) {
                            return [2, MessageBox.Show("计划任务 - 【执行任务】账号已掉线.")];
                        }
                        else if (NetErrorRelinker.IsGameServerWeiHu == true) {
                            return [2, MessageBox.Show("计划任务 - 【执行任务】系统维护中.")];
                        }
                        else if (QueueWorker.State != DBEnum.WorkState.Ready) {
                            Logs.Print("计划任务 - 【执行任务】当前队列执行中");
                            QueueWorker.Stop();
                            task.LastRunTimeSpan = localLastRunTimeSpan;
                        }
                        else if (MissionWorker.State != DBEnum.WorkState.Ready) {
                            Logs.Print("计划任务 - 【执行任务】当前任务执行中");
                            MissionWorker.Stop();
                            task.LastRunTimeSpan = localLastRunTimeSpan;
                        }
                        else if (ZhanYiWorker.State != DBEnum.WorkState.Ready) {
                            Logs.Print("计划任务 - 【执行任务】当前战役执行中");
                            task.LastRunTimeSpan = localLastRunTimeSpan;
                        }
                        else if (YanXiWorker.State != DBEnum.WorkState.Ready) {
                            Logs.Print("计划任务 - 【执行任务】当前演习执行中");
                            task.LastRunTimeSpan = localLastRunTimeSpan;
                        }
                        else if (work == null || task.Mission_TotalWorkNumber == 0) {
                            Logs.Print("计划任务 - 【执行任务】任务无效");
                        }
                        else {
                            Logs.Print("计划任务 - 【执行任务】开始执行");
                            MissionWorker.CurrentWork = work;
                            $("#PartialMission #MissionList").val(MissionWorker.CurrentWork.CustiomPVEID);
                            Config.CurrentFleetID = task.Mission_FleetID;
                            MissionWorker.Start({ MissionProgressNow: 0, MissionProgressTotal: task.Mission_TotalWorkNumber });
                        }
                        return [3, 20];
                    case 2:
                        if (!(task.TaskType == "执行队列")) return [3, 3];
                        queue = Config.PlayerConfig.CustomPevQueues.FirstOrDefault(function (c) { return c.QueueID == task.QueueID; });
                        if (NetErrorRelinker.IsLostConnection == true) {
                            return [2, MessageBox.Show("计划任务 - 【执行任务】账号已掉线.")];
                        }
                        else if (NetErrorRelinker.IsGameServerWeiHu == true) {
                            return [2, MessageBox.Show("计划任务 - 【执行任务】系统维护中.")];
                        }
                        else if (QueueWorker.State != DBEnum.WorkState.Ready) {
                            Logs.Print("计划任务 - 【执行任务】当前队列执行中");
                            QueueWorker.Stop();
                            task.LastRunTimeSpan = localLastRunTimeSpan;
                        }
                        else if (MissionWorker.State != DBEnum.WorkState.Ready) {
                            Logs.Print("计划任务 - 【执行任务】当前任务执行中");
                            MissionWorker.Stop();
                            task.LastRunTimeSpan = localLastRunTimeSpan;
                        }
                        else if (ZhanYiWorker.State != DBEnum.WorkState.Ready) {
                            Logs.Print("计划任务 - 【执行任务】当前战役执行中");
                            task.LastRunTimeSpan = localLastRunTimeSpan;
                        }
                        else if (YanXiWorker.State != DBEnum.WorkState.Ready) {
                            Logs.Print("计划任务 - 【执行任务】当前演习执行中");
                            task.LastRunTimeSpan = localLastRunTimeSpan;
                        }
                        else if (queue == null) {
                            Logs.Print("计划任务 - 【执行任务】任务无效");
                        }
                        else if (QueueWorker.CheckRun(queue.QueueID) != "") {
                            Logs.Print("计划任务 - 【执行任务】" + QueueWorker.CheckRun(queue.QueueID));
                        }
                        else {
                            QueueWorker.Run(queue.QueueID);
                        }
                        return [3, 20];
                    case 3:
                        if (!(task.TaskType == "执行演习")) return [3, 12];
                        if (!(NetErrorRelinker.IsLostConnection == true)) return [3, 4];
                        return [2, MessageBox.Show("计划任务 - 【执行演习】账号已掉线.")];
                    case 4:
                        if (!(NetErrorRelinker.IsGameServerWeiHu == true)) return [3, 5];
                        return [2, MessageBox.Show("计划任务 - 【执行演习】系统维护中.")];
                    case 5:
                        if (!(QueueWorker.State != DBEnum.WorkState.Ready)) return [3, 6];
                        Logs.Print("计划任务 - 【执行演习】当前队列执行中");
                        _This.LostWork = new SavedMissionWork();
                        _This.LostWork.MissionProgressNow = MissionWorker.MissionProgressNow;
                        _This.LostWork.MissionProgressTotal = MissionWorker.MissionProgressTotal;
                        _This.LostWork.IsDoQueue = QueueWorker.State == 1;
                        QueueWorker.Stop();
                        task.LastRunTimeSpan = localLastRunTimeSpan;
                        return [3, 11];
                    case 6:
                        if (!(MissionWorker.State != DBEnum.WorkState.Ready)) return [3, 7];
                        Logs.Print("计划任务 - 【执行演习】当前任务执行中");
                        _This.LostWork = new SavedMissionWork();
                        _This.LostWork.MissionProgressNow = MissionWorker.MissionProgressNow;
                        _This.LostWork.MissionProgressTotal = MissionWorker.MissionProgressTotal;
                        _This.LostWork.IsDoQueue = QueueWorker.State == 1;
                        MissionWorker.Stop();
                        task.LastRunTimeSpan = localLastRunTimeSpan;
                        return [3, 11];
                    case 7:
                        if (!(ZhanYiWorker.State != DBEnum.WorkState.Ready)) return [3, 8];
                        Logs.Print("计划任务 - 【执行演习】当前战役执行中");
                        task.LastRunTimeSpan = localLastRunTimeSpan;
                        return [3, 11];
                    case 8:
                        if (!(YanXiWorker.State != DBEnum.WorkState.Ready)) return [3, 9];
                        Logs.Print("计划任务 - 【执行演习】当前演习执行中");
                        return [3, 11];
                    case 9:
                        YanXi_FightNight = task.YanXi_FightNight;
                        YanXi_FleetID = task.YanXi_FleetID;
                        YanXi_Formation = task.YanXi_Formation;
                        YanXi_UnFightQianTing = task.YanXi_UnFightQianTing;
                        return [4, Net.PVP.GetChallengeList()];
                    case 10:
                        challengeList = _a.sent();
                        if (challengeList.ErrorCode == 0 && challengeList.newshipvo && challengeList.list.Where(function (c) { return c.resultlevel == 0; }).Count() > 0) {
                            if ((YanXi_FleetID >= 1 && YanXi_FleetID <= 4) && (YanXi_FightNight >= 0 && YanXi_FightNight <= 1) && (YanXi_Formation >= 1 && YanXi_Formation <= 5)) {
                                if (YanXi_UnFightQianTing == true) {
                                    challengeList.list = challengeList.list.Where(function (c) { return Player.GetShipType(c.ships[0]) != DBEnum.ENUM_ShipType.潜艇 && Player.GetShipType(c.ships[0]) != DBEnum.ENUM_ShipType.炮潜; });
                                }
                                opps = challengeList.list.Where(function (c) { return c.resultlevel == 0; }).Select(function (c) {
                                    return {
                                        FleetName: c.fleetname,
                                        UserName: c.username,
                                        Level: c.level,
                                        UID: c.uid,
                                    };
                                });
                                if (opps.Count() == 0) {
                                    Logs.Print("计划任务 - 【执行演习】当前已打完");
                                }
                                else {
                                    Logs.Print("计划任务 - 【执行演习】开始执行演习");
                                    YanXiWorker.RunPVPYanYi(YanXi_FleetID, YanXi_Formation, YanXi_FightNight == 1, opps);
                                }
                            }
                            else {
                                Logs.Print("计划任务 - 【执行演习】配置文件错误");
                            }
                        }
                        else {
                            Logs.Print("计划任务 - 【执行演习】演习加载失败");
                        }
                        _a.label = 11;
                    case 11: return [3, 20];
                    case 12:
                        if (!(task.TaskType == "执行战役")) return [3, 20];
                        if (!(NetErrorRelinker.IsLostConnection == true)) return [3, 13];
                        return [2, MessageBox.Show("计划任务 - 【执行战役】账号已掉线.")];
                    case 13:
                        if (!(NetErrorRelinker.IsGameServerWeiHu == true)) return [3, 14];
                        return [2, MessageBox.Show("计划任务 - 【执行战役】系统维护中.")];
                    case 14:
                        if (!(QueueWorker.State != DBEnum.WorkState.Ready)) return [3, 15];
                        Logs.Print("计划任务 - 【执行战役】当前队列执行中");
                        _This.LostWork = new SavedMissionWork();
                        _This.LostWork.MissionProgressNow = MissionWorker.MissionProgressNow;
                        _This.LostWork.MissionProgressTotal = MissionWorker.MissionProgressTotal;
                        _This.LostWork.IsDoQueue = QueueWorker.State == 1;
                        QueueWorker.Stop();
                        task.LastRunTimeSpan = localLastRunTimeSpan;
                        return [3, 20];
                    case 15:
                        if (!(MissionWorker.State != DBEnum.WorkState.Ready)) return [3, 16];
                        Logs.Print("计划任务 - 【执行战役】当前任务执行中");
                        _This.LostWork = new SavedMissionWork();
                        _This.LostWork.MissionProgressNow = MissionWorker.MissionProgressNow;
                        _This.LostWork.MissionProgressTotal = MissionWorker.MissionProgressTotal;
                        _This.LostWork.IsDoQueue = QueueWorker.State == 1;
                        MissionWorker.Stop();
                        task.LastRunTimeSpan = localLastRunTimeSpan;
                        return [3, 20];
                    case 16:
                        if (!(ZhanYiWorker.State != DBEnum.WorkState.Ready)) return [3, 17];
                        Logs.Print("计划任务 - 【执行战役】当前战役执行中");
                        return [3, 20];
                    case 17:
                        if (!(YanXiWorker.State != DBEnum.WorkState.Ready)) return [3, 18];
                        Logs.Print("计划任务 - 【执行战役】当前演习执行中");
                        task.LastRunTimeSpan = localLastRunTimeSpan;
                        return [3, 20];
                    case 18: return [4, Net.Campaign.Init()];
                    case 19:
                        initResult = _a.sent();
                        if (initResult.ErrorCode == 0) {
                            ZhanYi_Formation = task.ZhanYi_Formation;
                            ZhanYi_CampaignID = task.ZhanYi_CampaignID;
                            ZhanYi_RepairLevel = task.ZhanYi_RepairLevel;
                            ZhanYi_FightNight = task.ZhanYi_FightNight;
                            if (Player.CampaignInfo.passinfo.remainnum <= 0) {
                                Logs.Print("计划任务 - 【执行战役】今日战役已打完");
                            }
                            else if (ZhanYi_CampaignID > 100 && (ZhanYi_RepairLevel >= 0 && ZhanYi_RepairLevel <= 3) && (ZhanYi_FightNight >= 0 && ZhanYi_FightNight <= 1) && (ZhanYi_Formation >= 1 && ZhanYi_Formation <= 5)) {
                                Logs.Print("计划任务 - 【执行战役】开始执行战役");
                                ZhanYiWorker.RunZhanYi(ZhanYi_CampaignID, Player.CampaignInfo.passinfo.remainnum, ZhanYi_Formation, ZhanYi_FightNight == 1 ? true : false, ZhanYi_RepairLevel);
                            }
                            else {
                                Logs.Print("计划任务 - 【执行战役】配置文件错误");
                            }
                        }
                        else {
                            Logs.Print("计划任务 - 【执行战役】战役加载失败");
                        }
                        _a.label = 20;
                    case 20: return [2];
                }
            });
        });
    };
    MainTimer.timer = null;
    MainTimer.LoadLocalPlayerConfig = false;
    MainTimer.LoadLocalPlayerStatistics = false;
    MainTimer.LoadLocalMoreSetting = false;
    MainTimer.LastUpdatePlayerConfig_String_Local = "";
    MainTimer.LastUpdatePlayerConfig_String_Cloud = "";
    MainTimer.LastUpdatePlayerStatistics_String_Local = "";
    MainTimer.LastUpdatePlayerStatistics_String_Cloud = "";
    MainTimer.LastUpdateMoreSetting_String_Local = "";
    MainTimer.LastUpdateMoreSetting_String_Cloud = "";
    MainTimer.TickNum = -1;
    MainTimer.HeartShipsData = new List();
    MainTimer.CheckRepairDock_Locker = false;
    MainTimer.LostWork = null;
    return MainTimer;
}());
//# sourceMappingURL=MainTimer.js.map