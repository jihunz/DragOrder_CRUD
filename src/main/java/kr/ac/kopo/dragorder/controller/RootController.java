package kr.ac.kopo.dragorder.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.ac.kopo.dragorder.model.Book;
import kr.ac.kopo.dragorder.service.BookService;

@Controller
public class RootController {
	@Autowired
	BookService service;
	
	@RequestMapping("/")
	public String index(Model model) {
		List<Book> list = service.list();
		
		model.addAttribute("list", list);
		
		return "index";
	}
}
