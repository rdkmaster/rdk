(function() {
    return {
        post: function(request) {
            if (!request) {
                return false;
            }
            var cpFrom = request.from;
            var cpTo = request.to;
            if (!cpFrom || !cpTo) {
                return false;
            }
            
            var opt = request.opt;
            opt = !!opt ?? '-' + opt : '';

            var shell = 'cp ' + opt + ' "' + cpFrom + '" "' + cpTo + '"';
            log('cp shell:', shell);

            try {
                var Runtime = Java.type('java.lang.Runtime');
                var rt = Runtime.getRuntime();
                var proc = rt.exec(shell);
                // return p.waitFor() == 0;
            } catch(e) {
                log('copy file error, detail:', e.toString());
                return false;
            }
        }
    }
})();

cp ./* /home/tmp/xxx -rf