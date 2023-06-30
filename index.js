const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express()
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'client')))

const publicKey = "BOQdADwEcpRQwOkfVopw8sn7tcslNyqmZQdql8peYS9jaUG6qlzf5X-cpo6rJhQWOWpdwomMRJxXvU80BUP4UIE"
const privateKey = "QkdjYalj5kJQ8qgn0WQFFzW-IalElhtzXLuml-Bf4pw"

webPush.setVapidDetails("mailto:mrtarek131@gmail.com", publicKey, privateKey)

// subscription route
app.post('/subscribe', (req, res) => {
  const subscription = req.body
  
  res.status(201).json({})

  // payload
  const payload = JSON.stringify({title: "push Test"})

  webPush.sendNotification(subscription, payload).catch(err => console.log(err))
  
})

app.listen(3000, console.log("running on 3000"))
