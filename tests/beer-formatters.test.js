const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const formatters = require("../lib/beer/formatters");

describe("uniq", () => {
  const { uniq } = formatters;

  it('returns an empty array with "empty" input', () => {
    assert.deepStrictEqual(uniq(undefined), []);
    assert.deepStrictEqual(uniq(null), []);
    assert.deepStrictEqual(uniq(false), []);
    assert.deepStrictEqual(uniq({ array: false }), []);
  });

  it("returns a unique array unmodified", () => {
    const list = [1, 2, 3, "a", "b", "c"];

    assert.deepStrictEqual(uniq(list), list);
  });

  it("removes duplicates from an array", () => {
    const list = [1, 2, 3, 2, "1", "a", "b", 3, "c"];
    const expected = [1, 2, 3, "1", "a", "b", "c"];

    assert.deepStrictEqual(uniq(list), expected);
  });
});

describe("abv", () => {
  const { abv } = formatters;

  it("returns the blank value when input is empty or not a number", () => {
    assert.strictEqual(abv(undefined), "0.0%");
    assert.strictEqual(abv(null), "0.0%");
    assert.strictEqual(abv(false), "0.0%");
    assert.strictEqual(abv("nope"), "0.0%");
  });

  it("returns number as a percentage", () => {
    assert.strictEqual(abv(0), "0.0%");
    assert.strictEqual(abv(4), "4.0%");
    assert.strictEqual(abv(5.2), "5.2%");
    assert.strictEqual(abv(6.69), "6.7%");
    assert.strictEqual(abv("3.2"), "3.2%");
  });
});

describe("ibu", () => {
  const { ibu, BLANK_VALUE } = formatters;

  it("returns the blank value when input is empty or not a number", () => {
    assert.strictEqual(ibu(0), BLANK_VALUE);
    assert.strictEqual(ibu(undefined), BLANK_VALUE);
    assert.strictEqual(ibu(null), BLANK_VALUE);
    assert.strictEqual(ibu(false), BLANK_VALUE);
    assert.strictEqual(ibu("nope"), BLANK_VALUE);
  });

  it("returns number rounded to the nearest integer", () => {
    assert.strictEqual(ibu(23.2), 23);
    assert.strictEqual(ibu(23.6), 24);
    assert.strictEqual(ibu("75.2"), 75);
  });
});

describe("ebc", () => {
  const { ebc, BLANK_VALUE } = formatters;

  it("returns the blank value when input is empty or not a number", () => {
    assert.strictEqual(ebc(0), BLANK_VALUE);
    assert.strictEqual(ebc(undefined), BLANK_VALUE);
    assert.strictEqual(ebc(null), BLANK_VALUE);
    assert.strictEqual(ebc(false), BLANK_VALUE);
    assert.strictEqual(ebc("nope"), BLANK_VALUE);
  });

  it("converts input from SRM to EBC", () => {
    assert.strictEqual(ebc(15), "29.6");
  });

  it("returns number with one decimal place", () => {
    assert.strictEqual(ebc(30.3122), "59.7");
  });
});

describe("gravity", () => {
  const { gravity, BLANK_VALUE } = formatters;

  it("returns the blank value when input is empty or not a number", () => {
    assert.strictEqual(gravity(0), BLANK_VALUE);
    assert.strictEqual(gravity(undefined), BLANK_VALUE);
    assert.strictEqual(gravity(null), BLANK_VALUE);
    assert.strictEqual(gravity(false), BLANK_VALUE);
    assert.strictEqual(gravity("nope"), BLANK_VALUE);
  });

  it("rounds to three decimal places", () => {
    assert.strictEqual(gravity("1.0123456"), "1.012");
  });
});
