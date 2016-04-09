Flow = (function() {
    var PT = Flow.prototype;
    var instance;
    var checkModule = function(module, rtn_item) {
        if (isNotEmpty(module)) {
            return module[rtn_item]
        } else {
            Console.log("[" + this.clazz + "]<Error> Cant get Flows from empty module,[Tip] Invoke like:FlowInstance.of(RunJSInstance)")
        }
    };
    PT.of = function(module) {
        if (isEmpty(module) && isDifClass(instance, this)) {
            module = this
        }
        return checkModule(module, "sys_flows")
    };
    PT.init = function(module) {
        var cur = this;
        var flows = checkModule(module, "sys_flows");
        if (isNotEmpty(flows)) {
            $.each(flows,
            function(key, value) {
                if (isArray(value) && isNotEmpty(key)) {
                    flows[key] = (function() {
                        cur.invoke.call(module, value, arguments[0], key)
                    })
                }
            })
        }
    };
    PT.invoke = function(array, step, event) {
        var index = step;
        if (step > 0) {
            index = step - 1
        }
        var invoker = array[index];
        if (isNotEmpty(invoker.action)) {
            var action = invoker.action;
            var stack = invoker.stack;
            if (isNotEmpty(action) && isFunc(action.event)) {
                if (isEmpty(stack)) {
                    var flows = checkModule(this, "sys_flows");
                    stack = {
                        event: flows[event],
                        data: step + 1
                    }
                }
                this.event_stack.push(stack);
                var success = action.event.call(this, action.data);
                Console.log("[" + className(this) + "]<" + className(instance) + ">action[" + event + "] invoked: step[" + step + "] " + "'" + (isNotEmpty(invoker.description) ? invoker.description: "No Description") + "'");
                if (success) {
                    instance.invokeStack(this, event, step)
                }
            }
        }
    };
    PT.invokeStack = function(module, event, step) {
        if (isEmpty(module) && className(this) != className(instance)) {
            module = this
        }
        var stack = module.event_stack.pop();
        if (isNotEmpty(stack) && isFunc(stack.event)) {
            stack.event.call(module, stack.data);
            var flows = checkModule(module, "sys_flows");
            if (step + 1 != stack.data && stack.event != flows[event]) {
                Console.log("\t[" + className(module) + "]<" + className(instance) + ">stack[" + event + "] invoked: step[" + step + "]")
            }
        }
    };
    PT.push = function(fun, data) {
        var d = {
            event: fun,
            data: data
        };
        checkModule(this, "event_stack").push(d);
        instance.last_module = this;
        return d
    };
    function Flow() {
        instance = this;
        this.arg = arguments;
        this.clazz = className(this);
        return this
    }
    return Flow
})();