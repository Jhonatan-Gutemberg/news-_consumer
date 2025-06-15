class UIManager {
    
     static addNewsToList(news) {
        if (!news || !news.title) {
            console.error('Notícia inválida:', news);
            return;
        }

        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';
        
        const date = news.publishedAt ? 
            new Date(news.publishedAt).toLocaleString('pt-BR') : 
            new Date().toLocaleString('pt-BR');
        
        newsCard.innerHTML = `
            ${this.getImageHtml(news.imageUrl)}
            <div class="news-card-content">
                <h3>${this.escapeHtml(news.title)}</h3>
                <p>${this.escapeHtml(news.content)}</p>
            </div>
            <div class="news-card-footer">
                <small>${date}</small>
                ${news.url ? `<a href="${this.escapeHtml(news.url)}" target="_blank">Leia mais →</a>` : ''}
            </div>
        `;
        
        const list = document.getElementById('news-list');
        if (list) {
            list.insertBefore(newsCard, list.firstChild);
            setTimeout(() => newsCard.classList.add('show'), 10);
        } else {
            console.error('Elemento news-list não encontrado');
        }
    }

    static getImageHtml(imageUrl) {
        const placeholderUrl = 'https://via.placeholder.com/300x200?text=Notícia';
        return imageUrl 
            ? `<img src="${this.escapeHtml(imageUrl)}" alt="Imagem da notícia" onerror="this.src='${placeholderUrl}'">` 
            : `<img src="${placeholderUrl}" alt="Imagem placeholder">`;
    }

    static escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    static showNotification(news) {
        const container = document.getElementById('notifications-container');
        const notification = document.createElement('div');
        notification.className = 'notification';
        
        notification.innerHTML = `
            <h4>${this.escapeHtml(news.title)}</h4>
            <p>${this.escapeHtml(news.content).substring(0, 100)}...</p>
        `;
        
        container.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => container.removeChild(notification), 500);
        }, 5000);
    }

    static updateStatus(connected) {
        const status = document.getElementById('status');
        if (status) {
            status.textContent = connected ? 'Conectado' : 'Desconectado';
            status.className = `status-indicator ${connected ? 'connected' : 'disconnected'}`;
        }
    }
    static displayNews(newsList) {
        const newsContainer = document.getElementById('news-list');
        newsContainer.innerHTML = '';
        
        console.log('Exibindo', newsList.length, 'notícias');
        
        newsList.forEach(news => {
            const newsElement = this.createNewsElement(news);
            newsContainer.appendChild(newsElement);
        });
    }
    
    
    static createNewsElement(news) {
        const newsDiv = document.createElement('div');
        newsDiv.className = 'news-item';
        
        newsDiv.innerHTML = `
            <h3>${news.title || 'Sem título'}</h3>
            <p>${news.content || 'Sem conteúdo'}</p>
            ${news.url ? `<a href="${news.url}" target="_blank">Leia mais</a>` : ''}
            <small>Recebido em: ${new Date().toLocaleString()}</small>
        `;
        
        return newsDiv;
    }

    static addNewsToList(news) {
        if (!news || !news.title) {
            console.error('Notícia inválida:', news);
            return;
        }

        console.log('Adicionando notícia:', news.title);
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';
        
        const date = news.publishedAt ? new Date(news.publishedAt).toLocaleString('pt-BR') : new Date().toLocaleString('pt-BR');
        
        newsCard.innerHTML = `
            ${news.imageUrl ? 
                `<img src="${news.imageUrl}" alt="${news.title}" onerror="this.src='https://via.placeholder.com/300x200?text=Notícia'">` 
                : '<img src="https://via.placeholder.com/300x200?text=Notícia" alt="Imagem placeholder">'}
            <div class="news-card-content">
                <h3>${news.title}</h3>
                <p>${news.content}</p>
            </div>
            <div class="news-card-footer">
                <small>${date}</small>
                ${news.url ? `<a href="${news.url}" target="_blank">Leia mais →</a>` : ''}
            </div>
        `;
        
        const list = document.getElementById('news-list');
        list.insertBefore(newsCard, list.firstChild);

        setTimeout(() => newsCard.classList.add('show'), 10);
        
        this.showBrowserNotification(news);
    }
    
    static showBrowserNotification(news) {
        if ('Notification' in window) {
            if (Notification.permission === 'granted') {
                new Notification('Nova Notícia!', {
                    body: news.title,
                    icon: '/favicon.ico'
                });
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        new Notification('Nova Notícia!', {
                            body: news.title,
                            icon: '/favicon.ico'
                        });
                    }
                });
            }
        }
    }
    
    static showError(message) {
        console.error('❌ Erro:', message);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        const container = document.getElementById('notifications-container');
        container.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
}