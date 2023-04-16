const { spawn } = require("child_process");

class CheckIn {
  constructor(data = {}) {
    this.data = data;
  }

  get checkin() {
    const { checkin } = this.data;

    if (!checkin?.flavours?.length) {
      checkin.flavours = null;
    }

    if (!checkin?.badges?.length) {
      checkin.badges = null;
    }

    return checkin;
  }

  get beer() {
    return this.data.beer;
  }

  get brewery() {
    return this.data.brewery;
  }

  get venue() {
    const { venue } = this.data;

    if (venue.name === "Untappd at Home") {
      venue.name = "Home";
    }

    return venue;
  }

  toJSON() {
    return {
      checkin: {
        id: this.checkin.id,
        date: this.checkin.date,
        rating: this.checkin.rating,
        format: this.checkin.format,
        badges: this.checkin.badges,
        flavours: this.checkin.flavours,
      },
      beer: {
        name: this.beer.name,
      },
      brewery: {
        name: this.brewery.name,
      },
    };
  }

  static async fetchAll() {
    const data = await new Promise((resolve, reject) => {
      const data = [];
      const bin = process.env.BEER_CHECKIN_BIN_PATH;
      const child = spawn(bin);

      child.stdout.on("data", (chunk) => {
        data.push(chunk.toString());
      });

      child.on("close", (code) => {
        if (code !== 0) {
          reject(new Error(`child process exited with code ${code}`));
        }

        resolve(data.join(""));
      });

      child.on("error", (err) => {
        reject(err);
      });
    });

    return JSON.parse(data).map((item) => new CheckIn(item));
  }
}

module.exports = CheckIn;
