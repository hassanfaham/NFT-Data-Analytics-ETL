import { Component, OnInit } from "@angular/core";
import { Blockchain } from "app/models/blockchain.model";
import { Collection } from "app/models/collection.model";
import { Nft } from "app/models/nft.model";
import { CollectionserviceService } from "app/services/collectionservice.service";
import * as Highcharts from "highcharts";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  collection?: Collection[];
  blockchain?: Blockchain[];
  nft?: Nft[];

  selectedBlockchain = "";
  selectedCollection = ""; 

  constructor(private collectionserviceService: CollectionserviceService) {}

  ngOnInit() {
    this.retrieveBlockchain();
    // Highcharts.chart("container", this.options);
    //this.createChartLine();
  }

  retrieveBlockchain(): void {
    this.collectionserviceService.getAllBlockchains().subscribe(
      (data) => {
        var jsd = JSON.stringify(data);
        var js = JSON.parse(jsd);
        this.blockchain = js.results;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSelectBlockchain(value: any) {
    console.log(value);
    this.searchCollections();
    // Highcharts.chart("container", this.options);
  }
  onSelectCollection(value: any) {
    console.log(value);
    this.searchNfts();
  }

  searchCollections(): void {
    // this.currentCollection = {};
    //this.currentIndex = -1;
    let currency: any;
    let collections_n_fp: any[] = [];
    let collections_n_v: any[] = [];
    let collections_n_ow: any[] = [];
    let collections_n_it: any[] = [];
    let collections_it_fp: any[] = [];
    let collections_names: any[] = [];

    this.collectionserviceService
      .findByBlockchain(this.selectedBlockchain)
      .subscribe(
        (data) => {
          if (
            this.selectedBlockchain == "ethereum" ||
            this.selectedBlockchain == "polygon"
          ) {
            currency = "eth";
          } else {
            currency = "sol";
          }
          var jsd = JSON.stringify(data);
          var js = JSON.parse(jsd);
          this.collection = js.results;
          console.log(this.collection);
          this.collection.forEach((element) => {
            collections_n_fp.push([element["name"], element["floor_price"]]);
          });

          console.log("cname ", collections_n_fp);
          let optionsBar: any = {
            chart: {
              type: "bar",
            },
            title: {
              text: "Collections By Floor Price",
            },
            xAxis: {
              tickInterval: 1,
              labels: {
                enabled: true,
                formatter: function () {
                  return collections_n_fp[this.value][0];
                },
              },
              title: {
                text: "Collections",
              },
            },
            yAxis: {
              title: {
                text: "Floor Price (" + currency + ")",
              },
            },
            credits: {
              enabled: false,
            },
            series: [
              {
                color: "#39C0C8",
                showInLegend: false,
                data: collections_n_fp, //dynamic data
              },
            ],
          };
          Highcharts.chart("containerBar", optionsBar);

          //SECOND CHART ABOUT COLLECTIONS
          this.collection.forEach((element) => {
            collections_n_v.push([element["name"], element["volume"]]);
          });
          this.collection.forEach((element) => {
            collections_names.push(element["name"]);
          });
          this.collection.forEach((element) => {
            collections_n_ow.push([element["name"], element["Owners"]]);
          });
          this.collection.forEach((element) => {
            collections_n_it.push([element["name"], element["items"]]);
          });

          let optionsColumn: any = {
            chart: {
              type: "column",
            },
            title: {
              text: "Collections By Volume and Owners and Items",
            },
            xAxis: {
              categories: collections_names,
              crosshair: true,
            },

            tooltip: {
              headerFormat:
                '<span style="font-size:10px">{point.key}</span><table>',
              pointFormat:
                '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
              footerFormat: "</table>",
              shared: true,
              useHTML: true,
            },
            plotOptions: {
              column: {
                pointPadding: 0.2,
                borderWidth: 0,
              },
            },
            credits: {
              enabled: false,
            },
            series: [
              {
                name: "Volume (eth)",
                color: "#1AC9E6",
                showInLegend: false,
                data: collections_n_v,
              },
              {
                name: "Owners",
                color: "#19AADE",
                data: collections_n_ow,
              },
              {
                name: "Items",
                color: "#176BA0",
                data: collections_n_it,
              },
            ],
          };
          Highcharts.chart("containerColumn", optionsColumn);
          //SCATTER CHART ABOUT COLLECTIONS
          this.collection.forEach((element) => {
            collections_it_fp.push([element["items"], element["floor_price"]]);
          });

          let optionsScatter: any = {
            chart: {
              type: "scatter",
              zoomType: "xy",
              // width: 700,
            },
            title: {
              text: "Items of collections By Floor price",
            },

            xAxis: {
              title: {
                enabled: true,
                text: "Items",
              },
              startOnTick: true,
              endOnTick: true,
              showLastLabel: true,
            },
            yAxis: {
              title: {
                text: "Floor Price (" + currency + ") ",
              },
            },

            credits: {
              enabled: false,
            },
            plotOptions: {
              scatter: {
                marker: {
                  radius: 5,
                  states: {
                    hover: {
                      enabled: true,
                      lineColor: "rgb(100,100,100)",
                    },
                  },
                },
                states: {
                  hover: {
                    marker: {
                      enabled: false,
                    },
                  },
                },
                tooltip: {
                  headerFormat: "<b>{series.name}</b><br>",
                  pointFormat: "{point.y} (" + currency + "), {point.x}",
                },
              },
            },
            series: [
              {
                color: "#3AC0DA",
                data: collections_it_fp,
                showInLegend: false,

              },
            ],
          };
          Highcharts.chart("containerScatter", optionsScatter);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  searchNfts(): void {
    let currency: any;
    let currencies_n_per: any[] = [];
    let nfts_n_lp: any[] = [];
    this.collectionserviceService
      .findByCollection(this.selectedCollection)
      .subscribe(
        (data) => {
          var jsd = JSON.stringify(data);
          var js = JSON.parse(jsd);
          this.nft = js.results;
          this.nft.forEach((element) => {
            nfts_n_lp.push([element["name"], element["last_price"]]);
            currency = element["currency"];
          });

          console.log("Nname ", nfts_n_lp);

          let optionsBar: any = {
            chart: {
              type: "column",
            },
            title: {
              text: "NFTs By Last Price",
            },
            xAxis: {
              tickInterval: 1,
              labels: {
                enabled: true,
                formatter: function () {
                  return nfts_n_lp[this.value][0];
                },
              },
              title: {
                text: "NFTs",
              },
            },
            yAxis: {
              title: {
                text: "Last Price (" + currency + ")",
              },
            },
            credits: {
              enabled: false,
            },
            series: [
              {
                color: "#39C0C8",
                showInLegend: false,
                data: nfts_n_lp, //dynamic data
              },
            ],
          };
          Highcharts.chart("containerBar", optionsBar);
          let options: any = {
            chart: {
              type: "column",
              width: 1,
              height: 1,
            },
            title: {
              text: "",
            },
            xAxis: {
              title: {
                text: "",
              },
            },
            yAxis: {
              title: {
                text: "",
              },
            },
            credits: {
              enabled: false,
            },
            series: [
              {
                data: [],
                showInLegend: false,
              },
            ],
          };
          Highcharts.chart("containerScatter", options);
          Highcharts.chart("containerColumn", options);

          //PIE CHART ABOUT COLLECTIONS
          let currencies: any[] = [];
          this.nft.forEach((element) => {
            currencies.push(element["currency"]);
          });
          const totalItems = currencies.length;
          const uniqueItems = new Set(currencies);
          uniqueItems.forEach((curCurrency) => {
            const numItems = currencies.filter(
              (currency) => currency === curCurrency
            );
            currencies_n_per.push([
              curCurrency,
              (numItems.length * 100) / totalItems,
            ]);
          });
          console.log("currencies ", currencies_n_per);
          // Make monochrome colors
          var pieColors = (function () {
            var colors = [],
              base = Highcharts.getOptions().colors[0],
              i;

            for (i = 0; i < 10; i += 1) {
              // Start out with a darkened base color (negative brighten), and end
              // up with a much brighter color
              colors.push(
                Highcharts.color(base)
                  .brighten((i - 3) / 7)
                  .get()
              );
            }
            return colors;
          })();
          let optionsPie: any = {
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: "pie",
              // width: 500,
            },
            title: {
              text: "Currencies In One Collection",
            },
            tooltip: {
              pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
            },
            accessibility: {
              point: {
                valueSuffix: "%",
              },
            },
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: "pointer",
                colors: pieColors,
                dataLabels: {
                  enabled: true,
                  format: "<b>{point.name}</b>: {point.percentage:.1f} %",
                },
              },
            },
            credits: {
              enabled: false,
            },
            series: [
              {
                name: "Currencies",
                colorByPoint: true,
                data: currencies_n_per,
                showInLegend: false,

              },
            ],
          };
          Highcharts.chart("containerPie", optionsPie);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
