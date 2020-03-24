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
import Customer from './Customer';
import CustomerDb from './CustomerDb';
import CommonTable from '../Commons/Table/CommonTable';
import Dropdown from 'react-dropdown'

class Po extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cluster: 'Tabebuya, BSD City',
      selected: { value: 'S1', label: 'Tabebuya, BSD City' },
      blocking: false,
      tool: TOOL_NONE,
      value: INITIAL_VALUE,
      customers : Customer,
      tableHead: [
        { width: "", title: "Address", dataField: "address", headerAlign: 'center', dataAlign: 'center', dataFormat: this.icon.bind(this) },
        { width: "80", title: "Status", dataField: "status_unit", headerAlign: 'center', dataAlign: 'center', dataFormat: this.status.bind(this) },
        { width: "60", title: "Action", dataField: "action", headerAlign: 'center', dataAlign: 'center', dataFormat: this.actionTable.bind(this) }
      ],
      datas: CustomerDb,
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
    this.handleClickArea = this.handleClickArea.bind(this)
    this._onSelect = this._onSelect.bind(this)
  }

  actionTable = (cell, row) => {
    return  <div>
                <Button className="btn-css3 btn-brand icon mr5px btn-sm" onClick={() => { this.handleClickArea(row.id) } }>
                    <i className="icon-price-tag3"></i>
                </Button>
            </div>;
  }

  icon = (cell, row) => {
    return  <span><i className={ row.icon }></i> <b>{row.address}</b></span>;
  }

  status = (cell, row) => {
    if(row.status_unit === 'Sold') {
      return  <div style={{width: '60px', backgroundColor: 'rgb(255,72,72,.5)', padding: '2px 0px'}}>{ row.status_unit }</div>;
    }else if(row.status_unit === 'Booked') {
      return  <div style={{width: '60px', backgroundColor: 'rgba(255,250,72,.5)', padding: '2px 0px'}}>{ row.status_unit }</div>;
    }else{
      return  <div style={{width: '60px', backgroundColor: 'rgba(74,255,160,.5)', padding: '2px 0px'}}>{ row.status_unit }</div>;
    }
    
  }

  componentDidMount() {
    this.Viewer.fitToViewer();
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

  selectDropdown = (e) => {
    this.setState({defaultOption: e});
  }

  handleClickArea = (area) => {
    this.state.customers.map((column, index) => {
      if(column.id === area){
        $(area).css({ fill: "rgba(74,173,255,1)" });
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
        $(area).css({ fill: "rgba(74,173,255,1)" });
      }
    });
  }
  
  updateCustomer = (name, value) => {
    this.setState( prevState => ({customer :
      {...prevState.customer, [name]: value}
    }) );
  }

  _onSelect (option) {
    console.log('You selected ', option.label)
    this.setState({selected: option})
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

    const options = [
      { value: 'S1', label: 'Tabebuya, BSD City' },
      { value: 'S2', label: 'Sevilla, BSD City' },
      { value: 'S3', label: 'Simplicity, BSD City' },
      { value: 'S4', label: 'Hylands, BSD City' },
      { value: 'S5', label: 'Castilla, BSD City' },
      { value: 'S6', label: 'Eminent, BSD City' },
    ];
    const defaultOption = this.state.selected;
    
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
              <div style={{backgroundColor: '#fcfcfc', float: 'left', border: '1px solid #C8CED3', height: '40px', textAlign:'center',
                lineHeight: '35px', padding: '0 15px'}}>
                <b>Select Cluster : </b>
                <Dropdown className='reactdrop' controlClassName='controlreactdrop'  options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
              </div>
            </Col>
            <Col xs="12" sm="12" md="12" style={{minWidth: '370px'}}>
              <Row>
                <Col xs="12" sm="12" md="12" lg="6" style={{marginBottom: '15px'}}>
                  <div className="center-block" >
                    <div className="titleAnn" style={{width: '374px'}}><i className="icon-direction"></i> Provense Suite</div>
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
                    </div>
                  </div>
                </Col>
                <Col xs="12" sm="12" md="12" lg="6">
                  <Row>
                    <Col xs="12" sm="12" md="12" lg="6">
                      <Card className="card-accent-primary">
                        <CardHeader>
                          <i className="icon-user"></i>Site Plan
                        </CardHeader>
                          <CardBody className="card-body-nopad">
                            <CommonTable 
                              tableHead={ this.state.tableHead }
                              datas={ this.state.datas }
                              action={ this.handleClickArea }
                            />
                          </CardBody>
                      </Card>
                    </Col>
                    <Col xs="12" sm="12" md="12" lg="6">
                      <Row>
                        <Col xs="12" sm="12" md="12" lg="12">
                          <Card className="card-accent-primary">
                            <CardHeader>
                              <i className="icon-user"></i>Customer
                            </CardHeader>
                              <CardBody>
                                <img src={ '../../assets/img/avatars/' + this.state.customer.photo} className="img-card" alt="avatar" />
                                <div className="separator-card">
                                  <div className="leftText"><i className="icon-user"></i> {this.state.customer.name}</div>
                                  <br/>
                                  <div className="leftText"><i className="icon-vcard"></i> {this.state.customer.nik}</div>
                                  <br/>
                                  <div className="leftText"><i className="icon-phone"></i> {this.state.customer.phone}</div>
                                  <br/>
                                  <div className="leftText"><i className="icon-mail5"></i> {this.state.customer.mail}</div>
                                  <br/>
                                  <div className="leftText"><i className="icon-location4"></i> <b>{this.state.customer.address}</b></div>
                                </div>
                              </CardBody>
                          </Card>
                        </Col>
                        <Col xs="12" sm="12" md="12" lg="12">
                          <Card className="card-accent-primary">
                            <CardHeader>
                              <i className="icon-user"></i>Sales
                            </CardHeader>
                              <CardBody>
                                <img src={ '../../assets/img/avatars/' + this.state.customer.sales_photo } className="img-card" alt="avatar" />
                                <div className="separator-card">
                                  <div className="leftText"><i className="icon-user"></i> {this.state.customer.sales_name}</div>
                                  <br/>
                                  <div className="leftText"><i className="icon-vcard"></i> {this.state.customer.sales_person}</div>
                                  <br/>
                                  <div className="leftText"><i className="icon-phone"></i> {this.state.customer.sales_phone}</div>
                                  <br/>
                                  <div className="leftText"><i className="icon-mail5"></i> {this.state.customer.sales_mail}</div>
                                  <br/>
                                  <div className="leftText"><i className="icon-calendar"></i> {this.state.customer.deal_date}</div>
                                </div>
                              </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
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