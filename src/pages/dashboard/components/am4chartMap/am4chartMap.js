import React, { Component } from 'react';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
// import * as animation from "@amcharts/amcharts4/themes/animated";
// import cities from '../../citynodescount.json';
// import stats from '../../stats.json';
import am4geodata_usaHigh from "@amcharts/amcharts4-geodata/worldHigh";

// import AnimateNumber from 'react-animated-number';
import s from './am4chartMap.module.scss';
  
  class Am4chartMap extends Component {
  
  componentDidMount() {
    let map = am4core.create("map", am4maps.MapChart);
    map.geodata = am4geodata_usaHigh;
    map.percentHeight = 90;
    map.dy = 10;
    // map.projection = new am4maps.projections.AlbersUsa();
    let polygonSeries = map.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    map.homeZoomLevel = 1.4;
    map.zoomControl = new am4maps.ZoomControl();
    map.zoomControl.layout = 'horizontal';
    map.zoomControl.align = 'left';
    map.zoomControl.valign = 'bottom';
    map.zoomControl.dy = -10;
    map.zoomControl.contentHeight = 20;
    map.zoomControl.minusButton.background.fill = am4core.color("#C7D0FF");
    map.zoomControl.minusButton.background.stroke = am4core.color("#6979C9");
    map.zoomControl.minusButton.label.fontWeight = 600;
    map.zoomControl.minusButton.label.fontSize = 22;
    map.zoomControl.minusButton.scale = .75;
    map.zoomControl.minusButton.label.scale = .75;
    map.zoomControl.plusButton.background.fill = am4core.color("#C7D0FF");
    map.zoomControl.plusButton.background.stroke = am4core.color("#6979C9");
    map.zoomControl.plusButton.label.fontWeight = 600;
    map.zoomControl.plusButton.label.fontSize = 22;
    map.zoomControl.plusButton.label.align = "center";
    map.zoomControl.plusButton.scale = .75;
    map.zoomControl.plusButton.label.scale = .75;
    map.zoomControl.plusButton.dx = 5;
    let plusButtonHoverState = map.zoomControl.plusButton.background.states.create("hover");
    plusButtonHoverState.properties.fill = am4core.color("#354D84");
    let minusButtonHoverState = map.zoomControl.minusButton.background.states.create("hover");
    minusButtonHoverState.properties.fill = am4core.color("#354D84");
    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = am4core.color("#474D84");
    polygonTemplate.stroke = am4core.color("#6979C9")
    let hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#354D84");
    let citySeries = map.series.push(new am4maps.MapImageSeries());
    citySeries.data = this.props.cities;
    // citySeries.dataFields.value = "size";
    let city = citySeries.mapImages.template;
    city.nonScaling = true;
    city.propertyFields.latitude = "lat";
    city.propertyFields.longitude = "long";
    let circle = city.createChild(am4core.Circle);
    circle.fill = am4core.color("#ffffff"); // C7D0FF
    circle.strokeWidth = 0;
    circle.radius = 3;
    let circleHoverState = circle.states.create("hover");
    circleHoverState.properties.strokeWidth = 1;
    circle.tooltipText = '{name}: {count}';
    // circle.propertyFields.radius = 'size';
    this.map = map;

    // function animateBullet (circle) {
    //   var animation = circle.animate([{ property: "scale", from: 1, to: 5 }, { property: "opacity", from: 1, to: 0 }], 1000, am4core.ease.circleOut);
    //   // animation.events.on("animationended", function(event){
    //   //   animateBullet(event.target.object);
    //   // })
    // };
    // circle.events.on("over", event => {
    //     animateBullet(event.target);
    //   });
  }

  componentWillUnmount() {
    if(this.map) {
      this.map.dispose();
    }
  }

  render() {
    return (
      <div className={s.mapChart}>
        <div className={s.stats}>
          <h6 className="mt-1">GEO-LOCATIONS</h6>
          <p className="h3 m-0">
            <span className="mr-xs fw-normal">
            {this.props.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
              {/* <AnimateNumber
                value={stats[0].total}
                initialValue={0}
                duration={1000} 
                stepPrecision={0}
                formatValue={n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} 
              /> */}
              </span>
            <i className="fa fa-map-marker" />
          </p>
        </div>
        <div className={s.map} id="map">
          <span>Alternative content for the map</span>
        </div>
      </div>
    );
  }
}

export default Am4chartMap;
