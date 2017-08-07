package com.zte.vmax.rdk.jsr.excel;

import org.apache.poi.ss.usermodel.DataValidation;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddressList;
import org.apache.poi.xssf.usermodel.*;

import java.io.InputStream;

/**
 * Created by 10033559 on 2017/7/26.
 */
public class XlsxExcelHelper extends BasicExcelHelper{
    @Override
    protected Workbook getBook() throws Exception {
        return new XSSFWorkbook();
    }

    @Override
    protected Workbook getBook(InputStream fis) throws Exception {
        return new XSSFWorkbook(fis);
    }

    @Override
    protected DataValidation getValidation4Range(Sheet sheet, CellRangeAddressList ranges, String[] validationList) {
        XSSFDataValidationHelper dvHelper = new XSSFDataValidationHelper((XSSFSheet)sheet);
        XSSFDataValidationConstraint dvConstraint = (XSSFDataValidationConstraint) dvHelper.createExplicitListConstraint(validationList);
        return dvHelper.createValidation(dvConstraint, ranges);
    }

    @Override
    protected DataValidation getValidation4Formula(Sheet sheet, CellRangeAddressList ranges, String strFormula) {
        XSSFDataValidationHelper dvHelper = new XSSFDataValidationHelper((XSSFSheet)sheet);
        XSSFDataValidationConstraint dvConstraint = (XSSFDataValidationConstraint) dvHelper.createFormulaListConstraint(strFormula);
        return dvHelper.createValidation(dvConstraint, ranges);
    }

    @Override
    protected short getDataFormat(Workbook book, String formatDetail){
        XSSFDataFormat fmt = (XSSFDataFormat)book.createDataFormat();
        return fmt.getFormat(formatDetail);
    }
}
