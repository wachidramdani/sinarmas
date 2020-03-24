import React, { Component } from 'react';
import { Table, Card, Form, FormGroup, Label, Input, Button, CardBody, CardHeader, Col, Row, Modal, ModalHeader, ModalBody, Collapse } from 'reactstrap';
import {INITIAL_VALUE, ReactSVGPanZoom, TOOL_NONE} from 'react-svg-pan-zoom';
import {ReactSvgPanZoomLoader, SvgLoaderSelectElement} from 'react-svg-pan-zoom-loader'
import 'react-dropdown/style.css'
import { Bar, Line } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import $ from 'jquery';

class Po extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldAreaID: '',
      oldAreaColor: '',
      blocking: false,
      tool: TOOL_NONE,
      value: INITIAL_VALUE,
      annotations: [
        {
          geometry: {
            type: 'RECTANGLE',
            x: 66.56,
            y: 46.89,
            width: 3.18,
            height: 4.76
          },
          data: {
            text: 'B10-6',
            id: 1
          }
        },
        {
          geometry: {
            type: 'RECTANGLE',
            x: 66.07,
            y: 33.85,
            width: 2.93,
            height: 4.51
          },
          data: {
            text: 'B15-6',
            id: 2
          }
        },
        {
          geometry: {
            type: 'RECTANGLE',
            x: 77.57,
            y: 65.45,
            width: 2.94,
            height: 5.015
          },
          data: {
            text: 'B3-3',
            id: 3
          }
        },
        {
          geometry: {
            type: 'RECTANGLE',
            x: 80.26,
            y: 65.45,
            width: 2.94,
            height: 5.015
          },
          data: {
            text: 'B3-4',
            id: 4
          }
        },
        {
          geometry: {
            type: 'RECTANGLE',
            x: 82.96,
            y: 65.45,
            width: 2.94,
            height: 5.015
          },
          data: {
            text: 'B3-5',
            id: 5
          }
        }
      ],
      annotation: {},
      activeAnnotation: [
        {
          geometry: {
            type: 'RECTANGLE',
            x: 82.96,
            y: 65.45,
            width: 2.94,
            height: 5.015
          },
          data: {
            text: 'B3-5',
            id: 5
          }
        }
      ],
      customers : [
        { 
          id: "#svg_10", name: "David", photo: '2.jpg', nik: "257102029529258", phone: "0812724829420", mail: "david@mail.com", 
          sales_name: "Joce", sales_photo: '5.jpg', sales_person: "Agent 32", sales_phone: "08123287429", sales_mail: "agent32@mail.com", deal_date: "14 Agustus 2019",
          status_unit: "Sold", phone_number: "021-777-666", hard_over_date: "-", id_billing: "001-980-XXX", nopel_ipl: "001-204-XXX", tarif_ipl: "662.500", nilai_ipl: "2.695",
          top: 'Cash', tod: 'Home Mortgage Express', sales_price: 'Rp. 1.404.750.999', address: 'B16-4',
        },
        {
          id: "#svg_13", name: "Bruce", photo: '3.jpg', nik: "357091250029520", phone: "081376588190", mail: "bruce@mail.com", 
          sales_name: "Miya", sales_photo: '6.jpg', sales_person: "Agent 15", sales_phone: "08562752920", sales_mail: "agent15@mail.com", deal_date: "29 September 2019",
          status_unit: "Sold", phone_number: "021-888-123", hard_over_date: "-", id_billing: "001-760-XXX", nopel_ipl: "001-884-XXX", tarif_ipl: "699.000", nilai_ipl: "3.105",
          top: 'KPR/T 6BLN CCL 18', tod: 'Home Mortgage Express', sales_price: 'Rp. 1.521.220.000', address: 'B16-6',
        },
        {
          id: "#svg_9", name: "John", photo: '1.jpg', nik: "357129992000100", phone: "085628292000", mail: "john@mail.com", 
          sales_name: "Wika", sales_photo: '8.jpg', sales_person: "Agent 28", sales_phone: "08580205902", sales_mail: "agent28@mail.com", deal_date: "10 September 2019",
          status_unit: "Booked", phone_number: "021-777-389", hard_over_date: "-", id_billing: "001-290-XXX", nopel_ipl: "001-999-XXX", tarif_ipl: "620.000", nilai_ipl: "2.250",
          top: '-', tod: 'Home Mortgage Express', sales_price: 'Rp. 1.376.427.999', address: 'B16-5',
        },
        {
          id: "#svg_16", name: "John", photo: '1.jpg', nik: "357129992000100", phone: "085628292000", mail: "john@mail.com", 
          sales_name: "Wika", sales_photo: '8.jpg', sales_person: "Agent 28", sales_phone: "08580205902", sales_mail: "agent28@mail.com", deal_date: "10 September 2019",
          status_unit: "Booked", phone_number: "021-777-389", hard_over_date: "-", id_billing: "001-290-XXX", nopel_ipl: "001-999-XXX", tarif_ipl: "620.000", nilai_ipl: "2.250",
          top: '-', tod: 'Home Mortgage Express', sales_price: 'Rp. 1.376.427.999', address: 'B11-3',
        },
        {
          id: "#svg_21", name: "John", photo: '1.jpg', nik: "357129992000100", phone: "085628292000", mail: "john@mail.com", 
          sales_name: "Wika", sales_photo: '8.jpg', sales_person: "Agent 28", sales_phone: "08580205902", sales_mail: "agent28@mail.com", deal_date: "10 September 2019",
          status_unit: "Booked", phone_number: "021-777-389", hard_over_date: "-", id_billing: "001-290-XXX", nopel_ipl: "001-999-XXX", tarif_ipl: "620.000", nilai_ipl: "2.250",
          top: '-', tod: 'Home Mortgage Express', sales_price: 'Rp. 1.376.427.999', address: 'B11-4',
        },
        {
          id: "#svg_4", name: "-", photo: 'avatar.png', nik: "-", phone: "-", mail: "-", 
          sales_name: "-", sales_photo: 'avatar.png', sales_person: "-", sales_phone: "-", sales_mail: "-", deal_date: "-",
          status_unit: "Available", phone_number: "021-777-389", hard_over_date: "-", id_billing: "001-290-XXX", nopel_ipl: "001-999-XXX", tarif_ipl: "620.000", nilai_ipl: "2.250",
          top: '-', tod: 'Home Mortgage Express', sales_price: 'Rp. 1.376.427.999', address: 'B16-1',
        },
        {
          id: "#svg_5", name: "-", photo: 'avatar.png', nik: "-", phone: "-", mail: "-", 
          sales_name: "-", sales_photo: 'avatar.png', sales_person: "-", sales_phone: "-", sales_mail: "-", deal_date: "-",
          status_unit: "Available", phone_number: "021-777-389", hard_over_date: "-", id_billing: "001-290-XXX", nopel_ipl: "001-999-XXX", tarif_ipl: "620.000", nilai_ipl: "2.250",
          top: '-', tod: 'Home Mortgage Express', sales_price: 'Rp. 1.376.427.999', address: 'B16-2',
        },
        {
          id: "#svg_7", name: "-", photo: 'avatar.png', nik: "-", phone: "-", mail: "-", 
          sales_name: "-", sales_photo: 'avatar.png', sales_person: "-", sales_phone: "-", sales_mail: "-", deal_date: "-",
          status_unit: "Available", phone_number: "021-777-389", hard_over_date: "-", id_billing: "001-290-XXX", nopel_ipl: "001-999-XXX", tarif_ipl: "620.000", nilai_ipl: "2.250",
          top: '-', tod: 'Home Mortgage Express', sales_price: 'Rp. 1.376.427.999', address: 'B16-3',
        },
        {
          id: "#svg_15", name: "-", photo: 'avatar.png', nik: "-", phone: "-", mail: "-", 
          sales_name: "-", sales_photo: 'avatar.png', sales_person: "-", sales_phone: "-", sales_mail: "-", deal_date: "-",
          status_unit: "Available", phone_number: "021-777-389", hard_over_date: "-", id_billing: "001-290-XXX", nopel_ipl: "001-999-XXX", tarif_ipl: "620.000", nilai_ipl: "2.250",
          top: '-', tod: 'Home Mortgage Express', sales_price: 'Rp. 1.376.427.999', address: 'B16-7',
        },
        {
          id: "#svg_14", name: "-", photo: 'avatar.png', nik: "-", phone: "-", mail: "-", 
          sales_name: "-", sales_photo: 'avatar.png', sales_person: "-", sales_phone: "-", sales_mail: "-", deal_date: "-",
          status_unit: "Available", phone_number: "021-777-389", hard_over_date: "-", id_billing: "001-290-XXX", nopel_ipl: "001-999-XXX", tarif_ipl: "620.000", nilai_ipl: "2.250",
          top: '-', tod: 'Home Mortgage Express', sales_price: 'Rp. 1.376.427.999', address: 'B11-1',
        },
        {
          id: "#svg_18", name: "-", photo: 'avatar.png', nik: "-", phone: "-", mail: "-", 
          sales_name: "-", sales_photo: 'avatar.png', sales_person: "-", sales_phone: "-", sales_mail: "-", deal_date: "-",
          status_unit: "Available", phone_number: "021-777-389", hard_over_date: "-", id_billing: "001-290-XXX", nopel_ipl: "001-999-XXX", tarif_ipl: "620.000", nilai_ipl: "2.250",
          top: '-', tod: 'Home Mortgage Express', sales_price: 'Rp. 1.376.427.999', address: 'B11-2',
        },
        {
          id: "#svg_19", name: "-", photo: 'avatar.png', nik: "-", phone: "-", mail: "-", 
          sales_name: "-", sales_photo: 'avatar.png', sales_person: "-", sales_phone: "-", sales_mail: "-", deal_date: "-",
          status_unit: "Available", phone_number: "021-777-389", hard_over_date: "-", id_billing: "001-290-XXX", nopel_ipl: "001-999-XXX", tarif_ipl: "620.000", nilai_ipl: "2.250",
          top: '-', tod: 'Home Mortgage Express', sales_price: 'Rp. 1.376.427.999', address: 'B11-5',
        },
        {
          id: "#svg_22", name: "-", photo: 'avatar.png', nik: "-", phone: "-", mail: "-", 
          sales_name: "-", sales_photo: 'avatar.png', sales_person: "-", sales_phone: "-", sales_mail: "-", deal_date: "-",
          status_unit: "Available", phone_number: "021-777-389", hard_over_date: "-", id_billing: "001-290-XXX", nopel_ipl: "001-999-XXX", tarif_ipl: "620.000", nilai_ipl: "2.250",
          top: '-', tod: 'Home Mortgage Express', sales_price: 'Rp. 1.376.427.999', address: 'B11-6',
        },
        {
          id: "#svg_25", name: "-", photo: 'avatar.png', nik: "-", phone: "-", mail: "-", 
          sales_name: "-", sales_photo: 'avatar.png', sales_person: "-", sales_phone: "-", sales_mail: "-", deal_date: "-",
          status_unit: "Available", phone_number: "021-777-389", hard_over_date: "-", id_billing: "001-290-XXX", nopel_ipl: "001-999-XXX", tarif_ipl: "620.000", nilai_ipl: "2.250",
          top: '-', tod: 'Home Mortgage Express', sales_price: 'Rp. 1.376.427.999', address: 'B11-7',
        },
        {}
      ],
      customer: {
        name: '-',
        photo: 'avatar.png',
        nik: '-',
        phone: '-',
        mail: '-',
        address: '-',
        sales_name: '-',
        sales_photo: 'avatar.png',
        sales_person: '-',
        sales_phone: '-',
        sales_mail: '-',
        deal_date: '-',
        status_unit: "-", 
        phone_number: "-", 
        hard_over_date: "-", 
        id_billing: "-", 
        nopel_ipl: "-", 
        tarif_ipl: "-", 
        nilai_ipl: "-",
        top: "-",
        tod: "-",
        sales_price: "-"
      }
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleClickArea = this.handleClickArea.bind(this)
  }

  componentDidMount() {
    this.Viewer.fitToViewer();
    // $('#svg_1').css('background-color', 'red');
  }

  changeTool(nextTool) {
    this.setState({tool: nextTool})
  }

  changeValue(nextValue) {
    this.setState({value: nextValue})
  }

  fitToViewer() {
    this.Viewer.fitToViewer()
  }

  fitSelection() {
    this.Viewer.fitSelection(40, 40, 200, 200)
  }

  zoomOnViewerCenter() {
    this.Viewer.zoomOnViewerCenter(1.1)
  }

  handleClickArea = (area) => {
    // const color = $(area).css("fill");
    // console.log(color, 'color');
    // $(this.state.oldAreaID).css({ fill: this.state.oldAreaColor });
    // this.setState({oldAreaID: area});
    // console.log(area, 'area')
    // console.log(this.state.oldAreaID, 'old')
    // alert(area);
    this.state.customers.map((column, index) => {
      if(column.id === area){
        $(area).css({ fill: "rgba(74,173,255,.8)" });
        this.updateCustomer('name', column.name);
        this.updateCustomer('photo', column.photo);
        this.updateCustomer('phone', column.phone);
        this.updateCustomer('nik', column.nik);
        this.updateCustomer('mail', column.mail);
        this.updateCustomer('address', column.address);
        this.updateCustomer('sales_name', column.sales_name);
        this.updateCustomer('sales_photo', column.sales_photo);
        this.updateCustomer('sales_person', column.sales_person);
        this.updateCustomer('sales_mail', column.sales_mail);
        this.updateCustomer('sales_phone', column.sales_phone);
        this.updateCustomer('deal_date', column.deal_date);
        this.updateCustomer('status_unit', column.status_unit);
        this.updateCustomer('phone_number', column.phone_number);
        this.updateCustomer('hard_over_date', column.hard_over_date);
        this.updateCustomer('id_billing', column.id_billing);
        this.updateCustomer('nopel_ipl', column.nopel_ipl);
        this.updateCustomer('tarif_ipl', column.tarif_ipl);
        this.updateCustomer('nilai_ipl', column.nilai_ipl);
        this.updateCustomer('top', column.top);
        this.updateCustomer('tod', column.tod);
        this.updateCustomer('sales_price', column.sales_price);
      }else{
        $(area).css({ fill: "rgba(74,173,255,.8)" });
      }
    });
  }

  onChange = (annotation) => {
    this.setState({ annotation })
  }

  handleClick = (annotation) => {
    // console.log(annotation, 'x');
    
  }

  onSubmit = (annotation) => {
    const { geometry, data } = annotation;

    this.setState({
      annotation: {},
      annotations: this.state.annotations.concat({
        geometry,
        data: {
          ...data,
          id: Math.random()
        }
      })
    });
  }

  getInitialState = () => {
		return { hoveredArea: null, msg: null, moveMsg: null };
  }

  updateCustomer = (name, value) => {
    this.setState( prevState => ({customer :
      {...prevState.customer, [name]: value}
    }) );
  }
    
	clicked = (area) => {
    // this.setState({blocking: true});
    // alert('You clicked ' + area.desc);
    this.state.customers.map((column, index) => {
      if(column.id === area.desc){
        this.updateCustomer('name', column.name);
        this.updateCustomer('photo', column.photo);
        this.updateCustomer('phone', column.phone);
        this.updateCustomer('nik', column.nik);
        this.updateCustomer('mail', column.mail);
        this.updateCustomer('address', column.id);
        this.updateCustomer('sales_name', column.sales_name);
        this.updateCustomer('sales_photo', column.sales_photo);
        this.updateCustomer('sales_person', column.sales_person);
        this.updateCustomer('sales_mail', column.sales_mail);
        this.updateCustomer('sales_phone', column.sales_phone);
        this.updateCustomer('deal_date', column.deal_date);
        this.updateCustomer('status_unit', column.status_unit);
        this.updateCustomer('phone_number', column.phone_number);
        this.updateCustomer('hard_over_date', column.hard_over_date);
        this.updateCustomer('id_billing', column.id_billing);
        this.updateCustomer('nopel_ipl', column.nopel_ipl);
        this.updateCustomer('tarif_ipl', column.tarif_ipl);
        this.updateCustomer('nilai_ipl', column.nilai_ipl);
        this.updateCustomer('top', column.top);
        this.updateCustomer('tod', column.tod);
        this.updateCustomer('sales_price', column.sales_price);
      }
    });
  }
  
	clickedOutside = (evt) => {
		this.updateCustomer('name', '-');
    this.updateCustomer('photo', 'avatar.png');
    this.updateCustomer('phone', '-');
    this.updateCustomer('nik', '-');
    this.updateCustomer('mail', '-');
    this.updateCustomer('address', '-');
    this.updateCustomer('sales_name', '-');
    this.updateCustomer('sales_photo', 'avatar.png');
    this.updateCustomer('sales_person', '-');
    this.updateCustomer('sales_mail', '-');
    this.updateCustomer('sales_phone', '-');
    this.updateCustomer('deal_date', '-');
    this.updateCustomer('status_unit', '-');
    this.updateCustomer('phone_number', '-');
    this.updateCustomer('hard_over_date', '-');
    this.updateCustomer('id_billing', '-');
    this.updateCustomer('nopel_ipl', '-');
    this.updateCustomer('tarif_ipl', '-');
    this.updateCustomer('nilai_ipl', '-');
    this.updateCustomer('top', '-');
    this.updateCustomer('tod', '-');
    this.updateCustomer('sales_price', '-');
  }
  
	moveOnImage = (evt) => {
		// console.log(evt);
  }
  
	enterArea = (area) => {
		// console.log(area);
  }
  
	leaveArea = (area) => {
		// console.log(area);
  }
  
	moveOnArea = (area, evt) => {
		// console.log(area)
	}

	getTipPosition = (area) => {
		// console.log(area)
	}

  render() {
    $('#svg_4, #svg_5, #svg_7, #svg_15, #svg_14, #svg_18, #svg_19, #svg_22, #svg_25').css({ fill: "rgba(74,255,160,.5)" });
    $('#svg_10, #svg_13').css({ fill: "rgb(255,72,72,.5)" });
    $('#svg_9, #svg_16, #svg_21').css({ fill: "rgba(255,250,72,.5)" });
    const bar = {
      labels: ['48', '49', '50', '51'],
      datasets: [
        {
          label: false,
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [65, 59, 80, 81],
        },
      ],
    };

    const optionbar = {
      tooltips: {
        enabled: false,
        custom: CustomTooltips
      },
      legend: {
        display: false
      },
      maintainAspectRatio: false
    }

    const optionline = {
      scales: {
        yAxes: [{
          ticks: {
            reverse: false,
            stepSize: 10
          },
        }]
      },
      legend: {
        display: false
      },
      maintainAspectRatio: false
    }

    const dataLine = {
      labels: ['10/2019', '11/2019', '12/2019', '01/2020', '02/2020', '03/2020'],
      datasets: [
        {
          label: 'Blue',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 10,
          data: [0, 5, 5, 10, 30, 50]
        },
        {
          label: 'Orange',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'orange',
          borderColor: 'orange',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'orange',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'orange',
          pointHoverBorderColor: 'orange',
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 10,
          data: [10, 20, 20, 15, 20, 15]
        }
      ]
    };

    const MAP = {
      name: "my-map",
      areas: [
        { name: "1", desc: "B15-6", shape: "rect", coords: [255,138,245,123], preFillColor: "rgba(249,194,226, 0.9)", fillColor: "red"  },
        { name: "2", desc: "B8-6", shape: "rect", coords: [257,202,247,187], preFillColor: "rgba(171,221,225, 0.9)", fillColor: "red"  },
        { name: "3", desc: "B6-6", shape: "rect", coords: [259,235,248,218], preFillColor: "rgba(171,221,225, 0.9)", fillColor: "red"  }
      ]
    }
    
    return (
      <div className="animated fadeIn">
        <BlockUi tag="div" blocking={this.state.blocking}>
          <Row>
            <Col xs="12" sm="12" md="12" style={{marginBottom: '20px', marginTop: '-15px', marginLeft: '-15px', textAlign: 'center'}}>
              <div style={{backgroundColor: '#fcfcfc', float: 'left', border: '1px solid #C8CED3', width:'50px', height: '40px', textAlign:'center'}}>
                <i className="icon-graph" style={{color: '#333', fontSize: '22px', lineHeight: '45px', cursor: 'pointer'}}></i>
              </div>
              <div style={{backgroundColor: '#fcfcfc', float: 'left', border: '1px solid #C8CED3', width:'50px', height: '40px', textAlign:'center'}}>
                <i className="icon-hammer-wrench" style={{color: '#333', fontSize: '22px', lineHeight: '45px', cursor: 'pointer'}}></i>
              </div>
              <div style={{backgroundColor: '#fcfcfc', float: 'left', border: '1px solid #C8CED3', width:'50px', height: '40px', textAlign:'center'}}>
                <i className="icon-home7" style={{color: '#333', fontSize: '22px', lineHeight: '45px', cursor: 'pointer'}}></i>
              </div>
              <div style={{backgroundColor: '#fcfcfc', float: 'left', border: '1px solid #C8CED3', width:'50px', height: '40px', textAlign:'center'}}>
                <i className="icon-cogs" style={{color: '#333', fontSize: '22px', lineHeight: '45px', cursor: 'pointer'}}></i>
              </div>
              <div style={{backgroundColor: '#fcfcfc', float: 'left', border: '1px solid #C8CED3', width:'50px', height: '40px', textAlign:'center'}}>
                <i className="icon-info22" style={{color: '#333', fontSize: '22px', lineHeight: '45px', cursor: 'pointer'}}></i>
              </div>
            </Col>
            <Col xs="12" sm="12" md="12" style={{marginBottom: '20px', minWidth: '370px'}}>
              {/* <div className="titleAnn"><i className="icon-direction"></i> Provense Suite</div> */}
              <Row>
                <Col xs="12" sm="12" md="12" lg="6" style={{marginBottom: '20px'}}>
                  <div className="center-block" >
                    <div className="titleAnn" style={{width: '376px'}}><i className="icon-direction"></i> Provense Suite</div>
                    <div className="img-plan">
                      <ReactSvgPanZoomLoader src={"/assets/img/sample.svg"} 
                        proxy={
                          <>
                            <SvgLoaderSelectElement selector="#svg_4" onClick={e => this.handleClickArea("#svg_4")} />
                            <SvgLoaderSelectElement selector="#svg_5" onClick={e => this.handleClickArea("#svg_5")} />
                            <SvgLoaderSelectElement selector="#svg_7" onClick={e => this.handleClickArea("#svg_7")} />
                            <SvgLoaderSelectElement selector="#svg_10" onClick={e => this.handleClickArea("#svg_10")} />
                            <SvgLoaderSelectElement selector="#svg_9" onClick={e => this.handleClickArea("#svg_9")} />
                            <SvgLoaderSelectElement selector="#svg_13" onClick={e => this.handleClickArea("#svg_13")} />
                            <SvgLoaderSelectElement selector="#svg_15" onClick={e => this.handleClickArea("#svg_15")} />
                            <SvgLoaderSelectElement selector="#svg_14" onClick={e => this.handleClickArea("#svg_14")} />
                            <SvgLoaderSelectElement selector="#svg_18" onClick={e => this.handleClickArea("#svg_18")} />
                            <SvgLoaderSelectElement selector="#svg_16" onClick={e => this.handleClickArea("#svg_16")} />
                            <SvgLoaderSelectElement selector="#svg_21" onClick={e => this.handleClickArea("#svg_21")} />
                            <SvgLoaderSelectElement selector="#svg_19" onClick={e => this.handleClickArea("#svg_19")} />
                            <SvgLoaderSelectElement selector="#svg_22" onClick={e => this.handleClickArea("#svg_22")} />
                            <SvgLoaderSelectElement selector="#svg_25" onClick={e => this.handleClickArea("#svg_25")} />
                          </>
                        }
                        render= {(content) => (
                        <ReactSVGPanZoom
                          width={370} height={360}
                          ref={Viewer => this.Viewer = Viewer}
                          tool={this.state.tool} onChangeTool={tool => this.changeTool(tool)}
                          value={this.state.value} onChangeValue={value => this.changeValue(value)}
                          detectAutoPan={false}
                          // onZoom={e => console.log('zoom')}
                          // onPan={e => console.log('pan')}
                          // onClick={
                            // (e) => {
                            //   if (e.target.id!='') alert(e.target.id)
                            // }
                          //   event => console.log('click', event.target)
                          // }
                        >
                            <svg width={500} height={488} >
                                {content}
                            </svg>  
                        </ReactSVGPanZoom>
                    )}/>
                      {/* <ImageMapper src={"/assets/img/sample.jpeg"} map={MAP} width={370}
                        onClick={(area) => this.clicked(area)}
                        onMouseEnter={(area) => this.enterArea(area)}
                        onMouseLeave={(area) => this.leaveArea(area)}
                        onMouseMove={(area, _, evt) => this.moveOnArea(area, evt)}
                        onImageClick={(evt) => this.clickedOutside(evt)}
                        onImageMouseMove={(evt) => this.moveOnImage(evt)}
                      />
                      {
                        this.state.hoveredArea &&
                        <span className="tooltip"
                            style={{ ...this.getTipPosition(this.state.hoveredArea)}}>
                          { this.state.hoveredArea && this.state.hoveredArea.name}
                        </span>
                      } */}
                    </div>
                  </div>
                </Col>
                <Col xs="12" sm="12" md="12" lg="6">
                  <Row>
                    <Col xs="12" sm="12" md="12">
                      <Card className="card-accent-primary">
                        <CardHeader>
                          <i className="icon-user"></i>Customer
                        </CardHeader>
                          <CardBody>
                            <img src={ '../../assets/img/avatars/' + this.state.customer.photo} className="img-card" alt="avatar" />
                            <div className="separator-card">
                              <div className="leftText">Name</div>
                              <div className="rightText">: {this.state.customer.name} </div>
                              <br/>
                              <div className="leftText">NIK</div>
                              <div className="rightText">: {this.state.customer.nik} </div>
                              <br/>
                              <div className="leftText">Phone</div>
                              <div className="rightText">: {this.state.customer.phone} </div>
                              <br/>
                              <div className="leftText">Email</div>
                              <div className="rightText">: {this.state.customer.mail} </div>
                              <br/>
                              <div className="leftText">Address</div>
                              <div className="rightText">: <b>{this.state.customer.address}</b> </div>
                            </div>
                          </CardBody>
                      </Card>
                    </Col>
                    <Col xs="12" sm="12" md="12">
                      <Card className="card-accent-primary">
                        <CardHeader>
                          <i className="icon-user"></i>Sales Person
                        </CardHeader>
                          <CardBody>
                            <img src={ '../../assets/img/avatars/' + this.state.customer.sales_photo } className="img-card" alt="avatar" />
                            <div className="separator-card">
                              <div className="leftText">Name</div>
                              <div className="rightText">: {this.state.customer.sales_name} </div>
                              <br/>
                              <div className="leftText">Sales Person</div>
                              <div className="rightText">: {this.state.customer.sales_person} </div>
                              <br/>
                              <div className="leftText">Phone</div>
                              <div className="rightText">: {this.state.customer.sales_phone} </div>
                              <br/>
                              <div className="leftText">Email</div>
                              <div className="rightText">: {this.state.customer.sales_mail} </div>
                              <br/>
                              <div className="leftText">Deal Date</div>
                              <div className="rightText">: {this.state.customer.deal_date} </div>
                            </div>
                          </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
              
              {/* <div className="bodyAnn">
                <Annotation
                  src={"/assets/img/sample.jpeg"}
                  alt='Site Plan'
                  annotations={this.state.annotations}
                  activeAnnotations={this.state.activeAnnotation}
                  type={RectangleSelector.TYPE}
                  value={this.state.annotation}
                  onChange={this.onChange}
                  onSubmit={this.onSubmit}
                  onClick={this.handleClick}
                  disableAnnotation={false}
                  disableOverlay={true}
                />
              </div> */}
            </Col>
            <Col xs="12" sm="12" md="12">
              <Row>
                <Col xs="12" sm="6" md="6">
                  <Card className="card-accent-primary">
                      <CardBody>
                        <div className="separator-card" style={{marginLeft: '0'}}>
                          <div className="titleText"><b>Operational</b></div>
                          <br/>
                          <div className="leftTextBig">Status Unit</div>
                          <div className="rightText">: <b>
                            {(() => {
                              if (this.state.customer.status_unit === 'Sold') {
                                return (
                                  <label style={{backgroundColor: '#FF4848', padding: '0px 6px', marginBottom: '0', color: 'white'}}>{this.state.customer.status_unit}</label>
                                )
                              } else if (this.state.customer.status_unit === 'Booked') {
                                return (
                                  <label style={{backgroundColor: '#FFFA48', padding: '0px 6px', marginBottom: '0'}}>{this.state.customer.status_unit}</label>
                                )
                              } else if (this.state.customer.status_unit === 'Available') {
                                return (
                                  <label style={{backgroundColor: '#4AFFA0', padding: '0px 6px', marginBottom: '0', color: 'white'}}>{this.state.customer.status_unit}</label>
                                )
                              } else {
                                return (
                                  <label style={{backgroundColor: 'white', marginBottom: '0'}}>{this.state.customer.status_unit}</label>
                                )
                              }
                            })()}
                          </b> </div>
                          <br/>
                          <div className="leftTextBig">Phone Number</div>
                          <div className="rightText">: {this.state.customer.phone_number} </div>
                          <br/>
                          <div className="leftTextBig">Hard Over Date</div>
                          <div className="rightText">: {this.state.customer.hard_over_date} </div>
                          <br/>
                          <div className="leftTextBig">ID Billing</div>
                          <div className="rightText">: {this.state.customer.id_billing} </div>
                          <br/>
                          <div className="leftTextBig">NOPEL IPL</div>
                          <div className="rightText">: {this.state.customer.nopel_ipl} </div>
                          <br/>
                          <div className="leftTextBig">Tarif IPL per m2</div>
                          <div className="rightText">: {this.state.customer.tarif_ipl} </div>
                          <br/>
                          <div className="leftTextBig">Nilai IPL per bulan</div>
                          <div className="rightText">: {this.state.customer.nilai_ipl} </div>
                          <br/>
                        </div>
                        <Button className="btn-github btn-sm button-card">
                          <span>More Detail ...</span>
                        </Button>
                      </CardBody>
                  </Card>
                </Col>
                <Col xs="12" sm="6" md="6">
                  <Card className="card-accent-primary">
                      <CardBody>
                        <div className="left-area" style={{marginLeft: '0'}}>
                          <div className="titleText"><b>Term of Payment</b></div>
                          <br/>
                          <div className="leftText2"><b>Term of Payment :</b></div>
                          <div className="leftText2">{this.state.customer.top}</div>
                          <div className="leftText2"><b>Top Description :</b></div>
                          <div className="leftText2">{this.state.customer.tod}</div>
                          <div className="leftText2"><b>Sales Prices :</b></div>
                          <div className="leftText2">{this.state.customer.sales_price}</div>
                        </div>
                        <div style={{width: '50%', float: 'right'}}>
                          <div style={{width: '100%', height: '180px'}}>
                            <Bar data={bar} options={optionbar} />
                          </div>
                        </div>
                      </CardBody>
                  </Card>
                </Col>
                <Col xs="12" sm="12" md="12">
                  <Card className="card-accent-primary">
                      <CardBody>
                        <div className="titleText"><b>Construction Progress</b></div>
                        <div style={{width: '100%', float: 'left'}}>
                          <div style={{width: '100%', height: '200px'}}>
                            <Line ref="chart" data={dataLine} options={optionline}/>
                          </div>
                        </div>
                      </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </BlockUi>
      </div>
    );
  }
}

export default Po;