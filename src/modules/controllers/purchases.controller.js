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
  let { ...obj } = req.body;
  if (obj.date) {
    obj.date = obj.date.split('-').reverse();
    obj.date = `${obj.date[0]}-${obj.date[1]}-${obj.date[2]}`;
  }
  else {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    obj.date = `${("0" + day).slice(-2)}-${("0" + month).slice(-2)}-${year}`;
  }

  Purchases.updateOne(
    { _id: obj._id },
    { ...obj },
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