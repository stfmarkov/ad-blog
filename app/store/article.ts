interface Article {
    id: string
    title: string
    content: string
    createdAt: Date
    updatedAt: Date
}

export const useArticleStore = defineStore('article', () =>  {

    const articles = ref<Article[]>([])
    const article = ref<Article | null>(null)

    const config = useRuntimeConfig().public

    const fetchArticles = async () => {
        const response = await fetch(`${config.serverUrl}/articles`)
        articles.value = await response.json()
    }

    const fetchArticle = async (id: string) => {
        const response = await fetch(`${config.serverUrl}/articles/${id}`)
        article.value = await response.json()
    }

    return {
        articles,
        article,
        fetchArticles,
        fetchArticle
    }
})