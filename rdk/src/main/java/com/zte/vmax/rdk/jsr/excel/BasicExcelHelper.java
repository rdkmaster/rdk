package com.zte.vmax.rdk.jsr.excel;

import com.zte.vmax.rdk.util.RdkUtil;
import jdk.nashorn.api.scripting.ScriptObjectMirror;
import jdk.nashorn.internal.runtime.Undefined;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.CellRangeAddressList;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.*;

/**
 * Created by 10033559 on 2017/7/26.
 */
public abstract class BasicExcelHelper implements ExcelHelper{

    protected abstract Workbook getBook(InputStream fis) throws Exception;
    protected abstract Workbook getBook() throws Exception;
    protected abstract DataValidation getValidation4Range(Sheet sheet, CellRangeAddressList ranges, String[] validationList);
    protected abstract short getDataFormat(Workbook book, String formatDetail);

    public static ExcelHelper getRealHelper(String fullName){
        return fullName.matches("^.*\\.xlsx$") ? new XlsxExcelHelper() : new XlsExcelHelper();
    }

    // 判断是否存在值 - 复用以前的代码
    private boolean isOpsContainKeyOfSheet(String sheetName, Map<String, Object> option, String key) {
        return option.containsKey(sheetName) && (option.get(sheetName) != null) &&
                ((ScriptObjectMirror) option.get(sheetName)).containsKey(key) &&
                (((ScriptObjectMirror) option.get(sheetName)).get(key) != null) &&
                ((ScriptObjectMirror) ((ScriptObjectMirror) option.get(sheetName)).get(key)).size() > 0;
    }

    // 检查数据是否正确 - 复用的likeArray
    @Deprecated
    private boolean isCorrectJSObject(Object obj) {
        if(obj == null || obj instanceof Undefined || !(obj instanceof ScriptObjectMirror)) return false;
        return ((ScriptObjectMirror) obj).hasMember("length") ? true : false;
    }

    // 比较函数
    private int compareLeftRight(int left, int right){
        return left > right ? 1 : (left < right ? -1 : 0);
    }

    // 向Map中存入 区域Area 对应的配置属性
    private <T> void addAreaData2Map(Map<Area, T> map, ScriptObjectMirror cellpos, T data){
        map.put(new Area(
                new Area.CellPosition(getValue4Map(cellpos, "fromCol", Area.DEFAULT_FROM_SIZE), getValue4Map(cellpos, "fromRow", Area.DEFAULT_FROM_SIZE)),
                new Area.CellPosition(getValue4Map(cellpos,"toCol", Area.DEFAULT_TO_COL_SIZE), getValue4Map(cellpos,"toRow", Area.DEFAULT_TO_ROW_SIZE))), data );
    }

    // 从Map中获取 区域Area 对应的属性值
    private <T> T getDataFromArea(TreeMap<Area, T> map, Area area, T deafults){
        Iterator<Map.Entry<Area, T>> iterator = map.entrySet().iterator();
        while(iterator.hasNext()){
            Map.Entry<Area, T> value = iterator.next();
            if(area.getStart().getRow() >= value.getKey().getStart().getRow() && area.getEnd().getRow() <= value.getKey().getEnd().getRow() &&
                    area.getStart().getColumn() >= value.getKey().getStart().getColumn() && area.getEnd().getColumn() <= value.getKey().getEnd().getColumn())
                return value.getValue();
        }
        return deafults;
    }

    // 解析配置参数
    private <T> T getValue4Map(Map<String, Object> option, String key, T defaults){
        String value = option.get(key) == null ? "" : option.get(key).toString();
        return value.length() == 0 ? defaults : (defaults instanceof java.lang.Integer ? (T) new Integer(value) :(T)value);
    }

    // 解析style 属性
    private Map<Area.CellPosition, CellFormat.StyleFormat> parseCellStyleToMap(Map<String, Object> option, String sheetName) {
        Map<Area.CellPosition, CellFormat.StyleFormat> cellStylesMap = null;
        if (isOpsContainKeyOfSheet(sheetName, option, "styles")) {
            cellStylesMap = new HashMap<Area.CellPosition, CellFormat.StyleFormat>();
            ScriptObjectMirror stylesMirror = (ScriptObjectMirror) ((ScriptObjectMirror) option.get(sheetName)).get("styles");
            for (int i = 0; i < stylesMirror.size(); i++) {
                ScriptObjectMirror cell = (ScriptObjectMirror) stylesMirror.get(Integer.toString(i));
                ScriptObjectMirror cellpos = (ScriptObjectMirror) cell.get("cell");
                ScriptObjectMirror style = (ScriptObjectMirror) cell.get("style");
                cellStylesMap.put(new Area.CellPosition(getValue4Map(cellpos, "col", 0), getValue4Map(cellpos, "row", 0)),
                        new CellFormat.StyleFormat(getValue4Map(style, "background-color", CellFormat.DEFAULT_BACKGROUND_COLOR),
                                getValue4Map(style, "text-align", CellFormat.DEFAULT_ALIGNMENT),
                                new CellFormat.FontFormat(getValue4Map(style, "font-family", CellFormat.DEFAULT_FONT_FAMALIY),
                                        getValue4Map(style, "font-size", CellFormat.DEFAULT_POINT_SIZE),
                                        getValue4Map(style, "font-color", 0), getValue4Map(style, "font-weight", 0))));
            }
        }
        return cellStylesMap;
    }

    // 解析 format 属性
    private TreeMap<Area, CellFormat.FormatDetail> parseFormatToMap(Map<String, Object> option, String sheetName){
        TreeMap<Area, CellFormat.FormatDetail> map = new TreeMap<Area, CellFormat.FormatDetail>(new Comparator<Area>() {
            @Override
            public int compare(Area o1, Area o2) {
                return compareLeftRight(o1.getStart().getRow(), o2.getStart().getRow()) == 0 ?
                        compareLeftRight(o1.getStart().getColumn(), o2.getStart().getColumn()) :
                        compareLeftRight(o1.getStart().getRow(), o2.getStart().getRow());
            }
        });
        if (isOpsContainKeyOfSheet(sheetName, option, "format")){
            ScriptObjectMirror formatMirror = (ScriptObjectMirror) ((ScriptObjectMirror) option.get(sheetName)).get("format");
            for (int i = 0; i < formatMirror.size(); i++) {
                ScriptObjectMirror oneCellFormat = (ScriptObjectMirror) formatMirror.get(Integer.toString(i));
                addAreaData2Map(map, (ScriptObjectMirror) oneCellFormat.get("cell"), new CellFormat.FormatDetail(getValue4Map(oneCellFormat, "type",
                        CellFormat.FormatDetail.STRING_FORMAT), getValue4Map(oneCellFormat, "detail", CellFormat.FormatDetail.DEFAULT_NUMBER_DETAIL)));
            }
        }
        return map;
    }

    // 解析 validation 属性
    private Map<Area, String[]> parseDefaultVaueListToMap(Map<String, Object> option, String sheetName){
        Map<Area, String[]> map = new HashMap<Area, String[]>();
        if (isOpsContainKeyOfSheet(sheetName, option, "validation")){
            ScriptObjectMirror validationMirror = (ScriptObjectMirror) ((ScriptObjectMirror) option.get(sheetName)).get("validation");
            for (int i = 0; i < validationMirror.size(); i++) {
                ScriptObjectMirror oneCellFormat = (ScriptObjectMirror) validationMirror.get(Integer.toString(i));
                ScriptObjectMirror list =(ScriptObjectMirror) oneCellFormat.get("list");
                String[] validationList = new String[list.size()];
                for(int valueIndex = 0; valueIndex < list.size(); valueIndex ++) {
                    validationList[valueIndex] = list.get(Integer.toString(valueIndex)).toString();
                }
                addAreaData2Map(map, (ScriptObjectMirror) oneCellFormat.get("cell"), validationList);
            }
        }
        return map;
    }

    // 根据名称读取XML内容,返回json字符串
    public String readExcel(String fullPathName)throws Exception{
        InputStream fis = null;
        Map<String, List<List<String>>> excelContent = new HashMap();
        try {
            fis = new FileInputStream(fullPathName);
            Workbook book = getBook(fis);
            for (int sheetIndex = 0; sheetIndex < book.getNumberOfSheets(); sheetIndex++) {
                List<List<String>> content = new ArrayList();
                Sheet sheet = book.getSheetAt(sheetIndex);
                for (int rowIndex = 0; rowIndex < sheet.getPhysicalNumberOfRows(); rowIndex++) {
                    List<String> rowLst = new ArrayList<String>();
                    Row row = sheet.getRow(rowIndex);
                    for (int colIndex = 0; colIndex < row.getPhysicalNumberOfCells(); colIndex++) {
                        Cell cell = row.getCell(colIndex);
                        rowLst.add( cell == null ? "" : CellFormat.convertCell2StringValue(cell));
                    }
                    content.add(rowLst);
                }
                excelContent.put(sheet.getSheetName(), content);
            }
        } finally {
            try {
                if(fis != null) fis.close();
            } catch (Exception e) {
            }
        }
        return RdkUtil.toJsonString(excelContent);
    }

    // 根据参数写Excel
    public boolean writeExcel(String fullPathName, ScriptObjectMirror content, ScriptObjectMirror excludeIndexes, Map<String, Object> option) throws Exception{
        Workbook book = null;
        InputStream input = null;
        OutputStream out = null;
        try {
            int toWritesheetNums = content.size();
            boolean append = (boolean) option.get("append");
            Object[] toWritesheetNames = content.keySet().toArray();
            if (append) {
                input = new FileInputStream(fullPathName);
                book = getBook(input);
            } else
                book = getBook();

            for (int sheetIndex = 0; sheetIndex < toWritesheetNums; sheetIndex++) {
                String sheetname = toWritesheetNames[sheetIndex].toString();
                Sheet sheet = book.getSheet(sheetname) == null ? book.createSheet(sheetname) : book.getSheet(sheetname);
                ScriptObjectMirror oneSheetData = (ScriptObjectMirror) content.get(sheetname);
                ScriptObjectMirror excludeConfig = (ScriptObjectMirror) excludeIndexes.get(sheetname);
                Collection excludeValue = excludeConfig == null ? new ArrayList() : excludeConfig.values();

                Map<Area.CellPosition, CellFormat.StyleFormat> styleMap = parseCellStyleToMap(option, sheetname);
                TreeMap<Area, CellFormat.FormatDetail> formatMap = parseFormatToMap(option, sheetname);
                renderValidation4Sheet(parseDefaultVaueListToMap(option, sheetname), sheet);
                int currentRow = sheet.getPhysicalNumberOfRows();
                for (int rowIndex = 0; rowIndex < getValue4Map(oneSheetData, "length", 0); rowIndex++) {
                    Row row = sheet.createRow(currentRow + rowIndex);
                    ScriptObjectMirror oneRowData = (ScriptObjectMirror) oneSheetData.getMember(Integer.toString(rowIndex));
                    for (int colIndex = 0; colIndex < getValue4Map(oneRowData, "length", 0); colIndex++) {
                        if (!excludeValue.contains(colIndex)) {
                            Cell cell = row.createCell(colIndex);
                            Area.CellPosition pos = new Area.CellPosition(colIndex, rowIndex);
                            CellStyle cellStyle = book.createCellStyle();
                            Font font = book.createFont();
                            fillShowStyle4Cell(styleMap, pos, cellStyle, font);

                            Object cellObj = oneRowData.getMember(String.valueOf(colIndex));
                            String value = cellObj == null ? "" : cellObj.toString();
                            Area currentArea = new Area(pos, pos);
                            CellFormat.FormatDetail format = getDataFromArea(formatMap, currentArea, new CellFormat.FormatDetail(CellFormat.FormatDetail.STRING_FORMAT, null));
                            if (format.getType() == CellFormat.FormatDetail.NUMBERIC_FORMAT && value.matches("[0-9]+(\\.[0-9]+)*")) {
                                cell.setCellValue(Double.parseDouble(value));
                                cellStyle.setDataFormat(getDataFormat(book, format.getDetail()));
                            } else
                                cell.setCellValue(value);
                            cell.setCellStyle(cellStyle);
                        }
                    }
                }
                mergeRanges4Cell(sheet, option);
            }
            out = new FileOutputStream(fullPathName);
            book.write(out);
        }finally {
            try {
                if(book != null) book.close();
            } catch (Exception e) {
            }
            try {
                if(out != null) out.close();
            } catch (Exception e) {
            }
            try {
                if(input != null) input.close();
            } catch (Exception e) {
            }
        }
        return true;
    }

    //全文有效值设定
    private void renderValidation4Sheet(Map<Area, String[]> validationMap, Sheet sheet){
        Iterator<Map.Entry<Area, String[]>> it = validationMap.entrySet().iterator();
        while(it.hasNext()){
            Map.Entry<Area, String[]> entry = it.next();
            Area key = entry.getKey();
            String[] value = entry.getValue();
            sheet.addValidationData(getValidation4Range(sheet, new CellRangeAddressList(key.getStart().getRow(),
                    key.getEnd().getRow(), key.getStart().getColumn(), key.getEnd().getColumn()),value));
        }
    }

    // 填充显示样式
    private void fillShowStyle4Cell( Map<Area.CellPosition, CellFormat.StyleFormat> cellStylesMap, Area.CellPosition pos, CellStyle cellstyle, Font font){
        if (cellStylesMap != null && cellStylesMap.containsKey(pos)) {
            CellFormat.StyleFormat styleFormat = cellStylesMap.get(pos);
            font.setFontHeightInPoints((short) styleFormat.getFontFormat().getFontSize());
            font.setColor((short) styleFormat.getFontFormat().getFontColor());
            font.setBold(styleFormat.getFontFormat().getFontWeight() != 0);
            font.setFontName(styleFormat.getFontFormat().getFontFamily());

            cellstyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            cellstyle.setFillForegroundColor((short) styleFormat.getBackgroundColor());
            cellstyle.setAlignment(CellFormat.ALIGN.get(styleFormat.getTextAlign()));
            cellstyle.setFont(font);
        }
    }

    // 合并单元格
    private void mergeRanges4Cell(Sheet sheet, Map<String, Object> option) {
        if (isOpsContainKeyOfSheet(sheet.getSheetName(), option, "cellSpan")) {
            ScriptObjectMirror spanMirror = ((ScriptObjectMirror) ((ScriptObjectMirror) option.get(sheet.getSheetName())).get("cellSpan"));
            for (int i = 0; i < spanMirror.size(); i++) {
                ScriptObjectMirror span = (ScriptObjectMirror) spanMirror.get(Integer.toString(i));
                sheet.addMergedRegion(new CellRangeAddress(getValue4Map(span, "fromRow", 0), getValue4Map(span, "toRow", 0),
                        getValue4Map(span, "fromCol", 0), getValue4Map(span, "toCol", 0)));
            }
        }
    }

}
