// script.js
document.addEventListener('DOMContentLoaded', function () {
    const image = document.getElementById('image');
    const input = document.getElementById('imageInput');
    const cropBtn = document.getElementById('cropBtn');
    let cropper;

    input.addEventListener('change', function (e) {
        const files = e.target.files;
        if (files && files.length > 0) {
            const reader = new FileReader();
            reader.onload = function (e) {
                image.src = e.target.result;
                if (cropper) {
                    cropper.destroy();
                }
                cropper = new Cropper(image, {
                    aspectRatio: NaN,
                });
            };
            reader.readAsDataURL(files[0]);
        }
    });

    cropBtn.addEventListener('click', function () {
        const width = parseInt(document.getElementById('width').value);
        const height = parseInt(document.getElementById('height').value);
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
});
