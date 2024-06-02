document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const fileInput = document.getElementById('file');
    var photo=document.getElementById('file').files[0];
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    console.log(price + "asdasd");
    const reader = new FileReader();
    reader.onload = async function (e) {
        const imageUrl = e.target.result;

        const newPost = {
            postTitle: title,
            photo_url: "",
            price: price,
            discription: description,
            date: new Date().toISOString()
        };

        var response = await fetch('/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        })

        var formData = new FormData();
        formData.append('file', photo);
        formData.append('title', title);
        console.log(formData)
        var response = await fetch('/photo',{
            method: 'POST',
            body: formData
        });
        document.getElementById('postForm').reset();
        window.location.href = 'index.html';
    }

    if (fileInput.files.length > 0) {
        reader.readAsDataURL(fileInput.files[0]);
    }
});

