const Purchases = require('../../db/models/purchases/index');
const _ = require('underscore');

module.exports.getAllPurchases = (req, res) => {
  Purchases.find().then(result => {
    res.send({ data: result });
  }).catch(err => new Error(err));
}

module.exports.createNewPurchases = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.send('Not send data');
  }
  _.mapObject(req.body, (val, key) => {
    if (!val) {
      return res.send('You have not entered data');
    }
  })
  const purchase = new Purchases(req.body);
  purchase.save().then(r => {
    res.send(r);
  }).catch(err => res.send(new Error(err)));
}

module.exports.updatePurchasesInfo = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.send('Not send data');
  }
  const { _id, text, date, price } = req.body;
  Purchases.updateOne(
    { _id },
    { text, date, price },
  ).then(r => {
    res.send(r);
  }).catch(err => res.send(new Error(err)));
}

module.exports.deletePurchase = (req, res) => {
  if (req.params.id) {
    Purchases.deleteOne({
      _id: req.params.id
    }
    ).then(r => {
      res.send(r);
    }).catch(err => res.send(new Error(err)));
  } else {
    res.send('Not id')
  }
}