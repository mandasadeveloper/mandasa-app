import mysql from "mysql";
import { Shopify } from "@shopify/shopify-api";
import {
  Customer,
  Asset,
  Page,
  Theme,
} from "@shopify/shopify-api/dist/rest-resources/2022-04/index.js";
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "customer_dashboard",
});

export const Config = (app) => {
  app.get("/get-data", async (req, res) => {
    const shop = req.query.shop;
    const query = req.query.query;
    db.query(`SELECT * FROM ${query} WHERE shop = ?`, shop, (err, result) => {
      if (err) {
        console.log(err);
      }
      res.status(200).send(result);
    });
  });

  app.get("/get-profile-additional-fields", async (req, res) => {
    const shop = req.query.shop;
    db.query(
      `SELECT * FROM profile_additional_fields WHERE shop = ? ORDER BY orderby`,
      shop,
      (err, result) => {
        if (err) {
          console.log(err);
        }
        res.status(200).send(result);
      }
    );
  });

  app.get("/get-customers", async (req, res) => {
    const shop = req.query.shop;
    const test_session = await Shopify.Utils.loadOfflineSession(shop);
    const customers = await Customer.all({
      session: test_session,
    });
    res.send(customers);
  });

  //get single customer
  app.get("/get-customer/:id", async (req, res) => {
    const id = req.params.id;
    const shop = req.query.shop;
    const test_session = await Shopify.Utils.loadOfflineSession(shop);
    const customer = await Customer.find({
      session: test_session,
      id: id,
    });
    res.status(200).send(customer);
  });

  app.get("/get-pages", async (req, res) => {
    const shop = req.query.shop;
    const test_session = await Shopify.Utils.loadOfflineSession(shop);
    const data = await Page.all({
      session: test_session,
    });
    res.status(200).send(data);
  });

  app.get("/get-single-data/:id", async (req, res) => {
    const id = req.params.id;
    const shop = req.query.shop;
    const query = req.query.query;
    db.query(
      `SELECT * FROM ${query} WHERE shop = ? AND id = ?`,
      [shop, id],
      async (err, result) => {
        if (err) console.log(err);
        else {
          res.status(200).send(result);
        }
      }
    );
  });

  app.get("/get-theme-id", async (req, res) => {
    const shop = req.query.shop;
    db.query(
      `SELECT theme_id FROM theme WHERE shop = ?`,
      shop,
      (err, result) => {
        if (err) console.log(err);
        else {
          res.status(200).send(result);
        }
      }
    );
  });

  app.post("/theme-id", async (req, res) => {
    const shop = req.query.shop;
    const query = req.query.query;
    const theme_id = req.body.data;
    db.query(
      `SELECT theme_id FROM theme WHERE shop = ?`,
      shop,
      (err, result) => {
        if (result.length === 0) {
          db.query(
            `INSERT INTO theme (theme_id, shop) VALUES (?,?)`,
            [theme_id, shop],
            (err, response) => {
              if (err) {
                res.send(err);
              }
              res.status(200).send("Translations installed");
            }
          );
        } else {
          db.query(
            `UPDATE theme SET theme_id = '${theme_id}'  WHERE shop = ?`,
            shop,
            (err, result) => {
              if (err) {
                console.log(err);
              }
              res.status(200).send("Translations installed");
            }
          );
        }
      }
    );
  });

  // post query
  app.post("/post-reorder-fields", async (req, res) => {
    const shop = req.query.shop;
    const query = req.query.query;
    const fields = JSON.stringify(req.body);
    db.query(
      `SELECT shop FROM ${query} WHERE shop = ?`,
      shop,
      (err, result) => {
        if (result.length === 0) {
          db.query(
            `INSERT INTO ${query} (fields, shop) VALUES (?,?)`,
            [fields, shop],
            (err, response) => {
              if (err) res.send(err);
              else res.status(200).send(response);
            }
          );
        } else {
          db.query(
            `UPDATE ${query} SET fields = '${fields}'  WHERE shop = ?`,
            shop,
            (err, result) => {
              if (err) console.log(err);
              else res.status(200).send(result);
            }
          );
        }
      }
    );
  });

  app.post("/create-jsonfile", async (req, res) => {
    const shop = req.query.shop;
    const id = req.query.id;
    const data = JSON.stringify(req.body.value);
    const dir = `locales/${req.body.locale}-CD.json`;
    const test_session = await Shopify.Utils.loadOfflineSession(shop);
    const asset = new Asset({ session: test_session });
    asset.theme_id = id;
    asset.key = dir;
    asset.value = data;
    await asset.save();
    res.status(200).send(asset);
  });

  app.get("/get-main-theme", async (req, res) => {
    const shop = req.query.shop;
    const test_session = await Shopify.Utils.loadOfflineSession(shop);
    const asset = await Theme.all({
      session: test_session,
    });
    res.status(200).send(asset);
  });

  app.get("/get-json", async (req, res) => {
    const shop = req.query.shop;
    const locale = req.query.locale;
    const id = "";
    const test_session = await Shopify.Utils.loadOfflineSession(shop);
    const asset = await Asset.all({
      session: test_session,
      theme_id: id,
      asset: { key: `locales/${locale}-CD.json` },
    });
    res.status(200).send(asset);
  });

  app.post("/post-profile-additional-fields", async (req, res) => {
    const shop = req.query.shop;
    const fields = JSON.stringify(req.body);
    db.query(
      `SELECT orderby FROM profile_additional_fields WHERE shop = ? ORDER BY orderby`,
      shop,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          db.query(
            "INSERT INTO profile_additional_fields (fields, shop, orderby) VALUES (?,?,?)",
            [fields, shop, result.length],
            (err, response) => {
              if (err) {
                res.send(err);
              }
              res.status(200).send("Save");
            }
          );
        }
      }
    );
  });

  app.post("/menu-builder-custome-link", async (req, res) => {
    const shop = req.query.shop;
    const fields = req.body;
    const query = req.query.query;

    db.query(
      `INSERT INTO ${query} (label, value, shop, type) VALUES (?,?,?)`,
      [fields.label, fields.value, shop, fields.type],
      (err, response) => {
        if (err) {
          res.send(err);
        }
        res.status(200).send(response);
      }
    );
  });

  app.post("/put-profile-additional-fields", async (req, res) => {
    const shop = req.query.shop;
    const fields = req.body;
    var result = fields.map((ele, index) => {
      db.query(
        `UPDATE profile_additional_fields SET orderby = ${index}  WHERE id = ? AND shop = ?`,
        [ele.key, shop],
        (err, result) => {
          if (err) console.log(err);
          return result;
        }
      );
    });
    res.status(200).send(result);
  });

  app.post("/update-single-data", async (req, res) => {
    const id = req.query.id;
    const shop = req.query.shop;
    const fields = JSON.stringify(req.body);
    const query = req.query.query;
    db.query(
      `UPDATE ${query} SET fields ='${fields}'  WHERE id = ? AND shop = ?`,
      [id, shop],
      (err, result) => {
        if (err) console.log(err);
        res.status(200).send("update");
      }
    );
  });

  app.post("/graphql-data-access", async (req, res) => {
    const fields = req.body;
    const shop = req.query.shop;
    const test_session = await Shopify.Utils.loadOfflineSession(shop);
    const client = new Shopify.Clients.Graphql(
      test_session.shop,
      test_session.accessToken
    );
    const data = await client.query({
      data: fields,
    });
    res.status(200).send(data);
  });

  app.post("/toggle-value", async (req, res) => {
    const status = req.body.active;
    const shop = req.query.shop;
    const query = req.query.query;
    db.query(
      `UPDATE ${query} SET status ='${status}'  WHERE id = ? AND shop = ?`,
      [1, shop],
      (err, result) => {
        if (err) console.log(err);
        res.status(200).send(result);
      }
    );
  });

  app.post("/delete-data", async (req, res) => {
    const id = req.query.id;
    const shop = req.query.shop;
    const query = req.query.query;
    db.query(
      `DELETE FROM ${query} WHERE id = ? AND shop = ?`,
      [id, shop],
      (err, result) => {
        if (err) {
          console.log(err);
        }
        res.status(200).send(result);
      }
    );
  });

  app.get("/script_tag", async (req, res) => {
    document.getElementsByTagName("Main")[0].innerHTML = "";
  });

  //Customer Dashboard app fronted operation

  app.get("/get-customer/", async (req, res) => {
    const id = 5763078651963;
    const shop = "electronicbiz.myshopify.com";
    const test_session = await Shopify.Utils.loadOfflineSession(shop);
    const customer = new Customer({ session: test_session });
    customer.id = id;
    customer.first_name = "mandasa";
    await customer.save({
      update: true,
    });
    res.status(200).send(customer);
  });
};
