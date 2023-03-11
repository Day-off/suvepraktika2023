package com.cgi.library.controller;

import com.cgi.library.model.BookDTO;
import com.cgi.library.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/book")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping(value = "getBooks")
    public ResponseEntity<Page<BookDTO>> getBooks(Pageable pageable) {
        System.out.println("BOOKS");
        return ResponseEntity.ok(bookService.getBooks(pageable));
    }

    @GetMapping(value = "getBook")
    public ResponseEntity<BookDTO> getBook(@RequestParam(value = "bookId") UUID bookId) {
        System.out.println("GET BOOK");
        return ResponseEntity.ok(bookService.getBook(bookId));
    }

    @PostMapping(value = "saveBook")
    public ResponseEntity<String> saveBook(@RequestBody BookDTO book) {
        System.out.println("SAVE");
        System.out.println(book);
        return ResponseEntity.ok(String.valueOf(bookService.saveBook(book)));
    }

    @DeleteMapping(value = "deleteBook")
    public ResponseEntity<String> deleteBook(@RequestParam(value = "bookId") UUID bookId) {
        bookService.deleteBook(bookId);
        System.out.println("GET DELETE REQUEST");
        return ResponseEntity.ok("Ok");
    }

    @PutMapping(value = "updateBook")
    public ResponseEntity<String> updateBook(@RequestBody BookDTO book) {
        bookService.updateBook(book);
        System.out.println("UPDATE");
        return ResponseEntity.ok("UPDATED");
    }
}
