import React, { Component } from 'react';
import { Table, Card, Form, FormGroup, Label, Input, Button, CardBody, CardHeader, Col, Row, Modal, ModalHeader, ModalBody, Collapse } from 'reactstrap';
import Annotation from 'react-image-annotation';
import {PointSelector, RectangleSelector} from 'react-image-annotation/lib/selectors';
import 'react-dropdown/style.css'
import { Bar, Line } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import ImageMapper from "react-image-mapper";

class Po extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocking: false,
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
        {id: "B15-6", name: "David", photo: 'avatar2.jpg', nik: "257102029529258", phone: "0812724829420", mail: "david@mail.com", sales_name: "Joce", sales_photo: 'avatar1.jpg', sales_person: "Agent 32", sales_phone: "08123287429", sales_mail: "agent32@mail.com", deal_date: "14 Agustus 2019"},
        {id: "B8-6", name: "Bruce", photo: 'avatar3.jpg', nik: "357091250029520", phone: "081376588190", mail: "bruce@mail.com", sales_name: "Miya", sales_photo: 'avatar6.jpg', sales_person: "Agent 15", sales_phone: "08562752920", sales_mail: "agent15@mail.com", deal_date: "29 September 2019"},
        {id: "B6-6", name: "John", photo: 'avatar4.jpg', nik: "357129992000100", phone: "085628292000", mail: "john@mail.com", sales_name: "Wika", sales_photo: 'avatar5.jpg', sales_person: "Agent 28", sales_phone: "08580205902", sales_mail: "agent28@mail.com", deal_date: "10 September 2019"},
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
        deal_date: '-'
      }
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    // $('.bodyAnn').click(function(e) {
    //   var offset = $(this).offset();
    //   alert(e.pageX - offset.left);
    //   alert(e.pageY - offset.top);
    // });
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
    let y = this.state.countUpdate + 1;
    console.log(y, 'y');
    this.setState({ countUpdate: y })
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
                <i className="icon-graph" style={{color: '#333', fontSize: '22px', lineHeight: '45px'}}></i>
              </div>
              <div style={{backgroundColor: '#fcfcfc', float: 'left', border: '1px solid #C8CED3', width:'50px', height: '40px', textAlign:'center'}}>
                <i className="icon-hammer-wrench" style={{color: '#333', fontSize: '22px', lineHeight: '45px'}}></i>
              </div>
              <div style={{backgroundColor: '#fcfcfc', float: 'left', border: '1px solid #C8CED3', width:'50px', height: '40px', textAlign:'center'}}>
                <i className="icon-home7" style={{color: '#333', fontSize: '22px', lineHeight: '45px'}}></i>
              </div>
              <div style={{backgroundColor: '#fcfcfc', float: 'left', border: '1px solid #C8CED3', width:'50px', height: '40px', textAlign:'center'}}>
                <i className="icon-cogs" style={{color: '#333', fontSize: '22px', lineHeight: '45px'}}></i>
              </div>
              <div style={{backgroundColor: '#fcfcfc', float: 'left', border: '1px solid #C8CED3', width:'50px', height: '40px', textAlign:'center'}}>
                <i className="icon-info22" style={{color: '#333', fontSize: '22px', lineHeight: '45px'}}></i>
              </div>
            </Col>
            <Col xs="12" sm="12" md="12" style={{marginBottom: '20px', minWidth: '370px'}}>
              {/* <div className="titleAnn"><i className="icon-direction"></i> Provense Suite</div> */}
              <Row>
                <Col xs="12" sm="12" md="12" lg="6" style={{marginBottom: '20px'}}>
                  <div className="center-block" >
                    <div className="titleAnn" style={{width: '376px'}}><i className="icon-direction"></i> Provense Suite</div>
                    <div className="img-plan">
                      <ImageMapper src={"/assets/img/sample.jpeg"} map={MAP} width={370}
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
                      }
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
                          <div className="rightText">: Sold </div>
                          <br/>
                          <div className="leftTextBig">Phone Number</div>
                          <div className="rightText">: 021-777-666 </div>
                          <br/>
                          <div className="leftTextBig">Hard Over Date</div>
                          <div className="rightText">: - </div>
                          <br/>
                          <div className="leftTextBig">ID Billing</div>
                          <div className="rightText">: xxx-xxx-xxx </div>
                          <br/>
                          <div className="leftTextBig">NOPEL IPL</div>
                          <div className="rightText">: xxx-xxx-xxx </div>
                          <br/>
                          <div className="leftTextBig">Tarif IPL per m2</div>
                          <div className="rightText">: 662.500 </div>
                          <br/>
                          <div className="leftTextBig">Nilai IPL per bulan</div>
                          <div className="rightText">: 2.695 </div>
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
                          <div className="leftText2">KPR/T 6BLN CCL 18X</div>
                          <div className="leftText2"><b>Top Description :</b></div>
                          <div className="leftText2">Home Mortgage Express</div>
                          <div className="leftText2"><b>Sales Prices :</b></div>
                          <div className="leftText2">Rp. 1.376.427.999</div>
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