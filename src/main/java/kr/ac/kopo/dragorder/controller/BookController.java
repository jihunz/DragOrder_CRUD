package kr.ac.kopo.dragorder.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.ac.kopo.dragorder.model.Book;
import kr.ac.kopo.dragorder.service.BookService;

@Controller
@RequestMapping("/book")
public class BookController {
	@Autowired
	BookService service;
	
	final String PATH = "book/";
	
	@RequestMapping("/list")
	public String list(Model model) {
		List<Book> list = service.list();
	
		model.addAttribute("list", list);
		
		return PATH + "list";
	}
	
	@GetMapping("/add")
	public String add() {
		return PATH + "add";
	}
	
	@PostMapping("/add")
	public String add(Book item) {

		service.add(item);
		
		return "redirect:list";
	}
	
	@GetMapping("/update/{code}")
	public String update(@PathVariable int code, Model model) {
		Book item = service.item(code);
		
		model.addAttribute("item", item);
		
		return PATH + "update";
	}
	
	@PostMapping("/update/{code}")
	public String update(@PathVariable int code, Book item) {
		item.setCode(code);
		
		service.update(item);
		
		return "redirect:../list";
	}
	
	@GetMapping("/delete/{code}")
	public String delete(@PathVariable int code) {
		service.delete(code);
		
		return "redirect:../list";
	}
	
	@GetMapping("/dummy")
	public String dummy() {
		service.dummy();
		
		return "redirect:list";
	}
	
	@ResponseBody
	@PostMapping("/saveOrder")
	public String saveOrder(@RequestBody List<Book> list) {
		for(Book item : list) {
			System.out.println(item.getCurrentOrder());
		}
		
		service.saveOrder(list);
		
		return "[saveOrder]: success";
	}
}
