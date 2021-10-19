import React from "react";
import { Row, Col } from "reactstrap";

import Widget from "../../components/Widget";

import Map from "./components/am4chartMap/am4chartMap";

import s from "./Dashboard.module.scss";

// import statsJson from "./stats.json";
// import citiesJson from "./citynodescount.json";

import logoWhite from "../../images/carrier-white-2.png";

import Loader from 'react-loader-spinner';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isFetching: true,
        countries: [],
        cities: [],
        total: 0,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    let stats = [];
    let cities = [];
    this.setState({...this.state, isFetching: true});

    try{
      stats = await fetch('https://api.elapeer.net/stats').then(response => response.json());
      cities = await fetch('https://api.elapeer.net/cities').then(response => response.json());

    } catch(e) {
      console.log('FETCHING ERROR: ' + e);
      this.setState({...this.state, isFetching: false});
    }

    const sortedCities = cities.sort((a, b) => b.count - a.count );
    const sortedCountries = stats[0].countryNodes.sort((a, b) => b.total - a.total);

    this.setState({
      countries: sortedCountries,
      cities: sortedCities,
      total: stats[0].total,
      isFetching: false
    })
  }

  render() {
    return (
      <div className={s.wrap}>
        <h1 className="page-title">
          ElaPeer<img src={logoWhite} alt="logo"/> &nbsp;
          <small>
            <small>Elastos Carrier Nodes</small>
          </small>
        </h1>
        <Row>
          <Col>
            <Widget className="bg-transparent">
            {this.state.isFetching ? <div style={{
              width: "100%",
              height: "100",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
            >
              <Loader type="ThreeDots" color="#C7D0FF" height="100" width="100" />
            </div>
            :<Map cities={this.state.cities} total={this.state.total} />}
            </Widget>
          </Col>
        </Row>
        <Row>
        <Col lg={1} />
          <Col lg={6} xl={4} xs={12}>
            <Widget title={<h4> Total Countries </h4>}>
            <Row className="stats-row">
                <Col>
                  <h6 className="name fw-semi-bold">Country</h6>
                </Col>
                <Col>
                  <h6 className="name fw-semi-bold">Nodes</h6>
                </Col>
              </Row>
              {this.state.countries.map(country => 
              <Row key={country.name}>
                <Col><p className="value" >{country.name}</p></Col>
                <Col><p className="value" >{country.total}</p></Col>
              </Row>)}
            </Widget>
          </Col>
          <Col lg={1} />
          <Col lg={4} xs={12}>
            <Widget title={<h4>Total Cities</h4>} >
              <Row className="stats-row">
                <Col>
                  <h6 className="name fw-semi-bold">City</h6>
                </Col>
                <Col>
                  <h6 className="name fw-semi-bold">Nodes</h6>
                </Col>
              </Row>
              {this.state.cities.map(city => 
              <Row key={city.name}>
                <Col><p className="value" >{city.name}</p></Col>
                <Col><p className="value" >{city.count}</p></Col>
              </Row>)}
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
