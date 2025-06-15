package com.middleware.news.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import com.middleware.news.Model.News;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class NotificationService {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public void notifyUsers(News news) {
        try {
        log.info("Enviando notificação para usuários sobre: {}", news.getTitle());
        messagingTemplate.convertAndSend("/topic/news", news);
        log.info("Notificação WebSocket enviada com sucesso para: {}", news.getTitle());
            
        } catch (Exception e) {
            log.error("Erro ao enviar notificação WebSocket: {}", e.getMessage(), e);
        }
    }
}