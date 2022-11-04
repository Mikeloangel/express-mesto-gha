module.exports.validateUrlObject = {
  validate: {
    validator: (v) => /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(v),
    message: props => `${props.value} не верный адрес!`
  }
}