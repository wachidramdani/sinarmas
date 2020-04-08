import React, { Component } from 'react';
import { Table, Card, Form, FormGroup, Label, Input, Button, CardBody, CardHeader, Col, Row, Popover, PopoverBody } from 'reactstrap';
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
import Customer2 from './Customer2';
import CustomerDb2 from './CustomerDb2';
import CommonTable from '../Commons/Table/CommonTable';
import Dropdown from 'react-dropdown';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { iconMark } from './Icon';

// import { ReactSVG } from 'react-svg'

class Po extends Component {
  constructor(props) {
    super(props);
    this.state = {
      povid: 'img-plan',
      popoverOpen: false,
      onofcolor: 'on',
      lat: -6.2704673,
      lng: 106.6257405,
      zoom: 12,
      cluster: 'Tabebuya',
      project: 'De Park Utara',
      div: 'BSD H2',
      imgsvg: 'sample.svg',
      unit: '',
      selected: { value: 'S1', label: 'Tabebuya' },
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
        size: "-",
        sales_price: "-"
      },
      marker: [
        {
          location_id: 1,
          location_name: "Tabebuya",
          location_project: "De Park Utara",
          location_div: "BSD H2",
          location_lat: -6.2764673,
          location_long: 106.6257405,
          location_cntlat: -6.2704673,
          location_cntlng: 106.6257405,
        },
        {
          location_id: 2,
          location_name: "Buenos Park",
          location_project: "Delatinos",
          location_div: "BSD Delatinos",
          location_lat: -6.2764673,
          location_long: 106.6257405,
          location_cntlat: -6.2704673,
          location_cntlng: 106.6257405,
        }
      ],
    }
    this.handleClickArea = this.handleClickArea.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.clickMarker = this.clickMarker.bind(this)
    this.popoverToggle = this.popoverToggle.bind(this)
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

  defaultColor() {
    // console.log(this.state.cluster,'def');
    if(this.state.cluster === 'Tabebuya') {
      $('#svg_4, #svg_5, #svg_7, #svg_15, #svg_14, #svg_18, #svg_19, #svg_22, #svg_25').css({ fill: "rgba(74,255,160,.5)" });
      $('#svg_10, #svg_13').css({ fill: "rgba(255,72,72,.5)" });
      $('#svg_9, #svg_16, #svg_21').css({ fill: "rgba(255,250,72,.5)" });
    }else {
      $('#svg_7, #svg_5, #svg_2, #svg_29, #svg_31, #svg_33, #svg_35, #svg_19, #svg_17, #svg_15, #svg_13, #svg_11').css({ fill: "rgba(74,255,160,.5)" });
      $('#svg_27, #svg_25').css({ fill: "rgba(255,72,72,.5)" });
      $('#svg_23, #svg_21, #svg_9').css({ fill: "rgba(255,250,72,.5)" });
    }
  }

  changeTool(nextTool) {
    this.setState({popoverOpen: false})
    this.setState({tool: nextTool})
  }

  changeValue(nextValue) {
    this.setState({value: nextValue})
  }

  fitToViewer() {
    this.setState({popoverOpen: false})
    this.Viewer.fitToViewer()
  }

  fitSelection() {
    this.setState({popoverOpen: false})
    this.Viewer.fitSelection(40, 40, 200, 200)
  }

  zoomOnViewerCenter() {
    this.setState({popoverOpen: false})
    this.Viewer.zoomOnViewerCenter(1.1)
  }

  selectDropdown = (e) => {
    this.setState({defaultOption: e});
  }

  popoverToggle = (e) => {
    e.preventDefault();
    this.setState({popoverOpen: false})
  }

  handleClear = () => {
    this.setState({unit: ''});
    this.setState({popoverOpen: false, povid: 'img-plan'})
    this.defaultColor();
  }

  handleClickArea = (area) => {
    this.defaultColor();
    this.state.customers.map((column, index) => {
      if(column.id === area){
        this.setState({
          povid: area, 
          popoverOpen: true
        })
        $(area).css({ fill: "rgba(74,173,255,1)" });
        this.setState({unit: column.address});
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
        this.updateCustomer('size', column.size);
        this.updateCustomer('sales_price', column.price);
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
    // console.log('You selected ', option)
    this.setState({selected: option, cluster: option.label, popoverOpen: false, povid: 'img-plan'})
    if(option.label === 'Tabebuya'){
      this.setState({lat: -6.2764673, lng: 106.6257405, imgsvg: 'sample.svg', datas: CustomerDb, customers: Customer})
    }else{
      this.setState({lat: -6.3244603, lng: 106.6755952, imgsvg: 'sample2.svg', datas: CustomerDb2, customers: Customer2})
    }
    setTimeout(() => {
      this.defaultColor();
    }, 1000);
  }

  clickMarker  = (e, val) => {
    e.preventDefault();
    this.setState({popoverOpen: false, povid: 'img-plan'})
    let x = []
    if(val === 'Tabebuya') {
      x = {value: 'S1', label: 'Tabebuya'}
      this.setState({imgsvg: 'sample.svg', datas: CustomerDb, customers: Customer})
    }else {
      x = {value: 'S2', label: 'Buenos park'}
      this.setState({imgsvg: 'sample2.svg', datas: CustomerDb2, customers: Customer2})
    }
    this.setState({selected: x, cluster: val})
    setTimeout(() => {
      this.defaultColor();
    }, 1000);
  }
    
  render() {
    const position = [this.state.lat, this.state.lng];
    if(this.state.onofcolor === 'on'){
      // console.log(this.state.cluster,'test');
      // if(this.state.cluster === 'Tabebuya') {
      //   $('#svg_4, #svg_5, #svg_7, #svg_15, #svg_14, #svg_18, #svg_19, #svg_22, #svg_25').css({ fill: "rgba(74,255,160,.5)" });
      //   $('#svg_10, #svg_13').css({ fill: "rgba(255,72,72,.5)" });
      //   $('#svg_9, #svg_16, #svg_21').css({ fill: "rgba(255,250,72,.5)" });
      // }else {
      //   $('#svg_7, #svg_5, #svg_2, #svg_29, #svg_31, #svg_33, #svg_35, #svg_19, #svg_17, #svg_15, #svg_13, #svg_11').css({ fill: "rgba(74,255,160,.5)" });
      //   $('#svg_27, #svg_25').css({ fill: "rgba(255,72,72,.5)" });
      //   $('#svg_23, #svg_21, #svg_9').css({ fill: "rgba(255,250,72,.5)" });
      // }
      setTimeout(() => {
        this.defaultColor();
        this.setState({onofcolor: 'off'});
      }, 2000);
      
    }

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
      { value: 'S1', label: 'Tabebuya' },
      { value: 'S2', label: 'Buenos Park' },
    ];
    const defaultOption = this.state.selected;
    
    return (
      <div className="animated fadeIn">
        <BlockUi tag="div" blocking={this.state.blocking}>
        {/* <ReactSVG
          src={"/assets/img/sample2.svg"} 
          role="img"
          aria-label="Description of the overall image"
          beforeInjection={svg => {
            const desc=document.createElement('desc')
            desc.innerHTML='A description'
            svg.prepend(desc)
          }}
          onClick={(e) => {
            if (e.target.id!='') alert(e.target.id)
          }}
        /> */}
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
            <div className="contentMap">
              <div className="leafletTop">
                <span style={{float: 'left', fontWeight: 'bold'}}><i className="icon-location4"></i> Select Cluster :</span>
                <Dropdown className='reactdrop' controlClassName='controlreactdrop'  options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
              </div>
              <div className="leaflet">
                <Map center={position} zoom={this.state.zoom} scrollWheelZoom={false}>
                  <TileLayer
                    attribution='&amp;copy <a href="#">Ogya</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[-6.2764673,106.6257405]} icon={ iconMark }>
                    <Popup key={1}>
                      <Card style={{borderBottom: 'none'}}>
                        <CardHeader>
                          <span style={{fontSize: '12px'}}><i className="icon-info3"></i> Project Information</span>
                        </CardHeader>
                          <CardBody style={{padding: '5px'}}>
                            <span style={{float: 'left'}}><b>SBU:</b> Residential</span>
                            <span style={{float: 'right'}}><b>Cluster:</b> Tabebuya</span>
                            <br/>
                            <span style={{float: 'left'}}><b>Div:</b> BSD H2</span>
                            <span style={{float: 'right'}}><b>Project:</b> De Park Utara</span>
                            <br/>
                            <span style={{float: 'left'}}><b>Group Div Head:</b> Henry</span>
                            <span style={{float: 'right'}}><b>Div Head:</b> Theo</span>
                            <br/>
                            <Button className="btn-github btn-sm button-card2" onClick={(e) => this.clickMarker(e, 'Tabebuya')}>
                              <span>More Detail ...</span>
                            </Button>
                          </CardBody>
                      </Card>
                    </Popup>
                  </Marker>
                  <Marker position={[-6.3244603,106.6755952]} icon={ iconMark }>
                    <Popup key={2}>
                      <Card style={{borderBottom: 'none'}}>
                        <CardHeader>
                          <span style={{fontSize: '12px'}}><i className="icon-info3"></i> Project Information</span>
                        </CardHeader>
                          <CardBody style={{padding: '5px'}}>
                            <span style={{float: 'left'}}><b>SBU:</b> Residential</span>
                            <span style={{float: 'right'}}><b>Cluster:</b> Buenos Park</span>
                            <br/>
                            <span style={{float: 'left'}}><b>Div:</b> BSD Delatinos</span>
                            <span style={{float: 'right'}}><b>Project:</b> Delatinos</span>
                            <br/>
                            <span style={{float: 'left'}}><b>Group Div Head:</b> Henry</span>
                            <span style={{float: 'right'}}><b>Div Head:</b> Theo</span>
                            <br/>
                            <Button className="btn-github btn-sm button-card2" onClick={(e) => this.clickMarker(e, 'Buenos Park')}>
                              <span>More Detail ...</span>
                            </Button>
                          </CardBody>
                      </Card>
                    </Popup>
                  </Marker>
                </Map>
              </div>
            </div>
            <div className="contentSiteplan">
              <div className="center-block" >
                <div className="titleAnn" style={{width: '354px'}}>
                  <i className="icon-city"></i> {this.state.cluster}</div>
                <div className="img-plan" id="img-plan">
                  <ReactSvgPanZoomLoader src={"/assets/img/"+this.state.imgsvg} 
                    proxy={
                      <>
                        <SvgLoaderSelectElement selector="#svg_2" onClick={e => this.handleClickArea("#svg_2")} />
                        <SvgLoaderSelectElement selector="#svg_4" onClick={e => this.handleClickArea("#svg_4")} />
                        <SvgLoaderSelectElement selector="#svg_5" onClick={e => this.handleClickArea("#svg_5")} />
                        <SvgLoaderSelectElement selector="#svg_7" onClick={e => this.handleClickArea("#svg_7")} />                        
                        <SvgLoaderSelectElement selector="#svg_9" onClick={e => this.handleClickArea("#svg_9")} />
                        <SvgLoaderSelectElement selector="#svg_10" onClick={e => this.handleClickArea("#svg_10")} />
                        <SvgLoaderSelectElement selector="#svg_11" onClick={e => this.handleClickArea("#svg_11")} />
                        <SvgLoaderSelectElement selector="#svg_13" onClick={e => this.handleClickArea("#svg_13")} />                        
                        <SvgLoaderSelectElement selector="#svg_14" onClick={e => this.handleClickArea("#svg_14")} />
                        <SvgLoaderSelectElement selector="#svg_15" onClick={e => this.handleClickArea("#svg_15")} />                        
                        <SvgLoaderSelectElement selector="#svg_16" onClick={e => this.handleClickArea("#svg_16")} />
                        <SvgLoaderSelectElement selector="#svg_17" onClick={e => this.handleClickArea("#svg_17")} />
                        <SvgLoaderSelectElement selector="#svg_18" onClick={e => this.handleClickArea("#svg_18")} />
                        <SvgLoaderSelectElement selector="#svg_19" onClick={e => this.handleClickArea("#svg_19")} />
                        <SvgLoaderSelectElement selector="#svg_21" onClick={e => this.handleClickArea("#svg_21")} />
                        <SvgLoaderSelectElement selector="#svg_22" onClick={e => this.handleClickArea("#svg_22")} />
                        <SvgLoaderSelectElement selector="#svg_23" onClick={e => this.handleClickArea("#svg_23")} />
                        <SvgLoaderSelectElement selector="#svg_25" onClick={e => this.handleClickArea("#svg_25")} />
                        <SvgLoaderSelectElement selector="#svg_27" onClick={e => this.handleClickArea("#svg_27")} />
                        <SvgLoaderSelectElement selector="#svg_29" onClick={e => this.handleClickArea("#svg_29")} />
                        <SvgLoaderSelectElement selector="#svg_31" onClick={e => this.handleClickArea("#svg_31")} />
                        <SvgLoaderSelectElement selector="#svg_33" onClick={e => this.handleClickArea("#svg_33")} />
                        <SvgLoaderSelectElement selector="#svg_35" onClick={e => this.handleClickArea("#svg_35")} />
                      </>
                    }
                    render = {(content) => (
                      <ReactSVGPanZoom
                        width={350} height={434}
                        ref={Viewer => this.Viewer = Viewer}
                        tool={this.state.tool} onChangeTool={tool => this.changeTool(tool)}
                        value={this.state.value} 
                        onChangeValue={value => this.changeValue(value)}
                        detectAutoPan={false} detectWheel={false}
                        // onZoom={e => console.log('zoom')}
                        // onPan={e => console.log('pan')}
                        // onClick={
                          // (e) => {
                          //   if (e.target.id!='') alert(e.target.id)
                          // }
                        //   event => console.log('click', event.target)
                        // }
                      >
                          <svg width={350} height={434} >
                              {content}
                          </svg>  
                      </ReactSVGPanZoom>
                    )}
                  />
                </div>
                <Popover style={{minWidth: '140px'}} placement="top" isOpen={this.state.popoverOpen} target={this.state.povid}>
                  <PopoverBody style={{padding: '0.5rem'}}>
                    <div style={{width: '100%'}}>
                      <button style={{float: 'right', border: 'none', backgroundColor: 'transparent', padding: '0', marginRight: '-5px', marginTop: '-4px'}} onClick={(e) => this.popoverToggle(e)}><i className="icon-cross3" style={{float: "right"}}></i></button>
                    </div>
                    <div style={{width: '50px', float: 'left'}}>Unit</div>: <b>{this.state.customer.address}</b><br/>
                    <div style={{width: '50px', float: 'left'}}>Size</div>: <b>{this.state.customer.size}</b><br/>
                    <div style={{width: '50px', float: 'left'}}>Price</div>: <b>{this.state.customer.sales_price}</b><br/>
                    <div style={{width: '50px', float: 'left'}}>Status</div>: <b>
                      {(() => {
                        if (this.state.customer.status_unit === 'Sold') {
                          return (
                            <label style={{backgroundColor: 'rgba(255,72,72,.5)', padding: '0px 6px', marginBottom: '0'}}>{this.state.customer.status_unit}</label>
                          )
                        } else if (this.state.customer.status_unit === 'Booked') {
                          return (
                            <label style={{backgroundColor: 'rgba(255,250,72,.5)', padding: '0px 6px', marginBottom: '0'}}>{this.state.customer.status_unit}</label>
                          )
                        } else if (this.state.customer.status_unit === 'Available') {
                          return (
                            <label style={{backgroundColor: 'rgba(74,255,160,.5)', padding: '0px 6px', marginBottom: '0'}}>{this.state.customer.status_unit}</label>
                          )
                        } else {
                          return (
                            <label style={{backgroundColor: 'white', marginBottom: '0'}}>{this.state.customer.status_unit}</label>
                          )
                        }
                      })()}
                    </b><br/>
                  </PopoverBody>
                </Popover>
              </div>
            </div>
            <div className="contentRight">
              <Card className="card-accent-primary">
                <CardHeader>
                  <i className="icon-home"></i>Unit Information
                </CardHeader>
                  <CardBody className="card-body-nopad">
                    <CommonTable 
                      tableHead={ this.state.tableHead }
                      datas={ this.state.datas }
                      unit={ this.state.unit }
                      action={ this.handleClickArea }
                      clearAction={ this.handleClear }
                    />
                  </CardBody>
              </Card>

              <Card className="card-accent-primary" style={{width: '50%', float: 'left', marginBottom: '10px'}}>
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

              <Card className="card-accent-primary" style={{width: '50%', float: 'left', marginBottom: '10px'}}>
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
            </div>
            <Row style={{marginLeft: '5px', marginRight: '5px'}}>
              <Col xs="12" sm="12" md="4">
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
              <Col xs="12" sm="12" md="4">
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
              <Col xs="12" sm="12" md="4">
                <Card className="card-accent-primary">
                    <CardBody>
                      <div className="titleText"><b>Construction Progress</b></div>
                      <div style={{width: '100%', float: 'left'}}>
                        <div style={{width: '100%', height: '148px'}}>
                          <Line ref="chart" data={dataLine} options={optionline}/>
                        </div>
                      </div>
                    </CardBody>
                </Card>
              </Col>
            </Row>
          </Row>
        </BlockUi>
      </div>
    );
  }
}

export default Po;