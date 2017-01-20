var commonModule = angular.module("common", []);

commonModule.service('CommonUtil', [function() {


    Date.prototype.DateAdd = function(strInterval, Number) {
        var dtTmp = this;
        switch (strInterval) {
            case 's':
                return new Date(Date.parse(dtTmp) + (1000 * Number));
            case 'n':
                return new Date(Date.parse(dtTmp) + (60000 * Number));
            case 'h':
                return new Date(Date.parse(dtTmp) + (3600000 * Number));
            case 'd':
                return new Date(Date.parse(dtTmp) + (86400000 * Number));
            case 'w':
                return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
            case 'q':
                return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
            case 'm':
                return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
            case 'y':
                return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        }
    }

    Date.prototype.Format = function(formatStr) {
        var str = formatStr;
        var Week = ['日', '一', '二', '三', '四', '五', '六'];

        str = str.replace(/yyyy|YYYY/, this.getFullYear());
        str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));

        str = str.replace(/MM/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
        str = str.replace(/M/g, this.getMonth() + 1);

        str = str.replace(/w|W/g, Week[this.getDay()]);

        str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
        str = str.replace(/d|D/g, this.getDate());

        str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
        str = str.replace(/h|H/g, this.getHours());
        str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
        str = str.replace(/m/g, this.getMinutes());

        str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
        str = str.replace(/s|S/g, this.getSeconds());

        return str;
    }

    /**
       规则 $开头的列隐藏, P\d+模式的跳转
     **/
    this.generateTableSetting = function(fields, drill) {
        function generateHideDef(index) {
            var def = {};
            def.targets = index;
            def.visible = false;
            return def;
        }

        function generateLinkDef(index, field) {
            var def = {};
            def.targets = index;
            def.render = function(data, type, full) {
                var html = '<a href="#" ng-click="appScope.tableItemClick(item,\'' + field + '\')">{{item.' + field + '}}</a>';
                return html;
            };
            return def;
        }

        function generateDrillDef(index, field) {
            var def = {};
            def.targets = index;
            def.render = function(data, type, full) {
                var html = '<a href="#" ng-click="appScope.drillItemClick(item,\'' + field + '\')">{{item.' + field + '}}</a>';
                return html;
            };
            return def;
        }

        function contains(array, obj) {
            var i = array.length;
            while (i--) {
                if (array[i] == obj) {
                    return true;
                }
            }
            return false;
        }

        var tableSetting = {};
        tableSetting.ordering = false;
        tableSetting.columnDefs = new Array();
        for (var i = 0; i < fields.length; i++) {
            if (fields[i].match(/^\$/)) {
                tableSetting.columnDefs.push(generateHideDef(i));
            } else if (fields[i].match(/^(P|p)\d*$/)) {
                tableSetting.columnDefs.push(generateLinkDef(i, fields[i]));
            } else if (drill && contains(drill, fields[i])) {
                tableSetting.columnDefs.push(generateDrillDef(i, fields[i]));
            }
        };
        return tableSetting;
    };


    this.getArray = function(param) {
        var paramArray = new Array();
        if (param instanceof Array) {
            paramArray = param;
        } else {
            if (param != undefined) paramArray.push(param);
        }
        return paramArray;
    };

    /**
       根据KqiID获取所在KqiIndex
    **/
    this.getKqiIndexFromKqiID = function(kqis, kqiID) {
        for (var kqiIndex = 0; kqiIndex < kqis.length; kqiIndex++) {
            if (kqis[kqiIndex].id == kqiID) break;
        };
        return kqiIndex;
    }


    this.getKpiSetting = function(pageSetting, kpiID, kqiIndex) {
        if (kqiIndex) {
            for (var k = 0; k < pageSetting[kqiIndex].kpi.length; k++) {
                if (pageSetting[kqiIndex].kpi[k].id == kpiID) {
                    break;
                }
            };
        } else {
            var found = false;
            for (var kqiIndex = 0; kqiIndex < pageSetting.length; kqiIndex++) {
                for (var k = 0; k < pageSetting[kqiIndex].kpi.length; k++) {
                    if (pageSetting[kqiIndex].kpi[k].id == kpiID) {
                        found = true;
                        break;
                    }
                };
                if (found) break;
            };
        }
        return pageSetting[kqiIndex].kpi[k];
    }

    /**
       根据KPIID 获取KPIIndex
    **/
    this.getKpiIndexFromKpiID = function(kqis, kpiID) {
        var found = false;
        for (var selectKqiIndex = 0; selectKqiIndex < kqis.length; selectKqiIndex++) {
            for (var selectKpiIndex = 0; selectKpiIndex < kqis[selectKqiIndex].kpi.length; selectKpiIndex++) {
                if (kqis[selectKqiIndex].kpi[selectKpiIndex].id == kpiID) {
                    found = true;
                    break;
                }
            }
            if (found) break;
        };
        return selectKpiIndex;
    };

    this.getKpiFromKpiID = function(kqis, kpiID) {
        var found = false;
        for (var selectKqiIndex = 0; selectKqiIndex < kqis.length; selectKqiIndex++) {
            for (var selectKpiIndex = 0; selectKpiIndex < kqis[selectKqiIndex].kpi.length; selectKpiIndex++) {
                if (kqis[selectKqiIndex].kpi[selectKpiIndex].id == kpiID) {
                    found = true;
                    break;
                }
            }
            if (found) break;
        };
        return kqis[selectKqiIndex].kpi[selectKpiIndex];
    };

    this.getCityFromCityID = function(citys, cityID) {
        for (var i = 0; i < citys.length; i++) {
            if (citys[i].value == cityID) {
                break;
            }
        };
        return citys[i];
    }

    this.generateUrl = function(pageSetting, kpiID, condition) {
        var kpiSetting = this.getKpiSetting(pageSetting, kpiID);
        var url = kpiSetting.jumpTo + ".html?";
        var propertyNames = Object.getOwnPropertyNames(condition);
        for (var i = 0; i < propertyNames.length; i++) {
            var property = propertyNames[i];
            var value = condition[property];
            if (value instanceof Array) {
                for (var j = 0; j < value.length; j++) {
                    if (value[j] instanceof Object) {
                        url = url + property + "=" + replaceSpecialChar(JSON.stringify(value[j])) + "&";
                    } else {
                        url = url + property + "=" + replaceSpecialChar(value[j]) + "&";
                    }
                }
            } else {
                if (value instanceof Object) {
                    url = url + property + "=" + replaceSpecialChar(JSON.stringify(value)) + "&";
                } else {
                    url = url + property + "=" + replaceSpecialChar(value) + "&";
                }
            }
        }
        url = encodeURI(url.substring(0, url.length - 1));
        
        return replaceToEncode(url,"===","%3D");
    }

    function replaceSpecialChar(value){
        //等于号替换为3个等于号
        return value ? value.replace(/=/g,"===") : value;
    }

    function replaceToEncode(url,source,target){
        return url.replace(new RegExp(source,"g"),target);
    }

    this.generateResult = function(data, label) {
        var result = "";
        if (data.length == 1) {
            result = data[0][label];
        } else if (data.length > 1) {
            for (var i = 0; i < data.length - 1; i++) {
                result = result + data[i][label] + ",";
            };
            result = result + data[i][label];
        }
        return result;
    };

    this.generateKqiOption = function(pageSetting, kqi, kpis) {
        var kqiCondition = {};
        kqiCondition.id = kqi;
        kqiCondition.kpi = new Array();
        var kqiIndex = this.getKqiIndexFromKqiID(pageSetting, kqi);
        var kpiArray = this.getArray(kpis);
        for (var j = 0; j < kpiArray.length; j++) {
            kqiCondition.kpi = kqiCondition.kpi.concat(this.getKpiSetting(pageSetting, kpiArray[j], kqiIndex).contentFields);
        }
        return kqiCondition;
    }

    this.getValueFromKey = function(obj, value) {
        var propertyNames = Object.getOwnPropertyNames(obj);
        for (var i = 0; i < propertyNames.length; i++) {
            var property = propertyNames[i];
            if (obj[property] == value) break;
        };
        return propertyNames[i];
    }

    this.generateParamArray = function(param) {
        var objs = this.getArray(param);
        var result = new Array();
        for (var i = 0; i < objs.length; i++) {
            result.push(JSON.parse(objs[i]));
        }
        return result;
    }

    this.getCausesFromCauseAndCauseTypeID = function(causes, causeTypeID, causeID) {
        for (var i = 0; i < causes.length; i++) {
            if (causes[i].causetype == causeTypeID && causes[i].value == causeID) {
                break;
            }
        }
        return causes[i];
    }

    this.generateNeCondition = function(kqis, kpiID, neInfos) {
        var nes = this.getKpiFromKpiID(kqis, kpiID).data_source_ne.split(",");
        var neResult = new Array();
        for (var i = 0; i < nes.length; i++) {
            for (var j = 0; j < neInfos.length; j++) {
                if (neInfos[j].netype == nes[i]) {
                    neResult.push(neInfos[j]);
                    break;
                }
            };
        };
        return neResult;
    }

    this.generateExportData = function(data) {
        function generateDeleteIndex(data) {
            var result = [];
            for (var i = 0; i < data.field.length; i++) {
                if (data.field[i].match(/^\$/)) {
                    result.push(i);
                }
            };
            return result;
        }

        function deleteDataBaseIndex(data) {
            if (deleteIndexs.length > 0 && data.length > 0) {
                for (var i = 0; i < deleteIndexs.length; i++) {
                    data.splice(deleteIndexs[i] - i, 1);
                }
            }
            return data;
        }

        var deleteIndexs = generateDeleteIndex(data);

        var result = {};
        result.field = deleteDataBaseIndex(data.field);
        result.header = deleteDataBaseIndex(data.header);
        result.data = [];
        for (var i = 0; i < data.data.length; i++) {
            result.data.push(deleteDataBaseIndex(data.data[i]));
        };
        return result;
    }


    this.generateFailCode = function(data) {
        var failCodeData = _.groupBy(data, function(item) {
            return item.causetype + "_" + item.causeTypeLabel });
        var objProps = Object.getOwnPropertyNames(failCodeData);
        var failResults = [];
        var failResult;
        for (var i = 0; i < objProps.length; i++) {
            failResult = {};
            failResult.causeId = objProps[i].split("_")[0];
            failResult.causeName = objProps[i].split("_")[1];
            failResult.subCauses = failCodeData[objProps[i]];
            failResults.push(failResult);
        };
        return failResults;
    }

}]);
