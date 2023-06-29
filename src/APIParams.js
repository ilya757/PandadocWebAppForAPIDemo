const body = {
  name: "API Sample Document from PandaDoc Template",
  template_uuid: "SYWVgGTpAve3xYtyvQNJ34",
  tags: ["tag_1", "tag_2"],
  recipients: [
    {
      email: "apiexample@pandadoc.com",
      first_name: "Jane",
      last_name: "Doe",
      role: "signer"
    }
  ],
  tokens: [
    {
      name: "Favorite.Pet",
      value: "Panda"
    }
  ],
  fields: {
    "Favorite.Color": {
      value: "PandaDoc green",
      title: "Favorite.Color"
    },
    Delivery: {
      value: "Same Day Delivery",
      title: "Delivery"
    },
    Like: {
      value: true
    },
    Date: {
      value: "2019-12-31T00:00:00.000Z"
    }
  },
  metadata: {
    opp_id: "123456",
    my_favorite_pet: "Panda"
  },
  pricing_tables: [
    {
      name: "PricingTable1",
      options: {
        currency: "USD",
        discount: {
          is_global: true,
          type: "absolute",
          name: "Global Discount",
          value: 2.26
        }
      },
      sections: [
        {
          title: "Sample Section",
          default: true,
          rows: [
            {
              options: {
                optional: true,
                optional_selected: true,
                qty_editable: true
              },
              data: {
                name: "Toy Panda",
                description: "Fluffy!",
                price: 10,
                qty: 3,
                tax_first: {
                  value: 7.5,
                  type: "percent"
                }
              },
              custom_fields: {
                Fluffiness: "5 / 5"
              }
            }
          ]
        }
      ]
    }
  ]
};

const reqConfig = {
  headers: {
    Authorization: "API-Key 3cf111919d5dd7b98daa82c96cff315c8f5133f7",
    "Content-Type": "application/json"
  }
};

export { body, reqConfig };
