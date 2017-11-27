package com.zte.vmax.rdk.jsr.excel;

/**
 * Created by 10033559 on 2017/7/26.
 */
@edu.umd.cs.findbugs.annotations.SuppressWarnings(
        value = ("BC_EQUALS_METHOD_SHOULD_WORK_FOR_ALL_OBJECTS"),
        justification = "false alarm")
public class Area {

    public static class CellPosition {
        private int column;
        private int row;

        public CellPosition(int column, int row) {
            this.column = column;
            this.row = row;
        }

        public int getColumn() {
            return column;
        }

        public int getRow() {
            return row;
        }

        public boolean equals(Object obj) {
            CellPosition that = (CellPosition)obj;
            return that != null && this.column == that.column && this.row == that.row;

        }

        public int hashCode() {
            return ("col" + column + "row" + row).hashCode();
        }
    }

    private CellPosition start;
    private CellPosition end;

    public static final int MAX_ROW_SIZE = 1048575;
    public static final int MAX_COL_SIZE = 16383;
    public static final int DEFAULT_FROM_SIZE = 0;
    public static final int DEFAULT_TO_ROW_SIZE = MAX_ROW_SIZE;
    public static final int DEFAULT_TO_COL_SIZE =  MAX_COL_SIZE;

    public Area(CellPosition start, CellPosition end){
        this.start = start;
        this.end = end;
    }

    public CellPosition getStart() {
        return start;
    }

    public CellPosition getEnd() { return end; }
    public boolean equals(Object obj) {
        Area that = (Area) obj;
        return that != null && Util.isEquals(this.start, that.start) && Util.isEquals(this.end, that.end);

    }

    public int hashCode() {
        return Util.hash(start) + Util.hash(end);
    }
}
