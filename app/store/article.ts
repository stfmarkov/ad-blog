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

/** Raw article from GET /articles or nested `article`; JSON uses backend snake_case. */
export interface ArticleApiPayload {
    id: string
    author_id?: string
    authorId?: string
    title: string
    content: string
    tags: string[]
    category: string
    image: string
    status: string
    publish_date?: string
    publishDate?: string
    views: number
    created_at?: string
    createdAt?: string
    updated_at?: string
    updatedAt?: string
}

const mapArticleFromApi = (raw: ArticleApiPayload): Article => {
    const publishSrc = raw.publish_date ?? raw.publishDate
    const createdSrc = raw.created_at ?? raw.createdAt
    const updatedSrc = raw.updated_at ?? raw.updatedAt
    const authorSrc = raw.author_id ?? raw.authorId ?? ''

    return {
        id: raw.id,
        authorId: authorSrc,
        title: raw.title,
        content: raw.content,
        tags: raw.tags ?? [],
        category: raw.category as Category,
        image: raw.image ?? '',
        status: raw.status,
        publishDate: publishSrc ? new Date(publishSrc) : new Date(0),
        views: raw.views ?? 0,
        createdAt: createdSrc ? new Date(createdSrc) : new Date(0),
        updatedAt: updatedSrc ? new Date(updatedSrc) : new Date(0),
    }
}

export const useArticleStore = defineStore('article', () => {

    const articles = ref<Article[]>([])
    const article = ref<Article | null>(null)

    const config = useRuntimeConfig().public

    const fetchArticles = async () => {
        const response = await fetch(`${config.serverUrl}/articles`)
        if (!response.ok) {
            articles.value = []
            throw new Error(`Failed to load articles: ${response.status}`)
        }
        const data = await response.json()
        const list: ArticleApiPayload[] = Array.isArray(data)
            ? data
            : Array.isArray(data?.articles)
                ? data.articles
                : []
        articles.value = list.map(mapArticleFromApi)
    }

    const fetchArticle = async (id: string) => {
        article.value = null
        const base = config.serverUrl
        if (!base) {
            return
        }
        const response = await fetch(`${base}/articles/${encodeURIComponent(id)}`)
        if (!response.ok) {
            return
        }
        let data: unknown
        try {
            data = await response.json()
        } catch {
            return
        }
        const raw = (data as { article?: ArticleApiPayload }).article ?? (data as ArticleApiPayload)
        if (!raw || typeof raw !== 'object' || !('id' in raw)) {
            return
        }
        article.value = mapArticleFromApi(raw as ArticleApiPayload)
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

    const uploadArticleImage = async (file: File, articleId: string): Promise<string> => {
        const base = String(config.serverUrl ?? '').trim().replace(/\/+$/, '')
        if (!base) {
            throw new Error('SERVER_URL is not configured')
        }
        const endpoint = `${base}/articles/${articleId}/image`
        const fieldName = String('image')
        const formData = new FormData()
        formData.append(fieldName, file)
        const response = await fetch(endpoint, {
            method: 'POST',
            body: formData,
        })
        if (!response.ok) {
            throw new Error(`Image upload failed: ${response.status}`)
        }
        

        const data = await response.json()
        return data.url as string
    }

    const deleteArticle = async (id: string) => {
        const response = await fetch(`${config.serverUrl}/articles/${encodeURIComponent(id)}`, {
            method: 'DELETE',
        })
        if (!response.ok) {
            throw new Error(`Failed to delete article: ${response.status}`)
        }
        articles.value = articles.value.filter((a) => a.id !== id)
        if (article.value?.id === id) {
            article.value = null
        }
    }

    return {
        articles,
        article,
        fetchArticles,
        fetchArticle,
        createArticle,
        uploadArticleImage,
        deleteArticle,
    }
})