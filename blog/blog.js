
const articles = [
    {
        id: 1,
        title: "The Alchemist",
        author: "Paulo Coelho",
        date: "October 10, 2025",
        datetime: "2025-10-10",
        rating: "⭐️⭐️⭐️⭐️ (4/5)", 
        summary: "Paulo Coelho's enchanting novel has inspired a generation of readers. This story, dazzling in its powerful simplicity and soul-stirring wisdom, is about an Andalusian shepherd boy named Santiago...",
        image_src: "alchemist-cover.jpg",
        image_alt: "The Alchemist book cover" 
    },
    {
        id: 2,
        title: "The Secret Garden",
        author: "Frances Hodgson Burnett",
        date: "September 28, 2025",
        datetime: "2025-09-28",
        rating: "⭐️⭐️⭐️⭐️⭐️ (5/5)", 
        summary: "A neglected ten-year-old orphan, Mary Lennox, is sent to live in a large country manor in Yorkshire. She discovers a hidden, walled-in garden and a sick cousin she never knew she had...",
        image_src: "secret-garden-cover.jpg",
        image_alt: "The Secret Garden book cover" 
    },
    {
        id: 3,
        title: "Pawn of Prophecy", 
        author: "David Eddings", 
        date: "February 12, 2022", 
        datetime: "2022-02-12",
        rating: "⭐️⭐️⭐️⭐️⭐️ (5/5)", 
        summary: "A fierce dispute among the Gods and the theft of a powerful Orb leaves the World divided into five kingdoms. Young Garion, with his 'Aunt Pol' and an elderly man calling himself Wolf --a father and daughter granted near-immortality by one of the Gods -- set out on a complex mission.",
        image_src: "pawn-of-prophecy-cover.jpg", 
        image_alt: "Book cover for Pawn of Prophecy"
    }
];

// --- Dynamic Article Generation ---

function generateArticles() {
    const articlesContainer = document.querySelector('.articles-list');

    articlesContainer.innerHTML = ''; 


    articles.forEach(article => {
        const newArticle = document.createElement('article');

        const articleHTML = `
            <div class="article-grid">
                <div class="details-left">
                    <p class="author-name">By ${article.author}</p>
                    <time datetime="${article.datetime}" class="article-date">${article.date}</time>
                    <p class="rating">${article.rating}</p>
                </div>
                <div class="content-right">
                    <h2>${article.title}</h2>
                    <figure>
                        <img src="${article.image_src}" alt="${article.image_alt}">
                    </figure>
                    <p class="article-summary">
                        ${article.summary}
                    </p>
                    <a href="#" class="read-more">Read Full Review</a>
                </div>
            </div>
        `;

        newArticle.innerHTML = articleHTML;

        articlesContainer.appendChild(newArticle);
    });
}

generateArticles();