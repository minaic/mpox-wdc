console.log("This is working!");

(function () {
  var myConnector = tableau.makeConnector();

  myConnector.getSchema = function (schemaCallback) {
    const covidCols = [
      {
        id: "location",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "date",
        dataType: tableau.dataTypeEnum.date,
      },
      {
        id: "iso_code",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "total_cases",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "total_deaths",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "new_cases",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "new_deaths",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "new_cases_smoothed",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "new_deaths_smoothed",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "new_cases_per_million",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "total_cases_per_million",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "total_cases_per_million",
        dataType: tableau.dataTypeEnum.int,
      },
       {
        id: "new_cases_smoothed_per_million",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "new_deaths_per_million",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "total_deaths_per_million",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "new_deaths_smoothed_per_million",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "suspected_cases_cumulative",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "annotation",
        dataType: tableau.dataTypeEnum.int,
      },
    ];

    let covidTableSchema = {
      id: "RIVM",
      alias: "Dutch Corona Cases since start",
      columns: covidCols,
    };

    schemaCallback([covidTableSchema]);
  };

  myConnector.getData = function (table, doneCallback) {
    let tableData = [];
    var i = 0;

    $.getJSON(
      "https://data.rivm.nl/covid-19/COVID-19_aantallen_gemeente_cumulatief.json",
      function (resp) {
        // Iterate over the JSON object
        for (i = 0, len = resp.length; i < len; i++) {
          tableData.push({
            location: resp[i].location,
            date: resp[i].date,
            iso_code: resp[i].iso_code,
            total_cases: resp[i].total_cases,
            total_deaths: resp[i].total_deaths,
            new_cases: resp[i].new_cases,
            new_deaths: resp[i].new_deaths,
            new_cases_smoothed: resp[i].new_cases_smoothed,
            new_deaths_smoothed: resp[i].new_deaths_smoothed,
            new_cases_per_million: resp[i].new_cases_per_million,
            total_cases_per_million: resp[i].total_cases_per_million,
            new_cases_smoothed_per_million: resp[i].new_cases_smoothed_per_million,
            new_deaths_per_million: resp[i].new_deaths_per_million,
            total_deaths_per_million: resp[i].total_deaths_per_million,
            new_deaths_smoothed_per_million: resp[i].new_deaths_smoothed_per_million,
            suspected_cases_cumulative: resp[i].suspected_cases_cumulative,
            annotation: resp[i].annotation,
          });
        }
        table.appendRows(tableData);
        doneCallback();
      }
    );
  };

  tableau.registerConnector(myConnector);
})();

document.querySelector("#getData").addEventListener("click", getData);

function getData() {
  tableau.connectionName = "Dutch Corona Numbers";
  tableau.submit();
}
