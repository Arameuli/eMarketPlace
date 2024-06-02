document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const isGuest = urlParams.get('guest');
    const isRegister = urlParams.get('register');
    const isLogin = urlParams.get('login');

    if (isGuest === 'true') {
        console.log("guest");
        document.querySelector('.profile-name').textContent = 'Guest';
        document.querySelector('.add-post').innerHTML = `<button onclick="window.location.href='logReg.html'">Login/Register</button>`;
    } else if (isLogin === 'true') {
        console.log("log In");
        const accEmail = localStorage.getItem('logInEmail');
        var data = new FormData();
        data.append('login-email', accEmail);

        try {
            const response = await fetch('/acc/name', {
                method: 'POST',
                body: data
            });

            if (response.ok) {
                const returnData = await response.text();
                console.log(returnData + "-   null?")
                document.querySelector('.profile-name').textContent = returnData;
            } else {
                response.text().then(text => alert(text));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    } else if(isRegister === 'true') {
        console.log("register");
        const profName = localStorage.getItem('registerUsername');
        document.querySelector('.profile-name').textContent = profName;
    }

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

    const modal = document.getElementById('postModal');
    const modalContent = document.getElementById('modalPostContent');
    const closeModal = document.getElementsByClassName('close')[0];

    function openModal(post) {
        modalContent.innerHTML = `
            <center><h3 style="margin-bottom: 30px; font-weight: bold;">${post.title}</h3>
            <img src="http://localhost:8080/${post.photo_url}.jpg" alt="Post Image" style="margin-bottom: 25px; height: 300px; width: 200px">
            <p>price:  ${post.price}</p>
            <p class="borderForDes">${post.discription}</p>
            <small>${new Date(post.date).toLocaleString()}</small></center>
        `;
        modal.style.display = "block";
    }

    closeModal.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    function renderPosts() {
        postsContainer.innerHTML = '';

        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const paginatedPosts = allPosts.slice(startIndex, endIndex);

        paginatedPosts.forEach(post => {
            var src = post.photo_url + ".jpg";
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <img src="http://localhost:8080/${src || 'default-image.jpg'}" alt="Post Image">
                <p>${post.price}</p>
                <small>${new Date(post.date).toLocaleString()}</small>
            `;
            postElement.addEventListener('click', () => openModal(post));
            postsContainer.appendChild(postElement);
        });
        pageNumberSpan.textContent = currentPage;
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = endIndex >= allPosts.length;
    }

    prevPageBtn.addEventListener('click', function () {
        if (currentPage > 1) {
            currentPage--;
            renderPosts();
        }
    });

    nextPageBtn.addEventListener('click', function () {
        if (currentPage * postsPerPage < allPosts.length) {
            currentPage++;
            renderPosts();
        }
    });

    fetchPosts();
});
