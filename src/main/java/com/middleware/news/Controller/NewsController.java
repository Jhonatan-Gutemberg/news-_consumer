package com.middleware.news.Controller;

import com.middleware.news.Model.News;
import com.middleware.news.Services.NewsService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/news")
@CrossOrigin(origins = "*")
@Tag(name = "News", description = "API para gerenciamento de notícias")
public class NewsController {

    @Autowired
    private NewsService newsService;

    @Operation(summary = "Retorna as últimas notificações")
    @GetMapping("/notifications")
    public ResponseEntity<String> getNotifications() {
        try {
            log.info("Recebida requisição para buscar notificações");
            return ResponseEntity.ok("WebSocket endpoint disponível em /ws-news");
        } catch (Exception e) {
            log.error("Erro ao buscar notificações: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @Operation(summary = "Verifica status do serviço")
    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Serviço de notificações está ativo");
    }

    @GetMapping
    public ResponseEntity<List<News>> getAllNews() {
        try {
            List<News> news = newsService.findAll();
            log.info("Retornando {} notícias", news.size());
            return ResponseEntity.ok(news);
        } catch (Exception e) {
            log.error("Erro ao buscar notícias: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
}