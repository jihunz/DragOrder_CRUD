package kr.ac.kopo.dragorder.service;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.ac.kopo.dragorder.dao.BookDao;
import kr.ac.kopo.dragorder.model.Book;
import kr.ac.kopo.dragorder.model.Orders;

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
		int lastOrder = 0;
		int count = dao.count();

		if(count > 0) {
			lastOrder = dao.lastOrder();
			item.setOriginalOrder(lastOrder + 1);
		} else {
			lastOrder = 1;
			item.setOriginalOrder(lastOrder);
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
			
			int lastOrder = 0;
			int count = dao.count();

			if(count > 0) {
				lastOrder = dao.lastOrder();
				item.setOriginalOrder(lastOrder + 1);
			} else {
				lastOrder = 1;
				item.setOriginalOrder(lastOrder);
			}

			dao.add(item);
		}
	}

	@Override
	public void saveOrder(List<Orders> orders) {
		
		for(Orders item : orders) {
			dao.saveOrder(item);
		}
	}
}
