package com.cgi.library.repository;

import com.cgi.library.entity.Book;
import com.cgi.library.model.BookDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.UUID;

@Repository
public interface BookRepository extends JpaRepository<Book, UUID> {
    @Modifying
    @Transactional
    @Query("UPDATE Book b SET b.title = :#{#bookDto.title}, b.author = :#{#bookDto.author}, b.genre = :#{#bookDto.genre}, b.year = :#{#bookDto.year}, b.comment = :#{#bookDto.comment} WHERE b.id = :#{#bookDto.id}")
    void updateBook(@Param("bookDto") BookDTO bookDto);
}
