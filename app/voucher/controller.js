const Voucher = require("./model");
const Category = require("../category/model");
const Nominal = require("../nominal/model");
const path = require("path");
const fs = require("fs");
const config = require("../../config");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };

      const voucher = await Voucher.find()
        .populate("category")
        .populate("nominals");
      res.render("admin/voucher/view_voucher", {
        voucher,
        alert,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },

  viewCreate: async (req, res) => {
    try {
      const categories = await Category.find();
      const nominals = await Nominal.find();
      res.render("admin/voucher/create", {
        categories,
        nominals,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { name, category, nominals } = req.body;

      if (req.file) {
        let tmp_path = req.file.path;
        let originalExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];

        let filename = req.file.filename + "." + originalExt;
        let targetPath = path.resolve(
          config.rootPath,
          `public/uploads/${filename}`
        );

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(targetPath);

        src.pipe(dest);

        src.on("end", async () => {
          try {
            const voucher = new Voucher({
              name,
              category,
              nominals,
              thumbnail: filename,
            });

            await voucher.save();

            req.flash("alertMessage", "Berhasil ditambah");
            req.flash("alertStatus", "success");

            res.redirect("/voucher");
          } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/voucher");
          }
        });
      } else {
        const voucher = new Voucher({
          name,
          category,
          nominals,
        });

        await voucher.save();

        req.flash("alertMessage", "Berhasil ditambah");
        req.flash("alertStatus", "success");

        res.redirect("/voucher");
      }
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },

  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const voucher = await Voucher.findOne({ _id: id })
        .populate("category")
        .populate("nominals");
      const categories = await Category.find();
      const nominals = await Nominal.find();
      res.render("admin/voucher/edit", {
        voucher,
        categories,
        nominals,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },

  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, category, nominals } = req.body;

      if (req.file) {
        let tmp_path = req.file.path;
        let originalExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];

        let filename = req.file.filename + "." + originalExt;
        let targetPath = path.resolve(
          config.rootPath,
          `public/uploads/${filename}`
        );

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(targetPath);

        src.pipe(dest);

        src.on("end", async () => {
          try {
            const voucher = await Voucher.findOne({ _id: id });

            let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;

            if (fs.existsSync(currentImage)) {
              fs.unlinkSync(currentImage);
            }
            await Voucher.findOneAndUpdate(
              {
                _id: id,
              },
              {
                name,
                category,
                nominals,
                thumbnail: filename,
              }
            );

            req.flash("alertMessage", "Berhasil diupdate");
            req.flash("alertStatus", "success");

            res.redirect("/voucher");
          } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/voucher");
          }
        });
      } else {
        await Voucher.findOneAndUpdate(
          {
            _id: id,
          },
          {
            name,
            category,
            nominals,
          }
        );

        req.flash("alertMessage", "Berhasil diupdate");
        req.flash("alertStatus", "success");

        res.redirect("/voucher");
      }
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      const voucher = await Voucher.findOneAndRemove({
        _id: id,
      });

      let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;

      if (fs.existsSync(currentImage)) {
        fs.unlinkSync(currentImage);
      }

      req.flash("alertMessage", "Berhasil dihapus");
      req.flash("alertStatus", "success");

      res.redirect("/voucher");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },

  actionStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const voucher = await Voucher.findOne({ _id: id });

      let status = "Y";

      if (voucher.status === "Y") {
        status = "N";
      }

      await Voucher.findOneAndUpdate(
        {
          _id: id,
        },
        { status }
      );

      req.flash("alertMessage", "Berhasil diupdate");
      req.flash("alertStatus", "success");

      res.redirect("/voucher");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },
};
