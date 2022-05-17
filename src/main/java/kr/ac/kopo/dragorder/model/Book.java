package kr.ac.kopo.dragorder.model;

public class Book {
	private int code;
	private String bookname;
	private String publisher;
	private int price;
	private int originalOrder;

	private int lastOrder;

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public String getBookname() {
		return bookname;
	}

	public void setBookname(String bookname) {
		this.bookname = bookname;
	}

	public String getPublisher() {
		return publisher;
	}

	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public int getOriginalOrder() {
		return originalOrder;
	}

	public void setOriginalOrder(int originalOrder) {
		this.originalOrder = originalOrder;
	}

	public int getLastOrder() {
		return lastOrder;
	}

	public void setLastOrder(int lastOrder) {
		this.lastOrder = lastOrder;
	}

}
