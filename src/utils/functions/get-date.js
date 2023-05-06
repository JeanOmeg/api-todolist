function getDate() {
  const date = new Date(Date.now()).toLocaleString('pt-BR', {
    hour12: false,
  })
  return date
}

module.exports = {
  getDate,
}
