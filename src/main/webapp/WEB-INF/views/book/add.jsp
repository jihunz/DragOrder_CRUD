<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title></title>
</head>
<body>
	<div>
		<div>
			<h1>도서 등록</h1>
		</div>
		<form method="post">
			<div>
				<label>도서명</label> <input type="text" name="bookname">
			</div>
			<div>
				<label>출판사</label> <input type="text" name="publisher">
			</div>
			<div>
				<label>가격</label> <input type="number" name="price">
			</div>
			<div>
				<button>등록</button>
			</div>
		</form>
	</div>
	<div>
		<a href="list">이전</a>
	</div>
</body>
</html>