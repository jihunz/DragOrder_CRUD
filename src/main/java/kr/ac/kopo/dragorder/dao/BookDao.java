package kr.ac.kopo.dragorder.dao;

import java.util.List;

import kr.ac.kopo.dragorder.model.Book;

public interface BookDao {

	List<Book> list();

	void add(Book item);

	Book item(int code);

	void update(Book item);

	void delete(int code);

}
