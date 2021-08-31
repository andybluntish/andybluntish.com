const BLANK_VALUE = "-";

function uniq(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return [...new Set(value)];
}

function abv(value) {
  let abv = Number(value);

  if (!value || Number.isNaN(abv)) {
    abv = 0;
  } else {
    abv = abv / 100;
  }

  return new Intl.NumberFormat("en-AU", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(abv);
}

function ibu(value = 0) {
  const ibu = Math.round(value);

  if (Number.isNaN(ibu) || !ibu) {
    return BLANK_VALUE;
  } else {
    return ibu;
  }
}

function ebc(value = 0) {
  const ebc = Number(value) * 1.97;

  if (Number.isNaN(ebc) || !ebc) {
    return BLANK_VALUE;
  } else {
    return ebc.toFixed(1);
  }
}

function fermentables(data = []) {
  const fermentables = data.map((d) => d?.name).map(normaliseFermentable);

  return uniq(fermentables).filter(Boolean);
}

function normaliseFermentable(value) {
  value = value.replace(" - ", " ");
  value = value.replace("Liquid Extract", "LME");
  value = value.replace("Dry Extract", "DME");
  value = value.replace("Caramel/Crystal", "Crystal");
  value = value.replace(
    /\((Barrett Burston|Weyermann|Simpsons|Muntons|Briess|Joe White|Bairds)\)/,
    ""
  );
  value = value.replace("Gladfield", "");
  value = value.replace(
    /(Crystal|Munich), (Medium|Light)/,
    (_, $1, $2) => `${$2} ${$1}`
  );
  value = value.replace("(2 Row) US", "");
  value = value.replace("(Beet) ", "");
  value = value.replace("Corn Sugar (Dextrose)", "Dextrose");
  value = value.replace("Milk Sugar (Lactose)", "Lactose");
  value = value.replace("Sugar, Table (Sucrose)", "Cane Sugar");
  value = value.replace("Black (Patent)", "Black Patent");
  value = value.replace("Black Malt 2-Row", "Black Malt");
  value = value.replace("/Dextrine", "");
  value = value.replace(", Traditional Ale", "");
  value = value.replace(", Malt Craft Export", " Malt");
  value = value.replace("/Carafoam", "");
  value = value.replace("®™", "");
  value = value.replace(
    /(Pale Ale, Golden Promise|Pale Malt, Ale|Pale Malt, Maris Otter|Pale Ale, Finest Maris Otter)/,
    "Pale Ale Malt"
  );
  value = value.replace("Oats, Flaked", "Flaked Oats");
  value = value.trim();

  switch (value) {
    default:
      return value;
  }
}

function hops(data = []) {
  const hops = data.map((d) => d?.name).map(normaliseHop);

  return uniq(hops).filter(Boolean);
}

function normaliseHop(value) {
  value = value.replace(" (EKG)", "");
  value = value.replace(" (Tomahawk)", "");
  value = value.replace("/Tomahawk/Zeus (CTZ)", "");
  value = value.replace(" (HBC 369)", "");

  switch (value) {
    default:
      return value;
  }
}

function yeasts(data = []) {
  const yeasts = data.map((d) => {
    let { name, productId } = d;
    name = normaliseYeast(name).trim();

    if (!productId || productId === "-") {
      return name;
    }

    return `${name} (${productId})`;
  });

  return uniq(yeasts).filter(Boolean);
}

function normaliseYeast(value) {
  value = value.replace("Yeast", "");

  switch (value) {
    default:
      return value;
  }
}

module.exports = {
  BLANK_VALUE,
  uniq,
  abv,
  ibu,
  ebc,
  fermentables,
  hops,
  yeasts,
};
