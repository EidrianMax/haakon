module.exports = (req, res, next) => {
  res.status(404).json({ message: 'sorry, this endpoint isn\'t available' })
}
