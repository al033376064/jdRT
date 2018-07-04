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
    var MissionPage = (function () {
        function MissionPage() {
        }
        MissionPage.OnLoad = function () {
            if (Config.OpenActions.SplitOutEmpty(",").Contains("PVEEvent") == false) {
                $("#PartialMission .openPveEvent").hide();
                var pastChallengeIDList = ["9962", "9963", "9964", "9965", "9966", "9967"];
                PVEMap.Maps.MapDict = PVEMap.Maps.MapDict.Where(function (c) { return pastChallengeIDList.indexOf(c.ChallengeID) == -1; });
                Config.PlayerConfig.CustomPVEMaps = Config.PlayerConfig.CustomPVEMaps.Where(function (c) { return pastChallengeIDList.indexOf(c.ChallengeID) == -1; });
            }
            this.BindDelegates();
            this.InitMission();
            this.BindEvent();
            this.InitUpdateTimer();
            this.InitRenWuQueue();
        };
        MissionPage.BindDelegates = function () {
            MissionWorker.OnCheck.Add(function () {
            });
            MissionWorker.OnStart.Add(function () {
                $("#PartialMission #MissionList").val(MissionWorker.CurrentWork.CustiomPVEID);
                $("#PartialMission .missionSelecter").addClass("working");
                $("#PartialMission .missionSelecter .missionProgress").fadeIn(1000);
                $("#PartialMission .btnQuickModifyPVE").hide();
                $("#PartialMission  #MissionProgressNow").html(MissionWorker.MissionProgressNow.toString());
                $("#PartialMission  #MissionProgressTotal").html(MissionWorker.MissionProgressTotal.toString());
                $("#PartialMission  .ShipRepairType").addClass("disabled").attr("disabled", "disabled");
                $("#PartialMission .missionSelecter select").attr("disabled", "disabled");
                var currentMap = PVEMap.Maps.MapDict.Where(function (c) { return c.ChallengeID == MissionWorker.CurrentWork.ChallengeID; }).FirstOrDefault();
                var mapPath = currentMap.Image.indexOf("http") >= 0 ? currentMap.Image : (api.wgtRootDir.replace("file:", "contents:") + "/Content/PVEMaps/" + currentMap.Image);
                $("#FightMap").html("<div class=\"mapinfo\"><div class=\"mapTitle\">" + MissionWorker.CurrentWork.WorkName + "</div><div class=\"map\" style=\"background: url(&quot;" + mapPath + "&quot;) 0% 0% / 100% 100%;\"></div></div>");
            });
            MissionWorker.OnStoped.Add(function () {
                $("#PartialMission .missionSelecter").addClass("stoping");
                $("#PartialMission #BtnStopMission").attr("disabled", "disabled");
                if ($("#PartialMission #FightMap .team").length > 0) {
                    $("#PartialMission #FightMap").find(".team.our dd").each(function (index, elem) {
                        $(elem).removeClass("inLeft").addClass("animated outLeft");
                    });
                    $("#PartialMission #FightMap").find(".team.enemy dd").each(function (index, elem) {
                        $(elem).removeClass("inRight").addClass("animated outRight");
                    });
                    $("#PartialMission #FightMap").find(".map").addClass("animated");
                    setTimeout(function () {
                        if ($("#PartialMission #FightMap .team").length > 0) {
                            $("#PartialMission #FightMap").find(".map").show().removeClass("zoomOut").addClass("animated zoomIn");
                            $("#PartialMission #FightMap .team").remove();
                        }
                    }, 700);
                }
            });
            MissionWorker.OnOneEnd.Add(function () {
                $("#PartialMission  #MissionProgressNow").html(MissionWorker.MissionProgressNow.toString());
                $("#PartialMission  #MissionProgressTotal").html(MissionWorker.MissionProgressTotal.toString());
            });
            MissionWorker.OnTotalEnd.Add(function () {
                $("#PartialMission .missionSelecter").removeClass("working").removeClass("stoping");
                $("#PartialMission .missionSelecter .missionProgress").hide(1000);
                $("#PartialMission .ShipRepairType").removeClass("disabled").removeAttr("disabled");
                $("#PartialMission .missionSelecter select").removeAttr("disabled");
                $("#PartialMission #BtnStopMission").removeAttr("disabled");
                $("#PartialMission .btnQuickModifyPVE").addClass("bgNo").fadeIn(500, function () {
                    $(this).removeClass("bgNo");
                });
            });
            var NodeStep = 0;
            var ReloadStep = 0;
            MissionWorker.PathNodeIn.Add(function (node) {
                NodeStep = NodeStep > 1000 ? 0 : (NodeStep + 1);
            });
            var ActionSpyEnemy = function (enemy, node) {
                return __awaiter(this, void 0, void 0, function () {
                    var currentMap, mapPath, selfShips, TempEntityData, $tempdata1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                $("#PartialMission #FightMap .map").removeClass("zoomIn").addClass("animated zoomOut");
                                return [4, Sleep(700, 1)];
                            case 1:
                                _a.sent();
                                currentMap = PVEMap.Maps.MapDict.Where(function (c) { return c.ChallengeID == MissionWorker.CurrentWork.ChallengeID; }).FirstOrDefault();
                                mapPath = currentMap.Image.indexOf("http") >= 0 ? currentMap.Image : (api.wgtRootDir.replace("file:", "contents:") + "/Content/PVEMaps/" + currentMap.Image);
                                selfShips = Player.GetFleetShips();
                                if (MissionWorker.IsPveEvent && MissionWorker.PVEEvent && MissionWorker.QiXiShips.Count() > 0 && List.From(["996202", "996315", "996317", "996418", "996502", "996615", "996617", "996718"]).Contains(MissionWorker.CurrentWork.ChallengeID + "" + node.NodeNo)) {
                                    selfShips = MissionWorker.QiXiShips;
                                }
                                TempEntityData = {
                                    MapName: MissionWorker.CurrentWork == null ? "-" : MissionWorker.CurrentWork.WorkName,
                                    NodeName: MissionWorker.LastActionNode == null ? "-" : ("(" + MissionWorker.LastActionNode.Name + ")"),
                                    MapPath: mapPath,
                                    SelfShips: selfShips.Select(function (ship) {
                                        var iniShip = Player.GetIniShip(ship);
                                        return {
                                            TypeImg: ModalShower.GetTypePic(iniShip),
                                            HeadImg: ModalShower.GetHeadPic(iniShip, ship.skin_cid),
                                            ShipBackImg: ModalShower.GetHeadBackPic(iniShip),
                                            Level: ship.level,
                                            Name: Player.GetShipName(ship),
                                            HPNow: ship.battleprops.hp,
                                            HPMax: ship.battlepropsmax.hp,
                                            HPPercent: Math.floor(ship.battleprops.hp * 100 / ship.battlepropsmax.hp),
                                        };
                                    }),
                                    TargetShips: enemy.enemyships.Select(function (ship, i) {
                                        var iniShip = Config.IniEmemyCard.Where(function (c) { return c.CID == ship.shipcid; }).FirstOrDefault();
                                        ship;
                                        return {
                                            TypeImg: ModalShower.GetTypePicFromID(ship.type),
                                            HeadImg: ModalShower.GetEmemyPic(iniShip),
                                            ShipBackImg: ModalShower.GetHeadBackPicFromLevel(iniShip == null ? 1 : iniShip.Star),
                                            Level: ship.level,
                                            Name: ship.title,
                                            HPMax: ship.hp,
                                            HPPercent: 100,
                                        };
                                    })
                                };
                                $tempdata1 = $(doT.template($("#PartialMission [data-tempid=fightMapTemp]").html())(NJson.ObjListToArray(NJson.DeepCopy(TempEntityData))));
                                $tempdata1.find("[data-bimg]").each(function (i, dom) {
                                    var $bdimg = $(dom);
                                    var bimg = $bdimg.attr("data-bimg");
                                    if (bimg) {
                                        var imgPath = bimg.indexOf("http") >= 0 ? bimg : (api.wgtRootDir.replace("file:", "contents:") + bimg.substring(2, bimg.length));
                                        $bdimg.css("background", "url(" + imgPath + ")").css("background-size", "100% 100%");
                                    }
                                });
                                List.From($tempdata1.find(".team.our dd").toArray()).ForEach(function (elem, i) {
                                    $(elem).addClass("animated inLeft");
                                });
                                List.From($tempdata1.find(".team.enemy dd").toArray()).ForEach(function (elem, i) {
                                    $(elem).addClass("animated inRight");
                                });
                                $tempdata1.find(".map").hide();
                                $("#PartialMission #FightMap").html("").append($tempdata1);
                                return [2];
                        }
                    });
                });
            };
            MissionWorker.OnSpyEnemy.Add(function (enemy, node) {
                if ($("#PartialMission .fightMap").hasClass("minimization"))
                    return;
                ReloadStep = NodeStep;
                ActionSpyEnemy(enemy, node);
            });
            MissionWorker.OnDealtoEnemy.Add(function (dealtoresult) {
                if (ReloadStep != NodeStep || $("#PartialMission .fightMap").hasClass("minimization"))
                    return;
                $("#PartialMission #FightMap").find(".team.our dd").each(function (index, elem) {
                    var hpmax = $(elem).attr("data-hpmax").ToNumber();
                    if (dealtoresult.warreport.hpbeforenightwarself.Count() > index) {
                        var percent = Math.floor(dealtoresult.warreport.hpbeforenightwarself[index] * 100 / hpmax);
                        var color = percent < 25 ? "#f63a0f" : (percent < 50 ? "#ffd132" : "#3be136");
                        $(elem).find(".progress_hp .progress-bar").css({ "width": percent + "%", "background-color": color });
                    }
                });
                $("#PartialMission #FightMap").find(".team.enemy dd").each(function (index, elem) {
                    var hpmax = $(elem).attr("data-hpmax").ToNumber();
                    if (dealtoresult.warreport.hpbeforenightwarenemy.Count() > index) {
                        var percent = Math.floor(dealtoresult.warreport.hpbeforenightwarenemy[index] * 100 / hpmax);
                        var color = percent < 25 ? "#f63a0f" : (percent < 50 ? "#ffd132" : "#3be136");
                        $(elem).find(".progress_hp .progress-bar").css({ "width": percent + "%", "background-color": color });
                    }
                });
            });
            var ActionOnWarEndEnemy = function (fightWarResult) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                $("#PartialMission #FightMap").find(".team.our dd").each(function (index, elem) {
                                    var hpmax = $(elem).attr("data-hpmax").ToNumber();
                                    if (fightWarResult.warresult.selfshipresults.Count() > index) {
                                        var percent = Math.floor(fightWarResult.warresult.selfshipresults[index].hp * 100 / hpmax);
                                        var color = percent < 25 ? "#f63a0f" : (percent < 50 ? "#ffd132" : "#3be136");
                                        $(elem).find(".progress_hp .progress-bar").css({ "width": percent + "%", "background-color": color });
                                    }
                                });
                                $("#PartialMission #FightMap").find(".team.enemy dd").each(function (index, elem) {
                                    var hpmax = $(elem).attr("data-hpmax").ToNumber();
                                    if (fightWarResult.warresult.enemyshipresults.Count() > index) {
                                        var percent = Math.floor(fightWarResult.warresult.enemyshipresults[index].hp * 100 / hpmax);
                                        var color = percent < 25 ? "#f63a0f" : (percent < 50 ? "#ffd132" : "#3be136");
                                        $(elem).find(".progress_hp .progress-bar").css({ "width": percent + "%", "background-color": color });
                                    }
                                });
                                return [4, Sleep(500, 1)];
                            case 1:
                                _a.sent();
                                $("#PartialMission #FightMap").find(".team.our dd").each(function (index, elem) {
                                    var exp = fightWarResult.warresult.selfshipresults.Length > index ? fightWarResult.warresult.selfshipresults[index].expadd : 9999;
                                    var isMVP = fightWarResult.warresult.selfshipresults.Length > index ? (fightWarResult.warresult.selfshipresults[index].ismvp == 1) : false;
                                    var $result = $("<div class=\"warresult animated slideInLeft\"><div class=\"expadd\">+" + exp + "</div>" + (isMVP == true ? '<div class="mvp">MVP</div>' : "") + "</div>");
                                    $(elem).append($result);
                                });
                                return [4, Sleep(1300, 1)];
                            case 2:
                                _a.sent();
                                $("#PartialMission #FightMap").find(".team.our dd").each(function (index, elem) {
                                    $(elem).removeClass("inLeft").addClass("animated outLeft");
                                });
                                $("#PartialMission #FightMap").find(".team.enemy dd").each(function (index, elem) {
                                    $(elem).removeClass("inRight").addClass("animated outRight");
                                });
                                $("#PartialMission #FightMap").find(".map").addClass("animated");
                                return [4, Sleep(700, 1)];
                            case 3:
                                _a.sent();
                                $("#PartialMission #FightMap").find(".map").show().removeClass("zoomOut").addClass("animated zoomIn");
                                $("#PartialMission #FightMap .team").remove();
                                return [2];
                        }
                    });
                });
            };
            MissionWorker.OnWarEndEnemy.Add(function (fightWarResult) {
                if (ReloadStep != NodeStep || $("#PartialMission .fightMap").hasClass("minimization"))
                    return;
                ActionOnWarEndEnemy(fightWarResult);
            });
            MissionWorker.PathNodeOut.Add(function (node) {
            });
        };
        MissionPage.UpdateView = function () {
            this.UpdateResource();
            this.UpdateFleetShips();
        };
        MissionPage.UpdateResource = function () {
            var TempEntityData = {
                oil: Player.User.oil,
                ammo: Player.User.ammo,
                steel: Player.User.steel,
                aluminium: Player.User.aluminium,
                repairnum: Player.PackageVo.Where(function (c) { return c.itemcid == 541; }).Count() == 0 ? 0 : Player.PackageVo.FirstOrDefault(function (c) { return c.itemcid == 541; }).num,
                shipNowCount: Player.UserShipVo.Count(),
                shipMaxCount: Player.User.shipnumtop
            };
            if (this.LastResourceJsonString != NJson.Stringify(TempEntityData)) {
                this.LastResourceJsonString = NJson.Stringify(TempEntityData);
                $("#PartialMission .Package [data-valuebind]").each(function (index, dom) {
                    $(dom).html(TempEntityData[$(dom).attr("data-valuebind")]);
                });
            }
        };
        MissionPage.ChangeShip = function (index, shipid) {
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
            if (shipid > 0) {
                ModalShower.SlideShipPickerQuick(function (c) { return c.id != shipid && !Player.IsBusyShip(c); }, function (ships, isRange) {
                    var fleetShips = NJson.DeepCopy(Player.GetFleetShips(Config.CurrentFleetID).Select(function (c) { return c.id; })).ToArray();
                    if (isRange == false) {
                        if (ships[0] == shipid) {
                            MessageBox.Show("（*゜ー゜*）<br/>不能替换自己");
                            return false;
                        }
                        if (fleetShips.indexOf(ships[0]) >= 0) {
                            fleetShips[fleetShips.indexOf(ships[0])] = shipid;
                        }
                        fleetShips[index] = ships[0];
                    }
                    else {
                        fleetShips = ships.ToArray();
                    }
                    var fleetShipsList = List.From(fleetShips);
                    for (var i = 0; i < fleetShipsList.Count(); i++) {
                        if (fleetShipsList.Where(function (c) { return fleetShipsList.IndexOf(c) != i && Player.IsSameShip(Player.GetShip(fleetShipsList[i]), Player.GetShip(c)) == true; }).Count() > 0) {
                            MessageBox.Show("（*゜ー゜*）<br/>编队内有重复舰船");
                            return false;
                        }
                    }
                    return true;
                }, function (ships, isRange) {
                    return __awaiter(this, void 0, void 0, function () {
                        var changeFleetResult, changeShipResult;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!isRange) return [3, 2];
                                    return [4, Net.Conditioning.InstantFleet(Config.CurrentFleetID, ships.Select(function (c) { return c; }))];
                                case 1:
                                    changeFleetResult = _a.sent();
                                    if (changeFleetResult.ErrorCode != 0) {
                                        MessageBox.Show(changeFleetResult.ErrorMessage);
                                    }
                                    else {
                                        MissionPage.UpdateFleetShips();
                                    }
                                    return [3, 4];
                                case 2: return [4, Net.Conditioning.ChangeBoat(Config.CurrentFleetID, index, ships[0])];
                                case 3:
                                    changeShipResult = _a.sent();
                                    if (changeShipResult.ErrorCode != 0) {
                                        MessageBox.Show(changeShipResult.ErrorMessage);
                                    }
                                    else {
                                        MissionPage.UpdateFleetShips();
                                    }
                                    _a.label = 4;
                                case 4: return [2];
                            }
                        });
                    });
                }, Player.GetFleetShips(Config.CurrentFleetID).Select(function (c) { return c.id; }), 6, 1);
            }
            else {
                ModalShower.SlideShipPickerQuick(function (c) { return !Player.IsBusyShip(c); }, function (ships, isRange) {
                    var fleetShips = NJson.DeepCopy(Player.GetFleetShips(Config.CurrentFleetID).Select(function (c) { return c.id; })).ToArray();
                    if (isRange == false) {
                        fleetShips[index] = ships[0];
                    }
                    else {
                        fleetShips = ships.ToArray();
                    }
                    var fleetShipsList = List.From(fleetShips);
                    for (var i = 0; i < fleetShipsList.Count(); i++) {
                        if (fleetShipsList.Where(function (c) { return fleetShipsList.IndexOf(c) != i && Player.IsSameShip(Player.GetShip(fleetShipsList[i]), Player.GetShip(c)) == true; }).Count() > 0) {
                            MessageBox.Show("（*゜ー゜*）<br/>编队内有重复舰船");
                            return false;
                        }
                    }
                    return true;
                }, function (ships, isRange) {
                    return __awaiter(this, void 0, void 0, function () {
                        var changeFleetResult, changeShipResult;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!isRange) return [3, 2];
                                    return [4, Net.Conditioning.InstantFleet(Config.CurrentFleetID, ships.Select(function (c) { return c; }))];
                                case 1:
                                    changeFleetResult = _a.sent();
                                    if (changeFleetResult.ErrorCode != 0) {
                                        MessageBox.Show(changeFleetResult.ErrorMessage);
                                    }
                                    else {
                                        MissionPage.UpdateFleetShips();
                                    }
                                    return [3, 4];
                                case 2: return [4, Net.Conditioning.ChangeBoat(Config.CurrentFleetID, index, ships[0])];
                                case 3:
                                    changeShipResult = _a.sent();
                                    if (changeShipResult.ErrorCode != 0) {
                                        MessageBox.Show(changeShipResult.ErrorMessage);
                                    }
                                    else {
                                        MissionPage.UpdateFleetShips();
                                    }
                                    _a.label = 4;
                                case 4: return [2];
                            }
                        });
                    });
                }, Player.GetFleetShips(Config.CurrentFleetID).Select(function (c) { return c.id; }), 6, 1);
            }
        };
        MissionPage.UpdateFleetShips = function () {
            var CompareEntityData = Player.GetFleetShips().Select(function (ship, index) {
                var iniShip = Player.GetIniShip(ship);
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
            });
            if (this.LastShipListJsonString != NJson.Stringify(CompareEntityData)) {
                this.LastShipListJsonString = NJson.Stringify(CompareEntityData);
                $("#PartialMission .currentFleet .fleetName").html(DBEnum.FleetName[Config.CurrentFleetID]);
                $("#PartialMission .currentFleet .fleetNos dd[data-action='changeCurrentFleet|" + Config.CurrentFleetID + "']").addClass("active").siblings().removeClass("active");
                var TempEntityData = Player.GetFleetShips().Select(function (ship, index) {
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
                });
                TempEntityData.ForEach(function (eData, eindex) {
                    var $oldCell = $("#PartialMission .currentFleet .fleetships .shipcell").eq(eindex);
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
                        var $fleetshipliststmpl = $(doT.template($("#PartialMission #fleetshipliststmpl").html())(NJson.ObjListToArray(NJson.DeepCopy([eData]))));
                        $fleetshipliststmpl.find("[data-bimg]").each(function (i, dom) {
                            var $bdimg = $(dom);
                            var bimg = $bdimg.attr("data-bimg");
                            if (bimg) {
                                var imgPath = bimg.indexOf("http") >= 0 ? bimg : (api.wgtRootDir.replace("file:", "contents:") + bimg.substring(2, bimg.length));
                                $bdimg.css("background", "url(" + imgPath + ")").css("background-size", "100% 100%");
                            }
                        });
                        if ($("#PartialMission .currentFleet .fleetships .shipcell").length > eindex) {
                            $("#PartialMission .currentFleet .fleetships .shipcell").eq(eindex).after($fleetshipliststmpl).remove();
                        }
                        else {
                            $("#PartialMission .currentFleet .fleetships").append($fleetshipliststmpl);
                        }
                        $fleetshipliststmpl.find(".bd").click(function () {
                            var index = $(this).parents(".shipcell").attr("data-index").ToNumber();
                            var shipid = $(this).parents(".shipcell").attr("data-id").ToNumber();
                            MissionPage.ChangeShip(index, shipid);
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
                                            if (Player.GetFleetShips().Where(function (c) { return Player.IsZhuShouShip(c); }).Count() > 0) {
                                                return [2, MessageBox.Show("驻守中不能更改")];
                                            }
                                            index = $(this).parents(".shipcell").attr("data-index").ToNumber();
                                            shipid = $(this).parents(".shipcell").attr("data-id").ToNumber();
                                            return [4, Net.Conditioning.RemoveBoat(Config.CurrentFleetID, index)];
                                        case 1:
                                            changeResult = _a.sent();
                                            if (changeResult.ErrorCode != 0) {
                                                MessageBox.Show(changeResult.ErrorMessage);
                                            }
                                            else {
                                                MissionPage.UpdateFleetShips();
                                            }
                                            return [2];
                                    }
                                });
                            });
                        });
                        $fleetshipliststmpl.find(".equipments dd").click(function () {
                            var $eqCell = $(this);
                            var ShipID = $(this).parents(".shipcell").eq(0).attr("data-id").ToNumber();
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
                                                    MissionPage.UpdateFleetShips();
                                                }
                                                return [2];
                                        }
                                    });
                                });
                            }, OldEqCID != 0);
                        });
                    }
                });
                $("#PartialMission .currentFleet .fleetships .shipcell").each(function (index, elem) {
                    var $elem = $(elem);
                    if (index >= TempEntityData.Count()) {
                        $elem.remove();
                    }
                });
                if (TempEntityData.Count() < 6) {
                    for (var i = TempEntityData.Count(); i < 6; i++) {
                        var $shipPicker = $("<div class=\"shipcell\" data-index=\"" + TempEntityData.Count() + "\" data-id=\"\"><div class=\"picker\"><i class=\"fa fa-plus\"></i><label>\u52A0\u5165\u8230\u8239</label></div></div>");
                        $("#PartialMission .currentFleet .fleetships").append($shipPicker);
                        $shipPicker.find(".picker").click(function () {
                            var index = $(this).parents(".shipcell").attr("data-index").ToNumber();
                            var shipid = $(this).parents(".shipcell").attr("data-id").ToNumber();
                            MissionPage.ChangeShip(index, shipid);
                        });
                    }
                }
            }
        };
        MissionPage.BindEvent = function () {
            setTimeout(function () {
                $("#PartialViewPanel  .commonmodal").insertAfter("#PartialViewFooter");
            }, 1000);
            $("#PartialMission [data-action='quickLog_in']").click(function () {
                $("#PartialMission #quickLogs").stop(true, false).animate({ width: "100vw" }, 300);
                $("#PartialMission #OpenQuickLog").addClass("hide").hide();
            });
            $("#PartialMission [data-action='quickLog_out']").click(function () {
                $("#PartialMission #quickLogs").stop(true, false).animate({ width: 0 }, 300, function () {
                    $("#PartialMission #OpenQuickLog").removeClass("hide").show();
                });
            });
            $("#PartialMission [data-action='openLog']").click(function () {
                if (SysLocalStorage.Get("LowEffect") == 1 && $("#PartialMission .mainLog").hasClass("maximization") == false) {
                    $("#PartialMission [data-action='maximizationLog']").triggerHandler("click");
                }
                $("#PartialMission  .missiondailog").addClass("open").show();
            });
            $("#PartialMission [data-action='closeLog']").click(function () {
                $("#PartialMission  .missiondailog").removeClass("open").hide();
                $("#PartialMission #FightMap .animated").removeClass("animated");
            });
            $("#PartialMission [data-action='clearLog']").click(function () {
                $("#PartialMission  .missiondailog p:gt(0)").remove();
            });
            $("#PartialMission [data-action='logBottom']").click(function () {
                $("#PartialMission #LogsInfo").animate({ scrollTop: $("#PartialMission #LogsInfo")[0].scrollHeight }, 500);
            });
            $("#PartialMission [data-action='logTop']").click(function () {
                $("#PartialMission #LogsInfo").animate({ scrollTop: 0 }, 500);
            });
            $("#PartialMission [data-action='stopLog']").click(function () {
                var $fa = $(this).find(".fa");
                if ($fa.hasClass("fa-pause")) {
                    $fa.removeClass("fa-pause").addClass("fa-play");
                }
                else {
                    $fa.removeClass("fa-play").addClass("fa-pause");
                }
            });
            $("#PartialMission [data-action='maximizationLog']").click(function () {
                if ($("#PartialMission .mainLog").hasClass("maximization")) {
                    $(this).children(".fa").removeClass("fa-compress").addClass("fa-expand");
                    $("#PartialMission .mainLog").removeClass("maximization");
                    $("#PartialMission #FightMap").removeClass("minimization");
                    SysLocalStorage.Set("FightMapMinimization", "0");
                }
                else {
                    $(this).children(".fa").removeClass("fa-expand").addClass("fa-compress");
                    $("#PartialMission .mainLog").addClass("maximization");
                    $("#PartialMission #FightMap").addClass("minimization");
                    SysLocalStorage.Set("FightMapMinimization", "1");
                }
            });
            if (SysLocalStorage.Get("FightMapMinimization") == "1") {
                $("#PartialMission [data-action='maximizationLog']").triggerHandler("click");
            }
            $("#PartialMission [data-action='openStatistics']").click(function () {
                var ship = Player.UserShipVo.FirstOrDefault();
                Dailog.CreatDialog({
                    Title: "数据统计",
                    FormNodes: List.From([]),
                    AnimateIn: "rollIn",
                    AnimateOut: "rollOut",
                    OnBuild: function ($modal) {
                        $modal.find(".modal-footer").remove();
                        $modal.addClass("modal_missionPanel_statistics");
                        var data = {
                            Spoils: (Player.Spoils + "_" + Config.PlayerStatistics.DayGetSpoilsCount),
                            DayGetShipCount: Config.PlayerStatistics.DayGetShipCount + "/500",
                            DayGetYuanZheng_Oil: Config.PlayerStatistics.DayGetYuanZheng_Oil,
                            DayGetYuanZheng_Ammo: Config.PlayerStatistics.DayGetYuanZheng_Ammo,
                            DayGetYuanZheng_Steel: Config.PlayerStatistics.DayGetYuanZheng_Steel,
                            DayGetYuanZheng_Aluminium: Config.PlayerStatistics.DayGetYuanZheng_Aluminium,
                            DayGetYuanZheng_RepairNum: Config.PlayerStatistics.DayGetYuanZheng_RepairNum,
                            DayGetYuanZheng_KuanJianNum: Config.PlayerStatistics.DayGetYuanZheng_KuanJianNum,
                            DayGetYuanZheng_EquipTuZhiNum: Config.PlayerStatistics.DayGetYuanZheng_EquipTuZhiNum,
                            DayGetYuanZheng_ShipTuZhiNum: Config.PlayerStatistics.DayGetYuanZheng_ShipTuZhiNum,
                        };
                        var $Detail = $(doT.template($("#PartialMission [data-tempid='mainStatisticsTemp']").html())(data));
                        $modal.find(".modal-body").html("").append($Detail);
                        var height = $modal.find(".modal-content").outerHeight();
                        var wHeigt = $(window).height();
                        $modal.find(".modal-dialog").css("margin-top", (wHeigt - height) / 2);
                    },
                    OnSubmit: function (fromJsonObj, $modal) { }
                });
            });
            $("#PartialMission [data-action='openChuHuoLog']").click(function () {
                var listObjs = Config.PVEShipSources.SplitOutEmpty(",").Select(function (c) {
                    var iniShip = Config.IniShips.FirstOrDefault(function (d) { return d.CID == parseInt(c.split('|')[2]); });
                    return {
                        MapID: c.split('|')[0],
                        NodeName: c.split('|')[1],
                        ShipName: iniShip == null ? "" : iniShip.Name,
                        TimeSpan: parseInt(c.split('|')[3]),
                        Time: DateTime.ParseTime(parseInt(c.split('|')[3])).ToString("HH:mm:ss"),
                        ResultLevelText: c.split('|')[4],
                        Important: c.split('|')[5]
                    };
                }).OrderByDescending(function (c) { return c.TimeSpan; });
                Dailog.CreatDialog({
                    Title: "出货统计",
                    FormNodes: List.From([]),
                    AnimateIn: "zoomIn",
                    AnimateOut: "zoomOut",
                    OnBuild: function ($modal) {
                        var $btnClear = $(" <i class=\"fa fa-trash\"></i>");
                        $btnClear.click(function () {
                            MessageBox.Confirm("确定清除记录？", function () {
                                Config.PVEShipSources = "";
                                SysLocalStorage.Set("PVEShipSources_" + Config.LoginUser.LoginName + "_" + Config.LoginUser.ServerName, "");
                                $modal.find(".tableList").html("");
                            });
                        });
                        $modal.find(".modal-title").append($btnClear);
                        $modal.find(".modal-footer").remove();
                        $modal.addClass("modal_missionPanel_chuhuo");
                        $modal.find(".modal-dialog").css("animation-duration", "0.6s");
                        var $Detail = $(doT.template($("#PartialMission [data-tempid='mainChuHuoTemp']").html())(NJson.ObjListToArray(listObjs)));
                        $modal.find(".modal-body").html("").append($Detail);
                    },
                    OnSubmit: function (fromJsonObj, $modal) { }
                });
            });
            $("#PartialMission [data-action='openPveEvent']").click(function () {
                var $QiXiTeamControlSet = $(doT.template($("#QiXiTeamControlSetTemp").html())());
                $QiXiTeamControlSet.find(".modelheader [data-dismiss]").click(function () {
                    $QiXiTeamControlSet.removeClass("slideInRight").addClass("slideOutRight");
                    setTimeout(function () {
                        $QiXiTeamControlSet.remove();
                    }, 500);
                });
                $("body").append($QiXiTeamControlSet);
                PageScroll.BindScroll($("#qiXiTeamControlSet"), "滑动关闭所罗门之晓", function (ev) {
                }, function (ev) {
                    return false;
                }, function (ev) {
                }, function (ev) {
                    var windowWidth = $(window).width();
                    if (ev.Start_X <= (windowWidth / 20) && ev.Move_X >= (windowWidth / 10)) {
                        $("#qiXiTeamControlSet").find(".modelheader [data-dismiss]").triggerHandler("click");
                    }
                });
                if (!Player.PveEvent) {
                    return;
                }
                var pvelevelids = ["9962", "9963", "9964", "9965", "9966", "9967"];
                var pevlevelnames = ["EX-1 暗夜礼花", "EX-3 神的右眼", "EX-5 盖世无双", "EX-6 暗夜礼花", "EX-8 神的右眼", "EX-10 盖世无双"];
                var ReloadMap = function (pvelevel) {
                    var mapid = pvelevel.pvelevelid;
                    $QiXiTeamControlSet.find(".maplist .maprow[data-mapid=" + pvelevel.pvelevelid + "]").remove();
                    if (!pvelevel.fleet) {
                        pvelevel.fleet = new List();
                    }
                    var TempEntityData = {
                        MapID: pvelevel.pvelevelid,
                        MapName: pvelevelids.indexOf(pvelevel.pvelevelid.toString()) >= 0 ? pevlevelnames[pvelevelids.indexOf(pvelevel.pvelevelid.toString())] : "未知",
                        SupAtkStatus: pvelevel.supatkstatus,
                        Supported: pvelevel.supported,
                        Ships: pvelevel.fleet.Select(function (c) {
                            var ship = Player.GetShip(c);
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
                                HPNow: ship.battleprops.hp,
                                HPMax: ship.battlepropsmax.hp,
                                HPPercent: Math.floor(ship.battleprops.hp * 100 / ship.battlepropsmax.hp),
                                Star: iniShip == null ? 0 : iniShip.Star,
                                PicID: iniShip == null ? "" : iniShip.PicId,
                                ShipImg: ModalShower.GetShipPic(iniShip, ship.skin_cid),
                                ShipBackImg: ModalShower.GetShipBackPic(iniShip),
                                Create_time: ship.create_time,
                            };
                        }),
                    };
                    var $QiXiTeamControlSetMap = $(doT.template($("#QiXiTeamControlSetMapTemp").html())(NJson.ObjListToArray(NJson.DeepCopy(TempEntityData))));
                    if ($QiXiTeamControlSet.find(".maplist .maprow[data-mapid=" + mapid + "]").length > 0) {
                        $QiXiTeamControlSet.find(".maplist .maprow[data-mapid=" + mapid + "]").after($QiXiTeamControlSetMap).remove();
                    }
                    else {
                        $QiXiTeamControlSet.find(".maplist").append($QiXiTeamControlSetMap);
                    }
                    if (TempEntityData.Ships.Count() < 6) {
                        for (var i = TempEntityData.Ships.Count(); i < 6; i++) {
                            $QiXiTeamControlSetMap.find(".shiplist").append("<div class=\"shipcell\"><div class=\"picker\"><i class=\"fa fa-plus\"></i><label>\u9009\u62E9\u8230\u8239</label></div></div>");
                        }
                    }
                    $QiXiTeamControlSetMap.find(".shipcell .bd .img").each(function (i, dom) {
                        var $bdimg = $(dom);
                        var bimg = $bdimg.attr("data-bimg");
                        if (bimg) {
                            var imgPath = bimg.indexOf("http") >= 0 ? bimg : (api.wgtRootDir.replace("file:", "contents:") + bimg.substring(2, bimg.length));
                            $bdimg.css("background", "url(" + imgPath + ")").css("background-size", "100% 100%");
                        }
                    });
                    var qixiRepairType = NJson.Parse(SysLocalStorage.Get("QiXiRepairTypes"))[["9962", "9963", "9964", "9965", "9966", "9967"].indexOf(mapid.toString())];
                    $QiXiTeamControlSetMap.find(".repairType select").val(qixiRepairType).change(function () {
                        var value = $(this).val().toString().ToNumber();
                        var oldValue = NJson.Parse(SysLocalStorage.Get("QiXiRepairTypes"));
                        oldValue[["9962", "9963", "9964", "9965", "9966", "9967"].indexOf(mapid.toString())] = value;
                        SysLocalStorage.Set("QiXiRepairTypes", JSON.stringify(NJson.ObjListToArray(oldValue)));
                    });
                    $QiXiTeamControlSetMap.find(".switch").click(function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var subAtkResult;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (MissionWorker.State != DBEnum.WorkState.Ready) {
                                            MessageBox.Show("请先停止任务");
                                            return [2];
                                        }
                                        if (YanXiWorker.State != DBEnum.WorkState.Ready) {
                                            MessageBox.Show("请先停止演习");
                                            return [2];
                                        }
                                        if (ZhanYiWorker.State != DBEnum.WorkState.Ready) {
                                            MessageBox.Show("请先停止战役");
                                            return [2];
                                        }
                                        if ($QiXiTeamControlSetMap.hasClass("unsupported")) {
                                            MessageBox.Show("本图尚未压制，不能使用奇袭");
                                            return [2];
                                        }
                                        if (TempEntityData.Ships.Count() == 0) {
                                            MessageBox.Show("请先设置舰船");
                                            return [2];
                                        }
                                        return [4, Net.Conditioning.PeventSupAtkStatus(mapid)];
                                    case 1:
                                        subAtkResult = _a.sent();
                                        if (subAtkResult.ErrorCode == 0) {
                                            Player.PveEvent.pveeventlevel.FirstOrDefault(function (c) { return c.pvelevelid == mapid; }).supatkstatus = subAtkResult.supatkstatus;
                                            if (subAtkResult.supatkstatus == 1) {
                                                $QiXiTeamControlSetMap.find(".switch").addClass("on");
                                            }
                                            else {
                                                $QiXiTeamControlSetMap.find(".switch").removeClass("on");
                                            }
                                        }
                                        else {
                                            MessageBox.Show(subAtkResult.ErrorMessage);
                                        }
                                        return [2];
                                }
                            });
                        });
                    });
                    $QiXiTeamControlSetMap.find(".shipcell").click(function () {
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
                        if ($QiXiTeamControlSetMap.hasClass("unsupported")) {
                            MessageBox.Show("尚未压制不能使用奇袭");
                            return;
                        }
                        ModalShower.SlideShipPickerQuick(function (c) { return !Player.IsBusyShip(c); }, function (ships, isRange) {
                            var fleetShips = ships.ToArray();
                            var fleetShipsList = List.From(fleetShips);
                            for (var i = 0; i < fleetShipsList.Count(); i++) {
                                if (fleetShipsList.Where(function (c) { return fleetShipsList.IndexOf(c) != i && Player.IsSameShip(Player.GetShip(fleetShipsList[i]), Player.GetShip(c)) == true; }).Count() > 0) {
                                    MessageBox.Show("（*゜ー゜*）<br/>编队内有重复舰船");
                                    return false;
                                }
                            }
                            return true;
                        }, function (ships, isRange) {
                            return __awaiter(this, void 0, void 0, function () {
                                var setShipResult, subAtkResult;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4, Net.Conditioning.SetFleet(mapid, ships)];
                                        case 1:
                                            setShipResult = _a.sent();
                                            if (!(setShipResult.ErrorCode != 0)) return [3, 2];
                                            MessageBox.Show(setShipResult.ErrorMessage);
                                            return [3, 5];
                                        case 2:
                                            if (!(ships.Count() == 0 && Player.PveEvent.pveeventlevel.FirstOrDefault(function (c) { return c.pvelevelid == mapid; }).supatkstatus == 1)) return [3, 4];
                                            return [4, Net.Conditioning.PeventSupAtkStatus(mapid)];
                                        case 3:
                                            subAtkResult = _a.sent();
                                            if (subAtkResult.ErrorCode == 0) {
                                                Player.PveEvent.pveeventlevel.FirstOrDefault(function (c) { return c.pvelevelid == mapid; }).supatkstatus = subAtkResult.supatkstatus;
                                                if (subAtkResult.supatkstatus == 1) {
                                                    $QiXiTeamControlSetMap.find(".switch").addClass("on");
                                                }
                                                else {
                                                    $QiXiTeamControlSetMap.find(".switch").removeClass("on");
                                                }
                                            }
                                            else {
                                                MessageBox.Show(subAtkResult.ErrorMessage);
                                            }
                                            _a.label = 4;
                                        case 4:
                                            MessageBox.Show("更改成功");
                                            ReloadMap(Player.PveEvent.pveeventlevel.FirstOrDefault(function (c) { return c.pvelevelid == mapid; }));
                                            _a.label = 5;
                                        case 5: return [2];
                                    }
                                });
                            });
                        }, TempEntityData.Ships.Select(function (c) { return c.ID; }), 6, 0, true);
                    });
                };
                Player.PveEvent.pveeventlevel.ForEach(function (pvelevel) {
                    ReloadMap(pvelevel);
                });
            });
            $("#PartialMission [data-action^='changeCurrentFleet']").click(function () {
                if (MissionWorker.State != DBEnum.WorkState.Ready) {
                    return MessageBox.Show("更换舰队前，请先停止任务");
                }
                var newNumber = $(this).attr("data-action").split("|")[1].ToNumber();
                if (Player.User.fleetmaxnum < newNumber) {
                    return MessageBox.Show("当前舰队尚未开启，请先完成主线任务");
                }
                Config.CurrentFleetID = newNumber;
                MissionPage.UpdateFleetShips();
            });
            $("#PartialMission #BtnStartMission").click(function () {
                if (MissionWorker.State != DBEnum.WorkState.Ready) {
                    return MessageBox.Show("当前任务未结束!");
                }
                if (NetErrorRelinker.IsLostConnection == true) {
                    return MessageBox.Show("您的账号已掉线!若已开启断线重连请等待自动重连,否则请重启.");
                }
                if (NetErrorRelinker.IsGameServerWeiHu == true) {
                    return MessageBox.Show("系统维护!请重启后再试.");
                }
                var missionid = $("#PartialMission #MissionList").val();
                var mission = MissionWorker.Works.FirstOrDefault(function (c) { return c.CustiomPVEID == missionid; });
                if (mission == null) {
                    return MessageBox.Show("任务不存在");
                }
                Dailog.CreatDialog({
                    Title: "设置任务次数", FormNodes: List.From([{
                            Name: "MissionCount",
                            Type: Dailog.FormNodeType.text,
                            Text: "任务次数",
                            Value: "1",
                            Placeholder: "请输入执行次数",
                            Validates: List.From([{ Key: "required", Value: true, Message: "请输入次数" }, { Key: "digits", Value: true, Message: "输入整数" }])
                        }]), OnBuild: function ($modal) {
                        $modal.find("[name='ShipID']").select2();
                    }, OnSubmit: function (fromJsonObj, $modal) {
                        return __awaiter(this, void 0, void 0, function () {
                            var MissionCount;
                            return __generator(this, function (_a) {
                                $modal.find("[data-check=save]").attr("disabled", "disabled");
                                $modal.find("[data-dismiss=modal]").triggerHandler("click");
                                MissionWorker.CurrentWork = mission;
                                MissionCount = fromJsonObj.MissionCount.ToNumber();
                                MissionWorker.Start({ MissionProgressNow: 0, MissionProgressTotal: MissionCount });
                                return [2];
                            });
                        });
                    }
                });
            });
            $("#PartialMission #BtnStopMission").click(function () {
                if ($("#PartialMission #BtnStopMission").attr("disabled") != "disabled") {
                    if (MissionWorker.State == DBEnum.WorkState.Working) {
                        MissionWorker.Stop();
                    }
                }
            });
            $("#PartialMission .btnQuickModifyPVE").click(function () {
                $("#PartialViewFooter [data-partialid=PartialSetting]").triggerHandler("click");
                $("#PartialSetting .swapChildPageNav [data-panel='panel-custompve']").triggerHandler("click");
                SettingPageIO.OnMoifyPVE($("#MissionList").val());
            });
        };
        MissionPage.InitUpdateTimer = function () {
            var _this = this;
            this.UpdateTimer = new Timer();
            this.UpdateTimer.Interval = 1000;
            this.UpdateTimer.Elapsed = function () {
                _this.UpdateView();
            };
            this.UpdateView();
            this.UpdateTimer.Start();
        };
        MissionPage.InitMission = function () {
            MissionWorker.InitWorks();
            MissionWorker.Works.AddRange(Config.PlayerConfig.CustomPVEMaps);
            MissionWorker.Works.ForEach(function (work) {
                $("#PartialMission #MissionList").append("<option value='" + work.CustiomPVEID + "'>" + work.WorkName + "</option>");
            });
            $("#PartialMission #MissionList").change(function () {
                var missionid = $("#PartialMission #MissionList").val();
                var mission = MissionWorker.Works.FirstOrDefault(function (c) { return c.CustiomPVEID == missionid; });
                if (mission.Remark && mission.Remark != "") {
                    Logs.Print(mission.Remark);
                }
                $("#PartialMission .ShipRepairType").val(mission.RepairLevel);
            });
        };
        MissionPage.InitRenWuQueue = function () {
            QueueWorker.Init();
            $("#PartialMission .btnworkqueue").click(function () {
                OpenRenWuQueueControl();
            });
            var OpenRenWuQueueControl = function () {
                var TempEntityData = Config.PlayerConfig.CustomPevQueues.Select(function (queue) {
                    return {
                        QueueID: queue.QueueID,
                        QueueName: queue.QueueName,
                        Nodes: queue.Nodes.Select(function (node) {
                            var work = MissionWorker.Works.FirstOrDefault(function (c) { return c.CustiomPVEID == node.WorkID.split('_')[1]; });
                            return {
                                WorkID: node.WorkID,
                                WorkName: work == null ? "任务不存在" : work.WorkName,
                                FleetID: node.FleetID,
                                SurplusWorkNumber: node.SurplusWorkNumber,
                                TotalWorkNumber: node.TotalWorkNumber,
                                StopOnNewShip: node.StopOnNewShip,
                                QianTingDanHeng: node.QianTingDanHeng,
                                IsAutoChangeShip: node.IsAutoChangeShip,
                            };
                        }),
                    };
                });
                var $QueueWorkerControl = $(doT.template($("#QueueWorkerControlTemp").html())(NJson.ObjListToArray(NJson.DeepCopy(TempEntityData))));
                $("body").append($QueueWorkerControl);
                PageScroll.BindScroll($("#QueueWorkerControl"), "滑动关闭任务队列", function (ev) {
                }, function (ev) {
                    return false;
                }, function (ev) {
                }, function (ev) {
                    var windowWidth = $(window).width();
                    if (ev.Start_X <= (windowWidth / 20) && ev.Move_X >= (windowWidth / 10)) {
                        $("#QueueWorkerControl").find(".modelheader [data-dismiss]").triggerHandler("click");
                    }
                });
                QueueWorker.OnQueueStart.Add(function () {
                    $QueueWorkerControl.find(".queue.active").find(".actionBegin,.actionContinue,.actionReset").hide();
                    $QueueWorkerControl.find(".queue.active").find(".actionPause").hide();
                });
                QueueWorker.OnMissionStart.Add(function () {
                    UpdateQueueWorkerControlPage();
                });
                QueueWorker.OnStoped.Add(function () {
                    UpdateQueueWorkerControlPage();
                });
                QueueWorker.OnOneEnd.Add(function () {
                    UpdateQueueWorkerControlPage();
                });
                QueueWorker.OnEnd.Add(function () {
                    UpdateQueueWorkerControlPage();
                });
                $QueueWorkerControl.find(".modelheader [data-dismiss]").click(function () {
                    CloseRenWuQueueControl();
                });
                if ($QueueWorkerControl.find(".queue").length == 0) {
                    var $isNullTip = $("<div>没有可用的配置</div>").css({ "text-align": "center", "margin-top": "5vw" });
                    var $redirect = $("<a href='javascript:;'><i class='fa fa-plus'></i> 添加配置</a>").css({ "padding": "0 3vw" }).appendTo($isNullTip);
                    $redirect.click(function () {
                        $QueueWorkerControl.find(".modelheader [data-dismiss]").triggerHandler("click");
                        $("#PartialViewFooter [data-partialid=PartialSetting]").triggerHandler("click");
                        setTimeout(function () {
                            $("#PartialSetting .swapChildPageNav [data-panel=panel-pvequeue]").triggerHandler("click");
                        }, 300);
                    });
                    $QueueWorkerControl.find(".queuelist").append($isNullTip);
                }
                $QueueWorkerControl.find(".queue").each(function (queueIndex, elem) {
                    var $Queuue = $(elem);
                    var queueID = $Queuue.attr("data-quid");
                    $Queuue.find(".actionBegin,.actionContinue").click(function () {
                        if (MissionWorker.LastEndTimeSpan > 0 && (NetDate.GetTimeSpan() - MissionWorker.LastEndTimeSpan) < 1000) {
                            return false;
                        }
                        var checkReuslt = QueueWorker.CheckRun(queueID);
                        if (checkReuslt == "") {
                            $QueueWorkerControl.find(".modelheader [data-dismiss]").triggerHandler("click");
                            QueueWorker.Run(queueID);
                        }
                        else {
                            MessageBox.Show(checkReuslt);
                        }
                    });
                    $Queuue.find(".actionPause").click(function () {
                        if ($(this).hasClass("disabled"))
                            return;
                        var checkReuslt = QueueWorker.CheckStop();
                        if (checkReuslt == "") {
                            QueueWorker.Stop();
                        }
                        else {
                            MessageBox.Show(checkReuslt);
                        }
                    });
                    $Queuue.find(".actionReset").click(function () {
                        if (QueueWorker.State != DBEnum.WorkState.Ready && QueueWorker.CurrentQueue != null && QueueWorker.CurrentQueue.QueueID == queueID) {
                            MessageBox.Show("操作失败，队列进行中");
                        }
                        else {
                            MessageBox.Confirm("确定重置？", function () {
                                Config.PlayerConfig.CustomPevQueues.FirstOrDefault(function (c) { return c.QueueID == queueID; }).Nodes.ForEach(function (c) {
                                    c.SurplusWorkNumber = c.TotalWorkNumber;
                                    c.IsCurrent = false;
                                });
                                UpdateQueueWorkerControlPage();
                            });
                        }
                    });
                    var configQueue = Config.PlayerConfig.CustomPevQueues.FirstOrDefault(function (c) { return c.QueueID == queueID; });
                    $Queuue.find(".qunode").each(function (qnIndex, qnelem) {
                        var $QuNode = $(qnelem);
                        var qunodeid = $QuNode.attr("data-noid");
                        $QuNode.find(".actionReduceTotalWorkNumber").click(function () {
                            var nodedata = configQueue.Nodes.FirstOrDefault(function (c) { return c.WorkID == qunodeid; });
                            if (nodedata.SurplusWorkNumber > 0) {
                                nodedata.TotalWorkNumber--;
                                nodedata.SurplusWorkNumber--;
                                UpdateQueueWorkerControlPage();
                            }
                        });
                        $QuNode.find(".actionAddTotalWorkNumber").click(function () {
                            var nodedata = configQueue.Nodes.FirstOrDefault(function (c) { return c.WorkID == qunodeid; });
                            nodedata.TotalWorkNumber++;
                            nodedata.SurplusWorkNumber++;
                            UpdateQueueWorkerControlPage();
                        });
                        $QuNode.find(".actionModifyTotalWorkNumber").click(function () {
                            var nodedata = configQueue.Nodes.FirstOrDefault(function (c) { return c.WorkID == qunodeid; });
                            Dailog.CreatDialog({
                                Title: "修改任务剩余次数", FormNodes: List.From([{
                                        Name: "SurplusNumber",
                                        Type: Dailog.FormNodeType.text,
                                        Text: "剩余执行次数",
                                        Value: nodedata.SurplusWorkNumber.toString(),
                                        Placeholder: "请输入还要执行多少次",
                                        Validates: List.From([{ Key: "required", Value: true, Message: "请输入次数" }, { Key: "digits", Value: true, Message: "输入整数" }])
                                    }]), OnBuild: function ($modal) {
                                    $modal.css("z-index", "1091");
                                    $modal.next().css("z-index", "1090");
                                }, OnSubmit: function (fromJsonObj, $modal) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var SurplusNumber, addNumber;
                                        return __generator(this, function (_a) {
                                            $modal.find("[data-check=save]").attr("disabled", "disabled");
                                            $modal.find("[data-dismiss=modal]").triggerHandler("click");
                                            SurplusNumber = fromJsonObj.SurplusNumber.ToNumber();
                                            if (SurplusNumber >= 0) {
                                                addNumber = SurplusNumber - nodedata.SurplusWorkNumber;
                                                nodedata.TotalWorkNumber += addNumber;
                                                nodedata.SurplusWorkNumber += addNumber;
                                                UpdateQueueWorkerControlPage();
                                            }
                                            return [2];
                                        });
                                    });
                                }
                            });
                        });
                        $QuNode.find(".actionForbidden").click(function () {
                            var nodedata = configQueue.Nodes.FirstOrDefault(function (c) { return c.WorkID == qunodeid; });
                            nodedata.IsForbidden = true;
                            UpdateQueueWorkerControlPage();
                        });
                        $QuNode.find(".actionUnForbidden").click(function () {
                            var nodedata = configQueue.Nodes.FirstOrDefault(function (c) { return c.WorkID == qunodeid; });
                            nodedata.IsForbidden = false;
                            UpdateQueueWorkerControlPage();
                        });
                    });
                });
                $QueueWorkerControl.find(".quheader .quname i").click(function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var queueid;
                        return __generator(this, function (_a) {
                            queueid = $(this).parents(".queue").eq(0).attr("data-quid");
                            $QueueWorkerControl.find(".modelheader [data-dismiss]").triggerHandler("click");
                            $("#PartialViewFooter [data-partialid=PartialSetting]").triggerHandler("click");
                            $("#PartialSetting .swapChildPageNav [data-panel='panel-pvequeue']").triggerHandler("click");
                            SettingPageIO.OnModifyQueue(queueid);
                            return [2];
                        });
                    });
                });
                var UpdateQueueWorkerControlPage = function () {
                    var $Control = $(".queueWorkerControl");
                    if ($Control.length == 0) {
                        return;
                    }
                    $Control.find(".queue").each(function (queueIndex, qelem) {
                        var $Queuue = $(qelem);
                        var queueID = $Queuue.attr("data-quid");
                        if (QueueWorker.CurrentQueue != null && QueueWorker.CurrentQueue.QueueID == queueID) {
                            $Queuue.addClass("active");
                        }
                        else {
                            $Queuue.removeClass("active");
                        }
                        var configQueue = Config.PlayerConfig.CustomPevQueues.FirstOrDefault(function (c) { return c.QueueID == queueID; });
                        configQueue.Nodes.ForEach(function (node) {
                            var $node = $Queuue.find(".qunode[data-noid=" + node.WorkID + "]");
                            if ($node.length > 0) {
                                if (node.IsForbidden == true) {
                                    $node.addClass("IsForbidden");
                                    $node.find(".actionForbidden").hide();
                                    $node.find(".actionUnForbidden").show();
                                }
                                else {
                                    $node.removeClass("IsForbidden");
                                    $node.find(".actionForbidden").show();
                                    $node.find(".actionUnForbidden").hide();
                                }
                                if (node.IsCurrent == true) {
                                    $node.addClass("active");
                                }
                                else {
                                    $node.removeClass("active");
                                }
                                if ($node.find(".teamAndNumber .now").html().ToNumber() != (node.TotalWorkNumber - node.SurplusWorkNumber)) {
                                    $node.find(".teamAndNumber .now").html((node.TotalWorkNumber - node.SurplusWorkNumber).toString());
                                }
                                if ($node.find(".teamAndNumber .total").html().ToNumber() != node.TotalWorkNumber) {
                                    $node.find(".teamAndNumber .total").html(node.TotalWorkNumber.toString());
                                }
                            }
                        });
                        if (QueueWorker.State == DBEnum.WorkState.Ready) {
                            $Queuue.find(".actionAddTotalWorkNumber,.actionReduceTotalWorkNumber,.actionModifyTotalWorkNumber").show();
                            if (configQueue.Nodes.Where(function (c) { return c.IsCurrent; }).Count() == 0) {
                                $Queuue.find(".actionBegin").show();
                                $Queuue.find(".actionContinue").hide();
                                $Queuue.find(".actionReset").hide();
                            }
                            else {
                                $Queuue.find(".actionBegin").hide();
                                $Queuue.find(".actionContinue").show();
                                $Queuue.find(".actionReset").show();
                            }
                            $Queuue.find(".actionPause").hide();
                        }
                        else if (QueueWorker.CurrentQueue != null && QueueWorker.CurrentQueue.QueueID == queueID) {
                            $Queuue.find(".actionBegin,.actionContinue,.actionReset,.actionForbidden,.actionUnForbidden,.actionAddTotalWorkNumber,.actionModifyTotalWorkNumber,.actionReduceTotalWorkNumber").hide();
                            $Queuue.find(".actionPause").show();
                            if (QueueWorker.IsStoping == true) {
                                $Queuue.find(".actionPause").addClass("disabled");
                            }
                            else {
                                $Queuue.find(".actionPause").removeClass("disabled");
                            }
                        }
                        else {
                            $Queuue.find(".actionAddTotalWorkNumber,.actionReduceTotalWorkNumber,.actionModifyTotalWorkNumber").show();
                            $Queuue.find(".actionBegin,.actionPause,.actionContinue").hide();
                            if (configQueue.Nodes.Where(function (c) { return c.IsCurrent; }).Count() == 0) {
                                $Queuue.find(".actionReset").hide();
                            }
                            else {
                                $Queuue.find(".actionReset").show();
                            }
                        }
                    });
                };
                UpdateQueueWorkerControlPage();
            };
            var CloseRenWuQueueControl = function () {
                QueueWorker.OnQueueStart = new List();
                QueueWorker.OnMissionStart = new List();
                QueueWorker.OnStoped = new List();
                QueueWorker.OnEnd = new List();
                $(".queueWorkerControl").removeClass("slideInRight").addClass("slideOutRight");
                setTimeout(function () {
                    $(".queueWorkerControl").remove();
                }, 500);
            };
        };
        MissionPage.UpdateTimer = null;
        MissionPage.LastResourceJsonString = "";
        MissionPage.LastShipListJsonString = "";
        MissionPage.LastUpdateFleetShipEntity = null;
        return MissionPage;
    }());
    MissionPage.OnLoad();
});
//# sourceMappingURL=Mission.js.map