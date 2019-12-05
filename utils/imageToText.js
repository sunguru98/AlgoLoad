const Tesseract = require('tesseract.js')

module.exports = async images => {
  const buffers = images.map(image => ({
    buffer: image.buffer,
    name: image.originalname
  }))
  try {
    const res = await Promise.all(
      buffers.map(buffer => Tesseract.recognize(buffer.buffer, 'eng'))
    )
    return res.map(r => r.data.text)
  } catch (err) {
    throw err
  }
}
