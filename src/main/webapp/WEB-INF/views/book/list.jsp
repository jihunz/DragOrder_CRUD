<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title></title>
</head>
<body>
	<div>
		<h1>도서 목록</h1>
		<div>
			<table border="1">
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
						<tr>
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
		<div>
			<a href="add">등록</a> <a href="/">이전</a>
		</div>
		<div>
			<a href="dummy">시험용 데이터 대량등록</a>
		</div>
	</div>
</body>
</html>