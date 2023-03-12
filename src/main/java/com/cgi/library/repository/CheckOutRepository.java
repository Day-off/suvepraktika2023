package com.cgi.library.repository;

import com.cgi.library.entity.CheckOut;
import com.cgi.library.model.CheckOutDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.UUID;

@Repository
public interface CheckOutRepository extends JpaRepository<CheckOut, UUID> {

    @Modifying
    @Transactional
    @Query("UPDATE CheckOut c SET c.borrowerFirstName = :#{#checkOutDTO.borrowerFirstName}," +
            "c.borrowerLastName = :#{#checkOutDTO.borrowerLastName}, " +
            "c.dueDate = :#{#checkOutDTO.dueDate}," +
            "c.checkedOutDate = :#{#checkOutDTO.checkedOutDate} WHERE c.id = :#{#checkOutDTO.id}")
    void updateCheckout(@Param("checkOutDTO") CheckOutDTO checkOutDTO);

}
