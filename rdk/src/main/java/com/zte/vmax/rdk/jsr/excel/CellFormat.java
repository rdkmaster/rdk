package com.zte.vmax.rdk.jsr.excel;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;
/**
 * Created by 10033559 on 2017/7/26.
 */

public class CellFormat {

    private StyleFormat style;
    private FormatDetail detail;

    public static final int DEFAULT_POINT_SIZE = 10;
    public static final int DEFAULT_BACKGROUND_COLOR = IndexedColors.WHITE.getIndex();

    public static final String LEFT_ALIGNMENT = "left";
    public static final String CENTER_ALIGNMENT = "centre"; // 原来接口笔误, 继续保留
    public static final String RIGHT_ALIGNMENT = "left";

    public static final String DEFAULT_FONT_FAMALIY = "Arial";

    public static final String DEFAULT_ALIGNMENT = LEFT_ALIGNMENT;
    public static final Map<String, HorizontalAlignment> ALIGN = new HashMap<String, HorizontalAlignment>();
    static {
        ALIGN.put(LEFT_ALIGNMENT, HorizontalAlignment.LEFT);
        ALIGN.put(CENTER_ALIGNMENT, HorizontalAlignment.CENTER);
        ALIGN.put(RIGHT_ALIGNMENT, HorizontalAlignment.RIGHT);
    }

    public static String convertCell2StringValue(Cell cell){
        switch(cell.getCellTypeEnum()) {
            case NUMERIC: return HSSFDateUtil.isCellDateFormatted(cell) ?
                    new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(cell.getDateCellValue()).toString() :
                    String.valueOf(cell.getNumericCellValue());
            case STRING:  return cell.getStringCellValue();
            case BOOLEAN: return String.valueOf(cell.getBooleanCellValue());
            case FORMULA: return String.valueOf(cell.getCellFormula());
            case BLANK: return "";
            case ERROR: return "error";
            default: return "undefined";
        }
    }

    public CellFormat(){}

    public CellFormat(StyleFormat style, FormatDetail detail){
        this.style = style;
        this.detail = detail;
    }

    @Override
    public boolean equals(Object obj){
        CellFormat that = (CellFormat) obj;
        return that != null && Util.isEquals(this.style, that.style)  &&  Util.isEquals(this.detail, that.detail);
    }

    @Override
    public int hashCode(){
        return Util.hash(style) + Util.hash(detail);
    }

    public static class FontFormat{
        private String fontFamily;
        private int fontSize;
        private int fontColor;
        private int fontWeight;
        public FontFormat( String fontFamily, int fontSize, int fontColor, int fontWeight ){
            this.fontFamily = fontFamily;
            this.fontSize = fontSize;
            this.fontColor = fontColor;
            this.fontWeight = fontWeight;
        }

        public String getFontFamily() {
            return fontFamily;
        }

        public int getFontSize() {
            return fontSize;
        }

        public int getFontColor() {
            return fontColor;
        }

        public int getFontWeight() {
            return fontWeight;
        }

        @Override
        public boolean equals(Object obj){
            FontFormat that = (FontFormat) obj;
            return that != null && Util.isEquals(this.fontFamily, that.fontFamily) && this.fontSize == that.fontSize &&
                    this.fontColor == that.fontColor && this.fontWeight == that.fontWeight;
        }

        @Override
        public int hashCode(){
            return Util.hash(fontFamily) + fontSize + fontColor + fontWeight;
        }
    }

    public static class StyleFormat {
        private int backgroundColor;
        private String textAlign;
        private FontFormat fontFormat;

        public StyleFormat(int backgroundColor, String textAlign, FontFormat fontFormat) {
            this.backgroundColor = backgroundColor;
            this.textAlign = textAlign;
            this.fontFormat = fontFormat;
        }

        public int getBackgroundColor() {
            return backgroundColor;
        }

        public String getTextAlign() {
            return textAlign;
        }

        public FontFormat getFontFormat() {
            return fontFormat;
        }

        @Override
        public boolean equals(Object obj){
            StyleFormat that = (StyleFormat) obj;
            return that != null && this.backgroundColor == that.backgroundColor &&
                    Util.isEquals(this.textAlign, that.textAlign) && Util.isEquals(this.fontFormat, that.fontFormat);
        }

        @Override
        public int hashCode(){
            return backgroundColor + Util.hash(textAlign) + Util.hash(fontFormat);
        }
    }

    public static class FormatDetail{
        public static final String DEFAULT_NUMBER_DETAIL = "0.0000000000";
        public static final String DEFAULT_STRING_DETAIL = "";
        public static final String STRING_FORMAT = "string";
        public static final String NUMBERIC_FORMAT = "number";

        private String type;
        private String detail;
        public FormatDetail(String type, String detail){
            this.type = type;
            this.detail = detail;
        }

        public String getType() { return type; }
        public String getDetail() {
            return detail == null || detail.length() == 0 ?( NUMBERIC_FORMAT.equals(type) ? DEFAULT_NUMBER_DETAIL : null) : detail;
        }

        @Override
        public boolean equals(Object obj){
            FormatDetail that = (FormatDetail) obj;
            return that!= null && Util.isEquals(this.type, that.type) && Util.isEquals(this.detail, that.detail);
        }

        @Override
        public int hashCode(){
            return Util.hash(type) + Util.hash(detail);
        }
    }
}
