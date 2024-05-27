document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const fileInput = document.getElementById('file');
    const description = document.getElementById('description').value;

    const reader = new FileReader();
    reader.onload = function(e) {
        // const imageUrl = e.target.result;
        const imageUrl = "image.jpg";

        const newPost = {
            postTitle: title,
            photo_url: imageUrl,
            discription: description,
            date: new Date().toISOString()
        };

        fetch('/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("aq var");
                document.getElementById('postForm').reset();
                window.location.href = 'index.html';
            })
            .catch(error => {
                console.error('Error posting data:', error);
            });
    }

    if (fileInput.files.length > 0) {
        reader.readAsDataURL(fileInput.files[0]);
    }
});

