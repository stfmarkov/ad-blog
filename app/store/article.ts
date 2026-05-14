// type Article struct {
// 	ID          string    `json:"id" gorm:"primaryKey"`
// 	AuthorID    string    `json:"author_id"`
// 	Title       string    `json:"title"`
// 	Content     string    `json:"content"`
// 	Tags        []string  `json:"tags" gorm:"serializer:json"`
// 	Category    string    `json:"category"`
// 	Image       string    `json:"image"`
// 	Status      string    `json:"status"`
// 	PublishDate time.Time `json:"publish_date"`
// 	Views       int       `json:"views"`
// 	CreatedAt   time.Time `json:"created_at"`
// 	UpdatedAt   time.Time `json:"updated_at"`
// }

export type Category = 'rides' | 'code' | 'quests'

export interface Article {
    id: string
    authorId: string
    title: string
    content: string
    tags: string[]
    category: Category
    image: string
    status: string
    publishDate: Date
    views: number
    createdAt: Date
    updatedAt: Date
}

export interface Tag {
    id: string
    label: string
    tone: Category
}

/** Request body for POST /articles (matches backend JSON tags). */
export interface ArticleCreatePayload {
    author_id: string
    title: string
    content: string
    tags: string[]
    category: Category
    image: string
    status: string
    publish_date: string
    views: number
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
        const articleData = await response.json()

        article.value = {
            id: articleData.article.id,
            authorId: articleData.article.author_id,
            title: articleData.article.title,
            content: articleData.article.content,
            tags: articleData.article.tags,
            category: articleData.article.category as Category,
            image: articleData.article.image,
            status: articleData.article.status,
            publishDate: new Date(articleData.article.publish_date),
            views: articleData.article.views,
            createdAt: new Date(articleData.article.created_at),
            updatedAt: new Date(articleData.article.updated_at)
        }
    }

    const createArticle = async (payload: ArticleCreatePayload) => {
        const response = await fetch(`${config.serverUrl}/articles`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
        if (!response.ok) {
            throw new Error(`Failed to create article: ${response.status}`)
        }
        const data = await response.json()
        const raw = data.article ?? data
        return raw.id as string
    }

    return {
        articles,
        article,
        fetchArticles,
        fetchArticle,
        createArticle,
    }
})