let players = []

export default players

export function addPlayer(username) {
  players.push({
    username: username,
    pad: 0,
    x: 100,
    y: 100,
    size: 200
  })
}
