package com.zte.vmax.rdk.db;

import java.io.StringReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import net.sf.jsqlparser.JSQLParserException;
import net.sf.jsqlparser.expression.BinaryExpression;
import net.sf.jsqlparser.expression.CaseExpression;
import net.sf.jsqlparser.expression.Expression;
import net.sf.jsqlparser.expression.Function;
import net.sf.jsqlparser.expression.Parenthesis;
import net.sf.jsqlparser.expression.WhenClause;
import net.sf.jsqlparser.expression.operators.relational.Between;
import net.sf.jsqlparser.expression.operators.relational.InExpression;
import net.sf.jsqlparser.expression.operators.relational.IsNullExpression;
import net.sf.jsqlparser.parser.CCJSqlParserManager;
import net.sf.jsqlparser.schema.Column;
import net.sf.jsqlparser.schema.Table;
import net.sf.jsqlparser.statement.select.AllColumns;
import net.sf.jsqlparser.statement.select.Join;
import net.sf.jsqlparser.statement.select.Limit;
import net.sf.jsqlparser.statement.select.OrderByElement;
import net.sf.jsqlparser.statement.select.PlainSelect;
import net.sf.jsqlparser.statement.select.Select;
import net.sf.jsqlparser.statement.select.SelectBody;
import net.sf.jsqlparser.statement.select.SelectExpressionItem;
import net.sf.jsqlparser.statement.select.SubSelect;
import net.sf.jsqlparser.statement.select.Union;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class GbaseOptimizer {
	public static String optimizeSql(String sql) throws Exception {
		CCJSqlParserManager parserManager = new CCJSqlParserManager();
		SelectBody selectBody = ((Select) parserManager.parse(new StringReader(
				sql))).getSelectBody();
		return (getGbaseSelect(selectBody)).toString();
	}

	public static SelectBody getGbaseSelect(SelectBody selectBody)
			throws Exception {
		// SELECT
		if (selectBody instanceof PlainSelect) {
			loopTransformSelect((PlainSelect) selectBody);
		}
		// UNION
		if (selectBody instanceof Union) {
			transformUnion((Union) selectBody);
		}
		return selectBody;
	}

	// UNION
	public static void transformUnion(Union union) throws Exception {
		if (union.getPlainSelects().size() != 0) {
			for (int i = 0; i < union.getPlainSelects().size(); i++) {
				loopTransformSelect((PlainSelect) union.getPlainSelects()
						.get(i));
			}
		}
	}

	private static void loopTransformSelect(PlainSelect select)
			throws Exception {
		// if (select.getTop() != null) {
		// transformTop(select);
		// }
		if (select.getSelectItems() != null) {
			transformSelect(select);
		}
		if (select.getFromItem() != null) {
			transformFrom(select);
		}
		if (select.getWhere() != null) {
			transformWhere(select);
		}
		if (select.getGroupByColumnReferences() != null) {
			transformGroupBy(select);
		}
		if (select.getHaving() != null) {
			transformHaving(select);
		}
		if (select.getOrderByElements() != null) {
			transformOrderBy(select);
		}

	}

	// top
	public static void transformTop(PlainSelect select) {
		Limit limit = new Limit();
		limit.setRowCount(select.getTop().getRowCount());
		select.setLimit(limit);
		select.setTop(null);
	}

	// select
	public static void transformSelect(PlainSelect select) throws Exception {
		if (select.getSelectItems().size() != 0) {
			for (int i = 0; i < select.getSelectItems().size(); i++) {
				Object selectItem = select.getSelectItems().get(i);
				if (selectItem instanceof AllColumns) {
					break;
				}
				transformExpression(
						((SelectExpressionItem) selectItem).getExpression(),
						select, "select");
				// 字段别名
				if (((SelectExpressionItem) selectItem).getAlias() != null) {
					if (!aliasConflictValiate(select,
							((SelectExpressionItem) selectItem).getAlias()
									.toString())) {
						throw new Exception(
								"Alias "
										+ ((SelectExpressionItem) selectItem)
												.getAlias().toString()
										+ " is conflicted whith other alias,please check it.");
					}
					if (!aliasColumnConflictValiate(select,
							((SelectExpressionItem) selectItem).getAlias()
									.toString())) {
						throw new Exception(
								"Alias "
										+ ((SelectExpressionItem) selectItem)
												.getAlias().toString()
										+ " is conflicted with column name,please check it.");
					}
					select.getAliasMap()
							.put(((SelectExpressionItem) selectItem).getAlias(),
									((SelectExpressionItem) selectItem)
											.getExpression());
				}
			}
		}
	}

	// Expression
	private static Object transformExpression(Object express,
			PlainSelect select, String context) throws Exception {
		if (express instanceof BinaryExpression) {// 二目运算符
			Object leftExpression = ((BinaryExpression) express)
					.getLeftExpression();
			((BinaryExpression) express)
					.setLeftExpression((Expression) transformExpression(
							leftExpression, select, context));
			Object rightExpression = ((BinaryExpression) express)
					.getRightExpression();
			((BinaryExpression) express)
					.setRightExpression((Expression) transformExpression(
							rightExpression, select, context));
		} else if (express instanceof Function) {
			express = transformFunction((Function) express, select, context);
		} else if (express instanceof Parenthesis) { // ()
			transformExpression(((Parenthesis) express).getExpression(),
					select, context);
		} else if (express instanceof InExpression) { // IN
			((InExpression) express)
					.setLeftExpression((Expression) transformExpression(
							((InExpression) express).getLeftExpression(),
							select, context));
		} else if (express instanceof Between) { // BETWEEN AND
			((Between) express)
					.setLeftExpression((Expression) transformExpression(
							((Between) express).getLeftExpression(), select,
							context));
			((Between) express)
					.setBetweenExpressionStart((Expression) transformExpression(
							((Between) express).getBetweenExpressionStart(),
							select, context));
			((Between) express)
					.setBetweenExpressionEnd((Expression) transformExpression(
							((Between) express).getBetweenExpressionEnd(),
							select, context));
		} else if (express instanceof IsNullExpression) {
			((IsNullExpression) express)
					.setLeftExpression((Expression) transformExpression(
							((IsNullExpression) express).getLeftExpression(),
							select, context));

		} else if (express instanceof CaseExpression) { // CASE
			if (((CaseExpression) express).getSwitchExpression() != null) {
				((CaseExpression) express)
						.setSwitchExpression((Expression) transformExpression(
								((CaseExpression) express)
										.getSwitchExpression(), select, context));
			}
			if (((CaseExpression) express).getWhenClauses().size() != 0) {
				for (int i = 0; i < ((CaseExpression) express).getWhenClauses()
						.size(); i++) {
					transformExpression(((CaseExpression) express)
							.getWhenClauses().get(i), select, context);
				}
			}
			// ELSE
			((CaseExpression) express)
					.setElseExpression((Expression) transformExpression(
							((CaseExpression) express).getElseExpression(),
							select, context));
		} else if (express instanceof WhenClause) {// WHEN THEN
			((WhenClause) express)
					.setWhenExpression((Expression) transformExpression(
							((WhenClause) express).getWhenExpression(), select,
							context));
			((WhenClause) express)
					.setThenExpression((Expression) transformExpression(
							((WhenClause) express).getThenExpression(), select,
							context));
		} else if (express instanceof Column) {
			if (context.equals("select") || context.equals("join")) {
				select.getColumnList().add((Column) express);
			} else if (!context.equals("select")
					&& !context.equals("join")
					&& select.getAliasMap().get(
							((Column) express).toString()) != null) {
				return select.getAliasMap().get(((Column) express).toString());
			}
		}
		return express;
	}

	// 别名冲突校验
	private static boolean aliasConflictValiate(PlainSelect select, String alias) {
		HashMap<String, Object> aliasMap = select.getAliasMap();
		Iterator iter = aliasMap.entrySet().iterator();
		while (iter.hasNext()) {
			Map.Entry entry = (Map.Entry) iter.next();
			String key = (String) entry.getKey();
			if (alias.toLowerCase().equals(key.toLowerCase())) {
				return false;
			}
		}
		return true;
	}

	// 别名和字段名冲突校验
	private static boolean aliasColumnConflictValiate(PlainSelect select,
			String alias) {
		ArrayList<Column> columnList = select.getColumnList();
		for (int i = 0; i < columnList.size(); i++) {
			if (alias.toLowerCase().equals(columnList.get(i).getColumnName().toLowerCase())) {
				return false;
			}
		}
		return true;
	}

	// Function
	@SuppressWarnings("unchecked")
	private static Object transformFunction(Function function,
			PlainSelect select, String context) throws Exception {
		String functionName = function.getName().toLowerCase();
		if (functionName.equals("expr")) {
			ArrayList<Integer> parmNumList = new ArrayList<Integer>();
			parmNumList.add(1);
			functionParmExceptionHandle(function, parmNumList);
			return transformExpression(function.getParameters()
					.getExpressions().get(0), select, context);
		} else if (functionName.equals("round")) {
			round(function, select, context);
		} else if(functionName.equals("substring")){
			ArrayList<Integer> parmNumList = new ArrayList<Integer>();
			parmNumList.add(2);
			parmNumList.add(3);
			functionParmExceptionHandle(function, parmNumList);
			function.setName(functionName.toUpperCase());
			for (int i = 0; i < function.getParameters().getExpressions().size(); i++) {
				transformExpression(
						(function.getParameters().getExpressions().get(i)), select,
						context);
			}
		}
		else if (functionName.equals("avg") || functionName.equals("max")
				|| functionName.equals("min") || functionName.equals("sum")
				|| functionName.equals("trim") || functionName.equals("upper")
				|| functionName.equals("lower")) {
			ArrayList<Integer> parmNumList = new ArrayList<Integer>();
			parmNumList.add(1);
			functionParmExceptionHandle(function, parmNumList);
			function.setName(function.getName().toUpperCase());
			transformExpression(function.getParameters().getExpressions()
					.get(0), select, context);
		} else if (functionName.equals("count")) {
			function.setName(function.getName().toUpperCase());
			if (!function.isAllColumns()) {
				ArrayList<Integer> parmNumList = new ArrayList<Integer>();
				parmNumList.add(1);
				functionParmExceptionHandle(function, parmNumList);
				transformExpression(function.getParameters().getExpressions()
						.get(0), select, context);
			}
		} else if (functionName.equals("dectostr")) {
			dectostr(function, select, context);
		} else if (functionName.equals("datetostr")) {
			datetostr(function, select, context);
		} else if (functionName.equals("dateformat")) {
			dateformat(function, select, context);
		} else if (functionName.equals("datediff")) {
			datediff(function, select, context);
		} else if (functionName.equals("row_number")) {
			ArrayList<Integer> parmNumList = new ArrayList<Integer>();
			parmNumList.add(1);
			functionParmExceptionHandle(function, parmNumList);
			function.setName("ROW_NUMBER() OVER");
			String pram = (function.getParameters().getExpressions().get(0))
					.toString();
			String pattern = "'(.*)'";
			Pattern r = Pattern.compile(pattern);
			Matcher m = r.matcher(pram);
			if (m.find()) {
				function.getParameters().getExpressions().set(0, m.group(1));
			}
		} else {
			throw new Exception(functionName.toUpperCase()
					+ "() function is not supported,please check it.");
		}
		return function;
	}

	// ROUND()
	private static void round(Function function, PlainSelect select,
			String context) throws Exception {
		ArrayList<Integer> parmNumList = new ArrayList<Integer>();
		parmNumList.add(1);
		parmNumList.add(2);
		functionParmExceptionHandle(function, parmNumList);
		function.setName("ROUND");
		for (int i = 0; i < function.getParameters().getExpressions().size(); i++) {
			transformExpression(
					(function.getParameters().getExpressions().get(i)), select,
					context);
		}
	}

	// DECTOSTR()
	@SuppressWarnings({"unchecked"})
	private static void dectostr(Function function, PlainSelect select,
			String context) throws Exception {
		ArrayList<Integer> parmNumList = new ArrayList<Integer>();
		parmNumList.add(2);
		parmNumList.add(3);
		functionParmExceptionHandle(function, parmNumList);
		function.setName("TO_CHAR");
		transformExpression(function.getParameters().getExpressions().get(0),
				select, context);
		int length = Integer.parseInt((String) function.getParameters()
				.getExpressions().get(1).toString());
		int decimal = 0;
		if (function.getParameters().getExpressions().size() == 3) {
			decimal = Integer.parseInt(function.getParameters()
					.getExpressions().get(2).toString());
			function.getParameters().getExpressions().remove(2);
		}
		StringBuffer formatStrBuf = new StringBuffer();
		for (int i = 0; i < length; i++) {
			formatStrBuf.append('9');
			if (i == length - decimal - 1 && decimal != 0) {
				formatStrBuf.append('.');
			}
		}
		function.getParameters().getExpressions().set(1, formatStrBuf.toString());
	}

	// DATETOSTR()
	@SuppressWarnings("unchecked")
	private static void datetostr(Function function, PlainSelect select,
			String context) throws Exception {
		ArrayList<Integer> parmNumList = new ArrayList<Integer>();
		parmNumList.add(1);
		functionParmExceptionHandle(function, parmNumList);
		function.setName("TO_CHAR");
		transformExpression(function.getParameters().getExpressions().get(0),
				select, context);
		function.getParameters().getExpressions().add("'YYYY-MM-DD HH:MM:SS'");
	}

	// DATEFORMAT()
	@SuppressWarnings("unchecked")
	private static void dateformat(Function function, PlainSelect select,
			String context) throws Exception {
		ArrayList<Integer> parmNumList = new ArrayList<Integer>();
		parmNumList.add(2);
		functionParmExceptionHandle(function, parmNumList);
		function.setName("DATE_FORMAT");
		transformExpression(function.getParameters().getExpressions().get(0),
				select, context);
		String format = function.getParameters().getExpressions().get(1)
				.toString();
		format = format.replace("yyyy", "%Y");
		format = format.replace("-mm", "-%m");
		format = format.replace("dd", "%d");
		format = format.replace("hh", "%H");
		format = format.replace(":mm", ":%i");
		format = format.replace("ss", "%s");
		format = format.replace(".mmm", ".%f");
		function.getParameters().getExpressions().set(1, format);
	}

	// DATEDIFF()
	private static void datediff(Function function, PlainSelect select,
			String context) throws Exception {
		ArrayList<Integer> parmNumList = new ArrayList<Integer>();
		parmNumList.add(3);
		functionParmExceptionHandle(function, parmNumList);
		function.setName("TIMESTAMPDIFF");
		transformExpression(function.getParameters().getExpressions().get(1),
				select, context);
		transformExpression(function.getParameters().getExpressions().get(2),
				select, context);
	}

	// function parameter number exception
	private static void functionParmExceptionHandle(Function function,
			ArrayList<Integer> parmNumList) throws Exception {
		if (function.getParameters() == null) {
			throw new JSQLParserException(new Throwable(function.getName()
					.toUpperCase() + "(), parameter can't be null."));
		}
		int parmNum = function.getParameters().getExpressions().size();
		boolean parmNumCorrectFlag = false;
		StringBuffer parmNumStrBuf = new StringBuffer();
		for (int i = 0; i < parmNumList.size(); i++) {
			if (parmNum == parmNumList.get(i)) {
				parmNumCorrectFlag = true;
			}
			parmNumStrBuf.append(parmNumList.get(i));
			if (i != parmNumList.size() - 1) {
				parmNumStrBuf.append(" or ");
			}
		}
		if (!parmNumCorrectFlag) {
			throw new Exception(function.getName().toUpperCase()
					+ "() function, parameter number should be "
					+ parmNumStrBuf.toString()
					+ '.');
		}

	}

	// from
	public static void transformFrom(PlainSelect select) throws Exception {
		isSubSelectHandle(select.getFromItem());
		if (select.getJoins() != null) {
			if (select.getJoins().size() != 0) {
				for (int i = 0; i < select.getJoins().size(); i++) {
					isSubSelectHandle(((Join) select.getJoins().get(i))
							.getRightItem());
					// join
					if (((Join) select.getJoins().get(i)).getOnExpression() != null) {
						transformExpression(
								((Join) select.getJoins().get(i))
										.getOnExpression(),
								select, "join");
					}
				}
			}
		}
	}

	// subSelect
	private static void isSubSelectHandle(Object table) throws Exception {
		if (table instanceof SubSelect) {
			loopTransformSelect((PlainSelect) ((SubSelect) table)
					.getSelectBody());
		}
	}

	// where
	public static void transformWhere(PlainSelect select) throws Exception {
		transformExpression(select.getWhere(), select, "where");
	}

	// group by
	@SuppressWarnings("unchecked")
	public static void transformGroupBy(PlainSelect select) throws Exception {
		if (select.getGroupByColumnReferences().size() != 0) {
			for (int i = 0; i < select.getGroupByColumnReferences().size(); i++) {
				select.getGroupByColumnReferences().set(
						i,
						transformExpression(select.getGroupByColumnReferences()
								.get(i), select, "group by"));

			}
		}
	}

	// having
	public static void transformHaving(PlainSelect select) throws Exception {
		transformExpression(select.getHaving(), select, "having");
	}

	// order by
	public static void transformOrderBy(PlainSelect select) throws Exception {
		if (select.getOrderByElements().size() != 0) {
			for (int i = 0; i < select.getOrderByElements().size(); i++) {
				Expression express = (Expression) transformExpression(
						((OrderByElement) select.getOrderByElements().get(i))
								.getExpression(),
						select, "order by");
				((OrderByElement) select.getOrderByElements().get(i))
						.setExpression(express);

			}
		}
	}

}
