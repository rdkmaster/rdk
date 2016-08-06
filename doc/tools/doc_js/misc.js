(function() {

if (isRDKApp()) {
    document.body.addEventListener('app_loaded', onReady);
} else {
    window.onload = onReady;
}

function onReady() {

    // ------------ 创建目录 start ------------
    var dirDiv;
    var handlerDiv;
    var nodes = findAndFixHeaders();
    if (nodes.length > 0) {
        createDirDiv();
        createDir(createUl(dirDiv), nodes);
        fixHandlerPosition();
        fixScrollHeight();
        document.body.onresize = fixHandlerPosition;
    }
    // ------------ 创建目录 end   ------------

    fixTitle();



    function createDir(parent, nodes) {
        var pNode = nodes.shift();
        createLi(parent, pNode);

        for (var i = 0; true; i++) {
            var node = nodes[i];
            if (node && node.level > pNode.level) {
                continue;
            }
            if (i > 0) {
                //有子节点
                var subNodes = nodes.slice(0, i);
                var ul = createUl(parent);
                createDir(ul, subNodes);
            }

            nodes = nodes.slice(i);
            break;
        }
        if (nodes.length > 0) {
            createDir(parent, nodes);
        }
    }

    function fixHandlerPosition() {
        var heightSpace = (document.documentElement.clientHeight - dirDiv.offsetHeight)/2;
        dirDiv.style.top = (heightSpace > 0 ? heightSpace : 1) + 'px';
        dirDiv.style.bottom = (heightSpace > 0 ? heightSpace : 1) + 'px';
        dirDiv.style.right = (25-dirDiv.offsetWidth) + 'px';

        var height = Math.min(document.documentElement.clientHeight, dirDiv.offsetHeight);
        handlerDiv.style.top = (height - 80)/2 + 'px';

        dirDiv.childNodes[1].style.height = '100%';
        dirDiv.childNodes[1].style.overflow = 'auto';
    }

    function fixScrollHeight() {
        if (!location.hash) {
            return;
        }
        setTimeout(function() {
            var dom = document.getElementById(location.hash.substring(1));
            if (!dom) {
                return;
            }
            var pos = dom.getBoundingClientRect();
            if (pos.top > 0) {
                window.scrollTo(0, pos.top);
            }
        }, 100)
    }

    function createLi(parent, nodeInfo) {
        var li = document.createElement('li');
        parent.appendChild(li);
        var a = document.createElement('a');
        a.innerHTML = nodeInfo.text;
        a.href = '#' + nodeInfo.id;
        li.appendChild(a);
    }

    function createUl(parent) {
        var ul = document.createElement('ul');
        ul.style['margin'] = '0px 0px 0px 0px';
        parent.appendChild(ul);
        return ul;
    }

    function findAndFixHeaders() {
        var nodeIdIndex = 0;
        var nodes = [];
        var tags = document.body.getElementsByTagName('*');
        for (var i = 0; i < tags.length; i++) {
            var tag = tags[i];
            if (!tag.localName.match(/^h\d$/)) {
                continue;
            }

            if (!tag.id) {
                tag.id = tag.innerText;
            }

            nodes.push({id: tag.id, text: tag.innerHTML, level: tag.localName.substring(1)});
        }

        return nodes;
    }

    function createDirDiv() {
        dirDiv = document.createElement('div');
        document.body.appendChild(dirDiv);
        dirDiv.style['border'] = '1px solid rgb(224, 224, 224)';
        dirDiv.style['border-radius'] = '6px 0px 0px 6px';
        dirDiv.style['position'] = 'fixed';
        dirDiv.style['right'] = '-600px';
        dirDiv.style['transition'] = 'all 0.5s ease-in-out';
        dirDiv.style['min-height'] = '340px';
        dirDiv.style['min-width'] = '340px';
        dirDiv.style['max-width'] = '600px';
        dirDiv.style['padding'] = '10px 0px 10px 10px';
        dirDiv.style['box-shadow'] = 'rgba(51, 51, 102, 0.298039) -1px 4px 18px, rgba(51, 51, 102, 0.298039) 1px 1px 4px 2px inset';
        dirDiv.style['background-color'] = 'rgb(255, 255, 255)';
        dirDiv.onmouseout = function(event) {
			if (event.toElement) {
				var node = event.toElement.parentNode;
				while (node) {
					if (node === dirDiv) {
						return;
					}
					node = node.parentNode;
				}
			}
            dirDiv.style.right = (25-dirDiv.offsetWidth) + 'px';    
            leftDiv.style.display = 'block';
            rightDiv.style.display = 'none';
        };

        handlerDiv = document.createElement('div');
        handlerDiv.style['width'] = '20px';
        handlerDiv.style['border-radius'] = '0px 5px 5px 0px';
        handlerDiv.style['height'] = '80px';
        handlerDiv.style['position'] = 'absolute';
        handlerDiv.style['left'] = '3px';
        handlerDiv.style['top'] = '174px';
        handlerDiv.style['background-color'] = 'orange';
        dirDiv.appendChild(handlerDiv);
		handlerDiv.onclick = function() {
            dirDiv.style.right = '0px';
            leftDiv.style.display = 'none';
            rightDiv.style.display = 'block';
		}

        var leftDiv = document.createElement('div');
        leftDiv.onclick = handlerDiv.onclick;
        leftDiv.style['display'] = 'block';
        leftDiv.style['width'] = '0px';
        leftDiv.style['height'] = '0px';
        leftDiv.style['border-top-width'] = '12px';
        leftDiv.style['border-top-style'] = 'solid';
        leftDiv.style['border-top-color'] = 'transparent';
        leftDiv.style['border-right-width'] = '12px';
        leftDiv.style['border-right-style'] = 'solid';
        leftDiv.style['border-right-color'] = 'rgb(255, 255, 255)';
        leftDiv.style['border-bottom-width'] = '12px';
        leftDiv.style['border-bottom-style'] = 'solid';
        leftDiv.style['border-bottom-color'] = 'transparent';
        leftDiv.style['position'] = 'absolute';
        leftDiv.style['top'] = '35%';
        leftDiv.style['left'] = '3px';
        handlerDiv.appendChild(leftDiv);

        var rightDiv = document.createElement('div');
        rightDiv.onclick = handlerDiv.onclick;
        rightDiv.style['display'] = 'none';
        rightDiv.style['width'] = '0px';
        rightDiv.style['height'] = '0px';
        rightDiv.style['border-top-width'] = '12px';
        rightDiv.style['border-top-style'] = 'solid';
        rightDiv.style['border-top-color'] = 'transparent';
        rightDiv.style['border-left-width'] = '12px';
        rightDiv.style['border-left-style'] = 'solid';
        rightDiv.style['border-left-color'] = 'rgb(255, 255, 255)';
        rightDiv.style['border-bottom-width'] = '12px';
        rightDiv.style['border-bottom-style'] = 'solid';
        rightDiv.style['border-bottom-color'] = 'transparent';
        rightDiv.style['position'] = 'absolute';
        rightDiv.style['top'] = '35%';
        rightDiv.style['left'] = '5px';
        handlerDiv.appendChild(rightDiv);
    }


    function fixTitle() {
        var cfgTag = document.getElementById('__hidden__');
        if (!cfgTag) {
            return;
        }
        var title = cfgTag.getAttribute('title');
        if (!title) {
            return;
        }
        document.title = title;
    }
}

function isRDKApp() {
    if (location.href.match(/^file:\/\/\/.+/)) {
        return false;
    }
    var scripts = document.scripts;
    for(var i = 0; i < scripts.length; i++) {
        var url = scripts[i].getAttribute('data-main');
        if (url && url.match(/\/rdk$/)) {
            return true;
        }
    }
    return false;
}


})();