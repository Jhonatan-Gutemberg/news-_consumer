package com.middleware.news.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.middleware.news.Model.News;

@Repository
public interface NewsRepository extends JpaRepository<News, Long> {
    
    
}
