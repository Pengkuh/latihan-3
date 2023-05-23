const db = require("../models/index.js");

const Biodata = db.biodata;



exports.create = (req, res) => {
  // validate request
  if (!req.body.nama) {
    res.status(400).send({
      message: "Kosong Bray"
    });
    return;
  }

  // create biodata 
  const biodata = {
    nama: req.body.nama,
    tempat_lahir: req.body.tempat_lahir,
    tanggal_lahir: req.body.tanggal_lahir,
    alamat: req.body.alamat,
  };

  Biodata.create(biodata)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error insert bray"
      });
      console.log(err);
    });
};

// query all
exports.findAll = (req, res) => {
  Biodata.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error while retrieving books.',
      });
    });
}

// Find a single data 
exports.findOne = (req, res) => {
  const { id_biodata } = req.params;
  Biodata.findOne({
    where: {
      id_biodata,
    },
  }).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send({
      message: err.message || 'Error while retrieving books.',
    });
  });
}

// Delete
exports.delete = (req, res) => {
  const { id_biodata } = req.params;
  Biodata.destroy({
    where: {
      id_biodata,
    }
  }).then(
    res.send({
      message: `Success delete book with id_biodata ${id_biodata}`,
    })
  ).catch((err) => {
    res.status(500).send({
      message: `Could not delete book with id ${id},`
    });
  });
}

// Update
exports.put = (req, res) => {
  try {
    const { id_biodata } = req.params;
    const { nama, tempat_lahir, tanggal_lahir, alamat } = req.body;

    // Melakukan pembaruan data biodata berdasarkan id_biodata
    const updatedBiodata = Biodata.update(
      {
        nama,
        tempat_lahir,
        tanggal_lahir,
        alamat
      },
      {
        where: { id_biodata }
      }
    );



    if (updatedBiodata === null) {
      return res.status(404).json({ message: 'Data biodata tidak ditemukan.' });
    }

    res.json({ message: 'Data biodata berhasil diperbarui.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui data biodata.' });
  }
}


// FInd single book with title
exports.findBioNama = (req, res) => {
  db.sequelize.query('SELECT * FROM tb_biodata WHERE nama = :nama', {
    replacements: {
      nama: req.params.nama
    },
    type: db.sequelize.QueryTypes.SELECT
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error while finding book.',
      });
    });
}

exports.findBioId = (req, res) => {
  db.sequelize.query('SELECT * FROM tb_biodata WHERE id_biodata = :id_biodata', {
    replacements: {
      id_biodata: req.params.id_biodata
    },
    type: db.sequelize.QueryTypes.SELECT,
  })
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Error while finding book.'
      });
    });
};