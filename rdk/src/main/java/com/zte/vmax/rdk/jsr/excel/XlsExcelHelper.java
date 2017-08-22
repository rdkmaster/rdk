package com.zte.vmax.rdk.jsr.excel;

import org.apache.poi.hssf.usermodel.DVConstraint;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.hssf.usermodel.HSSFDataValidation;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddressList;

import java.io.InputStream;

/**
 * Created by 10033559 on 2017/7/26.
 */
public class XlsExcelHelper extends  BasicExcelHelper{

    @Override
    protected Workbook getBook() throws Exception{
        return new HSSFWorkbook();
    }

    @Override
    protected Workbook getBook(InputStream fis) throws Exception{
        return new HSSFWorkbook(fis);
    }

    @Override
    protected DataValidation getValidation4Range(Sheet sheet, CellRangeAddressList ranges, String[] validationList) {
        DVConstraint dvConstraint = DVConstraint.createExplicitListConstraint(validationList);
        return new HSSFDataValidation(ranges, dvConstraint);
    }

    @Override
    protected DataValidation getValidation4Formula(Sheet sheet, CellRangeAddressList ranges, String strFormula) {
        DVConstraint dvConstraint = DVConstraint.createFormulaListConstraint(strFormula);
        return new HSSFDataValidation(ranges, dvConstraint);
    }

    @Override
    protected short getDataFormat(Workbook book, String formatDetail){
        return HSSFDataFormat.getBuiltinFormat(formatDetail);
    }
}
