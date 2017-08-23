package com.zte.vmax.rdk.jsr.excel;

import com.zte.vmax.rdk.util.RdkUtil;
import jdk.nashorn.api.scripting.ScriptObjectMirror;
import jdk.nashorn.internal.runtime.Undefined;
import org.apache.commons.collections4.map.HashedMap;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.CellRangeAddressList;

import java.io.*;
import java.util.*;

/**
 * Created by 10033559 on 2017/7/26.
 */
public abstract class BasicExcelHelper implements ExcelHelper{

    protected abstract Workbook getBook(InputStream fis) throws Exception;
    protected abstract Workbook getBook() throws Exception;
    protected abstract DataValidation getValidation4Range(Sheet sheet, CellRangeAddressList ranges, String[] validationList);
    protected abstract DataValidation getValidation4Formula(Sheet sheet, CellRangeAddressList ranges, String strFormula);
    protected abstract short getDataFormat(Workbook book, String formatDetail);

    private Map<CellFormat, CellStyle> cellStypeMap = new HashedMap<CellFormat, CellStyle>();
    private static final int MAX_CELLNUM = 4000;
    public static final byte[] XLS_MAGIC = new byte[]{(byte)0xD0,(byte)0xCF,(byte)0x11,(byte)0xE0};
    public static final byte[] XLSX_MAGIC = new byte[]{(byte)0x50,(byte)0x4B,(byte)0x03,(byte)0x04};

    private static ExcelHelper getHelper4FullName(String fullName, boolean useStreaming){
        return fullName.matches("^.*\\.xlsx$") ? (useStreaming ? new XlsxSExcelHelper() : new XlsxExcelHelper()) : new XlsExcelHelper();
    }

    private static ExcelHelper getHelper4FileMagic(String fullName, boolean useStreaming){
        InputStream input = null;
        try{
            input = new FileInputStream(fullName);
            byte[] magic = new byte[4];
            input.read(magic);
            return Arrays.equals(magic, XLSX_MAGIC) ? (useStreaming ? new XlsxSExcelHelper() : new XlsxExcelHelper()) : new XlsExcelHelper();
        }catch(Exception e){
            return getHelper4FullName(fullName, useStreaming);
        }finally {
            try{
                if(input != null) input.close();
            }catch(Exception e){
            }
        }
    }

    public static ExcelHelper getRealHelper(String fullName, boolean useStreaming){
        File f = new File(fullName);
        return f.exists() && f.length() > 0 ? getHelper4FileMagic(fullName, useStreaming) : getHelper4FullName(fullName, useStreaming);
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
        return !(obj == null || obj instanceof Undefined || !(obj instanceof ScriptObjectMirror)) && ((ScriptObjectMirror) obj).hasMember("length");
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
    private <T> T getDataFromArea(TreeMap<Area, T> map, Area area, T defaults){
        for (Map.Entry<Area, T> value : map.entrySet()) {
            if (area.getStart().getRow() >= value.getKey().getStart().getRow() && area.getEnd().getRow() <= value.getKey().getEnd().getRow() &&
                    area.getStart().getColumn() >= value.getKey().getStart().getColumn() && area.getEnd().getColumn() <= value.getKey().getEnd().getColumn())
                return value.getValue();
        }
        return defaults;
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
                        CellFormat.FormatDetail.STRING_FORMAT), getValue4Map(oneCellFormat, "detail", CellFormat.FormatDetail.DEFAULT_STRING_DETAIL)));
            }
        }
        return map;
    }

    // 解析 validation 属性
    private Map<Area, Object> parseDefaultVaueListToMap(Map<String, Object> option, String sheetName){
        Map<Area, Object> map = new HashMap<Area, Object>();
        if (isOpsContainKeyOfSheet(sheetName, option, "validation")){
            ScriptObjectMirror validationMirror = (ScriptObjectMirror) ((ScriptObjectMirror) option.get(sheetName)).get("validation");
            for (int i = 0; i < validationMirror.size(); i++) {
                ScriptObjectMirror oneCellFormat = (ScriptObjectMirror) validationMirror.get(Integer.toString(i));
                ScriptObjectMirror list =(ScriptObjectMirror) oneCellFormat.get("list");
                Object formula = oneCellFormat.get("formula");
                if(list != null && list.size() > 0){
                    String[] validationList = new String[list.size()];
                    for(int valueIndex = 0; valueIndex < list.size(); valueIndex ++)
                        validationList[valueIndex] = list.get(Integer.toString(valueIndex)).toString();
                    addAreaData2Map(map, (ScriptObjectMirror) oneCellFormat.get("cell"), validationList);
                }else {
                    if(formula != null) addAreaData2Map(map, (ScriptObjectMirror) oneCellFormat.get("cell"), formula.toString());
                }
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
            int toWriteSheetNums = content.size();
            boolean append = (boolean) option.get("append");
            Object[] toWriteSheetNames = content.keySet().toArray();
            if (append) {
                input = new FileInputStream(fullPathName);
                book = getBook(input);
            } else
                book = getBook();

            for (int sheetIndex = 0; sheetIndex < toWriteSheetNums; sheetIndex++) {
                String sheetName = toWriteSheetNames[sheetIndex].toString();
                Sheet sheet = book.getSheet(sheetName) == null ? book.createSheet(sheetName) : book.getSheet(sheetName);
                ScriptObjectMirror oneSheetData = (ScriptObjectMirror) content.get(sheetName);
                ScriptObjectMirror excludeConfig = (ScriptObjectMirror) excludeIndexes.get(sheetName);
                Collection excludeValue = excludeConfig == null ? new ArrayList() : excludeConfig.values();

                Map<Area.CellPosition, CellFormat.StyleFormat> styleMap = parseCellStyleToMap(option, sheetName);
                TreeMap<Area, CellFormat.FormatDetail> formatMap = parseFormatToMap(option, sheetName);
                renderValidation4Sheet(parseDefaultVaueListToMap(option, sheetName), sheet);
                int currentRow = sheet.getPhysicalNumberOfRows();
                int rowLength = getValue4Map(oneSheetData, "length", 0);
                for (int rowIndex = 0; rowIndex < rowLength; rowIndex++) {
                    Row row = sheet.createRow(currentRow + rowIndex);
                    ScriptObjectMirror oneRowData = (ScriptObjectMirror) oneSheetData.getMember(Integer.toString(rowIndex));
                    int colLength = getValue4Map(oneRowData, "length", 0);
                    for (int colIndex = 0; colIndex < colLength; colIndex++) {
                        if (!excludeValue.contains(colIndex)) {
                            Cell cell = row.createCell(colIndex);
                            Area.CellPosition pos = new Area.CellPosition(colIndex, rowIndex);
                            Object cellObj = oneRowData.getMember(String.valueOf(colIndex));
                            cell.setCellValue(cellObj == null ? "" : cellObj.toString());

                            if(( styleMap != null && styleMap.size() > 0 ) || ( formatMap != null && formatMap.size() > 0 ) ) {
                                CellFormat.FormatDetail detailDefault = new CellFormat.FormatDetail(CellFormat.FormatDetail.STRING_FORMAT, null);
                                CellFormat.FormatDetail detail = getDataFromArea(formatMap, new Area(pos, pos), detailDefault);
                                fillStyle4Cell(cell, styleMap ==  null ? null : styleMap.get(pos), detail, book);
                            }
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
    private void renderValidation4Sheet(Map<Area, Object> validationMap, Sheet sheet){
        for (Map.Entry<Area, Object> entry : validationMap.entrySet()) {
            Area key = entry.getKey();
            Object value = entry.getValue();
            CellRangeAddressList range = new CellRangeAddressList(key.getStart().getRow(),
                    key.getEnd().getRow(), key.getStart().getColumn(), key.getEnd().getColumn());
            if (value instanceof String[]) {
                String[] list = (String[]) value;
                DataValidation validation = getValidation4Range(sheet, range, list);
                validation.setShowErrorBox(true);
                sheet.addValidationData(validation);
            } else if (value instanceof String) {
                String formula = (String) value;
                DataValidation validation = getValidation4Formula(sheet, range, formula);
                validation.setShowErrorBox(true);
                sheet.addValidationData(validation);
            }
        }
    }

    // 填充样式
    private void fillStyle4Cell(Cell cell, CellFormat.StyleFormat styleFormat, CellFormat.FormatDetail detail, Workbook book){
        CellFormat format = new CellFormat(styleFormat, detail);
        CellStyle cellStyle = cellStypeMap.get(format);
        if(cellStyle == null) {
            if (cellStypeMap.size() >= MAX_CELLNUM) return;

            cellStyle = book.createCellStyle();

            if(styleFormat != null) {
                Font font = book.createFont();
                font.setFontHeightInPoints((short) styleFormat.getFontFormat().getFontSize());
                font.setColor((short) styleFormat.getFontFormat().getFontColor());
                font.setBold(styleFormat.getFontFormat().getFontWeight() != 0);
                font.setFontName(styleFormat.getFontFormat().getFontFamily());

                cellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
                cellStyle.setFillForegroundColor((short) styleFormat.getBackgroundColor());
                cellStyle.setAlignment(CellFormat.ALIGN.get(styleFormat.getTextAlign()));
                cellStyle.setFont(font);
            }

            if(detail != null && detail.getDetail() != null){
                cellStyle.setDataFormat(getDataFormat(book, detail.getDetail()));
            }
            cellStypeMap.put(format, cellStyle);
        }
        // 数字类型要生效, 必须要转换设置cell 的值为 数字型的，否则即使设置了格式,也无效
        if(detail != null && detail.getType().equals(CellFormat.FormatDetail.NUMBERIC_FORMAT) &&
                cell.getStringCellValue().matches("[0-9]+(\\.[0-9]+)?")){
            cell.setCellValue(Double.parseDouble(cell.getStringCellValue()));
        }
        cell.setCellStyle(cellStyle);
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
