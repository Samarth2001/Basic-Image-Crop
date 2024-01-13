
const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/crop', upload.single('image'), async (req, res) => {
    try {
        const { width, height } = req.body;
        const croppedImage = await sharp(req.file.path)
            .resize(parseInt(width), parseInt(height))
            .toBuffer();
        
        // Send cropped image as response
        res.type('image/png').send(croppedImage);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing image');
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
