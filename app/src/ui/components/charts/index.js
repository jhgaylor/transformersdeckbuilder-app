import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HighchartsReact from 'react-highcharts';

const chartColors = ['#e63445', '#e2c23d', 'gray', '#8e3235', 'green'];

function getHighChartsPieOptions({...props}) {
  return {
      credits: {
        enabled: false,
      },
      colors: chartColors,
      chart: {
        height: '250px',
        style: {
            color: "#fff"
        },
        plotBackgroundColor: null,
        backgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        // spacingTop: 0,
        // spacingLeft: 0,
        // spacingRight: 0,
        spacingBottom: 15,
        marginBottom: 40,
        marginTop: 0,
      },
      legend: {
        enabled: false,
        itemStyle: {
            color: 'white'
        },
        itemHoverStyle:{
            color: 'gray'
        }
      },
      title: {
        text: ''
      },
      tooltip: {
        pointFormat: '<b>{point.y}</b> {point.percentage:.1f}%'
      },
      plotOptions: {
        pie: {
          size: '90%',
          borderColor: '#000',
          dataLabels: {
              enabled: false,
              color: 'white',
          },
          showInLegend: true,
        }
      },
      ...props
    }
}

function getHighChartsLineOptions({...props}) {
  return {
      credits: {
        enabled: false,
      },
      colors: chartColors,
      chart: {
        style: {
            color: "#fff"
        },
        height: '250px',
        plotBackgroundColor: "#343a40",
        backgroundColor: "#343a40",
        plotBorderWidth: null,
        plotShadow: false,
        spacingBottom: 15,
        marginBottom: 40,
        marginTop: 20,
        marginLeft: 50,
        marginRight: 20,
      },
      legend: {
        enabled: false,
        itemStyle: {
            color: 'white'
        },
        itemHoverStyle:{
            color: 'gray'
        }
      },
      title: {
        text: ''
      },
      plotOptions: {
        line: {
          animation: false,
        },
      },
      xAxis: {
        labels: {
          style: {
              color: "#fff"
          }
        },
      },
      yAxis: {
        title: {
          text: ""
        },
        labels: {
          style: {
              color: "#fff"
          }
        },
        gridLineColor: '',
        lineWidth: 1,
      },
      ...props
    }
}

export class BattleIconsRatio extends Component {

  render() {
    let {blue, white, orange, green, none, height} = this.props;
    const options = getHighChartsPieOptions({
      series: [{
        name: 'Battle Icon Colors',
        colorByPoint: true,
        data: [{
          name: 'Blue',
          y: blue || 0,
          color: '#3aabe1',
        }, {
          name: 'White',
          y: white || 0,
          color: '#f5f3fa',
        }, {
          name: 'Green',
          y: green || 0,
          color: '#33cc33',
        }, {
          name: 'Orange',
          y: orange || 0,
          color: '#ffaf38',
        }, {
          name: 'None',
          y: none || 0,
          color: 'gray',
        }]
      }]
    })
    if (height) {
      options.chart.height = height;
    }
    return (
      <HighchartsReact
        config={options}
      />
    )
  }
}

BattleIconsRatio.propTyes = {
  orange: PropTypes.number.isRequired,
  white: PropTypes.number.isRequired,
  blue: PropTypes.number.isRequired,
  green: PropTypes.number.isRequired,
  none: PropTypes.number.isRequired,
  height: PropTypes.string,
};


export class RarityRatio extends Component {

  render() {
    let {common, uncommon, rare, superRare} = this.props;
    const options = getHighChartsPieOptions({
      series: [{
        name: 'Battle Icon Colors',
        colorByPoint: true,
        data: [{
          name: 'Common',
          y: common || 0,
        }, {
          name: 'Uncommon',
          y: uncommon || 0,
        },  {
          name: 'Super Rare',
          y: superRare || 0,
        }, {
          name: 'Rare',
          y: rare || 0,
        }]
      }]
    })
    return (
      <HighchartsReact
        config={options}
      />
    )
  }
}

RarityRatio.propTyes = {
  common: PropTypes.number.isRequired,
  uncommon: PropTypes.number.isRequired,
  rare: PropTypes.number.isRequired,
  superRare: PropTypes.number.isRequired,
};

export class BattleIconsPerBattle extends Component {
  render() {
    let {blue, white, green, orange, none} = this.props;
    let options = getHighChartsLineOptions({
      series: [{
          name: 'White',
          data: white,
          color: '#f5f3fa',
      }, {
          name: 'Blue',
          data: blue,
          color: '#3aabe1',
      }, {
          name: 'Green',
          data: green,
          color: '#33cc33',
      }, {
          name: 'Orange',
          data: orange,
          color: '#ffaf38',
      }, {
          name: 'Blanks',
          data: none,
          color: 'gray',
      }]
    })
    return (
      <HighchartsReact
        config={options}
      />
    )
  }
}

BattleIconsPerBattle.propTyes = {
  white: PropTypes.array.isRequired,
  blue: PropTypes.array.isRequired,
  green: PropTypes.array.isRequired,
  orange: PropTypes.array.isRequired,
  none: PropTypes.array.isRequired,
};

export class TypeRatio extends Component {

  render() {
    let {action, upgrade, height} = this.props;
    const options = getHighChartsPieOptions({
      series: [{
        name: 'Type of Battle Cards in Deck',
        colorByPoint: true,
        data: [{
          name: 'Action',
          y: action || 0,
          color: '#e8e8e6',
        }, {
          name: 'Upgrade',
          y: upgrade || 0,
          color: '#676d6b',
        }]
      }]
    })
    if (height) {
      options.chart.height = height;
    }
    return (
      <HighchartsReact
        config={options}
      />
    )
  }
}

TypeRatio.propTyes = {
  action: PropTypes.number.isRequired,
  upgrade: PropTypes.number.isRequired,
  height: PropTypes.string,
};

export class BoldToughRatio extends Component {

  render() {
    let {bold, tough} = this.props;
    const options = getHighChartsPieOptions({
      series: [{
        name: 'Type of Battle Cards in Deck',
        colorByPoint: true,
        data: [{
          name: 'Bold',
          y: bold || 0,
        }, {
          name: 'Tough',
          y: tough || 0,
        }]
      }]
    })
    return (
      <HighchartsReact
        config={options}
      />
    )
  }
}

BoldToughRatio.propTyes = {
  bold: PropTypes.number.isRequired,
  tough: PropTypes.number.isRequired,
};


export class SubTypeRatio extends Component {

  render() {
    let {weapon, armor, utility} = this.props;
    const options = getHighChartsPieOptions({
      series: [{
        name: 'Type of Battle Cards in Deck',
        colorByPoint: true,
        data: [{
          name: 'Weapon',
          y: weapon || 0,
        }, {
          name: 'Armor',
          y: armor || 0,
        }, {
          name: 'Utility',
          y: utility || 0,
        }]
      }]
    })
    return (
      <HighchartsReact
        config={options}
      />
    )
  }
}

SubTypeRatio.propTyes = {
  weapon: PropTypes.number.isRequired,
  armor: PropTypes.number.isRequired,
  utility: PropTypes.number.isRequired,
};

export class CombinedTypeSubTypeRatio extends Component {
  render() {
    let {action, upgrade, height, weapon, armor, utility} = this.props;
    // console.log("props", this.props)
    const options = getHighChartsPieOptions({
      series: [{
        name: 'Type of Battle Cards in Deck',
        colorByPoint: true,
        data: [{
          name: 'Action',
          y: action || 0,
        }, {
          name: 'Upgrade',
          y: upgrade || 0,
        }]
      }, {
        name: 'Type of Upgrades in Deck',
        innerSize: '60%',
        data: [{
          name: 'Weapon',
          y: weapon || 0,
        }, {
          name: 'Armor',
          y: armor || 0,
        }, {
          name: 'Utility',
          y: utility || 0,
        }]
      }]
    })
    if (height) {
      options.chart.height = height;
    }
    return (
      <HighchartsReact
        config={options}
      />
    )
  }
}

CombinedTypeSubTypeRatio.propTyes = {
  upgrade: PropTypes.number.isRequired,
  action: PropTypes.number.isRequired,
  weapon: PropTypes.number.isRequired,
  armor: PropTypes.number.isRequired,
  utility: PropTypes.number.isRequired,
  height: PropTypes.string,
};

