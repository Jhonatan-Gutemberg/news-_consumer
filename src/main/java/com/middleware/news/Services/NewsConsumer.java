package com.middleware.news.Services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.middleware.news.Model.News;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class NewsConsumer {

    @Autowired
    private ObjectMapper objectMapper;
    
    @Autowired
    private NotificationService notificationService;

    @KafkaListener(topics = "news-feed", groupId = "news-consumer-group")
    public void consume(String message) {
        try {
            log.info("Mensagem recebida do Kafka: {}", message);
            News news = objectMapper.readValue(message, News.class);
            
            notificationService.notifyUsers(news);
            log.info("Notificação enviada com sucesso: {}", news.getTitle());
            
        } catch (Exception e) {
            log.error("Erro ao processar mensagem do Kafka: {}", e.getMessage(), e);
        }
    }

    
}