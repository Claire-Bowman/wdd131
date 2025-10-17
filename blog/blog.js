/**
 * blog.js
 * Contains data for book reviews used to dynamically populate the blog.
 */

const bookReviews = [
    {
        title: "The Alchemist",
        author: "Paulo Coelho",
        date: "October 10, 2025",
        datetime: "2025-10-10",
        rating: "⭐️⭐️⭐️⭐️",
        rating_score: 4,
        image: "alchemist-cover.jpg",
        summary: "Paulo Coelho's enchanting novel has inspired a generation of readers. This story, dazzling in its powerful simplicity and soul-stirring wisdom, is about an Andalusian shepherd boy named Santiago who travels from Spain to the Egyptian desert in search of a hidden treasure. No matter what your dreams are, The Alchemist is a testimony to the transformative power of our dreams.",
        review_link: "#"
    },
    {
        title: "The Secret Garden",
        author: "Frances Hodgson Burnett",
        date: "September 28, 2025",
        datetime: "2025-09-28",
        rating: "⭐️⭐️⭐️⭐️⭐️",
        rating_score: 5,
        image: "secret-garden-cover.jpg",
        summary: "A neglected ten-year-old orphan, Mary Lennox, is sent to live in a large country manor in Yorkshire. She discovers a hidden, walled-in garden and a sick cousin she never knew she had, both of which change her life. A classic story of renewal, friendship, and the power of nature.",
        review_link: "#"
    }
];

// In a later part of the assignment, you would likely write a function here
// to loop through the 'bookReviews' array and generate the HTML dynamically.

/*
function renderReviews(reviews) {
    const articlesList = document.querySelector('.articles-list');
    articlesList.innerHTML = ''; // Clear existing content

    reviews.forEach(book => {
        // Code to create the <article> element and its children using the book data...
        // ... and append it to the articlesList.
    });
}

// renderReviews(bookReviews); // Call the function to display the initial data
*/