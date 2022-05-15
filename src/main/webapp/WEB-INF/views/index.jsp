<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title></title>
<link rel="/resources/drag_order.css">
</head>
<body>
	<div>
		<ul>
			<li><a href="book/list">도서 관리</a></li>
		</ul>
	</div>
	<div>
		<table border="1" id='bookTable'>
			<thead>
				<tr>
					<td>도서번호</td>
					<td>도서명</td>
					<td>출판사</td>
					<td>가격</td>
					<td>관리</td>
				</tr>
			</thead>
			<tbody>
				<c:forEach var="item" items="${list}">
					<tr data-order="" data-code="${item.code}" class="dragItem">
						<td>${item.code}</td>
						<td>${item.bookname}</td>
						<td>${item.publisher}</td>
						<td>${item.price}</td>
						<td><a href="update/${item.code}">수정</a> <a href="delete/${item.code}">삭제</a></td>
					</tr>
				</c:forEach>
				<c:if test="${list.size() < 1}">
					<tr>
						<td colspan="5">등록된 도서가 없습니다.</td>
					</tr>
				</c:if>
			</tbody>
		</table>
	</div>
</body>
<script type="text/javascript" src="/resources/drag_order_dom.js"></script>
<script type="text/javascript">
	new DragOrder("#bookTable");
</script>
</html>