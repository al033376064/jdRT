$(function () {
    setTimeout(function () {
        MainTimer.Start();
        AutoBath.RunThread();
    }, 1000);
    SysLocalStorage.Set("AppBackgrounder", "0");
    if (Config.OpenActions.indexOf("LocalSaveIni") >= 0) {
        try {
            var localSave_PlayerConfig = NJson.ObjArrayToList(SysLocalStorage.Get("PlayerConfig_" + Config.LoginUser.LoginName + "_" + Config.LoginUser.ServerName));
            console.log("_" + localSave_PlayerConfig.LastUpdateTime);
            console.log("_" + Config.PlayerConfig.LastUpdateTime);
            if (localSave_PlayerConfig && localSave_PlayerConfig.LastUpdateTime && localSave_PlayerConfig.LastUpdateTime > Config.PlayerConfig.LastUpdateTime) {
                Object.keys(Config.PlayerConfig).forEach(function (c) {
                    Config.PlayerConfig[c] = localSave_PlayerConfig[c] != undefined ? localSave_PlayerConfig[c] : Config.PlayerConfig[c];
                });
                MainTimer.LoadLocalPlayerConfig = true;
                console.log(["加载了本地配置文件", Config.PlayerConfig]);
            }
        }
        catch (ex) {
            console.log("加载失败1");
        }
        try {
            var localSave_PlayerStatistics = NJson.ObjArrayToList(SysLocalStorage.Get("PlayerStatistics_" + Config.LoginUser.LoginName + "_" + Config.LoginUser.ServerName));
            if (localSave_PlayerStatistics && localSave_PlayerStatistics.LastUpdateTime && localSave_PlayerStatistics.LastUpdateTime > Config.PlayerStatistics.LastUpdateTime) {
                Object.keys(Config.PlayerStatistics).forEach(function (c) {
                    Config.PlayerStatistics[c] = localSave_PlayerStatistics[c] != undefined ? localSave_PlayerStatistics[c] : Config.PlayerStatistics[c];
                });
                MainTimer.LoadLocalPlayerStatistics = true;
                console.log(["加载了本地统计文件", Config.PlayerStatistics]);
            }
        }
        catch (ex) {
            console.log("加载失败2");
        }
        try {
            var localSave_MoreSetting = NJson.ObjArrayToList(SysLocalStorage.Get("MoreSetting_" + Config.LoginUser.LoginName + "_" + Config.LoginUser.ServerName));
            Config.MoreSetting = Config.MoreSetting == null ? new IniModal.MoreSetting() : Config.MoreSetting;
            if (localSave_MoreSetting && localSave_MoreSetting.LastUpdateTime && localSave_MoreSetting.LastUpdateTime > Config.MoreSetting.LastUpdateTime) {
                Object.keys(Config.MoreSetting).forEach(function (c) {
                    Config.MoreSetting[c] = localSave_MoreSetting[c] != undefined ? localSave_MoreSetting[c] : Config.MoreSetting[c];
                });
                MainTimer.LoadLocalMoreSetting = true;
                console.log(["加载了本地更多文件", Config.MoreSetting]);
            }
        }
        catch (ex) {
            console.log("加载失败3");
        }
    }
    else {
        SysLocalStorage.Del("PlayerConfig_" + Config.LoginUser.LoginName + "_" + Config.LoginUser.ServerName);
        SysLocalStorage.Del("PlayerStatistics_" + Config.LoginUser.LoginName + "_" + Config.LoginUser.ServerName);
        SysLocalStorage.Del("MoreSetting_" + Config.LoginUser.LoginName + "_" + Config.LoginUser.ServerName);
    }
    ;
    if (!Config.PlayerConfig.AutoChangeShips) {
        Config.PlayerConfig.AutoChangeShips = new List();
    }
    if (!Config.PlayerConfig.PlayerHabit) {
        Config.PlayerConfig.PlayerHabit = new IniModal.Habit();
    }
    if (!Config.PlayerConfig.AutoDismantleSetting) {
        Config.PlayerConfig.AutoDismantleSetting = new IniModal.AutoDismantleSetting();
        Config.PlayerConfig.AutoDismantleSetting.AllowTypes = List.From([12, 10, 7, 2, 6, 4, 1, 23, 16, 15, 14, 13, 11, 9, 8, 5, 3]);
        Config.PlayerConfig.AutoDismantleSetting.DisNumber = 8;
        Config.PlayerConfig.AutoDismantleSetting.UnloadEquip = false;
    }
    if (!Config.PlayerConfig.AutoDismantleSetting.AllowTypes) {
        Config.PlayerConfig.AutoDismantleSetting.AllowTypes = List.From([12, 10, 7, 2, 6, 4, 1, 23, 16, 15, 14, 13, 11, 9, 8, 5, 3]);
        Config.PlayerConfig.AutoDismantleSetting.DisNumber = 8;
        Config.PlayerConfig.AutoDismantleSetting.UnloadEquip = false;
    }
    if (!Config.PlayerConfig.CustomPevQueues) {
        Config.PlayerConfig.CustomPevQueues = new List();
    }
    if (Config.MoreSetting == null) {
        Config.MoreSetting = new IniModal.MoreSetting();
        Config.MoreSetting.AutoStrengthenSetting = {
            CheckAttrOrder: List.From([2, 4, 1, 3]),
            OverAtk: 20,
            AllowAtkTypes: List.From([7, 6, 4, 10]),
            OverTorpedo: 20,
            AllowTorpedoTypes: List.From([12, 10]),
            OverDef: 20,
            AllowDefTypes: List.From([12, 10, 7, 2, 6, 4]),
            OverAirDef: 20,
            AllowAirDefTypes: List.From([10, 12, 7, 2, 6, 4]),
            OrderByStrengthenShip: 10,
            SkillLevelUp: true,
            DockFreeNumber: 1,
            UseQinXunFirst: true,
        };
    }
    if (Config.MoreSetting.MissionWorkSpeed == undefined) {
        Config.MoreSetting.MissionWorkSpeed = false;
    }
    if (Config.MoreSetting.MissionWorkSpeedLevel == undefined) {
        Config.MoreSetting.MissionWorkSpeedLevel = 0;
    }
    var pastChallengeIDList = ["9949", "9950", "9951", "9952", "9953", "9954", "9955", "9956", "9957", "9958", "9959", "9960", "9961"];
    PVEMap.Maps.MapDict = PVEMap.Maps.MapDict.Where(function (c) { return pastChallengeIDList.indexOf(c.ChallengeID) == -1; });
    Config.PlayerConfig.CustomPVEMaps = Config.PlayerConfig.CustomPVEMaps.Where(function (c) { return pastChallengeIDList.indexOf(c.ChallengeID) == -1; });
    var serverIni = Config.PlayerConfig;
    var userShips = Player.UserShipVo.Select(function (c) { return c.id; });
    if (userShips.Count() > 0) {
        serverIni.AutoStrengthenShipIDS = serverIni.AutoStrengthenShipIDS.Where(function (c) { return userShips.Contains(c); });
    }
    Config.PlayerConfig.AutoChangeShips = Config.PlayerConfig.AutoChangeShips.Where(function (c) { return Player.GetShip(c.ShipID) != null; });
    if ([5, 10, 15, 30].indexOf(Config.PlayerConfig.SkipFightSeconds) == -1) {
        if (Config.PlayerConfig.SkipFightSeconds < 5) {
            Config.PlayerConfig.SkipFightSeconds = 5;
        }
        else {
            Config.PlayerConfig.SkipFightSeconds = 15;
        }
    }
    var PVEShipSources_List = (SysLocalStorage.Get("PVEShipSources_" + Config.LoginUser.LoginName + "_" + Config.LoginUser.ServerName) ? SysLocalStorage.Get("PVEShipSources_" + Config.LoginUser.LoginName + "_" + Config.LoginUser.ServerName) : "").SplitOutEmpty(",");
    if (PVEShipSources_List.Count() > 2500) {
        Config.PVEShipSources = PVEShipSources_List.Skip(PVEShipSources_List.Count() - 2000).Take(2000).JoinToString(",");
    }
    else {
        Config.PVEShipSources = PVEShipSources_List.JoinToString(",");
    }
    if (!SysLocalStorage.Get("QiXiRepairTypes")) {
        SysLocalStorage.Set("QiXiRepairTypes", JSON.stringify([2, 2, 2, 2, 2, 2]));
    }
    var LoadPartial = function (url, name, callBack) {
        api.ReadHTMLTemp(url, function ($html) {
            if ($("#PartialViewPanel .partialContext[data-name='" + name + "']").length == 0) {
                $("#PartialViewPanel").append($html);
            }
            else {
                $("#PartialViewPanel .partialContext[data-name='" + name + "']").html($html.html());
            }
            if (callBack) {
                callBack();
            }
        });
    };
    LoadPartial("/home/mission", "任务", function () {
        $("#PartialViewPanel > #PartialMission").addClass("current");
        setTimeout(function () {
            $("#PartialViewPanel > #PartialMission").fadeIn(300);
        }, 200);
    });
    LoadPartial("/home/areas", "分区");
    LoadPartial("/home/setting", "设置");
    LoadPartial("/home/user", "我的");
    $("#PartialViewFooter [data-partialid]").click(function () {
        var $Action = $(this);
        var id = $(this).attr("data-partialid");
        var $partial = $("#" + id);
        if ($partial.length > 0 && !$partial.hasClass("current") && $("#PartialViewPanel .partialContext.current").length > 0) {
            $("#PartialViewPanel .partialContext.current").hide().removeClass("current");
            $partial.addClass("current").show();
            $Action.addClass("active").siblings().removeClass("active");
        }
    });
    if (api.systemType == "android" && (SysLocalStorage.Get("APPAlive") == "Service" || SysLocalStorage.Get("APPAlive") == "ServiceAndMusic")) {
        var appAlive = api.require("appAlive");
        var time = 60;
        if (Config.OpenActions.SplitOutEmpty(",").FirstOrDefault(function (c) { return c.indexOf("AliveServiceTime") == 0; }) != null) {
            time = Config.OpenActions.SplitOutEmpty(",").FirstOrDefault(function (c) { return c.indexOf("AliveServiceTime") == 0; }).replace("AliveServiceTime", "").ToNumber();
            console.log("AliveServiceTime=" + time);
        }
        appAlive.startService({ "IsDebug": 0, "Alarm": time, "WakeSeconds": 15, "Protect": 0, "ScreenOn": 1 });
        if (api.appName == "舰队RT") {
            appAlive.startForegroundActivity({ "IsDebug": 0 }, function (ret) { });
        }
    }
    ;
});
//# sourceMappingURL=Main.js.map