document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const fileInput = document.getElementById('file');
    const description = document.getElementById('description').value;

    const reader = new FileReader();
    reader.onload = function(e) {
        const imageUrl = e.target.result;

        const newPost = {
            title: title,
            imageUrl: imageUrl,
            description: description
        };

        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push(newPost);

        localStorage.setItem('posts', JSON.stringify(posts));
        document.getElementById('postForm').reset();

        window.location.href = 'index.html';
    }

    if (fileInput.files.length > 0) {
        reader.readAsDataURL(fileInput.files[0]);
    }
});
