$(document).ready(function () {
  // Function to fetch cryptocurrency prices from Binance API
  function getCryptoPrices() {
    // Array of cryptocurrency symbols and corresponding HTML IDs
    var cryptoData = [
      { symbol: "BTCUSDT", id: "bitcoin-price" },
      { symbol: "ETHUSDT", id: "ethereum-price" },
      { symbol: "DOGEUSDT", id: "dogecoin-price" },
    ];

    // Iterate through each cryptocurrency data
    cryptoData.forEach(function (data) {
      // Construct API URL
      var apiUrl =
        "https://api.binance.com/api/v3/ticker/price?symbol=" + data.symbol;

      // Make GET request to Binance API
      axios
        .get(apiUrl)
        .then(function (response) {
          // Extract price from API response
          var price = parseFloat(response.data.price).toFixed(3);

          // Initially set color to white
          $("#" + data.id).css("color", "white");

          // Update price on HTML page after 10 seconds
          setTimeout(function () {
            $("#" + data.id).text("$ " + price);

            // Get previous price from element data or default to current price
            var prevPrice =
              parseFloat($("#" + data.id).data("prevPrice")) || price;

            // Update data attribute with current price for next iteration
            $("#" + data.id).data("prevPrice", price);

            // Change color based on price change
            if (price > prevPrice) {
              $("#" + data.id).css("color", "green");
            } else if (price < prevPrice) {
              $("#" + data.id).css("color", "red");
            }
          }, 500); // Update price after 10 seconds
        })
        .catch(function (error) {
          console.log("Error fetching data from Binance API:", error);
        });
    });
  }

  // Call getCryptoPrices function initially
  getCryptoPrices();

  // Call getCryptoPrices function recursively every 10 seconds
  setInterval(getCryptoPrices, 1000); // Change interval to 10000 milliseconds (10 seconds)
});
