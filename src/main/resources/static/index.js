document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('postsContainer');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const pageNumberSpan = document.getElementById('pageNumber');

    let currentPage = 1;
    const postsPerPage = 6;
    let allPosts = [];

    async function fetchPosts() {
        try {
            const response = await fetch('/post');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            allPosts = data.postDtoList || [];
            renderPosts();
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }

    function renderPosts() {
        postsContainer.innerHTML = '';

        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const paginatedPosts = allPosts.slice(startIndex, endIndex);

        paginatedPosts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <img src="http://localhost:8080/${post.photo_url || 'default-image.jpg'}" alt="Post Image">
                <p>${post.discription}</p>
                <small>${new Date(post.date).toLocaleString()}</small>
            `;
            postsContainer.appendChild(postElement);
        });
        pageNumberSpan.textContent = currentPage;
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = endIndex >= allPosts.length;
    }

    prevPageBtn.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            renderPosts();
        }
    });

    nextPageBtn.addEventListener('click', function() {
        if (currentPage * postsPerPage < allPosts.length) {
            currentPage++;
            renderPosts();
        }
    });

    fetchPosts();
});
