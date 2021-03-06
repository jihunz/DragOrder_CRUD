package kr.ac.kopo.dragorder.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.ac.kopo.dragorder.dao.BookDao;
import kr.ac.kopo.dragorder.model.Book;

@Service
public class BookServiceImpl implements BookService {

	@Autowired
	BookDao dao;

	@Override
	public List<Book> list() {
		return dao.list();
	}

	@Override
	public void add(Book item) {
		int count = dao.count();

		if(count > 0) {
			int lastOrder = dao.lastOrder();
			item.setCurrentOrder(lastOrder + 1);
		}
		
		dao.add(item);
	}

	@Override
	public Book item(int code) {
		return dao.item(code);
	}

	@Override
	public void update(Book item) {
		dao.update(item);
	}

	@Override
	public void delete(int code) {
		dao.delete(code);
	}

	@Override
	public void dummy() {
		for (int i = 1; i <= 10; i++) {
			Book item = new Book();
			item.setBookname("도서명" + i);
			item.setPublisher("출판사" + i);
			item.setPrice(i * 1000);
			
			int count = dao.count();

			if(count > 0) {
				int lastOrder = dao.lastOrder();
				item.setCurrentOrder(lastOrder + 1);
			}

			dao.add(item);
		}
	}

	@Override
	public void saveOrder(List<Book> list) {
		
		for(Book item : list) {
			dao.saveOrder(item);
		}
	}
}
