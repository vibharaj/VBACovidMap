import React from "react";
import { Cards, Chart, CountryPicker} from "./Components";
import styles from "./App.module.css";
import { fetchData } from "./api";
import coronaImage from "./images/image.png";
import MapSelector from "./Components/MapSelector/MapSelector";
import Covid19 from "./Components/covid19Map/Covid19"

class App extends React.Component {
  state = {
    data: {},
    country: "",
  };
  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }
  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
  };
  render() {
    const { data, country } = this.state;
    return (
      <div>
        <div>
        <img className={styles.image} src={coronaImage} alt="COVID-19" />
          <br />
          <text>
            <b>Global and Country Wise Cases of Corona Virus</b>
          </text>
          <br />
          <text>
            <i>(For a particular select a Country from below)</i>
          </text>
          <br />
          <br />
        </div>

        <div>
          <Covid19 />
        </div>

        <div className={styles.container}>
          <Cards data={data} country={country} />
          <CountryPicker handleCountryChange={this.handleCountryChange} />
          <Chart data={data} country={country} />
        </div>
      </div>
    );
  }
}

export default App;