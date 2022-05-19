<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title></title>
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
	crossorigin="anonymous">
<link href="/resources/drag_order.css" rel="stylesheet">
</head>
<body>
	<div class="index-container">
		<div>
			<h1>DragOrder_CRUD</h1>
		</div>
		<div class="table-container mt-3">
			<table class="table table-striped table-hover" border="1" id='bookTable'>
				<thead>
					<tr class="fw-bolder table-success">
						<td>도서번호</td>
						<td>도서명</td>
						<td>출판사</td>
						<td>가격</td>
					</tr>
				</thead>
				<tbody>
					<c:forEach var="item" items="${list}">
						<tr data-order="${item.currentOrder}" data-code="${item.code}"
							class="dragItem">
							<td>${item.code}</td>
							<td>${item.bookname}</td>
							<td>${item.publisher}</td>
							<td>${item.price}</td>
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
		<div class="d-flex justify-content-end">
			<a href="book/list">
				<button type="button" class="btn btn-success">도서 관리</button>
			</a>
		</div>
	</div>
</body>
<script
	src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
	integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
	crossorigin="anonymous"></script>
<script type="text/javascript" src="/resources/drag_order_dom.js"></script>
<script type="text/javascript">
	new DragOrder("#bookTable");
</script>
</html>