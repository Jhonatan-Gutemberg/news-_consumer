class NewsService {
    static async loadAllNews() {
        try {
            console.log('Carregando notícias...');
            const response = await fetch('/api/v1/news');
            
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            
            const newsList = await response.json();
            console.log('Notícias carregadas:', newsList);
            
            if (Array.isArray(newsList)) {
                document.getElementById('news-list').innerHTML = '';
                
                newsList.reverse().forEach(news => {
                    UIManager.addNewsToList(news);
                });
            }
        } catch (error) {
            console.error('Erro ao carregar notícias:', error);
        }
    }
    
    static async checkHealth() {
        try {
            const response = await fetch('/api/v1/news/health');
            return response.ok;
        } catch (error) {
            console.error('Erro ao verificar health:', error);
            return false;
        }
    }
}