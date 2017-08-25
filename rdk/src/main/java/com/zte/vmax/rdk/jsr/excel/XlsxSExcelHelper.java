package com.zte.vmax.rdk.jsr.excel;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddressList;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFDataValidationConstraint;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import java.io.InputStream;

/**
 * Created by 10033559 on 2017/7/26.
 */
public class XlsxSExcelHelper extends BasicExcelHelper{

    private static final int DEFAULT_LINE_SIZE = 5000;

    @Override
    protected Workbook getBook() throws Exception {
        return new SXSSFWorkbook(DEFAULT_LINE_SIZE);
    }

    @Override
    protected Workbook getBook(InputStream fis) throws Exception {
        return new SXSSFWorkbook(new XSSFWorkbook(fis), DEFAULT_LINE_SIZE);
    }

    @Override
    protected DataValidation getValidation4Range(Sheet sheet, CellRangeAddressList ranges, String[] validationList) {
        DataValidationHelper dvHelper = ((SXSSFSheet)sheet).getDataValidationHelper();
        XSSFDataValidationConstraint dvConstraint = (XSSFDataValidationConstraint) dvHelper.createExplicitListConstraint(validationList);
        return dvHelper.createValidation(dvConstraint, ranges);
    }

    @Override
    protected DataValidation getValidation4Formula(Sheet sheet, CellRangeAddressList ranges, String strFormula) {
        DataValidationHelper dvHelper = ((SXSSFSheet)sheet).getDataValidationHelper();
        XSSFDataValidationConstraint dvConstraint = (XSSFDataValidationConstraint) dvHelper.createFormulaListConstraint(strFormula);
        return dvHelper.createValidation(dvConstraint, ranges);
    }

    @Override
    protected short getDataFormat(Workbook book, String formatDetail){
        DataFormat fmt = ((SXSSFWorkbook)book).createDataFormat();
        return fmt.getFormat(formatDetail);
    }
}
