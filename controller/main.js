const mainModel = require('../models/main');
const Cities = require('../models/cities');
const mainController = {};

mainController.index = (req,res) => {
  console.log('inside index method')
  mainModel.findAll()
    .then(data => {
      console.log('this is currencies: ', data)
      res.render('index', {
        currencies: data,

      })

    })
    .catch(err => {
      console.log("were hitting an error")
      res.status(400).json(err);

    });

}

mainController.each = (req,res) => {
  mainModel.findById(req.params.id)
  .then(data => {
      console.log(`What are giving, db? In each... ${data}`)
      Cities.findAll(req.params.id)
      .then(cities => {
        console.log(`${JSON.stringify(cities)} is top 5 city data & this is the targeted country code ${data.ccode}`)
        res.render('show', {
          currencies: data,
          countrycode: data.ccode,
          top5: cities

        })

      })
      .catch(err => {
        console.log("got an error from the each controller")
        res.status(400).json(err);

      })

    })
    .catch(err => {
      console.log("got an error from the each controller")
      res.status(400).json(err);

    });

}

mainController.edit = (req,res) => {
  console.log('inside edit method controller')
  mainModel.findById(req.params.id)
      .then(data => {
        console.log(`this is currencies: ${JSON.stringify(data)}`),
        res.render('edit', {currencies: data})
      })
      .catch(err => {
        console.log("got an error from the edit controller")
        res.status(400).json(err);

      });

};

mainController.editAll = (req,res) => {
  console.log('inside edit method controller')
  mainModel.findAll()
    .then(data => {
      console.log(`this is currencies: ${JSON.stringify(data)}`),
      res.render('editAll', {
        currencies: data,

      })
    })
    .catch(err => {
      console.log("got an error from the edit controller")
      res.status(400).json(err);

    });

};

mainController.create = (req,res) => {
  console.log(`at add method controller`)
    mainModel.create( {
      symbol: req.body.symbol,
      country: req.body.country,
      gfxcode: req.body.gfxcode

    })
    .then( data => {
      res.redirect(`/${data.id}`);

    })
    .catch(err => {
      console.log('Got an error in the create controller');
      res.status(400).json(err);

    });

};

mainController.update = (req,res) => {
  mainModel.update({
    symbol: req.body.symbol,
    country: req.body.country,
    gfxcode: req.body.gfxcode,
    ccode: req.body.ccode

  }, req.params.id)
  .then(() => {
      res.redirect(`/${req.params.id}`)

  })
  .catch(err => {
    res.status(400).json(err);

  });

};

mainController.delete = (req,res) => {
  mainModel.destroy(req.params.id)
  .then(() => {
    res.redirect(`/`);

  })
  .catch(err => {
    res.status(400).json(err);

  });

};

module.exports = mainController;
