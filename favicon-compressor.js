document.getElementById('faviconForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const file = document.getElementById('imageInput').files[0];
    const size = parseInt(document.getElementById('sizeSelect').value, 10);
    
    if (!file) return alert("Please upload an image.");

    const img = new Image();
    const reader = new FileReader();

    reader.onload = function (e) {
        img.src = e.target.result;
    };

    img.onload = async function () {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, size, size);

        canvas.toBlob(async function (blob) {
            const arrayBuffer = await blob.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);

            const icoBlob = new Blob([uint8Array], { type: 'image/x-icon' });
            const url = URL.createObjectURL(icoBlob);

            const link = document.createElement('a');
            link.href = url;
            link.download = "favicon.ico";
            link.textContent = `Download ${size}x${size} Favicon (.ico)`;
            link.style.display = "block";

            const container = document.getElementById("downloadLinkContainer");
            container.innerHTML = "";
            container.appendChild(link);
        }, "image/x-icon", 0.9);
    };

    reader.readAsDataURL(file);
});
