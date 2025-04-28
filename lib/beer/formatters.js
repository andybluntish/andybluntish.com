export const BLANK_VALUE = "-";

export function uniq(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return [...new Set(value)];
}

export function abv(value) {
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

export function ibu(value = 0) {
  const ibu = Math.round(value);

  if (Number.isNaN(ibu) || !ibu) {
    return;
  } else {
    return ibu;
  }
}

export function ebc(value = 0) {
  const ebc = Number(value) * 1.97;

  if (Number.isNaN(ebc) || !ebc) {
    return;
  } else {
    return ebc.toFixed(1);
  }
}

export function gravity(value = 0) {
  const gravity = Number.parseFloat(value);

  if (Number.isNaN(gravity) || !gravity) {
    return;
  } else {
    return gravity.toFixed(3);
  }
}

function compareAmounts(a, b) {
  if (a.amount < b.amount) {
    return -1;
  }

  if (a.amount > b.amount) {
    return 1;
  }

  return 0;
}

export function fermentables(data = []) {
  const fermentables = Object.values(data)
    .sort(compareAmounts)
    .reverse()
    .map((d) => d?.name)
    .map(normaliseFermentable);

  return uniq(fermentables).filter(Boolean);
}

function normaliseFermentable(value) {
  value = value.replace(" - ", " ");
  value = value.replace("Liquid Extract", "LME");
  value = value.replace("Dry Extract", "DME");
  value = value.replace("Caramel/Crystal", "Crystal");
  value = value.replace(
    /\((Barrett Burston|Weyermann|Simpsons|Muntons|Briess|Joe White|Bairds)\)/,
    "",
  );
  value = value.replace("Gladfield", "");
  value = value.replace(
    /(Crystal|Munich), (Medium|Light)/,
    (_, $1, $2) => `${$2} ${$1}`,
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
  value = value.replace("Coopers", "");
  value = value.replace("Premium", "");
  value = value.replace("®™", "");
  value = value.replace(
    /(Pale Ale, Golden Promise|Pale Malt, Ale|Pale Malt, Maris Otter|Pale Ale, Finest Maris Otter|Pale Malt)/,
    "Pale Ale",
  );
  value = value.replace(
    /(Ale|Munich|Vienna|Pilsner|Chocolate|Aromatic|Midnight Wheat|German Pilsener|Brown|Black|Maris Otter|Black Patent|Crystal|Aurora|Gladiator|Red Back|Supernova|Biscuit) Malt/,
    "$1",
  );
  value = value.replace("Oats, Flaked", "Flaked Oats");
  value = value.replace("Rice, Flaked", "Flaked Rice");
  value = value.replace("Barley, Flaked", "Flaked Barley");
  value = value.replace("Candi Syrup, D-180", "Candi Syrup (D-180)");

  value = value.trim();

  switch (value) {
    default:
      return value;
  }
}

export function hops(data = []) {
  const hops = Object.values(data)
    .sort(compareAmounts)
    .reverse()
    .map((d) => d?.name)
    .map(normaliseHop);

  return uniq(hops).filter(Boolean);
}

function normaliseHop(value) {
  value = value.replace(" (EKG)", "");
  value = value.replace(" (Tomahawk)", "");
  value = value.replace("/Tomahawk/Zeus (CTZ)", "");
  value = value.replace("Hallertau Magnum", "Magnum");
  value = value.replace(" (HBC 369)", "");

  switch (value) {
    default:
      return value;
  }
}

export function yeasts(data = []) {
  const yeasts = Object.values(data)
    .sort(compareAmounts)
    .reverse()
    .map((d) => {
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
