// script.js
document.addEventListener('DOMContentLoaded', function () {
    const image = document.getElementById('image');
    const input = document.getElementById('imageInput');
    const cropBtn = document.getElementById('cropBtn');
    const aspectRatioSelect = document.getElementById('aspectRatio');
    let cropper;

    input.addEventListener('change', function (e) {
        const files = e.target.files;
        if (files && files.length > 0) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const tempImage = new Image();
                tempImage.src = e.target.result;
                tempImage.onload = function () {
                    const MAX_SIZE = 1024; // Max size in pixels
                    let width = tempImage.width;
                    let height = tempImage.height;

                    // Resize if larger than MAX_SIZE
                    if (width > MAX_SIZE || height > MAX_SIZE) {
                        const scaleFactor = Math.min(MAX_SIZE / width, MAX_SIZE / height);
                        width *= scaleFactor;
                        height *= scaleFactor;
                    }

                    // Create canvas to resize the image
                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(tempImage, 0, 0, width, height);
                    
                    image.src = canvas.toDataURL('image/png');
                    initializeCropper();
                };
            };
            reader.readAsDataURL(files[0]);
        }
    });

    aspectRatioSelect.addEventListener('change', function () {
        const aspectRatio = eval(this.value);
        if (cropper) {
            cropper.setAspectRatio(aspectRatio);
        }
    });

    cropBtn.addEventListener('click', function () {
        const width = parseInt(document.getElementById('width').value);
        const height = parseInt(document.getElementById('height').value);

        if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
            alert("Please enter valid width and height values.");
            return;
        }

        const croppedCanvas = cropper.getCroppedCanvas({
            width: width,
            height: height
        });

        if (croppedCanvas) {
            const croppedImage = document.createElement('img');
            croppedImage.src = croppedCanvas.toDataURL('image/png');
            document.getElementById('croppedImages').appendChild(croppedImage);
        }
    });

    function initializeCropper() {
        if (cropper) {
            cropper.destroy();
        }
        cropper = new Cropper(image, {
            aspectRatio: NaN,
        });
    }
});
