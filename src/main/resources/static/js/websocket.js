class WebSocketManager {
    constructor() {
        this.stompClient = null;
        this.connect();
    }

    connect() {
        console.log('Iniciando conexão WebSocket...');
        const socket = new SockJS('/ws-news');
        this.stompClient = Stomp.over(socket);
        
        this.stompClient.debug = (str) => {
            console.log('STOMP:', str);
        };
        
        this.stompClient.connect({}, 
            frame => this.onConnect(frame),
            error => this.onError(error)
        );
    }

    onConnect(frame) {
        console.log('WebSocket Conectado:', frame);
        UIManager.updateStatus(true);
        
        NewsService.loadAllNews();
        
        this.stompClient.subscribe('/topic/news', message => {
            try {
                const news = JSON.parse(message.body);
                UIManager.addNewsToList(news);
                UIManager.showNotification(news);
            } catch (error) {
                console.error('Erro ao processar mensagem:', error);
            }
        });
    }

    onError(error) {
        console.error('Erro WebSocket:', error);
        UIManager.updateStatus(false);
        setTimeout(() => this.connect(), 5000);
    }
}