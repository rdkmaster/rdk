misc = (function() {
    
document.body.onresize = fixHandlerPosition;

var misc = {
    makeDir: function() {
        var nodes = findAndFixHeaders(misc.markdownContainer);
        if (nodes.length > 0) {
            createDirDiv();
            createDir(createUl($('#___dir___')[0]), nodes);
            fixHandlerPosition();
        }
    },
    resetDir: function() {
        $('#___dir___').remove();
    },
    scrollToTarget: scrollToTarget
}
return misc;

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
    var dirDiv = $('#___dir___')[0];
    var heightSpace = (document.documentElement.clientHeight - dirDiv.offsetHeight)/2;
    dirDiv.style.top = (heightSpace > 0 ? heightSpace : 1) + 'px';
    dirDiv.style.bottom = (heightSpace > 0 ? heightSpace : 1) + 'px';
    dirDiv.style.right = (25-dirDiv.offsetWidth) + 'px';

    var height = Math.min(document.documentElement.clientHeight, dirDiv.offsetHeight);
    var handlerDiv = $('#___handler___')[0];
    handlerDiv.style.top = (height - 80)/2 + 'px';

    dirDiv.childNodes[1].style.height = '100%';
    dirDiv.childNodes[1].style.overflow = 'auto';
}

function scrollToTarget() {
    window.scrollTo(0, 0);
    
    var match = location.hash.substring(1).match(/#(.*?)$/);
    var target = !!match ? match[1] : undefined;
    if (!target) {
        return;
    }
    
    var dom = document.getElementById(target);
    if (!dom) {
        return;
    }
    var pos = dom.getBoundingClientRect();
    window.scrollTo(0, pos.top);
}

function createLi(parent, nodeInfo) {
    var li = document.createElement('li');
    parent.appendChild(li);
    var a = document.createElement('a');
    a.innerHTML = nodeInfo.text;
    a.href = 'javascript:void(0)';
    a.onclick = function() {
        var hash = location.hash.substring(1);
        var idx = hash.indexOf('#');
        if (idx == -1) {
            idx = hash.length;
        }
        hash = hash.substring(0, idx);
        location.hash = hash + '#' + nodeInfo.id;
    };
    li.appendChild(a);
}

function createUl(parent) {
    var ul = document.createElement('ul');
    ul.style['margin'] = '0px 0px 0px 0px';
    parent.appendChild(ul);
    return ul;
}

function findAndFixHeaders(markdownContainer) {
    var nodeIdIndex = 0;
    var nodes = [];
    var tags = markdownContainer.getElementsByTagName('*');
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
    var dirDiv = document.createElement('div');
    document.body.appendChild(dirDiv);
    dirDiv.id = '___dir___';
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

    var handlerDiv = document.createElement('div');
    dirDiv.appendChild(handlerDiv);
    handlerDiv.id = '___handler___';
    handlerDiv.style['width'] = '20px';
    handlerDiv.style['border-radius'] = '0px 5px 5px 0px';
    handlerDiv.style['height'] = '80px';
    handlerDiv.style['position'] = 'absolute';
    handlerDiv.style['left'] = '3px';
    handlerDiv.style['top'] = '174px';
    handlerDiv.style['background-color'] = 'orange';
    handlerDiv.onclick = function() {
        dirDiv.style.right = '0px';
        leftDiv.style.display = 'none';
        rightDiv.style.display = 'block';
    }

    var leftDiv = document.createElement('div');
    handlerDiv.appendChild(leftDiv);
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

    var rightDiv = document.createElement('div');
    handlerDiv.appendChild(rightDiv);
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
}

})();