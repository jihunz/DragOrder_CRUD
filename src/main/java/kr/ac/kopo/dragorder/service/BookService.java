package kr.ac.kopo.dragorder.service;

import java.util.List;

import kr.ac.kopo.dragorder.model.Book;

public interface BookService {

	List<Book> list();

	void add(Book item);

	Book item(int code);

	void update(Book item);

	void delete(int code);

	void dummy();

	void saveOrder(List<Book> list);

}
