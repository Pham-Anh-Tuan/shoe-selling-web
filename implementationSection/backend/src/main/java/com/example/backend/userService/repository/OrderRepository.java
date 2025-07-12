package com.example.backend.userService.repository;

import com.example.backend.core.dto.SalesDay;
import com.example.backend.core.dto.SalesMonth;
import com.example.backend.userService.model.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
@Repository
public interface OrderRepository extends JpaRepository<Order, String> {
    Page<Order> findByAccount_EmailAndShippingStatusInOrderByOrderDateDesc(String email, List<Integer> shippingStatus, Pageable pageable);

    Page<Order> findAllByOrderByOrderDateDesc(Pageable pageable);

    @Query("SELECT o FROM Order o WHERE SUBSTRING(o.id, 1, 11) = :idPrefix ORDER BY o.orderDate DESC")
    Page<Order> findByIdPrefixOrderByOrderDateDesc(@Param("idPrefix") String idPrefix, Pageable pageable);

    @Query("SELECT new com.example.backend.core.dto.SalesMonth(MONTH(o.orderDate), SUM(o.totalPrice)) " +
            "FROM Order o " +
            "WHERE YEAR(o.orderDate) = :year AND o.paymentStatus = 1 " +
            "GROUP BY MONTH(o.orderDate) " +
            "ORDER BY MONTH(o.orderDate)")
    List<SalesMonth> findMonthlyRevenueByYear(@Param("year") int year);

    @Query("SELECT DISTINCT FUNCTION('YEAR', o.orderDate) FROM Order o WHERE o.paymentStatus = 1")
    List<Integer> findAllYearsWithPayMethod1();

    @Query("SELECT new com.example.backend.core.dto.SalesDay(o.orderDate, SUM(o.totalPrice)) " +
            "FROM Order o " +
            "WHERE o.orderDate = :date AND o.paymentStatus = 1 " +
            "GROUP BY o.orderDate")
    SalesDay findRevenueByDate(@Param("date") LocalDate date);

    Long countByShippingStatus(int shippingStatus);

    @Query("SELECT SUM(oi.purchaseQuantity) FROM Order o JOIN o.orderItems oi WHERE o.shippingStatus = :status")
    Long getTotalSoldOrReturned(@Param("status") int status);
}
