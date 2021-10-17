exports.seed = function (knex) {
  return knex("plants").insert([
    {
      nickname: "Zuni",
      species: "Yucca",
      h2oFrequency: "About once every 10 days",
      img_URL:
        "https://images.unsplash.com/photo-1585738876562-7d008f53022a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1944&q=80",
      owner: 1
    },
    {
      nickname: "",
      species: "Aloe",
      h2oFrequency: "About every 3 weeks",
      img_URL: "https://cdn.pixabay.com/photo/2018/01/25/04/15/cactus-3105368_1280.jpg",
      owner: 1
    },
    { nickname: "David", species: "ZZ Plant", h2oFrequency: "Every 2-3 weeks", img_URL: null, owner: 1 },
    {
      nickname: "Fig",
      species: "Fiddle-Leaf Fig",
      h2oFrequency: "Once a week - 10 days",
      img_URL:
        "https://images.unsplash.com/photo-1545239705-1564e58b9e4a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3195&q=80",
      owner: 2
    },
    {
      nickname: "Jasmine",
      species: "Persian Shield",
      h2oFrequency: "Twice a week",
      img_URL:
        "https://images.unsplash.com/photo-1597509048658-0f921c198a1d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3072&q=80",
      owner: 2
    }
  ]);
};
