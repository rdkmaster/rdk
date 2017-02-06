(function() {
    function _do(req, method) {
    }
    function _get(req) {
        var result = new DataTable([], [], []);
        if (!req.service) {
            Log.error('bad argument, need a "service" property!')
            return result;
        }

        var timestamp;
        var param = !!req.param ? req.param : {};
        var key = JSON.stringify({ service: req.service, param: param });
        log('data key =', key);
        var dataTable = Cache.aging.get(key);
        if (!dataTable) {
            var url = req.service + '?p={param:' + JSON.stringify(param) + '}';

            timestamp = new Date().getTime();
            dataTable = Rest.get(url, {readTimeout: 120000});
            try {
                dataTable = JSON.parse(dataTable);
                dataTable = JSON.parse(dataTable.result);
            } catch (e) {
                Log.error(e.stack);
                return result;
            }
            log('read data spent', (new Date().getTime() - timestamp), 'ms');
            Cache.aging.put(key, dataTable, 6*3600);
        } else {
            log('read data from cache success!')
        }
        if (!_.isDataTable(dataTable)) {
            Log.error('no data or invalid data format, need a "DataTable" object!');
            return result;
        }

        var data;
        if (req.hasOwnProperty('filter')) {
            timestamp = new Date().getTime();
            data = _filter(dataTable.data, req.filter.key, req.filter.field, dataTable.field);
            log('filter data spent', (new Date().getTime() - timestamp), 'ms');
        } else {
            data = dataTable.data;
        }

        if (req.hasOwnProperty('sort')) {
            if (data.length > 0) {
                timestamp = new Date().getTime();
                //sort会改变原数据
                _sort(data, dataTable.field.indexOf(req.sort.field),
                    req.sort.as, req.sort.order === 'desc' ? -1 : 1);
                log('sort data spent', (new Date().getTime() - timestamp), 'ms');
            } else {
                Log.warn('empty data array, unneccessary to sort');
            }
        }

        var pagingInfo = {};
        pagingInfo.pageSize = _fixPageSize(req.paging.pageSize);
        pagingInfo.totalRecord = data.length;
        pagingInfo.totalPage = Math.ceil(pagingInfo.totalRecord/pagingInfo.pageSize);
        pagingInfo.totalPage = pagingInfo.totalPage == 0 ? 1 : pagingInfo.totalPage;
        pagingInfo.currentPage = _fixCurrentPage(req.paging.currentPage, pagingInfo);

        if (req.hasOwnProperty('paging')) {
            data = _paging(data, pagingInfo);
        } else {
            Log.error('need a "paging" property!')
            data = [];
        }

        result.header = dataTable.header;
        result.field = dataTable.field;
        result.data = data;
        result.paging = pagingInfo;
        return result;
    }
    return {
        get: _get
    }

    function _sort(data, index, sortAs, order) {
        if (index == -1) {
            Log.warn('unknown which field to sort!');
            return;
        }
        log('sort param: index = [', index, '] sortAs = [', sortAs, '] order = [', order, ']');

        var sortBy;
        if (sortAs == 'number' || sortAs == 'int' || sortAs == 'float') {
            sortBy = sortAsNumber;
        } else if (sortAs == 'string') {
            sortBy = sortAsString;
        } else if (sortAs == 'date') {
            sortBy = sortAsString;
        } else if (!sortAs) {
            //自动检测
            sortBy = isNaN(Number(data[0][index])) ? sortAsString : sortAsNumber;
        } else {
            try {
                //应用自定义排序算法
                sortBy = eval(sortAs);
            } catch (e) {
            }
            if (!_.isFunction(sortBy)) {
                Log.warn('invalid sort function, sorting as string...');
                sortBy = sortAsString;
            }
        }
        data.sort(sortBy);

        function sortAsNumber(a, b) {
            return order * (a[index] - b[index]);
        }

        function sortAsString(a, b) {
            return order * (a[index].localeCompare(b[index]));;
        }
    }

    function _filter(data, key, field, allField) {
        if (!key) {
            Log.warn('invalid filter key, need at least ONE char!');
            return;
        }
        key = key.toLowerCase();
        field = !!field ? field : allField;
        field = _.isArray(field) ? field : [field];
        log('filter param: key = [', key, '] field = [', field.join(','),
            '] allField = [', allField.join(','), ']');

        var indexes = [];
        for (var i = 0; i < field.length; i++) {
            var idx = allField.indexOf(field[i]);
            if (idx == -1) {
                Log.warn('invalid filter field:', field[i]);
                continue;
            }
            indexes.push(idx);
        }

        return data.filter(function(item) {
            for (var i = 0, len = indexes.length; i < len; i++) {
                var cell = item[indexes[i]];
                if (cell == null || cell == undefined) {
                    continue;
                }
                cell = String(cell);
                //模糊搜索大小写不敏感
                cell = cell.toLowerCase();
                if (cell.indexOf(key) != -1) {
                    return true;
                }
            }
            return false;
        });
    }

    function _paging(data, pagingInfo) {
        var currentPage = pagingInfo.currentPage;
        var pageSize = pagingInfo.pageSize;
        log('paging param: currentPage = [', currentPage, '] pageSize = [', pageSize, ']');

        var page = [];
        for (var i = (currentPage-1)*pageSize, size = currentPage*pageSize; i < size && i < data.length; i++) {
            page.push(data[i]);
        }
        return page;
    }

    function _fixCurrentPage(currentPage, pagingInfo) {
        currentPage = !_.isNumber(currentPage) || currentPage < 1 ? 1 : currentPage;
        var pageSize = pagingInfo.pageSize;
        var totalRecord = pagingInfo.totalRecord;
        if (currentPage*pageSize - pageSize > totalRecord) {
            //应用给的当前页过大，调整为最后一页
            Log.warn('adjust currentPage[' + currentPage + '] to lastPage[' + pagingInfo.totalPage + ']');
            currentPage = pagingInfo.totalPage;
        }
        return currentPage;
    }

    function _fixPageSize(pageSize) {
        return !_.isNumber(pageSize) || pageSize < 1 ? 100 : pageSize;
    }
})();