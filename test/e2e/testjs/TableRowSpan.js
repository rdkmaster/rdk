'use strict';
describe('Table Row Span Tests', function() {
    beforeEach(function() {
        browser.get('test/e2e/testee/table/web/rowspan.html');
        browser.sleep(3000);
    });

    it('rowSpan 计算正确', function() {
        var firstTdsRowSpan = ['3', '1', '1', '2', '1'];
        var firstTdsDisplay = ['', 'none', 'none', '', 'none'];
        element.all(by.css(".rdk-table tr td:first-child")).each(function(item, index) {
            console.log(item);
            expect(item.getAttribute("rowspan")).toBe(firstTdsRowSpan[index]);
            if (firstTdsDisplay[index] != "") {
                expect(item.getCssValue("display")).toBe(firstTdsDisplay[index]);
            }
        });

        var secondTdsRowSpan = ['3', '1', '1', '2', '1'];
        var secondTdsDisplay = ['', 'none', 'none', '', 'none'];
        element.all(by.css(".rdk-table tr td:nth-child(2)")).each(function(item, index) {
            expect(item.getAttribute("rowspan")).toBe(secondTdsRowSpan[index]);
            if (secondTdsDisplay[index] != "") {
                expect(item.getCssValue("display")).toBe(secondTdsDisplay[index]);
            }
        });

        var thirdTdsRowSpan = ['1', '2', '1', '2', '1'];
        var thirdTdsDisplay = ['', '', 'none', '', 'none'];
        element.all(by.css(".rdk-table tr td:nth-child(3)")).each(function(item, index) {
            expect(item.getAttribute("rowspan")).toBe(thirdTdsRowSpan[index]);
            if (thirdTdsDisplay[index] != "") {
                expect(item.getCssValue("display")).toBe(thirdTdsDisplay[index]);
            }
        });
    });

    it('Edit过后RowSpan单元格Change事件发出的数据正确', function() {
        
        var rowSpanTarget = element(by.css(".rdk-table tr:first-child td:first-child div"));
        browser.actions().mouseDown(rowSpanTarget,protractor.Button.LEFT).
        mouseMove({x:100, y:100}).mouseUp(rowSpanTarget,protractor.Button.LEFT).perform();

        var rowSpanMoveTarget = element(by.css(".rdk-table tr:first-child td:nth-child(3)"));
        browser.actions().mouseDown(rowSpanMoveTarget,protractor.Button.LEFT).
        mouseMove({x:100, y:100}).mouseUp(rowSpanMoveTarget,protractor.Button.LEFT).perform();

        element(by.binding('changeData.cells')).getText().then(function(cells) {
            expect(cells).toBe('[[0,0],[1,0],[2,0]]');
        });

    });

    it('Edit过后未RowSpan单元格Change事件发出的数据正确', function() {
        
        var noRowSpanTarget = element(by.css(".rdk-table tr:first-child td:nth-child(4) div"));
        browser.actions().mouseDown(noRowSpanTarget,protractor.Button.LEFT).
        mouseMove({x:100, y:100}).mouseUp(noRowSpanTarget,protractor.Button.LEFT).perform();

        var noRowSpanMoveTarget = element(by.css(".rdk-table tr:first-child td:nth-child(5)"));
        browser.actions().mouseDown(noRowSpanMoveTarget,protractor.Button.LEFT).
        mouseMove({x:100, y:100}).mouseUp(noRowSpanMoveTarget,protractor.Button.LEFT).perform();

        element(by.binding('changeData.cells')).getText().then(function(cells) {
            expect(cells).toBe('[[0,3]]');
        });

    });
});
