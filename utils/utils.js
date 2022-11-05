//url validation object for mongoose Schema
module.exports.validateUrlObject = {
  //eslint-disable-next-line
  validator: (v) => /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi.test(v),
  message: props => `${props.value} неверный адрес!`
}