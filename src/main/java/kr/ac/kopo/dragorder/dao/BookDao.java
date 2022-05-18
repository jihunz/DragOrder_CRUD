package kr.ac.kopo.dragorder.dao;

import java.util.HashMap;
import java.util.List;

import kr.ac.kopo.dragorder.model.Book;
import kr.ac.kopo.dragorder.model.Orders;

public interface BookDao {

	List<Book> list();

	void add(Book item);

	Book item(int code);

	void update(Book item);

	void delete(int code);

	void saveOrder(Orders item);

	int lastOrder();

	int count();

}
