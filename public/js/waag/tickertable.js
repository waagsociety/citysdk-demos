WAAG.TickerTable = function TickerTable(data, columns, _domain, graphData) {
  
  
  function init(data, columns, _domain, graphData) {

      var domain=_domain;

      var table = domain.append("table")
        .attr("class", "tickerTable")


      var thead = table.append("thead");
      var tbody = table.append("tbody");

      // create & append the header row
      // thead.append("tr")
      //     .selectAll("th")
      //     .data(columns)
      //     .enter()
      //     .append("th")
      //         .text(function(column) { return column; });

      // create a row for each object in the data
      var rows = tbody.selectAll("tr")
          .data(data)
          .enter()
          .append("tr");

      // create a cell in each row for each column
      var cells = rows.selectAll("td")
          .data(function(row) {
              return columns.map(function(column) {
                  //console.log(column);
                  return {column: column, value: row[column]};
              });
  

  init();
  
  return this;   

};