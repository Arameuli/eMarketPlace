document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('postsContainer');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const pageNumberSpan = document.getElementById('pageNumber');

    let currentPage = 1;
    const postsPerPage = 6;

    function renderPosts() {
        postsContainer.innerHTML = '';

        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const paginatedPosts = posts.slice(startIndex, endIndex);

        paginatedPosts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <img src="${post.imageUrl}" alt="Post Image">
                <p>${post.description}</p>
            `;
            postsContainer.appendChild(postElement);
        });

        pageNumberSpan.textContent = currentPage;
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = endIndex >= posts.length;
    }

    prevPageBtn.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            renderPosts();
        }
    });

    nextPageBtn.addEventListener('click', function() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        if (currentPage * postsPerPage < posts.length) {
            currentPage++;
            renderPosts();
        }
    });

    renderPosts();
});
