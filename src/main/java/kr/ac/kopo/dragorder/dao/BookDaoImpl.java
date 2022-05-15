package kr.ac.kopo.dragorder.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kr.ac.kopo.dragorder.model.Book;
import kr.ac.kopo.dragorder.util.Orders;

@Repository
public class BookDaoImpl implements BookDao {
	
	@Autowired
	SqlSession sql;

	@Override
	public List<Book> list() {
		return sql.selectList("book.list");
	}

	@Override
	public void add(Book item) {
		sql.insert("book.add", item);
	}

	@Override
	public Book item(int code) {
		return sql.selectOne("book.item", code);
	}

	@Override
	public void update(Book item) {
		sql.update("book.update", item);
	}

	@Override
	public void delete(int code) {
		sql.delete("book.delete", code);
	}

	@Override
	public void saveOrder(Orders item) {
		HashMap<String, Integer> map = new HashMap<String, Integer>();
		map.put("code", item.getCode());
		map.put("order", item.getOrder());
		System.out.println(map.get("code"));
		System.out.println(map.get("order"));
		sql.update("book.saveOrder", map);
	}

}
